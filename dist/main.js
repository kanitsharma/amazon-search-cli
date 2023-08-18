import { program, Option } from "commander";
import { getContent } from "./crawler.js";
async function processQuery(options, query) {
    const content = await getContent(query);
}
async function main() {
    program
        .name("amazon-search-cli")
        .description("CLI to fetch amazon search results")
        .argument("<query>")
        .option("--asc", "Sort in ascending order", false)
        .option("--desc", "Sort in descending order", false)
        .addOption(new Option("--sort <sort>", "Sorting Type").choices([
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