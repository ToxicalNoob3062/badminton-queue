// client.ts (or any frontend file)
import { treaty } from '@elysiajs/eden'
import type { App } from "../../../back/src/index"// or wherever you exported your App type

const server = treaty<App>('http://localhost:3000')

export async function getPlayers() {
  try {
    const players = (await server.api.players.get()).data
    return players
  } catch (error) {
    console.error('Error fetching players:', error)
    throw error
  }
}

export async function getComplaints() {
  try {
    const complaints = (await server.api.complains.get()).data
    return complaints
  } catch (error) {
    console.error('Error fetching complaints:', error)
    throw error
  }
}