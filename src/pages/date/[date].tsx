import { useRouter } from 'next/router';

export default function DatePage() {
    const router = useRouter();
    const { date } = router.query;

    return (
        <div>
            <h1>Page for Date: {date}</h1>
            {/* Your content here */}
        </div>
    );
}