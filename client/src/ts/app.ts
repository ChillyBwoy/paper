import { UserInterfaceController } from "./types";

type AppendType = (
  ctx: CanvasRenderingContext2D,
  gui: UserInterfaceController,
) => void;

export default class App {
  constructor(private $el: HTMLElement, private gui: UserInterfaceController) {}

  public append(callback: AppendType) {
    const { width, height } = this.$el.getBoundingClientRect();

    const $canvas: HTMLCanvasElement = document.createElement("canvas");
    $canvas.setAttribute("width", `${width}`);
    $canvas.setAttribute("height", `${height}`);

    this.$el.appendChild($canvas);

    const ctx = $canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get context 2d");
    }

    callback(ctx, this.gui);

    return;
  }
}
