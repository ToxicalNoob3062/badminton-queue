import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

type AppState = {
    id: string;
    past: string[];
    complaints: string[];
    startTime: string;
    players: {
        id: string;
        name: string;
        secret: string;
        stamp: string;
    }[];
};

class DocumentDB {
    private prisma: PrismaClient | null = null;
    public appState: AppState = {
        id: '1',
        past: [],
        complaints: [],
        startTime: '3:00 PM',
        players: []
    }
    static async create(prisma: PrismaClient): Promise<DocumentDB> {
        const db = new DocumentDB();
        db.prisma = prisma;
        const appState = await db.prisma.appState.findFirst();
        if (appState) db.appState = appState;
        else {
            db.appState = await db.prisma.appState.create({
                data: db.appState
            });
        }
        return db;
    }
    async getAllComplaints(): Promise<string[]> {
        return this.appState.complaints;
    }
    async getAllPlayers(): Promise<{ id: string; name: string; stamp: string }[]> {
        this.appState.players.sort((a, b) => a.id.localeCompare(b.id));
        const players = this.appState.players.map(player => ({
            id: player.id,
            name: player.name,
            stamp: player.stamp
        }));
        return players;
    }
    async addComplaint(complaint: string): Promise<void> {
        this.appState.complaints.push(complaint);
        await this.prisma?.appState.update({
            where: { id: this.appState.id },
            data: { complaints: {
                push: complaint
            }}
        });
    }
    async addPlayer(name: string, secret: string, stamp: string): Promise<void> {
        const player = {
            id: (this.appState.players.length + 1).toString(),
            name,
            secret,
            stamp
        };
        this.appState.players.push(player);
        await this.prisma?.appState.update({
            where: { id: this.appState.id },
            data: { players: {
                push: player
            }}
        });
    }
    async clearComplaints(): Promise<void> {
        this.appState.complaints = [];
        await this.prisma?.appState.update({
            where: { id: this.appState.id },
            data: { complaints: this.appState.complaints }
        });
    }
    async resetQueue(past:string[]): Promise<void> {
        this.appState.past = past;
        this.appState.players = [];
        await this.prisma?.appState.update({
            where: { id: this.appState.id },
            data: { past: this.appState.past, players: this.appState.players }
        });
    }
    async removePlayer(id:string): Promise<void> {
        this.appState.players = this.appState.players
        .filter(player => player.id !== id)
        .map((player, idx) => ({ ...player, id: (idx + 1).toString() }));
        await this.prisma?.appState.update({
            where: { id: this.appState.id },
            data: { players: this.appState.players }
        });
    }
}

const db = await DocumentDB.create(prisma);
export default db;