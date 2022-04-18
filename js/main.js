// Gestor de Cambios de Toner
// Este sistema permite gestionar el registro de cambios de toner en Impresoras Laser.
// Nos permite analizar la cantidad de copias impresas en cada cambio de toner para verificar si el rendimiento esta dentro de los parámetros esperados o no.
// En cada cambio, ingresamos el contador actual de la impresora, que indica la cantidad total de impresiones acumuladas desde su puesta en funcionamiento.
// El sistema realiza una diferencia entre en valor actual y el registrado en el último cambio de toner para determinar el rendimiento del mismo.
// Analiza si es superior o inferior al promedio de copias sugerido y almacena el nuevo valor.

const inputGrupoImpresoras = document.getElementById("inputGrupoImpresoras");
const inputGrupoToners = document.getElementById("inputGrupoToners");
const btnNuevaImpresora = document.getElementById("btnNuevaImpresora");
const formNuevaImpresora = document.getElementById("formNuevaImpresora");
const formCambioToner = document.getElementById("formCambioToner");
const btnCambioToner = document.getElementById("btnCambioToner");
const btnAceptarNuevaImpresora = document.getElementById("btnAceptarImpresora");
const listaCambiosToner = document.getElementById("listaCambiosToner");

let impresoras = [];
let campoNombre = document.getElementById("nombre");
let campoMarca = document.getElementById("marca");
let campoTipo = document.getElementById("tipo");
let campoModelo = document.getElementById("modelo");
let campoIp = document.getElementById("ip");
let campoTonerCompatible1 = document.getElementById("tonerCompatible1");
let campoTonerCompatible2 = document.getElementById("tonerCompatible2");
let campoUltimoContador = document.getElementById("ultimoContador");
let campoFechaCambio = document.getElementById("fechaCambio");
let campoActualContador = document.getElementById("actualContador");
let campoInputGrupoToners = document.getElementById("inputGrupoToners");

inputGrupoImpresoras.addEventListener("change", mostrarInfoImpresora);
btnNuevaImpresora.addEventListener("click", prepararFormNuevaImpresora);
formNuevaImpresora.addEventListener("submit", aceptarNuevaImpresora);
formCambioToner.addEventListener("submit", aceptarCambioToner);
campoActualContador.addEventListener("change", verificarContador);

//inputFiltrar.addEventListener("keyup", opcionFiltrar);


// ********************************************** CLASES *****************************************************************
class Impresora {

    constructor(nombre, marca, tipo, modelo, ip, tonerCompatible1, tonerCompatible2, contador, historialCambios) {
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
    };

    actualizarContador(actualContador){
        this.contador = actualContador
    }

    cambiarToner(cambioToner){
        this.historialCambios.push(cambioToner)
    }

    // cambiarToner(nuevoContador) { // Si el contador es un valor válido, aplica el cambio y actualiza los datos en el objeto
    //     if (nuevoContador > this.consultarContador()) {
    //         this.verificarRendimiento(contadorCambio);
    //         this.actualizarContador(contadorCambio);
    //         alert("Se realizó el cambio correctamente.");
    //     } else {
    //         alert("Error en el contador ingresado");
    //     }
    // }
}

class CambioToner {
    constructor(fechaCambio, contadorPaginas, modeloToner, rendimientoPaginas){
        this.fechaCambio = fechaCambio;
        this.contadorPaginas = contadorPaginas;
        this.modeloToner = modeloToner;
        this.rendimientoPaginas = rendimientoPaginas;
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

function limpiarTablaCambiosToner(){
    listaCambiosToner.innerHTML = ``;
}

function completarLinea(cambio){
    
    return `<th>${cambio.fechaCambio}</th>
            <th>${cambio.contadorPaginas}</th>
            <th>${cambio.modeloToner}</th>
            <th>${cambio.rendimientoPaginas}</th>`; 
}

function actualizarTablaCambioToner() {     

    limpiarTablaCambiosToner();
    const impresora = obtenerImpresoraDesdeArray();
    const cambiosToner = impresora.historialCambios;

    for(const cambio of cambiosToner){
        const linea = document.createElement("tr");
        linea.innerHTML = completarLinea(cambio);        
        listaCambiosToner.append(linea);    // agregar a tbody
    }
}

function verificarContador(){
    const impresora = obtenerImpresoraDesdeArray();
    if (parseInt(campoActualContador.value) < impresora.contador){
        alert("Error en el contador ingresado");
        campoActualContador.value = "";
    }
    console.log(impresora.contador)
}

function aceptarCambioToner(e){
    e.preventDefault();

    let fechaCambio = campoFechaCambio.value;
    let actualContador = parseInt(campoActualContador.value);
    let inputGrupoToners = campoInputGrupoToners.value;

    const impresora = obtenerImpresoraDesdeArray();
    let rendimientoPaginas = actualContador - impresora.contador;
    impresora.actualizarContador(actualContador);

    const cambioToner = new CambioToner (fechaCambio, actualContador, inputGrupoToners, rendimientoPaginas)

    impresora.cambiarToner(cambioToner);
    formCambioToner.reset();

    campoUltimoContador.value = impresora.contador;

    console.log(impresoras);
    actualizarTablaCambioToner()

    actualizarLocalStorage();
}

function aceptarNuevaImpresora(e){
    e.preventDefault();

    let nuevoNombre = campoNombre.value;
    let nuevoMarca = campoMarca.value;
    let nuevoTipo = campoTipo.value;
    let nuevoModelo = campoModelo.value;
    let nuevoIp = campoIp.value;
    let nuevoTonerCompatible1 = campoTonerCompatible1.value.toUpperCase();
    let nuevoTonerCompatible2 = campoTonerCompatible2.value.toUpperCase();
    let nuevoContador = 0;
    let nuevoHistorialCambios = [];

    console.log(impresoras);

    if (!impresoras.includes(nuevoNombre)){
        const impresoraNueva = new Impresora(nuevoNombre, nuevoMarca, nuevoTipo, nuevoModelo, nuevoIp, nuevoTonerCompatible1, nuevoTonerCompatible2, nuevoContador, nuevoHistorialCambios);
        impresoras.push(impresoraNueva);
    } else {
        alert("Error: El Nombre esta repetido")        // No se puede generar Impresora con ID repetido
    }

    formNuevaImpresora.reset();
    inputGrupoImpresoras.disabled = false;
    btnAceptarNuevaImpresora.disabled = true;
    btnCambioToner.disabled = false;
    armarInputGrupoImpresoras(impresoras);

    actualizarLocalStorage();

    console.log(impresoras);
}

function prepararFormNuevaImpresora(){
    inputGrupoImpresoras.disabled = true;
    btnAceptarNuevaImpresora.disabled = false;
    btnCambioToner.disabled = true;
    formNuevaImpresora.reset();
}

function armarInputGrupoToners(impresora){

    let opciones = `<option>${impresora.tonerCompatible1}</option>
                    <option>${impresora.tonerCompatible2}</option>`;
    inputGrupoToners.innerHTML = opciones;
}

function obtenerImpresoraDesdeArray(){
    let nombreImpresora = inputGrupoImpresoras.value;
    // const impresora = impresoras.filter((el) => el.nombre.includes(nombreImpresora))[0];
    const impresora = impresoras.find((el) => el.nombre.includes(nombreImpresora));
    return (impresora);
}

function mostrarInfoImpresora(){
    const impresora = obtenerImpresoraDesdeArray();

    campoNombre.value = impresora.nombre;
    campoMarca.value = impresora.marca;
    campoTipo.value = impresora.tipo;
    campoModelo.value = impresora.modelo;
    campoIp.value = impresora.ip;
    campoTonerCompatible1.value = impresora.tonerCompatible1;
    campoTonerCompatible2.value = impresora.tonerCompatible2;
    campoUltimoContador.value = impresora.contador;

    armarInputGrupoToners(impresora);
    actualizarTablaCambioToner()
}

function armarInputGrupoImpresoras (impresoras){
    
    inputGrupoImpresoras.innerHTML = ``;

    for(const impresora of impresoras){
        const opcion = document.createElement("option");
        opcion.innerText = impresora.nombre;
        // opcion.value = impresora.id;        
        inputGrupoImpresoras.append(opcion);    // agregar a tbody
    }
}

function actualizarLocalStorage(){
    baseEnJSON = JSON.stringify(impresoras);
    localStorage.setItem("impresoras",baseEnJSON);
}

function importarLocalStorage(){
    let impresorasAlmacenadas = JSON.parse(localStorage.getItem("impresoras"));
    for (const impresora of impresorasAlmacenadas){
        impresoras.push(new Impresora(impresora.nombre, impresora.marca, impresora.tipo,impresora.modelo, impresora.ip,impresora.tonerCompatible1,impresora.tonerCompatible2,impresora.contador,impresora.historialCambios ))
    }
    console.log(impresoras);
}

function crearArrayImpresoras(){
    const ventas = new Impresora("Ventas", "HP", "LaserJet", "M608dn", "10.18.89.16", "237A","",0,[]);  // Objetos de ejemplo
    const calidad = new Impresora("Calidad", "Samsung", "Multifuncion", "SL-M4072FD", "10.18.89.26", "D203U","",0,[]);
    const despacho = new Impresora("Despacho", "HP", "LaserJet", "P4015n", "10.18.89.13", "CC364A","CC364X",0,[]);

    impresoras = [ventas, calidad, despacho];
}

function inicio (){
    crearArrayImpresoras();
    // importarLocalStorage();
    
    console.log(impresoras);
    
    armarInputGrupoImpresoras(impresoras);
    mostrarInfoImpresora();
    
}

// ********************************************** INICIO *****************************************************************

inicio();

