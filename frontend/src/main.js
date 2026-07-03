import './style.css'

window.openLoginModal = function () {
  const modal = document.getElementById('login-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeLoginModal = function () {
  const modal = document.getElementById('login-modal');
  if (modal) modal.classList.add('hidden');
};

window.handleLoginSubmit = function (event) {
  event.preventDefault();

  const nameInput = document.getElementById('input-name');
  const usernameInput = document.getElementById('input-username');
  const errorMsg = document.getElementById('login-error-msg');

  const name = nameInput.value.trim();
  const username = usernameInput.value.trim().toLowerCase();

  if (!name || !username) return;

  let users = JSON.parse(localStorage.getItem('anek_users') || '[]');

  const taken = users.find(u => u.username === username && u.name !== name);

  if (taken) {
    if (errorMsg) errorMsg.classList.remove('hidden');
    return;
  }

  if (errorMsg) errorMsg.classList.add('hidden');

  localStorage.setItem('anek_current_user', JSON.stringify({ name, username }));

  if (!users.find(u => u.username === username)) {
    users.push({ name, username, joinedAt: new Date().toISOString(), rank: 'Vanguard Rank I', points: 120 });
    localStorage.setItem('anek_users', JSON.stringify(users));
  }

  window.location.href = '/local_impact.html';
};

const mockFeedData = [
  {
    type: "HAZARD",
    color: "red",
    time: "45m ago",
    title: "Downed Power Line on Oak St",
    desc: "Severe storm caused a large branch to take down the local power lines near the community center. Avoid area.",
    user: "SafetyFirst_99",
    action: "VERIFY STATUS"
  },
  {
    type: "COMMUNITY",
    color: "blue",
    time: "3h ago",
    title: "Weekend Park Cleanup",
    desc: "Organizing a volunteer squad to clear the debris left from the weekend festival at Centennial Park. We need trash bags and gloves.",
    user: "EcoWarrior",
    action: "JOIN EFFORT"
  },
  {
    type: "RESOLVED",
    color: "green",
    time: "1d ago",
    title: "Pothole on Main & 4th Fixed",
    desc: "City works have filled the massive pothole reported last week by our network. Safe driving everyone!",
    user: "Citizen.41",
    action: "+50 GCP Awarded"
  },
  {
    type: "PROPOSAL",
    color: "purple",
    time: "2d ago",
    title: "New Bike Lanes on West Ave",
    desc: "Proposal to convert the outer parking lane into a protected bike route. Seeking local signatures for the petition.",
    user: "UrbanCyclist",
    action: "SIGN PETITION"
  }
];

window.addEventListener('DOMContentLoaded', () => {
  const feedContainer = document.getElementById('local-pulse-feed');
  if (feedContainer) {
    feedContainer.innerHTML = mockFeedData.map(item => `
      <div class="bg-white/90 backdrop-blur-sm border-b-2 md:border-b-0 md:border-r-2 border-primary p-md space-y-sm hover:bg-white transition-colors cursor-pointer w-full h-full">
          <div class="flex justify-between items-center">
              <span class="font-mono text-[10px] bg-${item.color}-100 text-${item.color}-800 border border-${item.color}-800 px-2 py-0.5 font-bold">${item.type}</span>
              <span class="font-mono text-[10px] text-on-surface-variant">${item.time}</span>
          </div>
          <h4 class="font-cabin text-2xl text-primary leading-tight">${item.title}</h4>
          <p class="font-sans text-sm text-on-surface-variant">${item.desc}</p>
          <div class="flex justify-between items-center border-t border-dashed border-outline-variant pt-xs mt-auto">
              <span class="font-mono text-[10px] text-primary">By: ${item.user}</span>
              <button onclick="openLoginModal()" class="font-mono text-[10px] bg-primary text-white border border-primary px-2 py-1 hover:bg-white hover:text-primary transition-all font-bold">${item.action}</button>
          </div>
      </div>
    `).join('');
  }
});
import './components.js';

window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('transition-transform', 'duration-300');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const sidebar = document.querySelector('aside#sidebar');
            if (window.scrollY > lastScrollY && window.scrollY > 64) {
                // Scrolling down, hide header
                header.classList.add('-translate-y-full');
                if (sidebar) {
                    sidebar.style.top = '0px';
                    sidebar.style.height = '100vh';
                }
            } else {
                // Scrolling up, show header
                header.classList.remove('-translate-y-full');
                if (sidebar) {
                    sidebar.style.top = '';
                    sidebar.style.height = '';
                }
            }
            lastScrollY = window.scrollY;
        });
    }
});
