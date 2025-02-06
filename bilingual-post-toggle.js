document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post-content"); // Adjust this selector to match your Micro.blog template
    
    posts.forEach(post => {
        let content = post.innerHTML;
        let splitMarker = "(((ESPA\u00d1OL)))";
        
        if (content.includes(splitMarker)) {
            let [englishText, spanishText] = content.split(splitMarker);
            
            post.innerHTML = `
                <div class="lang-content">
                    <div class="english">${englishText}</div>
                    <div class="spanish" style="display: none;">${spanishText}</div>
                </div>
                <button class="lang-toggle">ES / EN</button>
            `;
        }
    });

    // Set language preference in local storage
    function setLangPreference(lang) {
        localStorage.setItem("preferredLang", lang);
    }
    
    function getLangPreference() {
        return localStorage.getItem("preferredLang") || "en";
    }
    
    // Event listener for toggling language
    document.querySelectorAll(".lang-toggle").forEach(button => {
        button.addEventListener("click", function () {
            let parent = this.previousElementSibling;
            let en = parent.querySelector(".english");
            let es = parent.querySelector(".spanish");
            
            if (en.style.display === "none") {
                en.style.display = "block";
                es.style.display = "none";
                setLangPreference("en");
            } else {
                en.style.display = "none";
                es.style.display = "block";
                setLangPreference("es");
            }
        });
    });
    
    // Apply saved language preference
    let preferredLang = getLangPreference();
    document.querySelectorAll(".lang-content").forEach(container => {
        let en = container.querySelector(".english");
        let es = container.querySelector(".spanish");
        if (preferredLang === "es") {
            en.style.display = "none";
            es.style.display = "block";
        }
    });
});

// Register as a Micro.blog Plug-in
if (typeof microblog !== 'undefined') {
    microblog.registerPlugin({
        id: "bilingual-post-toggle",
        name: "Bilingual Post Toggle",
        description: "Adds a language toggle (EN/ES) for bilingual blog posts formatted with '(((ESPAÑOL)))'.",
        version: "1.0"
    });
}
