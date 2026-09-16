// ---------- Navigation entre les deux écrans ----------
const screenStart = document.getElementById('screen-start');
const screenBoard = document.getElementById('screen-board');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');

startBtn.addEventListener('click', () => {
  screenStart.classList.remove('active');
  screenBoard.classList.add('active');
});

backBtn.addEventListener('click', () => {
  screenBoard.classList.remove('active');
  screenStart.classList.add('active');
});

// ---------- Génération du tableau à partir de players.js ----------
const tbody = document.getElementById('score-body');
document.getElementById('depuis-date').textContent = DEPUIS;

// Trie les joueurs par nombre de couronnes décroissant
const sorted = [...PLAYERS].sort((a, b) => b.crowns - a.crowns);

sorted.forEach((player, index) => {
  const tr = document.createElement('tr');

  const tdName = document.createElement('td');
  tdName.textContent = `${index + 1}. ${player.name}`;

  const tdCrowns = document.createElement('td');
  tdCrowns.className = 'crowns';
  tdCrowns.textContent = '👑'.repeat(player.crowns);

  const tdDate = document.createElement('td');
  tdDate.className = 'date';
  tdDate.textContent = player.dates;

  tr.append(tdName, tdCrowns, tdDate);
  tbody.appendChild(tr);
});

// Ajoute des lignes vides pour garder le style du tableau même avec peu de joueurs
for (let i = 0; i < NB_LIGNES_VIDES; i++) {
  const tr = document.createElement('tr');
  tr.className = 'empty-row';
  tr.innerHTML = '<td></td><td></td><td></td>';
  tbody.appendChild(tr);
}
