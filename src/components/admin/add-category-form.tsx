"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, RefreshCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
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
import { toast } from "@/hooks/use-toast";
import { adminClient } from "@/utils/supabase/admin";

const addCategorySchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
});

type FormValues = z.infer<typeof addCategorySchema>;

const AddCategoryForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      slug: "",
    },
    resolver: zodResolver(addCategorySchema),
  });
  const { isSubmitting } = form.formState;

  const slugifyTitle = () => {
    const title = form.getValues("title");
    const slug = slugify(title, { lower: true });
    form.setValue("slug", slug);
  };

  const onSubmit = async (data: FormValues) => {
    const { error } = await adminClient.from("categories").insert(data);
    if (error) {
      toast({
        title: error?.message || "Something went wrong!",
        variant: "destructive",
      });
    }

    toast({
      title: "Category added successfully!",
    });
    form.reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Add Category</h2>

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
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={slugifyTitle}
            >
              <RefreshCcw />
            </Button>
          </div>

          <Button className="!mt-8 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              "Add Category"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCategoryForm;
