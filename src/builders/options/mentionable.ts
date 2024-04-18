import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type MentionableOptionAPI } from "types";

export class MentionableCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<MentionableOptionAPI, "type">) {
    super({
      type: ApplicationCommandOptionType.Mentionable,
      ...options,
    });
  }
}
