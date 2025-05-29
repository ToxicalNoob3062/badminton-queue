import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";
import type { JSX } from "solid-js";

type Player = {
  id: string;
  name: string;
  stamp: string;
};

const defaultState = {
  name: "",
  secret: "",
  players: [] as Player[],
  complaints: [] as string[],
};

const storage = makePersisted(createStore(defaultState), {
  name: "app-store",
  serialize: (value) =>
    JSON.stringify({
      name: value.name,
      secret: value.secret,
    }),
  deserialize: (str) =>
    !str
      ? defaultState
      : {
          ...defaultState,
          ...JSON.parse(str),
        },
});

type StoreTuple = typeof storage;


const StoreContext = createContext<StoreTuple | undefined>(undefined);

export const useStoreContext = (): StoreTuple => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStoreContext must be used within a StoreProvider");
  return context;
};

export default function StoreProvider(props: { children: JSX.Element }) {
  return <StoreContext.Provider value={storage}>{props.children}</StoreContext.Provider>;
}
