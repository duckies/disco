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
  type ApplicationCommandOptionAPIBase,
  ApplicationCommandOptionBase,
} from "../command-option";
import { AutocompleteMixin } from "./mixins/autocomplete";
import { ChoicesMixin } from "./mixins/choices";
import { MinMaxMixin } from "./mixins/minmax";
import { RequiredMixin } from "./mixins/required";

export interface IntegerOption<R extends boolean>
  extends AutocompleteMixin,
  ChoicesMixin<number>,
  MinMaxMixin,
  RequiredMixin<R> {}

export interface IntegerOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Integer>,
  ApplicationCommandOptionWithAutocomplete,
  ApplicationCommandOptionWithChoices<number>,
  ApplicationCommandOptionWithMinMaxValues,
  ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Integer;
}

export interface IntegerOptionOptions<R extends boolean | undefined = undefined>
  extends Omit<IntegerOptionAPI<R>, "type"> {}

export class IntegerOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Integer;

  constructor({ description, name, ...options }: IntegerOptionOptions<R>) {
    super({
      description,
      name,
    });

    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<IntegerOptionAPI<R>> {
    return {
      ...super.toJSON(),
      autocomplete: this.autocomplete,
      choices: this.choices,
      max_value: this.max_value,
      min_value: this.min_value,
      required: this.required,
    };
  }
}

applyMixins(IntegerOption, [
  RequiredMixin,
  ChoicesMixin,
  AutocompleteMixin,
  MinMaxMixin,
]);
