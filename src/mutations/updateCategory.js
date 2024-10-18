// export default async function updateCategory() {
//   console.log("Update Category function");
// }

import ReactionError from "@reactioncommerce/reaction-error";

export default async function updateCategory(context, args) {
  const { collections } = context;
  const { categories } = collections;
  const { _id, input } = args;

  let decodedId = _id; // Decoding logic based on your system

  const currentCategory = await categories.findOne({ _id: decodedId });
  if (!currentCategory)
    throw new ReactionError("not-found", "Category not found");

  input.updatedAt = new Date();
  let modifier = { $set: input };

  const { value: updatedCategory } = await categories.findOneAndUpdate(
    { _id: decodedId },
    modifier,
    { returnOriginal: false }
  );

  if (updatedCategory) {
    return {
      status: true,
      message: "Category updated successfully",
      data: updatedCategory,
    };
  } else {
    return {
      status: false,
      message: "Failed to update category",
      data: null,
    };
  }
}
