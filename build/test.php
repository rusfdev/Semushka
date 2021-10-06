<header class="header" data-scroll-lock-fill-gap>
        <div class="container header__container">
          <div class="header__left">
		  <a class="logo header__logo" href="/">
                                <?$APPLICATION->IncludeComponent(
                                    "bitrix:main.include",
                                    "",
                                    Array(
                                        "AREA_FILE_SHOW" => "file",
                                        "AREA_FILE_SUFFIX" => "inc",
                                        "EDIT_TEMPLATE" => "",
                                        "PATH" => "/bitrix/templates/semushka2/include/".LANGUAGE_ID."/parts/header_logo.php"
                                    ),
	false
                                );?>
                            </a>
		  
		  
		 
            <nav class="header-nav">
			 <?$APPLICATION->IncludeComponent(
	"bitrix:menu", 
	"header_new", 
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "header",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "A",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "header",
		"USE_EXT" => "Y",
		"COMPONENT_TEMPLATE" => "header_new"
	),
	false
);?>
            
            </nav>
          </div>
          <div class="search-block header-search">
			<?$APPLICATION->IncludeComponent("bitrix:search.form", ".default", Array(
	"USE_SUGGEST" => "N",	// Показывать подсказку с поисковыми фразами
		"PAGE" => "#SITE_DIR#search/index.php",	// Страница выдачи результатов поиска (доступен макрос #SITE_DIR#)
	),
	false
);?> 
              
              <button class="header__search-close-button close-button" aria-label="close search"></button>
            </div>
          <div class="header__right"><div class="header__phone"><?$APPLICATION->IncludeComponent(
                                    "bitrix:main.include",
                                    "",
                                    Array(
                                        "AREA_FILE_SHOW" => "file",
                                        "AREA_FILE_SUFFIX" => "inc",
                                        "EDIT_TEMPLATE" => "",
                                        "PATH" => "/bitrix/templates/semushka2/include/phone_h1.php"
                                    ),
	false
                                );?><?$APPLICATION->IncludeComponent(
                                    "bitrix:main.include",
                                    "",
                                    Array(
                                        "AREA_FILE_SHOW" => "file",
                                        "AREA_FILE_SUFFIX" => "inc",
                                        "EDIT_TEMPLATE" => "",
                                        "PATH" => "/bitrix/templates/semushka2/include/zakaz_kn.php"
                                    ),
	false
                                );?>
								
								</div>
								<?$APPLICATION->IncludeComponent(
                                    "bitrix:main.include",
                                    "",
                                    Array(
                                        "AREA_FILE_SHOW" => "file",
                                        "AREA_FILE_SUFFIX" => "inc",
                                        "EDIT_TEMPLATE" => "",
                                        "PATH" => "/bitrix/templates/semushka2/include/zakaz_pr.php"
                                    ),
	false
                                );?>
								
            <ul class="header__small-buttons">
			
              <li class="header__small-buttons-item">
			  <?if ($USER->IsAuthorized()):
			$name = trim($USER->GetFullName());
			if (! $name)
				$name = trim($USER->GetLogin());
			if (mb_strlen($name) > 15)
				$name = mb_substr($name, 0, 12).'...';
			?>
			  <a class="header__small-button link" href="/personal/">
			  <?else:?>
			  <a class="header__small-button link" href="#vkhod" data-modal="open">
			  <?endif?> 
                  <svg class="icon">
                    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/img/icons/sprite.svg#user"></use>
                  </svg></a></li>
				 
				   <li class="header__small-buttons-item">
				   <?$APPLICATION->IncludeComponent(
	"gm:sale.basket.basket.line", 
	"main", 
	array(
		"HIDE_ON_BASKET_PAGES" => "Y",
		"PATH_TO_AUTHORIZE" => "",
		"PATH_TO_BASKET" => SITE_DIR."personal/cart/",
		"PATH_TO_ORDER" => SITE_DIR."personal/order/make/",
		"PATH_TO_PERSONAL" => SITE_DIR."personal/",
		"PATH_TO_PROFILE" => SITE_DIR."personal/",
		"PATH_TO_REGISTER" => SITE_DIR."login/",
		"POSITION_FIXED" => "N",
		"SHOW_AUTHOR" => "N",
		"SHOW_DELAY" => "N",
		"SHOW_EMPTY_VALUES" => "Y",
		"SHOW_IMAGE" => "Y",
		"SHOW_NOTAVAIL" => "N",
		"SHOW_NUM_PRODUCTS" => "Y",
		"SHOW_PERSONAL_LINK" => "N",
		"SHOW_PRICE" => "Y",
		"SHOW_PRODUCTS" => "Y",
		"SHOW_REGISTRATION" => "N",
		"SHOW_SUMMARY" => "Y",
		"SHOW_TOTAL_PRICE" => "N",
		"COMPONENT_TEMPLATE" => "main",
		"MAX_IMAGE_SIZE" => "70"
	),
	false
);?><script type="text/javascript">
   /* BX.ready(function(){
         BX.addCustomEvent('onAjaxSuccess', function(e,dd){
            if (dd.url == "/bitrix/components/bitrix/sale.basket.basket/ajax.php")
            {
               //определяем текучий адрес страницы
               var url = window.location.href.split('?')[0];
               BX.ajax({
                  url: url,
                  method: 'POST',
                  data: {'SCODER_AJAX':'Y'},
                  onsuccess: function(data){
                     $("div.bx-basket").html(data);
                  },
               });
            }
         });
   }); */

</script>
          </li>
              <li class="header__small-buttons-item">
			   <? if (LANGUAGE_ID == "ru"): ?>
                                <a href="//en.devgm.ru" class="header__small-button link"><span>en</span></a>
                            <? else: ?>
                                <a href="/" class="header__small-button link"><span>ru</span></a>
                            <? endif; ?>
			  
			
              <li class="header__small-buttons-item header__search-open-item">
                <button class="header__small-button link header__search-open-button" aria-label="open nav">
                  <svg class="icon">
                    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/img/icons/sprite.svg#loupe"></use>
                  </svg>
                </button>
              </li>
              <li class="header__small-buttons-item header__nav-open-item">
                <button class="header__small-button nav-open-button link" aria-label="open search"><span></span><span></span><span></span></button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <nav class="mobile-navigation">
        <div class="mobile-navigation__element">
          <div class="mobile-navigation__head"> <a class="logo mobile-navigation__logo" href="./"><img src="<?=SITE_TEMPLATE_PATH?>/img/logos/logo.svg" alt="logo"></a>
            <button class="close-button mobile-navigation__close-button" aria-label="filter close"></button>
          </div>
          <div class="mobile-navigation__container" data-scroll-lock-scrollable>
		   <?$APPLICATION->IncludeComponent(
	"bitrix:menu", 
	"header_new_mobile", 
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "header",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "A",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "header",
		"USE_EXT" => "Y",
		"COMPONENT_TEMPLATE" => "header_new_mobile"
	),
	false
);?>
       
            <!-- <div class="mobile-navigation__bottom">
              <div class="mobile-navigation__phone">
                <?$APPLICATION->IncludeComponent(
                  "bitrix:main.include",
                  "",
                  Array(
                      "AREA_FILE_SHOW" => "file",
                      "AREA_FILE_SUFFIX" => "inc",
                      "EDIT_TEMPLATE" => "",
                      "PATH" => "/bitrix/templates/semushka2/include/phone_h2.php"
                  ),
                  false
                );?>
              </div>
							<a class="button button_style-3" href="#zapros-prajs-lista" data-modal="open"><span>Запрос прайс-листа </span></a>
            </div> -->

            <div class="mobile-navigation__bottom">
              <div class="mobile-navigation__bottom-item"><a class="button button_style-3" href="#zapros-prajs-lista" data-modal="open"><span>Запрос прайс-листа</span></a></div>
              <div class="mobile-navigation__bottom-item">
                <h6 class="mobile-navigation__bottom-item-title">Телефон</h6><a class="link" href="tel:74991103044">+7 (499) 110 30 44</a>
              </div>
              <div class="mobile-navigation__bottom-item">
                <h6 class="mobile-navigation__bottom-item-title">Почта</h6><a class="link" href="mailto:opt@semushka-m.ru">opt@semushka-m.ru</a>
              </div>
            </div>

          </div>
        </div>
      </nav>
	  
	     <main class="main">
		 <?if (CSite::InDir("/index.php"))
		 {
		 }
		 else
		 {?>

	    <?$APPLICATION->IncludeComponent(
	"bitrix:breadcrumb", 
	"breadcrumb", 
	array(
		"PATH" => "",
		"SITE_ID" => "s1",
		"START_FROM" => "0",
		"COMPONENT_TEMPLATE" => "breadcrumb"
	),
	false
);
		 }?>