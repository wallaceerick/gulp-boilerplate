var Accordion = {

    init: function() {

        var accordions = document.querySelectorAll('.js-accordion-button');

        accordions.forEach(function(item) {
            item.addEventListener('click', Accordion.open);
        });

    },

    height: function(element) {
        var height;
            height = element.scrollHeight;

        return height + 'px';
    },

    open: function() {

        var panel       = this.nextElementSibling,
            panelHeight = Accordion.height(panel);

        if (panel.style.height) {
            panel.style.height = null;
        } 
        else {
            panel.style.height = panelHeight;
        }

        this.classList.toggle('accordion__button--active');

    }

};

Accordion.init();