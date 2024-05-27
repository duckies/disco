import { EventEmitter } from "node:events";
import { join } from "node:path";
import { Glob } from "bun";

import { ApplicationChatInputCommand } from "builders/application-chat-input-command";
import type { Module } from "types";
import { InteractionType, type Interaction } from "discord.js";
import { BotError, InternalBotError, UnhandledInteractionError } from "errors";

export interface CommanderOptions {
  /**
   * The path to the directory containing the commands.
   * @default "./src/commands"
   */
  path: string;
}

export interface CommanderEvents {
  "initialize": [commands: Map<string, ApplicationChatInputCommand<any>>];
  "error": [error: BotError];
}

export interface Commander extends EventEmitter {
  on<Event extends keyof CommanderEvents>(
    event: Event,
    listener: (...args: CommanderEvents[Event]) => void
  ): this

  once<Event extends keyof CommanderEvents>(
    event: Event,
    listener: (...args: CommanderEvents[Event]) => void
  ): this

  emit<Event extends keyof CommanderEvents>(event: Event, ...args: CommanderEvents[Event]): boolean
}

export class Commander extends EventEmitter {
  private readonly path: string;
  private readonly interactions = new Map<string, ApplicationChatInputCommand<any>>();

  constructor(options?: CommanderOptions) {
    super()
    this.path = options?.path ?? "./src/commands";

    void this.scan();
  }

  public async scan() {
    const glob = new Glob("**/*.{ts,js}");

    for await (const filePath of glob.scan({
      cwd: join(process.cwd(), this.path),
      absolute: true,
    })) {
      const file = await import(filePath) as Module
      const command = file.default instanceof ApplicationChatInputCommand ? file.default : null;

      if (command) {
        if (this.interactions.has(command.name)) {
          throw new Error(`Command with name ${command.name} already exists`);
        }

        this.interactions.set(command.name, command);
      }
    }

    this.emit("initialize", this.interactions);
  }

  private getCommand(name: string) {
    return this.interactions.get(name) ?? null;
  }

  public onInteraction(interaction: Interaction) {
    console.log(interaction)
    try {
      switch (interaction.type) {
        case InteractionType.ApplicationCommand: {
          const name = interaction.commandName
          const command = this.getCommand(name);
  
          if (!command) {
            throw new UnhandledInteractionError(interaction);
          }

          // TODO: Handle the fucking interaction.
        }
      }
    } catch (error) {
      this.emit("error", error instanceof BotError ? error : new InternalBotError({ cause: error }))
    }
  }
}