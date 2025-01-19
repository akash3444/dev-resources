"use client";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import InfiniteScroll from "react-infinite-scroll-component";
import { NoResourcesFound } from "./no-resources-found";
import { ResourceCard } from "./resource-card";

type Resource = Database["public"]["Functions"]["get_resources"]["Returns"][0];

interface ResourceListProps {
  searchQuery: string;
  category?: string;
}

const PAGE_SIZE = 12;

const ResourceListSkeleton = () =>
  Array.from({ length: PAGE_SIZE }).map((_, i) => (
    <div key={i} className="h-72 w-full rounded-lg bg-accent" />
  ));

export const ResourceList = ({ category, searchQuery }: ResourceListProps) => {
  const supabase = createClient();
  const [query] = useQueryState("q");
  const [sortBy] = useQueryState("sortBy");
  const {
    data: result,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["resources", category, sortBy, query],
    queryFn: async ({ pageParam }) => {
      const { data: resources } = await supabase.rpc("get_resources", {
        category,
        order_by: sortBy || "popularity",
        // @ts-expect-error - If searchQuery is null, it will return all resources
        search_query: query ?? null,
        page: pageParam,
        page_size: PAGE_SIZE,
      });

      return resources;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage && lastPage[lastPage?.length - 1]?.has_more
        ? pages.length + 1
        : undefined;
    },
  });
  const resources = result?.pages.flat() as Resource[];

  if (!isLoading && !resources?.length) {
    return <NoResourcesFound searchQuery={searchQuery} />;
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ResourceListSkeleton />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={resources?.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<ResourceListSkeleton />}
          endMessage={null}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {resources?.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
