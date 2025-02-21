// import { function } from "./middleware.js";
import { config, secretKey } from "./utilsSecret.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if(form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const profession = form.profession.value.trim();
            const phone = form.phone.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !profession || !phone || !message) {
                alert("Kolom harus diisi!");
                return;
            }

            if (!email.includes("@")) {
                alert("Email tidak valid!");
                return;
            }
        });
    }
});

export async function POST(ctx) {
    const data = await ctx.request.formData();
    const turnstileToken = data.get('cf-turnstile-response');

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
    if (turnstile.ok) {
     const directus = await fetch('https://backenddirectus.madebybagus.xyz/items/contact', {
        headers: {
            Authorization: config.Authorization,
            "CF-Access-Client-Id": config.headers["CF-Access-Client-Id"],
            "CF-Access-Client-Secret": config.headers["CF-Access-Client-Secret"],
            "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            profession: data.get("profession"),
            phone: data.get("phone"),
            message: data.get("message"),
        })
    });

    return directus;
    }
    return new Response(JSON.stringify({message:"Failure"},{status:400}));
}