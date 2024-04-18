import {
  ApplicationCommandType,
  type ApplicationChatInputCommandOptions,
  type ApplicationCommandOptionAPI,
  type InteractionContextType,
  type SubCommandGroupOptionAPI,
  type SubCommandOptionAPI,
} from "types";
import { ApplicationCommand } from "./command";
import { SubCommandGroupOption } from "./options/sub-command-group";
import { SubCommandOption } from "./options/sub-command-option";

export type ApplicationChatInputCommandOptionsOnly = Omit<
  ApplicationChatInputCommand,
  "addSubCommand"
>;

export type ApplicationChatInputCommandSubCommandsOnly =
  ApplicationChatInputCommand;

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export class ApplicationChatInputCommand extends ApplicationCommand {
  public readonly description!: string;
  public required?: boolean;
  public default_member_permissions?: string;
  public nsfw?: boolean;
  public contexts?: InteractionContextType[];

  public readonly options = new Map<string, ApplicationCommandOptionAPI>();

  constructor(options: Omit<ApplicationChatInputCommandOptions, "type">) {
    super({ type: ApplicationCommandType.ChatInput, name: options.name });

    this.description = options.description;
    this.default_member_permissions = options.default_member_permissions;
    this.nsfw = options.nsfw;
    this.contexts = options.contexts;
  }

  addSubCommand(
    options: Omit<SubCommandOptionAPI, "type">
  ): ApplicationChatInputCommandSubCommandsOnly {
    const option = new SubCommandOption(options, (g) => g);

    this.options.set(option.name, option);

    return this;
  }

  addSubCommandGroup(
    options: Omit<SubCommandGroupOptionAPI, "type">,
    callback: (group: SubCommandGroupOption) => SubCommandGroupOption
  ): ApplicationChatInputCommandSubCommandsOnly {
    const option = new SubCommandGroupOption({
      name: options.name,
      description: options.description,
    });

    this.options.set(option.name, option);

    callback(option);

    return this;
  }
}
