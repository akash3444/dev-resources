import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const resourceType = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "body",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website Link",
      type: "url",
    }),
    defineField({
      name: "github",
      title: "Github Link",
      type: "url",
    }),
    defineField({
      name: "npm",
      title: "NPM Link",
      type: "url",
    }),
    defineField({
      name: "documentationUrl",
      title: "Documentation Link",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "Twitter Link",
      type: "url",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
  ],
});
