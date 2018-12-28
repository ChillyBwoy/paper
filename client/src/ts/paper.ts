import { Frame } from "./frame";
import { GUISettings, PaperSettings } from "./types";

export class Paper {
  private ctx: CanvasRenderingContext2D;
  private frames: Frame[] = [];
  private currentFrame: Frame | null = null;

  constructor(
    $el: HTMLElement,
    private settings: PaperSettings,
    private gui: GUISettings,
  ) {
    const { width, height } = $el.getBoundingClientRect();

    const $canvas: HTMLCanvasElement = document.createElement("canvas");
    $canvas.setAttribute("width", `${width}`);
    $canvas.setAttribute("height", `${height}`);
    $canvas.addEventListener("mousedown", this.handleMouseDown);
    $canvas.addEventListener("mouseup", this.handleMouseUp);
    $canvas.addEventListener("mouseleave", this.handleMouseLeave);
    $canvas.addEventListener("mousemove", this.handleMouseMove);

    $el.appendChild($canvas);

    const ctx = $canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get context 2d");
    }
    this.ctx = ctx;
  }

  public clear() {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  private replaceFrame() {
    return Frame.createWithBrush(this.gui.brush);
  }

  private begin() {
    this.currentFrame = this.replaceFrame();
  }

  private end() {
    if (!this.currentFrame) {
      return;
    }

    if (this.currentFrame.points.length === 0) {
      this.currentFrame = null;
      return;
    }

    console.log(this.currentFrame.encode());

    this.frames.push(this.currentFrame);
    this.currentFrame = null;
  }

  private getCoords = (event: MouseEvent): [number, number] => {
    const { top, left } = this.ctx.canvas.getBoundingClientRect();
    const x = event.pageX - left;
    const y = event.pageY - top;

    return [x, y];
  }

  private handleMouseLeave = () => {
    this.end();
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.begin();

    const [x, y] = this.getCoords(event);
    this.pushFrame(x, y, false);
    this.draw();
  }

  private handleMouseUp = (event: MouseEvent) => {
    this.end();
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.currentFrame) {
      return;
    }
    const [x, y] = this.getCoords(event);
    this.pushFrame(x, y, true);
    this.draw();
  }

  private drawFrame(frame: Frame) {
    const { points, brush } = frame;
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = brush.lineWidth;

    for (const [i, [x, y, drag]] of points.entries()) {
      this.ctx.beginPath();
      if (drag && i > 0) {
        const [x1, y1] = points[i - 1];
        this.ctx.moveTo(x1, y1);
      } else {
        this.ctx.moveTo(x, y);
      }
      this.ctx.lineTo(x, y);
      this.ctx.closePath();
      this.ctx.strokeStyle = brush.strokeStyle;
      this.ctx.stroke();
    }
  }

  private draw() {
    if (!this.currentFrame) {
      return;
    }
    this.drawFrame(this.currentFrame);
  }

  private redraw() {
    const frames = [...this.frames];
    if (this.currentFrame) {
      frames.push(this.currentFrame);
    }

    frames.forEach((f) => this.drawFrame(f));
  }

  private pushFrame(x: number, y: number, drag: boolean) {
    if (!this.currentFrame) {
      return;
    }
    this.currentFrame.add(x, y, drag);
  }
}
