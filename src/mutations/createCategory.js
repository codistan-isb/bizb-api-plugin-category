// // import Random from "@reactioncommerce/random";
// // import ReactionError from "@reactioncommerce/reaction-error";

// // export default async function createCategory(context, input) {
// //   console.log("Collections available:", Object.keys(context.collections));
// //   const { categories } = context.collections;
// //   if (!categories) {
// //     console.error("Categories collection is not initialized");
// //     throw new Error("Internal server error");
// //   }
// //   const {
// //     name,
// //     ParentId,
// //     type,
// //     sizes,
// //     measurements,
// //     materials,
// //     descriptionOptions,
// //     AncestorsIds,
// //     Ancestors,
// //   } = input;

// //   // Create new category object based on input, auto-generate _id
// //   const newCategory = {
// //     _id: Random.id(),
// //     name,
// //     ParentId: ParentId || null,
// //     type: type || null,
// //     sizes: {
// //       small: sizes.small,
// //       medium: sizes.medium,
// //       large: sizes.large,
// //       extraLarge: sizes.extraLarge,
// //     },
// //     measurements: measurements || [],
// //     materials: materials || [],
// //     descriptionOptions: descriptionOptions || null,
// //     AncestorsIds: AncestorsIds || [],
// //     Ancestors: Ancestors || [],
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   };

// //   let newCategoryResponse = await categories.insertOne(newCategory);

// //   if (newCategoryResponse?.ops.length > 0) {
// //     return newCategoryResponse.ops[0];
// //   }

// //   throw new ReactionError("server-error", "Failed to create the new category");
// // }

// import Random from "@reactioncommerce/random";
// import ReactionError from "@reactioncommerce/reaction-error";

// export default async function createCategory(context, input) {
//   console.log("Collections available:", Object.keys(context.collections));
//   const { categories } = context.collections;
//   if (!categories) {
//     console.error("Categories collection is not initialized");
//     throw new Error("Internal server error");
//   }
//   const {
//     name,
//     ParentId,
//     type,
//     sizes,
//     measurements,
//     materials,
//     descriptionOptions,
//     AncestorsIds,
//     Ancestors,
//   } = input;

//   // Create new category object based on input, auto-generate _id
//   const newCategory = {
//     _id: Random.id(),
//     name,
//     ParentId: ParentId || null,
//     type: type || null,
//     sizes: {
//       small: sizes.small,
//       medium: sizes.medium,
//       large: sizes.large,
//       extraLarge: sizes.extraLarge,
//     },
//     measurements: measurements || [],
//     materials: materials || [],
//     descriptionOptions: descriptionOptions || null,
//     AncestorsIds: AncestorsIds || [],
//     Ancestors: Ancestors || [],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   console.log("NEWCATEGORY", newCategory);

//   // Insert the new category into the collection
//   let newCategoryResponse = await categories.insertOne(newCategory);

//   // Check if insertion was successful by verifying the insertedId
//   if (newCategoryResponse.insertedId) {
//     // Return the newly inserted category
//     return { ...newCategory, _id: newCategoryResponse.insertedId };
//   }

//   throw new ReactionError("server-error", "Failed to create the new category");
// }

import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function createCategory(context, input) {
  console.log("Collections available:", Object.keys(context.collections));
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
    _id: Random.id(),
    name,
    ParentId: ParentId || null,
    type: type || null,
    sizes: {
      small: sizes.small,
      medium: sizes.medium,
      large: sizes.large,
      extraLarge: sizes.extraLarge,
    },
    measurements: measurements || [],
    materials: materials || [],
    descriptionOptions: descriptionOptions || null,
    AncestorsIds: AncestorsIds || [],
    Ancestors: Ancestors || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    // Log before attempting to insert
    console.log("Attempting to insert new category:", newCategory);

    // Insert the new category into the collection
    let newCategoryResponse = await categories.insertOne(newCategory);

    // Log the actual response from MongoDB
    console.log("MongoDB insert response:", newCategoryResponse);

    // Check if the insertion was successful
    if (newCategoryResponse.insertedId) {
      return { ...newCategory, _id: newCategoryResponse.insertedId };
    }
  } catch (error) {
    console.error("Error inserting category into database:", error);
  }

  throw new ReactionError("server-error", "Failed to create the new category");
}
