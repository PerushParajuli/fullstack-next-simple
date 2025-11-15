import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlantType } from "@/lib/types";

interface plantCardProps {
  plant: PlantType;
}

export default function PlantCard({ plant }: plantCardProps) {
  return (
    <Card className="flex flex-col md:p-4 md:flex-row bg-inherit text-inherit rounded-none overflow-hidden max-w-5xl mx-auto">
      {/* Image Section */}
      <div className="md:w-1/2">
        <Image
          src="/plant.jpg"
          alt="Snake Plant"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center p-6 md:w-1/2 space-y-4">
        {/* Title */}
        <h2 className="text-3xl font-extrabold tracking-tight capitalize">
          snake plant
        </h2>

        {/* Price */}
        <p className="text-xl font-semibold text-primary">$4</p>

        {/* Tag */}
        <Badge
          variant="outline"
          className="rounded-sm border text-xs tracking-wide uppercase"
        >
          Indoor
        </Badge>

        {/* Stock */}
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Stock:</span> 14
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
          This is a snake plant description — perfect for brightening indoor
          spaces and purifying air.
        </p>
      </div>
    </Card>
  );
}
