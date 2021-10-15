window.addEventListener('DOMContentLoaded', () => {
    //DOM
    const busquedasContainer = document.getElementById("busquedasContainer");
    const categoriasContainer = document.getElementById("categoriasContainer");
    const menuBtn = document.querySelector('#menuBtn');
    const dropMenu = document.querySelector('#dropMenu');   
    const categoriaMenu = document.getElementById("#categoriaMenu");
    const categoriasSummary = document.getElementById("#categoriasSummary");
    const serviciosSec = document.getElementById("#serviciosSec");
    const busquedasSec = document.getElementById("#busquedasSec");
    const contactoSec = document.getElementById("#contactoSec");
 
    // LISTENER

    menuBtn.addEventListener('click', () => {
        dropMenu.classList.toggle('hidden');
        dropMenu.classList.toggle('flex');
    }
    )
    // CARGAS INICIALES 
    cargarBusquedas();
    cargaCategorias();
    
}
)

;

// PREPARACION DE DATOS DATOS
function cargarBusquedas(id) {
    
    if (id === undefined){
    const busquedas = avisos.filter(aviso => aviso.activo === "1").map(aviso => {
        return Armarcard(aviso.titulo, aviso.introtext, aviso.activo, aviso.descripcion, aviso.categoriaDesc, aviso.zonaDesc, aviso.fechaAlta)  
    }).sort(aviso => aviso.fechaAlta).join('');
    busquedasContainer.innerHTML = busquedas;
    } else {
     const idCategoria = id.toString();
     const busquedasF = avisos.filter(aviso => aviso.categoria === idCategoria ).map(aviso => {
            return Armarcard(aviso.titulo, aviso.introtext, aviso.activo, aviso.descripcion, aviso.categoriaDesc, aviso.zonaDesc,aviso.fechaAlta)  
        }).sort(aviso => aviso.fechaAlta).join('');
        categoriaMenu.open = false;
    
    const categoriaDescripcion = categorias.filter(categoria => categoria.id === idCategoria).map(categoria => {return categoria.descripcion});
    categoriasSummary.innerHTML = categoriaDescripcion;
    busquedasContainer.innerHTML = busquedasF;

    }
}

// CATEGORIAS 
function cargaCategorias () {
    const categoriasDivs =  categorias.filter(categoria => categoria.cantidad > 0).map(categoria => 
        { return `<div class="cursor-pointer text-md " onclick="cargarBusquedas(${categoria.id} )"> ${categoria.descripcion}  (${categoria.cantidad}) </div> `;
    } ).join('');
    const categoriaTodas = `<div class="cursor-pointer text-md " onclick="cargarBusquedas()"> Todas </div>` 

    categoriasContainer.innerHTML = categoriaTodas + categoriasDivs;
}

// el template en html
function Armarcard(titulo, intro, activo, descripcion, categoriaDesc, zona, fechaAlta) {
    return `
    <div class="bg-white rounded-lg flex-col shadow-lg text-gray-700 p-3 mb-3 relative">
     <div class="absolute right-2 -top-2 shadow-lg bg-white rounded-full ring-2 p-1 ">
     <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
   </svg>
   </svg>

     </div>
    
    <span class="text-lg font-bold text-blue-500 mb-3">${titulo}</span>
    <div id="introtext" class="text-sm">
        ${intro}
    </div>
    <details class="text-sm my-3 ">
        <summary class="cursor-pointer">
            <span class="font-bold" >Rubro:</span> ${categoriaDesc} - <span class="font-bold">Zona:</span> ${zona}  <span class="font-bold text-blue-500">- Mas información </span>
        </summary>
        <div class="mt-3">${descripcion}</div>
        
    </details>
    <div class="flex justify-between ">
    <div class="text-xs text-gray-500">
        <div><span class="font-bold">Publicado:</span> ${fechaAlta}</div>
    </div>
    <!-- iconos -->
    <div class="flex items-end cursor-pointer text-xs ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
        </svg>
        Postular
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Compartir
    </div>

</div>
</div>
`;
}

function scroleaTo(id) {
    if (id ==="inicio") { idTop = 0; };
    if (id ==="busquedasSec") { idTop = busquedasSec.offsetTop - 60; };
    if (id ==="serviciosSec") { idTop = serviciosSec.offsetTop - 60; };
    if (id ==="contactoSec") { idTop = contactoSec.offsetTop - 60; };
    console.log(idTop)
    // muevo el scroll
    window.scroll({
        top: idTop,
        left: 0,
        behavior: 'smooth'
      });
      dropMenu.classList.toggle('hidden');
}

/*
<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.websiteplanet.com">Compartir</a>
<a href="https://twitter.com/intent/tweet?url=https://www.websiteplanet.com&text=">Compartir</a>
<a href="https://www.linkedin.com/shareArticle?mini=true&url=https://www.websiteplanet.com">Compartir</a>

<a href="https://www.linkedin.com/shareArticle?mini=true&url=https://www.websiteplanet.com">Compartir</a>

<a href="mailto:info@example.com?&subject=asunto&cc=&bcc=&body=https://www.websiteplanet.com">Compartir</a>


*/