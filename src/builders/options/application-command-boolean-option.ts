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

export interface ApplicationCommandBooleanOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired {
  type: ApplicationCommandOptionType.Boolean;
}

export interface ApplicationCommandBooleanOptionOptions
  extends Omit<ApplicationCommandBooleanOptionAPI, "type"> {}

export interface ApplicationCommandBooleanOption
  extends ApplicationCommandOptionRequiredMixin {}

export class ApplicationCommandBooleanOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandBooleanOptionOptions) {
    super({
      type: ApplicationCommandOptionType.Boolean,
      name,
      description,
    });

    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandBooleanOption, [
  ApplicationCommandOptionRequiredMixin,
]);
