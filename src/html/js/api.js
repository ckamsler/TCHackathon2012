(function($){

	var Kover = function() {};	

	Kover.prototype = {
	
		constructor: Kover,

		init: function(whitLiResponse) {},
		
		usat: {
		
			getCategories: function() {
			
				// http://api.usatoday.com/open/bestsellers/books/categories?api_key=ajttbn768qy4kgyvc7dmzbgm	
			
			},

			getBooksByCategory: function(category) {
			
				// http://api.usatoday.com/open/bestsellers/books/titles?api_key=ajttbn768qy4kgyvc7dmzbgm&category=horror 	
			
			}
		
		},

		whitli: {
		
			getSuggestions: function() {
			
				

			}

		}

	};	



	window.api = new Kover;


})(jQuery);
