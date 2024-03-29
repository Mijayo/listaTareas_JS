// Cada vez que se refresca la pagina se vacia el localStorage
// localStorage.clear();

/// JQUERY QUE MUESTRA MENSAJE EN LA PANTALLA CUANDO SE AÑADE LA TAREA /////
/// Uso una libreria que se llama notify.js / https://notifyjs.jpillora.com 
$(document).ready(function() {
    $("#start").click(function() {
        // Libreria notify.js
        $.notify("Tarea añadida", {
            className: 'success',
            position: 'bottom right',
            autoHideDelay: 2500
        });
    });
});
//////////////////////////////////////////////////////////////////////////////////

/// VARIABLES AGREGA UN ELEMENTO A LA LISTA ///
var form = document.getElementById('formAgregar');
var lista = document.getElementById('items');
var cont = 0;

/// VARIABLES BUSCAR EL ELEMENTO ///
var filtro = document.getElementById('filtro');

// Evento para buscar en la lista es keyup()
filtro.addEventListener('keyup', filtrarItems);

// Evento submit del formulario
form.addEventListener('submit', agregarItem);

// Evento delete de la lista de items
lista.addEventListener('click', eliminarItem);

// Funcion para agregar
function agregarItem(a) {

    // Funcion para prevenir cualquier error
    a.preventDefault();

    var nuevoItem = document.getElementById('itemAgregar').value;

    // Creamos el objeto con los datos de las tareas con el ID en auto increment
    var itemObject = {
        id: `${cont++}`,
        tarea: `${nuevoItem}`
    };

    // Definimos la variable del array para almacenar el objeto itemObject
    var arrayLocal;

    if (localStorage.getItem('nuevaTarea') === null) {
        // Defino el array
        arrayLocal = [];
    } else {
        arrayLocal = JSON.parse(localStorage.getItem('nuevaTarea'));
    }

    // 
    arrayLocal.push(itemObject);

    // Meterlo en localStorage
    localStorage.setItem('nuevaTarea', JSON.stringify(arrayLocal));

    // Pintamos los li en el HTML
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(nuevoItem));

    // Pintamos el boton X 
    var butDel = document.createElement('button');
    butDel.className = `btn btn-danger btn-sm float-right eliminar `;
    butDel.setAttribute('id', itemObject.id);

    butDel.appendChild(document.createTextNode('X'));

    li.appendChild(butDel);
    lista.appendChild(li);

    // Cuando se haga click en la X vamos a capturar el ID de la tarea que ha sido clicada
    butDel.addEventListener('click', function(e) {

        var idBoton;
        // Obtenemos el id
        idBoton = e.target.getAttribute('id');

        // Controlamos que el ID no este vacio
        if (idBoton !== null) {
            // Llamamos a la funcion eliminarItem() pasandole el parametro del ID
            eliminarItem(idBoton);
        }

    });

    // Limpia el campo de texto y lo deja vacio
    document.getElementById('itemAgregar').value = ' ';
}


// Funcion para eleminar de la lista // El parametro ID es el id recogido en la funcion click
function eliminarItem(ID) {

    var tareas = JSON.parse(localStorage.getItem("nuevaTarea"));

    // ForEach para recorrer todas las tareas del localStorage
    tareas.forEach((element, index) => {

        // Controlamos que el ID del elemento sea igual al parametro recogido con el evento on click
        if (element.id === ID) {
            // Antes de eliminar la tarea preguntamos si quiere o no eliminarla
            if (confirm('¿Desea eliminar la tarea?')) {
                // Elimina del localStorage conforme el indice y la posicion
                tareas.splice(index, 1);

                // Seleccionamos al padre del boton X con parentElement, que es todo el <li>
                var liT = document.getElementById(ID).parentElement;
                // Elimina todo el campo de la lista
                liT.remove();
            }
        }
    });

    // Actualiza el localStorage
    localStorage.setItem('nuevaTarea', JSON.stringify(tareas));
}


// Funcion para buscar en la lista
function filtrarItems(e) {
    // Ponemos todo en minusculas usando toLowerCase()
    var texto = e.target.value.toLowerCase();
    // Creamos la variable items para luego recorrer todos los li con un forEach
    var items = lista.getElementsByTagName('li');

    // Metemos el contenido de los li en un Array y lo recorremos
    Array.from(items).forEach(function(item) {
        // Obtenemos el contenido del texto y lo guardamos en una variable
        var itemNombre = item.firstChild.textContent;
        // Si el contenido del texto esta contenido en el array, es != -1 usando indexOf(), entonces lo mostramos
        if (itemNombre.toLowerCase().indexOf(texto) != -1) {
            // Lo mostramos
            item.style.display = 'block';
        } else {
            // Oculto
            item.style.display = 'none';
        }
    });
}