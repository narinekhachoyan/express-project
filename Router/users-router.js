import { Router } from 'express';
const router = Router();
// import { isAdmin } from '/middlewares/middleware.js';
import { get, updateUser, deleteUser } from '../storages/mongodb.js';

  

router.get('/:email?', async (req, res) =>{
    try {
        const { email } = req.params;
        const users = await get('users', email);
        res.status(201).send({data:users})
    } catch (e) {
        res.status(404).send({data: "Something went wrong!"})
    }
})

router.delete('/', async (req, res) => {
    try {
        const { email } = req.body;
        const deletedUser = await deleteUser({email});
        res.status(200).send({ data: deletedUser })
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.put('/', async (req, res) => {
     try {
        const { email, username } = req.body;
       await updateUser({email}, {username})
        res.status(204).send({data:"User successfully updated!"}) 
     } catch (e) {
        res.status(404).send({data:"Failed to update!"})    
     }
})


export default router