import SwapRow from "./row/SwapRow";

export default function Table() {
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
          <SwapRow id='1' name="Virat Kohli" time="1:00pm"  />
          <SwapRow id='2' name="Hardik Pandya" time="2:45pm"  />
          <SwapRow id='3' name="Rohit Sharma" time="3:15pm" />
          <SwapRow id='4' name="Jasprit Bumrah" time="4:00pm" />
          <SwapRow id='5' name="Bhuvneshwar Km" time="5:00pm" />
          <SwapRow id='6' name="Mohammed Shami" time="6:00pm" />
          <SwapRow id='7' name="Kuldeep Yadav" time="7:00pm" />
          <SwapRow id='8' name="Ravindra Jadeja" time="8:00pm" />
          <SwapRow id='9' name="Bhuvi" time="9:00pm" />
          <SwapRow id='10' name="Yuvraj Singh" time="10:00pm" />
          <SwapRow id='11' name="Shikhar Dhawan" time="11:00pm" />
        </div>
      </section>
    );
}
