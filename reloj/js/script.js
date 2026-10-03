(function(){
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('date');

    const formatBtn = document.getElementById('formatBtn');
    const themeBtn = document.getElementById('themeBtn');

    let is24h = true;

    const dia = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    function pad(n){
        return n.toString().padStart(2, '0');
    }

    function updateClock(){
        const now = new Date();

        let hours = now.getHours();
        let minutes = pad(now.getMinutes());
        let seconds = pad(now.getSeconds());

        let ampmhtml = '';

        if (!is24h){
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours === 0 ? 12 : hours;

            ampmhtml = `<span class="ampm">${ampm}</span>`;
        }

        clockEl.innerHTML = `${pad(hours)}<span class="colon">:</span>${minutes}<span class="colon">:</span>${seconds}${ampmhtml}`;

        const diaSemana = dia[now.getDay()];
        const numDia = now.getDate();
        const mes = meses[now.getMonth()];
        const anio = now.getFullYear();

        dateEl.textContent = `${diaSemana}, ${numDia} de ${mes} de ${anio}`;
    }// fin de updateclock
    
    themeBtn.addEventListener('click', () => {

        const root = document.documentElement;
        const current = root.getAttribute('data-theme');

        if (current === 'dark') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark'); 
            
        }
        
    });
    formatBtn.addEventListener('click', () => {
        is24h = !is24h;
        formatBtn.textContent = is24h ? "formato 12h" : "Formato 24h";
        formatBtn.classList.toggle('active', is24h);
        updateClock();
        
    });
    updateClock();
    setInterval(updateClock, 1000);
})();