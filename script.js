// ===============================
// SUPABASE CONFIGURATION
// ===============================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://bvgvsmvwmovnwgnynfbd.supabase.co";

const SUPABASE_KEY = "sb_publishable_nmwxrX1d90lKyoqso7Bb4A_Tqc-4bgo";

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

// ===============================
// FORM
// ===============================

const form = document.getElementById("leadForm");

const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const button =
        form.querySelector("button");

    button.disabled = true;

    button.innerHTML = "Saving...";

    message.innerHTML = "";

    try{

        const { error } = await client
        .from("leads")
        .insert([
            {
                name:name,
                email:email,
                phone:phone
            }
        ]);

        if(error){

            throw error;

        }

        message.style.color="#7CFF8B";

        message.innerHTML =
        "✅ Thank you! Your download will start in a moment...";

        // Download PDF

        const link = document.createElement("a");

        link.href = "assets/7-KEY_Personal_Branding_eBook.pdf";

        link.download = "Personal-Branding-Ebook.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        form.reset();

    }

    catch(err){

        console.error(err);

        message.style.color="#ff8080";

        message.innerHTML =
        "❌ Something went wrong. Please try again.";

    }

    finally{

        button.disabled = false;

        button.innerHTML = "🚀 Get My Free Ebook";

    }

});
