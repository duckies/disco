import { ApplicationCommandOptionType } from "discord.js";
import type {
  ApplicationCommandOptionWithAutocomplete,
  ApplicationCommandOptionWithChoices,
  ApplicationCommandOptionWithMinMaxValues,
  ApplicationCommandOptionWithRequired,
  NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import { AutocompleteMixin } from "./mixins/autocomplete";
import { ChoicesMixin } from "./mixins/choices";
import { MinMaxMixin } from "./mixins/minmax";
import { RequiredMixin } from "./mixins/required";

export interface IntegerOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Integer>,
    ApplicationCommandOptionWithRequired<R>,
    ApplicationCommandOptionWithChoices<number>,
    ApplicationCommandOptionWithAutocomplete,
    ApplicationCommandOptionWithMinMaxValues {
  type: ApplicationCommandOptionType.Integer;
}

export interface IntegerOptionOptions<R extends boolean | undefined = undefined>
  extends Omit<IntegerOptionAPI<R>, "type"> {}

export interface IntegerOption<R extends boolean>
  extends RequiredMixin<R>,
    ChoicesMixin<number>,
    AutocompleteMixin,
    MinMaxMixin {}

export class IntegerOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Integer;

  constructor({ name, description, ...options }: IntegerOptionOptions<R>) {
    super({
      name,
      description,
    });

    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<IntegerOptionAPI<R>> {
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

applyMixins(IntegerOption, [
  RequiredMixin,
  ChoicesMixin,
  AutocompleteMixin,
  MinMaxMixin,
]);
