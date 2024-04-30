import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type NumberOptionAPI } from "types";
import { Mixin } from "utils/mixins";
import {
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionNumericMixin,
} from "./mixins";

@Mixin(
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionNumericMixin,
  ApplicationCommandOptionAutocompleteMixin
)
export class NumberCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<NumberOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.Number, ...options });
  }
}
