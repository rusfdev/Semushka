const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}

const $wrapper = document.querySelector('.wrapper');

document.addEventListener("DOMContentLoaded", function() {
  //set scrollbar width
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollLock.getPageScrollBarWidth()}px`);
  
  CustomInteractionEvents.init();
  Modal.init();
  Nav.init();
  Header.init();

  calculator();
  buy_box();
  input_file();
  header_search();

  //Banner sliders
  document.querySelectorAll('.home-screen-banner').forEach($this => {
    new BannerSlider($this).init();
  })
  //Product sliders
  document.querySelectorAll('.items-slider').forEach($this => {
    new ItemsSlider($this).init();
  })
  //Image sliders
  document.querySelectorAll('.image-slider').forEach($this => {
    new ImageSlider($this).init();
  })
  //toggle
  document.querySelectorAll('[data-toggle="parent"]').forEach($this => {
    new ToggleElement($this).init();
  })
  //select
  document.querySelectorAll('.select').forEach($this => {
    new SlimSelect({
      select: $this,
      showSearch: false,
      showContent: 'down'
    })
  })
  //tabs
  document.querySelectorAll('[data-tabs="parent"]').forEach($this => {
    new TabsElement($this).init();
  })
  //Product Slider
  document.querySelectorAll('.product-preview-slider').forEach($this => {
    new ProductPreviewSlider($this).init();
  })
  //Parallax Product Slider
  document.querySelectorAll('.parallax-product-slider').forEach($this => {
    new ParallaxProductSlider($this).init();
  })

  //mask
  Inputmask({
    mask: "8 (999) 999-99-99",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('[data-phone]'); //validation events
});

const CustomInteractionEvents = Object.create({
  targets: {
    value: 'a, button, label, [data-custom-interaction], .ss-single-selected, .ss-option'
  },
  touchEndDelay: {
    value: 100
  }, 
  init() {
    this.events = (event) => {
      let $targets = [];
      $targets[0] = event.target!==document?event.target.closest(this.targets.value):null;
      let $element = $targets[0], i = 0;
  
      while($targets[0]) {
        $element = $element.parentNode;
        if($element!==document) {
          if($element.matches(this.targets.value)) {
            i++;
            $targets[i] = $element;
          }
        } 
        else {
          break;
        }
      }
  
      //touchstart
      if(event.type=='touchstart') {
        this.touched = true;
        if(this.timeout) clearTimeout(this.timeout);
        if($targets[0]) {
          for(let $target of $targets) $target.setAttribute('data-touch', '');
        }
      } 
      //touchend
      else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
        this.timeout = setTimeout(() => {this.touched = false}, 500);
        if($targets[0]) {
          setTimeout(()=>{
            for(let $target of $targets) {
              $target.removeAttribute('data-touch');
            }
          }, this.touchEndDelay.value)
        }
      } 
      //mouseenter
      if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
        $targets[0].setAttribute('data-hover', '');
      }
      //mouseleave
      else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
        $targets[0].removeAttribute('data-click');
        $targets[0].removeAttribute('data-hover');
      }
      //mousedown
      if(event.type=='mousedown' && !this.touched && $targets[0]) {
        $targets[0].setAttribute('data-click', '');
      } 
      //mouseup
      else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
        $targets[0].removeAttribute('data-click');
      }
    }
    document.addEventListener('touchstart',  this.events);
    document.addEventListener('touchend',    this.events);
    document.addEventListener('mouseenter',  this.events, true);
    document.addEventListener('mouseleave',  this.events, true);
    document.addEventListener('mousedown',   this.events);
    document.addEventListener('mouseup',     this.events);
    document.addEventListener('contextmenu', this.events);
  }
})
function calculator() {

  let events = (event) => {
    let $target = event.target.closest('.count-calculator__button');

    if($target) {
      let $input = $target.parentNode.querySelector('input');

      if($target.classList.contains('count-calculator__button_minus')) {
        
        //
        //if(+$input.value <= 1) {
         // let $parent = $target.closest('.buy-box');
         // $parent.classList.remove('is-active');
        //}


        $input.value = Math.max(+$input.value - 1, 1);
      
      } else {
        $input.value = +$input.value + 1;
      }
    }
  }

  let input = (event) => {
    let $target = event.target.closest('.count-calculator__input');

    if($target) {
      $target.value = Math.max(+$target.value, 1)
    }
  }

  document.addEventListener('click', events);
  document.addEventListener('input', input);
}
function header_search() {
  let $open = document.querySelector('.header__search-open-button'),
      $close = document.querySelector('.header__search-close-button'),
      $search = document.querySelector('.header-search');

  $open.addEventListener('click', () => {
    $search.classList.add('is-active');
  })

  $close.addEventListener('click', () => {
    $search.classList.remove('is-active');
  })
}

function buy_box() {
  let events = (event) => {
    let $target = event.target.closest('.buy-box__button .button');

    if($target) {
      let $parent = $target.closest('.buy-box');
      $parent.classList.add('is-active');
    }
  }

  document.addEventListener('click', events);
}

function input_file() {
  let events = (event) => {
    let $target = event.target.closest('.input-file');

    if($target) {

      let $input = $target.querySelector('input'),
          $text = $target.querySelector('.input-file__text'),
          value = $input.value.split('\\');

      $text.innerHTML = value[value.length - 1]

    }
  }

  document.addEventListener('change', events);
}

class ItemsSlider {
  constructor($parent) {
    this.$parent = $parent
  }

  init() {
    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$prev = this.$parent.querySelector('.swiper-button-prev');
    this.$next = this.$parent.querySelector('.swiper-button-next');
    this.$pagination = this.$parent.querySelector('.swiper-pagination');

    let slides_count = +this.$slider.getAttribute('data-slides') || 1,
        slides_sm_count = +this.$slider.getAttribute('data-sm-slides') || slides_count,
        slides_md_count = +this.$slider.getAttribute('data-md-slides') || slides_sm_count,
        slides_lg_count = +this.$slider.getAttribute('data-lg-slides') || slides_md_count,
        slides_xl_count = +this.$slider.getAttribute('data-xl-slides') || slides_lg_count;

    this.swiper = new Swiper(this.$slider, {
      touchStartPreventDefault: false,
      slidesPerView: slides_count,
      centerInsufficientSlides: true,
      speed: 500,
      pagination: {
        el: this.$pagination,
        clickable: true,
        bulletElement: 'button'
      },
      navigation: {
        prevEl: this.$prev,
        nextEl: this.$next
      },
      breakpoints: {
        [breakpoints.xl]: {
          slidesPerView: slides_xl_count
        },
        [breakpoints.lg]: {
          slidesPerView: slides_lg_count
        },
        [breakpoints.md]: {
          slidesPerView: slides_md_count
        },
        [breakpoints.sm]: {
          slidesPerView: slides_sm_count
        }
      }
    });


  }
}

class ImageSlider {
  constructor($parent) {
    this.$parent = $parent
  }

  init() {
    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$pagination = this.$parent.querySelector('.swiper-pagination');

    this.swiper = new Swiper(this.$slider, {
      touchStartPreventDefault: false,
      slidesPerView: 1,
      speed: 500,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true
      },
      pagination: {
        el: this.$pagination,
        clickable: true,
        bulletElement: 'button'
      }
    });


  }
}

class ToggleElement {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$trigger = this.$parent.querySelector('[data-toggle="trigger"]');
    this.$block = this.$parent.querySelector('[data-toggle="content"]');

    this.$trigger.addEventListener('click', () => {
      let state = this.$parent.classList.contains('is-active');

      if(!state) this.open();
      else this.close();
    })
    
  }

  open() {
    for(let $el of [this.$parent, this.$trigger, this.$block]) {
      $el.classList.add('is-active')
    }

    //if group
    let $group = this.$parent.closest('[data-toggle="group"]');
    if ($group) {
      let $childrens = $group.querySelectorAll('[data-toggle="parent"]');

      for (let $parent of $childrens) {
        if ($parent !== this.$parent) {
          let $trigger = $parent.querySelector('[data-toggle="trigger"]');
          let $block = $parent.querySelector('[data-toggle="content"]');

          for(let $el of [$parent, $trigger, $block]) {
            $el.classList.remove('is-active');
          }

          break;
        }
      }


    }
  }

  close() {
    for(let $el of [this.$parent, this.$trigger, this.$block]) {
      $el.classList.remove('is-active')
    }
  }
}

class BannerSlider {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$pagination = this.$parent.querySelector('.swiper-pagination');

    this.autoplay_interval = this.$parent.getAttribute('data-auto-play') || 5000;

    this.swiper = new Swiper(this.$slider, {
      touchStartPreventDefault: false,
      slidesPerView: 1,
      speed: 500,
      autoplay: {
        delay: this.autoplay_interval,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true
      },
      pagination: {
        el: this.$pagination,
        clickable: true,
        bulletElement: 'button'
      }
    });
  }
}

class TabsElement {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$links = this.$parent.querySelectorAll('[data-tabs="link"]');
    this.$blocks = this.$parent.querySelectorAll('[data-tabs="block"]');

    this.set = (index) => {
      this.$links[index].classList.add('is-active');
      this.$blocks[index].classList.add('is-active');
      
      if(this.index!==undefined) {
        this.$links[this.index].classList.remove('is-active');
        this.$blocks[this.index].classList.remove('is-active');
      }
  
      
      
      //gsap.fromTo(this.$blocks[index], {autoAlpha:0}, {autoAlpha:1, duration:0.5, ease:'power2.out'})
      
      this.index = index;
    }

    this.$links.forEach(($this, index) => {
      if($this.classList.contains('is-active')) {
        this.index = index;
      }
      $this.addEventListener('click', () => {
        if(this.index !== index) this.set(index);
      })
    })

  }
}

class ProductPreviewSlider {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$small_images = this.$parent.querySelectorAll('.product-preview-slider__small-image');

    this.slider = new Swiper(this.$slider, {
      touchStartPreventDefault: false,
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      speed: 500,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true
      }
    });

    if(this.$small_images.length>1) {

      this.$small_images[0].classList.add('is-active');
      this.slider.on('slideChange', (event)=> {
        this.$small_images.forEach($this => {
          $this.classList.remove('is-active')
        })
        this.$small_images[event.realIndex].classList.add('is-active');
      })

      this.$small_images.forEach(($this, index)=>{
        $this.addEventListener('mouseenter', ()=> {
          this.slider.slideTo(index);
        })
        $this.addEventListener('click', ()=> {
          this.slider.slideTo(index);
        })
      })
      
    }

  }
}

const Modal = {
  init: function () {
    gsap.registerEffect({
      name: "modal",
      effect: ($modal, $content) => {
        let anim = gsap.timeline({paused: true})
          .fromTo($modal, {autoAlpha: 0}, {autoAlpha:1, duration:0.5})
          .fromTo($content, {y: 20}, {y:0, duration:0.5, ease:'power2.out'}, `-=0.5`)
        return anim;
      },
      extendTimeline: true
    });

    document.addEventListener('click', (event) => {
      let $open = event.target.closest('[data-modal="open"]'),
          $close = event.target.closest('[data-modal="close"]'),
          $wrap = event.target.closest('.modal'),
          $block = event.target.closest('.modal-block');

      //open
      if ($open) {
        event.preventDefault();
        let $modal = document.querySelector(`${$open.getAttribute('href')}`),
            video = $open.getAttribute('data-video');

        this.open($modal, video);
      }
      //close 
      else if ($close || (!$block && $wrap)) {
        this.close();
      }
    })
  },
  open: function ($modal, video) {
    let open = ()=> {
      scrollLock.disablePageScroll();
      $modal.classList.add('active');
      //animation
      let $content = $modal.querySelector('.modal-block')
      this.animation = gsap.effects.modal($modal, $content);
      this.animation.play();
      this.$active = $modal;
      //play video
      if(video && $modal.querySelector('iframe')) {
        $modal.querySelector('iframe').setAttribute('src', video);
      } 
    }
    if($modal) {
      if(this.$active) this.close(open);
      else open();
    }
  },
  close: function (callback) {
    if (this.$active) {
      this.animation.timeScale(2).reverse().eventCallback('onReverseComplete', ()=> {
        delete this.animation;
        scrollLock.enablePageScroll();
        this.$active.classList.remove('active');

        //remove video
        if(this.$active.querySelector('iframe')) {
          this.$active.querySelector('iframe').setAttribute('src', '');
        } 

        delete this.$active;
        if (callback) callback();
      })
    }
  }
}

class Filter {
  constructor($element) {
    this.$element = $element;
  }
  init() {
    this.$open = document.querySelector('.catalogue-filter-open');
    this.$close = document.querySelectorAll('.catalogue-filter-close, [data-filter-close]');

    this.state = () => {
      return this.$element.classList.contains('is-active');
    }

    this.open = () => {
      this.$element.classList.add('is-active');
      scrollLock.disablePageScroll();

    }

    this.close = () => {
      this.$element.classList.remove('is-active');
      scrollLock.enablePageScroll();
    }

    window.addEventListener('resize', () => {
      if( this.state() && window.innerWidth >= breakpoints.lg ) {
        this.close();
      }
    })

    this.$open.addEventListener('click', () => {
      if( !this.state() ) this.open();
    })
    
    this.$close.forEach($this => {
      $this.addEventListener('click', () => {
        if( this.state() ) this.close();
      })
    })

  }
}

const Nav = {
  init: function() {
    this.$element = document.querySelector('.mobile-navigation');
    this.$open = document.querySelector('.nav-open-button');
    this.$close = document.querySelector('.mobile-navigation__close-button');
    
    this.state = () => {
      return this.$element.classList.contains('is-active');
    }

    this.open = () => {
      scrollLock.disablePageScroll();
      this.$element.classList.add('is-active');
    }

    this.close = () => {
      scrollLock.enablePageScroll();
      this.$element.classList.remove('is-active');
    }

    this.$open.addEventListener('click', () => {
      if(!this.state()) this.open();
    })

    this.$close.addEventListener('click', () => {
      if(this.state()) this.close();
    })

    document.addEventListener('click', (event) => {
      let $target = event.target.closest('.mobile-navigation') && !event.target.closest('.mobile-navigation__element');
      if($target && this.state()) {
        this.close();
      }
    })

  }
}

class ParallaxProductSlider {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.x_position = 0;
    this.x_value = 0;

    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$pagination = this.$parent.querySelector('.swiper-pagination');
    this.$background = this.$parent.querySelector('.parallax-product-slider__background');

    this.slider = new Swiper(this.$slider, {
      touchStartPreventDefault: false,
      slidesPerView: 2,
      enabled: true,
      speed: 500,
      pagination: {
        el: this.$pagination,
        clickable: true,
        bulletElement: 'button'
      },
      breakpoints: {
        [breakpoints.lg]: {
          slidesPerView: 'auto'
        },
        [breakpoints.md]: {
          slidesPerView: 3
        }
      }
    });

    this.mousemove = (event) => {
      let w = this.$slider.getBoundingClientRect().width,
          x = this.$slider.getBoundingClientRect().left,
          val1 = (event.clientX - x) / w;
      
      this.x_value = Math.min(1, Math.max(0, val1));
    }

    this.checkPosition = () => {

      if(window.innerWidth >= breakpoints.lg) {

        this.x_position += (this.x_value - this.x_position) * 0.1;
      
        //parallax
        let x = 100 - (this.$parent.getBoundingClientRect().width/this.$background.getBoundingClientRect().width * 100);
        this.$background.style.transform = `translate3d(${-x * this.x_position}%, 0, 0)`;
        //scroll
        this.slider.setProgress(this.x_position, 0);

      }
    
      requestAnimationFrame(this.checkPosition);
    }

    if(device.desktop()) {
      document.addEventListener('mousemove', this.mousemove);
      this.checkPosition();
    }
  }
}

const Header = {
  $element: document.querySelector('.header'),

  init: function () {

    let check = () => {
      let y = $wrapper.getBoundingClientRect().y,
          fixed = this.$element.classList.contains('header_fixed');

      if (y <= 0 && !fixed) this.$element.classList.add('header_fixed');
      else if (y > 0 && fixed) this.$element.classList.remove('header_fixed');
    }

    window.addEventListener('scroll', check)
    check();
  }
}

function sort(id) {
	var url = window.location.href.split("?")[0];
	var count = 0;
	var name = "";
	$(".kombox-checked").find("input").each(function (index) {
			
           
				if (count < 1 ) {
					url = url + 'filter';
				}                
				count = count + 1;
				if (name != $(this).attr("name")) {
					url = url + '/';
					url = url + $(this).attr("name") + '-' + $(this).val();
				} else {
					url = url + '-or-';
					url = url + $(this).val();
				}				
				name = $(this).attr("name");
				
            
	});
	if (count > 0 ) {
		url = url + '/';
	}	
	url = url + id;
	window.location.href = url;
}

$(function() {
    var load_more = false;

    $(document).on("click", "#ajax_next_page", function(e) {
        e.preventDefault();
        if(load_more)
            return false;
        var ajax_url = $('.pagination__link').last().attr("href") != '#' ? $('.pagination__link').last().attr("href") : undefined;
        
		if (ajax_url) {
			load_more = true;
      var filter = $('#kombox-filter form').serializeArray(),
        postData = {};
      if(filter.length > 0 && filter.length < 2)
        postData = {'tag': filter[0].value};
      else if(filter.length > 1)
        filter.forEach(function callback(element, index, array) {
          postData['tag['+index+']'] = element.value;
        });
      if(filter.length > 0)
        var isFilter = true;
      postData['IS_AJAX'] = 'Y';
      postData['filter_ajax'] = 'y';
        // filter.forEach(element => postData'filter[]': element.value));/
			$.ajax({
				url: ajax_url,
				type: "POST",
				data: postData,
				success: function(data) {
					$(".pagination").hide();
          $(".pagination")[0].innerHTML = $(data)[2].innerHTML;
					$(".blog-grid").append($(data)[0].innerHTML);
					// $("#ajax_next_page").remove();
					if (!$('.pagination__link').last().attr("href") || $('.pagination__link').last().attr("href") == '#') {
						$("#ajax_next_page").remove();
					}
					load_more = false;
				}
			});
		} else {
			$("#ajax_next_page").remove();
		}
        
    });
});