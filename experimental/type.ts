// A recursive type that attempts to represent all structured-clone-friendly values.
type StructuredCloneable =
  // Primitives
  | null
  | undefined
  | boolean
  | number
  | string
  // Objects and arrays of cloneable types
  | { [key: string]: StructuredCloneable }
  | StructuredCloneable[]
  // Maps and Sets of cloneable values
  | Map<StructuredCloneable, StructuredCloneable>
  | Set<StructuredCloneable>
  // Date and RegExp
  | Date
  | RegExp
  // Error objects (cloned with name/message only)
  | Error
  | EvalError
  | RangeError
  | ReferenceError
  | SyntaxError
  | TypeError
  | URIError
  // Binary / File types
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  // Potential big integer arrays if supported
  // | BigInt64Array | BigUint64Array (if your environment supports them)
  | Blob
  | File
  | FileList
  // Image-related
  | ImageData
  | ImageBitmap
  // OffscreenCanvas if supported by your environment
  | OffscreenCanvas; // Streams (if supported) - this is highly environment-dependent
// | ReadableStream<any> | WritableStream<any> | TransformStream<any>
// WebAssembly modules (if supported)
// | WebAssembly.Module | WebAssembly.Instance
