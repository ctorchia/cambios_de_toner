// Gestor de Cambios de Toner
// Este sistema permite gestionar el registro de cambios de toner en Impresoras Laser.
// Nos permite analizar la cantidad de copias impresas en cada cambio de toner para verificar si el rendimiento esta dentro de los parámetros esperados o no.
// En cada cambio, ingresamos el contador actual de la impresora, que indica la cantidad total de impresiones acumuladas desde su puesta en funcionamiento.
// El sistema realiza una diferencia entre en valor actual y el registrado en el último cambio de toner para determinar el rendimiento del mismo.
// Analiza si es superior o inferior al promedio de copias sugerido y almacena el nuevo valor.

let id; 
let sector;
let contador;
let rendimientoPromToner;
let modeloToner;
let opcion;
let impresoras;

// ********************************************** TEXTOS DE MENUS *******************************************************
let opcionesMenuPrincipal = "Control de Toners:\n\n1- Cambiar toner\n2- Consultar Contador\n3- Listar Impresoras\n4- Nueva Impresora\n5- Filtrar Impresoras por Toner\n0- Salir\n";
let menuCambiarToner = "Cambiar Toner:\n\n1- Impresora de Ventas\n2- Impresora de Calidad\n3- Impresora de Compras\n4- Atras\n";
let menuConsultarContadores = "Consultar Contador:\n\n1- Impresora de Ventas\n2- Impresora de Calidad\n3- Impresora de Compras\n4- Atras\n";

// ********************************************** CLASES *****************************************************************
class Impresora {

    constructor(id, sector, contador, rendimientoPromToner, modeloToner) {
        this.id = id;  // {Number} id - ID de la impresora.
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

// ********************************************** MENUS *****************************************************************
function MenuPrincipal () {

    do {
        opcion = parseInt(
            prompt(opcionesMenuPrincipal)  // Menú - Principal
        );
        switch (opcion) {
            case 1:
                opcion = parseInt(
                    prompt(menuCambiarToner) // Menú - Cambio de Toner
                );
                MenuCambioToner(opcion);
                break;
            case 2:
                opcion = parseInt(
                    prompt(menuConsultarContadores) // Menú - Consulta de contadores
                );
                MenuConsultaContador(opcion);
                break;
            case 3:
                ListarImpresoras(impresoras);
                break;
            case 4:
                nuevaImpresora();
                break;        
            case 5:
                filtrarImpresorasPorToner(impresoras);
                break; 
            case 0:
                alert("Muchas gracias!");
                break;
            default:
                alert("Opcion incorrecta");
                break;
        }
    } while (opcion != 0);
};

function MenuCambioToner(opcion){
    switch (opcion) {  
        case 1:
            contadorCambio = parseInt(
                prompt("Ingrese el contador al momento del cambio") 
            );
            impresoraVentas.cambiarToner(contadorCambio);
            break
        case 2:
            contadorCambio = parseInt(
                prompt("Ingrese el contador al momento del cambio")
            );
            impresoraCalidad.cambiarToner(contadorCambio);
            break
        case 3:
            contadorCambio = parseInt(
                prompt("Ingrese el contador al momento del cambio")
            );
            impresoraCompras.cambiarToner(contadorCambio);
            break    
        case 4:
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

function MenuConsultaContador(opcion){
    switch (opcion) {
        case 1:
            alert("El contador del último cambio de Toner es: " + impresoraVentas.contador)
            break
        case 2:
            alert("El contador del último cambio de Toner es: " + impresoraCalidad.contador)
            break
        case 3:
            alert("El contador del último cambio de Toner es: " + impresoraCompras.contador)
            break    
        case 4:
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

// ********************************************** FUNCIONES *****************************************************************
function ListarImpresoras (impresoras){
    let i = 0;
    let lista = "Lista de Impresoras:\n\nID:     Sector:      Contador:        Rend. Prom Toner:      Modelo Toner:\n";
    totalImpresoras= impresoras.length;
    for(i; i<totalImpresoras; i++){
        elemento = impresoras[i].id + "        " + impresoras[i].sector + "        " + impresoras[i].contador + "                     " + impresoras[i].rendimientoPromToner + "                         " + impresoras[i].modeloToner + "\n";
        lista = lista.concat(elemento);
    }
    alert(lista);
}

function filtrarImpresorasPorToner(impresoras){
    let i = 0;
    let lista = "Lista de Impresoras:\n\nID:     Sector:      Contador:        Rend. Prom Toner:      Modelo Toner:\n";
    toner = prompt("Ingrese el Modelo de Toner:");

    const impresorasPorToner = impresoras.filter((el) => el.modeloToner.includes(toner));

    impresorasPorToner.forEach((el) => {
        elementoFiltrado = el.id + "        " + el.sector + "        " + el.contador + "                     " + el.rendimientoPromToner + "                         " + el.modeloToner + "\n";
        lista = lista.concat(elementoFiltrado);
    })
    
    alert(lista);
}

function nuevaImpresora(){
    id = prompt("Ingrese el ID:");
    sector = prompt("Ingrese el sector:");
    contador = parseInt(prompt("Ingrese el contador actual:"));  
    rendimientoPromToner = parseInt(prompt("Ingrese el rendimiento promedio del toner:"));  
    modeloToner = prompt("Ingrese el modelo de toner que utiliza:");  

    const impresoraNueva = new Impresora(id, sector, contador, rendimientoPromToner, modeloToner);

    impresoras.push(impresoraNueva);
}

// ********************************************** INICIO *****************************************************************

const impresoraVentas = new Impresora(01, "Ventas", 23000, 1000, "237A");  // Objetos de ejemplo
const impresoraCalidad = new Impresora(02, "Calidad", 34000, 2000, "203L");
const impresoraCompras = new Impresora(03, "Compras", 10000, 1000, "203L");

impresoras = [impresoraVentas, impresoraCalidad, impresoraCompras];

MenuPrincipal()


