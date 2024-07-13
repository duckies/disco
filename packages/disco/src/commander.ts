import { InteractionType, type Interaction } from "discord.js";
import type { ChatInputCommand } from "./builders/chat-input-command";
import { ApplicationCommandType } from "./builders/command";
import { BotError, InternalBotError } from "./errors";
import { Emitter } from "./utils/emitter";

export interface CommanderOptions {
  /**
   * The chat input commands to register with the bot.
   */
  commands: ChatInputCommand[];
}

export interface CommanderEvents {
  initialize: [commands: Map<string, ChatInputCommand<any>>];
  error: [error: BotError];
}

export class Commander extends Emitter<CommanderEvents> {
  public readonly commands: Map<string, ChatInputCommand>;

  constructor(options: CommanderOptions = { commands: [] }) {
    super();

    this.commands = new Map(
      options.commands.map((command) => [command.name, command])
    );
  }

  public async onInteraction(interaction: Interaction) {
    try {
      switch (interaction.type) {
        case InteractionType.ApplicationCommand: {
          switch (interaction.commandType) {
            case ApplicationCommandType.ChatInput:
              await this.commands
                .get(interaction.commandName)
                ?.handleInteraction(interaction);
              break;
          }
          break;
        }
        default:
          throw new Error(`Unimplemented interaction ${interaction.id}`);
      }
    } catch (error) {
      console.error(error);
      void this.emit(
        "error",
        error instanceof BotError
          ? error
          : new InternalBotError({ cause: error })
      );
    }
  }
}
