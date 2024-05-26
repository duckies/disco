import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "builders/application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
} from "types";
import { applyMixins } from "utils/mixins";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

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

export interface ApplicationCommandChannelOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired {
  type: ApplicationCommandOptionType.Channel;
  channel_types?: ChannelType[];
}

export interface ApplicationCommandChannelOptionOptions
  extends Omit<ApplicationCommandChannelOptionAPI, "type"> {}

export class ApplicationCommandChannelOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandChannelOptionOptions) {
    super({ type: ApplicationCommandOptionType.Channel, name, description });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandChannelOption, [
  ApplicationCommandOptionRequiredMixin,
]);
