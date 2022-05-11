
# Inventario de Impresoras

Esta app nos permite tener un inventario detallado de las impresoras instaladas 
en una empresa y registrar los cambios de insumos (Toners) realizados a cada una de ellas.

Este registro posibilita conocer la cantidad de hojas impresas y dias de uso de cada insumo
utilizado.
Para este proceso se utiliza un contador integrado en cada impresora que contabiliza cada
copia realizada por el equipo desde su puesta en funcionamiento.

Para registrar un cambio de toner debemos seleccionar la impresora en cuestión desde
el menú desplegable y en el apartado "Cambio de Toner" indicar:
* Fecha en que se realiza el cambio.
* Contador actual de la impresora (Consultado en la configuración de la impresora).
* Tipo de toner colocado (Menú desplegable de Toners Compatibles).

Esto guardará en el sistema ese insumo como el actual colocado y agregará a la lista de 
cambios el Toner recién quitado, registrando la fecha en la que había sido colocado, 
y su rendimiento en hojas impresas y días de uso.

Con el botón "Lista de Impresoras" podremos ver una tabla con todas las impresoras
instaladas y sus características.
Esta lista puede ser filtrada fácilmente a través del cuadro que se encuentra en la 
parte superior de la misma.

## Autor

- [@ctorchia](https://github.com/ctorchia)

