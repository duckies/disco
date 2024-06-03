export type EventName = PropertyKey;

export type EventMap<T> = Record<keyof T, unknown[]>;

export type Listener<K extends keyof T, T extends EventMap<T>> = (
  ...args: T[K]
) => void | Promise<void>;

export type Func = (...args: any[]) => void | Promise<void>;

/**
 * Yet another EventEmitter implementation.
 */
export class Emitter<T extends EventMap<T>> {
  public readonly events = new Map<keyof T, Set<Func>>();

  public on<K extends keyof T>(event: K, listener: Listener<K, T>): void {
    const listeners = this.events.get(event) ?? new Set();
    listeners.add(listener);
    this.events.set(event, listeners);
  }

  public once<K extends keyof T>(event: K, listener: Listener<K, T>): void {
    const wrappedFn: Listener<K, T> = async (...args) => {
      await Promise.resolve(listener(...args));
      this.off(event, wrappedFn);
    };

    this.on(event, wrappedFn);
  }

  public off<K extends keyof T>(event: K, listener?: Listener<K, T>): boolean {
    if (!listener) {
      return this.events.delete(event);
    }

    return this.events.get(event)?.delete(listener) ?? false;
  }

  public async emit<K extends keyof T>(event: K, ...args: T[K]): Promise<void> {
    const listeners = this.events.get(event);

    if (listeners && listeners.size > 0) {
      // TODO: Why did the `emittery` package require a second `await Promise.resolve()`?
      await Promise.all([...listeners].map((fn) => fn(...args)));
    }
  }
}
