import {
  ChatInputCommand,
  SubcommandGroupOption,
  SubcommandOption,
  type ChatInputCommandOptions,
  type Params,
  type SubcommandGroupOptionOptions,
  type SubcommandOptionOptions,
} from "..";

export function defineCommand<const P extends Params>(
  options: ChatInputCommandOptions<P>
) {
  return new ChatInputCommand(options);
}

export function defineSubcommandGroup(options: SubcommandGroupOptionOptions) {
  return new SubcommandGroupOption(options);
}

export function defineSubcommand<P extends Params>(
  options: SubcommandOptionOptions<P>
) {
  return new SubcommandOption(options);
}
