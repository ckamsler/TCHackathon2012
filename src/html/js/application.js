(function($) {
   'use strict';

	$(function() {

		api.usat.getCategories(function(categories) {

			
			api.usat.getBooksByCategory("horror", function(list) {

					console.log('list ', list);		

					var $out = $("#out"), html = [];	

					list.forEach(function(book) {
					
						html.push("<div>", book.Title, "</div>");
					
					});

					$out.html(html.join(""));
				
			});
			
		
		});
		
	});

})(jQuery);
