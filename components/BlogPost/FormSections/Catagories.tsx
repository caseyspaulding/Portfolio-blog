// components/BlogPost/FormSections/Categories.tsx
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from '@/cn';
import
  {
    CATEGORIES,
    TECHNOLOGIES,
    DIFFICULTY_LEVELS
  } from '@/constants/blogConstants';
import { Button } from '@/components/ui/button';

interface CategoriesProps
{
  difficultyLevel: string;
  setDifficultyLevel: ( level: string ) => void;
  selectedCategories: string[];
  setSelectedCategories: ( categories: string[] ) => void;
  selectedTechnologies: string[];
  setSelectedTechnologies: ( technologies: string[] ) => void;
  setCategories: ( categories: string[] ) => void;
  setTechnologies: ( technologies: string[] ) => void;
  openCategories: boolean;
  setOpenCategories: ( open: boolean ) => void;
  openTechnologies: boolean;
  setOpenTechnologies: ( open: boolean ) => void;
}

const Categories: React.FC<CategoriesProps> = ( {
  difficultyLevel,
  setDifficultyLevel,
  selectedCategories,
  setSelectedCategories,
  selectedTechnologies,
  setSelectedTechnologies,
  setCategories,
  setTechnologies,
  openCategories,
  setOpenCategories,
  openTechnologies,
  setOpenTechnologies
} ) =>
{
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Difficulty Level */ }
      <div className="space-y-2">
        <Label htmlFor="difficultyLevel">Difficulty Level</Label>
        <Select
          value={ difficultyLevel }
          onValueChange={ setDifficultyLevel }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            { DIFFICULTY_LEVELS.map( ( level ) => (
              <SelectItem key={ level } value={ level }>
                { level }
              </SelectItem>
            ) ) }
          </SelectContent>
        </Select>
      </div>

      {/* Categories */ }
      <div className="space-y-2">
        <Label>Categories</Label>
        <Popover open={ openCategories } onOpenChange={ setOpenCategories }>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={ openCategories }
              className="w-full justify-between"
              onClick={ () => {/* your toggle logic */ } }
            >
              { selectedCategories.length > 0
                ? `${ selectedCategories.length } selected`
                : "Select categories..." }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-white p-0">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                { CATEGORIES.map( ( category ) => (
                  <CommandItem
                    key={ category }
                    onSelect={ () =>
                    {
                      // Update selectedCategories and call setCategories to persist
                      const updatedCategories = selectedCategories.includes( category )
                        ? selectedCategories.filter( ( item ) => item !== category )
                        : [ ...selectedCategories, category ];
                      setSelectedCategories( updatedCategories );
                      setCategories( updatedCategories ); // Ensure persistence in the database
                    } }
                  >
                    <Check
                      className={ cn(
                        "mr-2 h-4 w-4",
                        selectedCategories.includes( category )
                          ? "opacity-100"
                          : "opacity-0"
                      ) }
                    />
                    { category }
                  </CommandItem>
                ) ) }
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        { selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            { selectedCategories.map( ( category ) => (
              <Badge
                key={ category }
                variant="default"
                className="cursor-pointer"
                onClick={ () =>
                {
                  const updatedCategories = selectedCategories.filter(
                    ( c ) => c !== category
                  );
                  setSelectedCategories( updatedCategories );
                  setCategories( updatedCategories ); // Ensure persistence in the database
                } }
              >
                { category } ×
              </Badge>
            ) ) }
          </div>
        ) }
      </div>

      {/* Technologies */ }
      <div className="space-y-2">
        <Label>Technologies</Label>
        <Popover open={ openTechnologies } onOpenChange={ setOpenTechnologies }>
          <PopoverTrigger asChild>
            <Button
              variant="outline" // shadcn uses "outline" instead of "bordered"
              role="combobox"
              aria-expanded={ openTechnologies }
              className="w-full justify-between"
              onClick={ () => {/* your toggle logic */ } }
            >
              { selectedTechnologies.length > 0
                ? `${ selectedTechnologies.length } selected`
                : "Select technologies..." }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-white p-0">
            <Command>
              <CommandInput placeholder="Search technologies..." />
              <CommandEmpty>No technology found.</CommandEmpty>
              <CommandGroup>
                { TECHNOLOGIES.map( ( tech ) => (
                  <CommandItem
                    key={ tech }
                    onSelect={ () =>
                    {
                      // Update selectedTechnologies and call setTechnologies to persist
                      const updatedTechnologies = selectedTechnologies.includes( tech )
                        ? selectedTechnologies.filter( ( item ) => item !== tech )
                        : [ ...selectedTechnologies, tech ];
                      setSelectedTechnologies( updatedTechnologies );
                      setTechnologies( updatedTechnologies ); // Ensure persistence in the database
                    } }
                  >
                    <Check
                      className={ cn(
                        "mr-2 h-4 w-4",
                        selectedTechnologies.includes( tech )
                          ? "opacity-50"
                          : "opacity-0"
                      ) }
                    />
                    { tech }
                  </CommandItem>
                ) ) }
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        { selectedTechnologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            { selectedTechnologies.map( ( tech ) => (
              <Badge
                key={ tech }
                variant="default"
                className="cursor-pointer"
                onClick={ () =>
                {
                  const updatedTechnologies = selectedTechnologies.filter(
                    ( t ) => t !== tech
                  );
                  setSelectedTechnologies( updatedTechnologies );
                  setTechnologies( updatedTechnologies ); // Ensure persistence in the database
                } }
              >
                { tech } ×
              </Badge>
            ) ) }
          </div>
        ) }
      </div>
    </div>
  );
};

export default Categories;