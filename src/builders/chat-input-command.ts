import {
  SlashCommandRoleOption,
  type ChatInputCommandInteraction,
  type CommandInteractionOption,
} from "discord.js";
import {
  CommandOptionConflictError,
  CommandOptionNotFoundError,
} from "../errors";
import type {
  CommandOptionAPI,
  Handler,
  NonPartial,
  Option,
  Params,
} from "../types";
import { applyMixins } from "../utils/mixins";
import {
  ApplicationCommandType,
  Command,
  type ApplicationCommandAPIBase,
} from "./command";
import { SubcommandMixin } from "./mixins/subcommand-mixin";
import { SubcommandOption, UserOption } from "./options";
import {
  SubcommandGroupOption,
  type SubcommandGroupOptionOptions,
} from "./options/subcommand-group";

export interface ChatInputCommandDTO extends ApplicationCommandAPIBase {
  description: string;
  default_member_permissions?: string;
  nsfw?: boolean;
  options?: CommandOptionAPI[];
}

export interface ChatInputCommandOptions<P extends Params>
  extends Omit<ChatInputCommandDTO, "type" | "options"> {
  options?: P;
  handler?: Handler<P>;
}

export interface ChatInputCommand extends SubcommandMixin {}

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export class ChatInputCommand<const P extends Params = any> extends Command {
  public readonly description: string;
  public readonly default_member_permissions?: string;
  public readonly nsfw?: boolean;
  public readonly options = new Map<string, Option>();
  public readonly handler?: Handler<P>;

  constructor({
    name,
    contexts,
    options,
    handler,
    description,
    default_member_permissions,
    nsfw,
  }: ChatInputCommandOptions<P>) {
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

  public addSubCommandGroup(
    options: SubcommandGroupOptionOptions,
    callback?: (group: SubcommandGroupOption) => SubcommandGroupOption
  ) {
    const option = new SubcommandGroupOption(options);

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }

  private _getContext(
    command: ChatInputCommand<any> | SubcommandGroupOption | SubcommandOption,
    data: readonly CommandInteractionOption[],
    params: Record<string, unknown> = {}
  ): {
    command: ChatInputCommand | SubcommandOption;
    params: Record<string, unknown>;
  } {
    for (const { name, type, ...metadata } of data) {
      const option = command.options.get(name);

      if (!option) {
        throw new CommandOptionNotFoundError();
      }

      if (option.type !== type) {
        throw new CommandOptionConflictError();
      }

      if (
        option instanceof SubcommandOption ||
        option instanceof SubcommandGroupOption
      ) {
        return this._getContext(option, metadata.options ?? [], params);
      }

      if (option instanceof UserOption) {
        params[name] = metadata.user;
      } else if (option instanceof SlashCommandRoleOption) {
        params[name] = metadata.role;
      } else {
        params[name] = metadata.value;
      }
    }

    return { command: command as SubcommandOption | ChatInputCommand, params };
  }

  private getContext(interaction: ChatInputCommandInteraction) {
    const { command, params } = this._getContext(
      this,
      interaction.options.data
    );

    if (!command.handler) {
      throw new Error(`Command ${command.name} has no handler`);
    }

    return { context: { interaction, params }, handler: command.handler };
  }

  public async handleInteraction(interaction: ChatInputCommandInteraction) {
    const { context, handler } = this.getContext(interaction);

    await handler(context);
    // void interaction.reply("NYI");
  }

  public override toJSON(): NonPartial<ChatInputCommandDTO> {
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

applyMixins(ChatInputCommand, [SubcommandMixin]);
