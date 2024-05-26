import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "builders/application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithAutocomplete,
  type ApplicationCommandOptionWithChoices,
  type ApplicationCommandOptionWithRequired,
} from "types";
import { applyMixins } from "utils/mixins";
import { ApplicationCommandOptionAutocompleteMixin } from "./mixins/application-command-option-autocomplete-mixin";
import { ApplicationCommandOptionChoicesMixin } from "./mixins/application-command-option-choices-mixin";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandStringOptionAPI
  extends ApplicationCommandOptionAPIBase,
    ApplicationCommandOptionWithRequired,
    ApplicationCommandOptionWithChoices<string>,
    ApplicationCommandOptionWithAutocomplete {
  type: ApplicationCommandOptionType.String;
  min_length?: number;
  max_length?: number;
}

export interface ApplicationCommandStringOptionOptions
  extends Omit<ApplicationCommandStringOptionAPI, "type"> {}

export interface ApplicationCommandStringOption
  extends ApplicationCommandOptionRequiredMixin,
    ApplicationCommandOptionChoicesMixin<string> {}

export class ApplicationCommandStringOption extends ApplicationCommandOptionBase {
  public readonly min_length?: number;
  public readonly max_length?: number;

  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandStringOptionOptions) {
    super({
      type: ApplicationCommandOptionType.String,
      name,
      description,
    });

    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandStringOption, [
  ApplicationCommandOptionRequiredMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionAutocompleteMixin,
]);
