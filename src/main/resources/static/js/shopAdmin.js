// let catCost = null;
let catId = null;

function highlightThis(j) {
    alert(j);
}

function check() {
    if(document.getElementById("cat_name").value === "" ||
        document.getElementById("cat_breed").value === "" ||
        document.getElementById("cat_gender").value === "" ||
        document.getElementById("cat_color").value === "" ||
        document.getElementById("cat_years").value === "" ||
        document.getElementById("cat_desc").value === "" ||
        document.getElementById("cat_cost").value === "") {
        document.getElementById('save_button').disabled = true;
    } else {
        document.getElementById('save_button').disabled = false;
    }
}

function checkCreate() {
    if(document.getElementById("cat_name_create").value === "" ||
        document.getElementById("cat_breed_create").value === "" ||
        document.getElementById("cat_gender_create").value === "" ||
        document.getElementById("cat_color_create").value === "" ||
        document.getElementById("cat_years_create").value === "" ||
        document.getElementById("cat_desc_create").value === "" ||
        document.getElementById("cat_cost_create").value === "") {
        document.getElementById('save_button_create').disabled = true;
    } else {
        document.getElementById('save_button_create').disabled = false;
    }
}

function put(id){
    fetch('http://localhost:8080/positions/updateSale/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'posId': id,
            'sale': 'false'
        }
    })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data)));
    location.reload();
}

function addPos(){
    fetch('http://localhost:8080/positions/addPosition/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "cost": document.getElementById("cat_cost_create").value,
                "cat": {
                    "name": document.getElementById("cat_name_create").value,
                    "breed": document.getElementById("cat_breed_create").value,
                    "gender": document.getElementById("cat_gender_create").value,
                    "color":  document.getElementById("cat_color_create").value,
                    "years": document.getElementById("cat_years_create").value,
                    "description": document.getElementById("cat_desc_create").value
                }
            })
    })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data)));
    location.reload();
}

function putElement(id){
    fetch('http://localhost:8080/positions/updatePosition/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'posId': id,
            'cost': document.getElementById("cat_cost").value
        },
        body: JSON.stringify(
            {
                "name" : document.getElementById("cat_name").value,
                "breed" : document.getElementById("cat_breed").value,
                "gender" : document.getElementById("cat_gender").value,
                "color" : document.getElementById("cat_color").value,
                "years" : document.getElementById("cat_years").value,
                "description" : document.getElementById("cat_desc").value
            })
    })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data)));
    location.reload();
}



function getAndPutElement(id){
    fetch('http://localhost:8080/positions/getPositionsById/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'posId': id
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const saveBut = document.getElementById("save_button");

            const cat_name = document.getElementById("cat_name");
            const cat_breed = document.getElementById("cat_breed");
            const cat_gender = document.getElementById("cat_gender");
            const cat_color = document.getElementById("cat_color");
            const cat_years = document.getElementById("cat_years");
            const cat_cost = document.getElementById("cat_cost");
            const cat_desc = document.getElementById("cat_desc");


            let nameCat = data.cat.name;
            let breedCat = data.cat.breed;
            let genderCat = data.cat.gender;
            let colorCat = data.cat.color;
            let yearsCat = data.cat.years;
            let costCat = data.cost;
            let descCat = data.cat.description;

            cat_name.value = nameCat;
            cat_breed.value = breedCat;
            cat_gender.value = genderCat;
            cat_color.value = colorCat;
            cat_years.value = yearsCat;
            cat_cost.value = costCat;
            cat_desc.value = descCat;

            // catCost = cat_cost.value;
            catId = data.id;
        });
    // location.reload();
}

function deleteFunc(id){
    fetch('http://localhost:8080/positions/deletePosition/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'posId': id
        }
    })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data)));
    location.reload();
}

fetch('http://localhost:8080/positions/getPositions/')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const catInfo = document.getElementById("cat_info");

        for(let i = 0; i < data.length; i++){
            let dateCreate = data[i].dateCreated;
            let dateDateCreate = dateCreate.substring(0,10);
            let timeDateCreate = dateCreate.substring(11,19);

            let dateChange = data[i].dateChange;
            let dateDateChange = dateChange.substring(0,10);
            let timeDateChange = dateChange.substring(11,19);

            let getSale = data[i].onSale;
            let trueSale;
            if(getSale === true){
                trueSale = "В продаже";

                catInfo.innerHTML += '<div class="mt-3 alert alert-info"><span class="badge bg-success">' + trueSale + '</span><h3>' + data[i].cat.name + " " + '</h3>' +
                    '<h5>'+ "Порода: " + data[i].cat.breed + '</h5>' +
                    '<h5>' + "Пол: " + data[i].cat.gender + '</h5>' +
                    '<h5>' + "Цвет: " + data[i].cat.color + '</h5>' +
                    '<h5>' + "Лет жизни: " + data[i].cat.years + '</h5>' +
                    '<h5>' + "Стоимость: " + data[i].cost + "₽" + '</h5>' +
                    '<h5>Описание</h5><p>' + data[i].cat.description + '</p></br>' +
                    '<p>' + "Дата создания: " + dateDateCreate + " "  + timeDateCreate + '</p>' +
                    '<p>' + "Дата редактирования: " + dateDateChange + " "  + timeDateChange + '</p>' +
                    '<button id="buy_button" class="btn btn-success">Преобрести</button>' +
                    '<button id="put_button" class="btn btn-warning ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Редактировать</button>' +
                    '<button id="delete_button" class="btn btn-danger ms-2">Удалить</button>' +
                    '</div>';
            }
            else {
                trueSale = "Продано";

                catInfo.innerHTML += '<div class="mt-3 alert alert-info"><span class="badge bg-danger">' + trueSale + '</span><h3>' + data[i].cat.name + " " + '</h3>' +
                    '<h5>'+ "Порода: " + data[i].cat.breed + '</h5>' +
                    '<h5>' + "Пол: " + data[i].cat.gender + '</h5>' +
                    '<h5>' + "Цвет: " + data[i].cat.color + '</h5>' +
                    '<h5>' + "Лет жизни: " + data[i].cat.years + '</h5>' +
                    '<h5>' + "Стоимость: " + data[i].cost + "₽" + '</h5>' +
                    '<h5>Описание</h5><p>' + data[i].cat.description + '</p></br>' +
                    '<p>' + "Дата создания: " + dateDateCreate + " "  + timeDateCreate + '</p>' +
                    '<p>' + "Дата редактирования: " + dateDateChange + " "  + timeDateChange + '</p>' +
                    '<button id="buy_button" class="btn btn-success" disabled>Преобрести</button>' +
                    '<button id="put_button" class="btn btn-warning ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Редактировать</button>' +
                    '<button id="delete_button" class="btn btn-danger ms-2">Удалить</button>' +
                    '</div>';
            }
        }
        const elems = document.querySelectorAll('.btn-success');
        for(let j = 0; j < data.length; j++){
            elems[j].addEventListener("click", function () { put(data[j].id); }, true)
        }

        const putButtons = document.querySelectorAll('.btn-warning');
        for(let j = 0; j < data.length; j++){
            putButtons[j].addEventListener("click", function () { getAndPutElement(data[j].id); }, true)
        }

        const delButtons = document.querySelectorAll('.btn-danger');
        for(let j = 0; j < data.length; j++){
            delButtons[j].addEventListener("click", function () { deleteFunc(data[j].id); }, true)
        }

    });