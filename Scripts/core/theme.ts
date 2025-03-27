/**
 * Theme management for dark mode
 */

// Export the class directly (no namespace)
export class ThemeManager {
    private readonly STORAGE_KEY = 'color-theme';
    private readonly darkIcon: HTMLElement | null;
    private readonly lightIcon: HTMLElement | null;
    private readonly themeToggleBtn: HTMLElement | null;

    constructor() {
        this.darkIcon = document.getElementById('theme-toggle-dark-icon');
        this.lightIcon = document.getElementById('theme-toggle-light-icon');
        this.themeToggleBtn = document.getElementById('theme-toggle');

        this.initTheme();
        this.setupListeners();
    }

    private initTheme(): void {
        // Set the initial theme based on localStorage or system preference
        if (localStorage.getItem(this.STORAGE_KEY) === 'dark' ||
            (!localStorage.getItem(this.STORAGE_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            this.showLightIcon();
        } else {
            document.documentElement.classList.remove('dark');
            this.showDarkIcon();
        }
    }

    private setupListeners(): void {
        // Toggle theme when the button is clicked
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                    this.showLightIcon();
                } else {
                    document.documentElement.classList.remove('dark');
                    this.showDarkIcon();
                }
            }
        });
    }

    private toggleTheme(): void {
        const isDark = document.documentElement.classList.toggle('dark');

        if (isDark) {
            this.showLightIcon();
            localStorage.setItem(this.STORAGE_KEY, 'dark');
        } else {
            this.showDarkIcon();
            localStorage.setItem(this.STORAGE_KEY, 'light');
        }
    }

    private showDarkIcon(): void {
        if (this.darkIcon && this.lightIcon) {
            this.darkIcon.classList.remove('hidden');
            this.lightIcon.classList.add('hidden');
        }
    }

    private showLightIcon(): void {
        if (this.darkIcon && this.lightIcon) {
            this.darkIcon.classList.add('hidden');
            this.lightIcon.classList.remove('hidden');
        }
    }
}