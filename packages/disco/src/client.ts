import {
  Events,
  Client as _Client,
  type ClientOptions as _ClientOptions,
} from "discord.js";
import { Commander, type CommanderOptions } from "./commander";

export interface ClientOptions extends _ClientOptions {
  commander?: CommanderOptions;
}

/**
 * Discord client thingy,
 */
export class Client extends _Client {
  public readonly commander: Commander;

  constructor(options: ClientOptions) {
    super(options);

    this.commander = new Commander(options.commander);

    this.on(Events.InteractionCreate, (interaction) => {
      void this.commander
        .onInteraction(interaction)
        .catch((e: Error) => console.error(e));
    });
  }
}
