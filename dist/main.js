import { program, Option } from "commander";
import { getContent } from "./crawler.js";
import { applyTransforms } from "./transform.js";
async function processQuery(options, query) {
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
        .addOption(new Option("--sort <sort>", "Sorting type").choices([
        "rating",
        "price",
        "name",
    ]));
    program.parse();
    const options = program.opts();
    const [query] = program.args;
    await processQuery(options, query);
}
await main();
//# sourceMappingURL=main.js.map