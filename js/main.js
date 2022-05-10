// Gestor de Cambios de Toner
// Este sistema permite gestionar el registro de cambios de toner en Impresoras Laser.
// Nos permite analizar la cantidad de copias impresas en cada cambio de toner para verificar si el rendimiento esta dentro de los parámetros esperados o no.
// En cada cambio, ingresamos el contador actual de la impresora, que indica la cantidad total de impresiones acumuladas desde su puesta en funcionamiento.
// El sistema realiza una diferencia entre en valor actual y el registrado en el último cambio de toner para determinar el rendimiento del mismo.
// Analiza si es superior o inferior al promedio de copias sugerido y almacena el nuevo valor.

// Declaracion de Variables:

const inputGrupoImpresoras = document.getElementById("inputGrupoImpresoras");
const inputGrupoToners = document.getElementById("inputGrupoToners");
const btnAgregarImpresora = document.getElementById("btnAgregarImpresora");
const formNuevaImpresora = document.getElementById("formNuevaImpresora");
const formCambioToner = document.getElementById("formCambioToner");
const btnCambioToner = document.getElementById("btnCambioToner");
const btnAceptarNuevaImpresora = document.getElementById("btnAceptarNuevaImpresora");
const btnCancelarAgregarImpresora = document.getElementById("btnCancelarAgregarImpresora");
const btnAceptarActualizarImpresora = document.getElementById("btnAceptarActualizarImpresora");
const btnActualizarImpresora = document.getElementById("btnActualizarImpresora");
const btnBorrarImpresora = document.getElementById("btnBorrarImpresora");
const btnSwitchInventario = document.getElementById("btnSwitchInventario");
const listaCambiosToner = document.getElementById("listaCambiosToner");
const listaInventarioImpresoras = document.getElementById("listaInventarioImpresoras");
const inputFiltrarToner = document.getElementById("inputFiltrarToner");
const inputFiltrarInventarioImpresoras = document.getElementById("inputFiltrarInventarioImpresoras");

let impresoras = [];
let valorBtnSwitchInventario = 0;
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
let imagenImpresora = document.getElementById("imagenImpresora");
let campoPromedioHojas = document.getElementById("promedioHojas");
let campoPromedioDias = document.getElementById("promedioDias");
let bloqueSeleccionImpresora = document.getElementById("bloqueSeleccionImpresora");
let bloqueInfoImpresoras = document.getElementById("bloqueInfoImpresoras");
let bloqueCambioToner = document.getElementById("bloqueCambioToner");
let bloqueHistorialCambiosDeToner = document.getElementById("bloqueHistorialCambiosDeToner");
let bloqueInventarioImpresoras = document.getElementById("bloqueInventarioImpresoras");

// Declaracion de EventListeners:

inputGrupoImpresoras.addEventListener("change", mostrarInfoImpresora);
btnAgregarImpresora.addEventListener("click", prepararFormNuevaImpresora);
btnActualizarImpresora.addEventListener("click", prepararFormActualizarImpresora);
btnBorrarImpresora.addEventListener("click", eliminarImpresora);
btnAceptarActualizarImpresora.addEventListener("click", actualizarInfoImpresora);
btnCancelarAgregarImpresora.addEventListener("click", cancelarAgregarImpresora);
formNuevaImpresora.addEventListener("submit", agregarNuevaImpresora);
formCambioToner.addEventListener("submit", agregarCambioToner);
campoActualContador.addEventListener("change", verificarContador);
campoFechaCambio.addEventListener("change",verificarFechaCambio)
inputFiltrarToner.addEventListener("keyup", filtrarToner);
inputFiltrarInventarioImpresoras.addEventListener("keyup",filtrarInventarioImpresoras);
btnSwitchInventario.addEventListener("click", intercambiarVistas);


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

function filtrarInventarioImpresoras(){
    limpiarTablaInventarioImpresoras();
    filtroImpresora = inputFiltrarInventarioImpresoras.value;

    const impresorasFiltradas = impresoras.filter((el) => 
    el.nombre.includes(filtroImpresora) || 
    el.marca.includes(filtroImpresora) || 
    el.tipo.includes(filtroImpresora) || 
    el.modelo.includes(filtroImpresora) || 
    el.ip.includes(filtroImpresora) || 
    el.tonerActualColocado.includes(filtroImpresora)
    );

    for(const impresora of impresorasFiltradas){
        const linea = document.createElement("tr");
        linea.innerHTML = completarLineaImpresoras(impresora);        
        listaInventarioImpresoras.append(linea);    // agregar a tbody
    }
}

function intercambiarVistas(){
    if (valorBtnSwitchInventario == 0) {
        bloqueSeleccionImpresora.style.visibility = "hidden";
        bloqueInfoImpresoras.style.display = "none";
        bloqueCambioToner.style.display = "none"; 
        bloqueHistorialCambiosDeToner.style.display = "none";
        bloqueInventarioImpresoras.style.display = "";
        btnSwitchInventario.innerHTML = "Vista Principal";

        valorBtnSwitchInventario = 1;
    }else {
        bloqueSeleccionImpresora.style.visibility = "";
        bloqueInfoImpresoras.style.display = "";
        bloqueCambioToner.style.display = ""; 
        bloqueHistorialCambiosDeToner.style.display = "";
        bloqueInventarioImpresoras.style.display = "none";
        btnSwitchInventario.innerHTML = "Inventario de Impresoras";

        valorBtnSwitchInventario = 0;
    }
}

function limpiarTablaInventarioImpresoras(){    // Limpiar la tabla de Cambios de Toner
    listaInventarioImpresoras.innerHTML = ``;
}

function completarLineaImpresoras(impresora){        // Armar linea con cada impresora en la base de datos para mostrar en Tabla
    
    return `<th>${impresora.nombre}</th>      
            <th>${impresora.marca}</th>
            <th>${impresora.tipo}</th>
            <th>${impresora.modelo}</th>
            <th>${impresora.ip}</th>
            <th>${impresora.tonerActualColocado}</th>
            <th>${impresora.fechaTonerActualColocado}</th>
            <th>${impresora.contador}</th>`;     
}

function listarInventarioImpresoras(){
    limpiarTablaInventarioImpresoras();

    for(const impresora of impresoras){
        const linea = document.createElement("tr");
        linea.innerHTML = completarLineaImpresoras(impresora);        
        listaInventarioImpresoras.append(linea);    // agregar a tbody
    }
}

function actualizarPromedios(cambiosFiltrados){
    if (cambiosFiltrados.length != 0) {
        let sumatoriaImpresiones = 0;
        let sumatoriaDias = 0;
        for(const cambio of cambiosFiltrados){
            sumatoriaImpresiones += cambio.rendimientoPaginas;
            sumatoriaDias += cambio.rendimientoDias;
        }
        let promedioHojas = sumatoriaImpresiones / cambiosFiltrados.length;
        let promedioDias = sumatoriaDias / cambiosFiltrados.length;
        campoPromedioHojas.innerHTML = promedioHojas;
        campoPromedioDias.innerHTML = promedioDias;
    } else {
        campoPromedioHojas.innerHTML = 0;
        campoPromedioDias.innerHTML = 0;
    }
}

function filtrarToner(){
    limpiarTablaCambiosToner();
    toner = inputFiltrarToner.value.toUpperCase();

    const impresora = obtenerImpresoraDesdeArray();
    const cambiosToner = impresora.historialCambios;
    const cambiosFiltrados = cambiosToner.filter((el) => el.modeloToner.includes(toner));

    for(const cambio of cambiosFiltrados){
        const linea = document.createElement("tr");
        linea.innerHTML = completarLinea(cambio);        
        listaCambiosToner.append(linea);    // agregar a tbody
    }

    actualizarPromedios(cambiosFiltrados);
}

// SPREAD DE ARRAY
function sumarContadoresImpresoras(contadores){
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
    actualizarPromedios(cambiosToner)
}

function verificarFechaCambio(){
    const impresora = obtenerImpresoraDesdeArray();
    if (campoFechaCambio.value < impresora.fechaTonerActualColocado){
        swal({
            title: "Error",
            text: "La fecha actual no puede ser inferior a la última registrada",
            icon: "error",
            button: "Aceptar",
        });    
        campoFechaCambio.valueAsDate = new Date(); 
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
}

function actualizarInfoCambioToner(impresora,actualContador, tonerActualColocado, fechaTonerActualColocado){
    impresora.contador = actualContador
    impresora.tonerActualColocado = tonerActualColocado
    impresora.fechaTonerActualColocado = fechaTonerActualColocado
}

function agregarCambioToner(e){     // Agregar Cambio de Toner
    e.preventDefault();
    let fechaCambio = campoFechaCambio.value;
    let inputGrupoToners = campoInputGrupoToners.value;
    const impresora = obtenerImpresoraDesdeArray();
    let nuevoTonerActualColocado = impresora.tonerActualColocado;
    let nuevaFechaActualTonerColocado = impresora.fechaTonerActualColocado;
    let actualContador = parseInt(campoActualContador.value);
    let rendimientoPaginas = actualContador - impresora.contador;
    
    actualizarInfoCambioToner(impresora,actualContador, inputGrupoToners, fechaCambio);

    let rendimientoDias = dateFns.differenceInDays(fechaCambio, nuevaFechaActualTonerColocado);

    const cambioToner = new CambioToner (nuevaFechaActualTonerColocado, actualContador, nuevoTonerActualColocado, rendimientoPaginas, rendimientoDias)
    impresora.historialCambios.push(cambioToner);
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

function cancelarAgregarImpresora(e){
    e.preventDefault();
    location.reload();
}

function eliminarImpresora(e){
    e.preventDefault();
    console.log(impresoras);
    const impresora = obtenerImpresoraDesdeArray();

    swal({
        title: "Está seguro de eliminar la impresora?",
        text: "Esta acción no podrá revertirse",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("La impresora ha sido eliminada.", {
            icon: "success",
          });
          impresoras = impresoras.filter((item) => item.nombre !== impresora.nombre);
          actualizarLocalStorage();
          inicio();
        } 
      });
}

function actualizarInfoImpresora(e){
    e.preventDefault();
    const impresora = obtenerImpresoraDesdeArray();

    impresora.nombre = campoNombre.value;
    impresora.marca = campoMarca.value;
    impresora.tipo = campoTipo.value;
    impresora.modelo = campoModelo.value;
    impresora.ip = campoIp.value;
    impresora.tonerCompatible1 = campoTonerCompatible1.value.toUpperCase();
    impresora.tonerCompatible2 = campoTonerCompatible2.value.toUpperCase();
    impresora.tonerActualColocado = campoTonerActualColocado.value.toUpperCase();
    impresora.fechaTonerActualColocado = campoFechaTonerActualColocado.value;
    impresora.contador = parseInt(campoUltimoContador.value);

    actualizarLocalStorage();
    location.reload();
}

function prepararFormActualizarImpresora(){
    inputGrupoImpresoras.disabled = true;
    btnAgregarImpresora.disabled = true;
    btnActualizarImpresora.disabled = true;
    btnCambioToner.disabled = true;
    btnBorrarImpresora.disabled = true;

    
    btnAceptarActualizarImpresora.style.display = "";
    btnCancelarAgregarImpresora.style.display = "";

    campoNombre.disabled = true;
    campoMarca.disabled = false;
    campoTipo.disabled = false;
    campoModelo.disabled = false;
    campoIp.disabled = false;
    campoTonerCompatible1.disabled = false;
    campoTonerCompatible2.disabled = false;
    campoTonerActualColocado.disabled = false;
    campoFechaTonerActualColocado.disabled = false;
    campoUltimoContador.disabled = false;
    campoFechaCambio.disabled = true;
    campoActualContador.disabled = true;
    inputGrupoToners.disabled = true;
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
    let nuevoContador = parseInt(campoUltimoContador.value);
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
    btnAceptarNuevaImpresora.disabled = true;
    btnAgregarImpresora.disabled = false;
    btnActualizarImpresora.disabled = false;
    btnBorrarImpresora.disabled = false;
    btnCambioToner.disabled = false;
    btnCancelarAgregarImpresora.disabled = true;
    inputGrupoToners.disabled = false;
    campoFechaCambio.disabled = false;
    campoActualContador.disabled = false;

    armarInputGrupoImpresoras(impresoras);

    actualizarLocalStorage();
    mostrarInfoImpresora();
    listarInventarioImpresoras();
}

function prepararFormNuevaImpresora(){      // Preparar Formulario para completar datos de nueva impresora
    inputGrupoImpresoras.disabled = true;
    btnAceptarNuevaImpresora.disabled = false;
    btnCambioToner.disabled = true;
    btnAgregarImpresora.disabled = true;
    btnActualizarImpresora.disabled = true;
    btnBorrarImpresora.disabled = true;

    btnAceptarNuevaImpresora.style.display = "";
    btnCancelarAgregarImpresora.style.display = "";
    
    campoNombre.disabled = false;
    campoMarca.disabled = false;
    campoTipo.disabled = false;
    campoModelo.disabled = false;
    campoIp.disabled = false;
    campoTonerCompatible1.disabled = false;
    campoTonerCompatible2.disabled = false;
    campoTonerActualColocado.disabled = false;
    campoFechaTonerActualColocado.disabled = false;
    campoUltimoContador.disabled = false;
    campoUltimoContador.value = 0;
    campoFechaCambio.disabled = true;
    campoActualContador.disabled = true;
    inputGrupoToners.disabled = true;

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
    bloqueInventarioImpresoras.style.display = "none";

    // DESESTRUCTURACION 
    const {nombre, marca, tipo, modelo, ip, tonerCompatible1, tonerCompatible2, tonerActualColocado, fechaTonerActualColocado, contador} = impresora;
    
    if (nombre == "Ventas" || nombre == "Calidad" || nombre == "Despacho" ) {
        imagenImpresora.src = "./imagenes/" + nombre +".png"}
    else {
        imagenImpresora.src = "./imagenes/ventas.png"
    };
    
    campoNombre.value = nombre;
    campoMarca.value = marca;
    campoTipo.value = tipo;
    campoModelo.value = modelo;
    campoIp.value = ip;
    campoTonerCompatible1.value = tonerCompatible1;
    campoTonerCompatible2.value = tonerCompatible2;
    campoTonerActualColocado.value = tonerActualColocado;
    campoFechaTonerActualColocado.value = fechaTonerActualColocado; 
    campoUltimoContador.value = contador;
    campoFechaCambio.valueAsDate = new Date(); 

    campoNombre.disabled = true;
    campoMarca.disabled = true;
    campoTipo.disabled = true;
    campoModelo.disabled = true;
    campoIp.disabled = true;
    campoTonerCompatible1.disabled = true;
    campoTonerCompatible2.disabled = true;
    campoTonerActualColocado.disabled = true;
    campoFechaTonerActualColocado.disabled = true;
    campoUltimoContador.disabled = true;

    btnAceptarNuevaImpresora.style.display = "none";
    btnAceptarActualizarImpresora.style.display = "none";
    btnCancelarAgregarImpresora.style.display = "none";

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

function importarLocalStorage(){        // Importar info desde Local Storage
    let impresorasAlmacenadas = JSON.parse(localStorage.getItem("impresoras"));
    
    // ASIGNACION CONDICIONAL
    const importacionCorrecta = impresorasAlmacenadas ? impresoras = impresorasAlmacenadas : false;
    return importacionCorrecta
}

async function importarDatosDesdeJson(){
    await fetch("./js/data.json")
        .then( (res) => res.json())
        .then( (data) => {
            impresoras = data;
            // console.log(data);
        });
    // console.log(impresoras)
}

async function inicio (){
    
    // OPERADOR OR
    importarLocalStorage() || await importarDatosDesdeJson(); // Si no existe Info en LocalStorage importa datos desde JSON.
        
    armarInputGrupoImpresoras(impresoras);
    mostrarInfoImpresora();
    mostrarTotalImpresionesEmpresa();
    listarInventarioImpresoras();

    console.log(impresoras);
}

// ********************************************** INICIO *****************************************************************

inicio();
