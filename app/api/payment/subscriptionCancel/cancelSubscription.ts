import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function cancelSubscription(router: AppRouterInstance) {
  const res = await fetch("/api/payment/subscriptionCancel");
  console.log("res cancelSubscription", res);
  const subscription = await res.json();
  console.log("subscription cancelSubscription", subscription);

  if (subscription.cancelled) router.refresh();
}
