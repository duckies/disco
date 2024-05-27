import type { ApplicationChatInputCommand } from "builders/application-chat-input-command";
import { Commander, type CommanderOptions } from "commander";
import { Client as _Client, type ClientOptions as _ClientOptions } from "discord.js";
import type { BotError } from "errors";

export interface ClientOptions extends _ClientOptions {
  commander?: CommanderOptions;
}

export class Client extends _Client {
  public readonly commander: Commander

  constructor(options: ClientOptions) {
    super(options);

    this.commander = new Commander(options?.commander)

    this.commander.on("initialize", this.onInitialize.bind(this))
    this.commander.on("error", this.onError.bind(this))
    this.once("ready", this.onReady.bind(this));
    this.on("interactionCreate", this.commander.onInteraction.bind(this));
  }

  private onInitialize(commands: Map<string, ApplicationChatInputCommand<any>>) {
    console.log(`[Client]: Initialized with ${commands.size} command(s).`)
  }

  private onError(error: BotError) {
    console.error(`[Client Error]: ${error.name}`, error)
  }

  private onReady(client: _Client<true>) {
    console.log(`Logged in as ${client.user?.tag}`);
  }
}
