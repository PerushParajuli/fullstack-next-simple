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
import { addNewPlant } from "@/actions/plant.action";

export function AddPlant({ onPlantAdded }: { onPlantAdded: () => void }) {
  const [requestId] = useState(() => crypto.randomUUID()); // generated a unique ID when dialouge opens
  const [category, selectedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // ensures that only one submission is made at a time
  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    formData.set("requestId", requestId);

    const result = await addNewPlant(formData);
    setIsSubmitting(false);

    if (result?.success) {
      setOpen(false);
      onPlantAdded();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={open}>
          <Sprout className="text-green-800 hover:cursor-pointer" /> Add Plant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {/* Actions to be taken */}
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a Plant</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new plant to your inventory.
            </DialogDescription>
          </DialogHeader>

          {/* Name and Category */}
          <div className="grid grid-cols-2 place-items-center gap-y-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Peace Lily" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <ComboBox
                value={category}
                onChange={(value) => selectedCategory(value)}
              />
              <Input type="hidden" name="category" value={category} required />
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
                  defaultValue={0}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  id="stock"
                  defaultValue={1}
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
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
