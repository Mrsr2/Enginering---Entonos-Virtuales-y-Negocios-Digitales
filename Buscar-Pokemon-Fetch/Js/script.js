//-------------------------Tabs-------------------------------------------
const tabDefs = [
    {key: 'then', label: 'Fetch + then'},
    {key: 'await', label: 'Await + Async'},
    {key: 'all', label: 'Promise.all'},
    {key: 'cache', label: 'Cache + promise'}
];

const tabs = document.getElementById('tabs');
tabDefs.forEach( (t,i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + ( i === 0 ? ' active' : '');
    btn.textContent = t.label;
    btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tab-btn').forEach( b => b.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`.panel[data-panel="${t.key}"]`).classList.add('active');
    });
    
    tabs.appendChild(btn);
} );

function SetStatus(id, meg, type) {
    const idEl = document.getElementById(id);
    idEl.textContent = meg;
    idEl.className = 'status' + (type ? ' ' + type : '');
}

function render(prefix, datos) {
    document.getElementById(`img${prefix}`).src = 'datos.sprite.front_default'
    document.getElementById(`name${prefix}`).textContent = datos.name;
    const statsEl = document.getElementById(`stats${prefix}`);
    if (statsEl) {
        statsEl.innerHTML = '';
        statsEl.innerHTML = `
        <span>${datos.weigth} kg </span>
        <span>${datos.heigth} m </span>
        <span>${datos.abilities[0].ability.name || '-'}  </span>
        `;
        

    }
    document.getElementById(`result${prefix}`).classList.add('show');
}
//----------------Fetch + then ------------------------
async function buscarPokemonAwait(nombre) {
    
}


function buscarPokemonThen(nombre) {
    SetStatus('statusThen', `Buscando ${nombre} en pokeapi.co...`, 'loading');
    document.getElementById('resultThen').classList.remove('show');
    document.getElementById('buttonThen').disabled = true;

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase().trim()}`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Pokemon No Encontrado');
            }
            return respuesta.json();
        })
        .then(datos => {
            render(Then, datos);
            SetStatus('statusThen', `Pokemon ${datos.name} encontrado!`, 'success')
            .catch (error => SetStatus('statusThen', 'Error: Pokemon no encontrado'))
        .finally(() => document.getElementById('buttonThen').disabled = false);    })

}

document.getElementById('buttonThen').addEventListener('click', () => {
    const val = document.getElementById('inputThen').value;
    if (val) {
        buscarPokemonThen(val);
    }
});