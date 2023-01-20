export default (_: Request) =>
  ((re) => re)(new Response("Not found", { status: 404 }));
