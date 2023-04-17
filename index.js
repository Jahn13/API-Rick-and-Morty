//Se declaran todas las constantes y let las cuales se utilizan 
//El codigo comentado fue hecho con otra forma mas compleja para hacer y entender bien su funcionamiento.
const API = "https://rickandmortyapi.com/api"
let characters = `${API}/character/?page=1`
const clase = document.querySelector("#container")
const siguiente = document.querySelector("#siguiente")
const atras = document.querySelector("#atras")
const buscar = document.querySelector("#buscar");
const buscador = document.querySelector("#buscador")
const filters = document.querySelectorAll(".btn-check")
let items;
// let i = 1;
// let page;

//Hacemos nuestra funcion para para dibujar o imprimir en nuestra pagina las cards
const dibujarCards = (results) => {
    let arreglo = ""
    let color = "";
    results.forEach(element => {
        if(element.status == "Dead"){
            color = "red";
        }else if(element.status == "Alive"){
            color = "green";
        }else if(element.status == "unknown"){
            color = "grey"
        }
        const card = `
            <div class="d-flex col-lg-4 col-sm-6 col-md-6 justify-content-center mb-3">
                <div class="card" style="width: 18rem;">
                    <img src=${element.image} class="card-img-top" alt="...">
                    <div style="width: auto; background-color: ${color}; position: absolute; heigth: auto; font-size: 15px; border: 3px solid lightgreen; color: white;">${element.status}</div>
                    <div class="card-body text-bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text text-white">Ciudad: ${element.location.name}</p>
                        <p class="card-text text-white">Género: ${element.gender}</p>
                        <p class="card-text text-white"> Orígen: ${element.origin.name}</p>
                        <p class="card-text text-white">Especie: ${element.species}</p>
                    </div>
                </div>
            </div>
        `
    arreglo += card;
    });  
    clase.innerHTML = arreglo;
}

//Hacemos nuestro search para buscar con el imput el nombre de los personajes que queremos ver
const buscarAction = () => {
    // let result = items.filter((element) => 
    // element.name.toLowerCase().includes(buscador.value.toLowerCase())) 
    // dibujarCards(result)
    characters = `${API}/character/?name=${buscador.value}`
    cargarDatos();
}
buscar.addEventListener("click", buscarAction)

//Evento para ir a la pagina siguiente con el button siguiente
siguiente.addEventListener("click", () => {
    // if(page > i){
    //     // i++;
    //     // characters = `${API}/character/?page=${i}`
    //     // window.fetch(characters)
    //     // .then((response) => response.json())
    //     // .then((responseJson) => {
    //     //     dibujarCards(responseJson.results)
    //     //     items = responseJson.results;
    //     // })
    // }
    if(items.info.next){
        siguiente.disable = true;
        characters = items.info.next;
        cargarDatos();
    }
})

//Evento para volver a la pagina anterior con el button atras
atras.addEventListener("click", () => {
    // if(i > 1 && i <= page){
    //     i--
    //     characters = `${API}/character/?page=${i}`
    //     window.fetch(characters)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         dibujarCards(responseJson.results)
    //         items = responseJson.results;
    //     })
    // }
    if(items.info.prev){
        characters = items.info.prev;
        cargarDatos();
    }
})

const addFilterCharacter = (value, origin) => {
    let queryString = "";
    switch(origin)
    {
        case "status":
            queryString = `status=${value}`
        break;
        case "species":
            queryString = `species=${value}`
        break;
        case "gender":
            queryString = `gender=${value}`
        break;
    }
    
    if(characters.includes('?'))
    {
        characters = characters.concat(`&${queryString}`)
    }else{
        characters =  characters.concat(`?${queryString}`)
    }
    
    cargarDatos();
}

filters.forEach(item => item.addEventListener('click', (event) => {
    addFilterCharacter(event.target.labels[0].textContent, event.target.name);
}))

//Hacemos el llamado de nuestras funciones cada vez que se cargara la pagina
const cargarDatos = () => {
    window.fetch(characters)
        .then((response) => response.json())
        .then((responseJson) =>{
            dibujarCards(responseJson.results)
            items = responseJson;
            siguiente.disabled = false;
            // items = responseJson.results;
            // page = responseJson.info.pages;
        })
        .catch(error => { 
            container.innerHTML = "No se encontro nada en su FILTRO"
        })
}
cargarDatos();