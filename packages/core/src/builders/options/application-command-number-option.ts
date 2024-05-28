import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithAutocomplete,
  type ApplicationCommandOptionWithChoices,
  type ApplicationCommandOptionWithMinMaxValues,
  type ApplicationCommandOptionWithRequired,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import { ApplicationCommandOptionAutocompleteMixin } from "./mixins/application-command-option-autocomplete-mixin";
import { ApplicationCommandOptionChoicesMixin } from "./mixins/application-command-option-choices-mixin";
import { ApplicationCommandOptionMinMaxMixin } from "./mixins/application-command-option-minmax-mixin";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandNumberOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Number>,
    ApplicationCommandOptionWithRequired<R>,
    ApplicationCommandOptionWithChoices<number>,
    ApplicationCommandOptionWithAutocomplete,
    ApplicationCommandOptionWithMinMaxValues {
  type: ApplicationCommandOptionType.Number;
}

export interface ApplicationCommandNumberOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandNumberOptionAPI<R>, "type"> {}

export interface ApplicationCommandNumberOption<R extends boolean>
  extends ApplicationCommandOptionRequiredMixin<R>,
    ApplicationCommandOptionChoicesMixin<"Number">,
    ApplicationCommandOptionAutocompleteMixin,
    ApplicationCommandOptionMinMaxMixin {}

export class ApplicationCommandNumberOption<R extends boolean = false> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Number> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandNumberOptionOptions<R>) {
    super({
      type: ApplicationCommandOptionType.Number,
      name,
      description,
    });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandNumberOption, [
  ApplicationCommandOptionRequiredMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionMinMaxMixin,
]);
