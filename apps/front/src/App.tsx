import Form from "./comp/Form";
import Table from "./comp/Table";
import ModalUI from "./comp/Modal";
import RuleBook from "./comp/modals/Rules";
import Complaints from "./comp/modals/Complaints";
import { useModalContext } from "./providers/modal";



function App() {
  const [_,setModal] = useModalContext();
  return (
    <div id="app-root" class='bg-lime-50 shadow-md w-full min-h-screen p-4 relative'>
      <div id="app-container" class='max-w-sm mx-auto shadow-md bg-white p-6 rounded-lg relative'>
        <h1 class='text-3xl text-teal-950 text-center'>Badminton Queue</h1>
        <p class='text-xl text-orange-500 text-center p-2'>27th May, 2027</p>
        <Form />
        {/* display */}
        <div id="display" class='flex flex-col gap-4 mt-6'>
          <h2 class='text-center text-2xl'>Players 🎖️</h2>
          <Table/>
        </div>
        {/* rules */}
        <button onClick={()=>setModal(RuleBook)} class="absolute left-3 top-3 rounded-full w-6 h-6">
          <img src="info.png" alt="info button" />
        </button>
        <button onClick={()=>setModal(Complaints)} class="absolute right-2 top-2 rounded-full w-8 h-8">
          <img src="warning.png" alt="warning button" />
        </button>
      </div>
      <ModalUI />
    </div>
  )
}

export default App
