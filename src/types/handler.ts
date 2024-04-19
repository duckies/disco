import type {
  Attachment,
  Channel,
  ChatInputCommandInteraction,
  Role,
  User,
} from "discord.js";
import type {
  ApplicationCommandOptionType,
  ApplicationCommandSimpleOptionAPI,
} from "./application-commands";
import type { Simplify } from "./utility";

export interface OptionTypeMap {
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

export type OptionType<T extends ApplicationCommandSimpleOptionAPI> =
  T["required"] extends true
    ? OptionTypeMap[T["type"]]
    : OptionTypeMap[T["type"]] | undefined;

export type OptionsToParams<T extends ApplicationCommandSimpleOptionAPI[]> = {
  [K in T[number]["name"]]: OptionType<Extract<T[number], { name: K }>>;
};

export interface InteractionContext<
  P extends ApplicationCommandSimpleOptionAPI[]
> {
  interaction: ChatInputCommandInteraction;
  params: OptionsToParams<P>;
}

export type Handler<P extends ApplicationCommandSimpleOptionAPI[]> = (ctx: {
  interaction: ChatInputCommandInteraction;
  params: Simplify<OptionsToParams<P>>;
}) => unknown;
