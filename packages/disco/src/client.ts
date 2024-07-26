import {
  Events,
  Client as _Client,
  type ClientOptions as _ClientOptions,
} from "discord.js";
import { Commander, type CommanderOptions } from "./commander";
import type { EventListener } from "./hooks/events";

export interface ClientOptions extends _ClientOptions {
  commander?: CommanderOptions;
  listeners?: EventListener[];
}

/**
 * Discord client thingy,
 */
export class Client extends _Client {
  public readonly commander: Commander;

  public get commands() {
    return Array.from(this.commander.commands.values())
  }

  constructor(options: ClientOptions) {
    super(options);

    this.commander = new Commander(options.commander);

    this.on(Events.InteractionCreate, (interaction) => {
      void this.commander
        .onInteraction(interaction)
        .catch((e: Error) => console.error(e));
    });

    if (options.listeners) {
      options.listeners.forEach((listener) => {
        if (listener.once) {
          this.once(listener.event, listener.listener);
        } else {
          this.on(listener.event, listener.listener);
        }
      })
    }
  }
}
