(function(){
    let lastScrollY = getScrollTop();
    const HIDE_CLASSNAME = 'js-hidden';
    const SCROLL_DIR = {
        UP: 'up',
        DOWN: 'down'
    }
    const MENU_SCROLL_THRESHOLD = 200;
    const SCROLL_SPEED_THRESHOLD = 

    var toggleMobileMenu = function(){
        const MENU_ELEMENT = document.querySelector('.nb-mobile-header');
        const IS_HIDDEN = MENU_ELEMENT.classList.contains(HIDE_CLASSNAME); 
        console.log('toggleMobileMenu');

        if(!IS_HIDDEN && pastScrollThreshold() && getScrollDirection() === SCROLL_DIR.DOWN) {
            MENU_ELEMENT.classList.add(HIDE_CLASSNAME);
        } 
        else if(IS_HIDDEN && (!pastScrollThreshold() || getScrollDirection() === SCROLL_DIR.UP)) {
            MENU_ELEMENT.classList.remove(HIDE_CLASSNAME);
        }
    };

    var pastScrollThreshold = ()=>getScrollTop() > MENU_SCROLL_THRESHOLD;

    function getScrollDirection(){
        let currentScrollTop = getScrollTop();
        let lastScroll = lastScrollY;
        lastScrollY = currentScrollTop;
        return lastScroll < currentScrollTop ? SCROLL_DIR.DOWN : SCROLL_DIR.UP;
    };

    function throttle(callback, interval) {
        let enableCall = true;

        return function(...args) {
            if(!enableCall) return;

            enableCall = false;
            callback.apply(this, args);
            setTimeout(()=>enableCall = true, interval);
        }
    }

    function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    function init() {
        window.addEventListener('scroll', throttle(toggleMobileMenu, 200)); 
    }

    window.onload = function() {
        init();
    }
}());