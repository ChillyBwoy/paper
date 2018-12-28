export interface BrushData {
  strokeStyle: string;
  lineWidth: number;
}

export interface GUISettings {
  brush: BrushData & Encodable;
}

export interface PaperSettings {
  flushInterval: number;
}

export type Point = [number, number, boolean];

export interface Encodable {
  encode(): ArrayBuffer;
}

export interface JSONable<T> {
  toJSON(): T;
}
