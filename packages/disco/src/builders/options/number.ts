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

export interface NumberOption<R extends boolean>
  extends AutocompleteMixin,
  ChoicesMixin<number>,
  MinMaxMixin,
  RequiredMixin<R> {}

export interface NumberOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Number>,
  ApplicationCommandOptionWithAutocomplete,
  ApplicationCommandOptionWithChoices<number>,
  ApplicationCommandOptionWithMinMaxValues,
  ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Number;
}

export interface NumberOptionOptions<R extends boolean>
  extends Omit<NumberOptionAPI<R>, "type"> {}

export class NumberOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Number;

  constructor({ description, name, ...options }: NumberOptionOptions<R>) {
    super({
      description,
      name,
    });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<NumberOptionAPI<R>> {
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

applyMixins(NumberOption, [
  RequiredMixin,
  ChoicesMixin,
  AutocompleteMixin,
  MinMaxMixin,
]);
