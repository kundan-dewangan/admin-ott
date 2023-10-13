// Generate a random 5-digit number
export function generateRandom5DigitNumber() {
    const min = 10000; // Minimum 5-digit number (inclusive)
    const max = 99999; // Maximum 5-digit number (inclusive)

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loginCred = {
    email: 'kundan@gmail.com',
    password: 'Kundan@1234'
}


export function getYouTubeVideoId(url) {
    const urlParams = new URL(url);
    if (urlParams.hostname === 'www.youtube.com' && urlParams.search) {
        const searchParams = new URLSearchParams(urlParams.search);
        if (searchParams.has('v')) {
            return searchParams.get('v');
        }
    } else if (urlParams.hostname === 'youtu.be') {
        const pathParts = urlParams.pathname.split('/');
        if (pathParts[1]) {
            return pathParts[1];
        }
    }
    return null;
}


export function getVimeoVideoId(url) {
    // Match the Vimeo video ID using a regular expression
    const match = /https:\/\/vimeo.com\/(\d+)/.exec(url);
    // If there is a match, return the video ID; otherwise, return null
    return match ? match[1] : null;
}


export const genreList = [
    { key: "", value: "Select Video Type" },
    { key: "Popular Genres", value: "Popular Genres" },
    { key: "Sci-Fi Spectacles", value: "Sci-Fi Spectacles" },
    { key: "Adventure Escapades", value: "Adventure Escapades" },
    { key: "Horror Hysteria", value: "Horror Hysteria" },
    { key: "Crime Chronicles", value: "Crime Chronicles" },
    { key: "Music Mania", value: "Music Mania" },
];