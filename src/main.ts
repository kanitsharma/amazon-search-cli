import { program, Command, Option } from "commander";
import { getContent } from "./crawler.js";

interface Options extends Command {
  sort: "rating" | "price" | "name";
  asc: boolean;
  desc: boolean;
}

function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const halfStar = Math.round(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStar;

  const stars =
    "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);

  return stars;
}

async function processQuery(options: Options, query: string) {
  const content = await getContent(query);
}

async function main() {
  program
    .name("amazon-search-cli")
    .description("CLI to fetch amazon search results")
    .argument("<query>")
    .option("--asc", "Sort in ascending order", false)
    .option("--desc", "Sort in descending order", false)
    .addOption(
      new Option("--sort <sort>", "Sorting Type").choices([
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
