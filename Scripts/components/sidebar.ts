/**
 * Sidebar and navigation functionality
 */

export class SidebarManager {
    private sidebarEl: HTMLElement | null;
    private sidebarBackdrop: HTMLElement | null;
    private openSidebarBtn: HTMLElement | null;
    private closeSidebarBtn: HTMLElement | null;

    constructor() {
        // Get all required elements
        this.sidebarEl = document.getElementById('sidebar');
        this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
        this.openSidebarBtn = document.getElementById('open-sidebar-btn');
        this.closeSidebarBtn = document.getElementById('close-sidebar-btn');

        if (!this.sidebarEl || !this.sidebarBackdrop) {
            console.error("Required sidebar elements not found!");
            return;
        }

        this.initialize();
        console.log("Sidebar manager initialized");
    }

    private initialize(): void {
        if (this.openSidebarBtn) {
            this.openSidebarBtn.addEventListener('click', this.openSidebar.bind(this));
            console.log("Open sidebar button listener added");
        }

        if (this.closeSidebarBtn) {
            this.closeSidebarBtn.addEventListener('click', this.closeSidebar.bind(this));
            console.log("Close sidebar button listener added");
        }

        if (this.sidebarBackdrop) {
            this.sidebarBackdrop.addEventListener('click', this.closeSidebar.bind(this));
        }
    }

    public openSidebar(): void {
        console.log("Opening sidebar");
        if (this.sidebarEl && this.sidebarBackdrop) {
            this.sidebarEl.classList.remove('-translate-x-full');
            this.sidebarBackdrop.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    }

    public closeSidebar(): void {
        console.log("Closing sidebar");
        if (this.sidebarEl && this.sidebarBackdrop) {
            this.sidebarEl.classList.add('-translate-x-full');
            this.sidebarBackdrop.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
}

export class TreeMenuManager {
    private treeToggles: NodeListOf<Element>;

    constructor() {
        this.treeToggles = document.querySelectorAll('.tree-toggle');

        if (this.treeToggles.length === 0) {
            console.warn("No tree toggle elements found");
        } else {
            console.log(`Found ${this.treeToggles.length} tree toggle elements`);
        }

        this.initializeTreeToggles();
    }

    private initializeTreeToggles(): void {
        this.treeToggles.forEach((toggle, index) => {
            toggle.addEventListener('click', this.handleTreeToggleClick);
            console.log(`Added click listener to tree toggle #${index}`);
        });
    }

    private handleTreeToggleClick = (e: Event): void => {
        const target = e.currentTarget as HTMLElement;
        const content = target.nextElementSibling as HTMLElement;

        if (content) {
            content.classList.toggle('hidden');
            console.log(`Toggled tree content: ${content.classList.contains('hidden') ? 'hidden' : 'visible'}`);

            const chevron = target.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.classList.toggle('rotate-180');
            }
        }
    }
}

export class UserMenuManager {
    private userMenuBtn: HTMLElement | null;
    private userMenu: HTMLElement | null;

    constructor() {
        this.userMenuBtn = document.getElementById('user-menu-btn');
        this.userMenu = document.getElementById('user-menu');

        if (this.userMenuBtn && this.userMenu) {
            console.log("User menu elements found");
            this.initialize();
        } else {
            console.warn("User menu elements not found");
        }
    }

    private initialize(): void {
        if (this.userMenuBtn && this.userMenu) {
            // Use bind to ensure correct 'this' context
            this.userMenuBtn.addEventListener('click', this.toggleMenu.bind(this));
            console.log("Added click listener to user menu button");

            // Handle clicks outside the menu to close it
            document.addEventListener('click', this.handleOutsideClick.bind(this));
        }
    }

    private toggleMenu(): void {
        if (this.userMenu) {
            this.userMenu.classList.toggle('hidden');
            console.log(`User menu toggled: ${this.userMenu.classList.contains('hidden') ? 'hidden' : 'visible'}`);
        }
    }

    private handleOutsideClick(event: MouseEvent): void {
        if (this.userMenuBtn &&
            this.userMenu &&
            !this.userMenu.classList.contains('hidden') &&
            !this.userMenuBtn.contains(event.target as Node) &&
            !this.userMenu.contains(event.target as Node)) {
            this.userMenu.classList.add('hidden');
            console.log("User menu closed by outside click");
        }
    }
}

// IMPORTANT: Remove this self-initialization to prevent double initialization
// document.addEventListener('DOMContentLoaded', () => {
//     new SidebarManager();
//     new TreeMenuManager();
//     new UserMenuManager();
//     console.log("Sidebar components initialized");
// });