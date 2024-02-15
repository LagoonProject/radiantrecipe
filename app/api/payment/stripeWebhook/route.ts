import { NextRequest, NextResponse } from "next/server";

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

    // console.log("event", JSON.stringify(event));

    console.log("event.type", JSON.stringify(event.type));

    if (event.type === "checkout.session.completed") {
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items"],
        }
      );

      console.log("checkoutSession", checkoutSession);

      const lineItems = checkoutSession.line_items;

      if (!lineItems)
        return NextResponse.json(
          {
            message: "Internal server error",
          },
          {
            status: 500,
          }
        );

      try {
        // Save the data, change customer account info, etc
  
        console.log("lineItems", lineItems);
        console.log("event.data.object.metadata ", event.data.object.metadata as any);
      } catch (error) {
        console.log("Handling when you're unable to save an order");
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
