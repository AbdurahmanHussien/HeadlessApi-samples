package events.dto.v1_0;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import com.liferay.petra.function.UnsafeSupplier;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLField;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLName;
import com.liferay.portal.vulcan.util.ObjectMapperUtil;

import java.io.Serializable;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Supplier;

import javax.annotation.Generated;

import javax.validation.Valid;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
@GraphQLName("Event")
@JsonFilter("Liferay.Vulcan")
@XmlRootElement(name = "Event")
public class Event implements Serializable {

	public static Event toDTO(String json) {
		return ObjectMapperUtil.readValue(Event.class, json);
	}

	public static Event unsafeToDTO(String json) {
		return ObjectMapperUtil.unsafeReadValue(Event.class, json);
	}

	@io.swagger.v3.oas.annotations.media.Schema
	public String getBackgroundColor() {
		if (_backgroundColorSupplier != null) {
			backgroundColor = _backgroundColorSupplier.get();

			_backgroundColorSupplier = null;
		}

		return backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;

		_backgroundColorSupplier = null;
	}

	@JsonIgnore
	public void setBackgroundColor(
		UnsafeSupplier<String, Exception> backgroundColorUnsafeSupplier) {

		_backgroundColorSupplier = () -> {
			try {
				return backgroundColorUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected String backgroundColor;

	@JsonIgnore
	private Supplier<String> _backgroundColorSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getDescription() {
		if (_descriptionSupplier != null) {
			description = _descriptionSupplier.get();

			_descriptionSupplier = null;
		}

		return description;
	}

	public void setDescription(String description) {
		this.description = description;

		_descriptionSupplier = null;
	}

	@JsonIgnore
	public void setDescription(
		UnsafeSupplier<String, Exception> descriptionUnsafeSupplier) {

		_descriptionSupplier = () -> {
			try {
				return descriptionUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected String description;

	@JsonIgnore
	private Supplier<String> _descriptionSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Date getEndDateTime() {
		if (_endDateTimeSupplier != null) {
			endDateTime = _endDateTimeSupplier.get();

			_endDateTimeSupplier = null;
		}

		return endDateTime;
	}

	public void setEndDateTime(Date endDateTime) {
		this.endDateTime = endDateTime;

		_endDateTimeSupplier = null;
	}

	@JsonIgnore
	public void setEndDateTime(
		UnsafeSupplier<Date, Exception> endDateTimeUnsafeSupplier) {

		_endDateTimeSupplier = () -> {
			try {
				return endDateTimeUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected Date endDateTime;

	@JsonIgnore
	private Supplier<Date> _endDateTimeSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Long getId() {
		if (_idSupplier != null) {
			id = _idSupplier.get();

			_idSupplier = null;
		}

		return id;
	}

	public void setId(Long id) {
		this.id = id;

		_idSupplier = null;
	}

	@JsonIgnore
	public void setId(UnsafeSupplier<Long, Exception> idUnsafeSupplier) {
		_idSupplier = () -> {
			try {
				return idUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected Long id;

	@JsonIgnore
	private Supplier<Long> _idSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getImage() {
		if (_imageSupplier != null) {
			image = _imageSupplier.get();

			_imageSupplier = null;
		}

		return image;
	}

	public void setImage(String image) {
		this.image = image;

		_imageSupplier = null;
	}

	@JsonIgnore
	public void setImage(
		UnsafeSupplier<String, Exception> imageUnsafeSupplier) {

		_imageSupplier = () -> {
			try {
				return imageUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected String image;

	@JsonIgnore
	private Supplier<String> _imageSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getLocation() {
		if (_locationSupplier != null) {
			location = _locationSupplier.get();

			_locationSupplier = null;
		}

		return location;
	}

	public void setLocation(String location) {
		this.location = location;

		_locationSupplier = null;
	}

	@JsonIgnore
	public void setLocation(
		UnsafeSupplier<String, Exception> locationUnsafeSupplier) {

		_locationSupplier = () -> {
			try {
				return locationUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected String location;

	@JsonIgnore
	private Supplier<String> _locationSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	@JsonGetter("source")
	@Valid
	public Source getSource() {
		if (_sourceSupplier != null) {
			source = _sourceSupplier.get();

			_sourceSupplier = null;
		}

		return source;
	}

	@JsonIgnore
	public String getSourceAsString() {
		Source source = getSource();

		if (source == null) {
			return null;
		}

		return source.toString();
	}

	public void setSource(Source source) {
		this.source = source;

		_sourceSupplier = null;
	}

	@JsonIgnore
	public void setSource(
		UnsafeSupplier<Source, Exception> sourceUnsafeSupplier) {

		_sourceSupplier = () -> {
			try {
				return sourceUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected Source source;

	@JsonIgnore
	private Supplier<Source> _sourceSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Date getStartDateTime() {
		if (_startDateTimeSupplier != null) {
			startDateTime = _startDateTimeSupplier.get();

			_startDateTimeSupplier = null;
		}

		return startDateTime;
	}

	public void setStartDateTime(Date startDateTime) {
		this.startDateTime = startDateTime;

		_startDateTimeSupplier = null;
	}

	@JsonIgnore
	public void setStartDateTime(
		UnsafeSupplier<Date, Exception> startDateTimeUnsafeSupplier) {

		_startDateTimeSupplier = () -> {
			try {
				return startDateTimeUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected Date startDateTime;

	@JsonIgnore
	private Supplier<Date> _startDateTimeSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getTitle() {
		if (_titleSupplier != null) {
			title = _titleSupplier.get();

			_titleSupplier = null;
		}

		return title;
	}

	public void setTitle(String title) {
		this.title = title;

		_titleSupplier = null;
	}

	@JsonIgnore
	public void setTitle(
		UnsafeSupplier<String, Exception> titleUnsafeSupplier) {

		_titleSupplier = () -> {
			try {
				return titleUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected String title;

	@JsonIgnore
	private Supplier<String> _titleSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getUrl() {
		if (_urlSupplier != null) {
			url = _urlSupplier.get();

			_urlSupplier = null;
		}

		return url;
	}

	public void setUrl(String url) {
		this.url = url;

		_urlSupplier = null;
	}

	@JsonIgnore
	public void setUrl(UnsafeSupplier<String, Exception> urlUnsafeSupplier) {
		_urlSupplier = () -> {
			try {
				return urlUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_WRITE)
	protected String url;

	@JsonIgnore
	private Supplier<String> _urlSupplier;

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof Event)) {
			return false;
		}

		Event event = (Event)object;

		return Objects.equals(toString(), event.toString());
	}

	@Override
	public int hashCode() {
		String string = toString();

		return string.hashCode();
	}

	public String toString() {
		StringBundler sb = new StringBundler();

		sb.append("{");

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ss'Z'");

		String backgroundColor = getBackgroundColor();

		if (backgroundColor != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"backgroundColor\": ");

			sb.append("\"");

			sb.append(_escape(backgroundColor));

			sb.append("\"");
		}

		String description = getDescription();

		if (description != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"description\": ");

			sb.append("\"");

			sb.append(_escape(description));

			sb.append("\"");
		}

		Date endDateTime = getEndDateTime();

		if (endDateTime != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"endDateTime\": ");

			sb.append("\"");

			sb.append(liferayToJSONDateFormat.format(endDateTime));

			sb.append("\"");
		}

		Long id = getId();

		if (id != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"id\": ");

			sb.append(id);
		}

		String image = getImage();

		if (image != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"image\": ");

			sb.append("\"");

			sb.append(_escape(image));

			sb.append("\"");
		}

		String location = getLocation();

		if (location != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"location\": ");

			sb.append("\"");

			sb.append(_escape(location));

			sb.append("\"");
		}

		Source source = getSource();

		if (source != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"source\": ");

			sb.append("\"");

			sb.append(source);

			sb.append("\"");
		}

		Date startDateTime = getStartDateTime();

		if (startDateTime != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"startDateTime\": ");

			sb.append("\"");

			sb.append(liferayToJSONDateFormat.format(startDateTime));

			sb.append("\"");
		}

		String title = getTitle();

		if (title != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"title\": ");

			sb.append("\"");

			sb.append(_escape(title));

			sb.append("\"");
		}

		String url = getUrl();

		if (url != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"url\": ");

			sb.append("\"");

			sb.append(_escape(url));

			sb.append("\"");
		}

		sb.append("}");

		return sb.toString();
	}

	@io.swagger.v3.oas.annotations.media.Schema(
		accessMode = io.swagger.v3.oas.annotations.media.Schema.AccessMode.READ_ONLY,
		defaultValue = "events.dto.v1_0.Event", name = "x-class-name"
	)
	public String xClassName;

	@GraphQLName("Source")
	public static enum Source {

		INTERNAL("internal"), EXTERNAL("external");

		@JsonCreator
		public static Source create(String value) {
			if ((value == null) || value.equals("")) {
				return null;
			}

			for (Source source : values()) {
				if (Objects.equals(source.getValue(), value)) {
					return source;
				}
			}

			throw new IllegalArgumentException("Invalid enum value: " + value);
		}

		@JsonValue
		public String getValue() {
			return _value;
		}

		@Override
		public String toString() {
			return _value;
		}

		private Source(String value) {
			_value = value;
		}

		private final String _value;

	}

	private static String _escape(Object object) {
		return StringUtil.replace(
			String.valueOf(object), _JSON_ESCAPE_STRINGS[0],
			_JSON_ESCAPE_STRINGS[1]);
	}

	private static boolean _isArray(Object value) {
		if (value == null) {
			return false;
		}

		Class<?> clazz = value.getClass();

		return clazz.isArray();
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
			sb.append(_escape(entry.getKey()));
			sb.append("\": ");

			Object value = entry.getValue();

			if (_isArray(value)) {
				sb.append("[");

				Object[] valueArray = (Object[])value;

				for (int i = 0; i < valueArray.length; i++) {
					if (valueArray[i] instanceof Map) {
						sb.append(_toJSON((Map<String, ?>)valueArray[i]));
					}
					else if (valueArray[i] instanceof String) {
						sb.append("\"");
						sb.append(valueArray[i]);
						sb.append("\"");
					}
					else {
						sb.append(valueArray[i]);
					}

					if ((i + 1) < valueArray.length) {
						sb.append(", ");
					}
				}

				sb.append("]");
			}
			else if (value instanceof Map) {
				sb.append(_toJSON((Map<String, ?>)value));
			}
			else if (value instanceof String) {
				sb.append("\"");
				sb.append(_escape(value));
				sb.append("\"");
			}
			else {
				sb.append(value);
			}

			if (iterator.hasNext()) {
				sb.append(", ");
			}
		}

		sb.append("}");

		return sb.toString();
	}

	private static final String[][] _JSON_ESCAPE_STRINGS = {
		{"\\", "\"", "\b", "\f", "\n", "\r", "\t"},
		{"\\\\", "\\\"", "\\b", "\\f", "\\n", "\\r", "\\t"}
	};

	private Map<String, Serializable> _extendedProperties;

}