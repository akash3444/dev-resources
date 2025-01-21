import DeleteResourceButton from "@/components/admin/delete-reource-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

const ResourceList = async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("resources")
    .select(
      "id, title, website_url, github_url, npm_url, twitter_url, docs_url, categories:resource_categories(slug:category_slug,...categories(title))",
    );

  return (
    <Table className="mx-auto my-10 max-w-screen-2xl">
      <TableHeader>
        <TableRow>
          {/* <TableHead>ID</TableHead> */}
          <TableHead>Title</TableHead>
          <TableHead>Website</TableHead>
          <TableHead>Docs</TableHead>
          <TableHead>Github</TableHead>
          {/* <TableHead>NPM</TableHead>
          <TableHead>Twitter</TableHead> */}
          <TableHead>Categories</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(({ id, title, ...data }) => (
          <TableRow key={id}>
            {/* <TableCell>{id}</TableCell> */}
            <TableCell>
              <b>{title}</b>
            </TableCell>
            <TableCell>{data.website_url || "-"}</TableCell>
            <TableCell>{data.docs_url || "-"}</TableCell>
            <TableCell>{data.github_url || "-"}</TableCell>
            {/* <TableCell>{data.npm_url || "-"}</TableCell>
            <TableCell>{data.twitter_url || "-"}</TableCell> */}
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {data.categories.map((category) => (
                  <Badge
                    key={category.slug}
                    className="whitespace-nowrap bg-indigo-600/10 text-indigo-600 shadow-none hover:bg-indigo-600/20"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button size="icon">
                  <Link href={`resources/${id}/edit`}>
                    <PencilIcon />
                  </Link>
                </Button>
                <DeleteResourceButton id={id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResourceList;
