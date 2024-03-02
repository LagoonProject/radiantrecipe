export async function createSubscriptionStripeSession(
  window: Window,
  tdeeTarget?: string,
  iWantTo?: string
) {
  const res = await fetch(
    "/api/payment/createSubscriptionStripeCheckoutSession",
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: iWantTo ? JSON.stringify({ tdeeTarget, iWantTo }) : undefined, // body data type must match "Content-Type" header
    }
  );

  const { sessionUrl } = await res.json();

  window.location.assign(sessionUrl);
}
