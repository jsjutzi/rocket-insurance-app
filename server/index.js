const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.post('/api/getQuote', (req, res) => {
    console.log(req.body)
    // https://fed-challenge-api.sure.now.sh/api/v1/quote
    res.json({message: 'Test is successful'})
})

app.put('/api/updateQuote', (req, res) => {
    // https://fed-challenge-api.sure.now.sh/api/v1/quotes/:quoteId
})
app.listen(PORT, () => {
    console.log(`Server is now running and listening on ${PORT}`)
})