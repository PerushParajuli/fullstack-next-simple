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

    revalidatePath("/plants"); // This will cache the plants in cache. So will not need to fetch again and again
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

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string | null;
  const requestId = formData.get("requestId") as string;

  if (!requestId) throw new Error("Request Id is not set");

  // Server-side safety check
  if (!category) {
    throw new Error("Category is required");
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Name is required");
  }

  if (!price) {
    throw new Error("Price is required");
  }

  if (!stock) {
    throw new Error("Stock is required");
  }

  try {
    // Database Write (ONLY proceeds if user exists and there is no duplicated data)
    const existing = await prisma.plant.findUnique({
      where: {
        userId_name_category: {
          userId,
          name,
          category,
        },
      },
    });

    if (existing) {
      throw new Error(
        "A plant with this name and category already exists for this user"
      );
    }

    const plant = await prisma.plant.create({
      data: {
        name,
        category,
        price,
        stock,
        description,
        userId,
        requestId,
      },
    });

    revalidatePath("/plants");
    return { success: true };
  } catch (error: any) {
    return { success: false };
  }
}

export async function updatePlant(formData: FormData) {
  const userId = await getUserId();

  // Initial Authentication Check
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string | null;

  if (!id) throw new Error("Plant Id is required");

  // Server-side safety check
  if (!category) {
    throw new Error("Category is required");
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Name is required");
  }

  if (!price) {
    throw new Error("Price is required");
  }

  if (!stock) {
    throw new Error("Stock is required");
  }

  try {
    const plant = await prisma.plant.update({
      where: { id },
      data: {
        name,
        category,
        price,
        stock,
        description,
        userId,
      },
    });

    revalidatePath("/plants");
    return { success: true };
  } catch (error: any) {
    return { success: false };
  }
}

export async function deletePlant(id: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (id) {
      whereClause.id = id;
    }

    await prisma.plant.delete({
      where: whereClause,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete plant:", error);
    return { success: false, error: "Unable to delete plant" };
  }
}
