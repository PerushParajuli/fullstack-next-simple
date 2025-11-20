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
import { Search, Trash2Icon, PencilIcon, Sprout } from "lucide-react";

import { useEffect, useState } from "react";
import { PlantType } from "@/lib/types";
import { deletePlant, getPlants, updatePlant } from "@/actions/plant.action";
import { useRouter } from "next/navigation";

import { PlantFormDialog } from "./PlantForm";

export default function InventoryTable() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [plants, setPlants] = useState<PlantType[]>([]);
  const [editingPlant, setEditingPlant] = useState<PlantType | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const fetchPlants = async () => {
    const data = await getPlants(searchTerm);
    setPlants(data.userPlants);
  };

  useEffect(() => {
    fetchPlants();
  }, [searchTerm]);

  // Filter plants by category (if selected)
  const filteredPlants = selectedCategory
    ? plants?.filter((plant) => plant.category === selectedCategory)
    : plants;

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this plant?");
    if (!confirmed) return;

    const res = await deletePlant(id);

    if (res.success) {
      // update UI and remove the current plant associated with this ID
      setPlants((prev) => prev.filter((p) => p.id !== id));
    } else alert("Failed to delete Plant.");
  };

  const handleEdit = (plant: PlantType) => {
    setEditingPlant(plant);
    setFormOpen(true);
  };

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

        {/* Add button -> opens form for creating */}
        <Button
          variant="outline"
          onClick={() => {
            setEditingPlant(null);
            setFormOpen(true);
          }}
        >
          <Sprout className="text-green-800 hover:cursor-pointer" /> Add Plant
        </Button>

        {/* Reusable Add/Edit Form */}
        <PlantFormDialog
          initialPlant={editingPlant}
          onPlantSaved={() => fetchPlants()}
          open={formOpen}
          onOpenChange={setFormOpen}
        />
      </div>

      <div className="grid w-full [&>div]:max-h-screen [&>div]:border [&>div]:rounded">
        <Table>
          <TableHeader>
            <TableRow className="shadow-none *:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price (NPR)</TableHead>
              <TableHead>Stock Quantity</TableHead>{" "}
              <TableHead>Description</TableHead>
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
                  <TableCell
                    className="max-w-[200px] truncate"
                    title={plant.description ?? ""}
                  >
                    {plant.description || "-"}
                  </TableCell>

                  <TableCell className="w-full flex justify-end items-center gap-x-2">
                    <Button
                      variant="outline"
                      size="default"
                      title="Edit"
                      onClick={() => handleEdit(plant)}
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      title="Delete"
                      onClick={() => handleDelete(plant.id)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
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
