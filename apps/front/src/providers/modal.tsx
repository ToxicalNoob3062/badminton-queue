import { createContext, createSignal, useContext } from "solid-js";
import type { Accessor, Setter } from "solid-js";
import type { JSX } from "solid-js";

// Allow null for closed modal
type ModalContextType = [
  Accessor<(() => JSX.Element) | null>,
  Setter<(() => JSX.Element) | null>
];

// No default value for strictness
const ModalContext = createContext<ModalContextType>();

// Custom hook for safety
export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("ModalContext must be used within ModalProvider!");
  return ctx;
}

export default function ModalProvider(props: { children: JSX.Element }) {
  const [modalContent, setModalContent] = createSignal<(() => JSX.Element) | null>(null);
  return (
    <ModalContext.Provider value={[modalContent, setModalContent]}>
      {props.children}
    </ModalContext.Provider>
  );
}
