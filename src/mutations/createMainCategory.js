import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function createMainCategory(context, input) {
  console.log("Collections available:", Object.keys(context.collections)); // Log available collections
  const { categories } = context.collections;
  if (!categories) {
    console.error("Categories collection is not initialized");
    throw new Error("Internal server error");
  }

  const { name, type, descriptionOptions } = input;

  // Create new main category object based on input
  const newMainCategory = {
    _id: Random.id(), // Always generate a new ID for the category
    name,
    type: type || null, // Optional field
    descriptionOptions: descriptionOptions || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Insert the new category into the Categories collection
  let newCategoryResponse = await categories.insertOne(newMainCategory);

  // Return the newly created main category
  if (newCategoryResponse?.ops.length > 0) {
    return newCategoryResponse.ops[0];
  }

  // If the insertion fails, throw an error
  throw new ReactionError(
    "server-error",
    "Failed to create the new main category"
  );
}
