import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionChoice,
  type ApplicationCommandOptionWithAutocomplete,
  type ApplicationCommandOptionWithChoices,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import { ApplicationCommandOptionAutocompleteMixin } from "./mixins/application-command-option-autocomplete-mixin";
import { ApplicationCommandOptionChoicesMixin } from "./mixins/application-command-option-choices-mixin";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandStringOptionAPI<R extends boolean = boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.String>,
    ApplicationCommandOptionWithRequired<R>,
    ApplicationCommandOptionWithChoices<string>,
    ApplicationCommandOptionWithAutocomplete {
  type: ApplicationCommandOptionType.String;
  min_length?: number;
  max_length?: number;
}

export interface ApplicationCommandStringOptionOptions<R extends boolean = boolean>
  extends Omit<ApplicationCommandStringOptionAPI<R>, "type"> {}

export interface ApplicationCommandStringOption<R extends boolean = false>
  extends ApplicationCommandOptionRequiredMixin<R>,
    ApplicationCommandOptionChoicesMixin<string> {}

export class ApplicationCommandStringOption<R extends boolean> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.String> {
  public readonly required?: R;
  public readonly min_length?: number;
  public readonly max_length?: number;
  public readonly choices?: ApplicationCommandOptionChoice<string>[];
  public readonly autocomplete?: boolean;

  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandStringOptionOptions<R>) {
    super({
      type: ApplicationCommandOptionType.String,
      name,
      description,
    });

    this.required = options.required;
    this.min_length = options.min_length;
    this.max_length = options.max_length;
    this.choices = options.choices;
    this.autocomplete = options.autocomplete;
  }

  public toJSON(): NonPartial<ApplicationCommandStringOptionAPI<R>> {
    return {
      ...super.toJSON(),
      max_length: this.max_length,
      min_length: this.min_length,
      required: this.required,
      choices: this.choices,
      autocomplete: this.autocomplete,
    }
  }
}

applyMixins(ApplicationCommandStringOption, [
  ApplicationCommandOptionRequiredMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionAutocompleteMixin,
]);
