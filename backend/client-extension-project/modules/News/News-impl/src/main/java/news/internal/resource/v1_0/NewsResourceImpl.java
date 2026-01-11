package news.internal.resource.v1_0;

import com.liferay.dynamic.data.mapping.model.DDMStructure;
import com.liferay.dynamic.data.mapping.service.DDMStructureLocalService;
import com.liferay.journal.model.JournalArticle;
import com.liferay.journal.service.JournalArticleLocalService;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.search.*;
import com.liferay.portal.kernel.search.generic.BooleanClauseImpl;
import com.liferay.portal.kernel.search.generic.BooleanQueryImpl;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.ServiceContextThreadLocal;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.HtmlUtil;
import com.liferay.portal.kernel.util.Http;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import com.liferay.portal.kernel.xml.Node;
import com.liferay.portal.kernel.xml.SAXReaderUtil;
import com.liferay.portal.vulcan.pagination.Pagination;
import news.dto.v1_0.NewsArticle;
import news.dto.v1_0.NewsPage;
import news.resource.v1_0.NewsResource;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Component(
        properties = "OSGI-INF/liferay/rest/v1_0/news.properties",
        scope = ServiceScope.PROTOTYPE, service = NewsResource.class
)
public class NewsResourceImpl extends BaseNewsResourceImpl {

    private static final Log _log = LogFactoryUtil.getLog(NewsResourceImpl.class);

    @Override
    public NewsPage getNewsPage(Date date, String search, Pagination pagination) throws Exception {

        long structureId = 55663L;

        Locale locale = contextAcceptLanguage.getPreferredLocale();

        ServiceContext serviceContext = ServiceContextThreadLocal.getServiceContext();
        // 1. Get Structure Key
        DDMStructure structure = _ddmStructureLocalService.getDDMStructure(structureId);
        String structureKey = structure.getStructureKey();
_log.info(serviceContext.getScopeGroupId());
        // 2. Search Context
        SearchContext searchContext = new SearchContext();
        searchContext.setCompanyId(contextCompany.getCompanyId());
        searchContext.setGroupIds(new long[]{serviceContext.getScopeGroupId()});
        searchContext.setStart(pagination.getStartPosition());
        searchContext.setEnd(pagination.getEndPosition());
        searchContext.setLocale(locale);
        // 3. Build Query
        BooleanQuery fullQuery = new BooleanQueryImpl();

        // A. Structure Key (Must match exactly)
        BooleanQuery structureQuery = new BooleanQueryImpl();
        structureQuery.addTerm("ddmStructureKey", structureKey);
        fullQuery.add(structureQuery, BooleanClauseOccur.MUST);

        // B. Status (Approved)
        BooleanQuery statusQuery = new BooleanQueryImpl();
        statusQuery.addRequiredTerm(Field.STATUS, WorkflowConstants.STATUS_APPROVED);
        fullQuery.add(statusQuery, BooleanClauseOccur.MUST);

        searchContext.setKeywords(search);
        // C. Head (Latest Version)
        BooleanQuery headQuery = new BooleanQueryImpl();
        headQuery.addRequiredTerm("head", true);
        fullQuery.add(headQuery, BooleanClauseOccur.MUST);


        if (date != null) {
            BooleanQuery dateQuery = new BooleanQueryImpl();

            DateFormat indexDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            String startVal = indexDateFormat.format(cal.getTime());

            cal.set(Calendar.HOUR_OF_DAY, 23);
            cal.set(Calendar.MINUTE, 59);
            cal.set(Calendar.SECOND, 59);
            String endVal = indexDateFormat.format(cal.getTime());

            dateQuery.addRangeTerm(Field.DISPLAY_DATE, startVal, endVal);

            fullQuery.add(dateQuery, BooleanClauseOccur.MUST);
        }

        BooleanClause booleanClause = new BooleanClauseImpl(fullQuery, BooleanClauseOccur.MUST);
        searchContext.setBooleanClauses(new BooleanClause[] { booleanClause });

        // 4. Sort
        Sort sort = SortFactoryUtil.create("createDate", true);
        searchContext.setSorts(sort);

        // 5. Execute
        Indexer<JournalArticle> indexer = IndexerRegistryUtil.getIndexer(JournalArticle.class);

        // Correct Method Signature: search(SearchContext)
        Hits hits = indexer.search(searchContext);

        _log.info("Hits for structure " + structureKey + ": " + hits.getLength());

        // 6. Map Results
        List<NewsArticle> newsItems = new ArrayList<>();

        for (Document doc : hits.getDocs()) {

            // Robust ID Extraction
            long resourcePrimKey = GetterUtil.getLong(doc.get(Field.ENTRY_CLASS_PK));
            if (resourcePrimKey <= 0) {
                resourcePrimKey = GetterUtil.getLong(doc.get("resourcePrimKey"));
            }

            if (resourcePrimKey <= 0) continue;

            JournalArticle ja = _journalArticleService.fetchLatestArticle(
                    resourcePrimKey,
                    WorkflowConstants.STATUS_APPROVED
            );

            if (ja != null) {
                NewsArticle item = new NewsArticle();

                // Smart Title
                String title = ja.getTitle(locale);
                if (Validator.isNull(title)) title = ja.getTitleCurrentValue();
                item.setTitle(title);
                Date date1 = ja.getDisplayDate();

                DateFormat dateFormat = new SimpleDateFormat("yyyy/M/d hh.mm a");
                item.setDate(dateFormat.parse(dateFormat.format(date1)));
                // Smart Description
                String desc = ja.getDescription(locale).strip();
                String cDesc = HtmlUtil.stripHtml(desc);
                if (Validator.isNull(desc))
                    desc = ja.getDescription(ja.getDescription().strip());
                if (Validator.isNull(desc)) {
                    try {
                        String plainText = HtmlUtil.stripHtml(ja.getContentByLocale(ja.getContent()));
                        desc = (plainText.length() > 150) ? plainText.substring(0, 150) + "..." : plainText;
                    } catch (Exception e) { desc = ""; }
                }

                try {
                    String content = ja.getContentByLocale(locale.toString());

                    com.liferay.portal.kernel.xml.Document document = SAXReaderUtil.read(content);

                    // Use the field reference name "NewsImages" to find the node
                    Node imageNode = document.selectSingleNode(
                            "/root/dynamic-element[@field-reference='NewsImages']/dynamic-content");

                    if (imageNode != null && Validator.isNotNull(imageNode.getText())) {
                        String imageJson = imageNode.getText();

                        // Liferay image fields store a JSON. We need the "url" or "fileEntryTypeValue"
                        JSONObject jsonObject = JSONFactoryUtil.createJSONObject(imageJson);

                        if (jsonObject.has("url")) {
                            item.setImage(jsonObject.getString("url"));
                        } else if (jsonObject.has("uuid")) {
                            // Fallback for older versions or specific configurations
                            String url = "/documents/" + ja.getGroupId() + "/" + jsonObject.getString("uuid");
                            item.setImage(url);
                        }
                    }
                } catch (Exception e) {
                    // item.setImage("");
                }
                item.setDescription(cDesc);
                item.setId(ja.getResourcePrimKey());
                newsItems.add(item);
            }
        }

        NewsPage newsPage = new NewsPage();
        newsPage.setNewsArticles(newsItems.toArray(new NewsArticle[0]));
        newsPage.setPageSize(pagination.getPageSize());
        newsPage.setPage(pagination.getPage());
        newsPage.setTotalCount((long) hits.getLength());


        return newsPage;
    }

    @Override
    public NewsArticle getNewsById(Long id) throws Exception {

        Locale locale = contextAcceptLanguage.getPreferredLocale();

        JournalArticle ja = _journalArticleService.fetchLatestArticle(id, WorkflowConstants.STATUS_APPROVED);

        if (ja == null) {
            throw new NotFoundException("News Article not found with id: " + id);
        }

        // 2. Map to DTO
        NewsArticle item = new NewsArticle();
        item.setId(ja.getResourcePrimKey());
        item.setDate(ja.getDisplayDate()); // Return Java Date, format on Frontend

        // Title
        String title = ja.getTitle(locale);
        if (Validator.isNull(title)) title = ja.getTitleCurrentValue();
        item.setTitle(title);


        String rawDesc = ja.getDescription(locale);
        if (Validator.isNull(rawDesc)) rawDesc = ja.getDescription();
        item.setDescription(HtmlUtil.stripHtml(rawDesc));


        try {
            String content = ja.getContentByLocale(locale.toString());

            com.liferay.portal.kernel.xml.Document document = SAXReaderUtil.read(content);

            // Use the field reference name "NewsImages" to find the node
            Node imageNode = document.selectSingleNode(
                    "/root/dynamic-element[@field-reference='NewsImages']/dynamic-content");

            if (imageNode != null && Validator.isNotNull(imageNode.getText())) {
                String imageJson = imageNode.getText();

                // Liferay image fields store a JSON. We need the "url" or "fileEntryTypeValue"
                JSONObject jsonObject = JSONFactoryUtil.createJSONObject(imageJson);

                if (jsonObject.has("url")) {
                    item.setImage(jsonObject.getString("url"));
                } else if (jsonObject.has("uuid")) {
                    // Fallback for older versions or specific configurations
                    String url = "/documents/" + ja.getGroupId() + "/" + jsonObject.getString("uuid");
                    item.setImage(url);
                }
            }
        } catch (Exception e) {
            // If it's not a JSON field, it might be a simple URL string
            // item.setImage("");
        }


        return item;
    }

    @Reference
    private JournalArticleLocalService _journalArticleService;

    @Reference
    private DDMStructureLocalService _ddmStructureLocalService;
}