import { config, secretKey } from "../../../../../../utils/utilSecret.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("contactForm");

//     if(form) {
//         form.addEventListener("submit", async function (e) {
//             e.preventDefault();
//             const name = form.name.value.trim();
//             const email = form.email.value.trim();
//             const profession = form.profession.value.trim();
//             const phone = form.phone.value.trim();
//             const message = form.message.value.trim();

//             // Validasi
//             if (!name || !email || !profession || !phone || !message) {
//                 alert("Kolom harus diisi!");
//                 return;
//             }

//             if (!email.includes("@")) {
//                 alert("Email tidak valid!");
//                 return;
//             }
//         });
//     }
// });

// Menangani request POST

export async function POST(ctx){
    const data = await ctx.request.formData();
    const turnstileToken = data.get("cf-turnstile-response");

        const turnstile = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                secret: secretKey,
                response: turnstileToken
            })
        });
            
    console.dir(turnstile.status);

    if(turnstile.ok){
    const directus = await fetch("https://backenddirectus.madebybagus.xyz/items/contact", {
        headers: {
          Authorization: config.Authorization,
          "CF-Access-Client-Id": config["CF-Access-Client-Id"],
          "CF-Access-Client-Secret": config["CF-Access-Client-Secret"],
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            assistance_type: data.get("assistance_type"),
            phone_number: data.get("phone_number"),
            message: data.get("message"),
        })
    });
    
    return directus;
    }
    return new Response(JSON.stringify({message:"Gagal"},{status:400}));
  }

// Menangani request POST dari form 
// export async function POST(ctx){ 
//     const payload = await ctx.request.json();

//     console.log(payload);

//     const req = await fetch("/api/form/submit",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             name:payload.name,
//             email:payload.email,
//             profession:payload.profession,
//             phone:payload.phone,
//             message:payload.message,
//             mode:"session"
//         })
//     });

//     console.log("response headers:", req.headers);
//     const headers = new Headers();

//     return new Response(
//         req.statusText, {
//             status: req.status,
//             headers:headers
//         }
//     );
// }