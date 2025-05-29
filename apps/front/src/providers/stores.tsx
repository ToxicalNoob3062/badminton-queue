import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { createResource } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import type { JSX } from "solid-js";
import { getPlayers , getComplaints} from "../server/server";

const formInput = {
  name: "",
  secret: "",
};

// will store the form input in local storage
const input = makePersisted(createStore(formInput), {
  name: "app-store",
});

// get the players from the server
const [players] = createResource(getPlayers);
const [complaints] = createResource(getComplaints);

const storeValue = {
  input,
  players,
  complaints,
}

const StoreContext = createContext<typeof storeValue | undefined>(undefined);

export const useStoreContext = (): typeof storeValue => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStoreContext must be used within a StoreProvider");
  return context;
};

export default function StoreProvider(props: { children: JSX.Element }) {
  return <StoreContext.Provider value={storeValue}>{props.children}</StoreContext.Provider>;
}
