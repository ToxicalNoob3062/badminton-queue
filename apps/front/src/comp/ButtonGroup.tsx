import ErrorModal from "./modals/Error";
import { useStoreContext } from "../providers/stores";
import { join } from "../server/server";
import { useModalContext } from "../providers/modal";

export default function ButtonGroup() {
  const {
    inputState: [input],
    playersResource: [, { refetch: refetchPlayers, mutate: mutatePlayers }],
    complaintsResource: [, { refetch: refetchComplaints }],
  } = useStoreContext()

  const [, setModal] = useModalContext();

  const handleRefresh = (e: MouseEvent) => {
    e.preventDefault();
    refetchPlayers();
    refetchComplaints();
  };

  const joinHandler = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const player = await join(input.name, input.secret) as { id: string; name: string; stamp: string; };
      mutatePlayers((prev) => prev && [...prev, player]);
    }
    catch (error) {
      const err = error as Error;
      setModal(() => ErrorModal.bind(null, err));
    }
  }
  return (
    <div class='flex gap-3 text-white'>
      <button onClick={joinHandler} type="submit" id="join-button" class='flex-1/2 bg-black px-3 py-2 rounded-md'>
        Join
      </button>
      <button onClick={handleRefresh} class='flex-1 bg-black px-3 py-2 rounded-md'>Refresh</button>
    </div>
  );
}
