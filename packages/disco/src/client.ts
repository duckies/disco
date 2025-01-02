import {
  Client as _Client,
  type ClientOptions as _ClientOptions,
  Events,
} from "discord.js";

import type { EventListener } from "./hooks/events";

import { Commander, type CommanderOptions } from "./commander";

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
    return [...this.commander.commands.values()];
  }

  constructor(options: ClientOptions) {
    super(options);

    this.commander = new Commander(options.commander ?? { commands: [] });

    this.on(Events.InteractionCreate, (interaction) => {
      void this.commander
        .onInteraction(interaction)
        .catch((error: Error) => console.error(error));
    });

    if (options.listeners) {
      for (const listener of options.listeners) {
        if (listener.once) {
          this.once(listener.event, listener.listener);
        }
        else {
          this.on(listener.event, listener.listener);
        }
      }
    }
  }
}
