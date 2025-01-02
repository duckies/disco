import type {
  ApplicationCommandOptionType,
  Attachment,
  Channel,
  ChatInputCommandInteraction,
  Role,
  User,
} from "discord.js";

import type { Option, SimpleOption } from "./application-commands";
import type { Simplify } from "./utility";

export interface ApplicationCommandOptionParameterType {
  [ApplicationCommandOptionType.Attachment]: Attachment;
  [ApplicationCommandOptionType.Boolean]: boolean;
  [ApplicationCommandOptionType.Channel]: Channel;
  [ApplicationCommandOptionType.Integer]: number;
  [ApplicationCommandOptionType.Mentionable]: Role | User;
  [ApplicationCommandOptionType.Number]: number;
  [ApplicationCommandOptionType.Role]: Role;
  [ApplicationCommandOptionType.String]: string;
  [ApplicationCommandOptionType.Subcommand]: never;
  [ApplicationCommandOptionType.SubcommandGroup]: never;
  [ApplicationCommandOptionType.User]: User;
}

// export interface OptionTypeMap {
//   ApplicationCommandSubCommandOption: never;
//   ApplicationCommandSubCommandGroupOption: never;
//   ApplicationCommandStringOption: string;
//   ApplicationCommandIntegerOption: number;
//   ApplicationCommandBooleanOption: boolean;
//   ApplicationCommandUserOption: User;
//   ApplicationCommandChannelOption: Channel;
//   ApplicationCommandRoleOption: Role;
//   ApplicationCommandMentionableOption: User | Role;
//   ApplicationCommandNumberOption: number;
//   ApplicationCommandAttachmentOption: Attachment;
// }

export type Handler<P extends Params> = (
  context: InteractionContext<P>
) => Promise<unknown>;

export interface InteractionContext<P extends Params> {
  interaction: ChatInputCommandInteraction;
  params: ParamResult<P>;
}

export type OptionType<O extends Option> = O extends {
  type: infer T extends ApplicationCommandOptionType;
}
  ? ApplicationCommandOptionParameterType[T]
  : never;

export type ParamRequired<T extends Option> = T extends SimpleOption<infer R>
  ? R
  : never;

export type ParamResult<P extends Params> = Simplify<
  {
    [K in keyof P as ParamRequired<P[K]> extends false
      ? K
      : never]?: OptionType<P[K]>;
  } & {
    [K in keyof P as ParamRequired<P[K]> extends true ? K : never]: OptionType<
      P[K]
    >;
  }
>;

export type Params = Record<string, SimpleOption>;
