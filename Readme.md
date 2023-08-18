# Amazon Search CLI

## Basic Usage

Install Dependencies

```bash
npm i
```

To get a list of all the commands and options

```bash
node dist/main.js --help
```

An example usage would be like

```bash
node dist/main.js --sort rating --desc cookies
```

Advanced example

```bash
node dist/main.js --sort rating --desc --prime --limit 5 cookies
```