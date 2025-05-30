import { useStoreContext } from '../providers/stores';
export default function InputGroup() {
  const {inputState:[input,setInput]} = useStoreContext();
  return (
    <div class='flex justify-center gap-2 p-2'>
      <div>
        <label for='name'>Name</label>
        <input onChange={(e) => setInput({ name: e.target.value })} class='p-2 border rounded-md' id='name' type='text' placeholder='Your Name' value={input.name}/>
      </div>
     <div>
        <label for='secret'>Secret</label>
        <input onChange={(e) => setInput({ secret: e.target.value })} class='p-2 border rounded-md' id='secret' type='text' placeholder='Your Secret' value={input.secret}/>
      </div>
    </div>
  );
}
