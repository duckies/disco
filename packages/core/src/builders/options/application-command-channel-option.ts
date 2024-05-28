import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
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

export interface ApplicationCommandChannelOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Channel>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Channel;
  channel_types?: ChannelType[];
}

export interface ApplicationCommandChannelOptionOptions<
  R extends boolean = false
> extends Omit<ApplicationCommandChannelOptionAPI<R>, "type"> {}

export interface ApplicationCommandChannelOption<R extends boolean>
  extends ApplicationCommandOptionRequiredMixin<R> {}

export class ApplicationCommandChannelOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Channel> {
  public readonly channel_types?: ChannelType[];

  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandChannelOptionOptions<R>) {
    super({ type: ApplicationCommandOptionType.Channel, name, description });
    Object.assign(this, options);
  }

  public toJSON(): NonPartial<ApplicationCommandChannelOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
      channel_types: this.channel_types,
    };
  }
}

applyMixins(ApplicationCommandChannelOption, [
  ApplicationCommandOptionRequiredMixin,
]);
