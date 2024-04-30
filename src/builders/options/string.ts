import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type StringOptionAPI } from "types";
import { Mixin } from "utils/mixins";
import {
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionChoicesMixin,
} from "./mixins";

export interface StringCommandOption
  extends ApplicationCommandOptionChoicesMixin<string>,
    ApplicationCommandOptionAutocompleteMixin {}

@Mixin(
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionAutocompleteMixin
)
export class StringCommandOption extends ApplicationCommandSimpleOption {
  public readonly min_length?: string;
  public readonly max_length?: string;

  constructor(options: Omit<StringOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.String, ...options });
  }
}
