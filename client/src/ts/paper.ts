import {
  Canvas,
  DrawingTool,
  Frame,
  Point,
  UserInterfaceController,
} from "./types";

export class Paper implements Canvas {
  private allowDraw = false;
  private points: Point[] = [];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private gui: UserInterfaceController,
    private send: (frame: Frame) => void,
  ) {
    const { canvas } = ctx;
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("mouseleave", this.handleMouseLeave);
    canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  private get drawingTool(): DrawingTool {
    return this.gui.dt;
  }

  public clear() {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  private begin(point: Point, tool: DrawingTool) {
    tool.begin(this.ctx, point);
    this.allowDraw = true;
    this.points.push(point);
  }

  private end(point: Point, tool: DrawingTool) {
    this.allowDraw = false;
    tool.end(this.ctx, point);

    if (this.points.length > 0) {
      this.send({
        drawingTool: this.drawingTool.name,
        palettes: this.gui.palettes.map((p) => p.serialize()),
        points: this.points,
      });
      this.points.length = 0;
    }
  }

  private draw(point: Point, tool: DrawingTool) {
    tool.draw(this.ctx, point);
    this.points.push(point);
  }

  private getPoint = (event: MouseEvent): Point => {
    const { top } = this.ctx.canvas.getBoundingClientRect();

    const offsetTop = top + window.scrollY;
    const x = event.pageX;
    const y = event.pageY - offsetTop;

    return [x, y];
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.begin(this.getPoint(event), this.drawingTool);
  }

  private handleMouseUp = (event: MouseEvent) => {
    this.end(this.getPoint(event), this.drawingTool);
  }

  private handleMouseLeave = (event: MouseEvent) => {
    this.end(this.getPoint(event), this.drawingTool);
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.allowDraw) {
      return;
    }
    const { dt } = this.gui;
    this.draw(this.getPoint(event), dt);
  }
}
