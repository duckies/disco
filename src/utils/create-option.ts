import {
  ApplicationCommandAttachmentOption,
  ApplicationCommandBooleanOption,
  ApplicationCommandChannelOption,
  ApplicationCommandIntegerOption,
  ApplicationCommandMentionableOption,
  ApplicationCommandNumberOption,
  ApplicationCommandRoleOption,
  ApplicationCommandStringOption,
  ApplicationCommandSubCommandGroupOption,
  ApplicationCommandSubCommandOption,
  ApplicationCommandUserOption,
} from "builders/options";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionAPI,
} from "types";

export function createOption(options: ApplicationCommandOptionAPI) {
  switch (options.type) {
    case ApplicationCommandOptionType.SubCommand:
      return new ApplicationCommandSubCommandOption(options);
    case ApplicationCommandOptionType.SubCommandGroup:
      return new ApplicationCommandSubCommandGroupOption(options);
    case ApplicationCommandOptionType.String:
      return new ApplicationCommandStringOption(options);
    case ApplicationCommandOptionType.Integer:
      return new ApplicationCommandIntegerOption(options);
    case ApplicationCommandOptionType.Boolean:
      return new ApplicationCommandBooleanOption(options);
    case ApplicationCommandOptionType.User:
      return new ApplicationCommandUserOption(options);
    case ApplicationCommandOptionType.Channel:
      return new ApplicationCommandChannelOption(options);
    case ApplicationCommandOptionType.Role:
      return new ApplicationCommandRoleOption(options);
    case ApplicationCommandOptionType.Mentionable:
      return new ApplicationCommandMentionableOption(options);
    case ApplicationCommandOptionType.Number:
      return new ApplicationCommandNumberOption(options);
    case ApplicationCommandOptionType.Attachment:
      return new ApplicationCommandAttachmentOption(options);
  }
}
