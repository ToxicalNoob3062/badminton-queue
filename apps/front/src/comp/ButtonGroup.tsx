import { useStoreContext } from "../providers/stores";

export default function ButtonGroup() {
  const { 
    playersResource: [, { refetch: refetchPlayers }], 
    complaintsResource: [, { refetch: refetchComplaints }] 
  } = useStoreContext()

   const handleRefresh = (e: MouseEvent) => {
    e.preventDefault();
    refetchPlayers();
    refetchComplaints();
  };

  return (
    <div class='flex gap-3 text-white'>
      <button type="submit" id="join-button"  class='flex-1/2 bg-black px-3 py-2 rounded-md'>Join</button>
      <button onClick={handleRefresh} class='flex-1 bg-black px-3 py-2 rounded-md'>Refresh</button>
    </div>
  );
}
