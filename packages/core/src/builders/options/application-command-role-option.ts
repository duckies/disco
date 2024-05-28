import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "types";
import { applyMixins } from "utils/mixins";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandRoleOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Role>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Role;
}

export interface ApplicationCommandRoleOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandRoleOptionAPI<R>, "type"> {}

export interface ApplicationCommandRoleOption<R extends boolean>
  extends ApplicationCommandOptionRequiredMixin<R> {}

export class ApplicationCommandRoleOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Role> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandRoleOptionOptions<R>) {
    super({ type: ApplicationCommandOptionType.Role, name, description });
    Object.assign(this, options);
  }

  public toJSON(): NonPartial<ApplicationCommandRoleOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(ApplicationCommandRoleOption, [
  ApplicationCommandOptionRequiredMixin,
]);
