import type { ApplicationCommandOptionType } from "discord.js";

import type {
  AttachmentOption,
  AttachmentOptionAPI,
  BooleanOption,
  BooleanOptionAPI,
  ChannelOption,
  ChannelOptionAPI,
  IntegerOption,
  IntegerOptionAPI,
  MentionableOption,
  MentionableOptionAPI,
  NumberOption,
  NumberOptionAPI,
  RoleOption,
  RoleOptionAPI,
  StringOption,
  StringOptionAPI,
  SubcommandGroupOption,
  SubcommandGroupOptionAPI,
  SubcommandOption,
  SubcommandOptionAPI,
  UserOption,
  UserOptionAPI,
} from "../builders/options";

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure
 */
export type ApplicationCommandOptionChoice<T = number | string> = {
  name: string;
  value: T;
};

export interface ApplicationCommandOptionMap {
  [ApplicationCommandOptionType.Attachment]: AttachmentOption;
  [ApplicationCommandOptionType.Boolean]: BooleanOption;
  [ApplicationCommandOptionType.Channel]: ChannelOption;
  [ApplicationCommandOptionType.Integer]: IntegerOption;
  [ApplicationCommandOptionType.Mentionable]: MentionableOption;
  [ApplicationCommandOptionType.Number]: NumberOption;
  [ApplicationCommandOptionType.Role]: RoleOption;
  [ApplicationCommandOptionType.String]: StringOption;
  [ApplicationCommandOptionType.Subcommand]: SubcommandOption;
  [ApplicationCommandOptionType.SubcommandGroup]: SubcommandGroupOption;
  [ApplicationCommandOptionType.User]: UserOption;
}

export interface ApplicationCommandOptionWithAutocomplete {
  autocomplete?: boolean;
}

export interface ApplicationCommandOptionWithChoices<T = number | string> {
  choices?: ApplicationCommandOptionChoice<T>[];
}

export interface ApplicationCommandOptionWithMinMaxValues {
  max_value?: number;
  min_value?: number;
}

export type ApplicationCommandOptionWithRequired<
  R extends boolean | undefined = undefined,
> = {
  required?: R;
};

export type CommandOptionAPI =
  | SimpleOptionAPI
  | SubcommandGroupOptionAPI
  | SubcommandOptionAPI;

export type Option = SimpleOption | SubcommandGroupOption | SubcommandOption;

export type SimpleOption<Required extends boolean = boolean> =
  | AttachmentOption<Required>
  | BooleanOption<Required>
  | ChannelOption<Required>
  | IntegerOption<Required>
  | MentionableOption<Required>
  | NumberOption<Required>
  | RoleOption<Required>
  | StringOption<Required>
  | UserOption<Required>;

export type SimpleOptionAPI =
  | AttachmentOptionAPI
  | BooleanOptionAPI
  | ChannelOptionAPI
  | IntegerOptionAPI
  | MentionableOptionAPI
  | NumberOptionAPI
  | RoleOptionAPI
  | StringOptionAPI
  | UserOptionAPI;
