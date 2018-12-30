import { EMPTY_POINT } from "../constants";
import { ColorPalette } from "../palettes/ColorPallete";
import { DrawingTool, MaybePoint, Point } from "../types";
import { rgb2str } from "../utils";

export class Brush extends DrawingTool {
  public name = "brush";
  private lastPoint: MaybePoint = EMPTY_POINT;

  public begin(ctx: CanvasRenderingContext2D, point: Point) {
    if (!this.gui) {
      throw new Error(`GUI not found in "${this.name}"`);
    }

    const palette = this.gui.getPalette("color") as ColorPalette;
    if (!palette) {
      throw new Error(`Palette "color" not found in "${this.name}"`);
    }

    const { size, opacity, color } = palette;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = size;
    ctx.strokeStyle = rgb2str(color, opacity);
    ctx.globalAlpha = 1;
  }

  public end(ctx: CanvasRenderingContext2D, point: Point) {
    this.lastPoint = EMPTY_POINT;
    return;
  }

  public draw(ctx: CanvasRenderingContext2D, point: Point) {
    const [x1, y1] = this.lastPoint;
    const [x2, y2] = point;

    ctx.beginPath();
    if (x1 !== null && y1 !== null) {
      ctx.moveTo(x1, y1);
    }
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();

    this.lastPoint = point;
  }
}
