import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";
import Stripe from "stripe";
import getRawBody from "raw-body";

const endpointSecret =
  (process.env.WEBHOOK_SECRET as string) ||
  ("whsec_bb4671b64713744f06dcc502029f02d04fa303c4ecf3c3153ed621a42894b1de" as string);

// Make sure to add this, otherwise you will get a stream.not.readable error
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: NextResponse) {
  //  ce webhook sert uniquement pour mettre à jour la DB avec les informations de la souscription (à savoir est-ce que la souscription etst en cours ou si elle a été résiliée).

  try {
    if (req.method !== "POST")
      return NextResponse.json(
        {
          message: "Request must be a POST request.",
        },
        {
          status: 405,
        }
      );

    const signature = req.headers.get("stripe-signature") || "";

    let event: Stripe.Event | undefined;

    try {
      event = stripe.webhooks.constructEvent(
        await req.text(),
        signature,
        endpointSecret
      );
    } catch (err: any) {
      return NextResponse.json(
        {
          message: "Error Stripe Webhook",
        },
        {
          status: 400,
        }
      );
    }

    console.log("event.type", event.type);

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;

      console.log(
        "--WH subscription.metadata.userId ",
        subscription.metadata.userId
      );
      console.log("--WH subscription.cancel_at ", subscription.cancel_at);
      console.log("--WH event.data.object", event.data.object);

      // Save an order in your database, marked as 'awaiting payment'
      if (subscription.metadata.userId && subscription.cancel_at) {
        await prisma.user.update({
          where: {
            id: subscription.metadata.userId,
          },
          data: {
            customerPlan: "FREE",
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error Stripe Webhook",
      },
      {
        status: 400,
      }
    );
  }
}
