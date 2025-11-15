export type PlantType = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;

  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  imageUrl?: string | null;
};

