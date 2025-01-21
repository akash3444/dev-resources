import AddResourceForm from "@/components/admin/add-resource-form";
import GoBackButton from "@/components/admin/go-back-button";
import { createClient } from "@/utils/supabase/server";

const ResourceEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from("resources")
    .select(
      "id, title, description, website_url, github_url, npm_url, twitter_url, docs_url, categories:resource_categories(value:category_slug,...categories(label:title))",
    )
    .eq("id", id)
    .single();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const defaultValues = {
    title: data?.title || "",
    description: data?.description || "",
    website_url: data?.website_url || "",
    github_url: data?.github_url || "",
    npm_url: data?.npm_url || "",
    twitter_url: data?.twitter_url || "",
    docs_url: data?.docs_url || "",
    categories: data?.categories || [],
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-8">
      <div className="mx-auto w-full max-w-xl">
        <GoBackButton />
        <div className="mt-4 rounded-lg border p-6">
          <AddResourceForm id={id} data={defaultValues} />
        </div>
      </div>
    </div>
  );
};

export default ResourceEditPage;
