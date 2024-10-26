import { useRouter } from 'next/router';

import { getLanguagesAndResources } from '../../lib/scrape/languages/languages';

/**
 * @summary Pre-render the page at build with the resources not dependent on the
 * specific day (i.e. the languages and corresponding resources)
 */
export async function getStaticProps() {
    const map = await getLanguagesAndResources();

    const languages = Array.from(map.keys());
    const resources = Array.from(map.values());

    // Props will be passed to page component
    return { props: { map, languages, resources } }
}

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
