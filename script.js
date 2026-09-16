// ---------- Musique de fond ----------
const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgm.play().catch(() => {
      // Le navigateur peut bloquer la lecture auto ; ça sera relancé au prochain clic
    });
    musicStarted = true;
  }
}

muteBtn.addEventListener('click', () => {
  bgm.muted = !bgm.muted;
  muteBtn.textContent = bgm.muted ? '🔇' : '🔊';
  startMusic();
});

// ---------- Navigation entre les deux écrans ----------
const screenStart = document.getElementById('screen-start');
const screenBoard = document.getElementById('screen-board');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');

startBtn.addEventListener('click', () => {
  startMusic(); // le clic utilisateur autorise la lecture audio dans le navigateur
  screenStart.classList.remove('active');
  screenBoard.classList.add('active');
});

backBtn.addEventListener('click', () => {
  screenBoard.classList.remove('active');
  screenStart.classList.add('active');
});

// ---------- Fenêtre modale des dates ----------
const dateModal = document.getElementById('date-modal');
const modalTitle = document.getElementById('modal-title');
const modalDates = document.getElementById('modal-dates');
const modalClose = document.getElementById('modal-close');

function openDateModal(playerName, dates) {
  modalTitle.textContent = playerName;
  modalDates.textContent = dates;
  dateModal.classList.add('active');
}

function closeDateModal() {
  dateModal.classList.remove('active');
}

modalClose.addEventListener('click', closeDateModal);

// Ferme la modale si on clique en dehors de la boîte
dateModal.addEventListener('click', (e) => {
  if (e.target === dateModal) closeDateModal();
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
  const revealBtn = document.createElement('button');
  revealBtn.className = 'reveal-btn';
  revealBtn.textContent = 'AFFICHER';
  revealBtn.addEventListener('click', () => openDateModal(player.name, player.dates));
  tdDate.appendChild(revealBtn);

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
