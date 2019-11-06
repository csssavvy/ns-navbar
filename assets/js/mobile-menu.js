(function(){
    let lastScrollY = getScrollTop();
    const HIDE_CLASSNAME = 'js-hidden';
    const SCROLL_DIR = {
        UP: 'up',
        DOWN: 'down'
    }
    const MENU_SCROLL_THRESHOLD = 200; //px value
    const SCROLL_SPEED_THRESHOLD = 50; //px difference since last measurement;
    const MOBILE_MENU = 'm-menu';
    const MOBILE_HEADER = document.getElementById('m-header');

    var toggleShow = function(target){
        if(target === MOBILE_MENU){
            MOBILE_HEADER.classList.toggle('js-open');
        }
        const TARGET = document.getElementById(target);
        
        TARGET.classList.toggle('js-hide');
    }

    var showHideMenuBar = function(){
        if(MOBILE_HEADER.classList.contains('js-open')) {return false;}

        const MENU_ELEMENT = document.querySelector('.nb-mobile-header');
        const SCROLL = getScroll();
        const IS_HIDDEN = MENU_ELEMENT.classList.contains(HIDE_CLASSNAME); 
        const PAST_SCROLL_THRESHOLD = pastScrollThreshold();
        const PAST_SPEED_THRESHOLD = pastSpeedThreshold(SCROLL.speed);

        if(IS_HIDDEN && !PAST_SCROLL_THRESHOLD) {
            MENU_ELEMENT.classList.remove(HIDE_CLASSNAME);
        }
        else if(!IS_HIDDEN && PAST_SCROLL_THRESHOLD && SCROLL.direction === SCROLL_DIR.DOWN) {
            MENU_ELEMENT.classList.add(HIDE_CLASSNAME);
        } 
        else if(IS_HIDDEN && (PAST_SPEED_THRESHOLD && (SCROLL.direction === SCROLL_DIR.UP)) || !PAST_SCROLL_THRESHOLD) {
            MENU_ELEMENT.classList.remove(HIDE_CLASSNAME);
        }
    };

    var pastScrollThreshold = ()=>getScrollTop() > MENU_SCROLL_THRESHOLD;
    var pastSpeedThreshold = (speed)=>speed > SCROLL_SPEED_THRESHOLD;

    function getScroll(){
        const CURRENT_SCROLL_TOP = getScrollTop();
        const LAST_SCROLL = lastScrollY;
        lastScrollY = CURRENT_SCROLL_TOP;
        const SCROLL_DIFF = Math.abs(CURRENT_SCROLL_TOP - LAST_SCROLL);

        return {
            direction: LAST_SCROLL < CURRENT_SCROLL_TOP ? SCROLL_DIR.DOWN : SCROLL_DIR.UP,
            speed: SCROLL_DIFF
        }
    };

    function throttle(callback, interval) {
        let enableCall = true;

        return function(...args) {
            if(!enableCall) return;

            enableCall = false;
            callback.apply(this, args);
            setTimeout(()=>enableCall = true, interval);
        }
    };

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    function mm$(query) {
        return Array.from(document.querySelectorAll(query));
    }

    function init() {
        const ATTRIBUTE = 'data-target';
        const TOGGLE_SELECTORS = mm$('.js-toggle').filter((x)=>x.getAttribute(ATTRIBUTE));

        TOGGLE_SELECTORS.map((x)=>{
            const TARGET = x.getAttribute(ATTRIBUTE);
            x.addEventListener('click',(e)=>{
                e.preventDefault();
                
                toggleShow(TARGET);
            })
        });

        window.addEventListener('scroll', throttle(showHideMenuBar, 200)); 
        window.addEventListener('scroll', debounce(showHideMenuBar, 50)); 
    }

    window.onload = function() {
        init();
    }
}());