import {
  type ApplicationCommandBooleanOption,
  type ApplicationCommandIntegerOption,
  type ApplicationCommandStringOption,
  type ApplicationCommandSubCommandOption,
  type ApplicationCommandAttachmentOption,
  type ApplicationCommandAttachmentOptionAPI,
  type ApplicationCommandBooleanOptionAPI,
  type ApplicationCommandChannelOption,
  type ApplicationCommandChannelOptionAPI,
  type ApplicationCommandIntegerOptionAPI,
  type ApplicationCommandMentionableOption,
  type ApplicationCommandMentionableOptionAPI,
  type ApplicationCommandNumberOption,
  type ApplicationCommandNumberOptionAPI,
  type ApplicationCommandRoleOption,
  type ApplicationCommandRoleOptionAPI,
  type ApplicationCommandStringOptionAPI,
  type ApplicationCommandSubCommandGroupOption,
  type ApplicationCommandSubCommandGroupOptionAPI,
  type ApplicationCommandSubCommandOptionAPI,
  type ApplicationCommandUserOption,
  type ApplicationCommandUserOptionAPI,
} from "builders/options";

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
 */
export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11,
}

export type ApplicationCommandOptionWithRequired = {
  required?: boolean;
};

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure
 */
export type ApplicationCommandOptionChoice<T = string | number> = {
  name: string;
  value: T;
};

export interface ApplicationCommandOptionWithChoices<T = string | number> {
  choices?: ApplicationCommandOptionChoice<T>[];
}

export interface ApplicationCommandOptionWithAutocomplete {
  autocomplete?: boolean;
}

export interface ApplicationCommandOptionWithMinMaxValues {
  min_value?: number;
  max_value?: number;
}

export type ApplicationCommandSimpleOptionAPI =
  | ApplicationCommandStringOptionAPI
  | ApplicationCommandIntegerOptionAPI
  | ApplicationCommandBooleanOptionAPI
  | ApplicationCommandUserOptionAPI
  | ApplicationCommandChannelOptionAPI
  | ApplicationCommandRoleOptionAPI
  | ApplicationCommandMentionableOptionAPI
  | ApplicationCommandNumberOptionAPI
  | ApplicationCommandAttachmentOptionAPI;

export type ApplicationCommandOptionAPI =
  | ApplicationCommandSimpleOptionAPI
  | ApplicationCommandSubCommandOptionAPI
  | ApplicationCommandSubCommandGroupOptionAPI;

export type ApplicationCommandSimpleOption =
  | ApplicationCommandStringOption
  | ApplicationCommandIntegerOption
  | ApplicationCommandBooleanOption
  | ApplicationCommandUserOption
  | ApplicationCommandChannelOption
  | ApplicationCommandRoleOption
  | ApplicationCommandMentionableOption
  | ApplicationCommandNumberOption
  | ApplicationCommandAttachmentOption;

export type ApplicationCommandOption =
  | ApplicationCommandSimpleOption
  | ApplicationCommandSubCommandOption<any>
  | ApplicationCommandSubCommandGroupOption;
