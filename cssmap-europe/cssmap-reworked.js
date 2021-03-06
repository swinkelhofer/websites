/*
* CSSMap plugin
* version: 5.5.4
* author: Åukasz Popardowski { Winston_Wolf }
* license: http://cssmapsplugin.com/license
* FAQ: http://cssmapsplugin.com/faq
* web: http://cssmapsplugin.com
* email: http://cssmapsplugin.com/contact
* twitter: @CSSMapplugin
*/

(function($) {
    "use strict";
    $.fn.CSSMap = function(o) {
        var d = {
            size: 0,
            mapStyle: "default",
            tooltips: "floating",
            tooltipArrowHeight: 5,
            cities: false,
            responsive: "auto",
            fitHeight: false,
            activateOnLoad: [],
            tapOnce: false,
            mobileSupport: false,
            loadingText: "Loading ...",
            visibleList: {
                enable: false,
                containerId: "",
                listPosition: "bottom",
                columns: 1,
                columnsGap: 0,
                columnWidth: 0,
                hideItems: []
            },
            multipleClick: {
                enable: false,
                searchUrl: "search.php",
                searchLink: "Search",
                searchLinkVar: "region",
                separator: "+",
                hideSearchLink: false,
                clicksLimit: 0,
                clicksLimitAlert: "You can select only %d region! || regions!"
            },
            agentsList: {
                enable: false,
                agentsListId: "",
                agentsListSpeed: 0,
                agentsListOnHover: false
            },
            pins: {
                enable: false,
                pinsId: "",
                mapSize: 0,
                markerClass: "cssmap-marker",
                pinTooltipClass: "cssmap-tooltip-content",
                markerPosition: "middle",
                tooltipPosition: "top",
                tooltipOnClick: false,
                clickableRegions: true
            },
            formSupport: {
                enable: false,
                inputId: "",
                selectId: "",
                selectLabel: "",
                value: "name"
            },
            navigation: {
                enable: false,
                loop: false,
                next: "",
                prev: "",
                separator: "|",
                label: "",
                description: ""
            },
            onClick: function(e) {},
            onSecondClick: function(e) {},
            onHover: function(e) {},
            unHover: function(e) {},
            onLoad: function(e) {},
            authorInfo: false,
            disableClicks: false
        },
        CSSMapError = function(a) {
            return "<div class=\"cssmap-error\"><p><b>CSSMap error</b> - " + a + "</p></div>"
        },
        CSSMapSignature = "<div class=\"cssmap-signature\"><a href=\"http://cssmapsplugin.com/?ref=" + window.location.href + "\" rel=\"external\"><b>CSSMap plugin</b> by Åukasz Popardowski</a></div>";
        if (o) {
            var s = $.extend(true, d, o || {})
            var w = window,
            wHash = "#" + s.country,
            bW = $(w).width(),
            bH = $(w).height(),
            ie = ((navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 8.") != -1) ? true : false),
            resizeTimer, resized = false,
            mapContainerID, MAPS = {
                "africa": {
                    abbr: "afr",
                    cs: [34, 17, 7, 14, 11, 5, 18, 2, 4, 20, 21, 3, 14, 9, 29, 3, 9, 3, 11, 22, 10, 4, 7, 11, 3, 13, 5, 7, 23, 12, 2, 7, 24, 17, 2, 2, 13, 26, 13, 19, 14, 3, 4, 7, 3, 10, 3, 4, 18, 6, 28, 19, 21, 3, 4, 9, 6, 14, 16, 11],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [235, 300, 405, 510, 610, 700, 800, 900, 1200, 1360]
                },
                "argentina": {
                    abbr: "ar",
                    cs: [3, 37, 32, 25, 23, 21, 24, 19, 31, 23, 17, 25, 26, 14, 28, 36, 38, 27, 12, 34, 30, 17, 21, 13, 11],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [445, 540, 680, 900, 1135, 1370, 1595, 1825, 2040]
                },
                "australia": {
                    abbr: "au",
                    cs: [3, 26, 18, 31, 13, 11, 21, 31],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280],
                    heights: [200, 305, 410, 515, 620, 710, 810, 915, 1215]
                },
                "austria": {
                    abbr: "at",
                    cs: [25, 29, 50, 45, 36, 38, 45, 12, 6],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [115, 175, 240, 300, 360, 410, 460, 525, 700, 800]
                },
                "belgium": {
                    abbr: "be",
                    cs: [32, 9, 43, 46, 53, 48, 41, 48, 49, 22, 32],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [175, 265, 360, 450, 540, 620, 705, 800, 1065, 1205]
                },
                "brazil": {
                    abbr: "br",
                    cs: [14, 9, 18, 44, 38, 13, 3, 8, 24, 24, 31, 23, 31, 38, 14, 14, 19, 21, 11, 9, 25, 16, 17, 15, 22, 8, 23],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [220, 335, 445, 560, 675, 780, 885, 1000, 1330, 1505]
                },
                "canada": {
                    abbr: "ca",
                    cs: [21, 32, 14, 14, 37, 35, 10, 45, 31, 3, 42, 14, 28],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [215, 275, 370, 465, 560, 645, 730, 825, 1100, 1245]
                },
                "chile": {
                    abbr: "cl",
                    cs: [11, 4, 10, 13, 9, 8, 12, 7, 9, 7, 20, 7, 11, 7, 9],
                    sizes: [200, 300, 350, 400, 450, 550],
                    heights: [575, 855, 1125, 1405, 1675, 1950]
                },
                "colombia": {
                    abbr: "co",
                    cs: [51, 47, 16, 5, 9, 29, 36, 17, 49, 28, 30, 27, 38, 20, 30, 29, 33, 24, 20, 20, 44, 26, 21, 22, 7, 10, 2, 25, 17, 20, 23, 36, 23],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960],
                    heights: [285, 435, 580, 725, 875, 1015, 1155, 1300]
                },
                "continents": {
                    abbr: "c",
                    cs: [20, 35, 19, 23, 35, 15, 3],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [105, 130, 165, 220, 280, 340, 395, 445, 495, 665, 755]
                },
                "croatia": {
                    abbr: "hr",
                    cs: [24, 27, 36, 10, 15, 24, 20, 11, 26, 8, 21, 18, 21, 30, 28, 29, 13, 18, 21, 33, 35],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [200, 315, 415, 525, 640, 740, 830, 945, 1255, 1425]
                },
                "cuba": {
                    abbr: "cu",
                    cs: [7, 24, 22, 11, 15, 13, 4, 19, 10, 13, 15, 6, 16, 17, 11, 20],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [95, 125, 175, 215, 255, 285, 320, 370, 495, 565]
                },
                "czech-republic": {
                    abbr: "cs",
                    cs: [8, 34, 38, 15, 34, 26, 18, 30, 38, 26, 25, 46, 24, 23],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [125, 195, 265, 330, 395, 450, 505, 580, 770, 875]
                },
                "europe": {
                    abbr: "eu",
                    cs: [5, 2, 9, 10, 5, 6, 7, 10, 4, 9, 9, 5, 15, 22, 7, 14, 12, 8, 7, 7, 2, 24, 2, 7, 2, 7, 2, 4, 3, 7, 2, 4, 8, 30, 12, 4, 11, 42, 6, 5, 5, 11, 26, 6, 10, 20, 17, 10, 2, 6, 9, 3],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [210, 260, 340, 425, 520, 605, 690, 770, 1040, 1160]
                },
                "finland": {
                    abbr: "fi",
                    cs: [10, 33, 34, 43, 43, 20, 25, 47, 22, 80, 32, 34, 43, 72, 40, 24, 26, 27, 25],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [410, 500, 630, 825, 1040, 1260, 1465, 1670, 1875]
                },
                "france": {
                    abbr: "fr",
                    cs: [43, 50, 52, 41, 20, 36, 10, 16, 43, 30, 24, 34, 32, 2, 2, 2, 2, 2],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280],
                    heights: [305, 385, 505, 640, 770, 900, 1025, 1150, 1530]
                },
                "france-departments": {
                    abbr: "frd",
                    cs: [14, 14, 17, 15, 20, 11, 13, 11, 15, 13, 15, 19, 14, 10, 14, 16, 15, 16, 13, 9, 10, 15, 13, 13, 18, 15, 15, 14, 13, 9, 20, 22, 12, 20, 16, 12, 11, 12, 17, 14, 15, 16, 11, 12, 17, 15, 14, 14, 10, 16, 13, 16, 17, 9, 17, 13, 12, 15, 15, 16, 14, 15, 13, 14, 14, 12, 7, 14, 7, 9, 13, 15, 11, 15, 9, 11, 14, 14, 8, 13, 12, 12, 13, 11, 11, 15, 16, 15, 18, 15, 3, 5, 14, 19, 14, 7, 2, 2, 2, 2, 2],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280],
                    heights: [325, 410, 525, 665, 800, 940, 1080, 1200, 1600]
                },
                "germany": {
                    abbr: "de",
                    cs: [48, 77, 10, 66, 10, 10, 58, 53, 87, 60, 44, 11, 37, 50, 38, 46],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [280, 340, 430, 570, 720, 865, 1005, 1145, 1285]
                },
                "greece": {
                    abbr: "gr",
                    cs: [15, 37, 26, 13, 25, 23, 22, 5, 16, 32, 35, 35, 29, 20],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280],
                    heights: [210, 320, 430, 540, 650, 750, 850, 960, 1280]
                },
                "hungary": {
                    abbr: "hu",
                    cs: [40, 23, 23, 35, 8, 20, 25, 25, 25, 30, 31, 18, 19, 39, 28, 28, 28, 19, 23, 19],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [135, 205, 280, 350, 420, 480, 540, 615, 820, 935]
                },
                "italy": {
                    abbr: "it",
                    cs: [19, 17, 20, 28, 29, 19, 33, 23, 35, 19, 15, 33, 33, 23, 44, 40, 25, 17, 9, 36, 2],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [260, 315, 400, 535, 670, 810, 940, 1065, 1195]
                },
                "mexico": {
                    abbr: "mx",
                    cs: [3, 13, 14, 12, 18, 25, 26, 9, 2, 21, 10, 14, 10, 27, 9, 14, 3, 12, 20, 16, 17, 8, 10, 19, 16, 20, 11, 17, 4, 25, 12, 23],
                    sizes: [320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [0, 0, 0, 0, 0, 0, 630, 0, 950]
                },
                "netherlands": {
                    abbr: "nl",
                    cs: [37, 27, 41, 58, 36, 29, 41, 36, 48, 33, 20, 40],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [245, 295, 375, 500, 630, 760, 880, 1000, 1125]
                },
                "norway": {
                    abbr: "no",
                    cs: [15, 21, 23, 28, 23, 21, 22, 18, 37, 28, 3, 10, 17, 18, 27, 12, 24, 13, 6, 8],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [290, 345, 435, 580, 730, 880, 1020, 1160, 1305]
                },
                "poland": {
                    abbr: "pl",
                    cs: [39, 38, 36, 31, 35, 25, 56, 25, 33, 34, 39, 32, 29, 38, 51, 39],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [200, 240, 305, 410, 515, 620, 710, 805, 910]
                },
                "slovakia": {
                    abbr: "sk",
                    cs: [36, 20, 36, 36, 37, 29, 40, 31],
                    sizes: [210, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [115, 170, 235, 290, 350, 395, 445, 510, 680, 775]
                },
                "south-america": {
                    abbr: "sam",
                    cs: [80, 30, 100, 52, 36, 21, 18, 6, 18, 44, 10, 13, 36, 6],
                    sizes: [150, 210, 320, 430, 540, 650, 750, 850, 960],
                    heights: [225, 315, 475, 620, 790, 960, 1115, 1275, 1420]
                },
                "spain": {
                    abbr: "es",
                    cs: [15, 19, 11, 14, 14, 18, 24, 12, 24, 20, 14, 15, 14, 19, 15, 13, 17, 13, 19, 22, 6, 15, 20, 9, 13, 19, 15, 16, 18, 11, 14, 21, 14, 15, 8, 11, 15, 16, 6, 14, 19, 21, 15, 25, 25, 21, 15, 10, 14, 32, 2, 2],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [210, 270, 360, 450, 540, 620, 710, 800, 1060, 1200]
                },
                "spain-autonomies": {
                    abbr: "esa",
                    cs: [40, 36, 19, 8, 2, 13, 57, 64, 28, 32, 31, 22, 13, 16, 19, 18, 14, 2, 2],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [210, 270, 360, 450, 540, 620, 710, 800, 1060, 1200]
                },
                "sweden": {
                    abbr: "se",
                    cs: [14, 51, 43, 10, 19, 73, 34, 34, 25, 55, 26, 32, 18, 24, 22, 21, 34, 62, 46, 24, 39],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [435, 525, 665, 875, 1105, 1335, 1555, 1775, 1985]
                },
                "switzerland": {
                    abbr: "ch",
                    cs: [27, 14, 8, 18, 6, 65, 37, 10, 13, 38, 16, 30, 18, 14, 12, 13, 21, 29, 30, 21, 23, 18, 38, 51, 8, 22],
                    sizes: [250, 320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [165, 215, 290, 360, 435, 495, 560, 640, 850, 965]
                },
                "turkey": {
                    abbr: "tr",
                    cs: [16, 8, 12, 12, 7, 11, 19, 17, 7, 7, 9, 12, 5, 10, 6, 6, 8, 10, 8, 10, 10, 8, 9, 13, 13, 13, 6, 7, 10, 10, 18, 8, 11, 9, 10, 6, 6, 4, 11, 9, 13, 10, 8, 14, 8, 10, 13, 4, 6, 8, 9, 7, 23, 10, 12, 11, 9, 12, 13, 10, 7, 10, 8, 6, 8, 6, 10, 12, 8, 7, 16, 7, 8, 10, 6, 8, 6, 8, 3, 10, 5],
                    sizes: [320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [150, 210, 260, 315, 355, 400, 455, 610, 695]
                },
                "uruguay": {
                    abbr: "uy",
                    cs: [35, 24, 47, 22, 51, 22, 37, 34, 31, 9, 40, 41, 39, 31, 33, 26, 33, 43, 32],
                    sizes: [210, 250, 320, 430, 540, 650, 750, 850, 960],
                    heights: [230, 275, 355, 470, 590, 715, 825, 935, 1055]
                },
                "usa": {
                    abbr: "usa",
                    cs: [8, 14, 12, 9, 23, 8, 5, 5, 17, 11, 9, 17, 12, 7, 7, 5, 10, 7, 10, 14, 7, 13, 14, 7, 12, 13, 7, 20, 7, 8, 9, 14, 13, 5, 7, 7, 17, 8, 5, 9, 5, 8, 28, 10, 6, 13, 11, 3, 11, 10, 8, 5],
                    sizes: [320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [226, 310, 385, 460, 530, 595, 680, 905, 1030]
                },
                "usa-canada": {
                    abbr: "usacan",
                    cs: [13, 22, 10, 9, 22, 26, 7, 28, 23, 3, 30, 6, 19, 6, 21, 8, 5, 12, 5, 6, 5, 9, 7, 5, 10, 6, 5, 4, 4, 7, 6, 7, 9, 5, 10, 11, 5, 8, 6, 4, 11, 6, 3, 4, 11, 10, 4, 5, 4, 10, 5, 4, 8, 4, 6, 18, 5, 6, 7, 6, 5, 7, 8, 5, 32, 6, 6, 6, 5, 2, 5],
                    sizes: [320, 430, 540, 650, 750, 850, 960, 1280, 1450],
                    heights: [330, 445, 555, 670, 775, 880, 995, 1325, 1500]
                },
            },
            doMaps = function(T, g) {
                var h = "#" + T.id,
                mapContainer = $(h),
                mapList = mapContainer.find("UL").eq(0),
                mapName = $(mapList).attr("class").split(" ")[0],
                getMapSize = function() {
                    var r = parseInt(s.size),
                    f = s.fitHeight,
                    mapSizes = MAPS[mapName].sizes,
                    mapHeights = MAPS[mapName].heights;
                    if ((!$.isEmptyObject(s.responsive) || s.responsive.toString() === "auto" || f) && !ie) {
                        if (s.responsive.toString() === "auto" || f) {
                            var a = document.getElementById(h.slice(1)),
                            topOffset = M.getTopOffset(a),
                            parent = mapContainer.parent();
                            for (var i = 0; i < mapSizes.length; i++) {
                                if (f) {
                                    mapContainer.css({
                                        height: mapHeights[i]
                                    })
                                } else {
                                    mapContainer.css({
                                        height: "auto"
                                    })
                                }
                                var b = (i + 1),
                                parentW = parent.outerWidth(),
                                parentH = (parent.outerHeight() >= mapHeights[0] ? parent.outerHeight() : mapHeights[0]),
                                fitH = (parentH <= mapHeights[i] && parentH >= mapHeights[0] ? 1 : 0),
                                fitS = ((bH - topOffset) <= mapHeights[b] && topOffset < bH ? 1 : 0),
                                fitW = (parentW <= mapSizes[b] && mapSizes[i] < r ? 1 : 0);
                                if (fitW || f && (fitH || fitS)) {
                                    r = mapSizes[i];
                                    break
                                }
                            }
                        }
                        if (!$.isEmptyObject(s.responsive)) {
                            for (var c in s.responsive) {
                                if (bW <= c) {
                                    if ($.inArray(parseInt(s.responsive[c]), mapSizes) == -1) {
                                        r = 0;
                                        break
                                    } else {
                                        r = s.responsive[c];
                                        break
                                    }
                                }
                            }
                        }
                    }
                    return r
                },
                li = mapList.find("LI"),
                mapStyles = ["default", "blue", "dark", "vintage", "custom"],
                pinsContainer = $(s.pins.pinsId),
                pin = pinsContainer.find("LI"),
                countClicks = 0,
                clicksLimit = false,
                cli = "",
                tooltips = s.tooltips.toString(),
                DonClick = (s.pins.tooltipOnClick.toString() === "false" ? false : true),
                clickableRegions = s.pins.clickableRegions.toString(),
                aa = (s.activateOnLoad ? s.activateOnLoad : mapContainer.find(".active-region")),
                M = {
                    init: function() {
                        var a = getMapSize();
                        M.clearMap();
                        mapContainer.addClass("cssmap-container cssmap-" + a);
                        if (s.mapStyle && s.mapStyle !== "default") {
                            mapList.addClass("cssmap-" + s.mapStyle)
                        }
                        var b = mapList.css("background-image").replace(/^url\("?([^\"\))]+)"?\)$/i, "$1");
                        this.loader(b)
                    },
                    loader: function(a) {
                        var b = new Image(),
                        preloader = $("<span />", {
                            "class": "cssmap-loader",
                            "text": s.loadingText
                        }).appendTo(mapContainer),
                        loaderPosition = {
                            left: Math.round(mapContainer.outerWidth() / 2) + "px",
                            marginLeft: Math.round(preloader.outerWidth() / -2) + "px",
                            marginTop: Math.round(preloader.outerHeight() / -2) + "px",
                            top: Math.round(mapContainer.outerHeight() / 2) + "px"
                        };
                        preloader.css(loaderPosition);
                        mapList.addClass("cssmap");
                        $(b).on({
                            load: function() {
                                if (!resized) {
                                    if (s.cities && !ie) {
                                        mapContainer.append("<span class=\"cssmap-cities " + mapName + "-cities cssmap-" + s.mapStyle + "\" />")
                                    }
                                    if (clickableRegions !== "false") {
                                        M.regions.init()
                                    }
                                    if (s.agentsList.enable.toString() !== "false") {
                                        M.agentslist.init()
                                    }
                                    if (s.multipleClick.enable.toString() !== "false" && !s.multipleClick.hideSearchLink) {
                                        M.searchButton();
                                        M.selectRegion.multiple()
                                    }
                                    if (s.navigation.enable.toString() !== "false" && !s.multipleClick.enable) {
                                        M.navigation.init()
                                    }
                                    if (s.formSupport.enable.toString() !== "false") {
                                        M.formSupport.init()
                                    }
                                    if (s.authorInfo.toString() !== "false") {
                                        mapContainer.after(CSSMapSignature)
                                    }
                                }
                                if (s.visibleList.enable.toString() !== "false") {
                                    M.visibleList.init()
                                }
                                if (s.pins.enable.toString() !== "false") {
                                    M.pins.init()
                                }
                                preloader.fadeOut();
                                s.onLoad(mapContainer)
                            },
                            error: function() {
                                M.clearMap();
                                if (!s.mobileSupport) {
                                    mapContainer.prepend(CSSMapError("Map image cannot be found!<br/><br/>- incorrect path: " + a))
                                }
                                return false
                            }
                        }).attr("src", a)
                    },
                    regions: {
                        init: function() {
                            var b = M.regions;
                            b.hideTooltips();
                            li.each(function(a) {
                                var t = $(this),
                                lC = (t.attr("class") ? t.attr("class").split(" ")[0] : null),
                                lA = t.children("A").eq(0),
                                lH = $(lA).attr("href");
                                if (typeof lH === "undefined" || lC === null || lH.length <= 1) {
                                    $(t).remove()
                                }
                                if (s.visibleList.enable.toString() !== "false") {
                                    b.copyList($(t), lC, lA, lH, a)
                                }
                                b.createSpans($(t), lC);
                                M.selectRegion.init($(t), lC, lA)
                            });
                            if (s.visibleList.enable.toString() !== "false") {
                                b.createList(cli);
                                M.selectRegion.initVisibleList()
                            }
                            b.autoSelectRegion();
                            M.formSupport.inputFn()
                        },
                        createSpans: function(l, a) {
                            var m = "<span class=\"m\">",
                            cs = MAPS[mapName].cs,
                            abbr = MAPS[mapName].abbr,
                            lA = l.children("A").eq(0);
                            if (tooltips !== "visible" && tooltips.split("-")[0] != "floating") {
                                var b = $("<span class=\"tooltip-arrow\" />").appendTo(lA)
                            }
                            for (var i = 0; i < cs.length; i++) {
                                var c = i + 1;
                                if (a == abbr + c) {
                                    for (var s = 1; s < cs[i]; s++) {
                                        m += "<span class=\"s" + s + "\" />"
                                    }
                                    break
                                }
                            }
                            m += "</span>";
                            l.prepend(m).append("<span class=\"bg\" />")
                        },
                        showTooltip: function(l) {
                            var a = mapList.find(l).children("A")[0];
                            if (tooltips == "true" || tooltips == "sticky" || tooltips == "visible") {
                                var b = mapList.outerWidth(),
                                aMT = parseInt($(a).outerHeight() * -1) - s.tooltipArrowHeight,
                                aMTm = parseInt($(a).outerHeight() / -2),
                                aML = parseInt($(a).outerWidth() / -2),
                                aL = $(a).position().left,
                                aT = $(a).position().top;
                                if ((aML * -1) > aL) {
                                    $(a).addClass("tooltip-left").css("left", 0);
                                    aML = 0
                                }
                                if ((aML * -1) + aL > b) {
                                    $(a).addClass("tooltip-right");
                                    aML = 0
                                }
                                if ((aMT * -1) > aT) {
                                    $(a).addClass("tooltip-top");
                                    aMT = s.tooltipArrowHeight
                                }
                                if ($(a).hasClass("tooltip-middle")) {
                                    aMT = aMTm
                                }
                                a.style.clip = "auto";
                                a.style.marginLeft = aML + "px";
                                if (tooltips == "visible") {
                                    a.style.marginTop = aMTm + "px"
                                } else {
                                    a.style.marginTop = aMT + "px"
                                }
                            } else if (tooltips.split("-")[0] == "floating") {
                                var c = $(a).html(),
                                floatingTooltip = $("<div />", {
                                    "id": "cssmap-tooltip",
                                    "class": "cssmap-tooltip-content cssmap-" + s.mapStyle,
                                    "html": c
                                }).appendTo("BODY")
                            }
                        },
                        hideTooltips: function() {
                            var a = mapList.find("a");
                            $("#cssmap-tooltip").remove();
                            for (var i = 0; i < a.length; i++) {
                                var b = a[i],
                                tTmL = Math.round($(b).outerWidth() / -2),
                                tTmT = Math.round($(b).outerHeight() / -2);
                                if (tooltips == "visible") {
                                    b.style.marginTop = tTmT + "px";
                                    b.style.marginLeft = tTmL + "px"
                                } else {
                                    b.style.clip = "rect(1px 1px 1px 1px)";
                                    b.style.clip = "rect(1px, 1px, 1px, 1px)"
                                }
                            }
                        },
                        copyList: function(l, a, b, c, d) {
                            var e = b.html(),
                            columns = parseInt(s.visibleList.columns),
                            items = Math.round((li.length / columns));
                            if (typeof c !== "undefined" && c.length >= 2 && $.inArray(a, s.visibleList.hideItems) == -1) {
                                cli += "  <li class=\"" + a + "\"><a href=\"" + c + "\">" + e + "</a></li>\n"
                            }
                            for (var i = 1; i < columns; i++) {
                                if (Math.round((items * i) == (d + 1))) {
                                    cli += " </ul>\n <ul class=\"cssmap-visible-list cssmap-visible-list-column\">\n";
                                    break
                                }
                            }
                        },
                        createList: function(a) {
                            var b = "<div id=\"" + h.slice(1) + "-visible-list\" class=\"cssmap-visible-list-container\">\n <ul class=\"cssmap-visible-list";
                            if (parseInt(s.visibleList.columns) > 1) {
                                b += " cssmap-visible-list-column"
                            }
                            b += "\">" + a + " </ul>\n</div>";
                            if (s.visibleList.containerId && $(s.visibleList.containerId).length) {
                                $(s.visibleList.containerId).html(b).css({
                                    "overflow": "hidden"
                                })
                            } else {
                                $(mapList).after(b)
                            }
                        },
                        autoSelectRegion: function() {
                            if (aa.length) {
                                for (var i = 0; i < aa.length; i++) {
                                    M.selectRegion.activated($("." + aa[i]))
                                }
                            }
                        }
                    },
                    selectRegion: {
                        init: function(l, b, d) {
                            var f = M.selectRegion,
                            lC = $(h).find("." + b).eq(0),
                            lMapSpan = $(lC).children("SPAN").eq(0),
                            code = null;
                            f.autoSelect(d);
                            lMapSpan.on({
                                mouseenter: function() {
                                    f.onHover($(lC))
                                },
                                mouseleave: function() {
                                    f.unHover($(lC))
                                },
                                mousemove: function(c) {
                                    if (tooltips.split("-")[0] == "floating") {
                                        f.onMouseMove($(lC), c)
                                    }
                                },
                                touchmove: function(c) {
                                    if (tooltips.split("-")[0] == "floating" && s.tapOnce.toString() !== "false") {
                                        f.onMouseMove($(lC), c)
                                    }
                                },
                                touchend: function(a) {
                                    if (s.tapOnce.toString() !== "false") {
                                        f.clicked($(lC));
                                        if (a.preventDefault()) {
                                            a.preventDefault()
                                        } else {
                                            return false
                                        }
                                    }
                                },
                                click: function(a) {
                                    f.clicked($(lC));
                                    if (a.preventDefault()) {
                                        a.preventDefault()
                                    } else {
                                        return false
                                    }
                                }
                            });
                            $(d).on({
                                focus: function() {
                                    f.onHover($(lC))
                                },
                                blur: function() {
                                    f.unHover($(lC))
                                },
                                keypress: function(e) {
                                    code = (e.keyCode ? e.keyCode : e.which);
                                    if (code === 13) {
                                        f.clicked($(lC))
                                    }
                                },
                                click: function(a) {
                                    f.clicked($(lC));
                                    if (a.preventDefault()) {
                                        a.preventDefault()
                                    } else {
                                        return false
                                    }
                                }
                            })
                        },
                        initVisibleList: function() {
                            var c = M.selectRegion,
                            vLi = $(h + " .cssmap-visible-list").find("LI"),
                            code = null;
                            if (s.visibleList.containerId && s.visibleList.containerId != "#") {
                                vLi = $(s.visibleList.containerId + " .cssmap-visible-list").find("LI")
                            }
                            vLi.each(function() {
                                var b = $(this).children("A"),
                                vC = h + " ." + $(this).attr("class");
                                b.on({
                                    mouseenter: function() {
                                        c.onHover($(vC))
                                    },
                                    mouseleave: function() {
                                        c.unHover($(vC))
                                    },
                                    focus: function() {
                                        c.onHover($(vC))
                                    },
                                    blur: function() {
                                        c.unHover($(vC))
                                    },
                                    keypress: function(e) {
                                        code = (e.keyCode ? e.keyCode : e.which);
                                        if (code === 13) {
                                            c.clicked($(vC))
                                        }
                                    },
                                    click: function(a) {
                                        c.clicked($(vC));
                                        if (a.preventDefault()) {
                                            a.preventDefault()
                                        } else {
                                            return false
                                        }
                                    }
                                })
                            })
                        },
                        onHover: function(e) {
                            var a = e.children("A").eq(0).attr("href");
                            M.regions.hideTooltips();
                            M.regions.showTooltip(e);
                            e.addClass("focus");
                            s.onHover(e);
                            if (s.agentsList.agentsListOnHover.toString() !== "false") {
                                M.agentslist.showAgent(a)
                            }
                        },
                        onMouseMove: function(e, c) {
                            var a = $("#cssmap-tooltip").eq(0),
                            mT = parseInt(s.tooltipArrowHeight),
                            oL = 10,
                            oT = 15 + mT,
                            tH = $(a).outerHeight(),
                            tW = $(a).outerWidth(),
                            bT = $(w).scrollTop(),
                            pT = c.pageY - tH - mT,
                            pL = c.pageX - (tW / 2);
                            if (mT < 3) {
                                mT = 3
                            }
                            switch (tooltips) {
                                case "floating-left":
                                case "floating-left-top":
                                case "floating-top-left":
                                if (c.clientX - tW <= oL) {
                                    pL = c.pageX + oL
                                } else {
                                    pL = c.pageX - tW - oL
                                }
                                break;
                                case "floating-right":
                                case "floating-right-top":
                                case "floating-top-right":
                                if (bW <= c.clientX + tW + oL) {
                                    pL = c.pageX - tW - oL
                                } else {
                                    pL = c.pageX + oL
                                }
                                break;
                                case "floating-middle":
                                case "floating-middle-right":
                                case "floating-right-middle":
                                if (bW <= c.clientX + tW + oL) {
                                    pL = c.pageX - tW - oL
                                } else {
                                    pL = c.pageX + oL
                                }
                                if (bT >= c.pageY - (tH / 2) - mT) {
                                    pT = c.pageY + oT - mT
                                } else if (c.clientY + (tH / 2) >= bH) {
                                    pT = c.pageY - tH - mT
                                } else {
                                    pT = c.pageY - (tH / 2)
                                }
                                break;
                                case "floating-middle-left":
                                case "floating-left-middle":
                                if (c.clientX - tW <= oL) {
                                    pL = c.pageX + oL
                                } else {
                                    pL = c.pageX - tW - oL
                                }
                                if (bT >= c.pageY - (tH / 2) - mT) {
                                    pT = c.pageY + oT - mT
                                } else if (c.clientY + (tH / 2) >= bH) {
                                    pT = c.pageY - tH - mT
                                } else {
                                    pT = c.pageY - (tH / 2)
                                }
                                break;
                                case "floating-bottom-left":
                                case "floating-left-bottom":
                                if (c.clientX - tW < oL) {
                                    pL = c.pageX + oL
                                } else {
                                    pL = c.pageX - tW - oL
                                }
                                pT = c.pageY + oT;
                                break;
                                case "floating-bottom":
                                case "floating-bottom-center":
                                case "floating-center-bottom":
                                if (c.clientX - (tW / 2) + oL <= oL) {
                                    pL = c.pageX + oL
                                } else if (bW <= c.clientX + (tW / 2)) {
                                    pL = c.pageX - tW - oL
                                } else {
                                    pL = c.pageX - (tW / 2)
                                }
                                pT = c.pageY + oT;
                                break;
                                case "floating-bottom-right":
                                case "floating-right-bottom":
                                if (bW <= c.clientX + tW + oL) {
                                    pL = c.pageX - tW - oL
                                } else {
                                    pL = c.pageX + oL
                                }
                                pT = c.pageY + oT;
                                break;
                                default:
                                if (c.clientX - (tW / 2) + oL <= oL) {
                                    pL = c.pageX + oL
                                } else if (bW <= c.clientX + (tW / 2)) {
                                    pL = c.pageX - tW - oL
                                } else {
                                    pL = c.pageX - (tW / 2)
                                }
                            }
                            if (bT >= c.pageY - tH - mT) {
                                pT = c.pageY + oT
                            }
                            if (c.clientY + tH + oT >= bH) {
                                pT = c.pageY - tH - mT
                            }
                            a.css({
                                "left": pL + "px",
                                "top": pT + "px"
                            })
                        },
                        unHover: function(e) {
                            var b = e.children("a").eq(0).attr("href");
                            M.regions.hideTooltips();
                            e.removeClass("focus");
                            if (s.agentsList.agentsListOnHover.toString() !== "false") {
                                M.agentslist.hideAgents(b);
                                $(mapList).find(".active-region").each(function() {
                                    var a = $(this).children("a").eq(0).attr("href");
                                    M.agentslist.showAgent(a)
                                })
                            }
                            s.unHover(e)
                        },
                        activated: function(e) {
                            var a = s.multipleClick.clicksLimitAlert.split(" %d ")[0],
                            clicksLimitAlert2 = s.multipleClick.clicksLimitAlert.split(" %d ")[1],
                            r = "",
                            lClass = e.attr("class").split(" ")[0],
                            lH = e.children("A").eq(0).attr("href"),
                            agentsListContainer = $(s.agentsList.agentsListId),
                            selectField = $(s.formSupport.selectId);
                            if (s.multipleClick.clicksLimit === 0 || !s.multipleClick.enable) {
                                s.multipleClick.clicksLimit = Infinity
                            }
                            if (s.multipleClick.clicksLimit == 1) {
                                r = clicksLimitAlert2.split(" || ")[0]
                            } else {
                                r = clicksLimitAlert2.split(" || ")[1]
                            }
                            if (e.hasClass("active-region")) {
                                e.removeClass("active-region");
                                if (selectField.length) {
                                    if (!s.formSupport.selectLabel) {
                                        selectField.val("")
                                    } else {
                                        selectField.val(0)
                                    }
                                }
                                countClicks--;
                                clicksLimit = false
                            } else {
                                if (countClicks < s.multipleClick.clicksLimit) {
                                    if (!s.multipleClick.enable && $.inArray(lClass, aa) == -1) {
                                        mapContainer.find(".active-region").removeClass("active-region")
                                    }
                                    if (selectField.length) {
                                        $(s.formSupport.selectId + " option:selected").removeAttr("selected");
                                        selectField.val(lClass)
                                    }
                                    countClicks++;
                                    e.addClass("active-region")
                                } else {
                                    alert(a + " " + s.multipleClick.clicksLimit + " " + r);
                                    clicksLimit = true
                                }
                            }
                            if (agentsListContainer.length && lH.charAt(0) === "#") {
                                M.agentslist.init()
                            }
                        },
                        clicked: function(e) {
                            if (typeof e === "undefined" || e === null) {
                                return false
                            }
                            var a = e.children("A").eq(0),
                            lH = a.attr("href"),
                            target = a.attr("target"),
                            rel = a.attr("rel");
                            if (s.disableClicks) {
                                return false
                            }
                            M.selectRegion.activated(e);
                            M.selectRegion.multiple();
                            M.formSupport.inputFn();
                            if (e.hasClass("active-region")) {
                                s.onClick(e)
                            } else {
                                s.onSecondClick(e);
                                M.selectRegion.removeHash()
                            }
                            aa = [];
                            if (clicksLimit === false) {
                                if (typeof target !== "undefined" && target !== false) {
                                    w.open(lH, target)
                                } else if (lH !== "undefined" && lH.charAt(0) === "#") {
                                    if (s.agentsList.enable.toString() !== "false" || s.multipleClick.enable.toString() !== "false") {
                                        return false
                                    }
                                } else {
                                    return false
                                }
                            }
                        },
                        multiple: function() {
                            var a = M.getActiveRegions(),
                            sb = mapContainer.find(".cssmap-search-link"),
                            newLink = s.multipleClick.searchUrl,
                            v = "";
                            for (var i = 0; i < a.length; i++) {
                                var b = $("." + a[i]).children("A").eq(0),
                                lH = b.attr("href"),
                                nlH;
                                if (lH !== "undefined" && lH.charAt(0) == "#") {
                                    nlH = lH.slice(1)
                                } else if (/&/i.test(lH)) {
                                    nlH = lH.slice(lH.indexOf("?") + (s.multipleClick.searchLinkVar.length) + 2, lH.indexOf("&"))
                                } else {
                                    nlH = lH.slice(lH.indexOf("?") + (s.multipleClick.searchLinkVar.length) + 2)
                                }
                                if (i > 0) {
                                    v += s.multipleClick.separator
                                }
                                v += nlH
                            }
                            if (a.length) {
                                newLink += "?" + s.multipleClick.searchLinkVar + "=" + v
                            }
                            sb.attr("href", newLink)
                        },
                        autoSelect: function(e) {
                            var a = e.attr("href"),
                            wH = wHash,
                            li = e.parent("LI");
                            if (a !== "undefined" && a.charAt(0) == "#" && a == wH) {
                                var b = li.attr("class").split(" ")[0];
                                aa[b];
                                li.addClass("active-region");
                                return false
                            }
                        },
                        removeHash: function() {
                            history.pushState("", d.title, w.location.pathname + w.location.search)
                        }
                    },
                    searchButton: function() {
                        var a = $("<a />", {
                            "href": s.multipleClick.searchUrl,
                            "class": "cssmap-search-link",
                            "text": s.multipleClick.searchLink
                        });
                        $(mapList).after(a)
                    },
                    visibleList: {
                        init: function() {
                            var a = $(h + "-visible-list"),
                            VI = a.find("UL");
                            M.visibleList.listSize(VI);
                            if (!s.visibleList.containerId || !$(s.visibleList.containerId).length) {
                                M.visibleList.setPosition(a)
                            }
                        },
                        listSize: function(l) {
                            var a = parseInt(s.visibleList.columnWidth),
                            cGap = parseInt(s.visibleList.columnsGap),
                            cNum = parseInt(s.visibleList.columns),
                            vListParentWidth = ($(s.visibleList.containerId).length ? $(s.visibleList.containerId).outerWidth() : getMapSize()),
                            vListWidth = Math.round((vListParentWidth / cNum) - cGap);
                            if (a > 0) {
                                vListWidth = Math.round(a + cGap)
                            }
                            var b = Math.round(cGap / 2),
                            listCSS = {
                                float: "left",
                                marginLeft: b + "px",
                                marginRight: b + "px",
                                width: vListWidth + "px"
                            };
                            l.each(function() {
                                $(this).css(listCSS)
                            })
                        },
                        setPosition: function(e) {
                            var b = function() {
                                var a = getMapSize(),
                                nMw = 0,
                                mapsParentWidth = mapContainer.parent().outerWidth(),
                                cWidth = parseInt(s.visibleList.columnWidth),
                                cNum = parseInt(s.visibleList.columns),
                                cGap = parseInt(s.visibleList.columnsGap * 2),
                                sumWidth = Math.round(2 + (cWidth + cGap) * cNum);
                                switch (s.visibleList.listPosition) {
                                    case "left":
                                    case "right":
                                    if (Math.round(a + sumWidth) >= mapsParentWidth) {
                                        nMw = mapsParentWidth
                                    } else {
                                        nMw = Math.round(a + sumWidth)
                                    }
                                    break;
                                    default:
                                    nMw = a;
                                    break
                                }
                                return nMw
                            };
                            switch (s.visibleList.listPosition) {
                                case "left":
                                var c = {
                                    "clear": "left",
                                    "float": "left"
                                },
                                mapListCSS = {
                                    "float": "right"
                                };
                                mapContainer.find(".cssmap-cities").css({
                                    "left": "auto",
                                    "right": 0
                                });
                                break;
                                case "right":
                                var c = {
                                    "clear": "right",
                                    "float": "right"
                                },
                                mapListCSS = {
                                    "float": "left"
                                };
                                break;
                                default:
                                var c = {
                                    "clear": "both"
                                },
                                mapListCSS = {};
                                break
                            }
                            mapContainer.css({
                                height: "auto",
                                width: b() + "px"
                            });
                            mapList.css(mapListCSS);
                            e.css(c)
                        }
                    },
                    agentslist: {
                        init: function() {
                            var a = $(s.agentsList.agentsListId),
                            activeRegions = M.getActiveRegions();
                            if (a.length) {
                                $(s.agentsList.agentsListId).find("LI").hide();
                                a.find("UL").css({
                                    listStyleType: "none"
                                })
                            }
                            if (activeRegions.length) {
                                for (var i = 0; i < activeRegions.length; i++) {
                                    var b = $("." + activeRegions[i]).children("A").eq(0).attr("href");
                                    M.agentslist.showAgent(b)
                                }
                            }
                            if (aa.length) {
                                for (var c = 0; c < aa.length; c++) {
                                    var d = $("." + aa[c]).children("A").eq(0).attr("href");
                                    M.agentslist.showAgent(d)
                                }
                            }
                        },
                        showAgent: function(a) {
                            if (!s.multipleClick.enable) {
                                $(s.agentsList.agentsListId).find("LI").hide()
                            }
                            if (!s.agentsList.agentsListOnHover) {
                                $(a + "," + a + " LI").fadeIn(parseInt(s.agentsList.agentsListSpeed))
                            } else {
                                $(a + "," + a + " LI").show()
                            }
                        },
                        hideAgents: function(a) {
                            if (!s.agentsList.agentsListOnHover) {
                                $(a + "," + a + " LI").fadeOut(parseInt(s.agentsList.agentsListSpeed))
                            } else {
                                $(a + "," + a + " LI").hide()
                            }
                        }
                    },
                    formSupport: {
                        init: function() {
                            M.formSupport.createOptions();
                            M.formSupport.selectFn()
                        },
                        createOptions: function() {
                            var a = "";
                            if (s.formSupport.selectLabel) {
                                a += "<option value=\"0\">" + s.formSupport.selectLabel + "</option>"
                            }
                            li.each(function() {
                                var A = $(this).children("A").eq(0),
                                optVal = this.className.split(" ")[0],
                                optText = A.text(),
                                regionHref = A.attr("href");
                                a += "<option value=\"" + optVal + "\"";
                                if (regionHref === wHash) {
                                    a += " selected"
                                }
                                a += ">" + optText + "</option>";
                                A.attr("rel", "nofollow")
                            });
                            $(s.formSupport.selectId).html(a)
                        },
                        selectFn: function() {
                            var a = $(s.formSupport.selectId);
                            if (a.length) {
                                a.on("change", function() {
                                    $(s.formSupport.selectId + " option:selected").each(function() {
                                        M.formSupport.formActivateRegion($(this).val());
                                        M.formSupport.inputFn()
                                    })
                                })
                            }
                        },
                        inputFn: function() {
                            var a = $(s.formSupport.inputId),
                            activeRegions = M.getActiveRegions(),
                            v = "";
                            if (a.length) {
                                switch (s.formSupport.value) {
                                    case "name":
                                    for (var i = 0; i < activeRegions.length; i++) {
                                        if (i > 0) {
                                            v += s.multipleClick.separator
                                        }
                                        v += $("." + activeRegions[i]).children("A").eq(0).text()
                                    }
                                    break;
                                    case "slug":
                                    for (var b = 0; b < activeRegions.length; b++) {
                                        var c = $("." + activeRegions[b]).children("A").eq(0).attr("href");
                                        if (b > 0) {
                                            v += s.multipleClick.separator
                                        }
                                        if (c !== undefined && c.charAt(0) === "#") {
                                            v += c.slice(1)
                                        } else {
                                            v += c
                                        }
                                    }
                                    break;
                                    default:
                                    v = activeRegions.join(s.multipleClick.separator);
                                    break
                                }
                                a.val(v)
                            }
                        },
                        formActivateRegion: function(a) {
                            mapList.find(".active-region").removeClass("active-region");
                            if (a) {
                                mapList.find("." + a).addClass("active-region");
                                if ($(s.agentsList.agentsListId).length) {
                                    M.agentslist.init()
                                }
                            }
                        }
                    },
                    navigation: {
                        init: function() {
                            $(mapList).after(this.createNav());
                            this.navFunctions();
                            if (s.fitHeight) {
                                $(mapContainer).css({
                                    height: mapContainer.outerHeight() + mapContainer.find(".cssmap-navigation").outerHeight() + "px"
                                })
                            }
                        },
                        getClasses: function() {
                            var a = [];
                            for (var i = 0; i < li.length; i++) {
                                var b = li[i].className.split(" ")[0];
                                a.push(b)
                            }
                            return a
                        },
                        createNav: function() {
                            var a = document.createElement("DIV"),
                            getNavNext = s.navigation.next.replace(/<a\b[^>]*>(.*?)<\/a>/i, ""),
                            getNavPrev = s.navigation.prev.replace(/<a\b[^>]*>(.*?)<\/a>/i, ""),
                            navNext = "<li class=\"cssmap-nav-next\"><a href=\"#next-region\">" + (getNavNext ? getNavNext : "Next &#187;") + "</a></li>",
                            navPrev = "<li class=\"cssmap-nav-prev\"><a href=\"#previous-region\">" + (getNavPrev ? getNavPrev : "&#171; Previous") + "</a></li>",
                            navSeparator = (s.navigation.separator ? "<li class=\"cssmap-nav-separator\">" + s.navigation.separator + "</li>" : "");
                            a.id = h.slice(1) + "-navigation";
                            a.className = "cssmap-navigation";
                            if (s.navigation.label) {
                                a.innerHTML += "<h5 class=\"cssmap-nav-label\">" + s.navigation.label + "</h5>"
                            }
                            if (s.navigation.description) {
                                a.innerHTML += "<p class=\"cssmap-nav-description\">" + s.navigation.description + "</p>"
                            }
                            a.innerHTML += "<ul class=\"cssmap-nav-list\">" + navPrev + navSeparator + navNext + "</ul>";
                            return a
                        },
                        navFunctions: function() {
                            var b = document.getElementById(h.slice(1) + "-navigation"),
                            getNavLinks = b.getElementsByTagName("A");
                            $(getNavLinks).on({
                                keypress: function(e) {
                                    code = (e.keyCode ? e.keyCode : e.which);
                                    if (code === 13) {
                                        M.selectRegion.clicked(M.navigation.getRegionToActivate(this))
                                    }
                                },
                                click: function(a) {
                                    M.selectRegion.clicked(M.navigation.getRegionToActivate(this));
                                    if (a.preventDefault()) {
                                        a.preventDefault()
                                    } else {
                                        return false
                                    }
                                }
                            })
                        },
                        getRegionToActivate: function(e) {
                            var a = M.navigation.getClasses(),
                            regions = M.getActiveRegions()[0],
                            //linkHref = e.hash,
                            returnClass;
                            if (a.indexOf(regions) !== -1) {
                                switch (linkHref) {
                                    case "#next-region":
                                    if (s.navigation.loop && typeof a[a.indexOf(regions) + 1] === "undefined") {
                                        returnClass = a[0]
                                    } else {
                                        returnClass = a[a.indexOf(regions) + 1]
                                    }
                                    break;
                                    case "#previous-region":
                                    if (s.navigation.loop && typeof a[a.indexOf(regions) - 1] === "undefined") {
                                        returnClass = a[a.length - 1]
                                    } else {
                                        returnClass = a[a.indexOf(regions) - 1]
                                    }
                                    break
                                }
                            } else {
                                switch (linkHref) {
                                    case "#next-region":
                                    returnClass = a[0];
                                    break;
                                    case "#previous-region":
                                    returnClass = a[a.length - 1];
                                    break
                                }
                            }
                            if (typeof returnClass !== "undefined" && returnClass !== null) {
                                return $("." + returnClass)
                            }
                        }
                    },
                    pins: {
                        init: function() {
                            var c = mapContainer.position().top,
                            mapY = function() {
                                var a, mapR, mapMargin = "auto";
                                switch (s.visibleList.listPosition) {
                                    case "left":
                                    a = "auto";
                                    mapR = Math.round(mapList.offset().left) + "px";
                                    break;
                                    case "right":
                                    a = Math.round(mapList.offset().left) + "px";
                                    mapR = "auto";
                                    break;
                                    default:
                                    a = Math.round(mapList.offset().left) + "px";
                                    mapR = "auto";
                                    break
                                }
                                return {
                                    left: a,
                                    right: mapR
                                }
                            },
                            mapW = $(mapList).outerWidth(),
                            mapH = $(mapList).outerHeight(),
                            pinsContainerCSS = {
                                height: mapH + "px",
                                left: mapY().left,
                                position: "absolute",
                                right: mapY().right,
                                top: c + "px",
                                width: mapW + "px"
                            };
                            pinsContainer.addClass("cssmap-markers-container");
                            pinsContainer.css(pinsContainerCSS);
                            pin.each(function() {
                                var t = $(this);
                                M.pins.pinContent(t);
                                var m = t.find("." + s.pins.markerClass).eq(0),
                                pC = t.find("." + s.pins.pinTooltipClass).eq(0),
                                pTlink = pC.find("A"),
                                mHref = m.attr("href"),
                                code = null,
                                coords = t.attr("data-cssmap-coords").split(","),
                                cMargin = function(a) {
                                    var b, ct;
                                    switch (a) {
                                        case "210":
                                        b = 7;
                                        ct = 7;
                                        break;
                                        case "200":
                                        b = 50;
                                        ct = 15;
                                        break;
                                        case "250":
                                        b = 5;
                                        ct = 5;
                                        break;
                                        case "300":
                                        b = 100;
                                        ct = 20;
                                        break;
                                        case "320":
                                        b = 10;
                                        ct = 10;
                                        break;
                                        case "350":
                                        b = 85;
                                        ct = 20;
                                        break;
                                        case "400":
                                        b = 70;
                                        ct = 25;
                                        break;
                                        case "430":
                                        case "850":
                                        b = 20;
                                        ct = 20;
                                        break;
                                        case "450":
                                        b = 50;
                                        ct = 25;
                                        break;
                                        case "540":
                                        case "750":
                                        b = 22;
                                        ct = 22;
                                        break;
                                        case "550":
                                        b = 85;
                                        ct = 25;
                                        break;
                                        case "650":
                                        b = 25;
                                        ct = 25;
                                        break;
                                        case "1280":
                                        b = 40;
                                        ct = 40;
                                        break;
                                        case "1450":
                                        b = 50;
                                        ct = 50;
                                        break;
                                        default:
                                        b = 30;
                                        ct = 30;
                                        break
                                    }
                                    return {
                                        l: b,
                                        t: ct
                                    }
                                },
                                x = (s.pins.mapSize > 0 && s.pins.mapSize !== getMapSize() ? Math.round((coords[0] - cMargin(getMapSize()).l + cMargin(s.pins.mapSize).l) * getMapSize() / s.pins.mapSize) : parseInt(coords[0])),
                                y = (s.pins.mapSize > 0 && s.pins.mapSize !== getMapSize() ? Math.round((coords[1] - cMargin(getMapSize()).t + cMargin(s.pins.mapSize).t) * getMapSize() / s.pins.mapSize) : parseInt(coords[1])),
                                mW = m.outerWidth(),
                                mL = Math.round(mW / -2),
                                mH = parseInt(m.outerHeight()),
                                pCH = pC.outerHeight(),
                                pCW = pC.outerWidth(),
                                pCL = Math.round(pCW / -2),
                                mTop = function() {
                                    var a;
                                    switch (s.pins.markerPosition) {
                                        case "middle":
                                        a = y - (mH / 2);
                                        break;
                                        case "bottom":
                                        a = y;
                                        break;
                                        default:
                                        a = y - mH;
                                        break
                                    }
                                    return a
                                },
                                pCTop = function() {
                                    var a;
                                    switch (s.pins.tooltipPosition) {
                                        case "hidden":
                                        a = "-9999em";
                                        break;
                                        case "bottom":
                                        a = mTop() + mH;
                                        break;
                                        default:
                                        a = mTop() - pCH;
                                        break
                                    }
                                    return a
                                },
                                mpos = {
                                    left: x + "px",
                                    marginLeft: mL + "px",
                                    position: "absolute",
                                    textAlign: "center",
                                    top: mTop() + "px",
                                    zIndex: 200
                                },
                                pCpos = {
                                    display: "block",
                                    left: x + "px",
                                    marginLeft: pCL + "px",
                                    marginTop: "-9999em",
                                    position: "absolute",
                                    top: pCTop() + "px",
                                    zIndex: 201
                                };
                                m.css(mpos);
                                pC.css(pCpos);
                                t.on({
                                    mouseenter: function() {
                                        if (!DonClick) {
                                            M.pins.pinOpen(t, m, pC)
                                        } else {
                                            M.pins.pinClose(t, m, pC)
                                        }
                                    },
                                    mouseleave: function() {
                                        if (!DonClick) {
                                            M.pins.pinClose(t, m, pC)
                                        }
                                    },
                                    focus: function() {
                                        if (!DonClick) {
                                            M.pins.pinOpen(t, m, pC)
                                        } else {
                                            M.pins.pinClose(t, m, pC)
                                        }
                                    },
                                    blur: function() {
                                        if (!DonClick) {
                                            M.pins.pinClose(t, m, pC)
                                        }
                                    },
                                    keypress: function(e) {
                                        code = (e.keyCode ? e.keyCode : e.which);
                                        if (code === 13) {
                                            if (DonClick) {
                                                if (t.hasClass("hide-tooltip")) {
                                                    M.pins.pinClose(t, m, pC)
                                                } else {
                                                    M.pins.pinOpen(t, m, pC)
                                                }
                                                if (event.preventDefault()) {
                                                    event.preventDefault()
                                                } else {
                                                    return false
                                                }
                                            }
                                            if (mHref !== undefined && mHref.charAt(0) === "#") {
                                                if (event.preventDefault()) {
                                                    event.preventDefault()
                                                } else {
                                                    return false
                                                }
                                            }
                                        }
                                    },
                                    click: function(a) {
                                        if (DonClick) {
                                            if (t.hasClass("hide-tooltip")) {
                                                M.pins.pinClose(t, m, pC)
                                            } else {
                                                M.pins.pinOpen(t, m, pC)
                                            }
                                            if (a.preventDefault()) {
                                                a.preventDefault()
                                            } else {
                                                return false
                                            }
                                        }
                                        if (mHref !== undefined && mHref.charAt(0) === "#") {
                                            if (a.preventDefault()) {
                                                a.preventDefault()
                                            } else {
                                                return false
                                            }
                                        }
                                    }
                                });
                                pTlink.on({
                                    click: function(a) {
                                        return false
                                    }
                                })
                            })
                        },
                        pinContent: function(p) {
                            var a = p.find("." + s.pins.pinTooltipClass),
                            pL = p.find("." + s.pins.markerClass);
                            if (!a.length) {
                                p.wrapInner($("<div />").addClass(s.pins.pinTooltipClass + " cssmap-" + s.mapStyle).hide())
                            } else {
                                a.addClass("cssmap-" + s.mapStyle).hide()
                            }
                            if (!pL.length) {
                                var b = $("<a />", {
                                    "class": s.pins.markerClass,
                                    "href": "#",
                                    "text": ""
                                }).appendTo(p)
                            }
                        },
                        pinOpen: function(t, m, a) {
                            $(pinsContainer).find(".hide-tooltip").each(function() {
                                var t = $(this),
                                m = t.find("." + s.pins.markerClass),
                                a = t.find("." + s.pins.pinTooltipClass);
                                M.pins.pinClose(t, m, a)
                            });
                            t.addClass("hide-tooltip");
                            a.css("margin-top", 0)
                        },
                        pinClose: function(t, m, a) {
                            t.removeClass("hide-tooltip");
                            a.css("margin-top", "-9999em")
                        }
                    },
                    getActiveRegions: function() {
                        var a = [];
                        li.each(function() {
                            if ($(this).hasClass("active-region")) {
                                a.push($(this).attr("class").split(" ")[0])
                            }
                        });
                        return a
                    },
                    getTopOffset: function(a) {
                        var b = a.getBoundingClientRect(),
                        body = document.body,
                        docElem = document.documentElement,
                        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                        clientTop = docElem.clientTop || body.clientTop || 0,
                        top = b.top + scrollTop - clientTop;
                        return Math.round(top)
                    },
                    clearMap: function() {
                        var a = "",
                        allStyles = "",
                        mapSizes = MAPS[mapName].sizes;
                        cli = "";
                        if ($.inArray(parseInt(s.size), mapSizes) == -1) {
                            mapContainer.html(CSSMapError("Incohrrect size: " + s.size + "<br/><br/>- available sizes: " + mapSizes.join(", ").toString()));
                            return false
                        }
                        for (var i = 0; i < mapSizes.length; i++) {
                            a += " cssmap-" + mapSizes[i]
                        }
                        for (var i = 0; i < mapStyles.length; i++) {
                            allStyles += " cssmap-" + mapStyles[i]
                        };
                        mapContainer.removeClass(a).removeClass("cssmap-container");
                        if (resized) {
                            return false
                        }
                        mapContainer.find(".cssmap-loader, .cssmap-cities, .m, .bg, .tooltip-arrow, .cssmap-visible-list-container, .cssmap-visible-list, .cssmap-navigation, .cssmap-search-link, .cssmap-signature, .cssmap-error").remove();
                        mapContainer.find("LI").removeClass("focus").removeClass("active-region");
                        mapList.removeClass(allStyles).removeClass("cssmap");
                        $("body").find(".cssmap-tooltip-content").removeClass(allStyles);
                        $(h + "-navigation").remove();
                        $(h + "-visible-list" + (g + 1)).remove();
                        $("body").find(".cssmap-signature").remove();
                        if ($(s.formSupport.inputId).length) {
                            $(s.formSupport.inputId).val("")
                        }
                        if ($(s.formSupport.selectId).length) {
                            $(s.formSupport.selectId).html("")
                        }
                    }
                };
                $(w).on("resize", function(e) {
                    bW = $(w).width();
                    bH = $(w).height();
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        resized = true;
                        M.init()
                    }, 250)
                });
                M.init()
            };
            return this.each(function(a) {
                if (!s.size) {
                    $(this).html(CSSMapError("map size must be set!"));
                    return false
                }
                if (typeof $.fn.on === "undefined" && !$.isFunction($.fn.on)) {
                    $(this).html(CSSMapError("<b>at least jQuery 1.7 is required!</b><br/><br/>- jQuery version used: " + $.fn.jquery + "<br/>- get a current version: <a href=\"http://jquery.com/download\">http://jquery.com/download</a>"));
                    return false
                }
                if (typeof $(this).attr("id") != "undefined") {
                    this.id
                } else {
                    this.id = "cssmap" + (a + 1)
                }
                doMaps(this, a)
            })
        } else {
            return this.html(CSSMapError("map size must be set!"))
        }
    }
})(jQuery);