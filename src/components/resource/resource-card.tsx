import { Database } from "@/types/supabase";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubLogo, NPMLogo, XLogo } from "../icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";

const IMAGE_SIZE = 64;

export const ResourceCard = async ({
  resource,
}: {
  resource: Database["public"]["Functions"]["get_resources"]["Returns"][0];
}) => {
  const supabase = await createClient();
  const favicon = `https://www.google.com/s2/favicons?domain=${resource.website_url}&sz=${IMAGE_SIZE}`;
  const imageUrl = resource.image_url
    ? supabase.storage.from("resource_images").getPublicUrl(resource.image_url)
        .data.publicUrl
    : favicon;

  return (
    <div className="flex flex-col rounded-lg bg-accent/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            alt=""
            className="h-8 w-8 rounded"
          />
          <span className="font-semibold">{resource.title}</span>
        </div>
        <div className="flex items-center">
          {resource.github_url && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={resource.github_url} target="_blank" rel="noreferrer">
                <GithubLogo className="!h-5 !w-5" />
              </Link>
            </Button>
          )}
          {resource.npm_url && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={resource.npm_url} target="_blank" rel="noreferrer">
                <NPMLogo className="!h-5 !w-5" />
              </Link>
            </Button>
          )}
          {resource.twitter_url && (
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={resource.twitter_url}
                target="_blank"
                rel="noreferrer"
              >
                <XLogo className="!h-4 !w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1">
        {(resource.categories as { title: string; slug: string }[]).map(
          ({ title, slug }) => (
            <Badge
              key={slug}
              className="bg-indigo-600/10 text-indigo-600 shadow-none hover:bg-indigo-600/20"
            >
              {title}
            </Badge>
          ),
        )}
      </div>

      <p className="my-4">{resource.description}</p>

      <div className="mt-auto flex items-center gap-2">
        {resource.website_url && (
          <Button size="sm" asChild>
            <Link href={resource.website_url} target="_blank" rel="noreferrer">
              Visit <ArrowUpRight />
            </Link>
          </Button>
        )}
        {resource.docs_url && (
          <Button size="sm" asChild>
            <Link href={resource.docs_url} target="_blank" rel="noreferrer">
              Docs <BookOpen />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
