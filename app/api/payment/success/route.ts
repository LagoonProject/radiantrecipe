import prisma from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import getUser from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getUser();

  console.log("user", user);

  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    redirect("/error");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  const customerId = checkoutSession.customer as string;

  console.log("checkoutSession success", checkoutSession);

  console.log("success customerId", customerId);


  await prisma.user.update({
    where: {
      id: user?.user_id,
    },
    data: {
      stripeCustomerId: customerId,
    },
  });

    redirect(`/protected/myMealPlans/${checkoutSession.metadata?.tdee}`);
}
