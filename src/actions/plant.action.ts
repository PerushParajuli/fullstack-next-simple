"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/actions/user.action";
import { revalidatePath } from "next/cache";

// Returns all the plants related to the user that matches searchTerm
export async function getPlants(searchTerm?: String) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plant.findMany({
      where: whereClause,
    });

    revalidatePath("/"); // This will cache the plants in cache. So will not need to fetch again and again
    return { success: true, userPlants };
  } catch (error) {
    console.log(`Error in getting Plants: ${error}`);
    throw new Error("Failed to fetch Plants");
  }
}

// Returns the plant data as per the Id

export async function getPlantById(id: string) {
  return await prisma.plant.findUnique({
    where: { id },
  });
}

export async function addNewPlant(formData: FormData) {
  const userId = await getUserId();

  // Initial Authentication Check
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Verifies that the ID, even if returned by the session actually exists in database.
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!existingUser) {
    // This handles the integrity risk created by using 'references: []'
    throw new Error("Referenced User does not exist. Cannot create plant.");
  }

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;

  // Server-side safety check
  if (!category) {
    throw new Error("Category is required");
  }

  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  const description = formData.get("description") as string | null;

  console.log("Attempting to create Plant with userId:", userId); // <-- ADD THIS LINE

  // Database Write (ONLY proceeds if user exists)
  const plant = await prisma.plant.create({
    data: {
      name,
      category,
      price,
      stock,
      description,
      userId,
    },
  });

  revalidatePath("/");
}
