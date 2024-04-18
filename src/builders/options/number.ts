import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type NumberOptionAPI } from "types";
import { applyMixins } from "utils/mixins";
import {
  ApplicationCommandOptionAutocompleteMixin,
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionNumericMixin,
} from "./mixins";

export class NumberCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<NumberOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.Number, ...options });
  }
}

applyMixins(NumberCommandOption, [
  ApplicationCommandOptionChoicesMixin,
  ApplicationCommandOptionNumericMixin,
  ApplicationCommandOptionAutocompleteMixin,
]);
