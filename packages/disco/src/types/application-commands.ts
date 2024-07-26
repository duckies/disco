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

export type ApplicationCommandOptionWithRequired<
  R extends boolean | undefined = undefined
> = {
  required?: R;
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

export type SimpleOptionAPI =
  | StringOptionAPI
  | IntegerOptionAPI
  | BooleanOptionAPI
  | UserOptionAPI
  | ChannelOptionAPI
  | RoleOptionAPI
  | MentionableOptionAPI
  | NumberOptionAPI
  | AttachmentOptionAPI;

export type CommandOptionAPI =
  | SimpleOptionAPI
  | SubcommandOptionAPI
  | SubcommandGroupOptionAPI;

export type SimpleOption<Required extends boolean = boolean> =
  | StringOption<Required>
  | IntegerOption<Required>
  | BooleanOption<Required>
  | UserOption<Required>
  | ChannelOption<Required>
  | RoleOption<Required>
  | MentionableOption<Required>
  | NumberOption<Required>
  | AttachmentOption<Required>;

export type Option = SimpleOption | SubcommandOption | SubcommandGroupOption;

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
  [ApplicationCommandOptionType.User]: UserOption;
  [ApplicationCommandOptionType.SubcommandGroup]: SubcommandGroupOption;
}
