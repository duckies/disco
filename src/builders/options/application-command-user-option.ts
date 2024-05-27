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

export interface ApplicationCommandUserOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.User>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.User;
}

export interface ApplicationCommandUserOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandUserOptionAPI<R>, "type"> {}

export class ApplicationCommandUserOption<R extends boolean = false> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.User> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandUserOptionOptions<R>) {
    super({ type: ApplicationCommandOptionType.User, name, description });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandUserOption, [
  ApplicationCommandOptionRequiredMixin,
]);
