const navDesktop = () => {
    const activeClass = 'is-active';
    const navItems = ß('.js-nav-item');
    const navPages = ß('.js-nav-pages');

    const removeActive = (item) => {
        item.classList.remove(activeClass);
    };

    const addActive = (target, page) => {
        target.classList.add(activeClass);
        page.classList.add(activeClass);
    }

    const resetActives = () => {
        navItems.map(el => removeActive(el));
        navPages.map(el => removeActive(el));
    }

    navItems.map(el => {
        el.onclick = e => {
            e.preventDefault();
            const target = e.currentTarget;

            if (!target.classList.contains(activeClass)) {
                const pageId = target.getAttribute('data-page');
                const page = document.querySelector('.js-nav-pages[data-page="' + pageId + '"]');
                resetActives();
                addActive(target, page);
            } else {
                resetActives();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    navDesktop();
});