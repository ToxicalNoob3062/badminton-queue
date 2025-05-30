// client.ts (or any frontend file)
import { treaty } from '@elysiajs/eden'
import type { App } from "../../../back/src/index"// or wherever you exported your App type

type ErrorResponse = {
    message: string;
}

const server = treaty<App>('http://localhost:3000')


async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getPlayers() {
    await sleep(100)
    const resp = await server.api.players.get()
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}

export async function getComplaints() {
    await sleep(100)
    const resp = await server.api.complains.get()
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}