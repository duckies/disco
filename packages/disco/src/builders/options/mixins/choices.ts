import type { ApplicationCommandOptionChoice } from "../../../types";

export abstract class ChoicesMixin<T extends string | number> {
  public choices?: ApplicationCommandOptionChoice<T>[];
}
