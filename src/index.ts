import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
var app = express()
import { searchDirByPattern } from './logic/searchDirectoryWithPattern.js'
import path from 'path'

app.get('/search/:pattern', async function (req, res) {
    const pattern = req.params.pattern
    const found = await searchDirByPattern(pattern)
    return res.json(found);
})

app.get('/', function (req, res) {
    res.sendFile(path.join(process.cwd() , 'dist/main.html'));
});

app.use(express.static('dist/public'))

app.listen(8080)
console.log('started on port 8080')