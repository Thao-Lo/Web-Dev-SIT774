let items = []; // init an empty array to store all entered items
let output = document.getElementById("output");
const selectedRadio = document.querySelector('input[name="sortOption"]:checked'); //checked radio button

// Call function when "Enter" btn is clicked
document.getElementById("enterBtn").addEventListener("click", function () {           

    const name = document.getElementById("itemName").value.trim();
    const id = document.getElementById("itemId").value.trim();
    const date = document.getElementById("itemDate").value;            

    // display warning for input validations
    let nameWarning = document.getElementById("nameWarning");
    let idWarning = document.getElementById("idWarning");
    let dateWarning = document.getElementById("dateWarning");

    // if inputs are empty
    if(name.trim() == "" ){
        nameWarning.innerHTML = "Name cannot be empty."
    }else {
        document.getElementById("nameWarning").innerHTML = "";
    }
    if(id.trim() == ""){
        idWarning.innerHTML = "ID cannot be empty."
    }else {
        document.getElementById("idWarning").innerHTML = "";
    }            
    if(date.trim() == ""){
        dateWarning.innerHTML = "Date cannot be empty."
    }else {
        dateWarning.innerHTML = "";
    }        
    
    // check for duplicate Id
    for (let i = 0; i < items.length; i++) {
        if(items[i].id == id){
             idWarning.innerHTML = "ID already existed."
             return;
        }                
    }

    // check if date is not in the future
    if(!isDateOk(date)){
          dateWarning.innerHTML = "Date cannot be in the future."
        return;
    }
    // add an item into the array
    items.push({
        id: id,
        name: name,
        date: date //string
    })

    console.log(items)

    // display updated list
    handleDisplay(selectedRadio);            
    
});

// when the user changes sort options
document.querySelectorAll('input[name="sortOption"]').forEach(radio => {
    radio.addEventListener("change", (event) =>  {
        handleDisplay(event.target);
    })
})

// functions to sort and display items 
const handleDisplay = (radioInput) => {
    output.innerHTML = ""; // clear current output
    let list = [...items]; // create a copy of items

    if(radioInput.value == "sortById"){
        list = list.sort((a,b) => a.id - b.id);
    }
    if(radioInput.value == "sortByDate"){
        // Convert string to date
        list = list.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    // display each item as a paragraph 
    list.forEach(({name, id, date}) => {               
        const p = document.createElement("p")
        p.textContent = `${name}, ${id}, ${date}`;                
        output.appendChild(p);
    })
}

// function to ensure date is not in the future
const isDateOk = (entryDateTime) => {
    let dateEntered = new Date(entryDateTime);
    let now = new Date();
    if (now > dateEntered){
        return true;
    }
    return false;
}