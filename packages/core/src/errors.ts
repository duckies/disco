import type { Interaction } from "discord.js";

export interface BotErrorOptions {
  /**
   * The original cause of the error.
   */
  cause?: unknown;
  /**
   * The reply to send to the user if the interaction is repliable.
   */
  reply?: string;
}

export class BotError extends Error {
  constructor(public readonly options?: BotErrorOptions) {
    super();

    this.name = this.constructor.name;
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

export class InternalBotError extends BotError {
  constructor(options?: BotErrorOptions) {
    super(options);
  }
}
