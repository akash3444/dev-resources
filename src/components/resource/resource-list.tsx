import { Database } from "@/types/supabase";
import { ResourceCard } from "./resource-card";

interface ResourceListProps {
  resources: Database["public"]["Functions"]["get_resources"]["Returns"];
}

export const ResourceList = ({ resources }: ResourceListProps) => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {resources.map((resource, i) => (
      <ResourceCard key={i} resource={resource} />
    ))}
  </div>
);
