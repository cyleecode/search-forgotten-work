type DirArr = {
    name: string;
    path: string;
    rank?: number;
}
export function rankDuplicate(sdirArray:Array<DirArr>){
    //create a hashmap to remove duplicate
    let map: Map<string, [string,number]> = new Map()
    const size = sdirArray.length
    for(let i=0; i<size; i++){
        const $path = sdirArray[i].path
        const $rank = sdirArray[i].rank
        const $name = sdirArray[i].name
        const rankExist = map.get($path)//check duplicate
        if(rankExist){ //
            map.set($path,[$name, Number($rank)*2])//rank +1 if duplicate
        }else{
            map.set($path,[$name,Number($rank)])
        }
    }
    const result = [...map].map(([path,[name,rank]])=>({name,path,rank})) //flatten map to array obj
    return result
}

export const totalWeight= (sentence:string) => {
    const words = sentence.split(' ')
    let count=0
    for (let i = 0; i < words.length; i++) {
        const element = words[i];
        count+=element.length
    }
    return count
}