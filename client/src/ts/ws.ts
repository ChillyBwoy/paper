type FrameSender = () => void;

export class Ws {
  private ws: WebSocket;

  constructor(addr: string, private onMessage: FrameSender) {
    this.ws = new WebSocket(`ws://${addr}`);
    // this.ws.binaryType = "arraybuffer";

    this.ws.addEventListener("open", this.handleOpen);
    this.ws.addEventListener("message", this.handleMessage);
    this.ws.addEventListener("close", this.handleClose);
    this.ws.addEventListener("errir", this.handleError);
  }

  public send(payload: any) {
    this.ws.send(payload);
  }

  private handleError = (event: Event) => {
    console.error("Error:\n", event);
  }

  private handleOpen = (event: Event) => {
    console.log("Connection opened\n");
  }

  private handleMessage = (event: MessageEvent) => {
    // const array = Array.from(new Uint32Array(event.data));
    // const coords: FrameList = [];

    // for (let i = 0; i < array.length; i += 2) {
    //   const chunk = array.slice(i, i + 2) as [number, number];
    //   coords.push(chunk);
    // }

    console.log("Data recieved:\n", event.data);
    // this.onMessage(coords);
  }

  private handleClose = (event: CloseEvent) => {
    console.log("Connection closed");
  }
}
