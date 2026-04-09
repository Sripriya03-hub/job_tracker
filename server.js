require('dotenv').config() // it calls for the dotenv and asks it to load the env file 

const express = require('express') // Importing the express framework 
const mongoose = require('mongoose') // Importing mongoose to make the server talk with the database
const Job = require('./models/jobs') // Importing the job schema from the models folder 
const aiRouter = require('./routes/ai') // Importing the ai file from the routes folder 

const app = express() // Creating the application 

mongoose.connect(process.env.MONGO_URI) // Mongoose gets connected and reads the data in the env file
.then(() => console.log('Connected to MongoDB')) // If the connection is successful display this message
.catch((err) => console.log('Connection failed', err)) // If the connection failed display this message with the error

app.use(express.json()) // Making your app answer understand JSON
app.use(express.static('public')) 
app.use('/ai', aiRouter)

app.get('/', (req, res) => {  // My first api call :)
    res.send('Server is running')
})

app.listen(3000, () => {  // I have created the port in which it should run 
    console.log('Server running on port 3000')
})

app.get('/jobs', async(req, res) => {
    try{
        const jobs = await Job.find()
        res.json(jobs)
    }catch(err){
        res.json({message: 'Could not fetch the jobs', error: err })
    }
})

app.post('/jobs', async (req, res) => { 
    
    try{
    const job = new Job({
        company: req.body.company,
        title: req.body.title,
        status: req.body.status,
        date: req.body.date
    })
    await job.save()
    res.json({message: 'Job saved successfully', job: job})
} catch(err){
    res.json({message: 'Error saving job', error: err})
}
})

app.delete('/jobs/:id', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id)
        res.json({ message: 'Job deleted successfully' })
    } catch (err) {
        res.json({ message: 'Error deleting job', error: err })
    }
})

app.put('/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            {
                company: req.body.company,
                title: req.body.title,
                status: req.body.status,
                date: req.body.date
            },
            { new: true }
        )
        res.json({ message: 'Job updated successfully', job: job })
    } catch (err) {
        res.json({ message: 'Error updating job', error: err })
    }
})