import type { ApplicationCommandOptionType } from "types";

export interface ApplicationCommandOptionAPIBase<T extends ApplicationCommandOptionType> {
  type: T;
  name: string;
  description: string;
}

export abstract class ApplicationCommandOptionBase<T extends ApplicationCommandOptionType>{
  public readonly type: T;
  public readonly name: string;
  public readonly description: string;

  constructor(options: ApplicationCommandOptionAPIBase<T>) {
    this.type = options.type;
    this.name = options.name;
    this.description = options.description;
  }

  public toJSON(): ApplicationCommandOptionAPIBase<T> {
    return {
      type: this.type,
      name: this.name,
      description: this.description
    };
  }
}
