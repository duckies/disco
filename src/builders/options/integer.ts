import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type IntegerOptionAPI } from "types";
import { Mixin } from "utils/mixins";
import {
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionNumericMixin,
} from "./mixins";

export interface IntegerCommandOption
  extends ApplicationCommandOptionChoicesMixin<number>,
    ApplicationCommandOptionNumericMixin,
    ApplicationCommandOptionAutocompleteMixin {}

@Mixin(
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionNumericMixin,
  ApplicationCommandOptionAutocompleteMixin
)
export class IntegerCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<IntegerOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.Integer, ...options });
  }
}
