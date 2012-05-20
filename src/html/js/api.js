(function($){

	var Kover = function() {};	

	Kover.prototype = {
	
		constructor: Kover,

		books: {
			categories: ""
		},
			

		init: function(whitLiResponse) {},
		
		usat: {
		
			getCategories: function(fn) {
				// http://api.usatoday.com/open/bestsellers/books/categories?api_key=ajttbn768qy4kgyvc7dmzbgm	

				var request = "http://api.usatoday.com/open/bestsellers/books/categories?api_key=ajttbn768qy4kgyvc7dmzbgm";
				
				// magically make ios request...

				// and on the response...

				api.books.categories = tempCategories;
				if (typeof fn === 'function') fn(api.books.categories);

			},

			getBooksByCategory: function(category, callback) {
				// http://api.usatoday.com/open/bestsellers/books/titles?api_key=ajttbn768qy4kgyvc7dmzbgm&category=horror 	


				if (typeof fn === 'function') fn();
			}
		
		},

		whitli: {
		
			getSuggestions: function() {
			
				// 	

			}

		}

	};	



	window.api = new Kover();


})(jQuery);

// temp
var tempCategories = {"APIParameters":{"ISBN":"","Year":"","Month":"","Date":"","MinYear":"","MaxYear":"","Title":"","Author":"","Category":"","Class":"","ExcludeCurrentWeek":"true","RecentWeekAllowance":"24","Count":0},"Categories":[{"CategoryID":0,"CategoryName":"----"},{"CategoryID":111,"CategoryName":"Mass market"},{"CategoryID":112,"CategoryName":"Trade"},{"CategoryID":121,"CategoryName":"Horror"},{"CategoryID":122,"CategoryName":"Fantasy/Sci-fi"},{"CategoryID":131,"CategoryName":"Mystery"},{"CategoryID":132,"CategoryName":"Romance"},{"CategoryID":133,"CategoryName":"Western"},{"CategoryID":140,"CategoryName":"Youth"},{"CategoryID":150,"CategoryName":"Children"},{"CategoryID":151,"CategoryName":"General fiction"},{"CategoryID":211,"CategoryName":"Pets"},{"CategoryID":212,"CategoryName":"Cookbooks"},{"CategoryID":213,"CategoryName":"Family/Childcare/Home"},{"CategoryID":214,"CategoryName":"Crafts/Antiques/Collectibles/Gardening"},{"CategoryID":221,"CategoryName":"Literature/Poetry/Drama/Art"},{"CategoryID":222,"CategoryName":"Photography"},{"CategoryID":223,"CategoryName":"Music/Dance"},{"CategoryID":231,"CategoryName":"Computing"},{"CategoryID":232,"CategoryName":"Science/Technology"},{"CategoryID":241,"CategoryName":"Psychology/Self-help"},{"CategoryID":242,"CategoryName":"Diet/Health"},{"CategoryID":243,"CategoryName":"Foreign language"},{"CategoryID":244,"CategoryName":"Study aids"},{"CategoryID":251,"CategoryName":"Biography"},{"CategoryID":252,"CategoryName":"History"},{"CategoryID":253,"CategoryName":"Current affairs"},{"CategoryID":261,"CategoryName":"Religion/Inspiration"},{"CategoryID":262,"CategoryName":"Philosophy"},{"CategoryID":271,"CategoryName":"Travel"},{"CategoryID":272,"CategoryName":"Transportation"},{"CategoryID":273,"CategoryName":"Sports/Games"},{"CategoryID":274,"CategoryName":"Movies/TV"},{"CategoryID":292,"CategoryName":"Humor"},{"CategoryID":293,"CategoryName":"Regional"},{"CategoryID":294,"CategoryName":"Nature"},{"CategoryID":295,"CategoryName":"Reference"},{"CategoryID":298,"CategoryName":"Business"},{"CategoryID":299,"CategoryName":"Miscellaneous"},{"CategoryID":324,"CategoryName":"Memoir"}]};	


