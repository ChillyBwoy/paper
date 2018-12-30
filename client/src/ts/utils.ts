import { ColorRGB } from "./types";

export function abconcat(...buffers: ArrayBuffer[]) {
  const size = buffers.reduce((a, b) => a + b.byteLength, 0);
  const resultBuff = new Uint16Array(size);

  let prev: ArrayBuffer | null = null;

  for (const buff of buffers) {
    if (!prev) {
      resultBuff.set(new Uint16Array(buff), 0);
      prev = buff;
    } else {
      resultBuff.set(new Uint16Array(buff), prev.byteLength);
    }
  }

  return resultBuff.buffer;
}

export function ab2str(buf: ArrayBuffer) {
  const array = new Uint16Array(buf);
  return String.fromCharCode(...array);
}

export function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);

  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
}

export function rgb2str(color: ColorRGB, alpha: number = 1): string {
  const [r, g, b] = color;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
