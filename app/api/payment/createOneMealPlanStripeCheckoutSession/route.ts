import prisma from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import getUser from "@/lib/auth/get-user";

// export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  console.log("createOneMealPlanStripeCheckoutSession");

  const { tdeeTarget, iWantTo } = await req.json();

  console.log("createOneMealPlanStripeCheckoutSession tdeeTarget", tdeeTarget);

  const user = await getUser();

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",

    line_items: [
      {
        price: "price_1OiF05EwKA5VcQIfWErBi94y",
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],

    metadata: {
      userId: user?.user_id as string,
      tdeeTarget,
      iWantTo,
    },

    mode: "payment",
    success_url: `http://localhost:3000/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000?canceled=true`,
  });

  console.log("createOneMealPlanStripeCheckoutSession session id", session.url);

  return NextResponse.json({ sessionUrl: session.url });
}
