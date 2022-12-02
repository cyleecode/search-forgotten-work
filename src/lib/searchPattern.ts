
// rank system
// matching character (find same character irrespect different sequence)
export const existingCharacterRank = (pattern:string, input:string) => {
    // match character

    // split searching element if more than one word
    const patternArray = pattern.split("")
    const inputArray = input.split("")
    const maxScore = patternArray.length
    let lastScore = 0
    // max score = total found character match to pattern
    for(let a=0; a<inputArray.length; a++){
        let score = 0
        const pieces = inputArray.slice(a,a+maxScore)
        for(let i=0; i<patternArray.length; i++){
            const found = pieces.indexOf(patternArray[i])
            if( found !== -1 ){
                score += 1
                pieces.splice(found, 1)
            }
        }
        if(score>lastScore)lastScore=score
    }
    return parseFloat((lastScore/maxScore).toFixed(2))
}

// same character offset (find same character using sliding window to a string respect to pattern sequence)
// eg. 
// -- [searching ring] i-r=1, n-r=2, g-r=3 
// -- -- [found rendering] i-r=1, n-r=2, g-r=3 = [1] [1] [1] total match
// -- -- [found going] i-r=nil, n-r=2, g-r=3 = [nil] [1] [1] missmatch level 1
export const posOffsetRank = (pattern:string, input:string) =>{
    const patternArray = pattern.split("")
    const inputArray = input.split("")
    const maxPattern = patternArray.length
    const maxWindowIteration = inputArray.length - maxPattern
    const maxScore = maxPattern
    let score = []
    //max window slide
    for(let i= 0; i<=maxWindowIteration; i++){
        //pattern iteration
        let temp=0
        for(let j=0; j<maxPattern; j++){
            if(patternArray[j]==inputArray[i+j])temp+=1
        }
        score.push(parseFloat((temp/maxScore).toFixed(2)))
    }
    return Math.max(...score)
}

// shifted length by ascii (experimental ranking)
export const lenOffsetRank = (pattern:string, input:string) => {
    const patternArray = pattern.split("")
    const inputArray = input.split("")
    const maxPattern = patternArray.length
    const maxWindowIteration = inputArray.length - maxPattern
    let exactScore = [] 
    let score = [] 
    let testIndex = []
    for(let i=0; i<maxPattern; i++){
        exactScore.push(pattern.charCodeAt(i))
    }
    //max window slide
    for(let i= 0; i<=maxWindowIteration; i++){
        //pattern iteration
        let temp=[]
        let lessThanFiveCount = 0
        for(let j=0; j<maxPattern; j++){
            const offset = Math.abs(exactScore[j]-input.charCodeAt(i+j))
            temp.push(offset)
            if(offset<=1)lessThanFiveCount+=1
        }
        if(lessThanFiveCount> (maxPattern*0.6)){
            testIndex.push(i)
            return parseFloat((lessThanFiveCount/maxPattern).toFixed(2))
        }
        score.push(temp.reduce((a,b)=>a+b,0))
    }
    
    return 0.0
}
