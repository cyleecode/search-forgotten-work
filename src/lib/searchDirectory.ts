
import fs from 'fs'
import path from 'path'
import { maxScanDir } from '../utils/constant.js'
type DirArr = {
    path: string;
    name: string;
    rank?: number;
}
/**
 * 
 * @param {string} workPath 
 * @param {number} depth 
 * @returns {Promise.<DirArr>} [{name, path}...]
 */
export const searchDir = async (workPath:string, depth:number=1, start:number=0) => {
    let found:DirArr[] = []
    
    if(start === depth) return found
    await new Promise(resolve=>{
        fs.readdir(workPath, { withFileTypes: true }, async (err,files)=> {
            if(files.length>maxScanDir){
                resolve(0)
                return
            }
            if (err) {
                console.log(err)
            } else {
                for(let i=0; i<files.length; i++){
                    found.push({name: files[i].name, path: path.join(workPath,files[i].name) })
                }
                for(let i=0; i<files.length; i++){
                    if(files[i].isDirectory()){
                        const new_found = await searchDir(path.join(workPath,files[i].name), depth, start+1)
                        found = [...found, ...new_found]
                    }
                }
            }
            resolve(0)
        })
    })
    return found
}
