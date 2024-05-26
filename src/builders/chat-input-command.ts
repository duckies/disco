import {
  ApplicationCommandType,
  type ApplicationChatInputCommandAPI,
  type ApplicationCommandSimpleOptionAPI,
  type Handler,
  type InteractionContextType,
  type SubCommandGroupOptionAPI,
} from "types";
import { Mixin } from "utils/mixins";
import { ApplicationCommand } from "./command";
import type { ApplicationCommandOption } from "./command-option";
import { SubCommandMixin } from "./mixins/sub-command";
import { SubCommandGroupOption } from "./options/sub-command-group";

export type ChatInputCommandOptions = Omit<
  ApplicationChatInputCommandAPI,
  "type" | "options"
>;

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export abstract class ChatInputCommand extends ApplicationCommand {
  public readonly description!: string;
  public readonly default_member_permissions?: string;
  public readonly nsfw?: boolean;
  public readonly contexts?: InteractionContextType[];
  public readonly options = new Map<string, ApplicationCommandOption>();

  constructor(options: ChatInputCommandOptions) {
    super({ type: ApplicationCommandType.ChatInput, name: options.name });

    this.description = options.description;
    this.default_member_permissions = options.default_member_permissions;
    this.nsfw = options.nsfw;
    this.contexts = options.contexts;
  }

  toJSON() {
    return {
      ...this,
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}

export interface GroupChatInputCommandOptions
  extends ChatInputCommandOptions,
    SubCommandMixin {}

@Mixin(SubCommandMixin)
export class GroupChatInputCommand extends ChatInputCommand {
  constructor(options: GroupChatInputCommandOptions) {
    super(options);
  }

  addSubCommandGroup(
    options: SubCommandGroupOptionAPI,
    callback?: (group: SubCommandGroupOption) => SubCommandGroupOption
  ) {
    const option = new SubCommandGroupOption(options);

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }
}

export interface RootChatInputCommandOptions<
  T extends ApplicationCommandSimpleOptionAPI[]
> extends Omit<ChatInputCommandOptions, "options"> {
  options?: T;
  handler?: Handler<T>;
}

export class RootChatInputCommand<
  const T extends ApplicationCommandSimpleOptionAPI[]
> extends ChatInputCommand {
  public readonly handler?: Handler<T>;

  constructor({
    options,
    handler,
    ...metadata
  }: RootChatInputCommandOptions<T>) {
    super(metadata);

    // Do something with options
    options;
    this.handler = handler;
  }
}
