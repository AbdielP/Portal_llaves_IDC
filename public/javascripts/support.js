const inputCode = document.getElementById('codigo');
const inputUbicacion = $('#form-addkey fieldset select#ubicacion')
const jaula_option = $('#jaula-option');
const edit_jaula_option = $('#edit-jaula-option')

const btn_update = $('#btn-update-keys');
const btn_addrj = $('#btn-addrj');
const show_edit_menu = document.getElementById('edit-keys-panel');
const edit_tipo_llave = document.getElementById('edit_tipo_llave');
const edit_codigo = document.getElementById('edit-codigo');
const edit_nombre = document.getElementById('edit-nombre');
const edit_client = document.getElementById('edit-cliente');
const hidden_id = document.getElementById('update-id');
const checkbox = document.getElementById('checklibre');
const divAlert = document.getElementById('div-alert'); 

const rj_counter = $('body').children('main').children('.row').children(); //rj_counter perderá su valor si modifico la posición de este elemento.
//VARIABLES PARA ABRIR PANELES
const btnNuevo = document.getElementById('btn-nuevo');
const form_panel = document.getElementById('form-panel');
const form_addRack = document.getElementById('rack-form-panel');
//VARIABLES PARA CERRAR PANELES
const btnClosePanel = document.getElementById('btn-close-form-panel');
const btnCloseRackPanel = document.getElementById('btn-close-rack-panel');
//VARIABLES PARA HideInputs
const inputTipo = $('#form-addkey fieldset select#tipo_llave');
const paOption = $('#pa-option');
//VARIABLE PARA LA BUSQUEDA DINAMICA
const input_search = document.getElementById('input-search');
//VARIABLES PARA CONTAR LLAVES EN PLANTAS
var contadorPB = 0;
var contadorPA = 0;
//Variable que guarda el año
var year;
var span_year = document.querySelector("#span_year")

$(document).ready(function(){
    $(btnNuevo).on("click",function(){
        HidePanel(form_panel);
    });
    $(btnClosePanel).on("click", function(){
        HidePanel(form_panel);
    });
    $(btnCloseRackPanel).on('click', function(){
        HidePanel(form_addRack);
    });
    $(input_search).on('keyup',Filter);
    
    year = getYear();
    span_year.innerHTML = year;
})

//OCULTA LOS PANELES AGREGAR LLAVE Y AGREGAR RACK EN JAULA
function HidePanel(panel){
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    };
};

//FUNCION PARA MOSTRAR ALERTAS 
function ShowAlert(div,clase,msg){
    div.classList.add(clase);
    div.style.display = "block";
    div.innerHTML = msg;
};
//FUNCION PARA OCULTAR ALERTAS
function HideAlert(div){   //Funcion para ocultar el nombre en el panel crear llave
    div.classList.remove('alert-danger');
    div.classList.remove('alert-success');
    div.style.display = "none";
    div.innerHTML = '';
};

//Funcion para resetear los valores del FORM crear key
function ResetForm(){
    $('#form-addkey fieldset select').prop('selectedIndex',0);
    $('#form-addkey fieldset input').prop('checked',false);
    $('#form-addkey fieldset input').val('');
    CheckLibre();
};

//Funcion para liber las llaves
function Release(ruta,id){
    var confirmation = confirm('Está seguro que desea colocar esta llave como "LIBRE"?');
    if(confirmation == true){
        var release = {
            // 'nombre' : "",
            'cliente': "libre",
            'libre' : 1,
        }
        Update(ruta,id,release);
        ShowAlert(divAlert,'alert-success','Llave Liberada con exito.');
        HideTime(divAlert)
    }else{
        return false;
    }
}

//Funcion para actualizar la info de las keys
function Update(ruta,id,arreglo){
    $.ajax({
        type: 'PUT',
        data: arreglo,
        url : 'users/'+ruta+'/' + id,
        dataType: 'JSON'
    }).done(function(){
    })
    ShowAlert(divAlert,'alert-success','Llave actualizada con exito.');
    HideTime(divAlert);
    if(ruta == 'updatekey'){
        Getkeys();
    }else{
        GetkeysBalboa();
    }
    // RefreshDivs();
}

//Código de llaves HOWARD
function SetKeyCode(){
    switch (inputUbicacion.val()) {
        case 'Planta Baja':
            inputCode.value = "3850A"+Pad(contadorPB+1,3);
            jaula_option.show();
        break;
        case 'Planta Alta':
            inputCode.value = '3850B'+Pad(contadorPA+1,3);
            jaula_option.hide();
        break;
        default:
            jaula_option.show();
        break;
    }
};

//Código de llaves BALBOA
function SetKeyCodeBal(){
    switch (inputUbicacion.val()) {
        case 'Planta Baja':
            inputCode.value = "0843A"+Pad(contadorPB+1,3);
        break;
        case 'Planta Alta':
            inputCode.value = '0843B'+Pad(contadorPA+1,3);
        break;
        default:
            jaula_option.show();
        break;
    }
};
//FUNCIÓN DE BUSQUEDA DE LLAVES
function Filter(){
    var value = $(this).val().toLowerCase();
    var divs = $('[id="card-key"]');
    $(divs).filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) >-1)
    })

}

//Función que añade/recorta ceros al codigo de llave
function Pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

//Función para el checkbox 'libre'
function CheckLibre(){
    var input_Cliente = $('#form-addkey fieldset input#cliente');
    if(checkbox.checked == true){
        input_Cliente.val('libre')
        input_Cliente.attr('disabled',true)
    }else{
        input_Cliente.val('')
        input_Cliente.attr('disabled',false)
    }
}

function HideInputs(){
    switch (inputTipo.val()) {
        case "Jaula":
            paOption.hide();
        break;
        default:
            paOption.show();
        break;
    };
};

function HideTime(div){
    setTimeout(function () {
        div.classList.remove('alert-danger');
        div.classList.remove('alert-success');
        div.style.display = "none";
        div.innerHTML = '';
    }, 5000);
    return false;
};

//Función para refrescar los DIVS que contienen las keys
function RefreshDivs(){
    $(contenPB).load(window.location.href + " #contenedor-planta-baja" );
    $(contenPA).load(window.location.href + " #contenedor-planta-alta" );
}

//Funcion para obtener el año
function getYear(year){
    year = new Date().getFullYear();
    return year;
}



// PENDIENTES OPTIMIZACIÓN

// 2 - Crear una FUNCION UNICA para esconder las opciones en los divs de los formularios crear y editar (esconder PA o Esconder Jaula)
// 3 - Mover las funciones de apoyo al script support.js