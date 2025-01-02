import type { ApplicationCommandType } from "discord.js";

import type { NonPartial } from "../types";

/**
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types
 */
export enum InteractionContextType {
  Guild,
  BotDM,
  PrivateChannel,
}

export interface ApplicationCommandAPIBase {
  contexts?: InteractionContextType[];
  name: string;
  type: ApplicationCommandType;
}

/**
 * Application Command
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export abstract class Command {
  public readonly contexts?: InteractionContextType[];
  public readonly name!: string;
  public readonly type!: ApplicationCommandType;

  constructor(options: ApplicationCommandAPIBase) {
    this.type = options.type;
    this.name = options.name;
    this.contexts = options.contexts;
  }

  public toJSON(): NonPartial<ApplicationCommandAPIBase> {
    return {
      contexts: this.contexts,
      name: this.name,
      type: this.type,
    };
  }
}

export { ApplicationCommandType } from "discord.js";
