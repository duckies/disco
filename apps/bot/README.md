# Guild Bot

A personal bot for my community.

## Snippies

JSONify a structure and send it as a json file with an interaction for debugging purposes.

```JS
files: [{
  name: "message.json",
  attachment: Readable.from([JSON.stringify(message, null, 2)])
}]
```