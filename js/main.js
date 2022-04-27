// Gestor de Cambios de Toner
// Este sistema permite gestionar el registro de cambios de toner en Impresoras Laser.
// Nos permite analizar la cantidad de copias impresas en cada cambio de toner para verificar si el rendimiento esta dentro de los parámetros esperados o no.
// En cada cambio, ingresamos el contador actual de la impresora, que indica la cantidad total de impresiones acumuladas desde su puesta en funcionamiento.
// El sistema realiza una diferencia entre en valor actual y el registrado en el último cambio de toner para determinar el rendimiento del mismo.
// Analiza si es superior o inferior al promedio de copias sugerido y almacena el nuevo valor.

// Declaracion de Variables:

const inputGrupoImpresoras = document.getElementById("inputGrupoImpresoras");
const inputGrupoToners = document.getElementById("inputGrupoToners");
const btnNuevaImpresora = document.getElementById("btnNuevaImpresora");
const formNuevaImpresora = document.getElementById("formNuevaImpresora");
const formCambioToner = document.getElementById("formCambioToner");
const btnCambioToner = document.getElementById("btnCambioToner");
const btnAgregarNuevaImpresora = document.getElementById("btnAgregarImpresora");
const listaCambiosToner = document.getElementById("listaCambiosToner");

let impresoras = [];
let campoNombre = document.getElementById("nombre");
let campoMarca = document.getElementById("marca");
let campoTipo = document.getElementById("tipo");
let campoModelo = document.getElementById("modelo");
let campoIp = document.getElementById("ip");
let campoTonerCompatible1 = document.getElementById("tonerCompatible1");
let campoTonerCompatible2 = document.getElementById("tonerCompatible2");
let campoTonerActualColocado = document.getElementById("tonerActualColocado");
let campoFechaTonerActualColocado = document.getElementById("fechaTonerActualColocado");
let campoUltimoContador = document.getElementById("ultimoContador");
let campoFechaCambio = document.getElementById("fechaCambio");
let campoActualContador = document.getElementById("actualContador");
let campoInputGrupoToners = document.getElementById("inputGrupoToners");
let totalImpresionesEmpresa = document.getElementById("totalImpresionesEmpresa");

// Declaracion de EventListeners:

inputGrupoImpresoras.addEventListener("change", mostrarInfoImpresora);
btnNuevaImpresora.addEventListener("click", prepararFormNuevaImpresora);
formNuevaImpresora.addEventListener("submit", agregarNuevaImpresora);
formCambioToner.addEventListener("submit", agregarCambioToner);
campoActualContador.addEventListener("change", verificarContador);

//inputFiltrar.addEventListener("keyup", opcionFiltrar);


// ********************************************** CLASES *****************************************************************
class Impresora {

    constructor(nombre, marca, tipo, modelo, ip, tonerCompatible1, tonerCompatible2, contador, historialCambios, tonerActualColocado, fechaTonerActualColocado) {
        // this.id = id;  // {Number} id - ID de la impresora.
        this.nombre = nombre;  // {String} Nombre de la impresora.
        this.marca = marca; // {String} Marca de la impresora.
        this.tipo = tipo; // {String} Tipo de Impresora.
        this.modelo = modelo; // {String} Modelo de Impresora.
        this.ip = ip; // {String} IP de Impresora.
        this.tonerCompatible1 = tonerCompatible1; // {String} 1ra opcion de Toner Compatible.
        this.tonerCompatible2 = tonerCompatible2; // {String} 2da opcion de Toner Compatible.
        this.contador = contador; // Inicializa contador de Immpresora.
        this.historialCambios = historialCambios; // Inicializa Historial de Cambios.
        this.tonerActualColocado = tonerActualColocado; // Toner Instalado actualmente.
        this.fechaTonerActualColocado = fechaTonerActualColocado; // Fecha en que se instaló el actual toner
    };

    actualizarContador(actualContador){
        this.contador = actualContador
    }

    actualizarTonerActualColocado(tonerActualColocado){
        this.tonerActualColocado = tonerActualColocado
    }  

    actualizarFechaTonerActualColocado(fechaTonerActualColocado){
        this.fechaTonerActualColocado = fechaTonerActualColocado
    }    

    cambiarToner(cambioToner){
        this.historialCambios.push(cambioToner)
    }
}

class CambioToner {
    constructor(fechaCambio, contadorPaginas, modeloToner, rendimientoPaginas, rendimientoDias){
        this.fechaCambio = fechaCambio;
        this.contadorPaginas = contadorPaginas;
        this.modeloToner = modeloToner;
        this.rendimientoPaginas = rendimientoPaginas;
        this.rendimientoDias = rendimientoDias;
    }
}

// ********************************************** FUNCIONES *****************************************************************

// function opcionFiltrar(){
//     limpiarTabla();
//     actualizarTabla(filtrarImpresorasPorToner(impresoras));
//     tituloTabla = document.getElementById("tituloTabla");
//     tituloTabla.innerText = "Listado de Impresoras filtradas por Toner Seleccionado:";
// }

// function filtrarImpresorasPorToner(impresoras){         // Filtrado de Impresoras por modelo de Toner
//     toner = inputFiltrar.value.toUpperCase();
//     const impresorasPorToner = impresoras.filter((el) => el.modeloToner.includes(toner));
//     return impresorasPorToner;
// }

// SPREAD DE ARRAY
function sumarContadoresImpresoras(contadores){
    console.log(contadores);
    let suma = (math.add(...contadores));
    return suma;
}

function mostrarTotalImpresionesEmpresa() {
    let contadores = [];
    for (const impresora of impresoras){
        contadores.push(impresora.contador);
    }
    totalImpresionesEmpresa.innerText = sumarContadoresImpresoras(contadores);
}

function limpiarTablaCambiosToner(){    // Limpiar la tabla de Cambios de Toner
    listaCambiosToner.innerHTML = ``;
}

function completarLinea(cambio){        // Armar linea con cambio de Toner para mostrar en Tabla
    
    return `<th>${dateFns.format(cambio.fechaCambio, 'DD/MM/YYYY')}</th>      
            <th>${cambio.contadorPaginas}</th>
            <th>${cambio.modeloToner}</th>
            <th>${cambio.rendimientoPaginas}</th>
            <th>${cambio.rendimientoDias}</th>`;     // Muestro la fecha en formato DD/MM/AAAA pero esta almacenada en formato Original
}

function actualizarTablaCambioToner() {     // Actualizar Tabla de Cambios de Toner

    limpiarTablaCambiosToner();
    const impresora = obtenerImpresoraDesdeArray();
    const cambiosToner = impresora.historialCambios;

    for(const cambio of cambiosToner){
        const linea = document.createElement("tr");
        linea.innerHTML = completarLinea(cambio);        
        listaCambiosToner.append(linea);    // agregar a tbody
    }
}

function verificarContador(){   // Verificar si el contador ingresado es menor al último registrado
    const impresora = obtenerImpresoraDesdeArray();
    if (parseInt(campoActualContador.value) < impresora.contador){
        swal({
            title: "Error",
            text: "El contador actual no puede ser inferior al último registrado",
            icon: "error",
            button: "Aceptar",
        });    
        campoActualContador.value = "";
    }
    console.log(impresora.contador)
}

function agregarCambioToner(e){     // Agregar Cambio de Toner
    e.preventDefault();
    let fechaCambio = campoFechaCambio.value;
    let inputGrupoToners = campoInputGrupoToners.value;
    const impresora = obtenerImpresoraDesdeArray();
    let nuevoTonerActualColocado = impresora.tonerActualColocado;
    let nuevaFechaActualTonerColocado = impresora.fechaTonerActualColocado;
    impresora.actualizarTonerActualColocado(inputGrupoToners);
    impresora.actualizarFechaTonerActualColocado(fechaCambio);
    
    let actualContador = parseInt(campoActualContador.value);
    let rendimientoPaginas = actualContador - impresora.contador;
    impresora.actualizarContador(actualContador);
    let rendimientoDias = dateFns.differenceInDays(fechaCambio, nuevaFechaActualTonerColocado);

    const cambioToner = new CambioToner (nuevaFechaActualTonerColocado, actualContador, nuevoTonerActualColocado, rendimientoPaginas, rendimientoDias)

    impresora.cambiarToner(cambioToner);
    formCambioToner.reset();

    campoUltimoContador.value = impresora.contador;

    actualizarTablaCambioToner()
    actualizarLocalStorage();
    mostrarTotalImpresionesEmpresa();
    mostrarInfoImpresora();
}

function crearImpresora(nuevoNombre, nuevoMarca, nuevoTipo, nuevoModelo, nuevoIp, nuevoTonerCompatible1, nuevoTonerCompatible2, nuevoContador, nuevoHistorialCambios, nuevoTonerActualColocado, nuevoFechaTonerActualColocado) {
    const impresoraNueva = new Impresora(nuevoNombre, nuevoMarca, nuevoTipo, nuevoModelo, nuevoIp, nuevoTonerCompatible1, nuevoTonerCompatible2, nuevoContador, nuevoHistorialCambios, nuevoTonerActualColocado, nuevoFechaTonerActualColocado);
    impresoras.push(impresoraNueva);
}

function nombreImpresoraRepetido(nombreParaVerificar){
    return impresoras.find((el) => el.nombre.includes(nombreParaVerificar));
}

function agregarNuevaImpresora(e){      // Agregar Nueva Impresora
    e.preventDefault();

    let nuevoNombre = campoNombre.value;
    let nuevoMarca = campoMarca.value;
    let nuevoTipo = campoTipo.value;
    let nuevoModelo = campoModelo.value;
    let nuevoIp = campoIp.value;
    let nuevoTonerCompatible1 = campoTonerCompatible1.value.toUpperCase();
    let nuevoTonerCompatible2 = campoTonerCompatible2.value.toUpperCase();
    let nuevoTonerActualColocado = campoTonerActualColocado.value.toUpperCase();
    let nuevoFechaTonerActualColocado = campoFechaTonerActualColocado.value;
    let nuevoContador = 0;
    let nuevoHistorialCambios = [];

    // OPERADOR TERNARIO
    !nombreImpresoraRepetido(nuevoNombre) ? crearImpresora(nuevoNombre, nuevoMarca, nuevoTipo, nuevoModelo, nuevoIp, nuevoTonerCompatible1, nuevoTonerCompatible2, nuevoContador, nuevoHistorialCambios, nuevoTonerActualColocado, nuevoFechaTonerActualColocado) : 
    swal({
        title: "Error",
        text: "El nombre de impresora ingresado ya existe",
        icon: "error",
        button: "Aceptar",
    });

    formNuevaImpresora.reset();
    inputGrupoImpresoras.disabled = false;
    btnAgregarNuevaImpresora.disabled = true;
    btnCambioToner.disabled = false;
    armarInputGrupoImpresoras(impresoras);

    actualizarLocalStorage();

    console.log(impresoras);
}

function prepararFormNuevaImpresora(){      // Preparar Formulario para completar datos de nueva impresora
    inputGrupoImpresoras.disabled = true;
    btnAgregarNuevaImpresora.disabled = false;
    btnCambioToner.disabled = true;
    formNuevaImpresora.reset();
    campoFechaTonerActualColocado.valueAsDate = new Date();   
}

function armarInputGrupoToners(impresora){  // Armar Select con las impresoras disponibles en la base

    let opciones = `<option>${impresora.tonerCompatible1}</option>
                    <option>${impresora.tonerCompatible2}</option>`;
    inputGrupoToners.innerHTML = opciones;
}

function obtenerImpresoraDesdeArray(){      // Obtener impresora seleccionada desde el Array
    let nombreImpresora = inputGrupoImpresoras.value;
    const impresora = impresoras.find((el) => el.nombre.includes(nombreImpresora));
    return (impresora);
}

function mostrarInfoImpresora(){            // Mostrar informacion de la impresora seleccionada
    const impresora = obtenerImpresoraDesdeArray();

    // DESESTRUCTURACION 
    const {nombre, marca, tipo, modelo, ip, tonerCompatible1, tonerCompatible2, tonerActualColocado, fechaTonerActualColocado, contador} = impresora;
    
    campoNombre.value = nombre;
    campoMarca.value = marca;
    campoTipo.value = tipo;
    campoModelo.value = modelo;
    campoIp.value = ip;
    campoTonerCompatible1.value = tonerCompatible1;
    campoTonerCompatible2.value = tonerCompatible2;
    campoTonerActualColocado.value = tonerActualColocado;
    campoFechaTonerActualColocado.value = fechaTonerActualColocado;   // Probar con .valueAsDate
    campoUltimoContador.value = contador;
    campoFechaCambio.valueAsDate = new Date(); 

    armarInputGrupoToners(impresora);
    actualizarTablaCambioToner()
}

function armarInputGrupoImpresoras (impresoras){    // Armar Select con los toners registrados en la impresora
    
    inputGrupoImpresoras.innerHTML = ``;

    for(const impresora of impresoras){
        const opcion = document.createElement("option");
        opcion.innerText = impresora.nombre;
        inputGrupoImpresoras.append(opcion);    // agregar a tbody
    }
}

function actualizarLocalStorage(){      // Actualizar base de datos en Local Storage
    baseEnJSON = JSON.stringify(impresoras);
    localStorage.setItem("impresoras",baseEnJSON);
}

function instanciarObjetosImportados (impresorasAlmacenadas){
    for (const impresora of impresorasAlmacenadas){
        impresoras.push(new Impresora(impresora.nombre, impresora.marca, impresora.tipo,impresora.modelo, impresora.ip,impresora.tonerCompatible1,impresora.tonerCompatible2,impresora.contador,impresora.historialCambios, impresora.tonerActualColocado, impresora.fechaTonerActualColocado ))
     }
     return true;
}

function importarLocalStorage(){        // Importar info desde Local Storage
    let impresorasAlmacenadas = JSON.parse(localStorage.getItem("impresoras"));
    // ASIGNACION CONDICIONAL
    const importacionCorrecta = impresorasAlmacenadas ? instanciarObjetosImportados(impresorasAlmacenadas) : false;
    return importacionCorrecta
}

function crearArrayImpresoras(){    // Array de Impresoras de Ejemplo
    const ventas = new Impresora("Ventas", "HP", "LaserJet", "M608dn", "10.18.89.16", "237A","",0,[],"237A","2022-02-01");  // Objetos de ejemplo
    const calidad = new Impresora("Calidad", "Samsung", "Multifuncion", "SL-M4072FD", "10.18.89.26", "D203U","",0,[],"D203U","2022-01-03"); //
    const despacho = new Impresora("Despacho", "HP", "LaserJet", "P4015n", "10.18.89.13", "CC364A","CC364X",0,[],"CC364A","2021-11-02");

    impresoras = [ventas, calidad, despacho];

    console.log("CrearArrayImpresoras");
}

function inicio (){
    
    // OPERADOR OR
    importarLocalStorage() || crearArrayImpresoras(); // Si no existe Info en LocalStorage genera impresoras de Ejemplo.

    console.log(impresoras);
    
    armarInputGrupoImpresoras(impresoras);
    mostrarInfoImpresora();

    mostrarTotalImpresionesEmpresa();
    
}

// ********************************************** INICIO *****************************************************************

inicio();
