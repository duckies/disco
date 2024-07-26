import type { ApplicationCommandOptionType } from "discord.js";

export interface ApplicationCommandOptionAPIBase<
  T extends ApplicationCommandOptionType = any
> {
  type: T;
  name: string;
  description: string;
}

export abstract class ApplicationCommandOptionBase {
  public abstract readonly type: ApplicationCommandOptionType;
  public readonly name: string;
  public readonly description: string;

  constructor({
    name,
    description,
  }: Omit<ApplicationCommandOptionAPIBase, "type">) {
    this.name = name;
    this.description = description;
  }

  public toJSON(): ApplicationCommandOptionAPIBase {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
    };
  }
}
