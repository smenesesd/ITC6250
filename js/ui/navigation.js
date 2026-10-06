//Navigation logic will be added here
export function setupNavigation() {
    const navigationLinks = document.querySelectorAll(".sidebar-nav a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {

            navigationLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });
}