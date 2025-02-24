

export default async function getCategoriesByParntId(parent, args, context, info) {


    const categories = await context.queries.getCategoriesByParntId(context, args)

    console.log("getCategoriesByParntId=====>", categories)

    return categories

}