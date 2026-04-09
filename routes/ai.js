const express = require('express')
const router = express.Router()

router.post('/advice', async (req, res) => {
    try {
        const { company, title, status, date } = req.body

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'user',
                        content: `I applied for a ${title} position at ${company}. Status: ${status}. Date: ${date}. Give me 3 bullet points of practical advice on what to do next.`
                    }
                ],
                max_tokens: 300
            })
        })

        const data = await response.json()
        console.log('Groq response:', JSON.stringify(data))

        const advice = data.choices[0].message.content
        res.json({ advice: advice })

    } catch (err) {
        console.log('Error:', err)
        res.json({ message: 'Error getting AI advice', error: err.message })
    }
})

module.exports = router