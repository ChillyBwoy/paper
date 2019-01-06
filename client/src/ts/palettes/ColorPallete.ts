import { ColorRGB, GUI, Palette } from "../types";

interface ColorPaletteData {
  size: number;
  color: ColorRGB;
  opacity: number;
}

export class ColorPalette implements Palette<ColorPaletteData> {
  public name = "color";

  public size: number;
  public color: ColorRGB;
  public opacity: number;

  constructor({
    size = 14,
    color = [255, 30, 30],
    opacity = 0.5,
  }: Partial<ColorPaletteData>) {
    this.size = size;
    this.color = color;
    this.opacity = opacity;
  }

  public connectTo(folder: GUI) {
    folder.add(this, "size", 1, 21);
    folder.add(this, "opacity", 0, 1);
    folder.addColor(this, "color");

    folder.open();
  }

  public serialize() {
    return {
      data: {
        color: this.color,
        opacity: this.opacity,
        size: this.size,
      },
      name: this.name,
    };
  }
}
