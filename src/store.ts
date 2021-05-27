import { observable } from "mobx";
import { createContext } from "react";

class Store {
  @observable title = "Freeports";
}

export default createContext(new Store());
