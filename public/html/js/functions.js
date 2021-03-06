/**
 * Functionality specific to Grid312.
 *
 */
!function (t)
{
    "use strict";
    function e()
    {
        function e()
        {
            t(".grids, article, .site-content, .sidebar").removeAttr("style"), g.addClass("reset-grid"), 
            m.removeClass("clearfix"), 1 == E && m.masonry("destroy"), w.removeClass("border"), t(".pic .ctop, .pic .cbottom").remove(), 
            t(".ads img, .single img").removeClass("grayscale")
        }
        var a = t(".metro").width();
        if (t("li.person, .preview li, body.page-author article.grid, body.archive article.grid").each(function ()
        {
            var e = t(this);
            e.css("height", e.width())
        }), t(".nav-post, #map").each(function ()
        {
            var e = t(this);
            e.css("height", e.width() / 2)
        }), p.css("margin-top", p.offset().left), d.width() > 1920 && p.css("margin-top", 152), b.each(function ()
        {
            var e = t(this);
            e.css("height", e.width() / 1.5)
        }), d.width() > 1024)
        {
            var i;
            t(".metro .box, .post-link .box").each(function ()
            {
                var e = t(this);
                e.on(
                {
                    mouseover : function ()
                    {
                        e.find(".hidden_el").show(), i = e.find(".bottom-box").innerHeight() - 4, e.find(".bottom-box").css({
                            "margin-top" : "-" + i + "px"
                        })
                    },
                    mouseout : function ()
                    {
                        e.find(".hidden_el").hide(), i = e.find(".bottom-box").innerHeight() - 4, e.find(".bottom-box").css({
                            "margin-top" : "-" + i + "px"
                        })
                    }
                })
            })
        }
        d.width() > 768 ? (t("body.post-format-standard .entry-header, body.page .entry-header").each(function ()
        {
            var e = t(this);
            e.css(
            {
                height : e.width(), "max-height" : t(".entry-content").innerHeight() - t(".tag-links").height()
            })
        }), t(".sitemap ul[class*=list]").each(function ()
        {
            var e = t(this);
            e.css("height", e.parent().height())
        }), u.each(function ()
        {
            var e = t(this);
            e.css("height", e.width() / 4)
        }), t("li.title-section").each(function ()
        {
            var e = t(this);
            e.css("height", e.width())
        }), m.css({
            height : a
        }), v.css({
            "min-height" : t(".sidebar").height()
        }), t(".reset-grid").removeAttr("style"), g.removeClass("reset-grid"), m.masonry({
            columnWidth : ".single", percentPosition :!0, isAnimated :!1, itemSelector : ".grid"
        }), E = !0, t(".grid-2 .box").each(function ()
        {
            var e = t(this);
            e.on(
            {
                mouseover : function ()
                {
                    e.find(".hidden_el").show(), e.find(".bottom-box").css({
                        top : 0, "margin-top" : 0
                    })
                },
                mouseout : function ()
                {
                    e.find(".hidden_el").hide();
                    var t = e.find(".bottom-box").innerHeight() - 4;
                    e.find(".bottom-box").css({
                        top : "100%", "margin-top" : "-" + t + "px"
                    })
                }
            })
        })) : d.width() > 480 && d.width() <= 768 ? (e(), t(".reset-grid").each(function ()
        {
            var e = t(this);
            e.css("height", e.width())
        }), u.each(function ()
        {
            var e = t(this);
            e.css("height", e.width() / 2)
        }), t(".ads").each(function ()
        {
            var e = t(this);
            e.css("min-height", e.find("img").height() + 90)
        }), t("li.person:odd").after('<div class="clearfix"></div>')) : d.width() <= 480 && (e(), b.removeAttr("style"), 
        b.find("li").removeClass("grid").removeClass("double"), t(".reset-grid, .post-link, .grid-2").each(function ()
        {
            var e = t(this);
            e.css("height", e.width())
        }), t(".nav-post, .entries").each(function ()
        {
            t(this).css("height", "auto")
        }), t('a[aria-label="Previous"]').html('<span><i class="fa fa-caret-left"></i></span>'), t('a[aria-label="Next"]').html('<span><i class="fa fa-caret-right"></i></span>')), 
        t(".bottom-box").each(function ()
        {
            var e = t(this), a = e.innerHeight() - 4;
            e.css({
                "margin-top" : "-" + a + "px"
            })
        }), t("figcaption").each(function ()
        {
            var e = t(this), a = e.innerHeight();
            e.css({
                "margin-top" : "-" + a + "px"
            })
        }), t("body.home .grids").each(function ()
        {
            var e = t(this);
            "" != e.find(".single:eq(0)").html() && e.find(".single:eq(0)").addClass("cat"), "" != e.find(".single:eq(1)").html() && e.find(".single:eq(1)").addClass("adv")
        })
    }
    function a()
    {
        t(".modal-body .pic").imagesLoaded(function ()
        {
            t(".modal-body").stop().animate({
                opacity : 1
            },
            {
                step : function (e)
                {
                    t(this).css("transform", "scale(" + e + ")")
                },
                duration : 500
            },
            "easeInExpo")
        })
    }
    function i()
    {
        var e = t(".full"), a = e.attr("width"), i = e.attr("height");
        e.parent().addClass("draggable"), e.stop().animate({
            "max-width" : a, "max-height" : i
        }, 0), n(), q.addClass("zoom-out")
    }
    function o()
    {
        k.removeAttr("style"), k.parent().removeClass("draggable"), k.parent().removeAttr("data-x"), k.parent().removeAttr("data-y"), 
        k.parent().removeAttr("style"), q.removeClass("zoom-out")
    }
    function n()
    {
        function t(t)
        {
            var e = t.target, a = (parseFloat(e.getAttribute("data-x")) || 0) + t.dx, i = (parseFloat(e.getAttribute("data-y")) || 0) + t.dy;
            e.style.webkitTransform = e.style.transform = "translate(" + a + "px, " + i + "px)", e.setAttribute("data-x", 
            a), e.setAttribute("data-y", i)
        }
        interact(".draggable").draggable({
            inertia :!0, restrict : {
                restriction : "parent", endOnly :!0
            },
            onmove : t
        })
    }
    function s()
    {
        L.attr("width") < d.width() && L.attr("height") < d.height() ? q.hide() : q.show()
    }
    function r()
    {
        if (d.width() <= 480)
        {
            for (var e = 0; e < t(".grid").length; e++) 
            {
                var a = t(t(".grid")[e]), i = a.find("img").attr("src");
                a.prepend('<div class="fullsizeWrap" style="left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; position: absolute;"></div>'), 
                a.find(".fullsizeWrap").css({
                    "background-image" : "url(" + i + ")" 
                }), a.find("img").css("display", "none") 
            }
        }
        else
        {
            t(".grid img").css("display", "block"), t(".grid img").liCover({
                parent : t(".grid"), position : "absolute" 
            });
        }
    }
    var d = t(window), c = t("html, body"), l = t("img"), h = t("div"), p = t(".main"), m = t(".grids"), 
    f = t(".site-name"), u = t(".entries"), g = t("article.grid"), v = t(".site-content"), b = t("#portfolio"), 
    y = t(".embed"), w = t(".pic"), x = t(".dropdown"), C = t(".modal"), k = t(".modal-body img"), A = t(".modal-footer"), 
    T = t("#comments-post"), q = t(".zoom"), L = t(".full"), O = t("#share-buttons"), E = !1, H = 0;
    f.each(function ()
    {
        var e = t(this), a = e.text().split(" ");
        e.html(a[0] + " <span>" + a[1] + "</span>")
    }), e(), d.width() > 768 && (t('.box, div.grid-2, .preview a, a[data-toggle="modal"]').prepend('<div class="border"></div>'), 
    t(".border, .pic.border").prepend('<div class="ctop"></div><div class="cbottom"></div>')), y.prepend('<div class="ctop"></div><div class="cbottom"></div>');
    var $ = t("li.comment").length;
    T.find("span").text($), t(".featured-img").each(function ()
    {
        var e = t(this), a = e.find("img").attr("src");
        d.width() > 768 ? e.parent().css({
            "background-image" : "url(" + a + ")"
        }) : e.css({
            "background-image" : "url(" + a + ")"
        }), e.find("img").remove()
    }), t('article[data-type="catalog"]').each(function ()
    {
        var e = t(this);
        "" == e.html() && (e.addClass("empty-cat"), e.html("<h6>CATEGORY<br>BLOCK</h6>"))
    }), t('article[data-type="ads"]').each(function ()
    {
        var e = t(this);
        "" == e.html() && (e.addClass("empty-ads"), e.html("<h6>ADVERTISEMENT<br>BLOCK</h6>"))
    }), t(".type-post .fa-quote-right").parent().parent().addClass("type-quote"), d.width() > 1024 && t('div[data-type="background"]').each(function ()
    {
        var e = t(this);
        d.scroll(function ()
        {
            var t =- (d.scrollTop() / e.data("speed")) / 2, a = "50% " + t + "px";
            e.css({
                "background-position" : a
            })
        })
    }), d.width() > 1024 ? (t("#main-menu").on(
    {
        mouseover : function ()
        {
            t(".menu, .navbar-main").addClass("open")
        },
        mouseout : function ()
        {
            t(".menu, .navbar-main").removeClass("open")
        }
    }), x.on("mousemove", function ()
    {
        var e = t(this);
        e.children(".submenu").css({
            "padding-top" : e.position().top
        })
    }), t(".navbar-main, .navbar-main .submenu").css("height", v.innerHeight())) : (x.append('<span class="o-sbm"></span>'), 
    t("#main-menu .header-icon").on("click", function ()
    {
        var e = t(this);
        e.parent().toggleClass("open"), t(".menu, .navbar-main").toggleClass("open")
    }), t(".o-sbm").on("click", function ()
    {
        var e = t(this);
        e.toggleClass("open"), e.parent().toggleClass("open"), e.parent().children(".submenu").toggleClass("open")
    })), T.on("click", function ()
    {
        c.animate({
            scrollTop : t(".post-comments").offset().top
        }, 500)
    }), h.hasClass("metro") && t(".cat a").each(function ()
    {
        var e = t(this), a = e.find("img").attr("src");
        e.prepend('<div class="blended"></div>'), e.find(".blended").css({
            "background-image" : "url(" + a + ")"
        }), e.find("img").remove()
    }), t("a.popup").each(function ()
    {
        var e = t(this), a = e.children("img").attr("src"), i = e.next("figcaption").text();
        e.attr("data-url", a), e.attr("data-caption", i), e.attr("data-target", "#popup"), e.attr("href", 
        "#popup"), v.before('<div class="modal" id="popup" tabindex="-1" role="dialog" aria-labelledby="popup" aria-hidden="true"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button><div class="modal-dialog"><div class="modal-content"><div class="modal-body"></div></div></div></div>')
    }), t("#popup").on("show.bs.modal", function (e)
    {
        var i = t(e.relatedTarget), o = i.data("caption"), n = i.data("url"), s = t(this);
        s.find(".modal-body").html(d.width() > 768 ? '<div class="pic border"><img src="' + n + '"><div class="modal-footer">' + o + '</div><div class="ctop"></div><div class="cbottom"></div></div>' : '<div class="pic"><img src="' + n + '"><div class="modal-footer">' + o + "</div></div>"), 
        a()
    }), t('a[data-toggle="modal"]').on("click", function ()
    {
        t("header.site-header, .sidebar, .site-content, .site-footer").addClass("blur-on")
    });
    var _ = 0;
    if (q.on("click", function ()
    {
        C.toggleFullScreen(), 0 == _ ? (i(), _ = 1) : (o(), _ = 0);
    }), t(document).keydown(function (t)
    {
        122 === t.keyCode && (0 == _ ? (i(), _ = 1) : (o(), _ = 0)), 27 === t.keyCode && (o(), _ = 0);
    }), t.fn.retina = function (e)
    {
        var a = {
            retina_part : "@2x"
        };
        return e && jQuery.extend(a, 
        {
            retina_part : e
        }), window.devicePixelRatio >= 2 && this.each(function (e, i)
        {
            if (t(i).attr("src"))
            {
                var o = new RegExp("(.+)(" + a.retina_part + "\\.\\w{3,4})");
                if (!o.test(t(i).attr("src")))
                {
                    var n = t(i).attr("src").replace(/(.+)(\.\w{3,4})$/, "$1" + a.retina_part + "$2");
                    t.ajax(
                    {
                        url : n, type : "HEAD",
                        success : function ()
                        {
                            t(i).attr("src", n), t(i).each(function ()
                            {
                                $this.width($this.width() / 2)
                            })
                        }
                    })
                }
            }
        }), this
    },
    l.retina("@2x"), t(".preview a").on("click", function (t)
    {
        t.preventDefault()
    }), t("#gallery").on("show.bs.modal", function (e)
    {
        var o = t(e.relatedTarget);
        H = o.parent().index(), k.eq(H).addClass("full"), A.text(k.eq(H).attr("title")), a(), s(), t(".next").on("click", 
        function ()
        {
            H < k.length - 1 ? H++: H = 0, k.removeClass("full"), k.parent().removeAttr("style"), k.parent().removeAttr("data-x"), 
            k.parent().removeAttr("data-y"), k.eq(H).addClass("full"), 1 == _ && i(), A.text(k.eq(H).attr("title")), 
            s();
        }), t(".prev").on("click", function ()
        {
            H > 0 ? H--: H = k.length - 1, k.removeClass("full"), k.parent().removeAttr("style"), k.parent().removeAttr("data-x"), 
            k.parent().removeAttr("data-y"), k.eq(H).addClass("full"), 1 == _ && i(), A.text(k.eq(H).attr("title")), 
            s();
        })
    }), t("#team-modal").on("show.bs.modal", function (e)
    {
        var a = t(e.relatedTarget), i = a.find(".person-desc").html(), o = a.next(".person-info").html(), 
        n = a.find("img").attr("src"), s = t(this);
        TweenLite.set(t(".modal-dialog"), {
            transformOrigin : "50% 50% 0", scale : .5
        }), TweenLite.to(t(".modal-dialog"), .3, 
        {
            opacity : 1, scale : 1, ease : Expo.easeInOut, delay : .3,
            onComplete : function ()
            {
                t(".modal-dialog").css({
                    "transform-origin" : "", transform : "", "-webkit-transform" : ""
                })
            }
        }), s.find(".modal-body").html('<div class="person-box clearfix"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button><div class="person-avatar"><img src="' + n + '"></div><div class="author-info">' + i + "</div>" + o + "</div>")
    }), t(".modal").on("hidden.bs.modal", function ()
    {
        t(this).fullScreen(!1), k.removeClass("full"), t(".blur-on").removeClass("blur-on"), t("body, .modal-body").removeAttr("style"), 
        o(), _ = 0;
    }), t(".tag-link").each(function ()
    {
        var e = t(this), a = e.data("tag");
        e.css("opacity", a), e.hover(function ()
        {
            e.stop().animate({
                opacity : 1
            }, 250)
        },
        function ()
        {
            e.stop().animate({
                opacity : a
            }, 250)
        })
    }), d.width() > 768 && h.hasClass("post"))
    {
        var z = t(".post-content p").eq(0).next().offset().top, I = t(".post-content p").eq(0).next().position().top, 
        F = t(".post-content").innerHeight() - O.innerHeight() - I, R = t(".tag-links").offset().top - O.height();
        O.css({
            top : I + "px"
        }), d.scroll(function ()
        {
            var t = d.scrollTop(), e = 0;
            t > z && R > t ? e = t - z + 40 : t > R && (e = F), O.css({
                "margin-top" : e + "px"
            })
        })
    }
    t("#btn-search").on("click", function ()
    {
        TweenLite.to(t("#site-search"), .3, {
            transform : "rotateX(0)", opacity : 1
        }), TweenLite.to(t("#header"), .3, {
            css : {
                transform : "rotateX(-90deg)", transformOrigin : "0 0 7.5em", opacity : 0
            }
        }), t("#site-search").addClass("open")
    }), t("#site-search .close").on("click", function ()
    {
        TweenLite.to(t("#site-search"), .3, {
            transform : "rotateX(90deg)", opacity : 0
        }), TweenLite.to(t("#header"), .3, {
            transform : "rotateX(0)", opacity : 1
        }), t("#site-search form")[0].reset(), t("#site-search").removeClass("open")
    }), Modernizr.input.placeholder || (t("form").find("*[placeholder]").each(function ()
    {
        var e = t(this);
        e.val(e.attr("placeholder"))
    }).focusin(function ()
    {
        $this.val("")
    }).focusout(function ()
    {
        "" == $this.val() && $this.val($this.attr("placeholder"))
    }), t("form").submit(function ()
    {
        var e = t(this);
        e.find("*[placeholder]").each(function ()
        {
            var t = e.attr("placeholder");
            e.val() == t && e.val("")
        })
    })), d.on("load", function ()
    {
        r(), t("#loader").fadeOut(0, function ()
        {
            p.css("opacity", 1), d.width() > 480 && (TweenMax.staggerFromTo(t(".main-wrapper"), .3, {
                opacity : 0
            },
            {
                css : {
                    opacity : 1
                },
                ease : Expo.easeInOut, delay : .3
            }), TweenLite.set(t(".main-wrapper"), {
                transformOrigin : "50% 10% 0", scale : .8
            }), TweenLite.to(t(".main-wrapper"), .3, 
            {
                opacity : 1, scale : 1, ease : Expo.easeInOut, delay : .3,
                onComplete : function ()
                {
                    t(".main-wrapper").css({
                        "transform-origin" : "", transform : "", "-webkit-transform" : ""
                    })
                }
            }))
        })
    }), d.resize(function ()
    {
        e(), r()
    })
}
(jQuery);