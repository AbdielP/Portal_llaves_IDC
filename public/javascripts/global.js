const rjcodigo = document.getElementById('rjcodigo')

const contenPB = $('#contenedor-planta-baja');
const contenPA = $('#contenedor-planta-alta')

const inputCliente = $('#div-input-cliente');
const editableInputs = $('[id="editable-input"]');
const users_ruta = 'updatekey';

var rjid = $('#rjid');
var contador_racks = 0;

$(document).ready(function(){
    ResetForm();
    Getkeys();
    $('#form-addkey').on('submit', AddKey); 
    $("body").on("click", "#linkDeleteKey", DeleteKey); 
    $("body").on("click", "#btnEditKey", EditKey); 
    // $("body").on("click", "#card-key input[type=text]", UpdateKey);
    $("body").on("click", "#btn-add-rack", AddRackCage);
    $("body").on("click", "#link-deleterj",EnableDeleteRj);
    $("body").on("click", "#btn-liberar", function(){
        var id = $(this).siblings('#btnEditKey').attr('rel');
        Release(users_ruta,id);
    });
    $("#btn-close-edit-panel").on('click',function(){
        var this_panel = document.getElementById('edit-keys-panel');
        HidePanel(this_panel);
    });
    //ACTUALIZAR LOS DATOS DE LA LLAVE DESDE EL FORM
    $('#form-update-keys').on('submit',function(event){
        event.preventDefault();
        var id = btn_update.attr('rel');
        var upKey = {
            'tipo_llave': edit_tipo_llave.value.toLowerCase(),
            'nombre' : edit_nombre.value,
            'cliente': edit_client.value,
        }
        Update(users_ruta,id,upKey)
    });
    //SETEAR 'LIBRE' Desde el form update
    $('#btn-form-keyrelease').on('click',function(event){
        event.preventDefault();
        var id = btn_update.attr('rel');
        Release(users_ruta,id);
    });
});

function Getkeys(){
    var keysContent = '';
    var keysContentPA = '';
    contadorPB = 0;
    contadorPA = 0;
    $.getJSON('/users/keys', function(data){
        $.each(data,function(){
            if(this.ubicacion == 'planta baja' && this.tipo_llave != 'jaula'){
                keysContent += '<div class="key-container mb-1 '+this.tipo_llave+' '+this.cliente+'" id="card-key">';
                keysContent +=   '<div class="d-flex flex-nowrap justify-content-around keys">';
                keysContent +=      '<div class="d-flex flex-column div-20" id="div-getCodigo">';
                keysContent +=          '<label class="m-0 p-0" for="key-codigo">Código</label>';
                keysContent +=          '<h6 id="key-codigo"><b>'+this.codigo+'</b></h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="borleft div-20" id="div-getTipo">';
                keysContent +=          '<label class="m-0 p-0 capitalized" for="key-nombre" id="label-tipo">'+this.tipo_llave+'</label>';
                keysContent +=          '<h6 class="capitalized" id="key-nombre"><b>'+this.nombre+'</b></h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-column borleft div-100" id="div-getCliente">';
                keysContent +=          '<label class="m-0 p-0" for="key-descripcion">Cliente</label>'; 
                keysContent +=          '<h6 class="capitalized" id="key-descripcion">'+this.cliente+'</h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-column justify-content-center borleft div-20" id="div-getUbicacion">';
                keysContent +=          '<h6 class="capitalized">'+this.ubicacion+'</h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-column flex-nowrap borleft div-btns">';
                keysContent +=          '<div class="bordown">';
                keysContent +=              '<button type="button" class="btn key-btns" id="btn-liberar" title="Liberar llave"><i class="fas fa-broom btn-yell"></i></button>';
                keysContent +=              '<button type="button" class="btn key-btns" rel="' + this._id + '" id="btnEditKey" title="Editar llave"><i class="far fa-edit btn-green"></i></button>';
                // keysContent +=              '<a href="#" class="btn key-btns" rel="' + this._id + '" id="linkDeleteKey" title="Eliminar llave"><i class="far fa-times-circle btn-red"></i></a>';
                keysContent +=          '</div>';
                keysContent +=          '<div class="d-flex flex-row flex-nowrap justify-content-around ">';
                keysContent +=              '<p class="p-0 m-0"><small>Editado: Usuario</small></p>';
                keysContent +=              '<p class="p-0 m-0"><small>Fecha: 00/00/00</small></p>';
                keysContent +=          '</div>';
                keysContent +=      '</div>';
                keysContent +=   '</div>';
                keysContent += '</div>';
                contadorPB++;

                contenPB.html(keysContent);
            }else if(this.tipo_llave  == 'jaula'){

                keysContent += '<div class="key-container mb-1 '+this.tipo_llave+' '+this.cliente+'" rel="' + this._id + '" id="card-key">';
                keysContent +=   '<div class="d-flex flex-nowrap justify-content-around keys" id="keys-info">';
                keysContent +=      '<div class="d-flex flex-column div-20" id="div-getCodigo">';
                keysContent +=          '<label class="m-0 p-0" for="key-codigo">Código</label>';
                keysContent +=          '<h6 id="key-codigo"><b>'+this.codigo+'</b></h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="borleft div-20" id="div-getTipo">';
                keysContent +=          '<label class="m-0 p-0 capitalized" for="key-nombre" id="label-tipo">'+this.tipo_llave+'</label>';
                keysContent +=          '<h6 class="capitalized" id="key-nombre"><b>'+this.nombre+'</b></h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-column borleft div-100" id="div-getCliente">';
                keysContent +=          '<label class="m-0 p-0" for="key-descripcion">Cliente</label>';
                keysContent +=          '<h6 class="capitalized" id="key-descripcion">'+this.cliente+'</h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-column justify-content-center borleft div-20" id="div-getUbicacion">';
                keysContent +=          '<h6 class="capitalized">'+this.ubicacion+'</h6>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-column flex-nowrap borleft div-btns">';
                keysContent +=        '<div class="bordown">';
                keysContent +=          '<button type="button" class="btn key-btns" id="btn-liberar" title="Liberar llave"><i class="fas fa-broom btn-yell"></i></button>';
                keysContent +=          '<button type="button" class="btn key-btns" rel="' + this._id + '" id="btnEditKey" title="Editar llave" ><i class="far fa-edit btn-green"></i></button>';
                // keysContent +=          '<a href="#" class="btn key-btns" rel="' + this._id + '" id="linkDeleteKey" title="Eliminar llave"><i class="far fa-times-circle btn-red"></i></a>';
                keysContent +=      '</div>';
                keysContent +=      '<div class="d-flex flex-row flex-nowrap justify-content-around">';
                keysContent +=          '<p class="p-0 m-0"><small>Editado: Usuario</small></p>';
                keysContent +=          '<p class="p-0 m-0"><small>Fecha: 00/00/00</small></p>';
                keysContent +=      '</div>';
                keysContent +=    '</div>';
                keysContent += '</div>';

                keysContent += '<div class="d-flex flex-row flex-nowrap bordup p-1" id="rj-div">';
                keysContent +=    '<div class="d-flex flex-column pl-2">';
                keysContent +=      '<label class="m-0" for="btn-add-rack">Añadir rack</label>';
                keysContent +=      '<button type="button" class="btn-add-rack" id="btn-add-rack" title="Añadir rack"><i class="far fa-plus-square"></i></button>';
                keysContent +=    '</div>';
                //- > un elemento i por cada rack adicional
                                    if(this.racks){
                                        contador_racks = 0;
                                        for(i = 0; i < this.racks.length; i++){
                                            var array = [this.racks[i]];
                                            // console.log(array[0])
                keysContent +=    '<div class="d-flex flex-row pl-2" id="container-rj">';
                keysContent +=       '<div class="rj-contenido d-flex flex-nowrap" rel="' + this._id + '">';                
                keysContent +=          '<div class="rj-portanombre d-flex flex-column justify-content-center">';
                keysContent +=              '<a href="#" class="" id="link-deleterj" title="' + array[0].datarj.rjcodigo+ '" rel="' + array[0].datarj.id+ '">'+array[0].datarj.rjnombre+'</a>';
                //keysContent +=              '<a href="#" class="" id="link-deleterj" title="' + array[0].rjcodigo+ '" rel="' + array[0]._id+ '">'+array[0].rjnombre+'</a>';
                keysContent +=          '</div>';
                keysContent +=          '<div class="rj-portabtn d-flex flex-column">';
                keysContent +=              '<button type="button" class="" id="btn-delete-rack" title="Eliminar rack" disabled><i class="far fa-minus-square"></i></button>';
                keysContent +=              '<button type="button" class="" id="" title="Actualizar rack" disabled><i class="far fa-edit"></i></button>';
                keysContent +=          '</div>';
                keysContent +=      '</div>';
                keysContent +=    '</div>';
                                    contador_racks++
                                    }
                                }
                keysContent +=   '</div>';
                keysContent += '</div>';
                contadorPB++;

                contenPB.html(keysContent);
            }else if(this.ubicacion == 'planta alta'){
                keysContentPA += '<div class="key-container mb-1 '+this.tipo_llave+'PA '+this.cliente+'" id="card-key">';
                keysContentPA +=   '<div class="d-flex flex-nowrap justify-content-around keys">';
                keysContentPA +=      '<div class="d-flex flex-column div-20" id="div-getCodigo">';
                keysContentPA +=          '<label class="m-0 p-0" for="key-codigo">Código</label>';
                keysContentPA +=          '<h6 id="key-codigo"><b>'+this.codigo+'</b></h6>';
                keysContentPA +=      '</div>';
                keysContentPA +=      '<div class="borleft div-20 " id="div-getTipo">';
                keysContentPA +=          '<label class="m-0 p-0 capitalized" for="key-nombre" id="label-tipo">'+this.tipo_llave+'</label>';
                keysContentPA +=          '<h6 class="capitalized" id="key-nombre"><b>'+this.nombre+'</b></h6>';
                keysContentPA +=      '</div>';
                keysContentPA +=      '<div class="d-flex flex-column borleft div-100" id="div-getCliente">';
                keysContentPA +=          '<label class="m-0 p-0" for="key-descripcion">Cliente</label>'; 
                keysContentPA +=          '<h6 class="capitalized" id="key-descripcion">'+this.cliente+'</h6>';
                keysContentPA +=      '</div>';
                keysContentPA +=      '<div class="d-flex flex-column justify-content-center borleft div-20" id="div-getUbicacion">';
                keysContentPA +=          '<h6 class="capitalized">'+this.ubicacion+'</h6>';
                keysContentPA +=      '</div>';
                keysContentPA +=      '<div class="d-flex flex-column flex-nowrap borleft div-btns">';
                keysContentPA +=          '<div class="bordown">';
                keysContentPA +=              '<button type="button" class="btn key-btns" id="btn-liberar" title="Liberar llave"><i class="fas fa-broom btn-yell"></i></button>';
                keysContentPA +=              '<button type="button" class="btn key-btns" rel="' + this._id + '" id="btnEditKey" title="Editar llave" ><i class="far fa-edit btn-green" ></i></button>';
                // keysContentPA +=              '<a href="#" class="btn key-btns" rel="' + this._id + '" id="linkDeleteKey" title="Eliminar llave"><i class="far fa-times-circle btn-red"></i></a>';
                keysContentPA +=          '</div>';
                keysContentPA +=          '<div class="d-flex flex-row flex-nowrap justify-content-around ">';
                keysContentPA +=              '<p class="p-0 m-0"><small>Editado: Usuario</small></p>';
                keysContentPA +=              '<p class="p-0 m-0"><small>Fecha: 00/00/00</small></p>';
                keysContentPA +=          '</div>';
                keysContentPA +=      '</div>';
                keysContentPA +=   '</div>';
                keysContentPA += '</div>';
                contadorPA++;

                contenPA.html(keysContentPA);
            }
        })
        //Final del Foreach
    });
};

function AddKey(event){
    event.preventDefault();
    var newKey = {
        'tipo_llave': $(inputTipo).val().toLowerCase(),
        'codigo': $('#form-addkey fieldset input#codigo').val().toUpperCase() ,
        'ubicacion': $('#form-addkey fieldset select#ubicacion').val().toLowerCase(),
        'nombre': $('#form-addkey fieldset input#nombre').val(),
        'cliente': $('#form-addkey fieldset input#cliente').val(),
    };
    
    if(newKey.tipo_llave == 'jaula' && newKey.ubicacion == 'planta alta'){
        ShowAlert(divAlert,'alert-danger','No se puede crear Jaula en ubicación "Planta Alta".');
    }else{
        $.ajax({
            type: 'POST',
            data: newKey,
            url : '/users/addkey',
            dataType: 'JSON'
        }).done(function(response){
            if (response.msg === '') {
                // Limpiar los Inputs y Selects del form
                ResetForm();
                ShowAlert(divAlert,'alert-success','Llave creada con exito.');
                Getkeys();
                HideTime(divAlert);
              }
              else {
                ShowAlert(divAlert,'alert-danger','Error en la creación de Llave.');
                HideTime(divAlert);
              }
        });
    };
};

//FUNCIÓNES PARA AÑADIR LAS LLAVES/RACKS DENTRO DE LAS JAULAS
function AddRackCage(){
    HidePanel(form_addRack);
    var contador_rjs = 1;
    var rjs = $(this).parent().parent("#rj-div").children('#container-rj');
    for (let index = 0; index < rjs.length; index++) {
        contador_rjs++;
    }
    var id = $(this).parent().parent('#rj-div').parent('#card-key').attr('rel');
    btn_addrj.attr('rel',id);
    rjid.attr('rel',contador_rjs)
    //VARIABLE PARA OBTENER EL CODIGO DE LA LLAVE PARA LOS RACKS EN JAULA
    var get_code = $(this).parent().parent('#rj-div').siblings('#keys-info').children('#div-getCodigo').children('#key-codigo').text();
    //HAY QUE HACER UN ARREGLO QUE ALMACENE CUANTOS CHILDS HAY A PARTIR DE #div-rj, ese contador me dará la cantidad de racks en cada jaula
    rjcodigo.value = get_code+"."+contador_rjs;
};

$('#form-addrj').on('submit', function(event){
    event.preventDefault();
    var id = btn_addrj.attr('rel');
    var updateRj = {
        'id' : $('#rjid').attr('rel'),
        'rjcodigo' : $('#rjcodigo').val(),
        'rjnombre' : $('#rjnombre').val()
    }
    $.ajax({
        type: 'PUT',
        data: updateRj,
        url : '/users/addrj/' + id,
        dataType: 'JSON'
    }).done(function(data){
        console.log('Inserción correcta en BD: ' + data);
    })
    // RefreshDivs();
    Getkeys();
});

//FUNCIÓN PARA ELIMINAR LAS LLAVES/RACKS DENTRO DE LAS JAULAS
function EnableDeleteRj(event){
    event.preventDefault();
    var rjid = $(this).parent().parent().attr('rel');
    var thisDltBtn = $(this).parent().siblings().find('#btn-delete-rack');
    thisDltBtn.removeAttr('disabled');
    thisDltBtn.on('click',function(){
        // var test = $(this).parent().siblings().find('#link-deleterj').attr('title');
        // console.log(test)
        var confirmationRJ = confirm('¿Está seguro que deséa eliminar esta llave?')
        if(confirmationRJ == true){
            var deleteRj = {
                'id' : $(this).parent().siblings().find('#link-deleterj').attr('rel'),
                'rjcodigo' : $(this).parent().siblings().find('#link-deleterj').attr('title'),
                'rjnombre' : $(this).parent().siblings().find('#link-deleterj').text(),
            }
            $.ajax({
                type: 'PUT',
                data: deleteRj,
                url : '/users/deleterj/' + rjid,
                dataType: 'JSON'
            }).done(function(data){
                console.log('Eliminacion correcta en BD: ' + data);
            })
            Getkeys();
            // RefreshDivs();
        }
    });
};

//Funcion para copiar la info de las llaves al panel de edición
function EditKey(){
    var hide_input_on_edit = $(this).parent().parent().siblings('#div-getUbicacion').children('h6').text();
    if(hide_input_on_edit == 'planta alta'){
        edit_jaula_option.hide();
    }else{
        edit_jaula_option.show();
    }
    hidden_id.value = $(this).attr('rel');
    var tipo = $(this).parent().parent().siblings('#div-getTipo').children('#label-tipo').text();
    edit_tipo_llave.value = tipo.charAt(0).toUpperCase()+tipo.slice(1);
    edit_codigo.value = $(this).parent().parent().siblings('#div-getCodigo').children('#key-codigo').text();
    edit_nombre.value = $(this).parent().parent().siblings('#div-getTipo').children('#key-nombre').text();
    edit_client.value = $(this).parent().parent().siblings('#div-getCliente').children('#key-descripcion').text();
    btn_update.attr('rel',hidden_id.value)

    HidePanel(show_edit_menu);
};

//FUNCIÓN PARA REALIZAR UPDATE presionando ENTER en un input especifico - NO SE USA(!NO BORRAR, ARCHIVAR)
function UpdateKey(){
    $(this).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        //value del Input
        var inputVal = $(this).val();
        //name del Input
        var name = $(this).attr('name');
        //Id de la llave
        var id = $(this).attr('rel');
        var upKey = {}
        upKey[name] = inputVal;
        // console.log(upKey)
        if(keycode == '13'){
            $.ajax({
                type: 'PUT',
                data: upKey,
                url : '/users/updatekey/' + id,
                dataType: 'JSON'
            }).done(function(data){
                // console.log('Inserción correcta en BD: ' + data);
            })
            RefreshDivs();
            Getkeys();
        }
    })
};

function DeleteKey(event){
    event.preventDefault();
    var confirmation = confirm('¿Está seguro que deséa eliminar esta llave?')
    // if(confirmation == true){
    //     var confPromt = prompt("Escriba 'BORRAR' para confirmar que deséa eliminar esta llave.");
    // }
    
    // if(confPromt == "BORRAR"){
    if(confirmation == true){
        $.ajax({
            type: 'DELETE',
            url : '/users/deletekey/' + $(this).attr('rel')
        }).done(function(){
            RefreshDivs();
            Getkeys();
            ShowAlert(divAlert,'alert-danger','Llave eliminada con exito.');
            HideTime(divAlert);
        }).fail(function(){
            ShowAlert(divAlert,'alert-danger','Error en la eliminación de la Llave.')
            HideTime(divAlert);
            Getkeys();
            RefreshDivs();
        });
    }else{
        return false;
    }
};

// QUEDÉ AQUÍ - 5/12/2018

/*PRIORITARIO: 
        **CUANDO VAYA A AÑADIR UN RACK EN JAULA, EN EL FORMULARIO AÑADIR RJ SE DEBE LLENAR AUTOMATICAMENTE EL CAMPO CODIGO CON EL CODIGO DE LA JAULA
        PADRE, Y EL NOMBRE DEL RACK DEBE TOMAR EL DEL PADRE Y SOLO AGREGARSE LA LETRA CORRESPONDIENTE.
*/

//    1) CREAR UNA LISTA DE LLAVES DISPONIBLES
        // 1.1 ) al crear una llave nueva debe salir una lista que muestre cuales están disponibles (Libres)
//    2) VALIDACIONES: Validar que el RACK o JAULA no existan ya en las plantas.
//    3) Trabajar en el diseño de la pagina
        // 3.1) Hacer los paneles arrastrables       
    // 4) Añadir el ordenamiento de los racks, por código o por rack

    // 5) El boton eliminar rack en jaula debe desactivarse si se le vuelve a dar click al #link-deleterj
    // 6) Diseñar el contador de racjs en jaula y añadir el contador de llaves por planta
