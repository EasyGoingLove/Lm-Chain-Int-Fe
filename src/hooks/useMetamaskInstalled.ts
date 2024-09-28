import { useState, useEffect } from 'react';

const useMetaMaskInstalled = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(typeof window.ethereum !== 'undefined');

    useEffect(() => {
        const checkMetaMaskInstalled = () => {
            if (typeof window.ethereum !== 'undefined') {
                setIsMetaMaskInstalled(true);
            }
        };

        if (typeof window.ethereum !== 'undefined') {
            setIsMetaMaskInstalled(true);
        }

        
        window.addEventListener('ethereum#initialized', checkMetaMaskInstalled, { once: true });

        const interval = setInterval(() => {
            if (typeof window.ethereum !== 'undefined') {
                setIsMetaMaskInstalled(true);
                clearInterval(interval);
            }
        }, 1000);

        
        return () => {
            window.removeEventListener('ethereum#initialized', checkMetaMaskInstalled);
            clearInterval(interval);
        };
    }, []);

    return isMetaMaskInstalled;
};

export default useMetaMaskInstalled; 