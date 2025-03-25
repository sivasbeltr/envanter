/**
 * Main entry point for the application
 * This file handles initialization of all modules
 */

// Import all modules to ensure they're included in the bundle
import { ThemeManager } from './core/theme';
import { NotificationManager, SidebarManager, TreeMenuManager, UserMenuManager } from './components/index';

// Function to ensure proper initialization
function initApp() {
    console.log("StokApp initializing...");

    try {
        // Initialize components with proper debugging
        console.log("Initializing ThemeManager...");
        const theme = new ThemeManager();

        console.log("Initializing SidebarManager...");
        const sidebar = new SidebarManager();

        console.log("Initializing TreeMenuManager...");
        const treeMenu = new TreeMenuManager();

        console.log("Initializing UserMenuManager...");
        const userMenu = new UserMenuManager();

        console.log("Initializing NotificationManager...");
        const notifications = new NotificationManager('#notification-badge');

        console.log("StokApp initialized successfully");
    } catch (error) {
        console.error("Error initializing StokApp:", error);
    }
}

// Only initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM already loaded
    initApp();
}

// Make initialization available globally
(window as any).initializeStokApp = initApp;
