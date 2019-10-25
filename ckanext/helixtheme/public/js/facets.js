jQuery(document).ready(function ($, _) {

    var console = window.console
    var debug = $.proxy(console, 'debug')

    handleFacets();
});

var LIMIT = 3;

function handleFacets() {

    // Initially hide facet items with index over LIMIT
    function init_hide() {
        var cat_list = $('.results-main-sidebar .switches');
        var search_form = $('.landing-search-form');
        cat_list.each(function (index) {
            $(this).addClass('li-hidden');

            var list = $(this).find('label');
            list.each(function (index) {
                if (index > LIMIT) {
                    $(this).css("display", "none");
                }
                //if (index == LIMIT) {
                //    $(this).addClass("no-bottom-border");
                //}
                //checkboxes =  $(this).find('input');
                //texts = $(this).find('a');
                

            });

            // add onclick checkbox search
            var list = $(this).find('input');
            list.each(function (index) {
                $(this).click(function() {
                    search_form.submit();
                });
            });
        });
        // turn to uppercase and remove greek accent 
        var org_switch = $('.results-main-sidebar .organizations .switches');
        var list2 = org_switch.find('label');
        list2.each(function (index) {
            //console.log($(this).find('a').text().toUpperCase().replace('Ά', 'Α').replace('Έ', 'Ε').replace('Ή', 'Η').replace('Ί', 'Ι').replace('Ό', 'Ο').replace('Ύ', 'Υ').replace('Ώ', 'Ω'));
            $(this).find('a').text($(this).find('a').text().toUpperCase().replace(/Ά/g, 'Α').replace(/Έ/g, 'Ε').replace(/Ή/g, 'Η').replace(/Ί/g, 'Ι').replace( /Ό/g, 'Ο').replace(/Ύ/g, 'Υ').replace(/Ώ/g, 'Ω'));
        });

        var order_by_options= $('.datasets-order-by select option');
        order_by_options.each(function (index) {
            console.log($(this).text())
            //console.log($(this).find('a').text().toUpperCase().replace('Ά', 'Α').replace('Έ', 'Ε').replace('Ή', 'Η').replace('Ί', 'Ι').replace('Ό', 'Ο').replace('Ύ', 'Υ').replace('Ώ', 'Ω'));
            $(this).text($(this).text().toUpperCase().replace(/Ά/g, 'Α').replace(/Έ/g, 'Ε').replace(/Ή/g, 'Η').replace(/Ί/g, 'Ι').replace( /Ό/g, 'Ο').replace(/Ύ/g, 'Υ').replace(/'Y/g, 'Υ').replace(/Ώ/g, 'Ω'));
        });

    };
    init_hide();


    // Facet Show more/less handling
    function show_more(e) {
        e.preventDefault();
        var ul = $(this).parent().parent();

        var list = ul.find('label');
        var title = ul.attr('title');

        //$(this).parent().parent().find('.read-more').text("Show Only Popular ");
        //list.parent().addClass("li-hidden");
        $(this).parent().parent().find('.read-more').addClass("hidden");
        $(this).parent().parent().find('.read-less').removeClass("hidden");

        list.parent().removeClass('li-hidden');
        list.each(function (index) {
            $(this).css("display", "block");
            //$(this).removeClass("no-bottom-border");
        });
        $('.read-less').one('click', show_less);
    };

    function show_less(e) {
        e.preventDefault();
        var ul = $(this).parent().parent();
        var list = ul.find('label');
        var title = ul.attr('title');

        //$(this).parent().parent().find('.read-more').text("Show More");
        $(this).parent().parent().find('.read-less').addClass("hidden");
        $(this).parent().parent().find('.read-more').removeClass("hidden");

        if (list.length >= LIMIT) {
            list.parent().addClass("li-hidden");
        }
        list.each(function (index) {
            if (index > LIMIT) {
                $(this).css("display", "none");
            };
            //if (index == LIMIT) {
            //    $(this).addClass("no-bottom-border");
            //}
        });
        $('.read-more').one('click', show_more);
    };

    $('.read-less').one('click', show_less);
    $('.read-more').one('click', show_more);

    // Sort by popularity ascending/descending handling
    function sort_count_up(e) {
        //ascending count sort
        function asc_count_sort(a, b) {
            return parseInt($(b).attr("count")) < parseInt($(a).attr("count")) ? 1 : -1;
        };
        e.preventDefault();
        //$(this).text("1 -> 9");
        //$(this).parent().find('.sort-name').text("A    Z");
        $(this).find(".sort-count-icon").addClass("icon-chevron-up");
        $(this).find(".sort-count-icon").removeClass("icon-chevron-down");
        $(this).parent().find('.sort-name-icon').removeClass("icon-chevron-down");
        $(this).parent().find('.sort-name-icon').removeClass("icon-chevron-up");
        //$(this).parent().find('.sort-name-icon').addClass("icon-minus");
        var ul = $(this).parent().parent().parent().find('.switches');
        var list = ul.find('li');

        ul.toggleClass("count_asc");
        ul.toggleClass("count_desc");
        list.sort(asc_count_sort).appendTo(ul);
        if (ul.hasClass("li-hidden")) {
            list.each(function (index) {
                //$(this).removeClass("no-bottom-border");
                if (index <= LIMIT) {
                    $(this).css("display", "block");
                   // if (index == LIMIT) {
                    //    $(this).addClass("no-bottom-border");
                    //}
                } else {
                    $(this).css("display", "none");
                }
            });
        }

        $(this).one('click', sort_count_down);
    };

    function sort_count_down(e) {
        //descending count sort
        function desc_count_sort(a, b) {
            return parseInt($(b).attr("count")) > parseInt($(a).attr("count")) ? 1 : -1;
        };

        //$(this).text("1 <- 9");
        //$(this).parent().find('.sort-name').text("A    Z");
        $(this).find(".sort-count-icon").addClass("icon-chevron-down");
        $(this).find(".sort-count-icon").removeClass("icon-chevron-up");
        $(this).parent().find('.sort-name-icon').removeClass("icon-chevron-down");
        $(this).parent().find('.sort-name-icon').removeClass("icon-chevron-up");
        //$(this).parent().find('.sort-name-icon').addClass("icon-minus");
        e.preventDefault();
        var ul = $(this).parent().parent().parent().find('.switches');
        var list = ul.find('li');

        ul.toggleClass("count_asc");
        ul.toggleClass("count_desc");
        list.sort(desc_count_sort).appendTo(ul);

        if (ul.hasClass("li-hidden")) {
            list.each(function (index) {
                //$(this).removeClass("no-bottom-border");
                if (index <= LIMIT) {
                    $(this).css("display", "block");
                    //if (index == LIMIT) {
                    //    $(this).addClass("no-bottom-border");
                    //}

                } else {
                    $(this).css("display", "none");
                }
            });
        }

        $(this).one('click', sort_count_up);
    };

    //remove greek accented characters
    function remove_accented(str) {
        return str.replace('Ά', 'Α').replace('Έ', 'Ε').replace('Ή', 'Η').replace('Ί', 'Ι').replace('Ό', 'Ο').replace('Ύ', 'Υ').replace('Ώ', 'Ω');
    }

    // Sort alphabetically ascending/descending handling
    function sort_name_up(e) {

        //ascending alphabetical sort
        function asc_alpha_sort(a, b) {
            return (remove_accented($(b).text().toUpperCase())) < (remove_accented($(a).text().toUpperCase())) ? 1 : -1;
        };

        //$(this).text("A -> Z");
        //$(this).parent().find('.sort-count').text("1    9");
        $(this).find(".sort-name-icon").addClass("icon-chevron-down");
        $(this).find(".sort-name-icon").removeClass("icon-chevron-up");
        $(this).parent().find('.sort-count-icon').removeClass("icon-chevron-down");
        $(this).parent().find('.sort-count-icon').removeClass("icon-chevron-up");
        //$(this).parent().find('.sort-count-icon').addClass("icon-minus");
        e.preventDefault();
        var ul = $(this).parent().parent().parent().find('.switches');
        var list = ul.find('li');
        ul.toggleClass("name_asc");
        ul.toggleClass("name_desc");
        list.sort(asc_alpha_sort).appendTo(ul);

        if (ul.hasClass("li-hidden")) {
            list.each(function (index) {
                //$(this).removeClass("no-bottom-border");
                if (index <= LIMIT) {
                    $(this).css("display", "block");
                    //if (index == LIMIT) {
                    //    $(this).addClass("no-bottom-border");
                    //}

                } else {
                    $(this).css("display", "none");
                }
            });
        }

        $(this).one('click', sort_name_down);
    };

    function sort_name_down(e) {

        //descending alphabetical sort
        function desc_alpha_sort(a, b) {
            return (remove_accented($(b).text().toUpperCase())) > (remove_accented($(a).text().toUpperCase())) ? 1 : -1;
        };

        //$(this).text("A <- Z");
        //$(this).parent().find('.sort-count').text("1    9");
        $(this).find(".sort-name-icon").addClass("icon-chevron-up");
        $(this).find(".sort-name-icon").removeClass("icon-chevron-down");
        $(this).parent().find('.sort-count-icon').removeClass("icon-chevron-down");
        $(this).parent().find('.sort-count-icon').removeClass("icon-chevron-up");
        //$(this).parent().find('.sort-count-icon').addClass("icon-minus");
        e.preventDefault();
        var ul = $(this).parent().parent().parent().find('.switches');
        var list = ul.find('li');

        ul.toggleClass("name_asc");
        ul.toggleClass("name_desc");
        list.sort(desc_alpha_sort).appendTo(ul);

        if (ul.hasClass("li-hidden")) {
            list.each(function (index) {
                //$(this).removeClass("no-bottom-border");
                if (index <= LIMIT) {
                    $(this).css("display", "block");
                   // if (index == LIMIT) {
                    //    $(this).addClass("no-bottom-border");
                    //}

                } else {
                    $(this).css("display", "none");
                }
            });
        }

        $(this).one('click', sort_name_up);
    };

    $('.sort-count').one('click', sort_count_up);
    $('.sort-name').one('click', sort_name_up);

}