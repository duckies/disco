import {
  ApplicationCommandType,
  type ApplicationChatInputCommandAPI,
  type InteractionContextType,
  type SubCommandGroupOptionAPI,
} from "types";
import { Mixin } from "utils/mixins";
import { ApplicationCommand } from "./command";
import type { ApplicationCommandOption } from "./command-option";
import { SubCommandMixin } from "./mixins/sub-command";
import { SubCommandGroupOption } from "./options/sub-command-group";

export type ApplicationChatInputCommandOptionsOnly = {};

export interface ApplicationChatInputCommandSubCommandsOnly
  extends SubCommandMixin<ApplicationChatInputCommandSubCommandsOnly> {}

export interface ApplicationChatInputCommand
  extends SubCommandMixin<ApplicationChatInputCommandSubCommandsOnly> {}

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
@Mixin(SubCommandMixin)
export class ApplicationChatInputCommand extends ApplicationCommand {
  public readonly description!: string;
  public readonly required?: boolean;
  public readonly default_member_permissions?: string;
  public readonly nsfw?: boolean;
  public readonly contexts?: InteractionContextType[];
  public readonly options = new Map<string, ApplicationCommandOption>();

  constructor(options: Omit<ApplicationChatInputCommandAPI, "type">) {
    super({ type: ApplicationCommandType.ChatInput, name: options.name });

    this.description = options.description;
    this.default_member_permissions = options.default_member_permissions;
    this.nsfw = options.nsfw;
    this.contexts = options.contexts;
  }

  addSubCommandGroup(
    options: Omit<SubCommandGroupOptionAPI, "type">,
    callback?: (group: SubCommandGroupOption) => SubCommandGroupOption
  ): ApplicationChatInputCommandSubCommandsOnly {
    const option = new SubCommandGroupOption({
      name: options.name,
      description: options.description,
    });

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }

  toJSON() {
    return {
      ...this,
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}
