export default function Row(props:{
  id: string,
  name: string,
  time: string,
}) {
  return (
    <p class="tr flex justify-start h-full px-4">
      <span class='td flex-2/12 py-2 inline-block'>{props.id}</span>
      <span class='td flex-6/12 py-2 inline-block'>{props.name}</span>
      <span class='td flex-3/12 py-2 inline-block'>{props.time}</span>
      <button class='td flex-1/12 py-2 '>
        <img src="left.png" alt="left arrow" class="w-6 h-6"/>
      </button>
    </p>
  );
}
