import {
  type ApplicationCommandAPIBase,
  type ApplicationCommandType,
} from "types";

/**
 * Application Command
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export abstract class ApplicationCommand {
  public readonly type!: ApplicationCommandType;
  public readonly name!: string;

  constructor(options: ApplicationCommandAPIBase) {
    this.type = options.type;
    this.name = options.name;
  }
}
