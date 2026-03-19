class Terminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.commands = options.commands || {};
        this.prompt = options.prompt || "System Initialized...";

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
        if (this.commands[cmd]) {
            const response = this.commands[cmd]();
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