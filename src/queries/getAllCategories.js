// export default async function getAllCategories(context, args) {
//   try {
//     let { itemPerPage, PageNumber, searchQuery } = args;
//     console.log("Collections available:", Object.keys(context.collections)); // This will log all keys in collections
//     const { categories } = context.collections;
//     if (!categories) {
//       console.error("Categories collection is not initialized");
//       throw new Error("Internal server error");
//     }

//     // Default filter for fetching categories
//     let filters = { isVisible: true };

//     // Apply search filter if searchQuery is provided
//     if (searchQuery) {
//       filters.$or = [
//         { name: { $regex: searchQuery, $options: "i" } },
//         { type: { $regex: searchQuery, $options: "i" } },
//         { descriptionOptions: { $regex: searchQuery, $options: "i" } },
//       ];
//     }

//     console.log("Filters being applied:", filters);

//     // Pagination logic
//     let itemsPerPage = itemPerPage ? itemPerPage : 10; // Default items per page
//     PageNumber = PageNumber ? PageNumber : 1; // Default page number is 1
//     let skipAmount = (PageNumber - 1) * itemsPerPage;

//     console.log(
//       `Fetching page ${PageNumber} with ${itemsPerPage} items per page (skip: ${skipAmount})`
//     );

//     // Count total documents that match the filters
//     let totalCount = await categories.countDocuments(filters);
//     console.log(`Total matching categories: ${totalCount}`);

//     // Fetch categories with pagination
//     let categoriesResponse = await categories
//       .find(filters)
//       .skip(skipAmount)
//       .limit(itemsPerPage)
//       .toArray();

//     console.log("Categories response:", categoriesResponse);

//     if (categoriesResponse.length > 0) {
//       return {
//         totalCount, // Total number of matching categories
//         data: categoriesResponse, // The category data for the current page
//       };
//     } else {
//       return {
//         totalCount: 0,
//         data: [],
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw new Error("Failed to fetch categories");
//   }
// }
export default async function getAllCategories(context, args) {
  try {
    let { itemPerPage, PageNumber, searchQuery } = args;
    const { categories } = context.collections;

    let filters = {};

    if (searchQuery) {
      filters.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { type: { $regex: new RegExp(searchQuery, "i") } },
        { descriptionOptions: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let itemsPerPage = itemPerPage ? itemPerPage : 10;
    PageNumber = PageNumber ? PageNumber : 1;
    let skipAmount = (PageNumber - 1) * itemsPerPage;

    // Count total documents that match the filters
    let totalCount = await categories.countDocuments(filters);
    console.log(`Total matching categories: ${totalCount}`);

    let categoriesResponse = await categories
      .find(filters)
      .skip(skipAmount)
      .limit(itemsPerPage)
      .toArray();

    if (categoriesResponse.length > 0) {
      return {
        totalCount,
        data: categoriesResponse,
      };
    } else {
      return {
        totalCount: 0,
        data: [],
      };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
