import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { resourceType } from "./resourceType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, resourceType],
};
