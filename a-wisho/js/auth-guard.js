        window.addEventListener('load', async () => {
            const currentUser = api.getCurrentUser();
            if (!currentUser) {
                window.location.href = '/login.html';
                return;
            }

        
            const needsOnboarding = await api.needsOnboardingCheck();
            if (needsOnboarding) {
                window.location.href = '../onboarding.html';
            }
        
        });