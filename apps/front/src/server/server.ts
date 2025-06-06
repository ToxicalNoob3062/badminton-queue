// client.ts (or any frontend file)
import { treaty } from '@elysiajs/eden'
import type { App } from "../../../back/src/index"// or wherever you exported your App type

type ErrorResponse = {
    message: string;
}

const server = treaty<App>(import.meta.env.VITE_API_URL || "https://queue.code-with-rahat.com")

export async function getPlayers() {
    const resp = await server.api.players.get()
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}

export async function getComplaints() {
    const resp = await server.api.complaints.get()
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}

export async function join(name: string, secret: string) {
    const resp = await server.api.join.post({ name, secret })
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}

export async function complain(message: string) {
    const resp = await server.api.complain.post({ complaint: message })
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}

export async function leave(id: string, secret: string) {
   const resp = await server.api.leave({id}).delete({ secret })
    if (resp.error) {
        const error = resp.error.value as ErrorResponse;
        throw new Error(error.message)
    }
    return resp.data
}

