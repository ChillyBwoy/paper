export interface BrushData {
  strokeStyle: string;
  lineWidth: number;
}

export interface GUISettings {
  brush: BrushData & Encodable;
}

export interface PaperSettings {
  flushInterval: number;
}

export type Point = [number, number, boolean];

export interface Encodable {
  encode(): ArrayBuffer;
}

export interface JSONable<T> {
  toJSON(): T;
}

export interface FrameData {
  author: string;
  createdAt: string;
  brush: BrushData & Encodable;
  points: Point[];
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
