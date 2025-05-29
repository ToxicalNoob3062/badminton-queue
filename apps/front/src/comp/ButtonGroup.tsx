
export default function ButtonGroup(props: { onJoin: () => void}) {
  return (
    <div class='flex gap-3 text-white'>
      <button id="join-button" onClick={props.onJoin} class='flex-1/2 bg-black px-3 py-2 rounded-md'>Join</button>
      <button  class='flex-1 bg-black px-3 py-2 rounded-md'>Refresh</button>
    </div>
  );
}
