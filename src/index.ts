import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { MongoDataStorage } from './dataStorage/MongoDataStorage'
import { SubscriptionRepository } from './repository/SubscriptionRepository'
import { SubscriptionCRUD } from './crud/SubscriptionCRUD'
import { Subscription } from './entities/mongo/subscriptionSchema'
import { connectDatabase } from './utils/common/connectDatabase'
import { checkUri } from './utils/common/checkUri'


const SUB_REPOSITORY = new SubscriptionRepository(new MongoDataStorage(Subscription))
const SUB_CRUD = new SubscriptionCRUD(SUB_REPOSITORY)

const app = express()

app.use(express.json())
app.use(cors()
)
app.get('/', (req, res) => {
    res.json({message: 'Event Bus up!!!'})
})

app.post('/events', async (req, res) => {
    const event = req.body

    console.log(event)

    const subscriptions = await SUB_CRUD.read({})

    console.log(subscriptions)

    if ('response' in subscriptions.data){

        Promise.all(
            subscriptions.data.response.map( async subscription => {
                await axios.post(subscription.eventHandlerURI, { event })
            }
        )
)
        return res.status(200).json({ event, subscriptions: subscriptions.data.response })
    }

    return res.status(subscriptions.statusCode).json({ message: subscriptions.data.message })
})

app.post('/subscription', async (req, res) => {
    const { url } = req.body

    const urlValidation = checkUri(url)

    if(!urlValidation){
        return res.status(400).json({ message: 'invalid url provided' })
    }

    const findUrl = await SUB_CRUD.readOne({eventHandlerURI: url})

    if('response' in findUrl.data){
        return res.status(409).json({ message: 'this url already exist' })
    }

    const saveUri = await SUB_CRUD.create({eventHandlerURI: url})

    if('response' in saveUri.data){
        return res.status(saveUri.statusCode).json(saveUri.data.response.eventHandlerURI)
    }

    return res.status(saveUri.statusCode).json(saveUri.data.message)
})

connectDatabase().then(() =>
    app.listen(4005, () => {
        console.log('Event bus listening on port: 4005')
    })
)
