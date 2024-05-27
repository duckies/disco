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

export interface ApplicationCommandRoleOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Role>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Role;
}

export interface ApplicationCommandRoleOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandRoleOptionAPI<R>, "type"> {}

export class ApplicationCommandRoleOption<R extends boolean = false> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Role> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandRoleOptionOptions<R>) {
    super({ type: ApplicationCommandOptionType.Role, name, description });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandRoleOption, [
  ApplicationCommandOptionRequiredMixin,
]);
