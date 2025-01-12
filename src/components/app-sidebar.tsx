"use client";

import {
  Brush,
  Code,
  FlaskConical,
  GitFork,
  Key,
  LayoutList,
  LayoutPanelLeft,
  LibraryBig,
  PaintBucket,
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
        <div className="flex items-center gap-3 font-semibold text-foreground">
          <Logo />
          <span className="whitespace-nowrap group-data-[state=collapsed]:hidden">
            Dev Resources
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
