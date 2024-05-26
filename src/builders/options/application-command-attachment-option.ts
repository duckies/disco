import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "builders/application-command-option";
import { applyMixins } from "utils/mixins";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
} from "types";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandAttachmentOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired {
  type: ApplicationCommandOptionType.Attachment;
}

export interface ApplicationCommandAttachmentOptionOptions
  extends Omit<ApplicationCommandAttachmentOptionAPI, "type"> {}

export class ApplicationCommandAttachmentOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandAttachmentOptionOptions) {
    super({ type: ApplicationCommandOptionType.Attachment, name, description });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandAttachmentOption, [
  ApplicationCommandOptionRequiredMixin,
]);
