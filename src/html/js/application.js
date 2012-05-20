(function($) {
   'use strict';

	var $yield = $("#yield");

	// should be inherited from a root Page class, but i don't care...

	var FriendsView = {

		destroy: function() {
			$yield.find(".friends").unbind("click");
		},

		go: function() {
			
			_page = this;
		
			template.render("friends.html", $yield, function() {

				$yield.find(".friends").bind("click", function(e) {

					_page.destroy();

					BookShelfView.go();

				});			

			});

		}
	};

	var BookShelfView = {	
		destroy: function() {
			$("#shelf").find("li").unbind("click");
		},
		go: function() {
		
			_page = this;

			template.render("bookshelf.html", $yield, function() {
			
				api.usat.getCategories(function(categories) {

					api.usat.getBooksListByCategory("horror", function(list) {

						var $shelf = $("#shelf"), html = ["<ul>"];	

						list.forEach(function(book) {
						
							html.push("<li>", book.Title, " - ", book.ISBN, "</li>");
					
						});

						html.push("</ul>");

						$shelf.html(html.join(""));

						$shelf.find("li").bind("click", function() {

							_page.destroy();
						
						});
		
					});
				
				});
		
			});
			
		}
		
	};


	var _state = window.location, _page = null;

	$(function() {
		
		FriendsView.go();
	
	});

})(jQuery);
