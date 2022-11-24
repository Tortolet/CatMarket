function highlightThis(j) {
    alert(j);
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
                    '</div>'
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
                    '</div>'
            }
        }
        const elems = document.querySelectorAll('button');
        for(let j = 0; j < data.length; j++){
            elems[j].addEventListener("click", function () { put(data[j].id); }, true)
        }

    });