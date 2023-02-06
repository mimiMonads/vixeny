export default (
    meta => (
      escapes => (s:string) => escapes.test(s)
        ?  s.replace(escapes,  (a) =>
            a in meta
              ? meta[a]
              : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
      ) 
        :  s 
  
    )(
   
      /[\\"\\u0000-\\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
    )
  )(
    {   
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      "\"": "\\\"",
      "\\": "\\\\"
    } as Record<string,string>
  )
  
  