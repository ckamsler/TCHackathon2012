(function($) {
   'use strict';

	var _state = window.location;

	$(function() {

		api.usat.getCategories(function(categories) {

			api.usat.getBooksListByCategory("horror", function(list) {

					var $out = $("#out"), html = ["<ul>"];	

					list.forEach(function(book) {
					
						html.push("<li>", book.Title, " - ", book.ISBN, "</li>");
					
					});

					html.push("</ul>");

					$out.html(html.join(""));

					$("#out ul").click(function() {

						var page = "reading-view.html";

						template.render(page, $("#out"), function() {
						
							_state = page;

						});
		
					});

				
			});
		
		});
		
	});

})(jQuery);
