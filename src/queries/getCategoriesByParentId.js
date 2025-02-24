import ReactionError from "@reactioncommerce/reaction-error";
export default async function getCategoriesByParntId(context, args) {
    const { collections } = context
    const { categories } = collections
    let { parentCategoryId } = args

    // if (!parentCategoryId) {
    //     throw new ReactionError("", "Please Login First");
    // }
    let queryCondition = parentCategoryId ? { ParentId: parentCategoryId } : { ParentId: null };

    let parentCategories = await categories.find(queryCondition).toArray();
    let totalCount = await categories.countDocuments(queryCondition);

    console.log("parentCategories=====>", parentCategories)
    console.log("totalCount=====>", totalCount)

    return {
        data: parentCategories,
        totalCount
    }
}