import type { ApplicationCommandOptionChoice } from "types";

export abstract class ApplicationCommandOptionChoicesMixin<
  T extends string | number
> {
  public choices?: ApplicationCommandOptionChoice<T>[];
}
