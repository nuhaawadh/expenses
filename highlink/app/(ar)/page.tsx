import { redirect } from "next/navigation";

/** Arabic is the primary language. */
export default function Root() {
  redirect("/ar");
}
