import { ChatInputCommand, SubcommandGroupOption, SubcommandOption } from "..";

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

export const isCommand = (value: unknown): value is ChatInputCommand =>
  value instanceof ChatInputCommand;

export const isSubcommandGroup = (
  value: unknown
): value is SubcommandGroupOption => value instanceof SubcommandGroupOption;

export const isSubcommand = (value: unknown): value is SubcommandOption =>
  value instanceof SubcommandOption;
