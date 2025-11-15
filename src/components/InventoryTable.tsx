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

import { useEffect, useState } from "react";
import { PlantType } from "@/lib/types";
import { getPlants } from "@/actions/plant.action";
import { useRouter } from "next/navigation";

import { AddPlant } from "./PlantForm";

export default function InventoryTable() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [plants, setPlants] = useState<PlantType[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const data = await getPlants(searchTerm);
      setPlants(data.userPlants);
    };
    fetchPlants();
  }, [searchTerm]);

  // Filter plants by category (if selected)
  const filteredPlants = selectedCategory
    ? plants?.filter((plant) => plant.category === selectedCategory)
    : plants;

  return (
    <div className="px-8 py-4 w-full">
      <div className="flex items-center justify-between">
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
        <AddPlant />
      </div>

      <div className="grid w-full [&>div]:max-h-screen [&>div]:border [&>div]:rounded">
        <Table>
          <TableHeader>
            <TableRow className="shadow-none *:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price (NPR)</TableHead>
              <TableHead>Stock Quantity</TableHead>
              <TableHead>Options</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-hidden">
            {filteredPlants.map((plant) => {
              const slugifiledName = plant.name
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${plant.id}--${slugifiledName}`;
              const plantUrl = `/plants/${slug}`;

              return (
                <TableRow
                  key={plant.id}
                  className="odd:bg-muted/50 *:whitespace-nowrap"
                >
                  <TableCell
                    className="font-medium"
                    onClick={() => router.push(plantUrl)}
                  >
                    {plant.name}
                  </TableCell>
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
