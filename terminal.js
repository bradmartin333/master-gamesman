class Terminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.commands = options.commands || {};
        this.prompt = options.prompt || "what is your name, explorer";
        this.initName = options.prompt === undefined;
        this.name = "EXPLORER";

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="stdout"></div>
            <div class="cli-container">
                <span class="prompt">></span>
                <input type="text" class="cli-input" spellcheck="false" autofocus>
            </div>
        `;

        this.stdout = this.container.querySelector('.stdout');
        this.input = this.container.querySelector('.cli-input');

        this.stdout.innerText = this.prompt;

        document.addEventListener('click', () => this.input.focus());
        this.input.addEventListener('blur', () => this.input.focus());

        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.input.value.trim().toLowerCase();
                this.handleCommand(cmd);
                this.input.value = '';
            }
        });
    }

    handleCommand(cmd) {
        if (this.initName) {
            this.initName = false;
            this.name = cmd.toUpperCase() || "EXPLORER";
            const response = this.commands['welcome']();
            this.print(response);
            return;
        }
        const firstChar = cmd.charAt(0);
        if (this.commands[firstChar]) {
            const response = this.commands[firstChar]();
            this.print(response);
        } else {
            const response = this.commands['*']();
            this.print(response);
        }
    }

    print(text) {
        this.stdout.innerText = text;
    }
}

function addGitHubLinkButton() {
    if (!document.body || document.getElementById('github-link-button')) {
        return;
    }

    const githubUrl = window.GITHUB_LINK_URL || 'https://github.com/bradmartin333/master-gamesman';
    const link = document.createElement('a');
    link.id = 'github-link-button';
    link.className = 'github-link-button';
    link.href = githubUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'View on GitHub');
    link.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.18c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.85 2.82 1.31 3.5 1 .11-.79.42-1.31.76-1.61-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.56.12-3.25 0 0 1-.32 3.3 1.23a11.44 11.44 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.69.25 2.94.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor"></path>
        </svg>
    `;

    document.body.appendChild(link);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGitHubLinkButton);
} else {
    addGitHubLinkButton();
}