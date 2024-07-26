import { ApplicationCommandOptionType } from "discord.js";
import type {
  ApplicationCommandOptionWithAutocomplete,
  ApplicationCommandOptionWithChoices,
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
import { RequiredMixin } from "./mixins/required";

export interface StringOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.String>,
    ApplicationCommandOptionWithRequired<R>,
    ApplicationCommandOptionWithChoices<string>,
    ApplicationCommandOptionWithAutocomplete {
  type: ApplicationCommandOptionType.String;
  min_length?: number;
  max_length?: number;
}

export interface StringOptionOptions<R extends boolean = boolean>
  extends Omit<StringOptionAPI<R>, "type"> {}

export interface StringOption<R extends boolean = false>
  extends RequiredMixin<R>,
    ChoicesMixin<string>,
    AutocompleteMixin {}

export class StringOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.String;
  public readonly min_length?: number;
  public readonly max_length?: number;

  constructor({ name, description, ...options }: StringOptionOptions<R>) {
    super({
      name,
      description,
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
      max_length: this.max_length,
      min_length: this.min_length,
      required: this.required,
      choices: this.choices,
      autocomplete: this.autocomplete,
    };
  }
}

applyMixins(StringOption, [RequiredMixin, ChoicesMixin, AutocompleteMixin]);
