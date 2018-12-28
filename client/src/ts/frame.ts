import { DEFAULT_AUTHOR } from "./constants";
import { BrushData, Encodable, Point } from "./types";
import { ab2str, str2ab } from "./utils";

interface FrameData {
  author: string;
  createdAt: string;
  brush: BrushData & Encodable;
  points: Point[];
}

export class Frame implements Encodable {
  get brush() {
    return this._brush;
  }

  get points() {
    return [...this._points];
  }

  public static createWithBrush(brush: BrushData & Encodable) {
    return new Frame({
      author: DEFAULT_AUTHOR,
      brush,
      createdAt: new Date().toISOString(),
      points: [],
    });
  }

  private _points: Point[] = [];
  private _brush: BrushData & Encodable;
  private _createdAt: Date;
  private _author = DEFAULT_AUTHOR;

  constructor(data: FrameData) {
    this._points = [...data.points];
    this._brush = data.brush;
    this._createdAt = new Date(Date.parse(data.createdAt));
  }

  public add(x: number, y: number, drag: boolean) {
    this._points.push([x, y, drag]);
    return this;
  }

  public encode() {
    // const author = str2ab(this._author);
    const brush = this._brush.encode();

    return brush;
  }
}
