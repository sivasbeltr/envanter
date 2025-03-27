import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent Chrome 76+ from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            setInstallPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) {
            return;
        }

        // Show the install prompt
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        const choiceResult = await installPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('Kullanıcı uygulamayı kurdu');
            setIsInstalled(true);
        } else {
            console.log('Kullanıcı kurulumu reddetti');
        }

        // Clear the saved prompt as it can't be used again
        setInstallPrompt(null);
    };

    if (isInstalled || !installPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-sm bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium">Uygulamayı Kur</h3>
                    <p className="text-sm text-gray-600">Daha iyi deneyim için uygulamayı cihazınıza kurun</p>
                </div>
                <button
                    onClick={handleInstallClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Kur
                </button>
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
