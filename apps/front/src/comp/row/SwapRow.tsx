import Row from "./Row";
import { onMount, onCleanup } from "solid-js"
import { makeRowSwappy, removeSwappiness } from "./swap-utils";
import { decideSwapRowColor } from "./utils";
import { useModalContext } from "../../providers/modal";
import { useStoreContext } from "../../providers/stores";
import { leave, complain } from "../../server/server";
import ErrorModal from "../modals/Error";
import { format } from "date-fns";
import { gsap } from "gsap/gsap-core";

export default function SwapRow(props: { id: string, name: string, time: string }) {

  let showLayer: HTMLDivElement | undefined;
  let removeLayer: HTMLDivElement | undefined;
  let complainLayer: HTMLDivElement | undefined;
  let swapStartHandler: (event: TouchEvent) => void;

  let [, setModalContent] = useModalContext();

  let {
    inputState: [input],
    playersResource: [, { mutate: mutatePlayers }],
    complaintsResource: [, { mutate: mutateComplaints }],
  } = useStoreContext();

  function onRemove() {
    leave(props.id, input.secret)
      .then(() => {
        mutatePlayers((prev) => 
          prev && 
          prev.filter(player => player.id !== props.id)
              .map((player, idx) => player.id>props.id ?({ ...player, id: `${idx+1}` }) : player)
        );
      })
      .catch((error) => {
        error = error as Error;
        if (showLayer) gsap.to(showLayer, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        setModalContent(() => ErrorModal.bind(null, error));
      });
  }

  function onComplain() {
    let message = `${props.name.trim()}@${format(new Date(), 'dd|MM|yy')}`;
    complain(message)
      .then((data) => {
        mutateComplaints((prev) => prev && [...prev, message]);
        let dataAsError = data as Error;
        setModalContent(() => ErrorModal.bind(null, dataAsError));
      })
      .catch((error) => {
        error = error as Error;
        setModalContent(() => ErrorModal.bind(null, error));
      });
  }


  onMount(() => {
    if (showLayer && removeLayer && complainLayer)
      swapStartHandler = makeRowSwappy({
        show: showLayer,
        remove: removeLayer,
        complain: complainLayer,
        onRemove,
        onComplain
      });
  });

  onCleanup(() => {
    if (showLayer) removeSwappiness(showLayer, swapStartHandler);
  });

  return (
    <div class="theme-container relative w-full h-11 overflow-hidden">
      <div ref={showLayer} class={`theme-show ${decideSwapRowColor(props.id)} absolute inset-0 z-5`}>
        <Row {...props} />
      </div>
      <div ref={removeLayer} class="theme-remove absolute inset-0 z-2  bg-gray-900 text-white text-lg flex items-center justify-center">
        Remove
      </div>
      <div ref={complainLayer} class="theme-complain absolute inset-0 z-2  bg-gray-800 text-white text-lg flex items-center justify-center">
        Complain
      </div>
    </div>
  );
}
