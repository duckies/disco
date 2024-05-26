import {
  type ApplicationCommandOption,
  type ApplicationCommandOptionAPI,
  type Handler,
} from "types";
import { applyMixins } from "utils/mixins";
import { createOption } from "utils/create-option";
import {
  ApplicationCommand,
  ApplicationCommandType,
  type ApplicationCommandAPIBase,
} from "./application-command";
import {} from "./application-command-option";
import {
  ApplicationCommandSubCommandGroupOption,
  type ApplicationCommandSubCommandGroupOptionOptions,
} from "./options/application-command-subcommand-group-option";
import { ApplicationCommandOptionSubCommandMixin } from "./mixins/application-command-subcommand-mixin";

export interface ApplicationChatInputCommandAPI
  extends ApplicationCommandAPIBase {
  description: string;
  default_member_permissions?: string;
  nsfw?: boolean;
  options?: ApplicationCommandOptionAPI[];
}

export interface ApplicationChatInputCommandOptions<
  T extends ApplicationCommandOptionAPI[]
> extends Omit<ApplicationChatInputCommandAPI, "type"> {
  options?: T;
  handler?: Handler<T>;
}

export interface ApplicationChatInputCommand<
  T extends ApplicationCommandOptionAPI[]
> extends ApplicationCommandOptionSubCommandMixin {
  readonly handler?: Handler<T>;
}

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export class ApplicationChatInputCommand<
  const T extends ApplicationCommandOptionAPI[] = []
> extends ApplicationCommand {
  public readonly description!: string;
  public readonly default_member_permissions?: string;
  public readonly nsfw?: boolean;
  public readonly options = new Map<string, ApplicationCommandOption>();
  public readonly handler?: Handler<T>;

  constructor({
    name,
    contexts,
    options,
    ...meta
  }: ApplicationChatInputCommandOptions<T>) {
    super({
      type: ApplicationCommandType.ChatInput,
      name,
      contexts,
    });

    Object.assign(this, meta);

    for (const option of options ?? []) {
      if (this.options.has(option.name)) {
        throw new Error(`Option with name ${option.name} already exists`);
      }

      this.options.set(option.name, createOption(option));
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

  toJSON() {
    return {
      ...this,
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}

applyMixins(ApplicationChatInputCommand, [
  ApplicationCommandOptionSubCommandMixin,
]);
