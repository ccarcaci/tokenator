import stream from "stream"

export function tokenator(source: string, ...separators: string[]): string[]
export function tokenatorStream(...separators: string[]): stream.Transform
