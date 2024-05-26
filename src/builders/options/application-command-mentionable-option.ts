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

export interface ApplicationCommandMentionableOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired {
  type: ApplicationCommandOptionType.Mentionable;
}

export interface ApplicationCommandMentionableOptionOptions
  extends Omit<ApplicationCommandMentionableOptionAPI, "type"> {}

export class ApplicationCommandMentionableOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandMentionableOptionOptions) {
    super({
      type: ApplicationCommandOptionType.Mentionable,
      name,
      description,
    });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandMentionableOption, [
  ApplicationCommandOptionRequiredMixin,
]);
