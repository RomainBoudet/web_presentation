(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//Fermeture du DropDown au click
$(document).ready(function () {

    $('.navbar-nav li a').on('click', function(){
      if(!$( this ).hasClass('dropdown-toggle')){
        $('.navbar-collapse').collapse('hide');
        box.style.transitionDuration = "2s";
      }
    });
  });
  
  //Popup 1
  $( document ).ready(function() {
      $('.projet1').on('click', function () {
        document.getElementById("header").style.filter = " blur(2px)";
        document.getElementById("first-section").style.filter = " blur(2px)";
        document.getElementById("projet").style.filter = " blur(2px)";
        document.getElementById("projets").style.filter = " blur(2px)";
        document.getElementById("resume").style.filter = " blur(2px)";
        document.getElementById("contact").style.filter = " blur(2px)";
        document.getElementById("footer").style.filter = " blur(2px)";
      $('.sliderPop1').show();
      $('.ct-sliderPop-container').addClass('open');
      $('.sliderPop1').addClass('flexslider');
      $('.sliderPop1 .ct-sliderPop-container').addClass('slides');
  
      $('.sliderPop1').flexslider({
      selector: '.ct-sliderPop-container > .ct-sliderPop',
      slideshow: false,
      controlNav: false,
      controlsContainer: '.ct-sliderPop-container'
      });
      });
  
      $('.ct-sliderPop-close' || '.imageBlanche').on('click', function () {
        document.getElementById("header").style.filter = "none";
        document.getElementById("first-section").style.filter = "none";
        document.getElementById("projet").style.filter = "none";
        document.getElementById("projets").style.filter = "none";
        document.getElementById("resume").style.filter = "none";
        document.getElementById("contact").style.filter = "none";
        document.getElementById("footer").style.filter = "none";
      $('.sliderPop1').hide();
      $('.ct-sliderPop-container').removeClass('open');
      $('.sliderPop1').removeClass('flexslider');
      $('.sliderPop1 .ct-sliderPop-container').removeClass('slides');
    });
  });
  
  //Popup 2
  $( document ).ready(function() {
      $('.projet2').on('click', function () {
        document.getElementById("header").style.filter = " blur(2px)";
        document.getElementById("first-section").style.filter = " blur(2px)";
        document.getElementById("projet").style.filter = " blur(2px)";
        document.getElementById("projets").style.filter = " blur(2px)";
        document.getElementById("resume").style.filter = " blur(2px)";
        document.getElementById("contact").style.filter = " blur(2px)";
        document.getElementById("footer").style.filter = " blur(2px)";
      $('.sliderPop2').show();
      $('.ct-sliderPop-container').addClass('open');
      $('.sliderPop2').addClass('flexslider');
      $('.sliderPop2 .ct-sliderPop-container').addClass('slides');
      $('.sliderPop2').flexslider({
      selector: '.ct-sliderPop-container > .ct-sliderPop',
      slideshow: false,
      controlNav: false,
      controlsContainer: '.ct-sliderPop-container'
      });
    });
  
      $('.ct-sliderPop-close').on('click', function () {
        document.getElementById("header").style.filter = "none";
        document.getElementById("first-section").style.filter = "none";
        document.getElementById("projet").style.filter = "none";
        document.getElementById("projets").style.filter = "none";
        document.getElementById("resume").style.filter = "none";
        document.getElementById("contact").style.filter = "none";
        document.getElementById("footer").style.filter = "none";
      $('.sliderPop2').hide();
      $('.ct-sliderPop-container').removeClass('open');
      $('.sliderPop2').removeClass('flexslider');
      $('.sliderPop2 .ct-sliderPop-container').removeClass('slides');
    });
  });
  
  //Popup 3
  $(document).ready(function () {
      $('.projet3').on('click', function () {
        document.getElementById("header").style.filter = " blur(2px)";
        document.getElementById("first-section").style.filter = " blur(2px)";
        document.getElementById("projet").style.filter = " blur(2px)";
        document.getElementById("projets").style.filter = " blur(2px)";
        document.getElementById("resume").style.filter = " blur(2px)";
        document.getElementById("contact").style.filter = " blur(2px)";
        document.getElementById("footer").style.filter = " blur(2px)";
          $('.sliderPop3').show();
          $('.ct-sliderPop-container').addClass('open');
          $('.sliderPop3').addClass('flexslider');
          $('.sliderPop3 .ct-sliderPop-container').addClass('slides');
          $('.sliderPop3').flexslider({
              selector: '.ct-sliderPop-container > .ct-sliderPop',
              slideshow: false,
              controlNav: false,
              controlsContainer: '.ct-sliderPop-container'
          });
      });
  
      $('.ct-sliderPop-close').on('click', function () {
        document.getElementById("header").style.filter = "none";
        document.getElementById("first-section").style.filter = "none";
        document.getElementById("projet").style.filter = "none";
        document.getElementById("projets").style.filter = "none";
        document.getElementById("resume").style.filter = "none";
        document.getElementById("contact").style.filter = "none";
        document.getElementById("footer").style.filter = "none";
          $('.sliderPop3').hide();
          $('.ct-sliderPop-container').removeClass('open');
          $('.sliderPop3').removeClass('flexslider');
          $('.sliderPop3 .ct-sliderPop-container').removeClass('slides');
      });
  });
  
  //Popup 4
  $(document).ready(function () {
      $('.projet4').on('click', function () {
        document.getElementById("header").style.filter = " blur(2px)";
        document.getElementById("first-section").style.filter = " blur(2px)";
        document.getElementById("projet").style.filter = " blur(2px)";
        document.getElementById("projets").style.filter = " blur(2px)";
        document.getElementById("resume").style.filter = " blur(2px)";
        document.getElementById("contact").style.filter = " blur(2px)";
        document.getElementById("footer").style.filter = " blur(2px)";
          $('.sliderPop4').show();
          $('.ct-sliderPop-container').addClass('open');
          $('.sliderPop4').addClass('flexslider');
          $('.sliderPop4 .ct-sliderPop-container').addClass('slides');
          $('.sliderPop4').flexslider({
              selector: '.ct-sliderPop-container > .ct-sliderPop',
              slideshow: false,
              controlNav: false,
              controlsContainer: '.ct-sliderPop-container'
          });
      });
  
      $('.ct-sliderPop-close').on('click', function () {
        document.getElementById("header").style.filter = "none";
        document.getElementById("first-section").style.filter = "none";
        document.getElementById("projet").style.filter = "none";
        document.getElementById("projets").style.filter = "none";
        document.getElementById("resume").style.filter = "none";
        document.getElementById("contact").style.filter = "none";
        document.getElementById("footer").style.filter = "none";
          $('.sliderPop4').hide();
          $('.ct-sliderPop-container').removeClass('open');
          $('.sliderPop4').removeClass('flexslider');
          $('.sliderPop4 .ct-sliderPop-container').removeClass('slides');
      });
  });
  
  
  //Script NAVABAR disparait on scroll down reapparait scroll up
  $(document).ready(function () {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-50px";
    }
    if (prevScrollpos < 55) {
      document.getElementById("navbar").style.top = "0";
    }
    prevScrollpos = currentScrollPos;
  
    //Script bouton vers le haut
    document.getElementById("cRetour").className = (window.pageYOffset > 300) ? "cVisible" : "cInvisible";
    }
  });
  
  $(document).ready
  (function($){
    var sections = [];
    var id = false;
    var $navbar = $('.navbar-nav');
  
    //ajout des differents href dans un tableau nommé sections
    $('a' , $navbar).each(function(){
      sections.push($($(this).attr('href')));
    });
  
    $(window).scroll(function(){
      var scrollTop = $(this).scrollTop() + ($(window).height() / 2);
      for (var i in sections) {
        var section = sections[i];
        if (scrollTop > section.offset().top) {
          var scrolled_id = section.attr('id');
        }
        if (scrolled_id !== id) {
          console.log("Scrolled " + scrolled_id);
          console.log("Id " + id);
          id = scrolled_id;
          $('a'. $navbar).removeClass('current');
          $('a[href="#' + id +'"]', $navbar).addClass('current');
        }
      }
    });
  
  
  })

  const temporaryDisplay = require('./temporaryDisplay');

  
  
},{"./temporaryDisplay":2}],2:[function(require,module,exports){
function addClass() {

    const allDiv = document.querySelectorAll("div.bandeau");
    console.log("allDiv ======> ",allDiv);

    for (const item of allDiv) {
        console.log("item =====>>>> ", item);
        item.className = "hide";
    };

   
};
// on déinit un temps de 5 secondes avant la disparition du bandeau !
setTimeout(addClass, 10000);
},{}]},{},[1]);
