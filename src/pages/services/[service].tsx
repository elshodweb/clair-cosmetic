import SingleServicePage from "@/components/screens/service/SingleServicePage";
import { useRouter } from "next/router";

export default function service() {
  const router = useRouter();
  const { service } = router.query;
  console.log(service);

  return <SingleServicePage />;
}
