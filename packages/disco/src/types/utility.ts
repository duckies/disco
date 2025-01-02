import type {
  ChatInputCommand,
  SubcommandGroupOption,
  SubcommandOption,
} from "..";

export type CommandOrGroup =
  | ChatInputCommand
  | SubcommandGroupOption
  | SubcommandOption;

export type Constructor<T = any> = abstract new (...args: any[]) => T;

export type IsRequired<T> = T extends { required: true } ? true : false;

export type Module = Record<string, unknown>;

export type NonPartial<T> = { [K in keyof Required<T>]: T[K] };

export type Simplify<T> = { [K in keyof T]: T[K] } & {};
