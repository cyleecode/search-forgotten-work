
const inputSW = document.querySelector('#inputSearchWork')
const listResult = document.querySelector('#listResult')
let foundResult = []
inputSW.addEventListener('change', (e) => {
    listResult.innerHTML = ''
    const changes = e.target.value
    if (changes === '') {}
    else searchRank(changes)
})

const searchRank = async (i) => {
    foundResult = []
    const r = await fetch(`/search/${i}`)
        .then(res => res.json())
        .then(res => res)
    console.log(r)
    await new Promise((resolve) => {
        const max = r.length
        foundResult= [...r]

        for (let i = 0; i < max; i++) {
            const pNode = document.createElement("div")
            const absPath = document.createTextNode(`${r[i].path}`)
            pNode.classList.add('foundPath')
            pNode.appendChild(absPath)

            const nNode = document.createElement("div")
            const xName = document.createTextNode(`${r[i].name}`)
            nNode.classList.add('foundName')
            nNode.id = `copy-${i}`
            nNode.appendChild(xName)

            listResult.appendChild(pNode)
            listResult.appendChild(nNode)
            listResult.appendChild(document.createElement("br"))
        }
        resolve()
    })

    const getFoundResult = (i) =>{
        if(foundResult[i]){
            return foundResult[i].path
        }else{
            return ''
        }
    }

    const copyTextIds = document.querySelectorAll("div[id^=copy-]")
    copyTextIds.forEach(el => {
        el.addEventListener('click', (e) => {
            const targetId = e.target.id
            const getIndex = targetId.match(/(copy-)(\d+)/)
            getFoundResult(getIndex[2])
            navigator.clipboard.writeText(getFoundResult(getIndex[2])).then(function () {
                console.log('Async: Copying to clipboard was successful!');
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        })
    })
}