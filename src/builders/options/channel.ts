import { ApplicationCommandSimpleOption } from "builders/command-option";
import {
  ApplicationCommandOptionType,
  type ChannelOptionAPI,
  type ChannelType,
} from "types";

export class ChannelCommandOption extends ApplicationCommandSimpleOption {
  public readonly channel_types?: ChannelType[];

  constructor(options: Omit<ChannelOptionAPI, "type">) {
    super({
      type: ApplicationCommandOptionType.Channel,
      ...options,
    });
  }
}
