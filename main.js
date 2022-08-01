const form = document.getElementById("tipoFormulario");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let tipoFormularioData = new FormData(form);
    let convertirObj = convertirFormDataObj(tipoFormularioData)
    guardarObj(convertirObj)
    insertarEnTipoTabla(convertirObj)
    form.reset();


    // Estilo de alerta - Boton Agregar 
    Toastify({
        text: "Agregaste un articulo",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
})

document.addEventListener("DOMContentLoaded", function (event) {
    let convertirObjArray = JSON.parse(localStorage.getItem("transactionData"))
    convertirObjArray.forEach(
        function (arrayElement) {
            insertarEnTipoTabla(arrayElement)
        })
});

function convertirFormDataObj(tipoFormularioData) {

    let tipoSelector = tipoFormularioData.get("tipoSelector");
    let tipoDescripcion = tipoFormularioData.get("tipoDescripcion");
    let tipoMonto = tipoFormularioData.get("tipoMonto");
    let tipoCategoria = tipoFormularioData.get("tipoCategoria");

    return {

        "tipoSelector": tipoSelector,
        "tipoDescripcion": tipoDescripcion,
        "tipoMonto": tipoMonto,
        "tipoCategoria": tipoCategoria


    }
}


function insertarEnTipoTabla(convertirObj) {
    let tipoTablaRef = document.getElementById("tipoTabla");
    let newTipoRow = tipoTablaRef.insertRow(-1);

    newTipoRow.getAttribute("transactionID", convertirObj["transactionID"]);
    let newTipoDeCelda = newTipoRow.insertCell(0);
    newTipoDeCelda.textContent = convertirObj["tipoSelector"];

    newTipoDeCelda = newTipoRow.insertCell(1);
    newTipoDeCelda.textContent = convertirObj["tipoDescripcion"];

    newTipoDeCelda = newTipoRow.insertCell(2);
    newTipoDeCelda.textContent = convertirObj["tipoMonto"];

    newTipoDeCelda = newTipoRow.insertCell(3);
    newTipoDeCelda.textContent = convertirObj["tipoCategoria"];

    let newDeleteCelda = newTipoRow.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar"
    newDeleteCelda.appendChild(deleteButton)


    deleteButton.addEventListener("click", (event) => {
        let transactionRow = event.target.parentNode.parentNode;
        let transactionID = newTipoRow.getAttribute("transactionID", convertirObj["transactionID"]);
        transactionRow.remove();
        deleteconvertirObj();

        // Estilo de alerta - Boton Eliminar
        Toastify({
            text: "Eliminaste un articulo",
            className: "info",
            style: {
                background: "linear-gradient(to right, #FF2D00, #B53D23)",
            }
        }).showToast();
    }
    )
}


// Le paso como parametro el ID de la transaccion que quiero eliminar
function deleteconvertirObj(transactionID) {
    //Obtengo las transacciones de mi "LocalStorage" desconvierto de json a obj 
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData"))
    //Busco el indice que quiero eliminar 
    let transactionInArray = myTransactionArray.findIndex(element => element.transactionID === transactionID);
    //Elimino el elemento de esa posicion
    myTransactionArray.splice(transactionInArray, 1)
    //Convierto de obj a json 
    let convertirObjJson = JSON.stringify(myTransactionArray);
    //Guardo mi array de transaccion en formato JSON en el local storage
    localStorage.setItem("transactionData", convertirObjJson)
}

function guardarObj(convertirObj) {

    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(convertirObj)
    //Convierto mi array de transacion a json
    let convertirObjJson = JSON.stringify(myTransactionArray);
    //Guardo mi array de transaccion en formato JSON en el local storage
    localStorage.setItem("transactionData", convertirObjJson)

}

