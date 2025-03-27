/**
 * Notification management system
 */

export interface INotification {
    id: number;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
    isRead: boolean;
}

export class NotificationManager {
    private notifications: INotification[] = [];
    private badgeElement: HTMLElement | null = null;
    private dropdownElement: HTMLElement | null = null;
    private notificationListElement: HTMLElement | null = null;
    private notificationButton: HTMLElement | null = null;
    private markAllReadButton: HTMLElement | null = null;
    private isDropdownOpen: boolean = false;

    constructor(badgeSelector: string) {
        this.badgeElement = document.querySelector(badgeSelector);
        this.dropdownElement = document.getElementById('notification-dropdown');
        this.notificationListElement = document.getElementById('notification-list');
        this.notificationButton = document.getElementById('notification-btn');
        this.markAllReadButton = document.getElementById('mark-all-read');

        this.loadNotifications();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Toggle dropdown when notification button is clicked
        if (this.notificationButton) {
            this.notificationButton.addEventListener('click', this.toggleDropdown.bind(this));
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (this.isDropdownOpen &&
                this.notificationButton &&
                this.dropdownElement &&
                !this.notificationButton.contains(event.target as Node) &&
                !this.dropdownElement.contains(event.target as Node)) {
                this.hideDropdown();
            }
        });

        // Add event listener for marking all as read
        if (this.markAllReadButton) {
            this.markAllReadButton.addEventListener('click', () => {
                this.markAllAsRead();
                this.renderNotifications();
            });
        }
    }

    private loadNotifications(): void {
        // This would typically load from an API
        // For demo purposes, we'll just create some mock notifications
        this.notifications = [
            {
                id: 1,
                message: 'Stok seviyesi düşük ürünler var.',
                type: 'warning',
                timestamp: new Date(),
                isRead: false
            },
            {
                id: 2,
                message: 'Satın alma talebi onaylandı.',
                type: 'success',
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                isRead: false
            },
            {
                id: 3,
                message: 'Yeni ürün kategorisi eklendi.',
                type: 'info',
                timestamp: new Date(Date.now() - 86400000), // 1 day ago
                isRead: true
            },
            {
                id: 4,
                message: 'Stok hareketi raporu hazır.',
                type: 'info',
                timestamp: new Date(Date.now() - 172800000), // 2 days ago
                isRead: true
            }
        ];

        this.updateBadge();
        this.renderNotifications();
    }

    private renderNotifications(): void {
        if (!this.notificationListElement) return;

        this.notificationListElement.innerHTML = '';

        if (this.notifications.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'py-4 px-3 text-sm text-gray-500 dark:text-gray-400 text-center';
            emptyMessage.textContent = 'Bildirim bulunmamaktadır.';
            this.notificationListElement.appendChild(emptyMessage);
            return;
        }

        // Sort notifications by date (newest first) and read status
        const sortedNotifications = [...this.notifications].sort((a, b) => {
            // Unread notifications first
            if (a.isRead !== b.isRead) {
                return a.isRead ? 1 : -1;
            }
            // Then by timestamp (newest first)
            return b.timestamp.getTime() - a.timestamp.getTime();
        });

        sortedNotifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `p-3 border-b border-gray-200 dark:border-gray-700 ${notification.isRead ? 'bg-transparent' : 'bg-blue-50 dark:bg-blue-900/20'}`;

            // Create notification content
            const notificationContent = document.createElement('div');

            // Icon based on notification type
            let iconClass = '';
            let iconBgClass = '';
            switch (notification.type) {
                case 'warning':
                    iconClass = 'fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400';
                    iconBgClass = 'bg-yellow-100 dark:bg-yellow-900/30';
                    break;
                case 'success':
                    iconClass = 'fas fa-check text-green-600 dark:text-green-400';
                    iconBgClass = 'bg-green-100 dark:bg-green-900/30';
                    break;
                case 'error':
                    iconClass = 'fas fa-times text-red-600 dark:text-red-400';
                    iconBgClass = 'bg-red-100 dark:bg-red-900/30';
                    break;
                default: // info
                    iconClass = 'fas fa-info text-blue-600 dark:text-blue-400';
                    iconBgClass = 'bg-blue-100 dark:bg-blue-900/30';
            }

            notificationItem.innerHTML = `
                <div class="flex items-start">
                    <div class="flex-shrink-0 pt-0.5">
                        <span class="flex h-8 w-8 items-center justify-center rounded-full ${iconBgClass}">
                            <i class="${iconClass}"></i>
                        </span>
                    </div>
                    <div class="ml-3 w-0 flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">${notification.message}</p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">${this.formatTimeAgo(notification.timestamp)}</p>
                    </div>
                    <div class="ml-4 flex flex-shrink-0">
                        <button type="button" class="mark-as-read inline-flex text-gray-400 hover:text-gray-500" data-id="${notification.id}">
                            ${notification.isRead ?
                    '<i class="fas fa-check-circle"></i>' :
                    '<i class="far fa-circle"></i>'
                }
                        </button>
                    </div>
                </div>
            `;

            // Add event listener for marking single notification as read
            const markReadBtn = notificationItem.querySelector('.mark-as-read');
            if (markReadBtn) {
                markReadBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = parseInt((e.currentTarget as HTMLElement).dataset.id || '0', 10);
                    this.markAsRead(id);
                    this.renderNotifications();
                });
            }

            if (this.notificationListElement) {
                this.notificationListElement.appendChild(notificationItem);
            }
        });
    }

    private formatTimeAgo(date: Date): string {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + ' yıl önce';
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + ' ay önce';
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + ' gün önce';
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + ' saat önce';
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + ' dakika önce';
        }
        return Math.floor(seconds) + ' saniye önce';
    }

    private toggleDropdown(): void {
        if (!this.dropdownElement) return;

        if (this.isDropdownOpen) {
            this.hideDropdown();
        } else {
            this.showDropdown();
        }
    }

    private showDropdown(): void {
        if (!this.dropdownElement) return;

        this.dropdownElement.classList.remove('hidden');
        this.isDropdownOpen = true;
    }

    private hideDropdown(): void {
        if (!this.dropdownElement) return;

        this.dropdownElement.classList.add('hidden');
        this.isDropdownOpen = false;
    }

    public getUnreadCount(): number {
        return this.notifications.filter(n => !n.isRead).length;
    }

    public markAsRead(id: number): void {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.isRead = true;
            this.updateBadge();
        }
    }

    public markAllAsRead(): void {
        this.notifications.forEach(n => n.isRead = true);
        this.updateBadge();
    }

    private updateBadge(): void {
        const count = this.getUnreadCount();
        if (this.badgeElement) {
            this.badgeElement.textContent = count.toString();
            this.badgeElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    public getNotifications(): INotification[] {
        return [...this.notifications];
    }
}