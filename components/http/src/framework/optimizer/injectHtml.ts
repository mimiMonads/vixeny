

export default  ((appendString:string) => async (aResponse: Response | Promise<Response>) =>
    (
        response => (response.headers.get('Content-Type') || '').includes('text/html')
        ? ( async clonedResponse => 
         new Response(
           (await clonedResponse.text()) + appendString,
           {
            status: clonedResponse.status,
            statusText: clonedResponse.statusText,
            headers: new Headers(clonedResponse.headers),
          }
        ))(
         response.clone()
        )
        : response
    )(
        await aResponse
    )

)(`
<script>
  let lastCheck = Date.now();
  setInterval(() => {
    fetch('/timestamp-for-reload')
      .then(response => response.text())
      .then(data => {
        if (lastCheck < Number(data)) {
          window.location.reload();
        }
      });
  }, 100); // Check every second
</script>

`)