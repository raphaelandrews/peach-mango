"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';

import { cn } from "@/lib/utils";
import { Category, Country, Subcategory } from "@/types";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  categories: Category[];
  countries: Country[];
}

const MainNav: React.FC<MainNavProps> = ({
  categories,
  countries
}) => {
  const pathname = usePathname();
  const t = useTranslations('MainNav');

  const routes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <NavigationMenu className="mt-4">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <NavigationMenuList className="gap-2">
          {categories
            .filter(category => category.subcategories.length > 0)
            .map((category) => (
              <div key={category.id}>
                {category.subcategories && category.subcategories.length > 0 ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Link
                        href={`/category/${category.id}`}
                      >
                        {category.name}
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid lg:w-[500px] lg:grid-cols-[.75fr_1fr] gap-3 p-4 md:w-[400px]">
                        {category.subcategories && category.subcategories.length > 0 && (
                          <>
                            {category.subcategories.map((subcategory: Subcategory) => (
                              <ListItem
                                key={subcategory.id}
                                href={`/category/${category.id}?subcategoryId=${subcategory.id}`}
                                title={subcategory.name}
                              />
                            ))}
                          </>
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>)
                  :
                  (<NavigationMenuItem className="cursor-pointer">
                    <Link
                      href={`/category/${category.id}`}
                      legacyBehavior
                    >
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {category.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  )}
              </div>
            ))}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link
                href={`/countries`}
                className="flex gap-2"
              >
                <span>🌎</span>
                {t('countries')}
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {countries.map((country) => (
                  <ListItem
                    key={country.id}
                    href={`/country/${country.id}`}
                    title={country.name}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <ScrollBar orientation="horizontal" className="border-transparent h-0" />
      </ScrollArea>
    </NavigationMenu >
  )
};

export default MainNav;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-tertiary-foreground hover:bg-tertiary focus:text-background focus:bg-accent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
