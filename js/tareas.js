//// CAMBIAR EL DISEÑO DEL SITE AÑADIENDO COSAS EN EL HTML /////
// localStorage.clear();

/// AGREGAR UN ELEMENTO A LA LISTA ///
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
    // console.log(nuevoItem);

    // Creamos el objeto con los datos de las tareas con el ID en auto increment
    var itemObject = {
        'id': cont++,
        'tarea': nuevoItem
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
    // console.log(arrayLocal);

    // Meterlo en localStorage
    localStorage.setItem('nuevaTarea', JSON.stringify(arrayLocal));



    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(nuevoItem));

    var butDel = document.createElement('button');
    butDel.className = 'btn btn-danger btn-sm float-right eliminar';
    butDel.appendChild(document.createTextNode('x'));

    li.appendChild(butDel);

    lista.appendChild(li);

    // limpia el campo de texto y lo deja vacio
    document.getElementById('itemAgregar').value = ' ';

}

// Funcion para eleminar de la lista 
function eliminarItem(e) {
    e.preventDefault();
    if (e.target.classList.contains('eliminar')) {
        if (confirm('¿Seguro que quiere eliminarlo?')) {
            // Quitar del localStorage
            localStorage.removeItem("nuevaTarea");

            var li = e.target.parentElement;
            lista.removeChild(li);
        }
    }
}

// Funcion para buscar en la lista
function filtrarItems(e) {
    // e.preventDefault();
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
    //console.log(ite);
}