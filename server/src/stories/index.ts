import fs from 'fs'
import path from 'path'


const files = fs.readdirSync(path.resolve(__dirname))
const stories: string[] = []

for (const file of files) {
    if (file.endsWith('.story')) {
        stories.push(fs.readFileSync(`${__dirname}/${file}`).toString())
    }
}

export default stories
