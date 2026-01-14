package events.client.serdes.v1_0;

import events.client.dto.v1_0.Event;
import events.client.json.BaseJSONParser;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

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
public class EventSerDes {

	public static Event toDTO(String json) {
		EventJSONParser eventJSONParser = new EventJSONParser();

		return eventJSONParser.parseToDTO(json);
	}

	public static Event[] toDTOs(String json) {
		EventJSONParser eventJSONParser = new EventJSONParser();

		return eventJSONParser.parseToDTOs(json);
	}

	public static String toJSON(Event event) {
		if (event == null) {
			return "null";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("{");

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ssXX");

		if (event.getBackgroundColor() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"backgroundColor\": ");

			sb.append("\"");

			sb.append(_escape(event.getBackgroundColor()));

			sb.append("\"");
		}

		if (event.getDescription() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"description\": ");

			sb.append("\"");

			sb.append(_escape(event.getDescription()));

			sb.append("\"");
		}

		if (event.getEndDateTime() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"endDateTime\": ");

			sb.append("\"");

			sb.append(liferayToJSONDateFormat.format(event.getEndDateTime()));

			sb.append("\"");
		}

		if (event.getId() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"id\": ");

			sb.append(event.getId());
		}

		if (event.getImage() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"image\": ");

			sb.append("\"");

			sb.append(_escape(event.getImage()));

			sb.append("\"");
		}

		if (event.getLocation() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"location\": ");

			sb.append("\"");

			sb.append(_escape(event.getLocation()));

			sb.append("\"");
		}

		if (event.getSource() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"source\": ");

			sb.append("\"");

			sb.append(event.getSource());

			sb.append("\"");
		}

		if (event.getStartDateTime() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"startDateTime\": ");

			sb.append("\"");

			sb.append(liferayToJSONDateFormat.format(event.getStartDateTime()));

			sb.append("\"");
		}

		if (event.getTitle() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"title\": ");

			sb.append("\"");

			sb.append(_escape(event.getTitle()));

			sb.append("\"");
		}

		if (event.getUrl() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"url\": ");

			sb.append("\"");

			sb.append(_escape(event.getUrl()));

			sb.append("\"");
		}

		sb.append("}");

		return sb.toString();
	}

	public static Map<String, Object> toMap(String json) {
		EventJSONParser eventJSONParser = new EventJSONParser();

		return eventJSONParser.parseToMap(json);
	}

	public static Map<String, String> toMap(Event event) {
		if (event == null) {
			return null;
		}

		Map<String, String> map = new TreeMap<>();

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ssXX");

		if (event.getBackgroundColor() == null) {
			map.put("backgroundColor", null);
		}
		else {
			map.put(
				"backgroundColor", String.valueOf(event.getBackgroundColor()));
		}

		if (event.getDescription() == null) {
			map.put("description", null);
		}
		else {
			map.put("description", String.valueOf(event.getDescription()));
		}

		if (event.getEndDateTime() == null) {
			map.put("endDateTime", null);
		}
		else {
			map.put(
				"endDateTime",
				liferayToJSONDateFormat.format(event.getEndDateTime()));
		}

		if (event.getId() == null) {
			map.put("id", null);
		}
		else {
			map.put("id", String.valueOf(event.getId()));
		}

		if (event.getImage() == null) {
			map.put("image", null);
		}
		else {
			map.put("image", String.valueOf(event.getImage()));
		}

		if (event.getLocation() == null) {
			map.put("location", null);
		}
		else {
			map.put("location", String.valueOf(event.getLocation()));
		}

		if (event.getSource() == null) {
			map.put("source", null);
		}
		else {
			map.put("source", String.valueOf(event.getSource()));
		}

		if (event.getStartDateTime() == null) {
			map.put("startDateTime", null);
		}
		else {
			map.put(
				"startDateTime",
				liferayToJSONDateFormat.format(event.getStartDateTime()));
		}

		if (event.getTitle() == null) {
			map.put("title", null);
		}
		else {
			map.put("title", String.valueOf(event.getTitle()));
		}

		if (event.getUrl() == null) {
			map.put("url", null);
		}
		else {
			map.put("url", String.valueOf(event.getUrl()));
		}

		return map;
	}

	public static class EventJSONParser extends BaseJSONParser<Event> {

		@Override
		protected Event createDTO() {
			return new Event();
		}

		@Override
		protected Event[] createDTOArray(int size) {
			return new Event[size];
		}

		@Override
		protected boolean parseMaps(String jsonParserFieldName) {
			if (Objects.equals(jsonParserFieldName, "backgroundColor")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "description")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "endDateTime")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "id")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "image")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "location")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "source")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "startDateTime")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "title")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "url")) {
				return false;
			}

			return false;
		}

		@Override
		protected void setField(
			Event event, String jsonParserFieldName,
			Object jsonParserFieldValue) {

			if (Objects.equals(jsonParserFieldName, "backgroundColor")) {
				if (jsonParserFieldValue != null) {
					event.setBackgroundColor((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "description")) {
				if (jsonParserFieldValue != null) {
					event.setDescription((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "endDateTime")) {
				if (jsonParserFieldValue != null) {
					event.setEndDateTime(toDate((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "id")) {
				if (jsonParserFieldValue != null) {
					event.setId(Long.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "image")) {
				if (jsonParserFieldValue != null) {
					event.setImage((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "location")) {
				if (jsonParserFieldValue != null) {
					event.setLocation((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "source")) {
				if (jsonParserFieldValue != null) {
					event.setSource(
						Event.Source.create((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "startDateTime")) {
				if (jsonParserFieldValue != null) {
					event.setStartDateTime(
						toDate((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "title")) {
				if (jsonParserFieldValue != null) {
					event.setTitle((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "url")) {
				if (jsonParserFieldValue != null) {
					event.setUrl((String)jsonParserFieldValue);
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