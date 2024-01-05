//Fermeture du DropDown au click
$(document).ready(function () {

    $('.navbar-nav li a').on('click', function(){
      if(!$( this ).hasClass('dropdown-toggle')){
        $('.navbar-collapse').collapse('hide');
        box.style.transitionDuration = "2s";
      }
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
          //console.log("Scrolled " + scrolled_id);
          //console.log("Id " + id);
          id = scrolled_id;
          $('a'. $navbar).removeClass('current');
          $('a[href="#' + id +'"]', $navbar).addClass('current');
        }
      }
    });
  
  
  })

  const temporaryDisplay = require('./temporaryDisplay');

  
  