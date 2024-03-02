import prisma from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import getUser from "@/lib/auth/get-user";

// export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  console.log("createSubscriptionStripeCheckoutSession");

  const { tdeeTarget, iWantTo } = await req.json();

  console.log("createSubscriptionStripeCheckoutSession tdeeTarget", tdeeTarget);

  const user = await getUser();

  // update database with the i want to value

  await prisma.user.update({
    where: {
      id: user?.user_id,
    },
    data: {
      weightLossGoal: iWantTo,
    },
  });

  // create stripe session

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",

    line_items: [
      {
        price: "price_1OiF5MEwKA5VcQIf9hlULfGY",
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],

    metadata: {
      userId: user?.user_id as string,
      tdeeTarget,
      iWantTo,
    },
    subscription_data: {
      metadata: {
        userId: user?.user_id as string,
        tdeeTarget,
        iWantTo,
      },
    },

    mode: "subscription",
    success_url: `http://localhost:3000/api/payment/subscriptionSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/protected/purchase`,
  });



  return NextResponse.json({ sessionUrl: session.url });
}
