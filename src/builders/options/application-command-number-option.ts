import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "builders/application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithAutocomplete,
  type ApplicationCommandOptionWithChoices,
  type ApplicationCommandOptionWithMinMaxValues,
  type ApplicationCommandOptionWithRequired,
} from "types";
import { applyMixins } from "utils/mixins";
import { ApplicationCommandOptionAutocompleteMixin } from "./mixins/application-command-option-autocomplete-mixin";
import { ApplicationCommandOptionChoicesMixin } from "./mixins/application-command-option-choices-mixin";
import { ApplicationCommandOptionMinMaxMixin } from "./mixins/application-command-option-minmax-mixin";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandNumberOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired,
    ApplicationCommandOptionWithChoices<number>,
    ApplicationCommandOptionWithAutocomplete,
    ApplicationCommandOptionWithMinMaxValues {
  type: ApplicationCommandOptionType.Number;
}

export interface ApplicationCommandNumberOptionOptions
  extends Omit<ApplicationCommandNumberOptionAPI, "type"> {}

export interface ApplicationCommandNumberOption
  extends ApplicationCommandOptionRequiredMixin,
    ApplicationCommandOptionChoicesMixin<"Number">,
    ApplicationCommandOptionAutocompleteMixin,
    ApplicationCommandOptionMinMaxMixin {}

export class ApplicationCommandNumberOption extends ApplicationCommandOptionBase {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandNumberOptionOptions) {
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
