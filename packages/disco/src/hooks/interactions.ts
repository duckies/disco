import {
  ChatInputCommand,
  type ChatInputCommandOptions,
  type Params,
  SubcommandGroupOption,
  type SubcommandGroupOptionOptions,
  SubcommandOption,
  type SubcommandOptionOptions,
} from "..";

export function defineCommand<const P extends Params>(
  options: ChatInputCommandOptions<P>,
) {
  return new ChatInputCommand(options);
}

export function defineSubcommand<P extends Params>(
  options: SubcommandOptionOptions<P>,
) {
  return new SubcommandOption(options);
}

export function defineSubcommandGroup(options: SubcommandGroupOptionOptions) {
  return new SubcommandGroupOption(options);
}
