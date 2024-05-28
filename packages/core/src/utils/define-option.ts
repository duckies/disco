import {
  ApplicationCommandAttachmentOption,
  ApplicationCommandBooleanOption,
  ApplicationCommandChannelOption,
  ApplicationCommandIntegerOption,
  ApplicationCommandMentionableOption,
  ApplicationCommandNumberOption,
  ApplicationCommandRoleOption,
  ApplicationCommandStringOption,
  ApplicationCommandUserOption,
  type ApplicationCommandAttachmentOptionOptions,
  type ApplicationCommandBooleanOptionOptions,
  type ApplicationCommandChannelOptionOptions,
  type ApplicationCommandIntegerOptionOptions,
  type ApplicationCommandMentionableOptionOptions,
  type ApplicationCommandNumberOptionOptions,
  type ApplicationCommandRoleOptionOptions,
  type ApplicationCommandStringOptionOptions,
  type ApplicationCommandUserOptionOptions,
} from "../builders/options";
import type { IsRequired } from "../types";

export type ApplicationCommandOptionTypeName =
  | "string"
  | "integer"
  | "boolean"
  | "user"
  | "channel"
  | "role"
  | "mentionable"
  | "number"
  | "attachment";

export interface ApplicationCommandOptionsByType<R extends boolean> {
  string: ApplicationCommandStringOptionOptions<R>;
  integer: ApplicationCommandIntegerOptionOptions<R>;
  boolean: ApplicationCommandBooleanOptionOptions<R>;
  user: ApplicationCommandUserOptionOptions<R>;
  channel: ApplicationCommandChannelOptionOptions<R>;
  role: ApplicationCommandRoleOptionOptions<R>;
  mentionable: ApplicationCommandMentionableOptionOptions<R>;
  number: ApplicationCommandNumberOptionOptions<R>;
  attachment: ApplicationCommandAttachmentOptionOptions<R>;
}

export interface ApplicationCommandOptionsReturnByType<R extends boolean> {
  string: ApplicationCommandStringOption<R>;
  integer: ApplicationCommandIntegerOption<R>;
  boolean: ApplicationCommandBooleanOption<R>;
  user: ApplicationCommandUserOption<R>;
  channel: ApplicationCommandChannelOption<R>;
  role: ApplicationCommandRoleOption<R>;
  mentionable: ApplicationCommandMentionableOption<R>;
  number: ApplicationCommandNumberOption<R>;
  attachment: ApplicationCommandAttachmentOption<R>;
}


const OptionTypeMap = {
  string: ApplicationCommandStringOption,
  integer: ApplicationCommandIntegerOption,
  boolean: ApplicationCommandBooleanOption,
  user: ApplicationCommandUserOption,
  channel: ApplicationCommandChannelOption,
  role: ApplicationCommandRoleOption,
  mentionable: ApplicationCommandMentionableOption,
  number: ApplicationCommandNumberOption,
  attachment: ApplicationCommandAttachmentOption,
} as const

export function defineOption<
  T extends ApplicationCommandOptionTypeName,
  const O extends ApplicationCommandOptionsByType<any>[T],
  R extends ApplicationCommandOptionsReturnByType<IsRequired<O>>[T]
>(
  type: T,
  options: O
): R {
  const Constructor = OptionTypeMap[type] as new (options: O) => R

  return new Constructor(options);
}
