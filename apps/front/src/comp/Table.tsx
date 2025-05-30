import SwapRow from "./row/SwapRow";
import { ErrorBoundary } from "solid-js";
import { Suspense } from "solid-js";
import { useStoreContext } from "../providers/stores";
import { For, createEffect } from "solid-js";
import Spinner from "./Spinner";

export default function Table() {
  const { playersResource: [players] } = useStoreContext();
  return (
    <section id="table" class='text-left flex flex-col gap-3'>
      <div id="table-header" class="text-md">
        <p class="tr bg-slate-200 flex justify-start px-4">
          <span class='th flex-2/12 py-2 inline-block'>#</span>
          <span class='th flex-6/12 py-2 inline-block'>Name</span>
          <span class='th flex-3/12 py-2 inline-block'>Stamp</span>
          <span class='th flex-1/12 py-2 inline-block'></span>
        </p>
      </div>
      <div id="table-body" class="text-gray-700 flex flex-col gap-3">
        <ErrorBoundary fallback={(err, reset) => {
          createEffect(() => players.state === "ready" && reset());
          return <p class="text-red-500 text-lg p-10 text-center">{err.message}</p>
        }}>
          <Suspense fallback={<Spinner />}>
            <For each={players()} fallback={<p class="text-gray-500 text-xl p-10 text-center">No players found!</p>}>
              {(player) => (
                <SwapRow id={player.id} name={player.name} time={player.stamp} />
              )}
            </For>
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
