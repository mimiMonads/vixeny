export default ((r) => () => r.clone())(
  new Response("Not found", { status: 404 }),
);
