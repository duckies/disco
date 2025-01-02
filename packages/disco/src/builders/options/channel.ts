import { ApplicationCommandOptionType } from "discord.js";

import type {
  ApplicationCommandOptionWithRequired,
  NonPartial,
} from "../../types";

import { applyMixins } from "../../utils/mixins";
import {
  type ApplicationCommandOptionAPIBase,
  ApplicationCommandOptionBase,
} from "../command-option";
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

export interface ChannelOption<R extends boolean> extends RequiredMixin<R> {}

export interface ChannelOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Channel>,
  ApplicationCommandOptionWithRequired<R> {
  channel_types?: ChannelType[];
  type: ApplicationCommandOptionType.Channel;
}

export interface ChannelOptionOptions<R extends boolean = false>
  extends Omit<ChannelOptionAPI<R>, "type"> {}

export class ChannelOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly channel_types?: ChannelType[];
  public readonly type = ApplicationCommandOptionType.Channel;

  constructor({ description, name, ...options }: ChannelOptionOptions<R>) {
    super({ description, name });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<ChannelOptionAPI<R>> {
    return {
      ...super.toJSON(),
      channel_types: this.channel_types,
      required: this.required,
    };
  }
}

applyMixins(ChannelOption, [RequiredMixin]);
