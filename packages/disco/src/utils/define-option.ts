import type { IsRequired } from "../types";

import {
  AttachmentOption,
  type AttachmentOptionOptions,
  BooleanOption,
  type BooleanOptionOptions,
  ChannelOption,
  type ChannelOptionOptions,
  IntegerOption,
  type IntegerOptionOptions,
  MentionableOption,
  type MentionableOptionOptions,
  NumberOption,
  type NumberOptionOptions,
  RoleOption,
  type RoleOptionOptions,
  StringOption,
  type StringOptionOptions,
  UserOption,
  type UserOptionOptions,
} from "../builders/options";

export interface ApplicationCommandOptionsByType<R extends boolean> {
  attachment: AttachmentOptionOptions<R>;
  boolean: BooleanOptionOptions<R>;
  channel: ChannelOptionOptions<R>;
  integer: IntegerOptionOptions<R>;
  mentionable: MentionableOptionOptions<R>;
  number: NumberOptionOptions<R>;
  role: RoleOptionOptions<R>;
  string: StringOptionOptions<R>;
  user: UserOptionOptions<R>;
}

export interface ApplicationCommandOptionsReturnByType<R extends boolean> {
  attachment: AttachmentOption<R>;
  boolean: BooleanOption<R>;
  channel: ChannelOption<R>;
  integer: IntegerOption<R>;
  mentionable: MentionableOption<R>;
  number: NumberOption<R>;
  role: RoleOption<R>;
  string: StringOption<R>;
  user: UserOption<R>;
}

export type ApplicationCommandOptionTypeName =
  | "attachment"
  | "boolean"
  | "channel"
  | "integer"
  | "mentionable"
  | "number"
  | "role"
  | "string"
  | "user";

export const OptionTypeMap = {
  attachment: AttachmentOption,
  boolean: BooleanOption,
  channel: ChannelOption,
  integer: IntegerOption,
  mentionable: MentionableOption,
  number: NumberOption,
  role: RoleOption,
  string: StringOption,
  user: UserOption,
} as const;

export function defineOption<
  T extends ApplicationCommandOptionTypeName,
  const O extends ApplicationCommandOptionsByType<any>[T],
  R extends ApplicationCommandOptionsReturnByType<IsRequired<O>>[T],
>(type: T, options: O): R {
  const Constructor = OptionTypeMap[type] as new (options: O) => R;

  return new Constructor(options);
}
