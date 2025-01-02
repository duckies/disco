import type { ChatInputCommandInteraction, Interaction } from "discord.js";

import type { ChatInputCommand, SubcommandOption } from ".";

import { isString } from "./utils/guards";

export interface BotCommandErrorOptions extends BotErrorOptions {
  command: ChatInputCommand | SubcommandOption;
}

export interface BotErrorOptions {
  /**
   * The original cause of the error.
   */
  cause?: unknown;
  /**
   * The internal error message.
   */
  message?: string;
  /**
   * The reply to send to the user if the interaction is repliable.
   */
  reply?: string;
}

export class BotError extends Error {
  constructor(public readonly optionsOrMessage?: BotErrorOptions | string) {
    if (isString(optionsOrMessage)) {
      super(optionsOrMessage);
    }
    else {
      super(optionsOrMessage?.message, { cause: optionsOrMessage?.cause });
    }

    this.name = this.constructor.name;
  }
}

export class BotCommandError extends BotError {
  public readonly command;

  constructor({ command, ...botErrorOptions }: BotCommandErrorOptions) {
    super(botErrorOptions);

    this.command = command;
  }
}

export class CommandNotFoundError extends BotError {
  constructor(
    interaction: ChatInputCommandInteraction,
    options?: BotErrorOptions,
  ) {
    super({
      message: `Command "${interaction.commandName} not found`,
      ...options,
    });
  }
}

export class CommandOptionConflictError extends BotError {
  constructor(
    public readonly option: string,
    // public readonly expectedType: ApplicationCommandOptionType,
    // public readonly type: ApplicationCommandOptionType,
    options?: BotErrorOptions | string) {
    super(options);
  }
}

export class CommandOptionNotFoundError extends BotError {
  constructor(public readonly option: string, options?: BotErrorOptions | string) {
    super(options);
  }
}

export class InternalBotError extends BotError {
  constructor(options?: BotErrorOptions) {
    super(options);
  }
}

/**
 * Instantiate a `UnhandledInteractionError`.
 *
 * This error is the result of the `Commander` class being unable to locate
 * a handler for a given interaction. The commands are likely out of sync
 * with Discord's servers.
 */
export class UnhandledInteractionError extends BotError {
  public readonly interaction: Interaction;

  constructor(interaction: Interaction, options?: BotErrorOptions) {
    super(options);
    this.interaction = interaction;
  }
}
