const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.all('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build/index.html'))	
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`[express] Listening @ http://localhost:${PORT}`))