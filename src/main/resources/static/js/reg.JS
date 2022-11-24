function test(){
    fetch('http://localhost:8080/users/createUsers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "username": document.getElementById("floatingInput").value,
                "password" : document.getElementById("floatingPassword").value,
                "passwordConfirm" : document.getElementById("floatingPasswordConfirm").value
            })
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}
function success() {
    if(document.getElementById("floatingInput").value==="" || document.getElementById("floatingPassword").value==="" || document.getElementById("floatingPasswordConfirm").value==="") {
        document.getElementById('buttonSuccess').disabled = true;
    } else {
        document.getElementById('buttonSuccess').disabled = false;
    }
}