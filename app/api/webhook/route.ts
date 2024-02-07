import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  const data = payload.data;

  if (eventType === "user.created") {
    const userData = {
      clerkId: data?.id,
      firstName: data?.first_name,
      lastName: data?.last_name,
      username: data?.username,
      profilePhoto: data?.image_url,
      emailAddresses: data?.email_addresses
    };
    console.log("User", userData);
  } else if (eventType === "user.updated") {
    const userData = {
        clerkId: data?.id,
        firstName: data?.first_name,
        lastName: data?.last_name,
        username: data?.username,
        profilePhoto: data?.image_url,
        emailAddresses: data?.email_addresses
    };
    console.log("User", userData);
  } else if (eventType === "user.deleted") {
    const clerkId = data?.id;
    console.log("User", clerkId);
  }

  console.log("Event", eventType);

  return new Response("", { status: 200 });
}
