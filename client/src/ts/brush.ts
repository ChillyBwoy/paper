import { BrushData, Encodable } from "./types";
import { abconcat, str2ab } from "./utils";

export class Brush implements Brush, Encodable {
  public lineWidth = 3;
  public strokeStyle = "#333333";

  public encode() {
    const strokeStyle = str2ab(this.strokeStyle);
    const lineWidth = Uint16Array.from([this.lineWidth]).buffer;

    const buff = abconcat(strokeStyle, lineWidth);

    return buff;
  }
}
