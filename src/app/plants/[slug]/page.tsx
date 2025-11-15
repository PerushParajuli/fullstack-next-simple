import { getPlantById } from "@/actions/plant.action";
import PlantCard from "@/components/PlantCard";
import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";

// params = { slug: "12345--snake-plant" }
// “This function receives an object that has a property named params. { params }
// Tells TypeScript that params must be an object with a slug property (a string).  : { params: { slug: string } }

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();

  // Extract plant ID from slug
  const parts = params.slug.split("--");
  const id = parts[0];

  if (!user) {
    return <SignIn />;
  }

  // Fetch plant details
  const plant = await getPlantById(id);

  if (!plant) {
    return <div className="p-10 text-center">Plant not found 🌱</div>;
  }

  return (
    <div>
      <PlantCard plant={plant} />
    </div>
  );
}

export async function generateMetaData({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  return {
    title: plant ? plant.name : "Plant name",
    description: plant ? plant.description : "Plant description",
  };
}
