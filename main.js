/*****************

    JavaScript

*****************/

/*
    Fix image height in
    ask and text posts
*/
function fixAddedImage() {
    $(".answer img, .text img").each(function (i, el) {
        var $el = $(el);

        if ($el.attr("data-orig-height")) {
            $el.removeAttr("height");
        }
    });
}

{block:IndexPage}
fixAddedImage();

$(function() {
{block:ifInfiniteScroll}

    /*
        Infinite scroll
        by Filipe Dobreira
    */    
    function setupInfiniteScroll (fn) {
        var postClass = ".post";
        var nextPageElementClass = ".next-page";
        var nextPageUrl = $(nextPageElementClass).attr("href");
        var loadLock = false;

        var loadNewPage = function (fn) {
            // Don't do anything if already busy:
            if (loadLock) return false;
            loadLock = true;

            var $scratch = $(document.createElement("div"));

            $scratch.load(nextPageUrl, function (data) {
                var $parent = $(data);
                nextPageUrl = $parent.find(nextPageElementClass).attr("href");

                fn($parent.find(postClass).get());

                loadLock = false;
            });
        };


        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
            loadNewPage(fn);
            }
        });
    } // end infinite scroll

    setupInfiniteScroll(function (elems) {
        savvior.addItems("main", elems, {
            method: 'append',
            clone: false
        }, fixAddedImage);
    });
    {/block:ifInfiniteScroll}

    savvior.init('main', {
        "screen": { columns: 3 }
    });
});
{block:IndexPage}
    
{block:PermalinkPage}
$(function() {
    fixAddedImage();
});
{/block:PermalinkPage}