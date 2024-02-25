import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://test-85d67-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ShoppingListInDB = ref(database, "shoppingList")


const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    push(ShoppingListInDB, inputValue)
    
    clearInputField()
})

onValue(ShoppingListInDB, function(snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendItemToShoppingLIst(currentItem)
        }
    } else {
        shoppingList.innerHTML = "No items here... yet."
    }
  
})

function clearInputField() {
    inputField.value = ""
}

function appendItemToShoppingLIst(currentItem) {
    //shoppingList.innerHTML += `<li>${inputValue}</li>`
    let currentItemId = currentItem[0]
    let currentItemValue = currentItem[1]

    let newElement = document.createElement("li")
    newElement.textContent = currentItemValue
    shoppingList.append(newElement)

    newElement.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${currentItemId}`)
        remove(exactLocationOfItemInDB)
    })
}

function clearShoppingList() {
    shoppingList.innerHTML = ""
}