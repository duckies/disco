import {
  type ChatInputCommandInteraction,
  type CommandInteractionOption,
  SlashCommandRoleOption,
} from "discord.js";

import type {
  CommandOptionAPI,
  Handler,
  NonPartial,
  Option,
  Params,
} from "../types";
import type { SubcommandGroupOption } from "./options/subcommand-group";

import {
  BotError,
} from "../errors";
import { applyMixins } from "../utils";
import { isArray, isSubcommand, isSubcommandGroup } from "../utils/guards";
import {
  type ApplicationCommandAPIBase,
  ApplicationCommandType,
  Command,
} from "./command";
import { OptionsMixin } from "./mixins/options-mixin";
import { type SubcommandOption, UserOption } from "./options";

export interface ChatInputCommand extends OptionsMixin<Option> {}

export interface ChatInputCommandDTO extends ApplicationCommandAPIBase {
  default_member_permissions?: string;
  description: string;
  nsfw?: boolean;
  options?: (SubcommandGroupOption | SubcommandOption)[] | CommandOptionAPI[];
}

export interface ChatInputCommandOptions<P extends Params>
  extends Omit<ChatInputCommandDTO, "options" | "type"> {
  handler?: Handler<P>;
  options?: (SubcommandGroupOption | SubcommandOption)[] | P;
}

/**
 * Application Command (ChatInput)
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
 */
export class ChatInputCommand<const P extends Params = any> extends Command {
  public readonly default_member_permissions?: string;
  public readonly description: string;
  public readonly handler?: Handler<P>;
  public readonly nsfw?: boolean;
  public readonly options = new Map<string, Option>();

  constructor({
    contexts,
    default_member_permissions,
    description,
    handler,
    name,
    nsfw,
    options,
  }: ChatInputCommandOptions<P>) {
    super({
      contexts,
      name,
      type: ApplicationCommandType.ChatInput,
    });

    this.handler = handler;
    this.description = description;
    this.default_member_permissions = default_member_permissions;
    this.nsfw = nsfw;

    if (options) {
      const _options = isArray(options) ? options : Object.values(options);
      for (const o of _options) this.addOption(o);
    }
  }

  public async handleInteraction(interaction: ChatInputCommandInteraction) {
    const { context, handler } = this.getContext(interaction);

    try {
      await handler(context);
    }
    catch (error) {
      console.error(error);

      // TODO: If the reply is deferred, edit the message with the error.
      if (!interaction.replied) {
        await interaction.reply({
          content: "An error occurred, try again later.",
          ephemeral: true,
        });
      }
    }
  }

  public override toJSON(): NonPartial<ChatInputCommandDTO> {
    return {
      ...super.toJSON(),
      contexts: this.contexts,
      default_member_permissions: this.default_member_permissions,
      description: this.description,
      nsfw: this.nsfw,
      options: [...this.options.values()].map(option => option.toJSON()),
    };
  }

  public override toString() {
    return `ChatInputCommand<${this.name}>`;
  }

  private _getContext(
    command: ChatInputCommand | SubcommandGroupOption | SubcommandOption,
    data: readonly CommandInteractionOption[],
    params: Record<string, unknown> = {},
  ): {
      command: ChatInputCommand | SubcommandOption;
      params: Record<string, unknown>;
    } {
    for (const { name, type, ...metadata } of data) {
      const option = command.getOption(name, type);

      if (isSubcommand(option) || isSubcommandGroup(option)) {
        return this._getContext(option, metadata.options ?? [], params);
      }

      // FIXME: This needs to be punted to the option.
      if (option instanceof UserOption) {
        // TODO: Include a way of adding or differentiating member vs user.
        params[name] = metadata.user;
      }
      else if (option instanceof SlashCommandRoleOption) {
        params[name] = metadata.role;
      }
      else {
        params[name] = metadata.value;
      }
    }

    return { command: command as ChatInputCommand | SubcommandOption, params };
  }

  private getContext(interaction: ChatInputCommandInteraction) {
    const { command, params } = this._getContext(this, interaction.options.data);

    if (!command.handler) {
      throw new BotError({
        message: `${command.toString()} has no handler`,
        reply: `This command is not yet implemented 🚧`,
      });
    }

    return { context: { interaction, params }, handler: command.handler };
  }
}

applyMixins(ChatInputCommand, [OptionsMixin]);
