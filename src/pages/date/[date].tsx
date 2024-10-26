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

/**
 * @summary Indicates that nothing needs to be created at build time
 * @description I didn't think I needed this, since the static props don't depend on
 * a dynamic query param or w/e, but when I ran the app, I got an error complaining
 * about the lack of `getStaticPaths`:
 *
 *  Error: getStaticPaths is required for dynamic SSG pages and is missing for '/date/[date]'.
 *  Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value
 *
 * So I googled and found out that you can just call it with dummy values to indicate
 * nothing needs to be done
 * @returns Data indicating that nothing needs to be created at build time
 * @see {@link https://stackoverflow.com/a/65783200}
 */
export const getStaticPaths = async () =>  ({
    paths: [], // indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
});

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
