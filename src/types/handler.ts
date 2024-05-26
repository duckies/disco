import type {
  Attachment,
  Channel,
  ChatInputCommandInteraction,
  Role,
  User,
} from "discord.js";
import type { Simplify } from "./utility";
import type {
  ApplicationCommandOptionAPI,
  ApplicationCommandOptionType,
} from "./application-commands";

export interface OptionTypeMap {
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

export type OptionType<T extends ApplicationCommandOptionAPI> = T extends {
  required: true;
}
  ? OptionTypeMap[T["type"]]
  : OptionTypeMap[T["type"]] | undefined;

export type OptionsToParams<T extends ApplicationCommandOptionAPI[]> = {
  [K in T[number]["name"]]: OptionType<Extract<T[number], { name: K }>>;
};

export interface InteractionContext<P extends ApplicationCommandOptionAPI[]> {
  interaction: ChatInputCommandInteraction;
  params: OptionsToParams<P>;
}

export type Handler<P extends ApplicationCommandOptionAPI[]> = (ctx: {
  interaction: ChatInputCommandInteraction;
  params: Simplify<OptionsToParams<P>>;
}) => unknown;
