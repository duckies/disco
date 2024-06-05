import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithAutocomplete,
  type ApplicationCommandOptionWithChoices,
  type ApplicationCommandOptionWithMinMaxValues,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
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
    ApplicationCommandOptionChoicesMixin<number>,
    ApplicationCommandOptionAutocompleteMixin,
    ApplicationCommandOptionMinMaxMixin {}

export class ApplicationCommandNumberOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Number> {
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

  public override toJSON(): NonPartial<ApplicationCommandNumberOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
      autocomplete: this.autocomplete,
      choices: this.choices,
      min_value: this.min_value,
      max_value: this.max_value,
    };
  }
}

applyMixins(ApplicationCommandNumberOption, [
  ApplicationCommandOptionRequiredMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionMinMaxMixin,
]);
