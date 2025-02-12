import { validateForm } from "./middleware.js";
import { config } from "./utilsSecret.js";

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
export async function POST(formElement) {
    const formData = await formElement.request.FormData();
    const token = formData.get('cf-turnstile-response');

    const turnstile = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret: config.secretKey,
            response: token
        }),
    });
    console.dir(turnstile.status);
    if (turnstile.ok) {
        // Kirim ke backend
     const response = await fetch('https://backenddirectus.madebybagus.xyz/items/contact', {
        headers: {
            "Content-Type": "application/json",

            Authorization: config.Authorization,
            "CF-Access-Client-Id": config.headers["CF-Access-Client-Id"],
            "CF-Access-Client-Secret": config.headers["CF-Access-Client-Secret"],
        },
        method: "POST",

        body: JSON.stringify({
            name,
            email,
            phone_number,
            assistance_type,
            message
        })
    });
    return directus;
    }
    return new Response(JSON.stringify({message:"Fail"},{status:400}));
}

    // Validasi form
    // const name = formData.get("name");
    // const email = formData.get("email");
    // const phone_number = formData.get("phone_number");
    // const assistance_type = formData.get("assistance_type");
    // const message = formData.get("message");

    // const validationResponse = validateForm({ name, email, phone_number, assistance_type, message });
    // if (!validationResponse.success) {
    //     return { error: validationResponse.message };
    // }

export function validateForm(data) {
    for (let key in data) {
        if (!data[key]) {
            return { success: false, message: `Please fill out the ${key}.` };
        }
    }
    return { success: true };
}