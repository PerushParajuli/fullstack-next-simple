"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const plantCategories = [
  {
    value: "",
    label: "None",
  },
  {
    value: "Indoor",
    label: "Indoor",
  },
  {
    value: "Outdoor",
    label: "Outdoor",
  },
  {
    value: "Succulent",
    label: "Succulent",
  },
  {
    value: "Flowering",
    label: "Flowering",
  },
  {
    value: "Herb",
    label: "Herb",
  },
  {
    value: "Fern",
    label: "Fern",
  },
  {
    value: "Tree",
    label: "Tree",
  },
  {
    value: "Shrub",
    label: "Shrub",
  },
];

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void; // "onChange is a function that takes a string and returns a void."
}

export function ComboBox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? plantCategories.find((plant) => plant.value === value)?.label
            : "Select Plant Category..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search plant type..." />
          <CommandList>
            <CommandEmpty>No Plant Category</CommandEmpty>
            <CommandGroup>
              {plantCategories.map((plant) => (
                <CommandItem
                  key={plant.value}
                  value={plant.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === plant.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {plant.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
