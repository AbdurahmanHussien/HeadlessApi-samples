package events.client.function;

import javax.annotation.Generated;

/**
 * @author ThinkPad
 * @generated
 */
@FunctionalInterface
@Generated("")
public interface UnsafeSupplier<T, E extends Throwable> {

	public T get() throws E;

}