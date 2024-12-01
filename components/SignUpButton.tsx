import { createClient } from "@/utils/supabase/server";
import { Button } from "flowbite-react";

export default async function SignUpButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className=""></div>
  ) : (
    <Button href="/signup" className="flex rounded-md px-3 py-2 no-underline">
      Sign Up
    </Button>
  );
}
