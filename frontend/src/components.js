class AnekSidebar extends HTMLElement {
    connectedCallback() {
        const path = window.location.pathname;
        const isActive = (href) => path.includes(href) ? 'nav-item-active' : 'border-transparent hover:border-gray-900 hover:bg-white/40';
        const isTextActive = (href) => path.includes(href) ? 'text-primary' : 'text-gray-900';
        const isIconActive = (href) => path.includes(href) ? 'nav-icon-active' : 'bg-white/40 border-gray-900 text-gray-900 group-hover:bg-white';

        this.innerHTML = `
            <!-- Mobile Sidebar Overlay -->
            <div id="sidebar-overlay"
                class="fixed inset-0 z-[50] hidden md:hidden bg-black/20 backdrop-blur-sm transition-opacity duration-300">
            </div>

            <aside id="sidebar"
                class="-translate-x-full md:translate-x-0 fixed md:sticky md:top-16 left-0 w-[75vw] md:w-[320px] top-0 h-[100vh] md:h-[calc(100vh-64px)] px-4 pb-4 pt-2 flex flex-col justify-between z-[60] transition-all duration-300 overflow-x-hidden glass-card border-r-2 border-gray-900/20 shrink-0">
                <div id="sidebar-content" class="space-y-sm transition-opacity duration-300 w-full pt-4">

                    <!-- Toggle Button inside sidebar -->
                    <button id="sidebar-toggle-inside"
                        class="nav-btn flex items-center gap-sm py-1 px-2 hover:bg-white/40 w-full group text-left rounded-none border border-transparent hover:border-gray-900 transition-all shrink-0 relative z-10 mb-4">
                        <div
                            class="w-12 h-12 rounded-full border-1 border-transparent group-hover:bg-white/40 group-hover:border-gray-900 flex items-center justify-center text-gray-900 transition-all shrink-0">
                            <span class="material-symbols-outlined text-3xl">menu</span>
                        </div>
                        <div class="ml-2">
                            <p class="font-mono text-xs font-bold text-gray-900">Close Menu</p>
                        </div>
                    </button>

                    <!-- Climbing Vine Interactive Area -->
                    <div id="vine-container"
                        class="relative py-2 flex flex-col gap-3 pl-0 md:pl-14 select-none transition-all duration-300">
                        <!-- The SVG Vine drawing line -->
                        <svg id="vine-svg"
                            class="absolute left-2 top-0 bottom-0 w-12 h-full pointer-events-none hidden md:block"
                            viewBox="0 0 48 350" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Main stem -->
                            <path d="M 20 0 C 22 80, 18 170, 20 250 C 22 290, 18 320, 20 350" stroke="#4a3728"
                                stroke-width="5" stroke-linecap="round" />
                            <path d="M 20 0 C 22 80, 18 170, 20 250 C 22 290, 18 320, 20 350" stroke="#4f772d"
                                stroke-width="2" stroke-linecap="round" />

                            <!-- Loop 1 (y = 28) -->
                            <path d="M 20 18 C 32 18, 45 22, 45 28 C 45 34, 32 38, 20 34" stroke="#4f772d"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M 38 22 C 40 16, 46 18, 38 22 Z" fill="#90a955" stroke="#4f772d" stroke-width="1" />

                            <!-- Loop 2 (y = 96) -->
                            <path d="M 20 86 C 32 86, 45 90, 45 96 C 45 102, 32 106, 20 102" stroke="#4f772d"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M 38 86 C 40 80, 46 82, 38 86 Z" fill="#90a955" stroke="#4f772d" stroke-width="1" />

                            <!-- Loop 3 (y = 164) -->
                            <path d="M 20 154 C 32 154, 45 158, 45 164 C 45 170, 32 174, 20 170" stroke="#4f772d"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M 38 150 C 40 144, 46 146, 38 150 Z" fill="#90a955" stroke="#4f772d"
                                stroke-width="1" />

                            <!-- Loop 4 (y = 232) -->
                            <path d="M 20 222 C 32 222, 45 226, 45 232 C 45 238, 32 242, 20 238" stroke="#4f772d"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M 38 214 C 40 208, 46 210, 38 214 Z" fill="#90a955" stroke="#4f772d"
                                stroke-width="1" />

                            <!-- Loop 5 (y = 300) -->
                            <path d="M 20 290 C 32 290, 45 294, 45 300 C 45 306, 32 310, 20 306" stroke="#4f772d"
                                stroke-width="2.5" stroke-linecap="round" />
                            <path d="M 38 278 C 40 272, 46 274, 38 278 Z" fill="#90a955" stroke="#4f772d"
                                stroke-width="1" />
                        </svg>

                        <!-- Vine Nodes -->
                        
                        <a href="/local_impact.html"
                            class="nav-btn flex items-center gap-sm py-1 px-2 w-full group text-left rounded-none border transition-all shrink-0 relative z-10 ${isActive('local_impact.html')}">
                            <div
                                class="w-12 h-12 rounded-full border-2 backdrop-blur-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(17,24,39,0.8)] transition-all shrink-0 ${isIconActive('local_impact.html')}">
                                <span class="material-symbols-outlined">map</span>
                            </div>
                            <div class="ml-2">
                                <p class="font-mono text-xs font-bold group-hover:underline ${isTextActive('local_impact.html')}">Local Map</p>
                                <p class="font-sans text-[10px] text-gray-800 font-bold">Browse local issues</p>
                            </div>
                        </a>

                        <a href="/report_problem.html"
                            class="nav-btn flex items-center gap-sm py-1 px-2 w-full group text-left rounded-none border transition-all shrink-0 relative z-10 ${isActive('report_problem.html')}">
                            <div
                                class="w-12 h-12 rounded-full border-2 backdrop-blur-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(17,24,39,0.8)] transition-all shrink-0 ${isIconActive('report_problem.html')}">
                                <span class="material-symbols-outlined">edit_note</span>
                            </div>
                            <div class="ml-2">
                                <p class="font-mono text-xs font-bold group-hover:underline ${isTextActive('report_problem.html')}">Report Issue</p>
                                <p class="font-sans text-[10px] text-gray-800 font-bold">Report a problem</p>
                            </div>
                        </a>

                        <a href="/contribution_log.html"
                            class="nav-btn flex items-center gap-sm py-1 px-2 w-full group text-left rounded-none border transition-all shrink-0 relative z-10 ${isActive('contribution_log.html')}">
                            <div
                                class="w-12 h-12 rounded-full border-2 backdrop-blur-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(17,24,39,0.8)] transition-all shrink-0 ${isIconActive('contribution_log.html')}">
                                <span class="material-symbols-outlined">history_edu</span>
                            </div>
                            <div class="ml-2">
                                <p class="font-mono text-xs font-bold group-hover:underline ${isTextActive('contribution_log.html')}">My Contributions</p>
                                <p class="font-sans text-[10px] text-gray-800 font-bold">Track contributions</p>
                            </div>
                        </a>

                        <a href="/leaderboard.html"
                            class="nav-btn flex items-center gap-sm py-1 px-2 w-full group text-left rounded-none border transition-all shrink-0 relative z-10 ${isActive('leaderboard.html')}">
                            <div
                                class="w-12 h-12 rounded-full border-2 backdrop-blur-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(17,24,39,0.8)] transition-all shrink-0 ${isIconActive('leaderboard.html')}">
                                <span class="material-symbols-outlined">leaderboard</span>
                            </div>
                            <div class="ml-2">
                                <p class="font-mono text-xs font-bold group-hover:underline ${isTextActive('leaderboard.html')}">Top Citizens</p>
                                <p class="font-sans text-[10px] text-gray-800 font-bold">Citizen standings</p>
                            </div>
                        </a>

                        <a href="/rewards.html"
                            class="nav-btn flex items-center gap-sm py-1 px-2 w-full group text-left rounded-none border transition-all shrink-0 relative z-10 ${isActive('rewards.html')}">
                            <div
                                class="w-12 h-12 rounded-full border-2 backdrop-blur-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(17,24,39,0.8)] transition-all shrink-0 ${isIconActive('rewards.html')}">
                                <span class="material-symbols-outlined">workspace_premium</span>
                            </div>
                            <div class="ml-2">
                                <p class="font-mono text-xs font-bold group-hover:underline ${isTextActive('rewards.html')}">Rewards</p>
                                <p class="font-sans text-[10px] text-gray-800 font-bold">Redeem citizen points</p>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Sidebar branding footer -->
                <div id="sidebar-footer"
                    class="hide-on-minimize border-t border-gray-900/20 pt-sm transition-opacity duration-300 w-full">
                    <p class="font-mono text-[9px] text-gray-800 font-bold">Rooted in Solidarity • © 2026</p>
                </div>
            </aside>
        `;

        const headerToggleBtn = document.getElementById('sidebar-toggle');
        const insideToggleBtn = this.querySelector('#sidebar-toggle-inside');
        const aside = this.querySelector('#sidebar');
        const overlay = this.querySelector('#sidebar-overlay');

        const toggleSidebar = () => {
            if (window.innerWidth < 768) {

                aside.classList.toggle('-translate-x-full');
                overlay.classList.toggle('hidden');
                aside.classList.remove('sidebar-minimized');
            } else {

                aside.classList.toggle('sidebar-minimized');
            }
        };

        if (headerToggleBtn) {
            const newBtn = headerToggleBtn.cloneNode(true);
            headerToggleBtn.parentNode.replaceChild(newBtn, headerToggleBtn);
            newBtn.classList.add('md:hidden');
            newBtn.addEventListener('click', toggleSidebar);
        }

        if (insideToggleBtn) {
            insideToggleBtn.addEventListener('click', toggleSidebar);
        }

        if (overlay) {
            overlay.addEventListener('click', toggleSidebar);
        }
    }
}

customElements.define('anek-sidebar', AnekSidebar);

class AnekHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <header class="bg-white h-16 sticky top-0 z-40 border-b-2 border-outline-variant flex justify-between items-center px-margin w-full max-w-full">
        <div class="flex items-center gap-sm">
            <button class="material-symbols-outlined text-primary hover:bg-primary-container p-1 border-2 border-transparent hover:border-primary transition-all" id="sidebar-toggle">menu</button>
            <a href="/" class="font-cabin text-3xl font-bold text-primary tracking-tighter uppercase ml-2 hover:opacity-80 transition-opacity">Anek</a>
        </div>
        <div class="flex items-center gap-sm">
            <button id="global-dark-mode-toggle" class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">dark_mode</button>
            <div class="hidden sm:flex items-center gap-2 bg-surface-container-low px-3 py-1 border-2 border-primary text-xs font-mono">
                <span class="w-2.5 h-2.5 rounded-full bg-forest-moss"></span>
                <span>Active Session: <strong id="header-username">Citizen</strong></span>
            </div>
            <a href="#" id="global-logout-btn" class="material-symbols-outlined text-on-surface-variant hover:text-red-600 transition-all" title="Logout">logout</a>
        </div>
    </header>
        `;

        const userJson = localStorage.getItem('anek_current_user');
        if (userJson) {
            try {
                const user = JSON.parse(userJson);
                const el = this.querySelector('#header-username');
                if (el) el.innerText = user.username;
            } catch (e) { }
        }

        this.querySelector('#global-logout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Whoa there, going somewhere? Sure you wanna log out?')) {
                localStorage.removeItem('anek_access_token');
                localStorage.removeItem('anek_current_user');
                window.location.href = '/index.html';
            }
        });

        const darkModeBtn = this.querySelector('#global-dark-mode-toggle');
        const updateIcon = () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (darkModeBtn) darkModeBtn.innerText = isDark ? 'light_mode' : 'dark_mode';
        };

        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                document.documentElement.classList.toggle('light');
                const isDark = document.documentElement.classList.contains('dark');
                localStorage.setItem('anek_theme', isDark ? 'dark' : 'light');
                updateIcon();
            });
        }
        updateIcon();
    }
}
customElements.define('anek-header', AnekHeader);

class AnekFooter extends HTMLElement {
    connectedCallback() {
        const path = window.location.pathname;
        const isActive = (href) => path.includes(href) ? 'text-primary scale-110' : 'text-on-surface-variant';

        this.innerHTML = `
    <nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-white px-xs py-2 border-t-2 border-primary z-50">
        <a href="/local_impact.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('local_impact.html')}">
            <span class="material-symbols-outlined">map</span>
            <span class="font-mono text-[9px]">Map</span>
        </a>
        <a href="/report_problem.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('report_problem.html')}">
            <span class="material-symbols-outlined">edit_note</span>
            <span class="font-mono text-[9px]">Report</span>
        </a>
        <a href="/contribution_log.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('contribution_log.html')}">
            <span class="material-symbols-outlined">auto_graph</span>
            <span class="font-mono text-[9px]">Log</span>
        </a>
        <a href="/leaderboard.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('leaderboard.html')}">
            <span class="material-symbols-outlined">military_tech</span>
            <span class="font-mono text-[9px]">Rank</span>
        </a>
        <a href="/rewards.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('rewards.html')}">
            <span class="material-symbols-outlined">workspace_premium</span>
            <span class="font-mono text-[9px]">Reward</span>
        </a>
    </nav>
    <footer class="w-full py-md border-t-2 border-dashed border-outline-variant bg-white flex flex-col items-center gap-xs px-margin text-center mb-16 md:mb-0 mt-8">
        <div class="font-mono text-xs font-bold text-primary uppercase">ANEK CIVIC NETWORK</div>
        <p class="font-mono text-[9px] text-on-surface-variant opacity-60">
            © 2026 Anek Civic Action Network · Hand-crafted for local resilience.
        </p>
    </footer>
        `;
    }
}
customElements.define('anek-footer', AnekFooter);

(function initTheme() {
    const savedTheme = localStorage.getItem('anek_theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
})();
