// Cada vez que se refresca la pagina se vacia el localStorage
localStorage.clear();

/// JQUERY ///

$(document).ready(function() {
    $("#start").click(function() {
        // Entra hasta aqui! 
        // alert("Botón pulsado");
        //// No imprime esto de $.amaran - En verdad, que pollas es $.amaran????
        $.notify("Tarea añadida", { position: "bottom left" });
    });
});


/// AGREGA UN ELEMENTO A LA LISTA ///
var form = document.getElementById('formAgregar');
var lista = document.getElementById('items');
var cont = 0;

/// BUSCAR EL ELEMENTO ///
var filtro = document.getElementById('filtro');

// Evento para buscar en la lista es keyup()
filtro.addEventListener('keyup', filtrarItems);

// Evento submit del formulario
form.addEventListener('submit', agregarItem);

// Evento delete de la lista de items
lista.addEventListener('click', eliminarItem);

// Funcion para agregar
function agregarItem(a) {

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
    var texto = e.target.value.toLowerCase();
    var items = lista.getElementsByTagName('li');
    Array.from(items).forEach(function(item) {
        var itemNombre = item.firstChild.textContent;
        if (itemNombre.toLowerCase().indexOf(texto) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}