const inputForm = document.querySelector('form')
const inputField = document.getElementById("inputField");
const addBtn = document.querySelector('.submitButton')
const counter = document.querySelector('.counter')




//ist das ul tag
const outerList = document.querySelector('.outerList')


// abrufen der locastorage daten und anschliendes updaten/erstellen der liste
let list = getItems()
updateList()


addBtn.addEventListener('click', () =>{
    const input = inputField.value.trim();
    //keine ausfuehrung ohne eintrag
    if(input === ''){
        return
    }
    //verhinderung doppelter vorkommen durch vorherigen abgleich
    if(list.includes(input)){
        return
    }
    //eingabe in die liste pushen danach updaten und speichern, anschliessend das eingabe feld leeren
    list.push(input)
    updateList()
    saveList()
    inputField.value = ''
})

// ul erst einmal komplett leeren, dann von grund auf neu bauen (maybe logik update fuer sehr viele eintraege noetig?)
function updateList() {
    outerList.innerHTML = ""
    list.forEach((listenEintrag, eintragIndex)=>{
        listItem = createNewItem(listenEintrag, eintragIndex)
        outerList.append(listItem)
        
    })
}



// erstellung eines neuen html li elements
function createNewItem(listenEintrag, eintragIndex) {
    //haengt jedem erstellten element eine individuelle id an
    const eintragId = "listenEintrag-"+ eintragIndex
    const newLi = document.createElement("li")
    newLi.className = "listenEintrag"
    //durch die backticks koennen ganze abschnitte im html generiert werden
    newLi.innerHTML = `
                    <span class="todoSpan" id="${eintragId}">${listenEintrag}</span>
                    <button class="deleteButton">Delete</button>`
    //so kann der button im einzelnen eintrag angesprochen werden
    const deleteBtn = newLi.querySelector('.deleteButton')
    deleteBtn.addEventListener('click', ()=>{
        deleteItem(eintragIndex)
    })
    return newLi
}
//filtert die liste und gibt eine kopie der liste ohne den zu entfernenden intrag wieder, diese wird dann gespeichert und geupdatet
function deleteItem(eintragIndex){
    list = list.filter((_, i)=> i !== eintragIndex)
    saveList()
    updateList()
}

// speichern der liste
function saveList(){
    const itemsJson = JSON.stringify(list)
    localStorage.setItem("listenEintrag", itemsJson)

}
// abrufen der liste
function getItems(){
    const eintraege = localStorage.getItem("listenEintrag") || "[]"
    return JSON.parse(eintraege)
}


