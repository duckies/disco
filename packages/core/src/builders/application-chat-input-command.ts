import {
  type ApplicationCommandOption,
  type ApplicationCommandOptionAPI,
  type Handler,
  type Params,
} from "../types";
import { applyMixins } from "../utils/mixins";
import {
  ApplicationCommand,
  ApplicationCommandType,
  type ApplicationCommandAPIBase,
} from "./application-command";
import { } from "./application-command-option";
import { ApplicationCommandOptionSubCommandMixin } from "./mixins/application-command-subcommand-mixin";
import {
  ApplicationCommandSubCommandGroupOption,
  type ApplicationCommandSubCommandGroupOptionOptions,
} from "./options/application-command-subcommand-group-option";

export interface ApplicationChatInputCommandAPI
  extends ApplicationCommandAPIBase {
  description: string;
  default_member_permissions?: string;
  nsfw?: boolean;
  options?: ApplicationCommandOptionAPI[];
}

export interface ApplicationChatInputCommandOptions<
  P extends Params
> extends Omit<ApplicationChatInputCommandAPI, "type" | "options"> {
  options?: P;
  handler?: Handler<P>;
}

export interface ApplicationChatInputCommand<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  P extends Params
> extends ApplicationCommandOptionSubCommandMixin {
}

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export class ApplicationChatInputCommand<
  const P extends Params
> extends ApplicationCommand {
  public readonly description: string;
  public readonly default_member_permissions?: string;
  public readonly nsfw?: boolean;
  public readonly options = new Map<string, ApplicationCommandOption>();
  public readonly handler?: Handler<P>;

  constructor({
    name,
    contexts,
    options,
    handler,
    description,
    default_member_permissions,
    nsfw
  }: ApplicationChatInputCommandOptions<P>) {
    super({
      type: ApplicationCommandType.ChatInput,
      name,
      contexts,
    });

    this.handler = handler;
    this.description = description;
    this.default_member_permissions = default_member_permissions;
    this.nsfw = nsfw;

    for (const [name, option] of Object.entries(options ?? {})) {
      if (this.options.has(name)) {
        throw new Error(`Option with name ${name} already exists`);
      }

      this.options.set(name, option);
    }
  }

  addSubCommandGroup(
    options: ApplicationCommandSubCommandGroupOptionOptions,
    callback?: (
      group: ApplicationCommandSubCommandGroupOption
    ) => ApplicationCommandSubCommandGroupOption
  ) {
    const option = new ApplicationCommandSubCommandGroupOption(options);

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }

  public toJSON(): ApplicationChatInputCommandAPI {
    return {
      ...super.toJSON(),
      description: this.description,
      default_member_permissions: this.default_member_permissions,
      contexts: this.contexts,
      nsfw: this.nsfw,
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}

applyMixins(ApplicationChatInputCommand, [
  ApplicationCommandOptionSubCommandMixin,
]);
