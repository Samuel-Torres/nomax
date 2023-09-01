export default function setCommonCorsHeaders(origin: string | null) {
    const headers = new Headers();
    if(origin === "https://nomax.vercel.app") {
        headers.set('Access-Control-Allow-Origin', 'https://nomax.vercel.app');
        headers.append('Access-Control-Allow-Origin', 'https://nomax-git-testing-onboardingform-rilladubz.vercel.app')
    }
    headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return headers;
}