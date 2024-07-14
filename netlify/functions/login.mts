import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {
    const data = await req.json();
    console.log(data);

    if (
      data.username == Netlify.env.get("LOGIN_USERNAME") &&
      data.password == Netlify.env.get("LOGIN_PASSWORD")
    ) {
      return Response.json({ success: true });
    }
    return Response.json({ error: "Wrong credentials" }, { status: 401 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed fetching data" }, { status: 500 });
  }
};
