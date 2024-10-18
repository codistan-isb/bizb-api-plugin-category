/**
 * @name Categories
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} _id optional
 * @property {String} name required
 * @property {String} type required
 * @property {String} ParentId required
 * @property {AncestorsIds[]} AncestorsIds optional
 * @property {Ancestor[]} Ancestor optional
 * @property {materials[]} materials optional
 * @property {size{}} sizes optional
 * @property {String} descriptionOptions default value: `false`
 * @property {measurements[]} measurements required
 

 */
export const Categories = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  name: {
    type: String, // Name of the category
    label: "Category name",
  },
  type: {
    type: String, // Type of category (e.g., Article)
    optional: true,
    label: "Category type",
  },
  ParentId: {
    type: String, // ID of the parent category (null if it's a root category)
    optional: true,
    label: "Parent category ID",
  },
  AncestorsIds: {
    type: Array, // Array of ancestor category IDs
    optional: true,
    label: "Ancestor category IDs",
  },
  "AncestorsIds.$": {
    type: String, // Each ancestor category ID
  },
  Ancestors: {
    type: Array, // Array of ancestor category names
    optional: true,
    label: "Ancestor category names",
  },
  "Ancestors.$": {
    type: String, // Each ancestor category name
  },
  materials: {
    type: Array, // List of materials used
    optional: true,
    label: "Materials",
  },
  "materials.$": {
    type: String,
  },
  sizes: {
    type: Object, // Sizes object with boolean values for each size
    optional: false, // Required field as per your new design
    label: "Available sizes",
  },
  "sizes.small": {
    type: Boolean,
    label: "Small size availability",
    optional: false,
  },
  "sizes.medium": {
    type: Boolean,
    label: "Medium size availability",
    optional: false,
  },
  "sizes.large": {
    type: Boolean,
    label: "Large size availability",
    optional: false,
  },
  "sizes.extraLarge": {
    type: Boolean,
    label: "Extra Large size availability",
    optional: false,
  },
  descriptionOptions: {
    type: String, // Additional description options (can be null)
    optional: true,
    label: "Description options",
  },
  measurements: {
    type: Array, // List of relevant measurements
    optional: true,
    label: "Measurements",
  },
  "measurements.$": {
    type: String,
  },
  createdAt: {
    type: Date, // Creation date
    label: "Created at",
  },
  updatedAt: {
    type: Date, // Last updated date
    label: "Updated at",
  },

  // "relatedTagIds.$": String,
  // isDeleted: {
  //   type: Boolean,
  //   defaultValue: false,
  // },
  // isVisible: {
  //   type: Boolean,
  //   defaultValue: true,
  // },

  // shopId: {
  //   type: String,
  //   label: "Tag shopId",
  // },
});
