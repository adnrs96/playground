import fs from 'fs'
import temp from 'temp'
import path from 'path'
import uuid from 'uuid/v4'
import { execSync } from 'child_process'
import { Path, GET, POST } from 'typescript-rest'

import stories from '../../stories'


@Path('/app')
export default class AppController {

    @POST
    @Path('compile')
    async compile(data: any) {
        temp.track()
        const folder: string = temp.mkdirSync(uuid())
        const filePath: string = path.join(folder, 'playground.story')
        fs.writeFileSync(filePath, data.story)
        const output: string = execSync(`storyscript compile -j`, {
            cwd: folder
        }).toString()
        const payload: object = JSON.parse(output)
        temp.cleanupSync()
        return payload
    }

    @GET
    @Path('sample')
    async stories() {
        return stories[0]
    }

}
