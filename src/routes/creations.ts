import { Hono } from 'hono'
import {Creation} from '../models/creations'
const api = new Hono().basePath('/creations')

api.get('/', async (c)=>{
    const allCrea = await Creation.find({})
    return c.json(allCrea)
})

api.get('/:creaId', async (c)=>{
    const _id = c.req.param('creaId')
    const oneCrea = await Creation.findOne({_id})
    return c.json(oneCrea)
})

api.post('/',async (c)=>{
    const body = await c.req.json()
    try {
        const newCrea  = new Creation(body)
        const saveCrea = await newCrea.save()
        return c.json(saveCrea, 201)
    } catch (error:unknown) {
        return c.json(error._message,400)
    }
})
api.put('/:creaId',async (c)=>{
    const _id  = c.req.param('creaId')
    const body = await c.req.json()
    
    // on attrape l'id de la creations (_id)
    // on a besoin du body pour les champs à mettre à jour
    // on peut préparer notre query pour findOneAndUpdate 
    const q = {
        _id:_id
    }
    const updateQuery = {
        categories:body.categories,
        title:body.title
    }
    const tryToUpdate = await Creation.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})



api.delete('/',(c)=>{
    return c.json({msg:"DELETE /creations"})
})

export default api