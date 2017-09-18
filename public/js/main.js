$(function() {

  $("#product-dropdown").on("hide.bs.dropdown", function() {
    $(".product-submenu").hide();
  });

  $(".product-menu").mouseover(function() {
    if (screen.width >= 992) {
      var uheight = $(this).next("ul").children('li').length * 55 + 1;
      var pheight = $($(this).parents("ul")[0]).children("li").length * 55 * 1;
      var theight = uheight > pheight ? uheight : pheight;

      $(".product-list").css("height", theight + "px");
      $(".product-submenu").css("height", theight + "px");
    }

    $(".product-submenu").hide();
    $(this).next("ul").show();
    $(".product-menu").css("backgroundColor", "transparent");
    $(this).css("backgroundColor", "#d9d9d9");
  }).mouseout(function() {
    $(this).css("backgroundColor", "transparent");
  });

  $(".product-submenu a").mouseover(function() {
    $(this).css("backgroundColor", "#ccc");
    $(this).parents("ul:first").prev("a").css("backgroundColor", "#d9d9d9");
  }).mouseout(function() {
    $(this).css("backgroundColor", "transparent");
  });

  $("#solution-dropdown").on("hide.bs.dropdown", function() {
    $(".solution-submenu").hide();
  });

  $(".solution-menu").mouseover(function() {
    if (screen.width >= 992) {
      var uheight = $(this).next("ul").children('li').length * 55 + 1;
      var pheight = $($(this).parents("ul")[0]).children("li").length * 55 * 1;
      var theight = uheight > pheight ? uheight : pheight;

      $(".solution-list").css("height", theight + "px");
      $(".solution-submenu").css("height", theight + "px");
    }

    $(".solution-submenu").hide();
    $(this).next("ul").show();
    $(".solution-menu").css("backgroundColor", "transparent");
    $(this).css("backgroundColor", "#d9d9d9");
  }).mouseout(function() {
    $(this).css("backgroundColor", "transparent");
  });

  $(".solution-submenu a").mouseover(function() {
    $(this).css("backgroundColor", "#ccc");
    $(this).parents("ul:first").prev("a").css("backgroundColor", "#d9d9d9");
  }).mouseout(function() {
    $(this).css("backgroundColor", "transparent");
  });
})
