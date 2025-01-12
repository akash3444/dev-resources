import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { GithubLogo, NPMLogo, XLogo } from "../icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

const IMAGE_SIZE = 64;

export const ResourceCard = ({ resource }: { resource: SanityDocument }) => {
  const favicon = `https://www.google.com/s2/favicons?domain=${resource.website}&sz=${IMAGE_SIZE}`;
  const imageUrl = resource.mainImage
    ? urlFor(resource.mainImage).size(IMAGE_SIZE, IMAGE_SIZE).url()
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
          {resource.github && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={resource.github} target="_blank" rel="noreferrer">
                <GithubLogo className="!h-5 !w-5" />
              </Link>
            </Button>
          )}
          {resource.npm && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={resource.npm} target="_blank" rel="noreferrer">
                <NPMLogo className="!h-5 !w-5" />
              </Link>
            </Button>
          )}
          {resource.twitter && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={resource.twitter} target="_blank" rel="noreferrer">
                <XLogo className="!h-4 !w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1">
        {resource.categories?.map(
          ({ title, slug }: { title: string; slug: { current: string } }) => (
            <Badge
              key={slug.current}
              className="bg-indigo-600/10 text-indigo-600 shadow-none hover:bg-indigo-600/20"
            >
              {title}
            </Badge>
          ),
        )}
      </div>

      <p className="my-4">{resource.body}</p>

      <div className="mt-auto flex items-center gap-2">
        {resource.website && (
          <Button size="sm" asChild>
            <Link href={resource.website} target="_blank" rel="noreferrer">
              Visit <ArrowUpRight />
            </Link>
          </Button>
        )}
        {resource.documentationUrl && (
          <Button size="sm" asChild>
            <Link
              href={resource.documentationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Docs <BookOpen />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
