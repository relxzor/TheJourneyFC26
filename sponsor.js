// ==================== sponsor.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    document.getElementById('repValue').textContent = player.reputation || 0;

    const dealsList = document.getElementById('dealsList');
    const sponsors = player.sponsors || [];
    if (sponsors.length > 0) {
        dealsList.innerHTML = sponsors.map(s => `
            <div class="deal-item">
                <span>${s.brand || 'Sponsor'}</span>
                <span class="deal-value">£${s.value || 0}/week</span>
            </div>
        `).join('');
    }

    // Generate offers based on reputation
    const offersList = document.getElementById('offersList');
    const rep = player.reputation || 0;
    let offersHTML = '';
    if (rep >= 5) {
        offersHTML += `
            <div class="offer-item">
                <span>Local Sports Shop</span>
                <span>£50/week</span>
                <button class="btn btn-primary btn-sm" onclick="acceptOffer('Local Sports Shop', 50)">Accept</button>
            </div>`;
    }
    if (rep >= 15) {
        offersHTML += `
            <div class="offer-item">
                <span>Regional Brand</span>
                <span>£200/week</span>
                <button class="btn btn-primary btn-sm" onclick="acceptOffer('Regional Brand', 200)">Accept</button>
            </div>`;
    }
    if (rep >= 30) {
        offersHTML += `
            <div class="offer-item">
                <span>Nike Boot Deal</span>
                <span>£1,000/week</span>
                <button class="btn btn-primary btn-sm" onclick="acceptOffer('Nike', 1000)">Accept</button>
            </div>`;
    }
    offersList.innerHTML = offersHTML || '<p class="no-data">No offers available. Build your reputation.</p>';

    window.acceptOffer = function(brand, value) {
        player.sponsors = player.sponsors || [];
        player.sponsors.push({ brand, value, signed: new Date().toISOString() });
        player.bankBalance = (player.bankBalance || 500) + value * 4;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('✅ Signed with ' + brand + '! £' + value + '/week', 'success');
        setTimeout(() => location.reload(), 800);
    };

    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();