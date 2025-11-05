import { getUserDetails } from "@/actions/user.action";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

export default async function Page() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);
  console.log(userProfile);
  return (
    <>
      {user ? (
        <h1>Inventory</h1>
      ) : (
        <div className="flex justify-center items-center">
          <SignUp fullPage={true}/>
        </div>
      )}
    </>
  );
}
