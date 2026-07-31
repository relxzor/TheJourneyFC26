// ==================== financial.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    const balance = player.bankBalance || 500;
    document.getElementById('balanceDisplay').textContent = '£' + formatNum(balance);

    document.getElementById('incomeList').innerHTML = `
        <div class="income-item"><span>Weekly Salary</span><span>£${player.salary||200}</span></div>
        <div class="income-item"><span>Sponsor Income</span><span>£${(player.sponsors||[]).reduce((s,x)=>s+(x.value||0),0)}</span></div>
        <div class="income-item"><span>Match Bonuses</span><span>£0</span></div>
    `;

    const weeklyExpenses = Math.round((player.salary || 200) * 0.375);
    document.getElementById('expenseList').innerHTML = `
        <div class="expense-item"><span>Living Expenses</span><span>£${weeklyExpenses}</span></div>
        <div class="expense-item"><span>Agent Fees</span><span>£${Math.round((player.salary||200)*0.05)}</span></div>
        <div class="expense-item"><span>Tax</span><span>£${Math.round((player.salary||200)*0.2)}</span></div>
        <div class="expense-item"><span>Insurance</span><span>£15</span></div>
    `;

    function formatNum(n) { return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toString(); }

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();