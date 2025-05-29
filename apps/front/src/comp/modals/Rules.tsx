export default function RuleBook() {
  return (
    <div class="flex flex-col gap-3">
      <h3 class="text-center text-xl text-teal-950">Court Rules</h3>
      <p class="font-sans">
        Welcome to the Orleans Bangladesh Badminton Club! We’re a small Bengali community in Ottawa, playing at the Uyghur Center. Please follow these rules to keep our games safe and enjoyable for everyone:
      </p>
      <ul class="list-disc font-sans p-4 flex flex-col gap-2">
        <li>
          Only <b>8 players</b> are allowed per game day due to our single court.
        </li>
        <li>
          If you sign up after the limit, your name will appear in <span class="text-yellow-600 font-semibold">Yellow</span> or <span class="text-red-600 font-semibold">Red</span> instead of <span class="text-green-600 font-semibold">Green</span>.
        </li>
        <li>
          <span class="text-yellow-600 font-semibold">Yellow</span> players may join after 1 hour or if a <span class="text-green-600 font-semibold">Green</span> player leaves early.
        </li>
        <li>
          <span class="text-red-600 font-semibold">Red</span> players cannot play until they move up to <span class="text-yellow-600 font-semibold">Yellow</span>. Once in <span class="text-yellow-600 font-semibold">Yellow</span>, those rules apply.
        </li>
        <li>
          Registration opens daily at <b>3pm</b> to give everyone a fair chance to join.
        </li>
        <li>
          Please arrive on time and be ready to play within 5 minutes. If someone reserves a spot and doesn’t show up, present players can report it anonymously.
        </li>
        <li>
          You can also report any violations of the <span class="text-green-600 font-semibold">Green</span>, <span class="text-yellow-600 font-semibold">Yellow</span>, or <span class="text-red-600 font-semibold">Red</span> zone rules.
        </li>
      </ul>
    </div>
  );
}
