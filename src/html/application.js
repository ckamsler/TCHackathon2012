(function($) {'use strict';

	var $yield = $("#yield");

	// should be inherited from a root Page class, but i don't care...

	var FriendsView = {

		destroy : function() {
			$yield.find(".friends").unbind("click");
			$yield.find(".logo").unbind("click");
		},

		go : function() {

			_page = this;

			template.render("friends.html", $yield, function() {

				$yield.find(".friends").bind("click", function(e) {

					_page.destroy();

					BookShelfView.go();

				});

				$yield.find(".logo").bind("click", function() {

					_page.destroy();

					BookShelfView.go();

				});

			});
		}
	};

	var BookShelfView = {
		destroy : function() {
			$("#shelf").find("li").unbind("click");
			$yield.find(".logo").unbind("click");
		},
		go : function() {

			_page = this;

			template.render("bookshelf.html", $yield, function() {

				api.usat.getCategories(function(categories) {

					api.usat.getBooksListByCategory("horror", function(list) {
<<<<<<< HEAD
                        
                        $(".book-well").bind("click", function() {
                        
                              _page.destroy();
                              ReadingView.go();
                                                
                                                                         
                        });

							//Hiding and Showing Items on the Bookshelf
	
	$("#interest-toggle").click(function () {
   $('.interest').slideToggle();
   $("#interest-toggle").addClass('disabled')
});

	$("#sentiment-toggle").click(function () {
   $('.sentiment').slideToggle();
   $("#sentiment-toggle").addClass('disabled')
});

$("#demographics-selector").click(function () {
   $('.demographics').slideToggle();
   $("#demographics-selector").addClass('disabled')
});

$("#personality-selector").click(function () {
   $('.personality').slideToggle();
   $("#personality-selector").addClass('disabled')
});

$("#popularity-selector").click(function () {
   $('.popularity').slideToggle();
   $("#popularity-selector").addClass('disabled')
});


=======

						$(".book-well").bind("click", function() {

							_page.destroy();
							ReadingView.go();

						});
>>>>>>> added white text

					});

				});

			});

		}
	};

	var ReadingView = {
		destroy : function() {
			$yield.find(".logo").unbind("click");
		},
		go : function() {
			_page = this;

			template.render("reading.html", $yield, function() {

				$yield.find(".logo").bind("click", function() {

					_page.destroy();

					BookShelfView.go();

				});

			});
		}
	};

	var _state = window.location, _page = null;

	$(function() {

		FriendsView.go();

	});
<<<<<<< HEAD
	
	
=======

	//Hiding and Showing Items on the Bookshelf

	$("#interest-toggle").click(function() {
		$('.interest').slideToggle();
		$("#interest-toggle").addClass('disabled')
	});

	$("#sentiment-toggle").click(function() {
		$('.sentiment').slideToggle();
		$("#sentiment-toggle").addClass('disabled')
	});

	$("#demographics-selector").click(function() {
		$('.demographics').slideToggle();
		$("#demographics-selector").addClass('disabled')
	});

	$("#personality-selector").click(function() {
		$('.personality').slideToggle();
		$("#personality-selector").addClass('disabled')
	});

	$("#popularity-selector").click(function() {
		$('.popularity').slideToggle();
		$("#popularity-selector").addClass('disabled')
	});
>>>>>>> added white text

})(jQuery);
