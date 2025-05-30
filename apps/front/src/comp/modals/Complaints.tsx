import { Suspense, ErrorBoundary, For } from 'solid-js';
import { useStoreContext } from '../../providers/stores';

export default function Complaints() {
  const { complaintsResource: [complaints] } = useStoreContext();
  return (
    <div class="min-w-40 flex flex-col gap-3">
      <h3 class="text-xl text-teal-950">Complaint List</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <ErrorBoundary fallback={(err) => (
          <div class="text-red-500">
            {err.message}
          </div>
        )}>
          <Suspense fallback={<div class="text-gray-500">Loading complaints...</div>}>
            <For each={complaints()}>
              {(complaint) => (
                <p class="bg-gray-100 p-2 rounded-md shadow-teal-500 shadow-sm">{complaint}</p>
              )}
            </For>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
