import { ResourceFilters, ResourceList } from "@/components/resource";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sortBy: string; q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <ResourceFilters />
      <ResourceList searchQuery={q} />
    </>
  );
}
