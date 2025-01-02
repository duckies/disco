import type { ApplicationCommandOptionChoice } from "../../../types";

export abstract class ChoicesMixin<T extends number | string> {
  public choices?: ApplicationCommandOptionChoice<T>[];
}
