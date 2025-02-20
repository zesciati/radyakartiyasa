// import { validateForm } from "./middleware.js";
// import { config } from "./utilsSecret.js";

// Form submission (mengirim form ke server)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if(form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const result = await sendForm(form);
            const notification = document.getElementById('notification');
            notification.style.display = 'block';
            notification.textContent = result.message || result.error;
        });
    }
});

// AJAX approach
export async function POST(ctx) {
    const data = await ctx.request.formData();
    const turnstileToken = data.get('cf-turnstile-response');
    const secretKey = "0x4AAAAAAA60IBfLmFTToJEJ";

    // Verfikasi Turnstile
    const turnstile = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret: secretKey,
            response: turnstileToken
        }),
    });
    console.dir(turnstile.status);
    if (turnstile.ok) { // Simpan ke directus
     const directus = await fetch('https://backenddirectus.madebybagus.xyz/items/contact', {
        headers: {
            "Content-Type": "application/json",

            Authorization: config.Authorization,
            "CF-Access-Client-Id": config.headers["CF-Access-Client-Id"],
            "CF-Access-Client-Secret": config.headers["CF-Access-Client-Secret"],
        },
        method: "POST",

        body: JSON.stringify({ // JSON.stringify(), mengonversi objek JavaScript menjadi string JSON
            name: data.get("name"),
            email: data.get("email"),
            phone_number: data.get("phone_number"),
            assistance_type: data.get("assistance_type"),
            message: data.get("message"),
        })
    });
    return directus;
    }
    return new Response(JSON.stringify({message:"Fail"},{status:400}));
}

// export function validateForm(data) {
//     for (let key in data) {
//         if (!data[key]) {
//             return { success: false, message: `Please fill out the ${key}.` };
//         }
//     }
//     return { success: true };
// }