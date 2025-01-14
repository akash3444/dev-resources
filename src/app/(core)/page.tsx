import { ResourceList } from "@/components/resource";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  // TODO: handle error
  const { data: resources } = await supabase.rpc("get_resources", {
    order_by: "title",
  });

  return <ResourceList resources={resources || []} />;
}
