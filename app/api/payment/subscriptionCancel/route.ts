import prisma from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import getUser from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  console.log("subscriptionCancel");

  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const subscription = await prisma.user.findUnique({
    select: {
      stripeSubscriptionId: true,
    },
    where: {
      id: user.user_id,
    },
  });

  console.log("sessionId findUnique GET:", subscription);

  if (subscription) {
    const cancelObject = await stripe.subscriptions.cancel(
      subscription.stripeSubscriptionId as string
    );

    console.log("cancelObject", cancelObject);
    if (cancelObject) {
      await prisma.user.update({
        where: {
          id: user?.user_id,
        },
        data: {
          customerPlan: "FREE",
        },
      });
      return NextResponse.json({ cancelled: true });
    }
    console.log("checkoutSession subscription cancelled", cancelObject);
  }

  return NextResponse.json({ cancelled: false });
}
