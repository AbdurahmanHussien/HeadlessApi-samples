package events.client.dto.v1_0;

import events.client.function.UnsafeSupplier;
import events.client.serdes.v1_0.EventSerDes;

import java.io.Serializable;

import java.util.Date;
import java.util.Objects;

import javax.annotation.Generated;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class Event implements Cloneable, Serializable {

	public static Event toDTO(String json) {
		return EventSerDes.toDTO(json);
	}

	public String getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public void setBackgroundColor(
		UnsafeSupplier<String, Exception> backgroundColorUnsafeSupplier) {

		try {
			backgroundColor = backgroundColorUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String backgroundColor;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDescription(
		UnsafeSupplier<String, Exception> descriptionUnsafeSupplier) {

		try {
			description = descriptionUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String description;

	public Date getEndDateTime() {
		return endDateTime;
	}

	public void setEndDateTime(Date endDateTime) {
		this.endDateTime = endDateTime;
	}

	public void setEndDateTime(
		UnsafeSupplier<Date, Exception> endDateTimeUnsafeSupplier) {

		try {
			endDateTime = endDateTimeUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Date endDateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setId(UnsafeSupplier<Long, Exception> idUnsafeSupplier) {
		try {
			id = idUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Long id;

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setImage(
		UnsafeSupplier<String, Exception> imageUnsafeSupplier) {

		try {
			image = imageUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String image;

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setLocation(
		UnsafeSupplier<String, Exception> locationUnsafeSupplier) {

		try {
			location = locationUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String location;

	public Source getSource() {
		return source;
	}

	public String getSourceAsString() {
		if (source == null) {
			return null;
		}

		return source.toString();
	}

	public void setSource(Source source) {
		this.source = source;
	}

	public void setSource(
		UnsafeSupplier<Source, Exception> sourceUnsafeSupplier) {

		try {
			source = sourceUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Source source;

	public Date getStartDateTime() {
		return startDateTime;
	}

	public void setStartDateTime(Date startDateTime) {
		this.startDateTime = startDateTime;
	}

	public void setStartDateTime(
		UnsafeSupplier<Date, Exception> startDateTimeUnsafeSupplier) {

		try {
			startDateTime = startDateTimeUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Date startDateTime;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setTitle(
		UnsafeSupplier<String, Exception> titleUnsafeSupplier) {

		try {
			title = titleUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String title;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setUrl(UnsafeSupplier<String, Exception> urlUnsafeSupplier) {
		try {
			url = urlUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String url;

	@Override
	public Event clone() throws CloneNotSupportedException {
		return (Event)super.clone();
	}

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
		return EventSerDes.toJSON(this);
	}

	public static enum Source {

		INTERNAL("internal"), EXTERNAL("external");

		public static Source create(String value) {
			for (Source source : values()) {
				if (Objects.equals(source.getValue(), value) ||
					Objects.equals(source.name(), value)) {

					return source;
				}
			}

			return null;
		}

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

}