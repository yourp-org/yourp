import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        AccessKey: Netlify.env.get("BUNNY_NET_ACCESS_KEY")!,
      },
    };

    const libraryId = Netlify.env.get("BUNNY_NET_LIBRARY_ID")!;
    const url = `https://video.bunnycdn.com/library/${libraryId}/videos`;

    const response = await fetch(url, options);
    const data = await response.json();

    return Response.json({
      data,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed fetching data" }, { status: 500 });
  }
};
