# Amazon Search CLI

## Basic Usage

Install Dependencies

```bash
npm i
```

Compile Typescript

```bash
npm run build
```

To get a list of all the commands and options

```bash
node dist/main.js --help
```

Npm script is also available if you prefer

```bash
npm run search -- --help
```

An example usage would be like

```bash
node dist/main.js --sort rating --desc cookies
```

Advanced example

```bash
node dist/main.js --sort rating --desc --prime --limit 5 cookies
```

## Might implement in future

- Stream results as soon as they get parsed
- Pagination options
- Option to search in different countries like amazon.in