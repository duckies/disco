import type { ApplicationCommandOptionChoice } from "types";

export class ApplicationCommandOptionChoicesMixin<T = string | number> {
  public readonly choices?: ApplicationCommandOptionChoice<T>[];
}
