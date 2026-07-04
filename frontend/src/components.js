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
                class="-translate-x-full md:translate-x-0 fixed md:relative left-0 w-[75vw] md:w-[320px] top-0 h-full min-h-screen md:min-h-full px-4 pb-4 pt-2 flex flex-col justify-between z-[60] transition-all duration-300 overflow-x-hidden glass-card border-r-2 border-gray-900/20 shrink-0">
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
                    <p class="font-mono text-[10px] text-gray-800 font-bold">Built with love by Elite Debuggers</p>
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
            <a href="/" class="font-cabin text-3xl font-bold text-primary tracking-tighter uppercase ml-2 hover:opacity-80 transition-opacity">Anek</a>
        </div>
        <div class="flex items-center gap-sm">
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
            <span class="font-mono text-[10px]">Map</span>
        </a>
        <a href="/report_problem.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('report_problem.html')}">
            <span class="material-symbols-outlined">edit_note</span>
            <span class="font-mono text-[10px]">Report</span>
        </a>
        <a href="/contribution_log.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('contribution_log.html')}">
            <span class="material-symbols-outlined">auto_graph</span>
            <span class="font-mono text-[10px]">Log</span>
        </a>
        <a href="/leaderboard.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('leaderboard.html')}">
            <span class="material-symbols-outlined">military_tech</span>
            <span class="font-mono text-[10px]">Rank</span>
        </a>
        <a href="/rewards.html" class="flex flex-col items-center justify-center transition-transform active:scale-95 ${isActive('rewards.html')}">
            <span class="material-symbols-outlined">workspace_premium</span>
            <span class="font-mono text-[10px]">Reward</span>
        </a>
    </nav>
    <footer class="w-full py-md border-t-2 border-dashed border-primary/20 bg-white flex flex-col items-center gap-xs px-margin text-center mb-16 md:mb-0">
        <p class="font-mono text-xs text-primary font-bold uppercase">Anēk • by Elite Debuggers</p>
        <div class="flex gap-4 my-2">
            <a href="https://github.com/EliteDebuggers" target="_blank"
                class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd" />
                </svg>
                GitHub
            </a>
            <a href="https://www.instagram.com/elite.debuggers/" target="_blank"
                class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors"
                title="I will add it later">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd" />
                </svg>
                Instagram
            </a>
            <a href="/privacy_policy.html"
                class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors">
                Privacy Policy
            </a>
            <a href="/terms.html"
                class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors">
                Terms of Service
            </a>
        </div>
        <p class="font-mono text-[10px] text-on-surface-variant opacity-60">
            © 2026 Anēk • Building the forest, leaf by leaf.
        </p>
    </footer>
        `;
    }
}
customElements.define('anek-footer', AnekFooter);

class AnekLandingFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="w-full py-lg glass-card border-t-2 border-dashed border-primary/20 flex flex-col items-center gap-xs px-margin text-center mt-auto">
            <p class="font-mono text-xs text-primary font-bold uppercase">Anēk • by Elite Debuggers</p>
            <div class="flex gap-4 my-2">
                <a href="https://github.com/EliteDebuggers" target="_blank"
                    class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clip-rule="evenodd" />
                    </svg>
                    GitHub
                </a>
                <a href="https://www.instagram.com/elite.debuggers/" target="_blank"
                    class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors"
                    title="I will add it later">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clip-rule="evenodd" />
                    </svg>
                    Instagram
                </a>
                <a href="/privacy_policy.html"
                    class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors">
                    Privacy Policy
                </a>
                <a href="/terms.html"
                    class="flex items-center font-mono text-[10px] uppercase text-gray-600 border-b border-transparent hover:border-primary hover:text-primary transition-colors">
                    Terms of Service
                </a>
            </div>
            <p class="font-mono text-[10px] text-on-surface-variant">© 2026 Anēk • Building the forest, leaf by leaf.</p>
        </footer>
        `;
    }
}
customElements.define('anek-landing-footer', AnekLandingFooter);

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
