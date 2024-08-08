import SingleServicePage from "@/components/screens/singleService/SingleServicePage";
import { useRouter } from "next/router";

export default function service() {
  const router = useRouter();
  const { service } = router.query;

  return <SingleServicePage />;
}
