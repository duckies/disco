import type { ApplicationCommandOptionType } from "discord.js";

export interface ApplicationCommandOptionAPIBase<
  T extends ApplicationCommandOptionType = any,
> {
  description: string;
  name: string;
  type: T;
}

export abstract class ApplicationCommandOptionBase {
  public readonly description: string;
  public readonly name: string;
  public abstract readonly type: ApplicationCommandOptionType;

  constructor({
    description,
    name,
  }: Omit<ApplicationCommandOptionAPIBase, "type">) {
    this.name = name;
    this.description = description;
  }

  public toJSON(): ApplicationCommandOptionAPIBase {
    return {
      description: this.description,
      name: this.name,
      type: this.type,
    };
  }
}
