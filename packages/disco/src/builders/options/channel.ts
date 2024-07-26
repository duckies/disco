import { ApplicationCommandOptionType } from "discord.js";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import type {
  ApplicationCommandOptionWithRequired,
  NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import { RequiredMixin } from "./mixins/required";

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

export interface ChannelOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Channel>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Channel;
  channel_types?: ChannelType[];
}

export interface ChannelOptionOptions<R extends boolean = false>
  extends Omit<ChannelOptionAPI<R>, "type"> {}

export interface ChannelOption<R extends boolean> extends RequiredMixin<R> {}

export class ChannelOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Channel;
  public readonly channel_types?: ChannelType[];

  constructor({ name, description, ...options }: ChannelOptionOptions<R>) {
    super({ name, description });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<ChannelOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
      channel_types: this.channel_types,
    };
  }
}

applyMixins(ChannelOption, [RequiredMixin]);
