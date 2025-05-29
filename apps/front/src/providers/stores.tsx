import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";

type Player = {
  id: string;
  name: string;
  stamp: string;
};

//persisted storage
const storage = makePersisted(createStore({
  name: "",
  secret: "",
  players: [] as Player[],
  complaints: [] as string[]
}),{
  name: "app-store",
  serialize:(value)=> JSON.stringify(value),
  deserialize:(str)=> JSON.parse(str)
});



export const StoreContext = createContext();
