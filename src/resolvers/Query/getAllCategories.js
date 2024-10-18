export default async function getAllCategories(parent, args, context, info) {
  if (!context.queries.getAllCategories) {
    throw new Error("GetAllCategories function is not defined in queries.");
  }
  let getCategories = await context.queries.getAllCategories(context, args);
  return getCategories;
}
