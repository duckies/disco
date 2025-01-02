import { ApplicationCommandOptionType } from "discord.js";

import type {
  ApplicationCommandOptionWithAutocomplete,
  ApplicationCommandOptionWithChoices,
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
import { RequiredMixin } from "./mixins/required";

export interface StringOption<R extends boolean = false>
  extends AutocompleteMixin,
  ChoicesMixin<string>,
  RequiredMixin<R> {}

export interface StringOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.String>,
  ApplicationCommandOptionWithAutocomplete,
  ApplicationCommandOptionWithChoices<string>,
  ApplicationCommandOptionWithRequired<R> {
  max_length?: number;
  min_length?: number;
  type: ApplicationCommandOptionType.String;
}

export interface StringOptionOptions<R extends boolean = boolean>
  extends Omit<StringOptionAPI<R>, "type"> {}

export class StringOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly max_length?: number;
  public readonly min_length?: number;
  public readonly type = ApplicationCommandOptionType.String;

  constructor({ description, name, ...options }: StringOptionOptions<R>) {
    super({
      description,
      name,
    });

    Object.assign(this, options);

    this.required = options.required;
    this.min_length = options.min_length;
    this.max_length = options.max_length;
    this.choices = options.choices;
    this.autocomplete = options.autocomplete;
  }

  public override toJSON(): NonPartial<StringOptionAPI<R>> {
    return {
      ...super.toJSON(),
      autocomplete: this.autocomplete,
      choices: this.choices,
      max_length: this.max_length,
      min_length: this.min_length,
      required: this.required,
    };
  }
}

applyMixins(StringOption, [RequiredMixin, ChoicesMixin, AutocompleteMixin]);
