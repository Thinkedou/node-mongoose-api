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

// en head, la req http n'a pas de body response!!
// mais on peut setter des headers à la volée et autant que nécessaire
// c.setHeaders('x-count',1651)

// api.head('/', async (c)=>{
    
    
// })

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
// en put, on écrase toutes les valeurs (y compris les tableaux)
api.put('/:creaId',async (c)=>{
    const _id  = c.req.param('creaId')
    const body = await c.req.json()
    // on attrape l'id de la creations (_id)
    // on a besoin du body pour les champs à mettre à jour
    // on peut préparer notre query pour findOneAndUpdate 
    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }
    // par défaut il va faire un $set 

    const tryToUpdate = await Creation.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})
// en patch, on va "append" les éléments passés dans le body
api.patch('/:creaId',async (c)=>{
    const _id  = c.req.param('creaId')
    const body = await c.req.json()
    // on attrape l'id de la creations (_id)
    // on a besoin du body pour les champs à mettre à jour
    // on peut préparer notre query pour findOneAndUpdate 
    const q = {
        _id
    }
    const {categories,...rest} = body

    const updateQuery = {
        $addToSet:{
            categories:categories
        },
        $set:{...rest}
    }
    const tryToUpdate = await Creation.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.delete('/:creaId',async (c)=>{
    const _id  = c.req.param('creaId')
    const tryToDelete = await Creation.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if(deletedCount){
        return c.json({msg:"DELETE done"})
    }
    return c.json({msg:"not found"},404)
    
})

export default api