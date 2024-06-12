import { InteractionType, type Interaction } from "discord.js";
import { ChatInputCommand } from "./builders/chat-input-command";
import { ApplicationCommandType, type Command } from "./builders/command";
import { BotError, InternalBotError } from "./errors";
import { Emitter } from "./utils/emitter";
import { isArray } from "./utils/is";

export interface CommanderOptions {
  /**
   * The path (or paths) to scan the filesystem or an array of commands to register.
   * @default ./src/commands
   */
  commands?: string | string[] | Command[];
  /**
   * The current working directory for filesystem scanning.
   * @default process.cwd()
   */
  cwd?: string;
}

export interface CommanderEvents {
  initialize: [commands: Map<string, ChatInputCommand<any>>];
  error: [error: BotError];
}

export class Commander extends Emitter<CommanderEvents> {
  public readonly commands = new Map<string, ChatInputCommand>();

  constructor(options?: CommanderOptions) {
    super();

    if (isArray(options?.commands)) {
      for (const command of options.commands) {
        if (!(command instanceof ChatInputCommand)) {
          throw new Error(
            "Commands must be an instance of ApplicationChatInputCommand"
          );
        }

        // TODO: Check for name collisions.
        this.commands.set(command.name, command);
      }
    }
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
