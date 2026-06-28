import { redirect } from "next/navigation";

export default function AdminLicensesRedirect() {
  redirect("/admin/dashboard/licenses");
}
