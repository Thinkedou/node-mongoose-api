import { Hono } from 'hono'
import {Creation} from '../models/creations'
const api = new Hono().basePath('/creations')

api.get('/', async (c)=>{
    const allCrea = await Creation.find({})
    return c.json(allCrea)
})
api.post('/',async (c)=>{
    const body = await c.req.json()
    try {
        const newCrea  = new Creation(body)
        const saveCrea = await newCrea.save()
        return c.json(saveCrea, 201)
    } catch (error) {
        return c.json(error._message,400)
    }
})
api.put('/',(c)=>{
    return c.json({msg:"PUT /creations"})
})
api.delete('/',(c)=>{
    return c.json({msg:"DELETE /creations"})
})

export default api