export default async function createSubCategory(
  parentResult,
  { input },
  context
) {
  let newcreateSubCategory = await context.mutations.createSubCategory(
    context,
    input
  );

  return newcreateSubCategory;
}
