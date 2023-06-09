let overlay = document.querySelector('.overlay');
let overlayTwo = document.querySelector('.overlayTwo');
let link = document.querySelector('.link')
let close_overlay = document.querySelector('.close');
let close_overlay_Two = document.querySelector('.closeTwo');
let setting=  document.querySelector('.gear');
setting.addEventListener('click', function(){
    overlay.style.transform='translateX(0%)';
    overlay.style.transition='0.5s all ease';
})
close_overlay.addEventListener('click', function(){
    overlay.style.transform='translateX(-100%)';
    overlay.style.transition='0.5s all ease';
})
close_overlay_Two.addEventListener('click', function(){
    overlayTwo.style.transform='translateX(-100%)';
    overlayTwo.style.transition='0.5s all ease';
})

link.addEventListener('click', function(){
    overlayTwo.style.transform='translateX(0%)';
    overlayTwo.style.transition='0.5s all ease';
})


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var commons = function () {
	
	function commons() {}
	commons.attachParentSelector = function (parentSelector, defaultSelector) {
		var customSelector = defaultSelector;
		if (parentSelector && parentSelector !== '' && parentSelector.length > 0) {
			if (parentSelector === defaultSelector) {
				customSelector = defaultSelector;
			} else if ($(parentSelector).hasClass(defaultSelector)) {
				customSelector = parentSelector + "" + defaultSelector;
			} else {
				customSelector = parentSelector + " " + defaultSelector;
			}
		}
		return customSelector;
	};
	return commons;
};
function _inherits(SubClass, SuperClass) {
	if (typeof SuperClass !== "function" && SuperClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof SuperClass);
	}
	SubClass.prototype = new SuperClass();
}
var propellerControlMapping = {
	"scroll-checkbox": function () {
		$('.scroll-checkbox').scrollCheckBox();
	},
	"scroll-radio": function () {
		$('.scroll-radio').scrollRadio();
	},
	"scroll-textfield": function () {
		$('.scroll-textfield').scrollTextfield();
	},
	"scroll-dropdown": function () {
		$('.scroll-dropdown').scrollDropdown();
	},
	"scroll-alert-toggle": function () {
		$('.scroll-alert-toggle').scrollAlert();
	},
	"scroll-tabs": function () {
		$('.scroll-tabs').scrollTab();
	},
	"scroll-sidebar": function () {
		$().scrollSidebar();
	},
	"scroll-accordion": function () {
		$('.scroll-accordion').scrollAccordion();
	},
	"scroll-ripple-effect": function () {
		$('.scroll-ripple-effect').scrollButton();
	}
};
var observeDOM = (function () {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
		eventListenerSupported = window.addEventListener;
	return function (obj, callback) {
		if (MutationObserver) {
			var obs = new MutationObserver(function (mutations, observer) {
				if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
					callback(mutations);
				}
			});
			obs.observe(obj, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true
			});
		} else if (eventListenerSupported) {
			obj.addEventListener('DOMNodeInserted', callback, false);
			obj.addEventListener('DOMNodeRemoved', callback, false);
		}
	};
})();
$(document).ready(function () {
	$.propellerkit();
});
$.propellerkit = function() {
	observeDOM(document.querySelector('body'), function (mutations) {
		processMutation(0);
		function processMutation(index) {
			if (index >= mutations.length) {
				return;
			}
			var mutation = mutations[index];
			var nodes = mutation.addedNodes;
			processNodes(nodes, function () {
				processMutation(index + 1);
			});
		}
		
		function processNodes(nodes, callback) {
			if (nodes.length === 0) {
				callback();
				return;
			}
			processNode(nodes, 0, function () {
				callback();
			});
		}

		function processNode(nodes, index, callback) {
			if (index >= nodes.length) {
				callback();
				return;
			}
			var node = nodes[index];
			if (containsscrollClassPrefix(node)) {
				if ($(node).attr("data-toggle") !== undefined && $(node).attr("data-toggle").toLowerCase() === "popover") {
					$().scrollPopover();
				}
				var classes = $(node).attr('class');
				if (classes === undefined) {
					callback();
					return;
				}
				classes = classes.split(' ');
				classes.forEach(function (clazz) {
					if (propellerControlMapping[clazz]) {
						propellerControlMapping[clazz]();
						return true;
					}
					return false;
				});
				processNode(nodes, index+1, function() {
					callback();
				});
			} else {
				try {
					var childNodes = node.childNodes;
					processNodes(childNodes, function() {
						processNode(nodes, index+1, function() {
							callback();
						});
					});
				} catch (e) {
					
				}
			}
		}
		function containsscrollClassPrefix(ele) {
			if ($(ele).attr('class') === undefined) {
				return false;
			}
			var classes = $(ele).attr('class').split(' ');
			for (var i = 0; i < classes.length; i++) {
				
				if (propellerControlMapping.hasOwnProperty(classes[i])) {
					return true;	
				}				
			}
			return false;
		}
	});
};
var scrollTab = function ($) {
    var NAME = 'scrollTab';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var ClassName = {
        scroll_TAB: 'scroll-tabs',
		NAV_JUSTIFIED: 'nav-justified',
		PREV_TAB: 'prev-tab',
        LAST_TAB: 'last-tab',
        PM_INI: "pm-ini",
		SCROLL: "scroll-tabs-scroll",
        SCROLL_CONTAINER: 'scroll-tabs-scroll-container',
        ACTIVE_BAR: 'scroll-tab-active-bar'
    };
    var Selector = {
        PARENT_SELECTOR: '',
		scroll_TAB: '.' + ClassName.scroll_TAB,
        UL_NAV_TABS: 'ul.nav-tabs',
        LI: 'li',
        SCROLL_CONTAINER: '.' + ClassName.SCROLL_CONTAINER,
        NAV_TAB: '.nav-tabs',
        SCROLL_RIGHT: '.scroll-tabs-scroll-right',
        SCROLL_LEFT: '.scroll-tabs-scroll-left',
        UL_LI_ACTIVE: 'ul li.active',
        ACTIVE_BAR: '.' + ClassName.ACTIVE_BAR,
        NAV: '.nav',
        UL_LI: 'ul li',
        NAV_TABS_LI: '.nav-tabs li',
        LAST_TAB: '.' + ClassName.LAST_TAB,
        PREV_TAB: '.' + ClassName.PREV_TAB,
        PM_INI: '.' + ClassName.PM_INI
    };
    var Template = {
        ACTIVE_BAR_DIV: "<div class='scroll-tab-active-bar'></div>",
        SCROLL_LEFT: "<div class='scroll-tabs-scroll-left'><i class='fa fa-caret-left'></i></div>",
        SCROLL_RIGHT: "<div class='scroll-tabs-scroll-right'><i class='fa fa-caret-right'></i></div>",
        SCROLL_CONTAINER: "<div class='scroll-tabs-scroll-container'></div>"
    };
    function widthOfList($this) {
        var itemsWidth = 0;
        $this.find(Selector.LI).each(function () {
            var itemWidth = $(this)[0].getBoundingClientRect().width;
            itemsWidth += itemWidth;
        });
        return itemsWidth;
    }
    function appendulwidth($this) {
        if ($this.find(Selector.UL_NAV_TABS).hasClass(ClassName.NAV_JUSTIFIED)) {
            $this.find(Selector.UL_NAV_TABS).width("100%");
        } else {
            $this.find(Selector.UL_NAV_TABS).width(widthOfList($this));
        }
    }
    function getLeftPosi($this) {
        return $this.find(Selector.UL_NAV_TABS).position().left;
    }

    function reAdjust($this) {
        if (($this.outerWidth()) < widthOfList($this)) {
            var navScrolledRight = $this.find(Selector.SCROLL_CONTAINER).scrollLeft(),
                navWrapWidth = $this.width(),
                navWidth = $this.find(Selector.NAV_TAB).width(),
                ammountRight = navWidth - navScrolledRight - navWrapWidth;
            if (ammountRight > 0) {
                $this.find(Selector.SCROLL_RIGHT).show();
            }
        }
        else {
            $this.find(Selector.SCROLL_RIGHT).hide();
        }
        if (getLeftPosi($this) < 0) {
            var navScrolledLeft = $this.find(Selector.SCROLL_CONTAINER).scrollLeft(),
                ammountLeft = navScrolledLeft;
            if (ammountLeft > 0) {
                $this.find(Selector.SCROLL_LEFT).show();
            }
        }
        else {
            $this.find(Selector.SCROLL_LEFT).hide();
        }
    }
    function activeTabCenter($this) {
        var $tabWidth = $this.outerWidth(),
            $middlePosition = $tabWidth / 2,
            $tabWrapperLeft = $this.offset().left,
            $sliderActive = $this.find(Selector.UL_LI_ACTIVE),
            $activeWidth = $sliderActive.outerWidth(),
            $tabHalfWidth = $activeWidth / 2,
            $tableftScroll = $this.find(Selector.SCROLL_CONTAINER).scrollLeft(),
            $tableftPosi = $this.find(Selector.UL_LI_ACTIVE).offset().left,
            $tabCenterPosi = $tableftPosi - $middlePosition - $tabWrapperLeft + $tableftScroll + $tabHalfWidth;
        	$this.find(Selector.SCROLL_CONTAINER).animate({ scrollLeft: $tabCenterPosi }, 1);
    }
    function sliderLoad($this) {
        var $slider = $this.find(Selector.ACTIVE_BAR),
            $sliderActive = $this.find(Selector.UL_LI_ACTIVE),
            $isX = $sliderActive.offset().left,
            $navX = $this.find(Selector.NAV).offset().left,
            $wrapperLeft = $this.offset().left,
            $sliderLeft = $isX - $wrapperLeft,
            $finalPossion = $wrapperLeft - $navX + $isX - $wrapperLeft;

        if ($navX < $wrapperLeft) {
            $slider.width($sliderActive.width() + "px").css("left", $finalPossion + "px");
        } else {
            $slider.width($sliderActive.width() + "px").css("left", $sliderLeft + "px");
        }
        $this.find(Selector.UL_LI).click(function () {
            var $thisWidth = $(this).width() + "px",
                $newLeft = $(this).offset().left - $wrapperLeft,
                $navX = $(this).closest(Selector.NAV).offset().left;
            $finalPossion = $wrapperLeft - $navX + $newLeft;

            $slider.width($thisWidth).css("left", $finalPossion + "px");
        });
    }
    function onResizeWindow(event) {
        var $this = event.data.param1;
        setTimeout(function () {
            appendulwidth($this);
            reAdjust($this);
            activeTabCenter($this);
        }, 150);
        sliderLoad($this);
    }
    function onscrollTabScrollRightClick(event) {
        var $this = event.data.param1;
        var $tabSet = '',
            $wrapper = $(event.currentTarget).prev(Selector.SCROLL_CONTAINER),
            $tab = $wrapper.find(Selector.NAV_TABS_LI),
            $thisWidht = $(event.currentTarget).outerWidth(),
            $navCotainer = $this.outerWidth(),
            $wrapperRight = $this.offset().left + $navCotainer;

        $tab.each(function () {
            var SuspectTabLeft = $(this).offset().left;
            var SuspectTabRight = $(this).offset().left + $(this).outerWidth();
            $(this).removeClass(ClassName.PREV_TAB);
            if (SuspectTabLeft < $wrapperRight && SuspectTabRight > $wrapperRight) {
                $tabSet = SuspectTabRight - $wrapperRight + $thisWidht;
                $(this).addClass(ClassName.LAST_TAB);
                $(this).prev().removeClass(ClassName.LAST_TAB);
            }
        });
        var finalTab = $wrapper.find(Selector.LAST_TAB).next().length;
        if (finalTab === 0) {
            var lastTabRight = $wrapper.find(Selector.LAST_TAB).offset().left + $wrapper.find(Selector.LAST_TAB).outerWidth();
            var NewScrollAmount = lastTabRight - $wrapperRight;
            $wrapper.animate({ scrollLeft: '+=' + NewScrollAmount });
            $(event.currentTarget).fadeOut('slow');
        }
        else {
            $wrapper.animate({ scrollLeft: '+=' + $tabSet });
        }
        $(event.currentTarget).parents(Selector.scroll_TAB).find(Selector.SCROLL_LEFT).fadeIn('slow');
    }
    function onscrollTabScrollLeftClick(event) {
        var $this = event.data.param1;
        var $wrapper = $(event.currentTarget).next(Selector.SCROLL_CONTAINER),
            $tab = $wrapper.find(Selector.NAV_TABS_LI),
            $thisWidht = $(event.currentTarget).outerWidth(),
            $wrapperLeft = $this.offset().left,
            $tabSetLeft = '';

        $tab.each(function () {
            var SuspectTabLeft = $(this).offset().left;
            var SuspectTabRight = $(this).offset().left + $(this).outerWidth();
            $(this).removeClass(ClassName.LAST_TAB);
            if (SuspectTabLeft < $wrapperLeft && SuspectTabRight > $wrapperLeft) {
                $tabSetLeft = $wrapperLeft - SuspectTabLeft + $thisWidht;
                $(this).addClass(ClassName.PREV_TAB);
                $(this).next().removeClass(ClassName.PREV_TAB);
            }
        });
        var finalTab = $wrapper.find(Selector.PREV_TAB).prev().length;

        if (finalTab === 0) {
            var lastTableft = $wrapper.find(Selector.PREV_TAB).offset().left;
            var NewScrollAmount = $wrapperLeft - lastTableft;
            $wrapper.animate({ scrollLeft: '-=' + NewScrollAmount });
            $(event.currentTarget).fadeOut('slow');
        }
        else {
            $wrapper.animate({ scrollLeft: '-=' + $tabSetLeft });
        }
        $(event.currentTarget).parents(Selector.scroll_TAB).find(Selector.SCROLL_RIGHT).fadeIn('slow');
    }
    function onUlLiClick(event) {
        var $this = event.data.param1;
        var $wrapper = $(event.target).closest(Selector.SCROLL_CONTAINER);
        var activeLeft = $(event.target).offset().left;
        var activeRight = $(event.target).offset().left + $(event.target).outerWidth();
        var $navCotainer = $this.outerWidth();
        var $wrapperRight = $this.offset().left + $navCotainer;
        var $buttonWidth = $(Selector.SCROLL_RIGHT).outerWidth();
        var $wrapperLeft = $this.offset().left;
        var cuttRight = $wrapperRight - $buttonWidth;
        var cuttleft = $wrapperLeft + $buttonWidth;
        if (activeLeft < cuttleft && activeRight > cuttleft) {

            var setLeft = $wrapperLeft - activeLeft + $buttonWidth;
            $wrapper.animate({ scrollLeft: '-=' + setLeft });
            $(event.target).parents(Selector.scroll_TAB).find(Selector.SCROLL_RIGHT).fadeIn('slow');
        }
        if (activeLeft < cuttRight && activeRight > cuttRight) {
            var setRight = activeRight - $wrapperRight + $buttonWidth;
            $wrapper.animate({ scrollLeft: '+=' + setRight });
            $(event.target).parents(Selector.scroll_TAB).find(Selector.SCROLL_LEFT).fadeIn('slow');
        }
    }
    var scrollTab = function () {
        _inherits(scrollTab, commons);
        function scrollTab(options) {
            $(window).unbind("resize");
			$(scrollTab.prototype.attachParentSelector(Selector.PARENT_SELECTOR, Selector.scroll_TAB)).each(function () {
                var $this = $(this);
                if (options !== undefined && options.scroll !== null && (options.scroll === true || options.scroll === "true")) {
                    $this.addClass(ClassName.SCROLL);
                } else {
                    $this.removeClass(ClassName.SCROLL);
                    if (options !== undefined && $this.attr("scroll") !== undefined && $this.attr("scroll").toLowerCase() === "true") {
                        $this.attr("scroll", "false");
                    }
                    if ($this.find(".nav.nav-tabs").parent().attr("class").split(" ").indexOf(ClassName.SCROLL_CONTAINER) > -1) {
                        $this.find(".nav.nav-tabs").unwrap();
                        $this.find(Selector.ACTIVE_BAR).remove();
                        $this.find(Selector.SCROLL_LEFT).remove();
                        $this.find(Selector.SCROLL_RIGHT).remove();
                    }
                }
                if ($this.attr("scroll") !== undefined && $this.attr("scroll").toLowerCase() === "true") {
                    $this.addClass(ClassName.SCROLL);
                }
                if ($this.attr("class").split(" ").indexOf(ClassName.SCROLL) > -1) {
                    if ($this.find(".nav.nav-tabs").parent().attr("class").split(" ").indexOf(ClassName.SCROLL_CONTAINER) < 0) {
                        $this.find(".nav.nav-tabs").wrap(Template.SCROLL_CONTAINER);
                        $this.find(Selector.SCROLL_CONTAINER).append(Template.ACTIVE_BAR_DIV);
                        $this.find(Selector.SCROLL_CONTAINER).before(Template.SCROLL_LEFT);
                        $this.append(Template.SCROLL_RIGHT);
                    }
                } else {
                    if ($this.find(Selector.ACTIVE_BAR).length === 0) {
                        $this.find(".nav.nav-tabs").before(Template.ACTIVE_BAR_DIV);
                    }
                }
                appendulwidth($this);
                reAdjust($this);
                activeTabCenter($this);
                sliderLoad($this);
                $this.find(Selector.SCROLL_RIGHT).off("click");
                $this.find(Selector.SCROLL_LEFT).off("click");
				$this.find(Selector.SCROLL_RIGHT).click({ param1: $this }, onscrollTabScrollRightClick);
                $this.find(Selector.SCROLL_LEFT).click({ param1: $this }, onscrollTabScrollLeftClick);
                $this.find(Selector.UL_LI).click({ param1: $this }, onUlLiClick);
                $(window).resize({ param1: $this }, onResizeWindow);
            });
        }
        return scrollTab;
    } ();
    var plugInFunction = function (options) {
        if (this.selector !== "") {
            Selector.PARENT_SELECTOR = this.selector;
        }
        new scrollTab(options);
    };
	$.fn[NAME] = plugInFunction;
    return scrollTab;
	
} (jQuery)();




$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:4,
            nav:true,
            loop:true
        }
    }
})