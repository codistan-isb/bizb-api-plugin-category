export default async function createMainCategory(
  parentResult,
  { input },
  context
) {
  let newCreateMainCategory = await context.mutations.createMainCategory(
    context,
    input
  );

  return newCreateMainCategory;
}
