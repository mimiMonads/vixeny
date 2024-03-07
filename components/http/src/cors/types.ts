type RequestMethod =
'ACL' | 'BIND' | 'CHECKOUT' | 'CONNECT' | 'COPY' | 'DELETE' | 'GET' | 'HEAD' | 'LINK' | 'LOCK' | 'M-SEARCH'
| 'MERGE' | 'MKACTIVITY' | 'MKCALENDAR' | 'MKCOL' | 'MOVE' | 'NOTIFY' | 'OPTIONS' | 'PATCH' | 'POST' | 'PRI'
| 'PROPFIND' | 'PROPPATCH' | 'PURGE' | 'PUT' | 'REBIND' | 'REPORT' | 'SEARCH' | 'SOURCE' | 'SUBSCRIBE'
| 'TRACE' | 'UNBIND' | 'UNLINK' | 'UNLOCK' | 'UNSUBSCRIBE';


export interface Options {
    allowOrigins?: string | string[];
    allowMethods?: string | RequestMethod | RequestMethod[];
    exposeHeaders?: string | string[];
    maxAge?: number;
    allowCredentials?: boolean;
    allowHeaders?: string | string[];
    appendHeaders?: boolean;
}

type HeadersName = 'Access-Control-Max-Age' | 'Access-Control-Allow-Credentials' | 'Access-Control-Allow-Headers'
    | 'Access-Control-Expose-Headers' | 'Access-Control-Allow-Methods' | 'Vary' | 'Access-Control-Allow-Origin';