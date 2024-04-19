/**
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */
export enum ApplicationCommandType {
  ChatInput = 1,
  User = 2,
  Message = 3,
}

export interface ApplicationCommandAPIBase {
  type: ApplicationCommandType;
  name: string;
}

export interface ApplicationChatInputCommandOptions
  extends ApplicationCommandAPIBase {
  description: string;
  default_member_permissions?: string;
  nsfw?: boolean;
  contexts?: InteractionContextType[];
}

/**
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types
 */
export enum InteractionContextType {
  Guild,
  BotDM,
  PrivateChannel,
}

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

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 */
export enum ChannelType {
  GuildText,
  DM,
  GuildVoice,
  GroupDM,
  GuildCategory,
  GuildAnnouncement,
  AnnouncementThread = 10,
  PublicThread,
  PrivateThread,
  GuildStageVoice,
  GuildDirectory,
  GuildForum,
  GuildMedia,
}

export interface ApplicationCommandOptionBase {
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
}

export interface ApplicationCommandSimpleOptionBase
  extends ApplicationCommandOptionBase {
  required?: boolean;
}

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure
 */
export type ApplicationCommandOptionChoice<T = string | number> = {
  name: string;
  value: T;
};

export interface ApplicationCommandChoiceMixin<T = string | number> {
  choices?: ApplicationCommandOptionChoice<T>[];
}

export interface ApplicationCommandOptionAutocompleteMixin {
  autocomplete?: boolean;
}

export interface SubCommandOptionAPI<P = ApplicationCommandSimpleOptionAPI[]>
  extends ApplicationCommandOptionBase {
  type: ApplicationCommandOptionType.SubCommand;
  options: P;
}

export interface SubCommandGroupOptionAPI extends ApplicationCommandOptionBase {
  type: ApplicationCommandOptionType.SubCommandGroup;
  options?: SubCommandOptionAPI<any>[];
}

export interface StringOptionAPI
  extends ApplicationCommandSimpleOptionBase,
    ApplicationCommandChoiceMixin<string>,
    ApplicationCommandOptionAutocompleteMixin {
  type: ApplicationCommandOptionType.String;
  min_length?: number;
  max_length?: number;
}

export interface IntegerOptionAPI
  extends ApplicationCommandSimpleOptionBase,
    ApplicationCommandChoiceMixin<number>,
    ApplicationCommandOptionAutocompleteMixin {
  type: ApplicationCommandOptionType.Integer;
  min_value?: number;
  max_value?: number;
}

export interface BooleanOptionAPI extends ApplicationCommandSimpleOptionBase {
  type: ApplicationCommandOptionType.Boolean;
}

export interface UserOptionAPI extends ApplicationCommandSimpleOptionBase {
  type: ApplicationCommandOptionType.User;
}

export interface ChannelOptionAPI extends ApplicationCommandSimpleOptionBase {
  type: ApplicationCommandOptionType.Channel;
  channel_types?: ChannelType[];
}

export interface RoleOptionAPI extends ApplicationCommandSimpleOptionBase {
  type: ApplicationCommandOptionType.Role;
}

export interface MentionableOptionAPI
  extends ApplicationCommandSimpleOptionBase {
  type: ApplicationCommandOptionType.Mentionable;
}

export interface NumberOptionAPI
  extends ApplicationCommandSimpleOptionBase,
    ApplicationCommandChoiceMixin<number>,
    ApplicationCommandOptionAutocompleteMixin {
  type: ApplicationCommandOptionType.Number;
  min_value?: number;
  max_value?: number;
}

export interface AttachmentOptionAPI
  extends ApplicationCommandSimpleOptionBase {
  type: ApplicationCommandOptionType.Attachment;
}

export type ApplicationCommandOptionAPI =
  | SubCommandOptionAPI<any>
  | SubCommandGroupOptionAPI
  | StringOptionAPI
  | IntegerOptionAPI
  | BooleanOptionAPI
  | UserOptionAPI
  | ChannelOptionAPI
  | RoleOptionAPI
  | MentionableOptionAPI
  | NumberOptionAPI
  | AttachmentOptionAPI;

export type ApplicationCommandSimpleOptionAPI = Exclude<
  ApplicationCommandOptionAPI,
  SubCommandOptionAPI<any> | SubCommandGroupOptionAPI
>;
