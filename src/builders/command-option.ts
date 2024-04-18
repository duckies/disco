import type {
  ApplicationCommandOptionAPI,
  ApplicationCommandOptionType,
  ApplicationCommandSimpleOptionBase,
} from "types";

export class ApplicationCommandOption {
  public readonly type!: ApplicationCommandOptionType;
  public readonly name!: string;
  public readonly description!: string;

  constructor(options: ApplicationCommandOptionAPI) {
    Object.assign(this, options);
  }

  toJSON() {
    return {
      ...this,
    };
  }
}

export class ApplicationCommandSimpleOption extends ApplicationCommandOption {
  public readonly required?: boolean;

  constructor(options: ApplicationCommandSimpleOptionBase) {
    super(options);
  }
}
