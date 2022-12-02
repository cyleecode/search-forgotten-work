import { rankDuplicate, totalWeight } from '../lib/rankSearchResult.js'
import { searchDir } from '../lib/searchDirectory.js'
import * as SP from '../lib/searchPattern.js'
import { defaultDirectory } from '../utils/constant.js'
export const searchDirByPattern = async (pattern:string, minRanking:number = 1) => {
    let result = []
    if(!defaultDirectory)return []
    let upperDirectory = await searchDir(defaultDirectory, 3) //depth 3
    const weight = totalWeight(pattern) 
    const words = pattern.split(' ')

    for (let i = 0; i < upperDirectory.length; i++) {
        const dirName = upperDirectory[i].name
        if ((dirName)[0] === '.') continue //filter .git .npmrc etc
        for (let j = 0; j < words.length; j++) {
            const word = words[j];
            const wordWeight = Number((word.length/dirName.length).toFixed(2))
            const POR = Number(SP.posOffsetRank(word, dirName))+1.0
            const LOR = Number(SP.lenOffsetRank(word, dirName))+1.0
            const MR = Number(SP.existingCharacterRank(word, dirName))+1.0
            const total = Number(LOR) * Number(MR) * Number(POR) * Number(wordWeight)
            
            if (total > minRanking) {
                upperDirectory[i].rank = total
                result.push(upperDirectory[i])
            }
        }
    }
    result = rankDuplicate(result)
    result.sort((b, a) => a.rank - b.rank)
    return result
}