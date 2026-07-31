// ==================== transfer.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    document.getElementById('txClub').textContent = player.club || player.academy || '—';
    document.getElementById('txContract').textContent = player.contractExpiry || 'Season 3';
    document.getElementById('txSalary').textContent = '£' + (player.salary || 200) + ' /week';
    document.getElementById('txValue').textContent = '£' + formatNum(player.marketValue || 50000);
    document.getElementById('txClause').textContent = player.releaseClause ? '£' + formatNum(player.releaseClause) : 'None';
    document.getElementById('txAgent').textContent = player.agent || '—';

    // Generate club interest based on OVR
    const interestList = document.getElementById('interestList');
    if (player.ovr >= 55) {
        const clubs = [
            { name: 'Brighton & Hove Albion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png', level: 'medium' },
            { name: 'RB Leipzig', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png', level: 'low' },
        ];
        interestList.innerHTML = clubs.map(c => `
            <div class="interest-item">
                <img src="${c.logo}" alt="${c.name}" onerror="this.style.display='none'">
                <span>${c.name}</span>
                <span class="interest-level level-${c.level}">${c.level.toUpperCase()}</span>
            </div>
        `).join('');
    }

    // Enable transfer request if OVR >= 55 and season > 1
    const btnRequest = document.getElementById('btnRequestTransfer');
    if (player.ovr >= 55 && player.season >= 1) {
        btnRequest.disabled = false;
        btnRequest.addEventListener('click', () => {
            if (confirm('Request a transfer? This may upset your current club.')) {
                player.morale = Math.max(20, (player.morale || 70) - 10);
                player.mediaMentions = player.mediaMentions || [];
                player.mediaMentions.push({ headline: player.name + ' has submitted a transfer request.', date: new Date().toISOString() });
                localStorage.setItem('theJourney_playerData', JSON.stringify(player));
                showToast('📋 Transfer request submitted! Club has been notified.', 'info');
                setTimeout(() => location.reload(), 1000);
            }
        });
    }

    function formatNum(n) { return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toString(); }
    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    // Nav toggle
    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();