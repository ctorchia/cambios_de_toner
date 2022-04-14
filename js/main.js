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
const btnCambioToner = document.getElementById("btnCambioToner");
const btnAceptarNuevaImpresora = document.getElementById("btnAceptarImpresora");

// const listaImpresoras = document.getElementById("listaImpresoras");
// const inputFiltrar = document.getElementById("inputFiltrar");
// const formImpresora = document.getElementById("formImpresora");

inputGrupoImpresoras.addEventListener("change", mostrarInfoImpresora);
btnNuevaImpresora.addEventListener("click", crearImpresora);
formNuevaImpresora.addEventListener("submit", aceptarNuevaImpresora);
// btnCambioToner.addEventListener("submit", aceptarCambioToner);


//inputFiltrar.addEventListener("keyup", opcionFiltrar);

let impresoras;
// let impresora;
// let nombre;
let campoNombre = document.getElementById("nombre");
let campoMarca = document.getElementById("marca");
let campoTipo = document.getElementById("tipo");
let campoModelo = document.getElementById("modelo");
let campoIp = document.getElementById("ip");
let campoTonerCompatible1 = document.getElementById("tonerCompatible1");
let campoTonerCompatible2 = document.getElementById("tonerCompatible2");
let campoUltimoContador = document.getElementById("ultimoContador");


// let id = document.getElementById("id");
// let sector = document.getElementById("sector");
// let contador = document.getElementById("contador");  
// let rendimientoPromToner = document.getElementById("rendimientoPromToner");  
// let modeloToner = document.getElementById("modeloToner");
// let tituloTabla = document.getElementById("tituloTabla");


// ********************************************** CLASES *****************************************************************
class Impresora {

    constructor(nombre, marca, tipo, modelo, ip, tonerCompatible1, tonerCompatible2) {
        // this.id = id;  // {Number} id - ID de la impresora.
        this.nombre = nombre;  // {String} Nombre de la impresora.
        this.marca = marca; // {String} Marca de la impresora.
        this.tipo = tipo; // {String} Tipo de Impresora.
        this.modelo = modelo; // {String} Modelo de Impresora.
        this.ip = ip; // {String} IP de Impresora.
        this.tonerCompatible1 = tonerCompatible1; // {String} 1ra opcion de Toner Compatible.
        this.tonerCompatible2 = tonerCompatible2; // {String} 2da opcion de Toner Compatible.
        this.contador = 0; // Inicializa contador de Immpresora.
        this.historialCambios = []; // Inicializa Historial de Cambios.
    }

    // consultarContador() {
    //     return this.contador; // Consulta contador del último cambio de toner registrado
    // }

    // actualizarContador(nuevoContador) {  // Actualiza el contador con el valor actual al momento del cambio
    //     this.contador = nuevoContador;
    // }

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

// ********************************************** FUNCIONES *****************************************************************

// function actualizarTabla (impresoras){     // Crear lineas
//     for(const impresora of impresoras){
//         const linea = document.createElement("tr");        
//         listaImpresoras.append(completarLinea(impresora, linea));    // agregar a tbody
//     }
// }

// function completarLinea (impresora, linea){    // Completar linea 
    
//     for (const propiedad in impresora){
//         const item = document.createElement("th");
//         item.innerText = impresora[propiedad];
//         linea.append(item);
//     }
//     return linea;
// }

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

// function limpiarTabla(){
//     listaImpresoras.innerHTML = "";
// }

// formImpresora.addEventListener("submit", (e) =>{   // Crear nueva Impresora

//         e.preventDefault();

//         let nuevoId = parseInt(id.value);
//         let nuevoSector = sector.value;
//         let nuevoContador = parseInt(contador.value);
//         let nuevoRendimientoPromToner = parseInt(rendimientoPromToner.value);
//         let nuevoModeloToner = modeloToner.value.toUpperCase(); 
    
//         const impresorasActuales = impresoras.map((el) => el.id);
//         console.log(impresoras);
        
//         if (!impresorasActuales.includes(nuevoId)){
//             const impresoraNueva = new Impresora(nuevoId, nuevoSector, nuevoContador, nuevoRendimientoPromToner, nuevoModeloToner);
//             impresoras.push(impresoraNueva);
//         } else {
//             alert("Error: El ID esta repetido")        // No se puede generar Impresora con ID repetido
//         }
//         console.log(impresoras)

//         formImpresora.reset();
//         limpiarTabla();
//         actualizarTabla(impresoras);
// });

function aceptarNuevaImpresora(e){
    e.preventDefault();

    let nuevoNombre = campoNombre.value;
    let nuevoMarca = campoMarca.value;
    let nuevoTipo = campoTipo.value;
    let nuevoModelo = campoModelo.value;
    let nuevoIp = campoIp.value;
    let nuevoTonerCompatible1 = campoTonerCompatible1.value.toUpperCase();
    let nuevoTonerCompatible2 = campoTonerCompatible2.value.toUpperCase();

    console.log(impresoras);

    if (!impresoras.includes(nuevoNombre)){
        const impresoraNueva = new Impresora(nuevoNombre, nuevoMarca, nuevoTipo, nuevoModelo, nuevoIp, nuevoTonerCompatible1, nuevoTonerCompatible2);
        impresoras.push(impresoraNueva);
    } else {
        alert("Error: El Nombre esta repetido")        // No se puede generar Impresora con ID repetido
    }

    formNuevaImpresora.reset();
    inputGrupoImpresoras.disabled = false;
    btnAceptarNuevaImpresora.disabled = true;
    btnCambioToner.disabled = false;
    armarInputGrupoImpresoras(impresoras);

    console.log(impresoras);
}

function crearImpresora(){
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

    console.log(impresora);
    
    campoNombre.value = impresora.nombre;
    campoMarca.value = impresora.marca;
    campoTipo.value = impresora.tipo;
    campoModelo.value = impresora.modelo;
    campoIp.value = impresora.ip;
    campoTonerCompatible1.value = impresora.tonerCompatible1;
    campoTonerCompatible2.value = impresora.tonerCompatible2;
    campoUltimoContador.value = impresora.contador;

    armarInputGrupoToners(impresora);
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

function inicio (){
    console.log(impresoras);
    // actualizarTabla(impresoras);
    // tituloTabla.innerText = "Listado General de Impresoras:";
    armarInputGrupoImpresoras(impresoras);
    mostrarInfoImpresora();
}

// ********************************************** INICIO *****************************************************************

const ventas = new Impresora("Ventas", "HP", "LaserJet", "M608dn", "10.18.89.16", "237A","");  // Objetos de ejemplo
const calidad = new Impresora("Calidad", "Samsung", "Multifuncion", "SL-M4072FD", "10.18.89.26", "D203U","");
const despacho = new Impresora("Despacho", "HP", "LaserJet", "P4015n", "10.18.89.13", "CC364A","CC364X");

impresoras = [ventas, calidad, despacho];

// MenuPrincipal()

inicio();

