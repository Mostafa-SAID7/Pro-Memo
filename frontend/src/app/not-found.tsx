import { ErrorPage } from '@/components/Navigation';

export default function NotFound() {
    return (
        <ErrorPage
            statusCode={404}
            title="Page Not Found"
            message="The page you're looking for doesn't exist"
            description="It might have been moved or deleted. Check the URL or navigate back to safety."
            showHomeButton={true}
            showBackButton={true}
        />
    );
}
