package events.internal.resource.v1_0;

import com.liferay.journal.model.JournalArticle;
import com.liferay.journal.service.JournalArticleLocalService;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.dao.orm.RestrictionsFactoryUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.ServiceContextThreadLocal;
import com.liferay.portal.kernel.util.HtmlUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import com.liferay.portal.kernel.xml.Document;
import com.liferay.portal.kernel.xml.Element;
import com.liferay.portal.kernel.xml.Node;
import com.liferay.portal.kernel.xml.SAXReaderUtil;
import events.dto.v1_0.Event;
import events.dto.v1_0.EventResponse;
import events.resource.v1_0.EventResource;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

import javax.ws.rs.NotFoundException;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author ThinkPad
 */
@Component(
	properties = "OSGI-INF/liferay/rest/v1_0/event.properties",
	scope = ServiceScope.PROTOTYPE, service = EventResource.class
)
public class EventResourceImpl extends BaseEventResourceImpl {
    private static final Log logger = LogFactoryUtil.getLog(EventResourceImpl.class);

    @Override
    public EventResponse getEvents() throws Exception {
        List<Event> allEvents = new ArrayList<>();

        ServiceContext serviceContext = ServiceContextThreadLocal.getServiceContext();
        Locale locale = contextAcceptLanguage.getPreferredLocale();
        try {
            long companyId = serviceContext.getCompanyId();
            long userId = serviceContext.getUserId();



            long eventStructureId = 55694L;
            long eventAttendeesObjectId =  61175L;

            Set<String> attendedEventIds = getUserAttendedEvents(userId, eventAttendeesObjectId);

            List<Event> internalEvents = fetchInternalEvents(companyId, locale, eventStructureId, attendedEventIds);
            allEvents.addAll(internalEvents);


        } catch (Exception e) {
            logger.error("Error fetching events in REST API", e);
            throw e;
        }

        EventResponse eventResponse = new EventResponse();
        eventResponse.setEvents(allEvents.toArray(new Event[0]));
        return eventResponse;
    }

    @Override
    public Event getEventById(Long id) throws Exception {


        Locale locale = contextAcceptLanguage.getPreferredLocale();



        JournalArticle article = _journalArticleLocalService.fetchLatestArticle(id, WorkflowConstants.STATUS_APPROVED);

        if (article == null) {
            throw new NotFoundException("Event not found with id: " + id);
        }

        String content = article.getContentByLocale(locale.toString());
        Document document = SAXReaderUtil.read(content);
        Element rootElement = document.getRootElement();

        Event event = new Event();
        event.setId(article.getResourcePrimKey());
        event.setTitle(article.getTitle(locale));

        String rawDesc = article.getDescription(locale);
        event.setDescription(HtmlUtil.stripHtml(Validator.isNotNull(rawDesc) ? rawDesc : ""));

        String eventDate = getFieldValue(rootElement, "EventDate");
        String timeFrom = getFieldValue(rootElement, "TimeFrom");
        String timeTo = getFieldValue(rootElement, "TimeTo");
        String location = getFieldValue(rootElement, "EventLocation");

        event.setLocation(location);

        ZoneId portalZoneId = ZoneId.of("Africa/Cairo");
        try {
            if (Validator.isNotNull(eventDate) && Validator.isNotNull(timeFrom)) {
                LocalDateTime localStart = LocalDate.parse(eventDate).atTime(LocalTime.parse(timeFrom));
                event.setStartDateTime(Date.from(localStart.atZone(portalZoneId).toInstant()));
            }

            if (Validator.isNotNull(eventDate) && Validator.isNotNull(timeTo)) {
                LocalDateTime localEnd = LocalDate.parse(eventDate).atTime(LocalTime.parse(timeTo));
                event.setEndDateTime(Date.from(localEnd.atZone(portalZoneId).toInstant()));
            }
        } catch (Exception e) {
            logger.error("Error parsing dates for event " + id, e);
        }

        event.setUrl(getFieldValue(rootElement, "EventLink"));


        try {
            Node imageNode = document.selectSingleNode("/root/dynamic-element[@field-reference='EventBanner']/dynamic-content");

            if (imageNode != null && Validator.isNotNull(imageNode.getText())) {
                String imageJson = imageNode.getText();
                JSONObject jsonObject = JSONFactoryUtil.createJSONObject(imageJson);

                if (jsonObject.has("url")) {
                    event.setImage(jsonObject.getString("url"));
                } else if (jsonObject.has("uuid")) {
                    String url = "/documents/" + article.getGroupId() + "/" + jsonObject.getString("uuid");
                    event.setImage(url);
                }
            }
        } catch (Exception e) {
            logger.warn("No image found or error parsing image for event " + id);
        }

        return event;
    }

    private List<Event> fetchInternalEvents(long companyId, Locale locale, long structureId, Set<String> attendedEventIds) {
        List<Event> events = new ArrayList<>();
        try {
            List<JournalArticle> rawArticles = _journalArticleLocalService.getStructureArticles(structureId);
            Collection<JournalArticle> distinctArticles = rawArticles.stream()
                    .filter(article -> !article.isInTrash())
                    .filter(article -> article.getStatus() == WorkflowConstants.STATUS_APPROVED)
                    .collect(Collectors.toMap(
                            JournalArticle::getResourcePrimKey,
                            article -> article,
                            (existing, replacement) -> existing.getVersion() > replacement.getVersion() ? existing : replacement
                    ))
                    .values();


            for (JournalArticle article : distinctArticles) {
                if (article.getCompanyId() != companyId) continue;

                Document document = SAXReaderUtil.read(article.getContentByLocale(locale.toString()));
                Element rootElement = document.getRootElement();

                Event event = new Event();
                event.setId(article.getResourcePrimKey());
                event.setTitle(article.getTitle(locale));
                event.setDescription(article.getDescription(locale));
                event.setSource(Event.Source.INTERNAL);

                // Date Parsing
                String eventDate = getFieldValue(rootElement, "EventDate");
                String timeFrom = getFieldValue(rootElement, "TimeFrom");
                String timeTo = getFieldValue(rootElement, "TimeTo");

                ZoneId portalZoneId = ZoneId.of("Africa/Cairo");
                if (!eventDate.isEmpty() && !timeFrom.isEmpty()) {
                    LocalDateTime localStart = LocalDate.parse(eventDate).atTime(LocalTime.parse(timeFrom));
                    event.setStartDateTime(Date.from(localStart.atZone(portalZoneId).toInstant()));
                }

                if (!eventDate.isEmpty() && !timeTo.isEmpty()) {
                    LocalDateTime localEnd = LocalDate.parse(eventDate).atTime(LocalTime.parse(timeTo));
                    // Convert to Date and set
                    event.setEndDateTime(Date.from(localEnd.atZone(portalZoneId).toInstant()));
                }

                event.setUrl(getFieldValue(rootElement, "EventLink"));

                event.setLocation(getFieldValue(rootElement, "EventLocation"));


                String langPrefix = locale.getLanguage().equals("ar") ? "/ar" : "/en";
                event.setUrl(langPrefix + "/w/" + article.getUrlTitle());

                // Color Logic
                if (attendedEventIds.contains(article.getArticleId())) {
                    event.setBackgroundColor("#0A7A4D");
                } else {
                    event.setBackgroundColor("#9E832F");
                }

                events.add(event);
            }
        } catch (Exception e) {
            logger.error("Error parsing internal events", e);
        }
        return events;
    }


    private Set<String> getUserAttendedEvents(long userId, long objectId) {
        Set<String> ids = new HashSet<>();
        try {
            DynamicQuery dq = _objectEntryLocalService.dynamicQuery();
            dq.add(RestrictionsFactoryUtil.eq("objectDefinitionId", objectId));
            dq.add(RestrictionsFactoryUtil.eq("userId", userId));

            List<ObjectEntry> results = _objectEntryLocalService.dynamicQuery(dq);

            for (ObjectEntry entry : results) {
                Serializable eventId = entry.getValues().get("eventID");
                if (eventId != null) ids.add(eventId.toString());
            }
        } catch (Exception e) {
            logger.error("Error fetching attended events", e);
        }
        return ids;
    }

    private String getFieldValue(Element root, String fieldRef) {
        Element field = (Element) root.selectSingleNode("//dynamic-element[@field-reference='" + fieldRef + "']/dynamic-content");
        return (field != null) ? field.getText() : "";
    }


    @Reference
    private JournalArticleLocalService _journalArticleLocalService;

    @Reference
    private ObjectEntryLocalService _objectEntryLocalService;

}