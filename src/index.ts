import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors()
)
app.get('/', (req, res) => {
    res.json({message: 'Event Bus up!!!'})
})

app.post('/events', (req, res) => {
    const event = req.body

    console.log(event)

    res.json({ message: event })
})

app.listen(4005, () => {
    console.log('Event bus listening on port: 4005')
})