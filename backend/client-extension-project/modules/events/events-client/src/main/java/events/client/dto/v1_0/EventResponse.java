package events.client.dto.v1_0;

import events.client.dto.v1_0.Event;
import events.client.function.UnsafeSupplier;
import events.client.serdes.v1_0.EventResponseSerDes;

import java.io.Serializable;

import java.util.Objects;

import javax.annotation.Generated;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class EventResponse implements Cloneable, Serializable {

	public static EventResponse toDTO(String json) {
		return EventResponseSerDes.toDTO(json);
	}

	public Event[] getEvents() {
		return events;
	}

	public void setEvents(Event[] events) {
		this.events = events;
	}

	public void setEvents(
		UnsafeSupplier<Event[], Exception> eventsUnsafeSupplier) {

		try {
			events = eventsUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Event[] events;

	@Override
	public EventResponse clone() throws CloneNotSupportedException {
		return (EventResponse)super.clone();
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof EventResponse)) {
			return false;
		}

		EventResponse eventResponse = (EventResponse)object;

		return Objects.equals(toString(), eventResponse.toString());
	}

	@Override
	public int hashCode() {
		String string = toString();

		return string.hashCode();
	}

	public String toString() {
		return EventResponseSerDes.toJSON(this);
	}

}