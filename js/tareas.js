////// EXAMINAR EL DOM //////
/*console.dir(document);
console.log('URL ' + document.URL);
document.title = 'Hackeando el HTML';
console.log(document.title);
console.log(document.body);
console.log(document.all);

///// OBTENER DEL DOM LOS ID, CLASES, TAGS ... /////
console.log(document.getElementById('main'));
console.log(document.querySelectorAll('input'));
var headerTitle = document.getElementById('header-title');
headerTitle.textContent = 'Hackeando el HTML';

var h2Title = document.getElementsByClassName('list-group-item');
console.log(h2Title);

for (var i = 0; i < h2Title.length; i++) {
    h2Title[i].style.backgroundColor = "red";
    h2Title[i].style.color = "white";
    h2Title[i].innerHTML = 'Javo99';
}*/

//// PARENT NODE /////
/*var itemsList = document.querySelector('#items');
console.log(itemsList.parentNode);
var main = itemsList.parentNode;
main.style.backgroundColor = 'steelblue';
console.log(main.parentNode.parentNode);
var container = main.parentNode;
container.style.backgroundColor = 'pink';
container.style.padding = '30px';

//// ELEMENT NODE /////
var itemsList = document.querySelector('#items');
console.log(itemsList.parentElement);
var main = itemsList.parentElement;
main.style.backgroundColor = 'purple';
console.log(main.parentElement);
var container = main.parentElement;
container.style.backgroundColor = 'orange';
container.style.padding = '30px';


var itemsList = document.querySelector('#items');

/// CHILDNODES ////
console.log(itemsList.childNodes);
/// CHILDREN ///
console.log(itemsList.children);
/// FIRSTCHILD / FIRSTELEMENTCHILD ///
console.log(itemsList.firstElementChild);
itemsList.firstElementChild.textContent = 'prueba';
/// LASTCHILD / LASTELEMENTCHILD ///
console.log(itemsList.lastElementChild);

var itemsList = document.querySelector('#items');

/// PREVIOUSSIBLING / PREVIOUSELEMENTSIBLING ///
console.log(itemsList.previousSibling);
console.log(itemsList.previousElementSibling);
/// NEXTSIBLING / NEXTELEMENTSIBLING ///
console.log(itemsList.nextSibling);
console.log(itemsList.nextElementSibling);

/// CREAR ELEMENTOS - tagName ///
var nuevoDiv = document.createElement('div');
nuevoDiv.className = 'hola';
nuevoDiv.setAttribute('title', 'Hola mundo');
nuevoDiv.innerHTML = '<h2>Hola Diego</h2>';
console.log(nuevoDiv);

/// CREAR TEXTNODE ///
var nuevoNodoTXT = document.createTextNode('Hola mundo');
nuevoDiv.appendChild(nuevoNodoTXT);

var contenedor = document.querySelector('header .container');
var h1 = document.querySelector('h1');

contenedor.insertBefore(nuevoDiv, h1);*/


///// AÑADIR EVENTOS A BOTONES DE DOS FORMAS //////

// 1 //
/*document.getElementById('boton').addEventListener('click', function() {
    alert('click 2');
});

// 2 //
document.getElementById('boton').addEventListener('click', botonPulsado);

function botonPulsado() {
    // alert('prueba');
    var h = document.getElementById('header-title');
    if (h.innerText === 'Lista de Items') {
        h.innerText = 'Prueba';

    } else {
        h.innerText = 'Lista de Items';
    }
}*/


//// CAMBIAR EL DISEÑO DEL SITE AÑADIENDO COSAS EN EL HTML /////

/// AGREGAR UN ELEMENTO A LA LISTA ///
var form = document.getElementById('formAgregar');
var lista = document.getElementById('items');

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