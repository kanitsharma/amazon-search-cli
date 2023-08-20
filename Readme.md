# Amazon Search CLI

## Some Notes

### Why Puppeteer?

- Amazon is likely blocking non browser traffic, I tried adding User-Agent in the headers but it did not work for me.

- With Puppeteer I can run DOM queries, so I don't have to use a separate html parser.

### Why Commander?

- Commander provides a clean and extensible API to build CLI commands, promoting scalability and maintaining code cleanliness. plus it is very easy to add subcommands, if required in future.

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