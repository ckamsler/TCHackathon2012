(function($) {
   'use strict';


	// awesome code goes here ...
	$(function() {

		api.usat.getCategories(function(categories) {

			console.log(categories);

			categories.forEach(function(item, index) {
			
				api.usat.getBooksByCategory(item.CategoryName, function(list) {

					console.log('list ', list);		
				
				});
			
			});
		
		});
		
	});

})(jQuery);
