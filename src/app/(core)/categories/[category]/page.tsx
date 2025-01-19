import { ResourceFilters, ResourceList } from "@/components/resource";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sortBy: string; q: string }>;
}) => {
  const { q } = await searchParams;
  const { category } = await params;

  return (
    <>
      <ResourceFilters />
      <ResourceList searchQuery={q} category={category} />
    </>
  );
};

export default CategoryPage;
