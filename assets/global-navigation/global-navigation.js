/*jshint jquery:true */


(function(window, undefined){
  'use strict';

  var Elements = {

    globalNav          : '.global-nav',
    navBar             : '.nav-bar',
    searchButton       : '#search-button',
    searchMenu         : '.search-bar',
    searchInput        : '.search-box',
    accountButton      : '.show-account',
    accountMenu        : '.account-dropdown',
    quicklinkButton    : '.quicklink-button',
    quicklinkMenu      : '.mega-dropdown',
    mobileButton       : '.show-menu',
    mobileMenu         : '.mobile-navigation',
    accordionButton    : '.mobile-navigation__title',
    accordionMenu      : '.global-nav-menu__accordion-body',
    indicatorArrow     : '.indicator',
    mobileNavTemplate  : '#mobile-nav-template',
    mobileNavContainer : '#mobile-nav-container',
    mobileSearch       : '.mobile-search',

    buttonToggle    : 'button-on',
    accordionToggle : 'accordion-open',
    iconMoreToggle  : 'icon-more',
    iconLessToggle  : 'icon-less',

    buttonClasses : function() {
      return [
        this.quicklinkButton,
        this.accountButton,
        this.searchButton
      ].join(',');
    }, 

    menuClasses: function() {
      return [
        this.quicklinkMenu,
        this.accountMenu,
        this.searchMenu
      ].join(',');
    },

    searchNode: function() {
      return $(this.searchButton).closest('a');
    },

    quicklinkNode: function() {
      return $(this.quicklinkButton).closest('a');
    },

    accountNode: function() {
      return $(this.accountButton).closest('a');
    },

    toggleClass: function() {
      return '.' + Elements.buttonToggle;
    }

  };


  var Toggle = {

    search: function() {
      this._buttonClass = Elements.searchButton;
      this._menuClass   = Elements.searchMenu;
      this._focusClass  = Elements.searchInput;

      this._toggleSearch();
    },

    account: function() {
      this._buttonClass = Elements.accountButton;
      this._menuClass   = Elements.accountMenu;

      this._toggleAccount();
    },

    quicklink: function($menuItem) {
      this._buttonClass = $menuItem.find(Elements.quicklinkButton);
      this._menuClass   = '#' + $menuItem.attr('aria-controls');

      this._toggle();
    },

    _toggle: function() {
      var currentButton = $(Elements.toggleClass()).get(0),
          targetButton  = $(this._buttonClass).get(0);

      if (currentButton === targetButton) {
        Navigation.startAnimating();
        this._closeMenu();
      } else {
        this._openMenu();
      }
    },

    _toggleAccount: function() {
      var currentButton = $(Elements.toggleClass()).get(0),
          targetButton  = $(this._buttonClass).get(0);

      if (currentButton === targetButton) {
        Navigation.startAnimating();
        this._closeAccountMenu();
      } else {
        this._openAccountMenu();
      }
    },

    _toggleSearch: function() {
      var currentButton = $(Elements.toggleClass()).get(0),
          targetButton  = $(this._buttonClass).get(0);

      if (currentButton === targetButton) {
        Navigation.startAnimating();
        this._closeSearchMenu();
      } else {
        this._openSearchMenu();
      }
    },

    _openMenu: function() {
      var transition   = this._menuTransition(),
          navBarHeight = $(Elements.navBar).height(),
          menuHeight   = $(this._menuClass).height(),
          targetHeight = navBarHeight + menuHeight;

      this._clearButtons();
      this._clearMenus();
      this._hasOpenMenu = true;

      $(this._menuClass).show();
      $(this._buttonClass).addClass(Elements.buttonToggle);
      $(this._buttonClass).closest('a').attr('aria-expanded', true);
      $(Elements.globalNav)[transition]({ 'height' : targetHeight }, function(){
        $(Toggle._focusClass).focus();
        Navigation.stopAnimating();
      });
    },

    _openAccountMenu: function() {
      var transition = this._hasOpenMenu ? 'show' : 'slideDown',
          navBarHeight = $(Elements.navBar).height();

      this._overlayMenu = false;
      this._clearButtons();
      this._clearMenus();
      this._hasOpenMenu = true;

      $(Elements.globalNav).css({'overflow':'visible', 'height':navBarHeight});
      $(Elements.accountMenu)[transition](function(){
        Navigation.stopAnimating();
      });
      $(Elements.accountButton).closest('a').attr('aria-expanded', true);
      $(Elements.accountButton).addClass(Elements.buttonToggle);
    },

    _openSearchMenu: function() {
      var transition   = this._menuTransition(),
          navBarHeight = $(Elements.navBar).height(),
          menuHeight   = $(this._menuClass).height(),
          targetHeight = navBarHeight + menuHeight;

      this._clearButtons();
      this._clearMenus();
      this._hasOpenMenu = true;

      if (this._isMobile()) {
        $(Elements.mobileSearch).hide();
      }

      $(this._menuClass).show();
      $(this._buttonClass).addClass(Elements.buttonToggle);
      $(this._buttonClass).closest('a').attr('aria-expanded', true);

      if (this._isMobile()) {
        $(Elements.mobileSearch).slideDown();
      } else {
        $(Elements.globalNav)[transition]({ 'height' : targetHeight }, function(){
          $(Toggle._focusClass).focus();
          Navigation.stopAnimating();
        });
      }
    },

    _closeMenu: function() {
      var navBarHeight = $(Elements.navBar).height();

      this._clearButtons();

      $(Elements.globalNav).animate({ 'height' : navBarHeight }, function(){
        Toggle._clearMenus();
        Navigation.stopAnimating();
      });
    },

    _closeAccountMenu: function() {
      this._clearButtons();
      $(Elements.accountMenu).slideUp(function(){
        $(Elements.globalNav).css({'overflow':'hidden'});
        Toggle._clearMenus();
        Navigation.stopAnimating();
      });
    },

    _closeSearchMenu: function() {
      var navBarHeight = $(Elements.navBar).height();

      this._clearButtons();
      
      if (this._isMobile()) {
        $(Elements.mobileSearch).slideUp();
      } else {
        $(Elements.globalNav).animate({ 'height' : navBarHeight }, function(){
          Toggle._clearMenus();
          Navigation.stopAnimating();
        });
      }
    },

    _clearMenus: function() {
      $(Elements.menuClasses()).each(function(_, element){
        $(element).hide();
      });
    },

    _clearButtons: function() {
      this._hasOpenMenu = false;
      $(Elements.buttonClasses()).each(function(_, element){
        $(element).removeClass(Elements.buttonToggle);
        $(element).closest('a').attr('aria-expanded', false);
      });
    },

    _menuTransition: function() {
      return this._hasOpenMenu ? 'css' : 'animate';
    },

    _isMobile: function() {
      return $(Elements.mobileButton).is(':visible');
    }

  };


  var Navigation = {
    
    init: function() {
      this._bindClick();
      this._bindEnter();
      this._applyRoles();
      this._setNavHeight();

      Accordion.show();
      Accordion.bind();
    },

    _click: function() {
      if (this._isAnimating) {
        this._clearEvent();
        return;
      }

      if (!Toggle._hasOpenMenu) {
        this.startAnimating();
      }

      this._captureSearchClick();
      this._captureQuicklinkClick();
      this._captureAccountClick();
    },

    _captureSearchClick: function() {
      this._capture(Elements.searchNode(), 'search');
    },

    _captureQuicklinkClick: function() {
      this._capture(Elements.quicklinkNode(), 'quicklink');
    },

    _captureAccountClick: function() {
      this._capture(Elements.accountNode(), 'account');
    },

    _capture: function(nodeList, method) {
      if (nodeList.filter(this._findLink()).length) {
        this._clearEvent();
        Toggle[method](this._findLink());
      }
    },

    _clearEvent: function() {
      this._event.stopPropagation();
      this._event.preventDefault();
    }, 

    _bindClick: function() {
      $(Elements.navBar).on('click', function(event){
        Navigation._event = event;
        Navigation._click();
      });
    },

    _bindEnter: function() {
      $(Elements.globalNav).on('keydown', function(event){
        if (event.which === 13) {
          Navigation._event = event;
          Navigation._click();
        }
      });
    },

    _findLink: function() {
      return $(this._event.target).closest('a');
    },

    _applyRoles: function() {
      $(Elements.buttonClasses()).each(function(_, element){ 
        $(element).closest('a').attr('role', 'button');
      });
    },

    _setNavHeight: function() {
      $(Elements.globalNav).css({
        'height' : $(Elements.globalNav).height()
      });
    },

    startAnimating: function() {
      this._isAnimating = true;
    },

    stopAnimating: function() {
      this._isAnimating = false;
    }

  };


  var Accordion = {

    bind: function() {
      this._bindMenu();
      this._bindSection();
    },

    show: function() {
      var mobileNavHtml = $(Elements.mobileNavTemplate).html();
      $(Elements.mobileNavContainer).html(mobileNavHtml);
    },

    _bindMenu: function() {
      $(Elements.mobileButton).on('click', function(event){
        Accordion._target = $(event.target).closest('a');
        Accordion._toggleMenu();
      });
    },

    _bindSection: function() {
      $(Elements.accordionButton).on('click', function(event){
        Accordion._target = $(event.target).closest('h2');
        Accordion._toggleSection();
      });
    },

    _toggleMenu: function() {
      this._target.toggleClass(Elements.accordionToggle);
      this._clearSections();
      
      $(Elements.mobileMenu).slideToggle();
    },

    _toggleSection: function() {
      this._exclude = this._target.siblings(Elements.accordionMenu);
      this._clearSections();
      this._indicatorToggle();
      this._exclude.slideToggle();
    },

    _clearSections: function() {
      var toClear = $(Elements.accordionButton).not(this._target);

      $(Elements.accordionMenu).not(this._exclude).slideUp();

      toClear.find(Elements.indicatorArrow).removeClass(Elements.iconLessToggle);
      toClear.find(Elements.indicatorArrow).addClass(Elements.iconMoreToggle);
    },

    _indicatorToggle: function() {
      this._target.find(Elements.indicatorArrow).toggleClass(Elements.iconMoreToggle);
      this._target.find(Elements.indicatorArrow).toggleClass(Elements.iconLessToggle);
    }

  };


  window.GlobalNavigation = Navigation;

}(window));
