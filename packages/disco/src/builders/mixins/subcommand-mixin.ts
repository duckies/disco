import type { Option, Params } from "../../types";
import {
  SubcommandOption,
  type SubcommandOptionOptions,
} from "../options/subcommand";

export class SubcommandMixin {
  public readonly options!: Map<string, Option>;

  public addSubCommand<const P extends Params>(
    options: SubcommandOptionOptions<P>
  ) {
    const option = new SubcommandOption(options);

    this.options.set(option.name, option);

    return this;
  }
}
