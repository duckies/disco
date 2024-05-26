import {
  ApplicationChatInputCommand,
  type ApplicationChatInputCommandOptions,
} from "builders/application-chat-input-command";
import type { ApplicationCommandOptionAPI } from "builders/application-command-option";

import type { ClientOptions } from "discord.js";
import { Client } from "discord.js";

export class DiscordClient extends Client {
  public readonly commands = new Map<
    string,
    ApplicationChatInputCommand<any>
  >();

  constructor(options: ClientOptions) {
    super(options);
  }

  defineCommand<const T extends ApplicationCommandOptionAPI[]>(
    options: ApplicationChatInputCommandOptions<T>
  ) {
    const command = new ApplicationChatInputCommand(options);

    this.commands.set(command.name, command);

    return command;
  }
}
