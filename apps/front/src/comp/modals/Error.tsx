export default function ErrorModal(err: Error) {
    return <p class="px-4 py-6 text-md">{err.message}.</p>
}