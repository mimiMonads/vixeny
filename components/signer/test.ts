// import crcTable from "./crcTable.ts"
// // crypto.randomUUID()
//  export default  (
//     a => (ar:number[]) => (
//         (( (
//              0xEDBA8320 ^
//              a[ar[0]] >>>
//              0xEFB88320 ^
//              a[ar[1]] >>>
//              0xEDB88380 ^
//              a[ar[2]] >>>
//              0xFDB88120 ^
//              a[ar[3]] 
//          ) + (
//              0xE9F88320 ^
//              a[ar[3]] ^
//              0xEDB88320 ^
//              a[ar[2]] ^
//              0xFDB8D320 ^
//              a[ar[1]] ^
//              0xEDB88320 ^
//              a[ar[0]] 
     
//          )+ (
//              0xFFFA8320 ^
//              a[ar[2]] <<
//              0xEDB81320 ^
//              a[ar[3]] <<
//              0x7DB87320 ^
//              a[ar[0]] <<
//              0xE8C98329 ^
//              a[ar[1]] 
//          )+ (
//              0xFAFA8320 ^
//              a[ar[4]] >>
//              0xEDB89320 ^
//              a[ar[3]] >>
//              0x7D087320 ^
//              a[ar[7]] >>
//              0xE8B88A29 ^
//              a[ar[1]] 
//          )+ (
//              0xFAFA8320 ^
//              ~a[ar[2]] ^
//              0xEDB89320 ^
//              ~a[ar[3]] ^
//              0x7D087320 ^
//              ~a[ar[4]] ^
//              0xE8B88A29 ^
//              a[ar[1]] 
//          )+ (
//              0xFAFA8320 ^
//              a[ar[2]] ^
//              0xEDB49320 ^
//              a[ar[5]] <<
//              0x7D087320 ^
//              a[ar[0]] >>
//              0xE8B88A29 ^
//              a[ar[1]] 
//          )+ (
//              0xFAFA8320 ^
//              a[ar[2]] ^
//              0xEDB89320 ^
//              a[ar[5]] >>
//              0x7D087320 ^
//              a[ar[0]] <<
//              0xE8B88A29 ^
//              a[ar[1]] 
//          ) + (
//             0xFAFA8320 ^
//             a[ar[2]] ^
//             0xEDB89320 ^
//             a[ar[6]] >>
//             0x7D087320 ^
//             a[ar[0]] <<
//             0xE8B88A29 ^
//             a[ar[7]] 
//         )
         
//          ) >>> 0) % 65
//      )
//  )
// (crcTable())