import { ResourceList } from "@/components/resource";
import { createClient } from "@/utils/supabase/server";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const supabase = await createClient();
  const { category } = await params;
  // TODO: handle error
  const { data: resources } = await supabase.rpc("get_resources", {
    category,
    order_by: "title",
  });

  return <ResourceList resources={resources || []} />;
};

export default CategoryPage;
