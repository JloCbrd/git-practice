(function () {
    var root = document.documentElement;
    var KEY = "theme";

    function saved() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function save(value) {
        try { localStorage.setItem(KEY, value); } catch (e) { /* ignore */ }
    }

    // Use the saved choice, otherwise follow the device setting
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    var initial = saved() || (media.matches ? "dark" : "light");
    root.setAttribute("data-theme", initial);

    document.addEventListener("DOMContentLoaded", function () {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "theme-toggle";
        document.body.appendChild(btn);

        function render() {
            var dark = root.getAttribute("data-theme") === "dark";
            btn.textContent = dark ? "\u2600\uFE0F" : "\uD83C\uDF19";
            btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
            btn.setAttribute("aria-pressed", dark ? "true" : "false");
        }

        btn.addEventListener("click", function () {
            root.classList.add("theme-ready");
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            save(next);
            render();
        });

        // If the device theme changes and the user hasn't chosen manually
        media.addEventListener("change", function (e) {
            if (!saved()) {
                root.setAttribute("data-theme", e.matches ? "dark" : "light");
                render();
            }
        });

        render();
    });
})();