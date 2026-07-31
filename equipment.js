// ==================== equipment.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    const boots = [
        { id: 'basic', name: 'Basic Academy Boots', icon: 'fa-shoe-prints', bonus: 'None', price: 0, attr: null, gain: 0 },
        { id: 'speed', name: 'Speed Runner', icon: 'fa-bolt', bonus: '+1 Sprint Speed', price: 500, attr: 'sprintSpeed', gain: 1 },
        { id: 'control', name: 'Control Master', icon: 'fa-futbol', bonus: '+1 Ball Control', price: 600, attr: 'ballControl', gain: 1 },
        { id: 'power', name: 'Power Strike', icon: 'fa-fire', bonus: '+1 Shot Power', price: 700, attr: 'shotPower', gain: 1 },
    ];

    const equippedBoots = player.equippedBoots || 'basic';
    const ownedBoots = player.ownedBoots || ['basic'];

    const bootsGrid = document.getElementById('bootsGrid');
    bootsGrid.innerHTML = boots.map(b => {
        const owned = ownedBoots.includes(b.id);
        const equipped = equippedBoots === b.id;
        return `
            <div class="boot-card ${equipped ? 'equipped' : ''}" data-id="${b.id}">
                <i class="fa-solid ${b.icon}"></i>
                <div class="boot-name">${b.name}</div>
                <div class="boot-bonus">${b.bonus}</div>
                ${!owned ? `<div class="boot-price">£${b.price}</div><button class="btn btn-sm btn-primary" onclick="buyBoot('${b.id}')">Buy</button>` :
                  equipped ? '<div class="boot-bonus">✅ Equipped</div>' :
                  `<button class="btn btn-sm btn-secondary" onclick="equipBoot('${b.id}')">Equip</button>`}
            </div>
        `;
    }).join('');

    window.buyBoot = function(id) {
        const boot = boots.find(b => b.id === id);
        if (!boot) return;
        if ((player.bankBalance || 500) < boot.price) {
            showToast('⚠️ Not enough money!', 'error');
            return;
        }
        player.bankBalance -= boot.price;
        player.ownedBoots = player.ownedBoots || ['basic'];
        player.ownedBoots.push(id);
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('✅ Purchased ' + boot.name + '!', 'success');
        setTimeout(() => location.reload(), 600);
    };

    window.equipBoot = function(id) {
        const boot = boots.find(b => b.id === id);
        if (!boot) return;
        player.equippedBoots = id;
        if (boot.attr && boot.gain && player.attributes) {
            player.attributes[boot.attr] = Math.min(99, (player.attributes[boot.attr] || 40) + boot.gain);
        }
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('👟 Equipped ' + boot.name + '!', 'success');
        setTimeout(() => location.reload(), 600);
    };

    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();