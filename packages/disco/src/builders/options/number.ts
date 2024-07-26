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

export interface NumberOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Number>,
    ApplicationCommandOptionWithRequired<R>,
    ApplicationCommandOptionWithChoices<number>,
    ApplicationCommandOptionWithAutocomplete,
    ApplicationCommandOptionWithMinMaxValues {
  type: ApplicationCommandOptionType.Number;
}

export interface NumberOptionOptions<R extends boolean>
  extends Omit<NumberOptionAPI<R>, "type"> {}

export interface NumberOption<R extends boolean>
  extends RequiredMixin<R>,
    ChoicesMixin<number>,
    AutocompleteMixin,
    MinMaxMixin {}

export class NumberOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Number;

  constructor({ name, description, ...options }: NumberOptionOptions<R>) {
    super({
      name,
      description,
    });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<NumberOptionAPI<R>> {
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

applyMixins(NumberOption, [
  RequiredMixin,
  ChoicesMixin,
  AutocompleteMixin,
  MinMaxMixin,
]);
