

import { EventEmitter } from "node:events";
const eventEmaitter=new EventEmitter()

eventEmaitter.on("confirm-email",async(fn)=>{
    fn()
})
export default eventEmaitter