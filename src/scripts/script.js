// import fs from "fs";
// import csv from "csv-parser";
// import { MongoClient } from "mongodb";
// import createCategory from "../mutations/createCategory.js";

// // Setup MongoDB connection
// const url =
//   "mongodb+srv://irtaza:jSt7DoZmaUy67sGs@cluster0.edrupsq.mongodb.net/bizb-dev?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// const dbName = "bizb-dev"; // Use the appropriate database name

// // A lookup table to store category ID by name
// const categoryLookup = {};

// // Function to create categories and manage parent-child relationships
// async function runImport() {
//   await client.connect();
//   console.log("Connected successfully to MongoDB server");

//   const db = client.db(dbName);
//   const context = {
//     collections: {
//       categories: db.collection("Categories"),
//     },
//   };

//   const categoryInsertPromises = [];

//   fs.createReadStream("./BizB-Master-Categories-Sheet1.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       const name = row["Category"];
//       const parentName = row["Parent"];
//       const type = row["Type (Artcile/Dress)"];
//       const sizes = row["Size"] ? row["Size"].split(",") : [];
//       const measurements = row["Measurements"]
//         ? row["Measurements"].split(",")
//         : [];
//       const materials = row["Material"] ? row["Material"].split(",") : [];
//       const descriptionOptions = row["Description Options"] || null;

//       let ParentId = null;
//       let AncestorsIds = [];
//       let Ancestors = [];

//       // If the category has a parent, find the parent's ID
//       if (parentName && categoryLookup[parentName]) {
//         ParentId = categoryLookup[parentName];
//         AncestorsIds = [ParentId];
//         Ancestors = [parentName];
//       }

//       const input = {
//         name,
//         ParentId,
//         type: type || null,
//         sizes: {
//           small: sizes.includes("S"),
//           medium: sizes.includes("M"),
//           large: sizes.includes("L"),
//           extraLarge: sizes.includes("XL"),
//         },
//         measurements,
//         materials,
//         descriptionOptions,
//         AncestorsIds,
//         Ancestors,
//       };

//       // Create a promise for each category creation and store it
//       const categoryPromise = createCategory(context, input)
//         .then((result) => {
//           console.log("Inserted:", result);
//           // Store the newly created category's ID for future parent-child relationships
//           categoryLookup[name] = result._id;
//         })
//         .catch((error) => {
//           console.error("Error inserting category:", error);
//         });

//       categoryInsertPromises.push(categoryPromise);
//     })
//     .on("end", async () => {
//       try {
//         // Wait for all category insertions to complete
//         await Promise.all(categoryInsertPromises);
//         console.log("All categories inserted successfully.");
//       } catch (error) {
//         console.error("Error processing categories:", error);
//       } finally {
//         // Close the MongoDB connection after all operations are complete
//         await client.close();
//         console.log("MongoDB connection closed");
//       }
//     })
//     .on("error", (err) => {
//       console.error("File read error:", err);
//     });
// }

// runImport().catch(console.error);

// import fs from "fs";
// import csv from "csv-parser";
// import { MongoClient } from "mongodb";
// import createCategory from "../mutations/createCategory.js";

// // Setup MongoDB connection
// const url =
//   "mongodb+srv://irtaza:jSt7DoZmaUy67sGs@cluster0.edrupsq.mongodb.net/bizb-dev?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// const dbName = "bizb-dev"; // Use the appropriate database name

// async function runImport() {
//   await client.connect();
//   console.log("Connected successfully to MongoDB server");

//   const db = client.db(dbName);
//   const context = {
//     collections: {
//       categories: db.collection("categories"),
//     },
//   };

//   const categoryInsertPromises = [];

//   // Use relative path since the CSV is now in the same directory as script.js
//   fs.createReadStream("./BizB-Master-Categories-Sheet1.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       const input = {
//         name: row.name,
//         ParentId: row.ParentId || null,
//         type: row.type || null,
//         sizes: {
//           small: row.small === "true",
//           medium: row.medium === "true",
//           large: row.large === "true",
//           extraLarge: row.extraLarge === "true",
//         },
//         measurements: row.measurements ? row.measurements.split(";") : [],
//         materials: row.materials ? row.materials.split(";") : [],
//         descriptionOptions: row.descriptionOptions || null,
//         AncestorsIds: row.AncestorsIds ? row.AncestorsIds.split(";") : [],
//         Ancestors: row.Ancestors ? row.Ancestors.split(";") : [],
//       };

//       // Push each category creation promise into the array
//       categoryInsertPromises.push(createCategory(context, input));
//     })
//     .on("end", async () => {
//       try {
//         // Wait for all category insertions to complete
//         await Promise.all(categoryInsertPromises);
//         console.log("CSV file successfully processed");
//       } catch (error) {
//         console.error("Error inserting categories:", error);
//       } finally {
//         // Close the MongoDB connection after all operations are complete
//         await client.close();
//       }
//     })
//     .on("error", (err) => {
//       console.error("File read error:", err);
//     });
// }

// runImport().catch(console.error);

// import fs from "fs";
// import csv from "csv-parser";
// import { MongoClient } from "mongodb";
// import createCategory from "../mutations/createCategory.js";

// const url =
//   "mongodb+srv://irtaza:jSt7DoZmaUy67sGs@cluster0.edrupsq.mongodb.net/bizb-dev?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// const dbName = "bizb-dev";

// let categoriesData = []; // Temporarily store category data for relationship resolution

// async function runImport() {
//   await client.connect();
//   console.log("Connected successfully to MongoDB server");

//   const db = client.db(dbName);
//   const context = {
//     collections: {
//       categories: db.collection("Categories"),
//     },
//   };

//   fs.createReadStream("./BizB-Master-Categories-Sheet1.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       categoriesData.push({
//         name: row["Category"],
//         parentName: row["Parent"],
//         type: row["Type (Artcile/Dress)"],
//         sizes: row["Size"] ? row["Size"].split(",") : [],
//         measurements: row["Measurements"] ? row["Measurements"].split(",") : [],
//         materials: row["Material"] ? row["Material"].split(",") : [],
//         descriptionOptions: row["Description Options"] || null,
//       });
//     })
//     .on("end", async () => {
//       // Resolve parent and ancestor relationships
//       let categoryLookup = {};
//       for (const cat of categoriesData) {
//         let ParentId = null;
//         let AncestorsIds = [];
//         let Ancestors = [];

//         if (cat.parentName && categoryLookup[cat.parentName]) {
//           ParentId = categoryLookup[cat.parentName]._id;
//           AncestorsIds = [
//             ...categoryLookup[cat.parentName].AncestorsIds,
//             ParentId,
//           ];
//           Ancestors = [
//             ...categoryLookup[cat.parentName].Ancestors,
//             cat.parentName,
//           ];
//         }

//         const input = {
//           name: cat.name,
//           ParentId,
//           type: cat.type || null,
//           sizes: {
//             small: cat.sizes.includes("S"),
//             medium: cat.sizes.includes("M"),
//             large: cat.sizes.includes("L"),
//             extraLarge: cat.sizes.includes("XL"),
//           },
//           measurements: cat.measurements,
//           materials: cat.materials,
//           descriptionOptions: cat.descriptionOptions || null,
//           AncestorsIds,
//           Ancestors,
//         };

//         // Create category and store in lookup for future reference
//         try {
//           const result = await createCategory(context, input);
//           console.log("Inserted:", result);
//           categoryLookup[cat.name] = {
//             ...input,
//             _id: result._id,
//             AncestorsIds,
//             Ancestors,
//           }; // Store the new category with _id for future reference
//         } catch (error) {
//           console.error("Error inserting category:", error);
//         }
//       }

//       console.log("All categories processed successfully.");
//       await client.close();
//       console.log("MongoDB connection closed");
//     })
//     .on("error", (err) => {
//       console.error("File read error:", err);
//     });
// }

// runImport().catch(console.error);

import fs from "fs";
import csv from "csv-parser";
import { MongoClient } from "mongodb";
import createCategory from "../mutations/createCategory.js";

const url =
  "mongodb+srv://irtaza:jSt7DoZmaUy67sGs@cluster0.edrupsq.mongodb.net/bizb-dev?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "bizb-dev";

const categoryLookup = {}; // Stores _id by category name for reference
const ancestorsLookup = {}; // Stores ancestors' ids and names for each category

async function runImport() {
  await client.connect();
  console.log("Connected successfully to MongoDB server");

  const db = client.db(dbName);
  const context = {
    collections: {
      categories: db.collection("Categories"),
    },
  };

  const categoriesData = []; // Temporary storage for categories from CSV

  fs.createReadStream("./BizB-Master-Categories-Sheet1.csv")
    .pipe(csv())
    .on("data", (row) => {
      categoriesData.push({
        name: row["Category"],
        parentName: row["Parent"],
        type: row["Type (Artcile/Dress)"],
        sizes: row["Size"] ? row["Size"].split(",") : [],
        measurements: row["Measurements"] ? row["Measurements"].split(",") : [],
        materials: row["Material"] ? row["Material"].split(",") : [],
        descriptionOptions: row["Description Options"] || null,
      });
    })
    .on("end", async () => {
      for (const cat of categoriesData) {
        let ParentId = null;
        let AncestorsIds = [];
        let Ancestors = [];

        if (cat.parentName && categoryLookup[cat.parentName]) {
          ParentId = categoryLookup[cat.parentName];
          AncestorsIds = [...ancestorsLookup[cat.parentName].ids, ParentId];
          Ancestors = [
            ...ancestorsLookup[cat.parentName].names,
            cat.parentName,
          ];
        }

        const input = {
          name: cat.name,
          ParentId,
          type: cat.type || null,
          sizes: {
            small: cat.sizes.includes("S"),
            medium: cat.sizes.includes("M"),
            large: cat.sizes.includes("L"),
            extraLarge: cat.sizes.includes("XL"),
          },
          measurements: cat.measurements,
          materials: cat.materials,
          descriptionOptions: cat.descriptionOptions || null,
          AncestorsIds,
          Ancestors,
        };

        try {
          const result = await createCategory(context, input);
          console.log("Inserted:", result);
          categoryLookup[cat.name] = result._id;
          ancestorsLookup[cat.name] = { ids: AncestorsIds, names: Ancestors };
        } catch (error) {
          console.error("Error inserting category:", error);
        }
      }

      console.log("All categories processed successfully.");
      await client.close();
      console.log("MongoDB connection closed");
    })
    .on("error", (err) => {
      console.error("File read error:", err);
    });
}

runImport().catch(console.error);
