import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");
import i18n from "./i18n/index.js";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import resolvers from "./resolvers/index.js";
import queries from "./queries/index.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {Object} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  console.log("CATEGORY PLUGIN REGiSTER++++++");
  await app.registerPlugin({
    label: "categories",
    name: "categories",
    version: pkg.version,
    i18n,
    // functionsByType: {
    //   preStartup: [preStartup]
    // },
    collections: {
      categories: {
        name: "Categories",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        // indexes: [
        //   // Create indexes. We set specific names for backwards compatibility
        //   // with indexes created by the aldeed:schema-index Meteor package.
        //   [{ name: 1 }, { name: "c2_name" }],
        //   [{ relatedTagIds: 1 }, { name: "c2_relatedTagIds" }],
        //   [{ shopId: 1 }, { name: "c2_shopId" }],
        //   [{ slug: 1, shopId: 1 }, { unique: true }]
        // ]
      },
    },
    graphQL: {
      schemas,
      resolvers,
    },
    mutations,
    queries,
  });
}
