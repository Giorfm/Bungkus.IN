"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PickupPage({ params }: { params: { orderId: string } }) {
  const router = useRouter();

  // Merged UX: pickup status is shown within the payment page
  useEffect(() => {
    router.replace(`/payment/${params.orderId}`);
  }, [params.orderId, router]);

  return null;
}
