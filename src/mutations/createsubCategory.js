import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function createSubCategory(context, input) {
  console.log("Collections available:", Object.keys(context.collections)); // This will log all keys in collections
  const { categories } = context.collections;
  if (!categories) {
    console.error("Categories collection is not initialized");
    throw new Error("Internal server error");
  }
  const {
    name,
    ParentId,
    type,
    sizes,
    measurements,
    materials,
    descriptionOptions,
    AncestorsIds,
    Ancestors,
  } = input;

  // Create new category object based on input, auto-generate _id
  const newCategory = {
    _id: Random.id(), // Always generate a new ID for the category
    name,
    ParentId: ParentId || null, // If no ParentId provided, set to null (root category)
    type: type || null, // Optional field
    sizes: {
      small: sizes.small,
      medium: sizes.medium,
      large: sizes.large,
      extraLarge: sizes.extraLarge,
    }, // Use the SizesInput structure for sizes
    measurements: measurements || [], // Default to empty array if not provided
    materials: materials || [], // Default to empty array if not provided
    descriptionOptions: descriptionOptions || null,
    AncestorsIds: AncestorsIds || [],
    Ancestors: Ancestors || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Insert the new category into the Categories collection
  let newCategoryResponse = await categories.insertOne(newCategory);

  // Return the newly created category
  if (newCategoryResponse?.ops.length > 0) {
    return newCategoryResponse.ops[0];
  }

  // If the insertion fails, throw an error
  throw new ReactionError("server-error", "Failed to create the new category");
}
