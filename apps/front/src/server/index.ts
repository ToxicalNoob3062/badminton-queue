// client.ts (or any frontend file)
import { treaty } from '@elysiajs/eden'
import type { App } from "../../../back/src/index"// or wherever you exported your App type

const server = treaty<App>('http://localhost:3000')

export default server
