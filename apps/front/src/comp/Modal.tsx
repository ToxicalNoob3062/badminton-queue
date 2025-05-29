import { Portal, Show } from "solid-js/web";
import { useModalContext } from "../providers/modal";

export default function ModalUI() {
  const [modalContent,setModalContent] = useModalContext();
  return (
    <Portal mount={document.getElementById("app-root") as Node}>
      <Show when={modalContent()}>
        <div class="fixed z-50 top-0 left-0 w-screen h-screen p-4 flex items-center justify-center bg-emerald-600/90">
          <div class="bg-white shadow-md rounded-lg p-4 relative">
            {modalContent()}
            <button onClick={()=>setModalContent(null)} class="absolute right-2 top-2 rounded-full w-7 h-7">
              <img src="close.png" alt="close button" />
            </button>
          </div>
        </div>
      </Show>
    </Portal>
  );
}
