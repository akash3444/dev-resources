"use client";

import {
  Brush,
  Code,
  FlaskConical,
  GitFork,
  ImageIcon,
  Key,
  LayoutList,
  LayoutPanelLeft,
  LibraryBig,
  PaintBucket,
  Palette,
  Server,
  TextCursorInput,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Logo from "./logo";

const data = {
  navMain: [
    {
      title: "Authentication",
      slug: "authentication",
      icon: Key,
    },
    {
      title: "Code Editor",
      slug: "code-editor",
      icon: Code,
    },
    {
      title: "CSS Tools",
      slug: "css-tools",
      icon: Palette,
      items: [
        {
          title: "Color Palette Generator",
          slug: "color-palette-generator",
        },
        {
          title: "Gradient Generator",
          slug: "gradient-generator",
        },
        {
          title: "SVG Background Generator",
          slug: "svg-background-generator",
        },
      ],
    },
    {
      title: "Deployment",
      slug: "deployment",
      icon: Server,
      items: [
        {
          title: "Hosting",
          slug: "hosting",
        },
        {
          title: "Containerization",
          slug: "containerization",
        },
        {
          title: "Cloud Service",
          slug: "cloud-service",
        },
      ],
    },
    {
      title: "UI/UX",
      slug: "ui-ux",
      icon: Brush,
      items: [
        {
          title: "Design",
          slug: "ui-ux-design",
        },
        {
          title: "Prototyping & Wireframing",
          slug: "prototyping",
        },
      ],
    },
    {
      title: "Forms",
      slug: "forms",
      icon: TextCursorInput,
    },
    {
      title: "Headless CMS",
      slug: "headless-cms",
      icon: LayoutList,
    },
    {
      title: "Icons",
      slug: "icons",
      icon: LibraryBig,
    },
    {
      title: "Illustrations",
      slug: "illustrations",
      icon: ImageIcon,
    },
    {
      title: "Testing",
      slug: "testing",
      icon: FlaskConical,
      items: [
        {
          title: "Unit Testing",
          slug: "unit-testing",
        },
        {
          title: "E2E Testing",
          slug: "e2e-testing",
        },
      ],
    },
    {
      title: "UI Library",
      slug: "ui-library",
      icon: PaintBucket,
    },
    {
      title: "UI Collection",
      slug: "ui-collection",
      icon: LayoutPanelLeft,
    },
    {
      title: "Version Control",
      slug: "version-control",
      icon: GitFork,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-3 py-4 transition-all group-data-[state=collapsed]:px-2">
        <Link href="/">
          <div className="flex items-center gap-3 font-semibold text-foreground">
            <Logo />
            <span className="whitespace-nowrap group-data-[state=collapsed]:hidden">
              Dev Resources
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
