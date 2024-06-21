import { Hono } from 'hono'
import { User } from '../models/users'
import { isValidObjectId } from 'mongoose'


const api = new Hono().basePath('/users')

api.get('/',async (c)=>{
    try {
        const allUsers = await User.find({})
        return c.json(allUsers)
    } catch (error:unknown) {
        return c.json(error._message,400)
    }
})


api.post('/register',async (c)=>{
    const body = await c.req.json()
    try {
        const newUser     = new User(body)
        const saveNewUser = await newUser.save()
        return c.json(saveNewUser)
    } catch (error:unknown) {
        return c.json(error._message,400)
    }
})

api.post('/login',async (c)=>{
    // const body = await c.req.json()
    // try {
    //     const newCrea  = new Creation(body)
    //     const saveCrea = await newCrea.save()
    //     return c.json(saveCrea, 201)
    // } catch (error:unknown) {
    //     return c.json(error._message,400)
    // }
})

export default api