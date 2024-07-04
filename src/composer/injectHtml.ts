export default ((appendString: string) =>
async (aResponse: Response | Promise<Response>) =>
  (
    (response) =>
      (response.headers.get("Content-Type") || "").includes("text/html")
        ? (async (clonedResponse) =>
          new Response(
            (await clonedResponse.text()) + appendString,
            {
              status: clonedResponse.status,
              statusText: clonedResponse.statusText,
              headers: new Headers(clonedResponse.headers),
            },
          ))(
            response.clone(),
          )
        : response
  )(
    await aResponse,
  ));
