package events.client.serdes.v1_0;

import events.client.dto.v1_0.Event;
import events.client.dto.v1_0.EventResponse;
import events.client.json.BaseJSONParser;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;

import javax.annotation.Generated;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class EventResponseSerDes {

	public static EventResponse toDTO(String json) {
		EventResponseJSONParser eventResponseJSONParser =
			new EventResponseJSONParser();

		return eventResponseJSONParser.parseToDTO(json);
	}

	public static EventResponse[] toDTOs(String json) {
		EventResponseJSONParser eventResponseJSONParser =
			new EventResponseJSONParser();

		return eventResponseJSONParser.parseToDTOs(json);
	}

	public static String toJSON(EventResponse eventResponse) {
		if (eventResponse == null) {
			return "null";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("{");

		if (eventResponse.getEvents() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"events\": ");

			sb.append("[");

			for (int i = 0; i < eventResponse.getEvents().length; i++) {
				sb.append(String.valueOf(eventResponse.getEvents()[i]));

				if ((i + 1) < eventResponse.getEvents().length) {
					sb.append(", ");
				}
			}

			sb.append("]");
		}

		sb.append("}");

		return sb.toString();
	}

	public static Map<String, Object> toMap(String json) {
		EventResponseJSONParser eventResponseJSONParser =
			new EventResponseJSONParser();

		return eventResponseJSONParser.parseToMap(json);
	}

	public static Map<String, String> toMap(EventResponse eventResponse) {
		if (eventResponse == null) {
			return null;
		}

		Map<String, String> map = new TreeMap<>();

		if (eventResponse.getEvents() == null) {
			map.put("events", null);
		}
		else {
			map.put("events", String.valueOf(eventResponse.getEvents()));
		}

		return map;
	}

	public static class EventResponseJSONParser
		extends BaseJSONParser<EventResponse> {

		@Override
		protected EventResponse createDTO() {
			return new EventResponse();
		}

		@Override
		protected EventResponse[] createDTOArray(int size) {
			return new EventResponse[size];
		}

		@Override
		protected boolean parseMaps(String jsonParserFieldName) {
			if (Objects.equals(jsonParserFieldName, "events")) {
				return false;
			}

			return false;
		}

		@Override
		protected void setField(
			EventResponse eventResponse, String jsonParserFieldName,
			Object jsonParserFieldValue) {

			if (Objects.equals(jsonParserFieldName, "events")) {
				if (jsonParserFieldValue != null) {
					Object[] jsonParserFieldValues =
						(Object[])jsonParserFieldValue;

					Event[] eventsArray =
						new Event[jsonParserFieldValues.length];

					for (int i = 0; i < eventsArray.length; i++) {
						eventsArray[i] = EventSerDes.toDTO(
							(String)jsonParserFieldValues[i]);
					}

					eventResponse.setEvents(eventsArray);
				}
			}
		}

	}

	private static String _escape(Object object) {
		String string = String.valueOf(object);

		for (String[] strings : BaseJSONParser.JSON_ESCAPE_STRINGS) {
			string = string.replace(strings[0], strings[1]);
		}

		return string;
	}

	private static String _toJSON(Map<String, ?> map) {
		StringBuilder sb = new StringBuilder("{");

		@SuppressWarnings("unchecked")
		Set set = map.entrySet();

		@SuppressWarnings("unchecked")
		Iterator<Map.Entry<String, ?>> iterator = set.iterator();

		while (iterator.hasNext()) {
			Map.Entry<String, ?> entry = iterator.next();

			sb.append("\"");
			sb.append(entry.getKey());
			sb.append("\": ");

			Object value = entry.getValue();

			sb.append(_toJSON(value));

			if (iterator.hasNext()) {
				sb.append(", ");
			}
		}

		sb.append("}");

		return sb.toString();
	}

	private static String _toJSON(Object value) {
		if (value == null) {
			return "null";
		}

		if (value instanceof Map) {
			return _toJSON((Map)value);
		}

		Class<?> clazz = value.getClass();

		if (clazz.isArray()) {
			StringBuilder sb = new StringBuilder("[");

			Object[] values = (Object[])value;

			for (int i = 0; i < values.length; i++) {
				sb.append(_toJSON(values[i]));

				if ((i + 1) < values.length) {
					sb.append(", ");
				}
			}

			sb.append("]");

			return sb.toString();
		}

		if (value instanceof String) {
			return "\"" + _escape(value) + "\"";
		}

		return String.valueOf(value);
	}

}