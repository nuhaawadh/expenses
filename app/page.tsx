import { redirect } from "next/navigation";
import { Ledger } from "@/components/Ledger";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getSession();

  // الحارس على الخادم: الصفحة لا تُرسَل أصلاً بلا جلسة صالحة
  if (!session) redirect("/login");

  return <Ledger user={{ name: session.name, email: session.email }} />;
}
