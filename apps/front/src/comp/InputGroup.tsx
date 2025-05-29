export default function InputGroup() {
  return (
    <div class='flex justify-center gap-2 p-2'>
      <div>
        <label for='name'>Name</label>
        <input class='p-2 border rounded-md' id='name' type='text' placeholder='Your Name'/>
      </div>
     <div>
        <label for='secret'>Secret</label>
        <input class='p-2 border rounded-md' id='secret' type='text' placeholder='Your Secret'/>
      </div>
    </div>
  );
}
