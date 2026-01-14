package events.internal.graphql.query.v1_0;

import com.liferay.petra.function.UnsafeConsumer;
import com.liferay.petra.function.UnsafeFunction;
import com.liferay.portal.kernel.service.GroupLocalService;
import com.liferay.portal.kernel.service.RoleLocalService;
import com.liferay.portal.vulcan.accept.language.AcceptLanguage;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLField;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLName;
import com.liferay.portal.vulcan.pagination.Page;

import events.dto.v1_0.Event;
import events.dto.v1_0.EventResponse;

import events.resource.v1_0.EventResource;

import java.util.Map;
import java.util.function.BiFunction;

import javax.annotation.Generated;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.ws.rs.core.UriInfo;

import org.osgi.service.component.ComponentServiceObjects;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class Query {

	public static void setEventResourceComponentServiceObjects(
		ComponentServiceObjects<EventResource>
			eventResourceComponentServiceObjects) {

		_eventResourceComponentServiceObjects =
			eventResourceComponentServiceObjects;
	}

	/**
	 * Invoke this method with the command line:
	 *
	 * curl -H 'Content-Type: text/plain; charset=utf-8' -X 'POST' 'http://localhost:8080/o/graphql' -d $'{"query": "query {eventById(id: ___){id, title, description, startDateTime, endDateTime, location, url, backgroundColor, source, image}}"}' -u 'test@liferay.com:test'
	 */
	@GraphQLField
	public Event eventById(@GraphQLName("id") Long id) throws Exception {
		return _applyComponentServiceObjects(
			_eventResourceComponentServiceObjects,
			this::_populateResourceContext,
			eventResource -> eventResource.getEventById(id));
	}

	/**
	 * Invoke this method with the command line:
	 *
	 * curl -H 'Content-Type: text/plain; charset=utf-8' -X 'POST' 'http://localhost:8080/o/graphql' -d $'{"query": "query {events{events}}"}' -u 'test@liferay.com:test'
	 */
	@GraphQLField
	public EventResponse events() throws Exception {
		return _applyComponentServiceObjects(
			_eventResourceComponentServiceObjects,
			this::_populateResourceContext,
			eventResource -> eventResource.getEvents());
	}

	@GraphQLName("EventPage")
	public class EventPage {

		public EventPage(Page eventPage) {
			actions = eventPage.getActions();

			items = eventPage.getItems();
			lastPage = eventPage.getLastPage();
			page = eventPage.getPage();
			pageSize = eventPage.getPageSize();
			totalCount = eventPage.getTotalCount();
		}

		@GraphQLField
		protected Map<String, Map<String, String>> actions;

		@GraphQLField
		protected java.util.Collection<Event> items;

		@GraphQLField
		protected long lastPage;

		@GraphQLField
		protected long page;

		@GraphQLField
		protected long pageSize;

		@GraphQLField
		protected long totalCount;

	}

	private <T, R, E1 extends Throwable, E2 extends Throwable> R
			_applyComponentServiceObjects(
				ComponentServiceObjects<T> componentServiceObjects,
				UnsafeConsumer<T, E1> unsafeConsumer,
				UnsafeFunction<T, R, E2> unsafeFunction)
		throws E1, E2 {

		T resource = componentServiceObjects.getService();

		try {
			unsafeConsumer.accept(resource);

			return unsafeFunction.apply(resource);
		}
		finally {
			componentServiceObjects.ungetService(resource);
		}
	}

	private void _populateResourceContext(EventResource eventResource)
		throws Exception {

		eventResource.setContextAcceptLanguage(_acceptLanguage);
		eventResource.setContextCompany(_company);
		eventResource.setContextHttpServletRequest(_httpServletRequest);
		eventResource.setContextHttpServletResponse(_httpServletResponse);
		eventResource.setContextUriInfo(_uriInfo);
		eventResource.setContextUser(_user);
		eventResource.setGroupLocalService(_groupLocalService);
		eventResource.setRoleLocalService(_roleLocalService);
	}

	private static ComponentServiceObjects<EventResource>
		_eventResourceComponentServiceObjects;

	private AcceptLanguage _acceptLanguage;
	private com.liferay.portal.kernel.model.Company _company;
	private BiFunction
		<Object, String, com.liferay.portal.kernel.search.filter.Filter>
			_filterBiFunction;
	private GroupLocalService _groupLocalService;
	private HttpServletRequest _httpServletRequest;
	private HttpServletResponse _httpServletResponse;
	private RoleLocalService _roleLocalService;
	private BiFunction<Object, String, com.liferay.portal.kernel.search.Sort[]>
		_sortsBiFunction;
	private UriInfo _uriInfo;
	private com.liferay.portal.kernel.model.User _user;

}