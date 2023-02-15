export default async (message:string) => 
 Array.from(new Uint8Array( await crypto.subtle.digest('SHA-256', ( new TextEncoder().encode(message))))).map((b) => b.toString(16).padStart(2, '0')).join('')