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

export interface ApplicationCommandUserOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired {
  type: ApplicationCommandOptionType.User;
}

export interface ApplicationCommandUserOptionOptions
  extends Omit<ApplicationCommandUserOptionAPI, "type"> {}

export class ApplicationCommandUserOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandUserOptionOptions) {
    super({ type: ApplicationCommandOptionType.User, name, description });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandUserOption, [
  ApplicationCommandOptionRequiredMixin,
]);
