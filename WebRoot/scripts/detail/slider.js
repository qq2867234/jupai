(function(a) {
    a.extend(a.fn, {
        slider: function(c) {
            var s = this,
            c = a.extend({
                lazyload: true,
                mark: true,
                autoplay: 2000,
                data: [],
                maxImg: {
                    w: 400,
                    h: 640
                },
                first: 1
            },
            c),
            t = c.data || [],
            q = t.length,

            j = "",
            f = c.first,
            g = {},
            l,
            h,
            r,
            k,
            left,
            imgs = [],
            win = {
                "w": window.innerWidth ? window.innerWidth: $(window).width(),
                "h": (window.innerHeigh ? window.innerHeigh: $(window).height()) - 44
            },

            maxImg = returnsize(c.maxImg.w, c.maxImg.h, win.w, win.h),
            n = win.w;;

            s.css({
                width: win.w + "px",
                height: win.h + "px"
            });
            t = [].concat([t[q - 1]]).concat(t);
            t.push(t[1]);
            q = t.length;
            j = '<div class="slider-content">';
            for (var i = 0; i < q; i++) {
                imgs[i] = returnsize(t[i].w, t[i].h, maxImg.w, maxImg.h),
                src = t[i].src + '_' + imgs[i].w + '-' + imgs[i].h + '_8-11.jpg';
                j += '<a rel="nofollow" href="' + (t[i].url ? t[i].url: '#') + '" style="width:' + win.w + 'px; height:' + win.h + 'px">';
                j += (i == 1 || i == q - 1 || i==f) ? '<img src="' + src + '" style="width:' + imgs[i].w + 'px; height:' + imgs[i].h + 'px; margin-top:-' + parseInt(imgs[i].h / 2) + 'px" ></a>': '<img src="/resourcesWap/images/loading_b.gif" data-src="' + src + '" ></a>';;

            }
            j += "</div>";
            if (c.mark) {
                j += '<ul class="img-slider-mark"> <span><b>'+f+'/'+(q-2)+'</b><i></i></span></ul>';

            }
            s.html(j);
            l = s.find(".slider-content");
            l.css({
                "-webkit-transform": "translate3d(-" + n * f + "px, 0, 0)",
                "transform": "translate3d(-" + n * f + "px, 0, 0)"
            }).css("width", (q + 1) * n + "px");
            left = -n * f;
            h = s.find(".img-slider-mark span b");
            function e(i) {
                i.preventDefault();
                i.stopPropagation();
                g = {};

                g.target = i.touches ? i.touches[0].target: i.target;

                g.x = i.touches ? i.touches[0].pageX: i.pageX;
                g.y = i.touches ? i.touches[0].pageY: i.pageY;
                g.left = parseInt(left);
                g.scrollY = false;
                g.active = false;
                l.on("mousemove touchmove", m);
                l.on("mouseup touchend", d);
                $(document).on("mouseup touchend", d);
            }
            function m(u) {
                if (g.scrollY) {
                    return;
                }

                var i = u.touches ? u.touches[0].pageX: u.pageX,
                w = u.touches ? u.touches[0].pageY: u.pageY,
                v;
                g.disX = i - g.x;
                g.disY = w - g.y;
                if (Math.abs(g.disX) < 10 && Math.abs(g.disY) < 10) {
                    return;
                }
                if (g.active || Math.abs(g.disY) < Math.abs(g.disX)) {
                    u.preventDefault();
                    g.active = true;
                    l.css({
                        "-webkit-transform": "translate3d(" + parseInt(g.left + g.disX, 10) + "px, 0, 0)",
                        "transform": "translate3d(" + parseInt(g.left + g.disX, 10) + "px, 0, 0)"
                    });
                    left = parseInt(g.left + g.disX, 10);
                } else {
                    g.scrollY = true;
                }
            }
            function d(i) {
                g.active = false;
                if (g.scrollY) {
                    return;
                }

                i.preventDefault();
                if (!r) {
                    if (g.disX > 0) {
                        o(--f);

                    }
                    if (g.disX < 0) {
                        o(++f);
                    }
                }
                l.off("mousemove touchmove", m);
                l.off("mouseup touchend", d);
                $(document).off("mouseup touchend", d);
            }
            l.on("mousedown touchstart", e);
            function o(u) {
                r = true;
                var u = u;
                var i = l.find("img").eq(u);
                i.attr("data-src") && i.attr("src", i.attr("data-src")),
                i.removeAttr("data-src"),
                i.css({
                    marginTop: -parseInt(imgs[u].h / 2) + 'px'
                });
                left = -n * u;
                l.animate({
                    "-webkit-transform": "translate3d(-" + n * u + "px, 0, 0)",
                    "transform": "translate3d(-" + n * u + "px, 0, 0)"
                },
                {
                    duration: 200,
                    easing: "ease",
                    complete: function() {
                        if (u == 0) {
                            l.css({
                                "-webkit-transform": "translate3d(-" + n * (q - 2) + "px, 0, 0)",
                                "transform": "translate3d(-" + n * (q - 2) + "px, 0, 0)"
                            });
                            left = -n * (q - 2);
                            f = q - 2;
                        } else {
                            if (u >= q - 1) {
                                l.css({
                                    "-webkit-transform": "translate3d(-" + n + "px, 0, 0)",
                                    "transform": "translate3d(-" + n + "px, 0, 0)"
                                });
                                left = -n;
                                f = 1;
                            }
                        }
                        h.html(f+'/'+(q-2));
                        r = false;
                    }
                });

            }
            return this;
        }
    });
})(Zepto);

function returnsize(conW, conH, boxW, boxH) {
    var newCon = {
        "w": 0,
        "h": 0
    }; (conW / conH) > (boxW / boxH) ? (conW > boxW ? (newCon.w = boxW, newCon.h = parseInt(newCon.w * conH / conW)) : (newCon.w = conW, newCon.h = conH)) : (conH > boxH ? (newCon.h = boxH, newCon.w = parseInt(newCon.h * conW / conH)) : (newCon.h = conH, newCon.w = conW));
    return newCon;
}