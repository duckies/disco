import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type AttachmentOptionAPI } from "types";

export class AttachmentCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<AttachmentOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.Attachment, ...options });
  }
}
