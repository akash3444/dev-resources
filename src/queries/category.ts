export const CATEGORIES_QUERY = `*[_type == "category" && !(_id in path("drafts.**"))]{
  _id,
  title,
}`;
