// Gestor de Cambios de Toner
// Este sistema permite gestionar el registro de cambios de toner en Impresoras Laser.
// Nos permite analizar la cantidad de copias impresas en cada cambio de toner para verificar si el rendimiento esta dentro de los parámetros esperados o no.
// En cada cambio, ingresamos el contador actual de la impresora, que indica la cantidad total de impresiones acumuladas desde su puesta en funcionamiento.
// El sistema realiza una diferencia entre en valor actual y el registrado en el último cambio de toner para determinar el rendimiento del mismo.
// Analiza si es superior o inferior al promedio de copias sugerido y almacena el nuevo valor.

const listaImpresoras = document.getElementById("listaImpresoras");
const inputFiltrar = document.getElementById("inputFiltrar");
const formImpresora = document.getElementById("formImpresora");
const inputGrupoImpresoras = document.getElementById("inputGrupoImpresoras");

inputFiltrar.addEventListener("keyup", opcionFiltrar);

let id = document.getElementById("id");
let sector = document.getElementById("sector");
let contador = document.getElementById("contador");  
let rendimientoPromToner = document.getElementById("rendimientoPromToner");  
let modeloToner = document.getElementById("modeloToner");
let tituloTabla = document.getElementById("tituloTabla");

let impresoras;

// ********************************************** CLASES *****************************************************************
class Impresora {

    constructor(nombre, marca, tipo, modelo, ip, tonerCompatible1, tonerCompatible2, tonerCompatible3) {
        // this.id = id;  // {Number} id - ID de la impresora.
        this.sector = sector;  // {String} sector - Sector donde se ubica la impresora.
        this.contador = contador; // {Number} contador - Cantidad total de páginas impresas desde la instalación de la impresora.
        this.rendimientoPromToner = rendimientoPromToner; // {Number} rendimientoPromToner - Rendimiento Promedio de Impresiones del Toner
        this.modeloToner = modeloToner; // {Number} modeloToner -Modelo de Toner
    }

    consultarContador() {
        return this.contador; // Consulta contador del último cambio de toner registrado
    }

    actualizarContador(nuevoContador) {  // Actualiza el contador con el valor actual al momento del cambio
        this.contador = nuevoContador;
    }

    verificarRendimiento(nuevoContador) {   // Verifica si el rendimiento del toner es superior o inferior al promedio
        let rendimientoToner = nuevoContador - this.consultarContador();
        if (rendimientoToner >= this.rendimientoPromToner) {
            alert("El rendimiento del Toner fue correcto.\n" + rendimientoToner + " páginas impresas vs " + this.rendimientoPromToner + " de promedio");
        } else {
            alert("El rendimiento del Toner fue deficiente.\n" + rendimientoToner + " páginas impresas vs " + this.rendimientoPromToner + " de promedio");
        }
    }

    cambiarToner(nuevoContador) { // Si el contador es un valor válido, aplica el cambio y actualiza los datos en el objeto
        if (nuevoContador > this.consultarContador()) {
            this.verificarRendimiento(contadorCambio);
            this.actualizarContador(contadorCambio);
            alert("Se realizó el cambio correctamente.");
        } else {
            alert("Error en el contador ingresado");
        }
    }
}

// ********************************************** FUNCIONES *****************************************************************

function actualizarTabla (impresoras){     // Crear lineas
    for(const impresora of impresoras){
        const linea = document.createElement("tr");        
        listaImpresoras.append(completarLinea(impresora, linea));    // agregar a tbody
    }
}

function completarLinea (impresora, linea){    // Completar linea 
    
    for (const propiedad in impresora){
        const item = document.createElement("th");
        item.innerText = impresora[propiedad];
        linea.append(item);
    }
    return linea;
}

function opcionFiltrar(){
    limpiarTabla();
    actualizarTabla(filtrarImpresorasPorToner(impresoras));
    tituloTabla = document.getElementById("tituloTabla");
    tituloTabla.innerText = "Listado de Impresoras filtradas por Toner Seleccionado:";
}

function filtrarImpresorasPorToner(impresoras){         // Filtrado de Impresoras por modelo de Toner
    toner = inputFiltrar.value.toUpperCase();
    const impresorasPorToner = impresoras.filter((el) => el.modeloToner.includes(toner));
    return impresorasPorToner;
}

function limpiarTabla(){
    listaImpresoras.innerHTML = "";
}

formImpresora.addEventListener("submit", (e) =>{   // Crear nueva Impresora

        e.preventDefault();

        let nuevoId = parseInt(id.value);
        let nuevoSector = sector.value;
        let nuevoContador = parseInt(contador.value);
        let nuevoRendimientoPromToner = parseInt(rendimientoPromToner.value);
        let nuevoModeloToner = modeloToner.value.toUpperCase(); 
    
        const impresorasActuales = impresoras.map((el) => el.id);
        console.log(impresoras);
        
        if (!impresorasActuales.includes(nuevoId)){
            const impresoraNueva = new Impresora(nuevoId, nuevoSector, nuevoContador, nuevoRendimientoPromToner, nuevoModeloToner);
            impresoras.push(impresoraNueva);
        } else {
            alert("Error: El ID esta repetido")        // No se puede generar Impresora con ID repetido
        }
        console.log(impresoras)

        formImpresora.reset();
        limpiarTabla();
        actualizarTabla(impresoras);
});

function inicio (){

    console.log(impresoras);

    actualizarTabla(impresoras);
    tituloTabla.innerText = "Listado General de Impresoras:";

    armarInputGrupoImpresoras(impresoras);
}

function armarInputGrupoImpresoras (impresoras){

    for(const impresora of impresoras){
        const opcion = document.createElement("option");
        opcion.innerText = impresora.sector;
        opcion.value = impresora.id;        
        inputGrupoImpresoras.append(opcion);    // agregar a tbody
    }

}

// ********************************************** INICIO *****************************************************************

const impresoraVentas = new Impresora(01, "Ventas", 23000, 1000, "237A");  // Objetos de ejemplo
const impresoraCalidad = new Impresora(02, "Calidad", 34000, 2000, "203L");
const impresoraCompras = new Impresora(03, "Compras", 10000, 1000, "203L");

impresoras = [impresoraVentas, impresoraCalidad, impresoraCompras];

// MenuPrincipal()

inicio();

