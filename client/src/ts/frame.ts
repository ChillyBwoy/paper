import {
  BrushSettings,
  Decodable,
  Encodable,
  FrameData,
  Point,
  Serializable,
} from "./types";

export class Frame
  implements Serializable<FrameData>, Encodable<void>, Decodable<void> {
  private _points: Point[] = [];
  private _brush: BrushSettings;
  private _createdAt: Date;

  constructor(data: FrameData) {
    this._points = [...data.points];
    this._brush = { ...data.brush };
    this._createdAt = data.createdAt
      ? new Date(Date.parse(data.createdAt))
      : new Date();
  }

  get brush() {
    return { ...this._brush };
  }

  get points() {
    return [...this._points];
  }

  public add(x: number, y: number, drag: boolean) {
    this._points.push([x, y, drag]);
    return this;
  }

  public serialize() {
    return {
      brush: this.brush,
      createdAt: this._createdAt.toISOString(),
      points: this.points,
    };
  }

  public encode() {
    return;
  }

  public decode() {
    return;
  }
}
