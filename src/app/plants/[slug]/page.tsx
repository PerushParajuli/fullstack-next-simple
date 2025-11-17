import { getPlantById } from "@/actions/plant.action";
import PlantCard from "@/components/PlantCard";
import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";

// Next.js 15 sometimes wraps dynamic route params in a Promise.
// So instead of { params: { slug: string } }, we receive:
// { params: Promise<{ slug: string }> }

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  // Extract the params Promise
  const { params } = props;

  // Must await, otherwise params.slug will be undefined
  const unwrapped = await params;

  // Slug format: "12345--snake-plant"
  // First part is the plant ID
  const parts = unwrapped.slug.split("--");
  const id = parts[0];

  // Fetch logged-in user (Stack Auth)
  const user = await stackServerApp.getUser();

  // Redirect to SignIn if not authenticated
  if (!user) {
    return <SignIn />;
  }

  // Fetch full plant details from DB
  const plant = await getPlantById(id);

  // Handle missing plant gracefully
  if (!plant) {
    return <div className="p-10 text-center">Plant not found 🌱</div>;
  }

  return (
    <div>
      <PlantCard plant={plant} />
    </div>
  );
}

// generateMetadata also receives params as a *Promise*
// because it runs before the page and uses dynamic route info
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { params } = props;

  // Must unwrap the Promise before accessing slug
  const unwrapped = await params;

  const [id] = unwrapped.slug.split("--");

  // Fetch plant to dynamically set SEO metadata
  const plant = await getPlantById(id);

  return {
    title: plant?.name ?? "Plant name",
    description: plant?.description ?? "Plant description",
  };
}
