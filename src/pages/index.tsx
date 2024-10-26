import { useEffect, FunctionComponent } from 'react';
import { useRouter } from 'next/router';

/**
 * @returns A (relative) path containing today's date in the form yyyy-mm-dd
 * @example console.log(getPath()); // '/date/2024-10-26'
 */
function getPath(): string {
    const today = new Date();

    // grab the full ISO string, e.g. "2011-10-05T14:48:00.000Z"
    const isoFull = today.toISOString();

    // grab everything before the T (which demarcates the time)
    // e.g. "2011-10-05"
    const isoDate = isoFull.slice(0, isoFull.indexOf('T'));

    const path = '/date/' + isoDate;

    return path;
}

/**
 * @summary Handle server-side redirection
 */
export const getServerSideProps = async () => ({
    redirect: {
        destination: getPath(),
        permanent: false
    }
});

/**
 * @summary Handle client-side redirection
 */
const useRedirect = (router) => {
    const path = getPath();
    const callback = () => router.replace(path);
    useEffect(callback, [router])
}

/**
 * @returns Stub component which should instantly redirect to the correct
 * page
 */
export default function Home(): FunctionComponent {
    const router = useRouter();
    useRedirect(router);

    return null;
}
