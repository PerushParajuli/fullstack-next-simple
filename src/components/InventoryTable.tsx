"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ComboBox } from "./ui/ComboBox";
import { Search, Trash2Icon } from "lucide-react";

import { useState } from "react";

type Plant = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function InventoryTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const plants: Plant[] = [
    {
      id: 1,
      name: "Sandpaper Oak",
      category: "Fagaceae",
      price: 149.99,
      stock: 82,
    },
    {
      id: 2,
      name: "Tomentose Groutiella Moss",
      category: "Orthotrichaceae",
      price: 3.29,
      stock: 11,
    },
    {
      id: 3,
      name: "Drummond's Wild Petunia",
      category: "Acanthaceae",
      price: 4.19,
      stock: 66,
    },
    {
      id: 4,
      name: "Tuckermannopsis Lichen",
      category: "Parmeliaceae",
      price: 4.79,
      stock: 30,
    },
    {
      id: 5,
      name: "Spontaneous Barley",
      category: "Poaceae",
      price: 3.99,
      stock: 72,
    },
    {
      id: 6,
      name: "Common Dandelion",
      category: "Asteraceae",
      price: 19.99,
      stock: 3,
    },
    {
      id: 7,
      name: "Auwahi Melicope",
      category: "Rutaceae",
      price: 24.99,
      stock: 5,
    },
    {
      id: 8,
      name: "Oahu Wild Coffee",
      category: "Rubiaceae",
      price: 15.99,
      stock: 7,
    },
    {
      id: 9,
      name: "Fairbanks Annual Indian Paintbrush",
      category: "Scrophulariaceae",
      price: 2.99,
      stock: 80,
    },
    {
      id: 10,
      name: "Huachuca Mountain Morning-glory",
      category: "Convolvulaceae",
      price: 5.79,
      stock: 99,
    },
  ];

  return (
    <div className="px-8 py-4 w-full">
      <div className="">
        {/* Search and filer */}
        <div className="w-full flex items-center gap-2 py-4">
          <div className="relative max-w-sm w-full">
            <Input
              placeholder="Filter plants..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <ComboBox
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
          />
        </div>

        {/* Add new Plants */}
      </div>

      <div className="grid w-full [&>div]:max-h-screen [&>div]:border [&>div]:rounded">
        <Table>
          <TableHeader>
            <TableRow className="*:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price (NPR)</TableHead>
              <TableHead>Stock Quantity</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-hidden">
            {plants.map((plant) => (
              <TableRow
                key={plant.id}
                className="odd:bg-muted/50 *:whitespace-nowrap"
              >
                <TableCell className="font-medium">{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell>{plant.stock}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Button variant={"default"} size={"sm"}>
                      Edit
                    </Button>
                    <Button variant={"destructive"} size={"icon-sm"}>
                      <Trash2Icon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
