import { getUserDetails } from "@/actions/user.action";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

export default async function Page() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <>
      {user ? (
        <div>
          <InventoryTable />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <SignUp fullPage={true} />
        </div>
      )}
    </>
  );
}
