export const RESOURCES_QUERY = `*[
  _type == "resource"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
]|order(publishedAt desc)[0...12]{_id, title, slug, body, mainImage, categories[]->{title,slug}, website, github, npm, twitter, documentationUrl, publishedAt}`;

export const CATEGORY_RESOURCES_QUERY = `*[
  _type == "resource"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
  && references(*[_type == "category" && slug.current == $category]._id)
]|order(publishedAt desc)[0...12]{_id, title, slug, body, mainImage, categories[]->{title,slug}, website, github, npm, twitter, documentationUrl, publishedAt}`;
