import { ResourceList } from "@/components/resource";
import { RESOURCES_QUERY } from "@/queries/resource";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

const options = { next: { revalidate: 60 } };

export default async function Home() {
  const resources = await client.fetch<SanityDocument[]>(
    RESOURCES_QUERY,
    {},
    options,
  );

  return <ResourceList resources={resources} />;
}
