import type { ClientEvents } from "discord.js";


export interface EventListenerOptions<E extends keyof ClientEvents> {
  event: E,
  once?: boolean,
  listener: (...args: ClientEvents[E]) => unknown
}

export type EventListener<E extends keyof ClientEvents = any> = EventListenerOptions<E>;

/**
 * Creates the structure for defining an event listener. This currently is no different than
 * using `Client.on(...)`, but other functionality is planned.
 */
export function defineEventListener<E extends keyof ClientEvents>(options: EventListenerOptions<E>): EventListener<E> {
  return {
    event: options.event,
    once: options.once,
    listener: options.listener,
  }
}
