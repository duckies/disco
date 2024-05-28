import type {
  Attachment,
  Channel,
  ChatInputCommandInteraction,
  Role,
  User,
} from "discord.js";
import type { ApplicationCommandOptionBase } from "../builders/application-command-option";
import type {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  ApplicationCommandSimpleOption,
} from "./application-commands";
import type { Simplify } from "./utility";

export interface ApplicationCommandOptionParameterType {
  [ApplicationCommandOptionType.SubCommand]: never;
  [ApplicationCommandOptionType.SubCommandGroup]: never;
  [ApplicationCommandOptionType.String]: string;
  [ApplicationCommandOptionType.Integer]: number;
  [ApplicationCommandOptionType.Boolean]: boolean;
  [ApplicationCommandOptionType.User]: User;
  [ApplicationCommandOptionType.Channel]: Channel;
  [ApplicationCommandOptionType.Role]: Role;
  [ApplicationCommandOptionType.Mentionable]: User | Role;
  [ApplicationCommandOptionType.Number]: number;
  [ApplicationCommandOptionType.Attachment]: Attachment;
}

export interface OptionTypeMap {
  ApplicationCommandSubCommandOption: never;
  ApplicationCommandSubCommandGroupOption: never;
  ApplicationCommandStringOption: string;
  ApplicationCommandIntegerOption: number;
  ApplicationCommandBooleanOption: boolean;
  ApplicationCommandUserOption: User;
  ApplicationCommandChannelOption: Channel;
  ApplicationCommandRoleOption: Role;
  ApplicationCommandMentionableOption: User | Role;
  ApplicationCommandNumberOption: number;
  ApplicationCommandAttachmentOption: Attachment;
}

export type Params = Record<string, ApplicationCommandSimpleOption>;

export type OptionType<O extends ApplicationCommandOption> =
  O extends ApplicationCommandOptionBase<infer T>
    ? ApplicationCommandOptionParameterType[T]
    : never;

export type ParamRequired<T extends ApplicationCommandOption> =
  T extends ApplicationCommandSimpleOption<infer R> ? R : never;

export type ParamResult<P extends Params> = Simplify<
  {
    [K in keyof P as ParamRequired<P[K]> extends true 
      ? K : never]: OptionType<P[K]>;
  } & {
    [K in keyof P as ParamRequired<P[K]> extends false
        ? K
        : never
      ]?: OptionType<P[K]>;
  }
>;

export interface InteractionContext<P extends Params> {
  interaction: ChatInputCommandInteraction;
  params: ParamResult<P>;
}

export type Handler<P extends Params> = (ctx: InteractionContext<P>) => Promise<unknown>;
