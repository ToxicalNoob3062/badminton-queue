import Row from "./Row";
import { onMount , onCleanup} from "solid-js"
import { makeRowSwappy, removeSwappiness } from "./swap-utils";
import { decideSwapRowColor } from "./utils";

export default function SwapRow(props: { id: string, name: string, time: string }) {

  let showLayer: HTMLDivElement | undefined;
  let removeLayer: HTMLDivElement | undefined;
  let complainLayer: HTMLDivElement | undefined;
  let swapStartHandler: (event:TouchEvent) => void;

  onMount(() => {
     if (showLayer && removeLayer && complainLayer)
       swapStartHandler = makeRowSwappy({
      show: showLayer,
      remove: removeLayer,
      complain: complainLayer
    });
  });

  onCleanup(() => {
    if (showLayer) removeSwappiness(showLayer,swapStartHandler);
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
