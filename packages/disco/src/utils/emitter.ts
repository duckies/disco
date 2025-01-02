export type EventMap<T> = Record<keyof T, unknown[]>;

export type EventName = PropertyKey;

export type Fn = (...arguments_: any[]) => Promise<void> | void;

export type Listener<K extends keyof T, T extends EventMap<T>> = (
  ...arguments_: T[K]
) => Promise<void> | void;

/**
 * Yet another EventEmitter implementation.
 */
export class Emitter<T extends EventMap<T>> {
  public readonly events = new Map<keyof T, Set<Fn>>();

  public async emit<K extends keyof T>(event: K, ...arguments_: T[K]): Promise<void> {
    const listeners = this.events.get(event);

    if (listeners && listeners.size > 0) {
      // TODO: Why did the `emittery` package require a second `await Promise.resolve()`?
      await Promise.all([...listeners].map(function_ => function_(...arguments_)));
    }
  }

  public off<K extends keyof T>(event: K, listener?: Listener<K, T>): boolean {
    if (!listener) {
      return this.events.delete(event);
    }

    return this.events.get(event)?.delete(listener) ?? false;
  }

  public on<K extends keyof T>(event: K, listener: Listener<K, T>): void {
    const listeners = this.events.get(event) ?? new Set();
    listeners.add(listener);
    this.events.set(event, listeners);
  }

  public once<K extends keyof T>(event: K, listener: Listener<K, T>): void {
    const wrappedFunction: Listener<K, T> = async (...arguments_) => {
      await Promise.resolve(listener(...arguments_));
      this.off(event, wrappedFunction);
    };

    this.on(event, wrappedFunction);
  }
}
