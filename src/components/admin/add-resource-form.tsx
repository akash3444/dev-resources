"use client";

import { toast } from "@/hooks/use-toast";
import { adminClient } from "@/utils/supabase/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const addResourceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  website_url: z.string().url("Invalid URL").optional(),
  github_url: z.string().url("Invalid URL").optional(),
  docs_url: z.string().url("Invalid URL").optional(),
  twitter_url: z.string().url("Invalid URL").optional(),
  npm_url: z.string().url("Invalid URL").optional(),
  categories: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
});

type FormValues = z.infer<typeof addResourceSchema>;

const AddResourceForm = ({ id, data }: { id: string; data: FormValues }) => {
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(addResourceSchema),
    defaultValues: data,
  });
  const { isSubmitting } = form.formState;
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await supabase
        .from("categories")
        .select("value:slug, label:title")
        .throwOnError();
    },
  });

  const onSubmit = async (data: FormValues) => {
    const resourceData = {
      title: data.title,
      description: data.description,
      docs_url: data.docs_url,
      website_url: data.website_url,
      github_url: data.github_url,
      npm_url: data.npm_url,
      twitter_url: data.twitter_url,
    };
    const resourceInsertQuery = adminClient
      .from("resources")
      .insert(resourceData)
      .select("id")
      .single();
    const resourceUpdateQuery = adminClient
      .from("resources")
      .update(resourceData)
      .eq("id", id)
      .select("id")
      .single();

    const { data: resource, error } = await (id
      ? resourceUpdateQuery
      : resourceInsertQuery);

    if (error || !resource?.id) {
      return toast({
        title: error?.message || "Failed to add resource!",
        variant: "destructive",
      });
    }

    if (id) {
      // Update resource categories
      // Get existing categories for this resource
      const { data: existingCategories } = await adminClient
        .from("resource_categories")
        .select("category_slug")
        .eq("resource_id", id);

      const existingSlugs =
        existingCategories?.map((cat) => cat.category_slug) || [];
      const newSlugs = data.categories.map((cat) => cat.value);

      // Categories to remove (exist in DB but not in new selection)
      const categoriesToRemove = existingSlugs.filter(
        (slug) => !newSlugs.includes(slug),
      );

      // Categories to add (exist in new selection but not in DB)
      const categoriesToAdd = newSlugs
        .filter((slug) => !existingSlugs.includes(slug))
        .map((slug) => ({
          resource_id: id,
          category_slug: slug,
        }));

      // Remove old categories
      if (categoriesToRemove.length > 0) {
        const { error: deleteError } = await adminClient
          .from("resource_categories")
          .delete()
          .eq("resource_id", id)
          .in("category_slug", categoriesToRemove);

        if (deleteError) {
          return toast({
            title: deleteError.message || "Failed to remove old categories!",
            variant: "destructive",
          });
        }
      }

      // Add new categories
      if (categoriesToAdd.length > 0) {
        const { error: insertError } = await adminClient
          .from("resource_categories")
          .insert(categoriesToAdd);

        if (insertError) {
          return toast({
            title: insertError.message || "Failed to add new categories!",
            variant: "destructive",
          });
        }
      }
    } else {
      // Add resource categories
      const resourceCategories = data.categories.map((category) => ({
        resource_id: resource!.id,
        category_slug: category.value,
      }));

      const { error: resourceCategoriesError } = await adminClient
        .from("resource_categories")
        .insert(resourceCategories);

      if (resourceCategoriesError) {
        return toast({
          title:
            resourceCategoriesError?.message ||
            "Failed to add resource categories!",
          variant: "destructive",
        });
      }
    }

    toast({
      title: id
        ? "Resource updated successfully!"
        : "Resource added successfully!",
    });

    if (!id) {
      form.reset();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">{id ? "Edit" : "Add"} Resource</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="docs_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Docs URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Docs URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Github URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Twitter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="npm_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NPM URL</FormLabel>
                  <FormControl>
                    <Input placeholder="NPM URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {mounted && (
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      isMulti
                      name="categories"
                      options={categories?.data || []}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isLoading={isLoading}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button className="!mt-8 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : id ? (
              "Update Resource"
            ) : (
              "Add Resource"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddResourceForm;
