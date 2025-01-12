import { ResourceList } from "@/components/resource";
import { CATEGORIES_QUERY } from "@/queries/category";
import { CATEGORY_RESOURCES_QUERY } from "@/queries/resource";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

const options = { next: { revalidate: 60 } };

export const generateStaticParams = async () => {
  const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {});
  return categories;
};

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const resources = await client.fetch<SanityDocument[]>(
    CATEGORY_RESOURCES_QUERY,
    { category },
    options,
  );

  return <ResourceList resources={resources} />;
};

export default CategoryPage;
