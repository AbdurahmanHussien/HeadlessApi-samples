package news.client.serdes.v1_0;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;

import javax.annotation.Generated;

import news.client.dto.v1_0.NewsArticle;
import news.client.dto.v1_0.NewsPage;
import news.client.json.BaseJSONParser;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class NewsPageSerDes {

	public static NewsPage toDTO(String json) {
		NewsPageJSONParser newsPageJSONParser = new NewsPageJSONParser();

		return newsPageJSONParser.parseToDTO(json);
	}

	public static NewsPage[] toDTOs(String json) {
		NewsPageJSONParser newsPageJSONParser = new NewsPageJSONParser();

		return newsPageJSONParser.parseToDTOs(json);
	}

	public static String toJSON(NewsPage newsPage) {
		if (newsPage == null) {
			return "null";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("{");

		if (newsPage.getLastPage() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"lastPage\": ");

			sb.append(newsPage.getLastPage());
		}

		if (newsPage.getNewsArticles() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"newsArticles\": ");

			sb.append("[");

			for (int i = 0; i < newsPage.getNewsArticles().length; i++) {
				sb.append(String.valueOf(newsPage.getNewsArticles()[i]));

				if ((i + 1) < newsPage.getNewsArticles().length) {
					sb.append(", ");
				}
			}

			sb.append("]");
		}

		if (newsPage.getPage() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"page\": ");

			sb.append(newsPage.getPage());
		}

		if (newsPage.getPageSize() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"pageSize\": ");

			sb.append(newsPage.getPageSize());
		}

		if (newsPage.getTotalCount() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"totalCount\": ");

			sb.append(newsPage.getTotalCount());
		}

		sb.append("}");

		return sb.toString();
	}

	public static Map<String, Object> toMap(String json) {
		NewsPageJSONParser newsPageJSONParser = new NewsPageJSONParser();

		return newsPageJSONParser.parseToMap(json);
	}

	public static Map<String, String> toMap(NewsPage newsPage) {
		if (newsPage == null) {
			return null;
		}

		Map<String, String> map = new TreeMap<>();

		if (newsPage.getLastPage() == null) {
			map.put("lastPage", null);
		}
		else {
			map.put("lastPage", String.valueOf(newsPage.getLastPage()));
		}

		if (newsPage.getNewsArticles() == null) {
			map.put("newsArticles", null);
		}
		else {
			map.put("newsArticles", String.valueOf(newsPage.getNewsArticles()));
		}

		if (newsPage.getPage() == null) {
			map.put("page", null);
		}
		else {
			map.put("page", String.valueOf(newsPage.getPage()));
		}

		if (newsPage.getPageSize() == null) {
			map.put("pageSize", null);
		}
		else {
			map.put("pageSize", String.valueOf(newsPage.getPageSize()));
		}

		if (newsPage.getTotalCount() == null) {
			map.put("totalCount", null);
		}
		else {
			map.put("totalCount", String.valueOf(newsPage.getTotalCount()));
		}

		return map;
	}

	public static class NewsPageJSONParser extends BaseJSONParser<NewsPage> {

		@Override
		protected NewsPage createDTO() {
			return new NewsPage();
		}

		@Override
		protected NewsPage[] createDTOArray(int size) {
			return new NewsPage[size];
		}

		@Override
		protected boolean parseMaps(String jsonParserFieldName) {
			if (Objects.equals(jsonParserFieldName, "lastPage")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "newsArticles")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "page")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "pageSize")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "totalCount")) {
				return false;
			}

			return false;
		}

		@Override
		protected void setField(
			NewsPage newsPage, String jsonParserFieldName,
			Object jsonParserFieldValue) {

			if (Objects.equals(jsonParserFieldName, "lastPage")) {
				if (jsonParserFieldValue != null) {
					newsPage.setLastPage(
						Integer.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "newsArticles")) {
				if (jsonParserFieldValue != null) {
					Object[] jsonParserFieldValues =
						(Object[])jsonParserFieldValue;

					NewsArticle[] newsArticlesArray =
						new NewsArticle[jsonParserFieldValues.length];

					for (int i = 0; i < newsArticlesArray.length; i++) {
						newsArticlesArray[i] = NewsArticleSerDes.toDTO(
							(String)jsonParserFieldValues[i]);
					}

					newsPage.setNewsArticles(newsArticlesArray);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "page")) {
				if (jsonParserFieldValue != null) {
					newsPage.setPage(
						Integer.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "pageSize")) {
				if (jsonParserFieldValue != null) {
					newsPage.setPageSize(
						Integer.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "totalCount")) {
				if (jsonParserFieldValue != null) {
					newsPage.setTotalCount(
						Long.valueOf((String)jsonParserFieldValue));
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