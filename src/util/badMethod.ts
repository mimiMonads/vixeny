export default ((r) => () => r.clone())(
  new Response("Method Not Allowed", { status: 405 }),
);
