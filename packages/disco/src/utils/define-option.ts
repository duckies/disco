import {
  AttachmentOption,
  BooleanOption,
  ChannelOption,
  IntegerOption,
  MentionableOption,
  NumberOption,
  RoleOption,
  StringOption,
  UserOption,
  type AttachmentOptionOptions,
  type BooleanOptionOptions,
  type ChannelOptionOptions,
  type IntegerOptionOptions,
  type MentionableOptionOptions,
  type NumberOptionOptions,
  type RoleOptionOptions,
  type StringOptionOptions,
  type UserOptionOptions,
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
  string: StringOptionOptions<R>;
  integer: IntegerOptionOptions<R>;
  boolean: BooleanOptionOptions<R>;
  user: UserOptionOptions<R>;
  channel: ChannelOptionOptions<R>;
  role: RoleOptionOptions<R>;
  mentionable: MentionableOptionOptions<R>;
  number: NumberOptionOptions<R>;
  attachment: AttachmentOptionOptions<R>;
}

export interface ApplicationCommandOptionsReturnByType<R extends boolean> {
  string: StringOption<R>;
  integer: IntegerOption<R>;
  boolean: BooleanOption<R>;
  user: UserOption<R>;
  channel: ChannelOption<R>;
  role: RoleOption<R>;
  mentionable: MentionableOption<R>;
  number: NumberOption<R>;
  attachment: AttachmentOption<R>;
}

export const OptionTypeMap = {
  string: StringOption,
  integer: IntegerOption,
  boolean: BooleanOption,
  user: UserOption,
  channel: ChannelOption,
  role: RoleOption,
  mentionable: MentionableOption,
  number: NumberOption,
  attachment: AttachmentOption,
} as const;

export function defineOption<
  T extends ApplicationCommandOptionTypeName,
  const O extends ApplicationCommandOptionsByType<any>[T],
  R extends ApplicationCommandOptionsReturnByType<IsRequired<O>>[T]
>(type: T, options: O): R {
  const Constructor = OptionTypeMap[type] as new (options: O) => R;

  return new Constructor(options);
}
