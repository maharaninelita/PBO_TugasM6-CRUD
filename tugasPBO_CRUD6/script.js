let fishStock = [];
let editIndex = null;


window.onload = function() {
    if (localStorage.getItem('fishStock')) {
        fishStock = JSON.parse(localStorage.getItem('fishStock'));
        displayFishStock();
    }
};


function addFish() {
    let fishName = document.getElementById("fishName").value;
    let fishType = document.getElementById("fishType").value;
    let weight = document.getElementById("weight").value;
    let stock = document.getElementById("stock").value;

    if (fishName === "" || fishType === "" || weight === "" || stock === "") {
        alert("Harap isi semua field.");
        return;
    }

    if (editIndex !== null) {
        fishStock[editIndex] = { fishName, fishType, weight, stock };
        editIndex = null;
    } else {
        fishStock.push({ fishName, fishType, weight, stock });
    }

    
    localStorage.setItem('fishStock', JSON.stringify(fishStock));

    
    document.getElementById("fishName").value = "";
    document.getElementById("fishType").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("stock").value = "";

    displayFishStock();
}


function displayFishStock() {
    let tableBody = document.querySelector("#fishTable tbody");
    tableBody.innerHTML = "";

    fishStock.forEach((fish, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${fish.fishName}</td>
            <td>${fish.fishType}</td>
            <td>${fish.weight}</td>
            <td>${fish.stock}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editFish(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


function editFish(index) {
    document.getElementById("fishName").value = fishStock[index].fishName;
    document.getElementById("fishType").value = fishStock[index].fishType;
    document.getElementById("weight").value = fishStock[index].weight;
    document.getElementById("stock").value = fishStock[index].stock;
    editIndex = index;
}


function confirmDelete(index) {
    let confirmAction = confirm("Apakah Anda yakin ingin menghapus data ikan ini?");
    
    if (confirmAction) {
        deleteFish(index);
    }
}


function deleteFish(index) {
    fishStock.splice(index, 1);
    localStorage.setItem('fishStock', JSON.stringify(fishStock));
    displayFishStock();
}
