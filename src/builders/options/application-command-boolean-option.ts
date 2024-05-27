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

export interface ApplicationCommandBooleanOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Boolean>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Boolean;
}

export interface ApplicationCommandBooleanOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandBooleanOptionAPI<R>, "type"> {}

export interface ApplicationCommandBooleanOption<R extends boolean>
  extends ApplicationCommandOptionRequiredMixin<R> {}

export class ApplicationCommandBooleanOption<R extends boolean = false> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Boolean> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandBooleanOptionOptions<R>) {
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
