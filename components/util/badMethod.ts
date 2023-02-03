export default (_: Request) =>
  ((re) => re)(new Response("Method Not Allowed", { status: 405 }));
