import { DEFAULT_NAME, DEFAULT_UUID } from "./constants";

interface UserData {
  name?: string;
  uuid?: string;
}

export class User {
  public uuid: string;
  public name: string;

  constructor({ name = DEFAULT_NAME, uuid = DEFAULT_UUID }: UserData) {
    this.name = name;
    this.uuid = uuid;
  }
}
