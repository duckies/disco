import type { ApplicationCommandOptionType } from "types";

export interface ApplicationCommandOptionAPIBase {
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
}

export abstract class ApplicationCommandOptionBase {
  public readonly type!: ApplicationCommandOptionType;
  public readonly name!: string;
  public readonly description!: string;

  constructor(options: ApplicationCommandOptionAPIBase) {
    this.type = options.type;
    this.name = options.name;
    this.description = options.description;
  }

  toJSON() {
    return {
      ...this,
    };
  }
}
