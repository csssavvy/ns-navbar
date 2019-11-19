(function() {
    const activeClass = 'is-active';
    let menuItems = document.querySelectorAll('.js-menu-item');
    let menuPages = document.querySelectorAll('.js-menu-pages');

    function iterateItems(arr, fn) {
       for(const item of arr) {
           fn(item);
       } 
    };

    function removeActive(item) {
        item.classList.remove(activeClass);
    };

    function addActive(target, page) {
        target.classList.add(activeClass);
        page.classList.add(activeClass);
    };

    function resetActives() {
        iterateItems(menuItems, removeActive);
        iterateItems(menuPages, removeActive);
    };

    iterateItems(menuItems, function(item){
        item.addEventListener("click", function(e){
            e.preventDefault();
            
            const target = e.currentTarget;
            
            if(!target.classList.contains(activeClass)) {
                const pageId = target.getAttribute('data-page');
                const page = document.querySelector('.js-menu-pages[data-page="'+pageId+'"]');
                resetActives();
                addActive(target, page);
            }
            else {
                resetActives();
            }
        })
    })

}());