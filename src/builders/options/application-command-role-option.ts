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

export interface ApplicationCommandRoleOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired {
  type: ApplicationCommandOptionType.Role;
}

export interface ApplicationCommandRoleOptionOptions
  extends Omit<ApplicationCommandRoleOptionAPI, "type"> {}

export class ApplicationCommandRoleOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandRoleOptionOptions) {
    super({ type: ApplicationCommandOptionType.Role, name, description });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandRoleOption, [
  ApplicationCommandOptionRequiredMixin,
]);
