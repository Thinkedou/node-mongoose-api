import { Hono } from 'hono'
import { User } from '../models/users'
import { isValidObjectId } from 'mongoose'
import {randomBytes,pbkdf2Sync} from 'node:crypto'
import jwt from "jsonwebtoken"

const JWT_CAT_SECRET = "&à)',déincrziaod41564"


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
    const body = await c.req.json()
    const {email=false,password=false} = body

    if(email && password){
        // attraper le user via son email [ne pas oublier d'indexer l'email!]
        // attraper le pwd et le hash [utiliser project pour avoir les deux champs masqués]
        const currentUser = await User.find({email})
        // faire un 'compare' entre hash password & stored hashed pwd 
        // si tout est ok, on est "loggué" > on génère un jwt
        const salt    = randomBytes(32).toString('hex')
        // const genHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
        // ici tout va bien! 
        const testToken = jwt.sign({
            _id:currentUser._id,
            firstName:currentUser.firstName,
            lastName:currentUser.lastName,
          },
          JWT_CAT_SECRET, 
          { expiresIn: '1h' }
        );
        return c.json({token:testToken})

    }else{
        return c.json('failed', 401)
    }

})

export default api