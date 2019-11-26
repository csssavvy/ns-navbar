const navMobile = () => {
    const activeClass = 'is-active';
    const nav = document.querySelector('[data-nav="navigation"]');
    const toggle = document.querySelector('[data-nav="toggle"]');
    const menu = document.querySelector('[data-nav="menu"]');
    const item = '[data-nav="item"]';

    const tl = gsap.timeline({
        defaults: {
            paused: true,
            ease: "power3.inOut",
        }
    }).fromTo(item, {
        opacity: 0
    }, {
        duration: 0.5,
        stagger: 0.07,
        opacity: 1
    });

    toggle.onclick = () => {
        nav.classList.toggle(activeClass);
        toggle.classList.toggle(activeClass);
        menu.classList.toggle(activeClass);

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.inOut",
            }
        }).fromTo(item, {
            opacity: 0,
            y: -10,
        }, {
            duration: 0.3,
            stagger: 0.04,
            opacity: 1,
            y: 0,
        });
    }
}

const navDesktop = () => {
    const activeClass = 'is-active';
    const navItems = ß('.js-nav-item');
    const navPages = ß('.js-nav-pages');

    const removeActive = (item) => {
        item.classList.remove(activeClass);
    }

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
    navMobile();
});