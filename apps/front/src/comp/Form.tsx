import ButtonGroup from "./ButtonGroup";
import InputGroup from "./InputGroup";
export default function Form() {
  return (
    <form class='flex flex-col gap-2 mt-2'>
      <InputGroup/>
      <ButtonGroup onJoin={()=>{}} />
    </form>
  );
}
