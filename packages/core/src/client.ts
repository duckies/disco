import { Client as _Client, type ClientOptions as _ClientOptions } from "discord.js";
import { Commander, type CommanderOptions } from "./commander";

export interface ClientOptions extends _ClientOptions {
  commander?: CommanderOptions;
}

/**
 * Discord client.
 */
export class Client extends _Client {
  public readonly commander: Commander

  constructor(options: ClientOptions) {
    super(options);

    this.commander = new Commander(options?.commander)

    this.on("interactionCreate", this.commander.onInteraction.bind(this));
  }
}
