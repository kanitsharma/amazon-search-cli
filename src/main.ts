import { program, Command, Option } from "commander";
import { getContent } from "./crawler.js";
import { applyTransforms } from "./transform.js";

export interface Options extends Command {
  sort: "rating" | "price" | "name";
  asc: boolean;
  desc: boolean;
  prime: boolean;
  limit: number;
}

async function processQuery(options: Options, query: string) {
  const content = await getContent(query, options);
  const transformedContent = applyTransforms(content, options);

  console.log(transformedContent);
}

async function main() {
  program
    .name("amazon-search-cli")
    .description("CLI to fetch amazon search results")
    .argument("<query>")
    .option("--asc", "Sort in ascending order", false)
    .option("--desc", "Sort in descending order", false)
    .option("--prime", "Sort in descending order", false)
    .option("--limit <limit>", "Number of results to show", "10")
    .addOption(
      new Option("--sort <sort>", "Sorting type").choices([
        "rating",
        "price",
        "name",
      ])
    );

  program.parse();

  const options: Options = program.opts();
  const [query] = program.args;

  await processQuery(options, query);
}

await main();
