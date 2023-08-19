import { Command, Option } from "commander";
import { getContent } from "./crawler.js";
import { applyTransforms, printSearchResults } from "./transform.js";

export interface Options extends Command {
  sort: "rating" | "price" | "name";
  asc: boolean;
  desc: boolean;
  prime: boolean;
  limit: number;
}

async function processQuery(options: Options, query: string) {
  const content = await getContent(query);
  const transformedContent = applyTransforms(content, options);

  printSearchResults(transformedContent);
}

async function main() {
  const program = new Command();

  program
    .name("amazon-search-cli")
    .description("CLI to fetch amazon search results")
    .argument("<query>")
    .option("--prime", "Only show items with prime benefits", false)
    .option("--asc", "Sort in ascending order", false)
    .addOption(
      new Option("--desc", "Sort in descending order")
        .implies({ asc: false }) // Implied its either asc or desc
        .default(false)
    )
    .addOption(
      new Option(
        "--limit <limit>",
        "Number of results to show, Max. 60"
      ).default(10)
    )
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
