var Parallax = {
  background: null,
  extra: {
    x: 2,
    y: 3,
    orientation: {
      x: 10,
      y: 8
    }
  },
  cache: function () {
    Parallax.midpoint = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    Parallax.range = {
      x: window.innerWidth - Parallax.midpoint.x,
      y: window.innerHeight - Parallax.midpoint.y
    }
  },
  init: function (element) {

    Parallax.cache();

    $(window).on('resize', Parallax.cache);

    if ($.os.tablet || $.os.phone) {
      Parallax.extra.x = Parallax.extra.orientation.x;
      Parallax.extra.y = Parallax.extra.orientation.y;
      $(window).on('deviceorientation', Parallax.orientation);
    } else {
      $(document).on('mousemove', Parallax.mouse);
    }

    Parallax.background = $(element);
    Parallax.background.addClass('animate');

    Parallax.background.css({
      width: 100 + Parallax.extra.x + '%',
      height: 100 + Parallax.extra.y + '%',
      opacity: 1,
    });

    Parallax.update(0, 0, true);

  },
  update: function (x, y, init) {

    var x = Math.max(-1, Math.min(1, x)),
        y = Math.max(-1, Math.min(1, y));

    x = -x * (Parallax.extra.x / 2) - Parallax.extra.x / 2;
    y = -y * (Parallax.extra.y / 2) - Parallax.extra.y / 2;

    Parallax.background.css({
      left: x.toFixed(5) + '%',
      top: y.toFixed(5) + '%'
    });

    if (init) {
      setTimeout(function () {
        Parallax.background.removeClass('animate');
      }, 600);
    }

  },
  orientation: function (e) {

    var base = window.orientation,
        angle = 90 === base || -90 === base,
        x = angle ? e.beta : e.gamma,
        y = (angle ? e.gamma : e.beta) + (base > 0 ? 33 : -33);

    x *= 180 === base || -90 === base ? -1 : 1;
    y *= 0 >= base ? -1 : 1;

    Parallax.update(x / 20, y / 30);

  },
  mouse: function (e) {

    var x = e.x || e.pageX, y = e.y || e.pageY;

    x = (x - Parallax.midpoint.x) / Parallax.range.x;
    y = (y - Parallax.midpoint.y) / Parallax.range.y;

    Parallax.update(x, y);
  }

};

$(window).on('load', function () {
  Parallax.init('.parallax');
});