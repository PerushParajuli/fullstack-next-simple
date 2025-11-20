"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { ComboBox } from "./ui/ComboBox";
import { useState } from "react";

import { Textarea } from "./ui/textarea";
import { addNewPlant, updatePlant } from "@/actions/plant.action";
import { PlantType } from "@/lib/types";

export function PlantFormDialog({
  onPlantSaved,
  initialPlant,
  onOpenChange,
  open,
}: {
  onPlantSaved: () => void;
  initialPlant?: PlantType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [category, selectedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isEditing = !!initialPlant; // Converting truthy and falsy to actual boolean value

  // ensures that only one submission is made at a time
  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (isEditing) {
      formData.set("id", initialPlant!.id); // I promise initialPlant is NOT null here.
      await updatePlant(formData);
    } else {
      formData.set("requestId", crypto.randomUUID());
      const result = await addNewPlant(formData);
    }
    setIsSubmitting(false);
    onOpenChange(false);
    onPlantSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {/* Actions to be taken */}
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Plant" : "Add a Plant"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the plant details below."
                : "Fill out the form below to add a new plant to your inventory."}
            </DialogDescription>
          </DialogHeader>

          {/* Name and Category */}
          <div className="grid grid-cols-2 place-items-center gap-y-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Peace Lily"
                required
                defaultValue={initialPlant?.name ?? ""}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <ComboBox
                value={category}
                onChange={(value) => selectedCategory(value)}
              />
              <Input
                type="hidden"
                name="category"
                value={category}
                required
                defaultValue={initialPlant?.category ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-rows-3 px-2 py-4">
            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your plant"
                className="overflow-y-auto max-h-20"
                defaultValue={initialPlant?.description ?? ""}
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 place-items-center">
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={initialPlant?.price ?? 0}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  id="stock"
                  defaultValue={initialPlant?.stock ?? 0}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter onClick={(e) => e.stopPropagation()}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!category}>
              {isEditing ? "Save Changes" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
