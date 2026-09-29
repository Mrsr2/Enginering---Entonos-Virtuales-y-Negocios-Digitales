

//=============== TAPS =========== Chocolate 
const tabDefs = [
    { key: 'then', label: 'Fetch + then' },
    { key: 'await', label: 'Fetch + async' },
    { key: 'all', label: 'Promise.all' },
    { key: 'cache', label: 'Fetch + promise' },

];
const tabs = document.getElementById('tabs');
tabDefs.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' active' : '');

    btn.textContent = t.label;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => classList.remove('active'));
        btn.classList.add('active');
        document.quierySelector(`.panel[data-panel="{t.key}"]`.classList.add('active') );
    });

    tabs.appendChild(btn)
});