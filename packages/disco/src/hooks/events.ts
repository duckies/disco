import type { ClientEvents } from "discord.js";

export type EventListener<E extends keyof ClientEvents = any> = EventListenerOptions<E>;

export interface EventListenerOptions<E extends keyof ClientEvents> {
  event: E;
  listener: (...args: ClientEvents[E]) => unknown;
  once?: boolean;
}

/**
 * Creates the structure for defining an event listener. This currently is no different than
 * using `Client.on(...)`, but other functionality is planned.
 */
export function defineEventListener<E extends keyof ClientEvents>(options: EventListenerOptions<E>): EventListener<E> {
  return {
    event: options.event,
    listener: options.listener,
    once: options.once,
  };
}
