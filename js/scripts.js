var topMenu = $("nav"),
  topMenuHeight = 0,
  // All list items
  menuItems = topMenu.find('a[href*="#"]'),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function () {
    var href = $(this).attr("href"),
      id = href.substring(href.indexOf("#")),
      item = $(id);
    //console.log(item)
    if (item.length) {
      return item;
    }
  });

// so we can get a fancy scroll animation
menuItems.click(function (e) {
  var href = $(this).attr("href"),
    id = href.substring(href.indexOf("#"));
  offsetTop = href === "#" ? 0 : $(id).offset().top - topMenuHeight;
  $("html, body").stop().animate(
    {
      scrollTop: offsetTop,
    },
    1900,
    "easeInOutExpo"
  );
  e.preventDefault();
});
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop) return this;
  });

  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  menuItems.parent().removeClass("active");
  if (id) {
    menuItems
      .parent()
      .end()
      .filter("[href*='#" + id + "']")
      .parent()
      .addClass("active");
  }
});

/**/
Visibility.onVisible(function () {
  setTimeout(function () {
    $(".fundo").addClass("animated fadeIn").css("animation-duration", "6s");
  }, 400);
  setTimeout(function () {
    $(".logo").addClass("animated fadeIn").css("animation-duration", "3s");
  }, 4000);
  setTimeout(function () {
    $("nav").addClass("animated fadeIn");
  }, 100);

  // Debounce do Lodash
  debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  (function () {
    var $targetLeft = $(".animar"),
      animationLeft = "animated fadeIn";
    offset = $(window).height() * (8.3 / 10);

    function animeScroll() {
      var documentTop = $(document).scrollTop();
      $targetLeft.each(function () {
        var itemTop = $(this).offset().top;
        if (documentTop > itemTop - offset) {
          $(this).addClass(animationLeft);
        }
      });
    }

    animeScroll();

    $(document).scroll(
      debounce(function () {
        animeScroll();
      }, 50)
    );
  })();
}); //close visibility
