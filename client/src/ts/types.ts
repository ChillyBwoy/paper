export interface BrushSettings {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
}

export interface GUISettings {
  brush: BrushSettings;
}

export interface PaperSettings {
  flushInterval: number;
}

export type Point = [number, number, boolean];
export interface FrameData {
  brush: BrushSettings;
  points: Point[];
  createdAt?: string;
}
export type FrameSender = () => void;

export interface Encodable<T> {
  encode(): T;
}

export interface Decodable<T> {
  decode(input: ArrayBuffer): T;
}

export interface Serializable<T> {
  serialize(): T;
}
