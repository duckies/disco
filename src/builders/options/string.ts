import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type StringOptionAPI } from "types";
import { applyMixins } from "utils/mixins";
import {
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionChoicesMixin,
} from "./mixins";

export interface StringCommandOption
  extends ApplicationCommandOptionChoicesMixin<string>,
    ApplicationCommandOptionAutocompleteMixin {}

export class StringCommandOption extends ApplicationCommandSimpleOption {
  public readonly min_length?: string;
  public readonly max_length?: string;

  constructor(options: Omit<StringOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.String, ...options });
  }
}

applyMixins(StringCommandOption, [
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionAutocompleteMixin,
]);
