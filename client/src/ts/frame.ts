import { DrawingTool, Point } from "./types";

interface FrameData {
  drawingTool: string;
  points?: Point[];
  createdAt?: Date;
}

export class Frame {
  public drawingTool: string;
  public points: Point[];
  public createdAt: Date;

  constructor({ drawingTool, points = [], createdAt = new Date() }: FrameData) {
    this.drawingTool = drawingTool;
    this.points = points;
    this.createdAt = createdAt;
  }

  public add(x: number, y: number) {
    this.points.push([x, y]);
    return this;
  }
}
