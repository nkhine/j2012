var dragging = 0;
$(function () {
    var el = document.createElement('div'),
		transformProps = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
		transformProp = support(transformProps),
		transitionDuration = 'transitionDuration WebkitTransitionDuration MozTransitionDuration OTransitionDuration msTransitionDuration'.split(' '),
		transitionDurationProp = support(transitionDuration);

    function support(props) {
        for (var i = 0, l = props.length; i < l; i++) {
            if (typeof el.style[props[i]] !== "undefined") {
                return props[i];
            }
        }
    }

    var mouse = {
        start: {}
    },
	    touch = document.ontouchmove !== undefined,
	    viewport = {
	        x: -10,
	        y: 20,
	        el: $('.cube')[0],
	        move: function (coords) {
	            if (coords) {
	                if (typeof coords.x === "number") this.x = coords.x;
	                if (typeof coords.y === "number") this.y = coords.y;
	            }

	            this.el.style[transformProp] = "rotateX(" + this.x + "deg) rotateY(" + this.y + "deg)";
	        },
	        reset: function () {
	            this.move({ x: 0, y: 0 });
	        }
	    };

    viewport.duration = function () {
        var d = touch ? 50 : 500;
        viewport.el.style[transitionDurationProp] = d + "ms";
        return d;
    }();

    $(document).keydown(function (evt) {
        switch (evt.keyCode) {
            case 37: // left
                viewport.move({ y: viewport.y - 90 });
                break;

            case 38: // up
                evt.preventDefault();
                viewport.move({ x: viewport.x + 90 });
                break;

            case 39: // right
                viewport.move({ y: viewport.y + 90 });
                break;

            case 40: // down
                evt.preventDefault();
                viewport.move({ x: viewport.x - 90 });
                break;

            case 27: //esc
                viewport.reset();
                break;

            default:
                break;
        };
    }).bind('mousedown touchstart', function (evt) {
        delete mouse.last;
        if ($(evt.target).is('a, iframe')) {
            return true;
        }

        evt.originalEvent.touches ? evt = evt.originalEvent.touches[0] : null;
        mouse.start.x = evt.pageX;
        mouse.start.y = evt.pageY;
        $(document).bind('mousemove touchmove', function (event) {
            dragging = 1;
            // Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
            if (!touch || !(event.originalEvent && event.originalEvent.touches.length > 1)) {
                event.preventDefault();
                // Get touch co-ords
                event.originalEvent.touches ? event = event.originalEvent.touches[0] : null;
                $('.viewport').trigger('move-viewport', { x: event.pageX, y: event.pageY });
            }
        });

        $(document).bind('mouseup touchend', function () {
            dragging = 0;
            $(document).unbind('mousemove touchmove');

        });
    });

    $('.viewport').bind('move-viewport', function (evt, movedMouse) {

        // Reduce movement on touch screens
        var movementScaleFactor = touch ? 4 : 1;

        if (!mouse.last) {
            mouse.last = mouse.start;
        } else {
            if (forward(mouse.start.x, mouse.last.x) != forward(mouse.last.x, movedMouse.x)) {
                mouse.start.x = mouse.last.x;
            }
            if (forward(mouse.start.y, mouse.last.y) != forward(mouse.last.y, movedMouse.y)) {
                mouse.start.y = mouse.last.y;
            }
        }

        viewport.move({
            x: viewport.x + parseInt((mouse.start.y - movedMouse.y) / movementScaleFactor),
            y: viewport.y - parseInt((mouse.start.x - movedMouse.x) / movementScaleFactor)
        });

        mouse.last.x = movedMouse.x;
        mouse.last.y = movedMouse.y;

        function forward(v1, v2) {
            return v1 >= v2 ? true : false;
        }
    });
    viewport.reset();
});

    function windowResize() {
        var ScreenWidth = $(window).width();
        var ScreenHeight = $(window).height();
        var temp = null;
        var cube_size = null;
        var div_size = null;
        var padding = null;
        var distance = null;

        if (ScreenHeight < ScreenWidth) {
            temp = ScreenHeight;
        } else {
            temp = ScreenWidth;
        }

        cube_size = Math.ceil(temp / 1.75);
        padding = 0.1 * cube_size;
        distance = (cube_size / 2) + (padding / 2);
        div_size = cube_size - padding;
        var translate = ' translateZ(' + distance + 'px)'

        $('.cube').css({
            'width': cube_size,
            'height': cube_size,
        });

        $('.cube > div').css({
            'width': div_size,
            'height': div_size,
            'padding': padding,
        });

        $('.cube > div:first-child').css({
            '-webkit-transform': 'rotateX(90deg)' + translate,
            '-moz-transform': 'rotateX(90deg)' + translate,
            '-ms-transform': 'rotateX(90deg)' + translate,
            '-o-transform': 'rotateX(90deg)' + translate,
            'transform': 'rotateX(90deg)' + translate,
        });

        $('.cube > div:nth-child(2)').css({
            '-webkit-transform': translate,
            '-moz-transform': translate,
            '-ms-transform': translate,
            '-o-transform': translate,
            'transform': translate,
        });

        $('.cube > div:nth-child(3)').css({
            '-webkit-transform': 'rotateY(90deg)' + translate,
            '-moz-transform': 'rotateY(90deg)' + translate,
            '-ms-transform': 'rotateY(90deg)' + translate,
            '-o-transform': 'rotateY(90deg)' + translate,
            'transform': 'rotateY(90deg)' + translate,
        });

        $('.cube > div:nth-child(4)').css({
            '-webkit-transform': 'rotateY(180deg)' + translate,
            '-moz-transform': 'rotateY(180deg)' + translate,
            '-ms-transform': 'rotateY(180deg)' + translate,
            '-o-transform': 'rotateY(180deg)' + translate,
            'transform': 'rotateY(180deg)' + translate,
        });

        $('.cube > div:nth-child(5)').css({
            '-webkit-transform': 'rotateY(-90deg)' + translate,
            '-moz-transform': 'rotateY(-90deg)' + translate,
            '-ms-transform': 'rotateY(-90deg)' + translate,
            '-o-transform': 'rotateY(-90deg)' + translate,
            'transform': 'rotateY(-90deg)' + translate,
        });

        $('.cube > div:nth-child(6)').css({
            '-webkit-transform': 'rotateX(-90deg) rotate(180deg)' + translate,
            '-moz-transform': 'rotateX(-90deg) rotate(180deg)' + translate,
            '-ms-transform': 'rotateX(-90deg) rotate(180deg)' + translate,
            '-o-transform': 'rotateX(-90deg) rotate(180deg)' + translate,
            'transform': 'rotateX(-90deg) rotate(180deg)' + translate,
        });
    };
