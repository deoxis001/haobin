/* ============================================= 基础层 ============================================= */
// 检测浏览器类型 并自执行
+function getBrowser() {
    var html = document.documentElement;

    // 判断IE10
    if ( /*@cc_on!@*/ false) {
        html.className = 'ie' + document.documentMode;
    }
    // 判断 IE11及非IE浏览器
    // IE11下document.documentMode为11，而非IE浏览器的document.documentMode为undefined
    else if ( /*@cc_on!@*/ true) {
        html.className = 'ie' + document.documentMode;
    }

    // 判断老版本IE(6,7,8,9)
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"") == "MSIE9.0") {
        html.className = 'ie ie9';
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"") == "MSIE8.0") {
        html.className = 'ie ie8 lte-ie8';
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"") == "MSIE7.0") {
        html.className = 'ie ie7 lte-ie7 lte-ie8';
    }

    // 判断其他浏览器
    if (isFirefox = (navigator.userAgent.indexOf("Firefox") > 0)) {
        html.className = 'moz';
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        html.className =  'webkit';
    }
    if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        html.className = 'camino';
    }
    if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
        html.className = 'gecko';
    }
}();


// 检测浏览器对css3属性的支持度
function supportCss(o) {
    var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;

    if ( o in div.style ) {return true;}

    o = o.replace(/^[a-z]/, function(val) {
        return val.toUpperCase(); // 把字符串转换为大写
    });

    // 逐一检查[Khtml,Ms,O,Moz,Webkit]是不是在div.style属性数组列表中
    while(len--) {
        if ( vendors[len] + o in div.style ) {
            return true;
        }
    }
    return false;
}

// 检测表单的placeholer属性
function isPlaceholer() {
    var input = document.createElement('input');
    return "placeholder" in input;
}

/*!
 * jQuery Transit CSS3动画插件
 * (c) 2011-2014 Rico Sta. Cruz
 * MIT Licensed.
 * http://github.com/rstacruz/jquery.transit
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
}(this, function($) {
    $.transit = {
        version: "0.9.12",
        propertyMap: {
            marginLeft    : 'margin',
            marginRight   : 'margin',
            marginBottom  : 'margin',
            marginTop     : 'margin',
            paddingLeft   : 'padding',
            paddingRight  : 'padding',
            paddingBottom : 'padding',
            paddingTop    : 'padding'
        },
        enabled: true,
        useTransitionEnd: false
    };

    var div = document.createElement('div');
    var support = {};

    function getVendorPropertyName(prop) {
        if (prop in div.style) return prop;

        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        for (var i=0; i<prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in div.style) { return vendorProp; }
        }
    }

    function checkTransform3dSupport() {
        div.style[support.transform] = '';
        div.style[support.transform] = 'rotateY(90deg)';
        return div.style[support.transform] !== '';
    }

    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    support.transition      = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform       = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
    support.filter          = getVendorPropertyName('Filter');
    support.transform3d     = checkTransform3dSupport();

    var eventNames = {
        'transition':       'transitionend',
        'MozTransition':    'transitionend',
        'OTransition':      'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition':     'MSTransitionEnd'
    };

    var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

    for (var key in support) {
        if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
            $.support[key] = support[key];
        }
    }
    div = null;

    // css3缓动参数
    $.cssEase = {
        '_default':       'ease',
        'in':             'ease-in',
        'out':            'ease-out',
        'in-out':         'ease-in-out',
        'snap':           'cubic-bezier(0,1,.5,1)',
        // Penner equations
        'easeInCubic':    'cubic-bezier(.550,.055,.675,.190)',
        'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
        'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
        'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
        'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
        'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
        'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
        'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
        'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
        'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
        'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
        'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
        'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
        'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
        'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
        'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
        'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
        'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
        'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
        'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
        'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
    };

    $.cssHooks['transit:transform'] = {
        get: function(elem) {
            return $(elem).data('transform') || new Transform();
        },

        set: function(elem, v) {
            var value = v;

            if (!(value instanceof Transform)) {
                value = new Transform(value);
            }

            if (support.transform === 'WebkitTransform' && !isChrome) {
                elem.style[support.transform] = value.toString(true);
            } else {
                elem.style[support.transform] = value.toString();
            }

            $(elem).data('transform', value);
        }
    };

    $.cssHooks.transform = {
        set: $.cssHooks['transit:transform'].set
    };

    $.cssHooks.filter = {
        get: function(elem) {
            return elem.style[support.filter];
        },
        set: function(elem, value) {
            elem.style[support.filter] = value;
        }
    };

    // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
    // be necessary.
    if ($.fn.jquery < "1.8") {
        $.cssHooks.transformOrigin = {
            get: function(elem) {
                return elem.style[support.transformOrigin];
            },
            set: function(elem, value) {
                elem.style[support.transformOrigin] = value;
            }
        };

        $.cssHooks.transition = {
            get: function(elem) {
                return elem.style[support.transition];
            },
            set: function(elem, value) {
                elem.style[support.transition] = value;
            }
        };
    }

    registerCssHook('scale');
    registerCssHook('scaleX');
    registerCssHook('scaleY');
    registerCssHook('translate');
    registerCssHook('rotate');
    registerCssHook('rotateX');
    registerCssHook('rotateY');
    registerCssHook('rotate3d');
    registerCssHook('perspective');
    registerCssHook('skewX');
    registerCssHook('skewY');
    registerCssHook('x', true);
    registerCssHook('y', true);

    function Transform(str) {
        if (typeof str === 'string') { this.parse(str); }
        return this;
    }

    Transform.prototype = {
        setFromString: function(prop, val) {
            var args =
                (typeof val === 'string')  ? val.split(',') :
                    (val.constructor === Array) ? val :
                        [ val ];

            args.unshift(prop);

            Transform.prototype.set.apply(this, args);
        },

        set: function(prop) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[prop]) {
                this.setter[prop].apply(this, args);
            } else {
                this[prop] = args.join(',');
            }
        },

        get: function(prop) {
            if (this.getter[prop]) {
                return this.getter[prop].apply(this);
            } else {
                return this[prop] || 0;
            }
        },

        setter: {
            rotate: function(theta) {
                this.rotate = unit(theta, 'deg');
            },

            rotateX: function(theta) {
                this.rotateX = unit(theta, 'deg');
            },

            rotateY: function(theta) {
                this.rotateY = unit(theta, 'deg');
            },

            scale: function(x, y) {
                if (y === undefined) { y = x; }
                this.scale = x + "," + y;
            },

            skewX: function(x) {
                this.skewX = unit(x, 'deg');
            },

            skewY: function(y) {
                this.skewY = unit(y, 'deg');
            },

            perspective: function(dist) {
                this.perspective = unit(dist, 'px');
            },

            x: function(x) {
                this.set('translate', x, null);
            },

            y: function(y) {
                this.set('translate', null, y);
            },

            translate: function(x, y) {
                if (this._translateX === undefined) { this._translateX = 0; }
                if (this._translateY === undefined) { this._translateY = 0; }

                if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
                if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

                this.translate = this._translateX + "," + this._translateY;
            }
        },

        getter: {
            x: function() {
                return this._translateX || 0;
            },

            y: function() {
                return this._translateY || 0;
            },

            scale: function() {
                var s = (this.scale || "1,1").split(',');
                if (s[0]) { s[0] = parseFloat(s[0]); }
                if (s[1]) { s[1] = parseFloat(s[1]); }
                return (s[0] === s[1]) ? s[0] : s;
            },

            rotate3d: function() {
                var s = (this.rotate3d || "0,0,0,0deg").split(',');
                for (var i=0; i<=3; ++i) {
                    if (s[i]) { s[i] = parseFloat(s[i]); }
                }
                if (s[3]) { s[3] = unit(s[3], 'deg'); }

                return s;
            }
        },

        parse: function(str) {
            var self = this;
            str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
                self.setFromString(prop, val);
            });
        },

        toString: function(use3d) {
            var re = [];

            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    // Don't use 3D transformations if the browser can't support it.
                    if ((!support.transform3d) && (
                        (i === 'rotateX') ||
                        (i === 'rotateY') ||
                        (i === 'perspective') ||
                        (i === 'transformOrigin'))) { continue; }

                    if (i[0] !== '_') {
                        if (use3d && (i === 'scale')) {
                            re.push(i + "3d(" + this[i] + ",1)");
                        } else if (use3d && (i === 'translate')) {
                            re.push(i + "3d(" + this[i] + ",0)");
                        } else {
                            re.push(i + "(" + this[i] + ")");
                        }
                    }
                }
            }
            return re.join(" ");
        }
    };

    function callOrQueue(self, queue, fn) {
        if (queue === true) {
            self.queue(fn);
        } else if (queue) {
            self.queue(queue, fn);
        } else {
            self.each(function () {
                fn.call(this);
            });
        }
    }

    function getProperties(props) {
        var re = [];

        $.each(props, function(key) {
            key = $.camelCase(key); // Convert "text-align" => "textAlign"
            key = $.transit.propertyMap[key] || $.cssProps[key] || key;
            key = uncamel(key); // Convert back to dasherized

            // Get vendor specify propertie
            if (support[key])
                key = uncamel(support[key]);

            if ($.inArray(key, re) === -1) { re.push(key); }
        });

        return re;
    }

    function getTransition(properties, duration, easing, delay) {
        var props = getProperties(properties);

        if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

        var attribs = '' + toMS(duration) + ' ' + easing;
        if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

        var transitions = [];
        $.each(props, function(i, name) {
            transitions.push(name + ' ' + attribs);
        });

        return transitions.join(', ');
    }

    $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
        var self  = this;
        var delay = 0;
        var queue = true;

        var theseProperties = $.extend(true, {}, properties);

        if (typeof duration === 'function') {
            callback = duration;
            duration = undefined;
        }

        if (typeof duration === 'object') {
            easing = duration.easing;
            delay = duration.delay || 0;
            queue = typeof duration.queue === "undefined" ? true : duration.queue;
            callback = duration.complete;
            duration = duration.duration;
        }

        if (typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }

        if (typeof theseProperties.easing !== 'undefined') {
            easing = theseProperties.easing;
            delete theseProperties.easing;
        }

        if (typeof theseProperties.duration !== 'undefined') {
            duration = theseProperties.duration;
            delete theseProperties.duration;
        }

        if (typeof theseProperties.complete !== 'undefined') {
            callback = theseProperties.complete;
            delete theseProperties.complete;
        }

        if (typeof theseProperties.queue !== 'undefined') {
            queue = theseProperties.queue;
            delete theseProperties.queue;
        }

        if (typeof theseProperties.delay !== 'undefined') {
            delay = theseProperties.delay;
            delete theseProperties.delay;
        }

        if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
        if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

        duration = toMS(duration);

        var transitionValue = getTransition(theseProperties, duration, easing, delay);

        var work = $.transit.enabled && support.transition;
        var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

        if (i === 0) {
            var fn = function(next) {
                self.css(theseProperties);
                if (callback) { callback.apply(self); }
                if (next) { next(); }
            };

            callOrQueue(self, queue, fn);
            return self;
        }

        var oldTransitions = {};

        var run = function(nextCall) {
            var bound = false;

            // Prepare the callback.
            var cb = function() {
                if (bound) { self.unbind(transitionEnd, cb); }

                if (i > 0) {
                    self.each(function() {
                        this.style[support.transition] = (oldTransitions[this] || null);
                    });
                }

                if (typeof callback === 'function') { callback.apply(self); }
                if (typeof nextCall === 'function') { nextCall(); }
            };

            if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
                bound = true;
                self.bind(transitionEnd, cb);
            } else {
                window.setTimeout(cb, i);
            }
            self.each(function() {
                if (i > 0) {
                    this.style[support.transition] = transitionValue;
                }
                $(this).css(theseProperties);
            });
        };

        var deferredRun = function(next) {
            this.offsetWidth; // force a repaint
            run(next);
        };

        callOrQueue(self, queue, deferredRun);
        return this;
    };

    function registerCssHook(prop, isPixels) {
        if (!isPixels) { $.cssNumber[prop] = true; }

        $.transit.propertyMap[prop] = support.transform;

        $.cssHooks[prop] = {
            get: function(elem) {
                var t = $(elem).css('transit:transform');
                return t.get(prop);
            },

            set: function(elem, value) {
                var t = $(elem).css('transit:transform');
                t.setFromString(prop, value);

                $(elem).css({ 'transit:transform': t });
            }
        };

    }

    function uncamel(str) {
        return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
    }

    function unit(i, units) {
        if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
            return i;
        } else {
            return "" + i + units;
        }
    }

    function toMS(duration) {
        var i = duration;

        if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) { i = $.fx.speeds[i] || $.fx.speeds._default; }

        return unit(i, 'ms');
    }
    $.transit.getTransitionValue = getTransition;

    return $;
}));

// jQuery缓动算法插件
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

// textarea自动高度插件
(function($){
    $.fn.autoHeight = function(options) {
        // 默认设置
        var defaults = {
                maxHeight: 0,        // 控件定义的最大高度
                extraHeight: 0       // 控件额外增加的高度
            },
            settings = $.extend({}, defaults, options || {});

        return this.each(function() {
            var $this = $(this),
                maxHeight = parseInt(settings.maxHeight) || 0,
                extraHeight = parseInt(settings.extraHeight) || 0,
                padding = parseInt($this.css('paddingTop')) + parseInt($this.css('paddingBottom')),
                minHeight  = parseInt($this.css('height')),
                len;

            // 设置样式
            if ($this.css('boxSizing') == 'border-box') {
                $this.css('boxSizing', 'content-box');
            }
            $this.css({
                'resize': 'none',
                'overflow': 'hidden'
            });

            // 事件：键按下时change()
            $this.on('input', function() {
                change();
            });

            // 方法：改变高度
            function change() {
                var h;
                $this.css('height', minHeight + 'px');
                if ($this[0].scrollHeight > minHeight) {
                    if (maxHeight > 0 && $this[0].scrollHeight > maxHeight) {
                        h = maxHeight - padding;
                        $this.css('overflowY', 'auto');
                    } else {
                        h = $this[0].scrollHeight - padding;
                        $this.css('overflowY', 'hidden');
                    }
                    $this.css('height', h + extraHeight + 'px');
                }
            }
        });
    };
})(jQuery);

// 弹窗
(function($, w){
    $.fn.dialog = function() {
        return this.each(function() {
            var $this = $(this),
                $dialog = $('.mod-dialog'),
                $overlay = $('.mod-overlay'),
                $close = $dialog.find('.close'),
                isTransit = false,
                isAnimateEnd = true,
                y;

            if (supportCss('transition') && supportCss('transform')) {
                isTransit = true;
            }

            // 元素：初始化
            if (isTransit) {
                _offset();
                $dialog.css({translate: [0, -y]});
                $dialog.css('opacity', 0);
                $overlay.css('opacity', 0);

                $(w).on('resize', function() {
                    _offset();
                });
            }

            // 事件：$this点击显示
            $this.on('click', function() {
                if (!isAnimateEnd) return;
                _show();
            });

            // 事件：点击隐藏
            $close.on('click', function() {
                if (!isAnimateEnd) return;
                _hide();
            });
            $overlay.on('click', function() {
                if (!isAnimateEnd) return;
                _hide();
            });

            // 方法：计算位移
            function _offset() {
                y = ($(w).height() / 2) - ($dialog.height() / 2);
            }

            // 方法：显示
            function _show() {
                isAnimateEnd = false;
                if (isTransit) {
                    $overlay.css('display', 'block').transition({
                        opacity: 0.8
                    }, 300, function() {
                        $dialog.css('display', 'block').transition({
                            translate: [0, 0],
                            opacity: 1
                        }, 500, 'easeInOutBack', function() {
                            isAnimateEnd = true;
                        });
                    });
                } else {
                    $overlay.fadeIn(300);
                    $dialog.fadeIn(400, function() {
                        isAnimateEnd = true;
                    });
                }
            }

            // 方法：隐藏
            function _hide() {
                isAnimateEnd = false;
                if (isTransit) {
                    $dialog.transition({
                        translate: [0, -y],
                        opacity: 0
                    }, 500, 'easeInOutBack', function() {
                        $dialog.css('display', 'none');
                        $overlay.transition({
                            opacity: 0
                        }, 300, function() {
                            $overlay.css('display', 'none');
                            isAnimateEnd = true;
                        });
                    });
                } else {
                    $overlay.fadeOut(400, function() {
                        isAnimateEnd = true;
                    });
                    $dialog.fadeOut(300);
                }
            }
        });
    };
})(jQuery, window);

// 短信验证
(function($){
    $.fn.sCountdown = function(options) {
        var defaults = {
                times: 60
            },
            settings = $.extend({}, defaults, options || {});

        return this.each(function() {
            var $this = $(this),
                times = settings.times,
                timer = null;

            $this.on('click', function() {
                var _this = $(this);
                // 计时开始
                timer = setInterval(function() {
                    times--;
                    if (times <= 0) {
                        _this.val('获取验证码');
                        clearInterval(timer);
                        _this.attr('disabled', false).removeClass('disabled');
                    } else {
                        _this.val(times + '秒后重试');
                        _this.attr('disabled', true).addClass('disabled');
                    }
                }, 1000);
            });
        });
    };
})(jQuery);

/* ============================================= 应用层 ============================================= */
// DOM结构加载完毕后执行
$(function() {
    var $body = $('body');

    // 顶部—下拉菜单
    var $obj = $('.topbar').find('.menu-select');
    $obj.hover(function() {
        var obj = $(this);
        timer1 = setTimeout(function() {
            obj.addClass('menu-hover');
        }, 250);
    }, function() {
        clearTimeout(timer1);
        $(this).removeClass('menu-hover');
    });

    // 头部二维码—点击放大
    var $qrMask = $('#J_qr_mask');
    $('#J_Erwei').on('click',function(){
        $qrMask.fadeIn(200).find('.sweep').animate({'margin-left':'0px'});
    });
    $qrMask.on('click',function(){
        $(this).fadeOut(200);
    });

    // 头部搜索框—下拉菜单
    var $Search = $('#J_Search'),
        $Searchselect = $Search.find('.search-select'),
        $selectBdItem = $Search.find('.select-bd').find('a');
    $Searchselect.hover(function() {
        var obj = $(this);
        timer2 = setTimeout(function() {
            obj.addClass('search-select-hover').parents('.search-panel-fields').addClass('blur');
        }, 250);
    }, function() {
        clearTimeout(timer2);
        $(this).removeClass('search-select-hover').parents('.search-panel-fields').removeClass('blur');
    });

    $selectBdItem.on('click', function() {
        var word = $(this).text(),
			vid = $(this).attr('vid'),
			toid = $(this).parent().attr('toid');
		$("#"+toid).val(vid);
        $(this).addClass('selected').siblings().removeClass('selected')
            .end().parents('.search-select').removeClass('search-select-hover');
        $(this).parents('.search-select').find('.keyword').text(word);
    });
	$(".search-button").click(function(){
		var toid = $(this).attr('toid');
		if($("#"+toid+"_area").val()=='' && $("#"+toid+"_type").val()=='' && $("#"+toid+"_price").val()=='' && $("#"+toid+"_keyword").val()=='') return false;
		$("#"+toid+"_form").submit();
	});

    // 头部搜索框—清除value
    var $btnClear = $Search.find('.btn-clear'),
        $searchBoxInput = $Search.find('.search-box-input');

    $searchBoxInput.on({
        keyup: function() {
            if ($(this).val() !== '') {
                $btnClear.removeClass('none');
            }
        },
        blur: function() {
            if ($(this).val() === '') {
                $btnClear.addClass('none');
            } else {
                $btnClear.removeClass('none');
            }
        }
    });
    $btnClear.on('click', function() {
        $(this).siblings('.search-box-input').val('').end().addClass('none');
    });

    // 头部搜索框—isPlaceholer兼容
    if (!isPlaceholer()) {
        $searchBoxInput.keyup(function() {
            if ($(this).val() !== "") {
                $(this).prev('.search-box-label').css('display', 'none');
            }
        }).blur(function() {
            if ($(this).val() === "") {
                $(this).prev('.search-box-label').css('display', 'block');
            } else {
                $(this).prev('.search-box-label').css('display', 'none');
            }
        });
        $btnClear.click(function() {
            $(this).siblings('.search-box-label').css('display', 'block');
        });
    }

    // 头部搜索框—切换
    var $searchTriggers = $('.search-triggers'),
        $searchTit = $searchTriggers.find('.triggers-item');

    function setSearchTit(index) {
        $searchTriggers.find('li').eq(index + 1).addClass('selected').siblings().removeClass('selected');
        $('.search-panel').eq(index).removeClass('none').siblings('.search-panel').addClass('none');
    }
    $searchTit.on('click.space1', function() {
        var index = $searchTit.index(this),
            word = $(this).text();
        setSearchTit(index);
        $searchTriggers.find('.keyword').text(word);
        if ($header.hasClass('fixed')) {
            $searchTriggers.removeClass('search-triggers-hover');
        }
    });

    // 导航—页面滚动时固定
    var $header = $('.header'),
        ratio = ($body.height() / $(window).height()).toFixed(1),
        dist;
    if (ratio > 1.5) {
        $(window).on('scroll', function() {
            dist = $(window).scrollTop();

            if (dist > 200) {
                if ($header.hasClass('fixed')) {return;}
                $header.addClass('fixed FadeInT2');
                $body.css('padding-top', '144px');
                $searchTriggers.on('mouseenter.tSearch', function() {
                    $('.search-triggers').addClass('search-triggers-hover');
                }).on('mouseleave.tSearch', function() {
                    $('.search-triggers').removeClass('search-triggers-hover');
                });
            } else {
                $header.removeClass('fixed FadeInT2');
                $body.css('padding-top', '36px');
                $searchTriggers.off('.tSearch');
            }
        });
    } else {
        $body.css('padding-top', 0);
        $('.topbar').css('position', 'relative');
    }

    // 返回顶部
    var $backtop = $('#J_backtop');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > document.documentElement.clientHeight) {
            $backtop.fadeIn();
        } else {
            $backtop.fadeOut();
        }
    });

    $backtop.click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 400);
    });

    // 导航—笑脸弹跳动画
    $('#J_nav_xqf').mouseenter(function() {
        // 监听动画执行完毕后再增加动画
        $(this).find('.ico-light').addClass('Bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass('Bounce');
        });
    });

    /*
     * 看房团报名表单
     */

    var $postInput = $('#J_PostForm').find('input');
    $postInput.on({
        keyup : function(){
            if($(this).val() !== ''){
                $(this).prev('span').hide();
            }
        },
        blur : function(){
            if($(this).val() === ''){
                $(this).prev('span').show();
            }else{
                $(this).prev('span').hide();
            }
        }
    });

    /*
     * 评论模块
     */

    // 赞
    var $optZan = $('.opt-zan'),
        isZanEnd = true;
    $optZan.on('click', function() {
        var $num = $(this).find('em'),
            numText = parseFloat($num.text());
		var type = $(this).attr('type');
		var zid = parseInt($(this).attr('zid'));
		var pid = parseInt($(this).attr('pid'));
		var zanok = 0;
		var the = this;
		if(type == 'loupan'){
			$.getJSON('/index.php',{c:'phpmh',a:'zanlp',inajax:'Y',submitvalue:'Y',lpid:zid,dpid:pid},function(r){
				if(r.msg == 'OK'){
					if (!$(the).hasClass('on')) {
						$(the).addClass('on').find('span').css({'display': 'block', 'opacity': 1}).transition({
							opacity: 0,
							translate: [0,-150],
							scale: 1.2,
							duration: 1500,
							easing: 'out',
							complete: function(){
								$(the).css({'display': 'none', translate: [0,0], scale: 1});
							}
						});
						$num.text(numText + 1);
					} else {
						$(the).removeClass('on');
						$num.text(numText - 1);
					}
					if (!isZanEnd) {return;}
           			isZanEnd = false;
				}else{
					alert(r.con);
				}
			});
		}else{
			$.getJSON('/index.php',{c:'phpmh',a:'zancmt',inajax:'Y',submitvalue:'Y',newsid:zid,cmtid:pid},function(r){
				if(r.msg == 'OK'){
					if (!$(the).hasClass('on')) {
						$(the).addClass('on').find('span').css({'display': 'block', 'opacity': 1}).transition({
							opacity: 0,
							translate: [0,-150],
							scale: 1.2,
							duration: 1500,
							easing: 'out',
							complete: function(){
			                    $(this).attr('style', '');
			                    isZanEnd = true;
							}
						});
						$num.text(numText + 1);
					} else {
						$(the).removeClass('on');
						$num.text(numText - 1);
					}
				}else{
					alert(r.con);
				}
			});
		}
    });

    // 回复
    var $optReply = $('.opt-reply'),
        $replyText = $('.reply-form').find('textarea');
    $optReply.on('click', function() {
        if (!$(this).hasClass('on')) {
            $(this).addClass('on').parents('.dp').find('.reply-form').slideDown('fast');
        } else {
            $(this).removeClass('on').parents('.dp').find('.reply-form').slideUp('fast');
        }
    });

    $replyText.autoHeight();
    $replyText.on('input', function() {
        if ($(this).val() !== '') {
            $(this).siblings('.btn-reply').removeClass('disabled');
        } else {
            $(this).siblings('.btn-reply').addClass('disabled');
        }
    });
});