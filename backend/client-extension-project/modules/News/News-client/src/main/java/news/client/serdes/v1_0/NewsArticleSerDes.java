package news.client.serdes.v1_0;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;

import javax.annotation.Generated;

import news.client.dto.v1_0.NewsArticle;
import news.client.json.BaseJSONParser;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class NewsArticleSerDes {

	public static NewsArticle toDTO(String json) {
		NewsArticleJSONParser newsArticleJSONParser =
			new NewsArticleJSONParser();

		return newsArticleJSONParser.parseToDTO(json);
	}

	public static NewsArticle[] toDTOs(String json) {
		NewsArticleJSONParser newsArticleJSONParser =
			new NewsArticleJSONParser();

		return newsArticleJSONParser.parseToDTOs(json);
	}

	public static String toJSON(NewsArticle newsArticle) {
		if (newsArticle == null) {
			return "null";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("{");

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ssXX");

		if (newsArticle.getAuthorName() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"authorName\": ");

			sb.append("\"");

			sb.append(_escape(newsArticle.getAuthorName()));

			sb.append("\"");
		}

		if (newsArticle.getCoverImage() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"coverImage\": ");

			sb.append("\"");

			sb.append(_escape(newsArticle.getCoverImage()));

			sb.append("\"");
		}

		if (newsArticle.getDate() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"date\": ");

			sb.append("\"");

			sb.append(liferayToJSONDateFormat.format(newsArticle.getDate()));

			sb.append("\"");
		}

		if (newsArticle.getDescription() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"description\": ");

			sb.append("\"");

			sb.append(_escape(newsArticle.getDescription()));

			sb.append("\"");
		}

		if (newsArticle.getId() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"id\": ");

			sb.append(newsArticle.getId());
		}

		if (newsArticle.getImage() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"image\": ");

			sb.append("\"");

			sb.append(_escape(newsArticle.getImage()));

			sb.append("\"");
		}

		if (newsArticle.getTitle() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"title\": ");

			sb.append("\"");

			sb.append(_escape(newsArticle.getTitle()));

			sb.append("\"");
		}

		sb.append("}");

		return sb.toString();
	}

	public static Map<String, Object> toMap(String json) {
		NewsArticleJSONParser newsArticleJSONParser =
			new NewsArticleJSONParser();

		return newsArticleJSONParser.parseToMap(json);
	}

	public static Map<String, String> toMap(NewsArticle newsArticle) {
		if (newsArticle == null) {
			return null;
		}

		Map<String, String> map = new TreeMap<>();

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ssXX");

		if (newsArticle.getAuthorName() == null) {
			map.put("authorName", null);
		}
		else {
			map.put("authorName", String.valueOf(newsArticle.getAuthorName()));
		}

		if (newsArticle.getCoverImage() == null) {
			map.put("coverImage", null);
		}
		else {
			map.put("coverImage", String.valueOf(newsArticle.getCoverImage()));
		}

		if (newsArticle.getDate() == null) {
			map.put("date", null);
		}
		else {
			map.put(
				"date", liferayToJSONDateFormat.format(newsArticle.getDate()));
		}

		if (newsArticle.getDescription() == null) {
			map.put("description", null);
		}
		else {
			map.put(
				"description", String.valueOf(newsArticle.getDescription()));
		}

		if (newsArticle.getId() == null) {
			map.put("id", null);
		}
		else {
			map.put("id", String.valueOf(newsArticle.getId()));
		}

		if (newsArticle.getImage() == null) {
			map.put("image", null);
		}
		else {
			map.put("image", String.valueOf(newsArticle.getImage()));
		}

		if (newsArticle.getTitle() == null) {
			map.put("title", null);
		}
		else {
			map.put("title", String.valueOf(newsArticle.getTitle()));
		}

		return map;
	}

	public static class NewsArticleJSONParser
		extends BaseJSONParser<NewsArticle> {

		@Override
		protected NewsArticle createDTO() {
			return new NewsArticle();
		}

		@Override
		protected NewsArticle[] createDTOArray(int size) {
			return new NewsArticle[size];
		}

		@Override
		protected boolean parseMaps(String jsonParserFieldName) {
			if (Objects.equals(jsonParserFieldName, "authorName")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "coverImage")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "date")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "description")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "id")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "image")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "title")) {
				return false;
			}

			return false;
		}

		@Override
		protected void setField(
			NewsArticle newsArticle, String jsonParserFieldName,
			Object jsonParserFieldValue) {

			if (Objects.equals(jsonParserFieldName, "authorName")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setAuthorName((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "coverImage")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setCoverImage((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "date")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setDate(toDate((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "description")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setDescription((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "id")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setId(
						Long.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "image")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setImage((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "title")) {
				if (jsonParserFieldValue != null) {
					newsArticle.setTitle((String)jsonParserFieldValue);
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