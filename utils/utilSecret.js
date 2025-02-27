export const secretKey = "0x4AAAAAAA9jiKFyiHdq58yiOgJfVaVL-cE";

export const config = {
    Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YTFiYmQ2LWUwMGQtNGFlNy1hNjM4LTkxMzI3Y2NiMTY1MCIsInJvbGUiOiIxN2VkN2U3Mi0zMmI1LTRlNzQtOThiNS04YTcyNGUwN2Q2ZTgiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTczODMwNjQ0NiwiZXhwIjoxNzM4MzA3MzQ2LCJpc3MiOiJkaXJlY3R1cyJ9.Aj82yeqJZvbNaa6X1d-IXWX9oBkrbaFVvYdiTGy2Qms",
    "CF-Access-Client-Id": "afb26c8995066a72ef375fcffb9f1d47.access", 
    "CF-Access-Client-Secret": "f7f4995a6d1cd59926c34ffda3a1b3014f4eb7cc79855af29b97ba9d53deaf97"
};

// CMS images folder (Kelola folder gambar)


// Optimizable MIMEs (Ganti ke tipe webp semua)
export const optimizableMimes = {
    "image/jpg": "image/webp",
    "image/jpeg": "image/webp",
    "image/png": "image/webp",
    "image/gif": "image/webp" 
}
export function convertToWebp(mimeType) { // import { optimizableMimes } from "./utils/utilSecret.js";
    return optimizableMimes[mimeType] || mimeType;
}

// Slugify function (untuk ubah judul atau teks menjadi url yang ramah SEO)
export function slugify(str) { // import {slugify, formatDate} from "./utils/utilSecret.js";
    str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default slugify; 

// Date format function
export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Textarea img src replacement (Ganti semua tag <img> menjadi url gambar dari Directus
export const replaceImgSrc = (text, baseUrl) => // MASIH GA YAKIN
    text?.replace(/<img\s[^>]*src=["'](.*?)["']/gi, (match, src) => 
        src.startsWith("http") ? match : match.replace(src, `${baseUrl}${src}`)
    ) || "";

// File handle function (Handle file yang diproses, seperti membaca, menyimpan, atau mengonversi file sebelum dikirim ke backend)


// Day translation
export const daysTranslation = {
    en: {
        full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    id: {
        full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
        short: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
    }
};

export function translatedDay(dateString, lang = "id", format = "full") {
    const date = new Date(dateString);
    const day = date.getDay(); // dimulai 0 minggu
    return daysTranslation[lang][format][day];
}

// Get interface function (ambil data dari api backend, directus)
export function fetchData() { // GA YAKIN
    const data = await getInterface("https://backenddirectus.madebybagus.xyz/items");
    console.log(data);
}
fetchData(); // import { getInterface } from "./utils/utilSecret.js";