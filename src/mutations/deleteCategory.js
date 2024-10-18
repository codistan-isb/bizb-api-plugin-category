import ReactionError from "@reactioncommerce/reaction-error";

export default async function deleteCategory(context, args) {
  const { collections } = context;
  const { categories } = collections;
  const { _id } = args;

  // Check if the category exists
  const category = await categories.findOne({ _id });
  if (!category) {
    throw new ReactionError("not-found", "Category not found");
  }

  // Perform the delete operation
  try {
    const deleteResult = await categories.deleteOne({ _id });
    if (deleteResult.deletedCount === 0) {
      return {
        status: false,
        message: "Failed to delete category",
        _id: null,
      };
    }
    return {
      status: true,
      message: "Category deleted successfully",
      _id,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new ReactionError(
      "server-error",
      "Failed to delete category due to server error"
    );
  }
}
