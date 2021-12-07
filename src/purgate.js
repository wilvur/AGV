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
    fetch('http://www.agv-recursoshumanos.com.ar/api/categorias/')
    .then(response => response.json())
    .then(resultado  => {
        cargaCategorias(resultado);
    } )
    cargarBusquedas();
    
}
);

var ultimaCat = ""
// para restablecer todas las categoraias
function restoreBusquedas(){
    if (ultimaCat === ''){
        cargarBusquedas(); 
    }else{
        cargarBusquedas(ultimaCat);
    } 
}

// PREPARACION DE DATOS DATOS
function cargarBusquedas(categoriaId) {
    busquedasContainer.classList.add("md:grid-cols-2", "lg:grid-cols-3", "md:gap-5");
    //carga las busquedas segun las categorias
    //si no tengo categorias cargo todo   
    fetch('http://www.agv-recursoshumanos.com.ar/api/avisos/')
    .then(response => response.json())
    .then(avisos => {
            if (categoriaId === undefined){
            const busquedas = avisos.filter(aviso => aviso.activo === "1").map(aviso => {
                return Armarcard(aviso.titulo, aviso.introtext, aviso.activo, aviso.descripcion, aviso.categoriaDesc, aviso.zonaDesc, aviso.fechaAlta, aviso.id)  
            }).sort(aviso => aviso.fechaAlta).join('');
            busquedasContainer.innerHTML = busquedas;
            categoriasSummary.innerHTML = "Todas";
            //cargo por categoria
            } else {
            const categoria = categoriaId.toString();
            const busquedasF = avisos.filter(aviso => aviso.categoria === categoria ).map(aviso => {
                    return Armarcard(aviso.titulo, aviso.introtext, aviso.activo, aviso.descripcion, aviso.categoriaDesc, aviso.zonaDesc,aviso.fechaAlta, aviso.id)  
                }).sort(aviso => aviso.fechaAlta).join('');
                categoriaMenu.open = false;
                ultimaCat = categoria;
                
            
            fetch('http://www.agv-recursoshumanos.com.ar/api/categorias/')
            .then(response => response.json())
            .then(categorias =>  { 
                 categorias.filter(categoria => categoria.id === categoriaId.toString()).map(categoria => {
                 categoriasSummary.innerHTML = categoria.descripcion;
                 });
            });
            
            busquedasContainer.innerHTML = busquedasF;
            } 
    } );
} // fin 

function cargarBusqueda(id) {
    // remuevo la clases para acomodar
    busquedasContainer.classList.remove("md:grid-cols-2", "lg:grid-cols-3", "md:gap-5");
    dropMenu.classList.toggle('hidden');
    scroleaTo('busquedasSec');
    fetch('http://www.agv-recursoshumanos.com.ar/api/avisos/')
    .then(response => response.json())
    .then(avisos => {
        const busquedasF = avisos.filter(aviso => aviso.id === id.toString() ).map(aviso => {
            return  `
                <div class="w-full  py-1 sm:p-3 text-white bg-opacity-70 cursor-pointer">
                <!-- boton cerrar -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor" onClick="restoreBusquedas()" >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
            </svg>
            </div>
            <article id="busquedaD" class="bg-white w-full md:w-1/2 rounded-lg shadow-lg mx-auto p-3 mb-12 ">                  
                <span class="text-3xl font-bold text-blue-500 mb-3">${aviso.titulo}</span>
                <div class="text-sm my-3">
                    ${aviso.introtext}
                </div>
                <span class="font-bold" >Rubro:</span> ${aviso.categoriaDesc} - <span class="font-bold">Zona:</span> ${aviso.zonaDesc} 
            
                <div class="mt-3">${aviso.descripcion}</div>
                <div class="text-white text-center bg-azul_Agv1 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">          
                <a href="mailto:agvconsultorarrhh@gmail.com <agvconsultorarrhh@gmail.com>;?&subject=Postulacion:${aviso.titulo}&:cc=&bcc=&body=Adjuntar su CV">
                    Postularse</a> 
                </div>

                <div class="flex justify-between ">
                <div class="text-xs text-gray-500">
                    <div><span class="font-bold">Publicado:</span> ${calculoDias(aviso.fechaAlta)}</div>
                </div>
                <!-- iconos -->
                <div class="flex  cursor-pointer text-xs relative items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    Compartir  
                    <div class="bg-white absolute flex justify-between rounded-lg shadow-lg top-6 right-0 w-40 h-16 p-4">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=http://www.agv-recursoshumanos.com.ar/" target="_blank"> <img src="./img/facebook.png" class="w-8 "alt=""> </a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=http://www.agv-recursoshumanos.com.ar/" target="_blank"> <img src="./img/linkedin.png" class="w-8 "alt=""> </a>
                        ${isMobile() ? '<a href="whatsapp://send?text=http://www.agv-recursoshumanos.com.ar/" data-action="share/whatsapp/share" target="_blank"> <img src="./img/whatsapp.png" class="w-8 " alt=""></a>' : "" } 
                    </div> 
                </div>
            </div>
            </article>
        `});
        busquedasContainer.innerHTML = busquedasF;
    })
      
}

// CATEGORIAS 
function cargaCategorias (categorias) {

   const categoriasDivs =  categorias.filter(categoria => categoria.cantidad > 0).map(categoria => 
            { return `<div class="cursor-pointer text-md " onclick="cargarBusquedas(${categoria.id} )"> ${categoria.descripcion}  (${categoria.cantidad}) </div> `;
        } ).join('');
    //aca va las categorias  
    const categoriaTodas = `<div class="cursor-pointer text-md " onclick="cargarBusquedas()"> Todas </div>` 
    categoriasContainer.innerHTML = categoriaTodas + categoriasDivs;
}

// el template en html
function Armarcard(titulo, intro, activo, descripcion, categoriaDesc, zona, fechaAlta, id) { 
    return `
    <article class="w-full  bg-white rounded-lg flex-col shadow-lg text-gray-700 p-3 mb-3 relative cursor-pointer" onClick="cargarBusqueda(${id.toString()})">
         <div class="absolute right-2 -top-2 shadow-lg bg-white rounded-full ring-2 p-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        </svg>
    </div>
       <span class="text-lg font-bold text-blue-500 mb-3">${titulo}</span>
    <div class="text-sm mt-3 sm:h-24 overflow-hidden">
        ${intro}
    </div>
    <div class="flex-col justify-items-end align-baseline text-xs mt-3">
    <span class="font-bold" >Rubro:</span> ${categoriaDesc} - <span class="font-bold">Zona:</span> ${zona}  
    <div class="text-xs text-gray-500">    
            <span class="font-bold">Publicado:</span> ${calculoDias(fechaAlta)}
    </div>
   </div>
</article>
`;
}

function scroleaTo(id) {
    if (id ==="inicio") { idTop = 0; };
    if (id ==="busquedasSec") { idTop = busquedasSec.offsetTop - 60; };
    if (id ==="serviciosSec") { idTop = serviciosSec.offsetTop - 60; };
    if (id ==="contactoSec") { idTop = contactoSec.offsetTop - 60; };
    // muevo el scroll
    window.scroll({
        top: idTop,
        left: 0,
        behavior: 'smooth'
      });
      dropMenu.classList.toggle('hidden');
}

function calculoDias(fecha) {
    const date1 = new Date(fecha);
    const date2 = Date.now();
    const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10); 

    if ( diffDays < 10) {
        return "Hace " +  diffDays + " Dias";
    } else {       
        // const dateCalculada = date1.addDays(1); 
        const dateC = new Date (date1.setDate(date1.getDate()+1)); //hack para sumarle un dia
        const fechaParse = dateC.toLocaleDateString('es-AR');
        return fechaParse;
    }    
}

function isMobile() {
 if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent)) {
 return true;
} 
}
