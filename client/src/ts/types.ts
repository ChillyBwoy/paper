import * as dat from "dat.gui";

export type ColorRGB = [number, number, number];

export type Point = [number, number];
export type EmptyPoint = [null, null];
export type MaybePoint = Point | EmptyPoint;

export interface Canvas {}

export interface UserInterfaceController {
  drawingTool: DrawingTool | null;

  getPalette(name: string): Palette;
  addPalette(palette: Palette): void;
  addDrawingTool(tool: DrawingTool): void;
}

export type GUI = dat.GUI;
export type GUIController = dat.GUIController;

export abstract class DrawingTool {
  public abstract name: string;
  protected gui: UserInterfaceController | null = null;

  public abstract begin(ctx: CanvasRenderingContext2D, p: Point): void;
  public abstract end(ctx: CanvasRenderingContext2D, p: Point): void;
  public abstract draw(ctx: CanvasRenderingContext2D, p2: Point): void;

  public connectTo(gui: UserInterfaceController) {
    this.gui = gui;
  }
}

export interface Palette {
  name: string;
  connectTo(gui: GUI): void;
}

/*
{
  "app": {
    "users": [
      {
        "uuid": "00000000-0000-0000-0000-000000000000",
        "name": "Vasya",
        "frames": [
          {
            "brush": {
              "strokeStyle": "#333333",
              "lineWidth": 3
            },
            "createdAt": "2018-12-28T20:54:26",
            "points": [
              [0, 0, true],
              [10, 10, false],
              [20, 10, false],
              [25, 15, false],
              [40, 40, false]
            ]
          }
        ]
      }
    ]
  }
}
*/
