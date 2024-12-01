import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/test/dashboard",
          label: "Dashboard",
          active: pathname.includes("/test/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/test/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/test/posts",
              label: "All Posts",
              active: pathname === "/test/posts"
            },
            {
              href: "/test/posts/new",
              label: "New Post",
              active: pathname === "/test/posts/new"
            }
          ]
        },
        {
          href: "/test/categories",
          label: "Categories",
          active: pathname.includes("/test/categories"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/test/tags",
          label: "Tags",
          active: pathname.includes("/test/tags"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/test/users",
          label: "Users",
          active: pathname.includes("/test/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/test/account",
          label: "Account",
          active: pathname.includes("/test/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
