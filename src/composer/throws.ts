const genericError =  new Response(null, {
    status: 500
  })
  
  const throwable = (f: (r:Request) => Response ) => (r:Request) => {
  
    try {
      return f(r)
    }catch(e){
  
      if( e instanceof Response ){
        return e
      }
  
      return genericError.clone()
    }
  }
  
  const asyncThrowable = (f: (r:Request) => Promise<Response> ) => async (r:Request) => {
  
    try {
      return await f(r)
    }catch(e){
  
      if( e instanceof Response ){
        return e
      }
  
      return genericError.clone()
    }
  }

  export {
    throwable , asyncThrowable
  }