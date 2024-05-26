import {
  GroupChatInputCommand,
  RootChatInputCommand,
  type ChatInputCommand,
  type GroupChatInputCommandOptions,
  type RootChatInputCommandOptions,
} from "builders/chat-input-command";
import type { ClientOptions } from "discord.js";
import { Client } from "discord.js";
import type { ApplicationCommandSimpleOptionAPI } from "types";

export class DiscordClient extends Client {
  public readonly commands = new Map<string, ChatInputCommand>();

  constructor(options: ClientOptions) {
    super(options);
  }

  defineCommand(options: GroupChatInputCommandOptions) {
    const command = new GroupChatInputCommand(options);

    this.commands.set(command.name, command);

    return command;
  }

  defineRootCommand<const T extends ApplicationCommandSimpleOptionAPI[]>(
    options: RootChatInputCommandOptions<T>
  ) {
    const command = new RootChatInputCommand(options);

    this.commands.set(command.name, command);

    return command;
  }
}
