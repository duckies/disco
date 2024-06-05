import { ApplicationCommandType } from "discord.js";
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
  type: ApplicationCommandType;
  name: string;
  contexts?: InteractionContextType[];
}

/**
 * Application Command
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export abstract class ApplicationCommand {
  public readonly type!: ApplicationCommandType;
  public readonly name!: string;
  public readonly contexts?: InteractionContextType[];

  constructor(options: ApplicationCommandAPIBase) {
    this.type = options.type;
    this.name = options.name;
    this.contexts = options.contexts;
  }

  public toJSON(): NonPartial<ApplicationCommandAPIBase> {
    return {
      type: this.type,
      name: this.name,
      contexts: this.contexts,
    };
  }
}

export { ApplicationCommandType };
