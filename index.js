
var pokeArray = [];

const pokeFetch = async (id) =>{
 
    var respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    var pokemons = await respuesta.json(); 
    pokeNode(pokemons);
    pokeArray.push(pokemons);
    return pokemons; 
}



for(var id=1; id<=150; id++){
    pokeFetch(id);  
   
}

const pokeNode=({id, name, abilities, types})=>{
    const image = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const nombre = name[0].toUpperCase()+name.slice(1);
    const pokeType = types.map(type=>type.type.name);
    const pokeTypeName = pokeType[0].toUpperCase()+pokeType.slice(1);
    const pokeAbilities = abilities.map(ability=>ability.ability.name);
    const pokeAbilitiesName= pokeAbilities[0].toUpperCase()+pokeAbilities.slice(1);
    const node = `
    <div class="col-md-3 col-12" id="move">
        <div class="card mt-5 ml-3">
            <img src="${image}" class="image"/>
            <div class="card-body">
                <h4 class="card-title">${nombre}</h4>
                <p class="card-text">N°: ${id}</p>
                <!--<p class="card-text">Habilidades: ${pokeAbilitiesName}</p>-->
                <p class="card-text">Type: ${pokeTypeName}</p>
            </div>
        </div>
    </div>
    `;
     document.getElementById('pokeApi').insertAdjacentHTML("beforeend",node);
     return node;

}

const borrar= ()=>{
    const borrar2 = document.getElementById("pokeApi");
    borrar2.innerHTML="";
}

const notFound=()=>{
    borrar();
    Swal.fire({
        imageUrl: 'pikaDurmiente.jpg',
        imageHeight: 300, 
        position: 'center',
        title: 'No hay pokemons con ese nombre',
        showConfirmButton: false,
        timer: 2000
    });
    borraInput();
    reset();
}

const reset=()=>{
    borrar();
    for(var id=1; id<=150; id++){
        pokeFetch(id);     
    }
}

const btnReset=()=>{
    const pokeBoton=document.getElementById('pokeApi');
    let boton=document.createElement("button");
    let boton01=document.createTextNode('Volver');
    document.getElementById('pokeApi').addEventListener('click',reset);
    boton.appendChild(boton01);
    boton.classList.add('pokeBoton');
    pokeBoton.appendChild(boton);
}

const buscarPokemon = async()=>{
    const {value: name} = document.getElementById('input');
    const pokeEncontrado =pokeArray.filter(poke=>poke.name.toLowerCase()===name.toLowerCase());
    if(pokeEncontrado.length===0){
        notFound();
        return;
    }
    const busq =pokeEncontrado.map(poke=>poke.name);
    const busq2 = busq.toString();
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busq2}`);
    const pokeRespuesta = await respuesta.json();
    console.log(pokeRespuesta);
    borrar();
    pokeNode(pokeRespuesta);
    borraInput();
    btnReset();
}

const borraInput=()=>{
    const limpiar = document.getElementById('input');
    if(limpiar.value!==null){
        limpiar.value=null;
    }

}

  
const start = async () =>{
    pokemons = await pokeFetch(id);
    document.getElementById('find').addEventListener('click', buscarPokemon);
    move();
}


window.onload = start();

