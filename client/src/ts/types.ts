import * as dat from "dat.gui";

export type ColorRGB = [number, number, number];

export type Point = [number, number];
export type EmptyPoint = [null, null];
export type MaybePoint = Point | EmptyPoint;

export type GUI = dat.GUI;
export type GUIController = dat.GUIController;

export interface Canvas {}

export interface Frame {
  points: Point[];
  palettes: PaletteData[];
  drawingTool: string;
}

export interface DrawingTool {
  readonly name: string;
  readonly palettes: Palette[];

  begin(ctx: CanvasRenderingContext2D, p: Point): void;
  end(ctx: CanvasRenderingContext2D, p: Point): Frame;
  draw(ctx: CanvasRenderingContext2D, p2: Point): void;
}

export interface PaletteData<T = object> {
  name: string;
  data: T;
}

export interface Palette<T = object> {
  name: string;
  connectTo(gui: GUI): void;
  serialize(): PaletteData<T>;
}

export interface UserInterfaceController {
  readonly palettes: Palette[];
  readonly drawingTools: DrawingTool[];
  dt: DrawingTool;
}
