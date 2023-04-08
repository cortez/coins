import { useEffect } from 'react';
import { useRouter } from 'next/router';

const FallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace(router.pathname);
    }, []);

    return null;
};

export default FallbackPage;