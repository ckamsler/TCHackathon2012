(function($) {
   'use strict';

	var $yield = $("#yield");

	// should be inherited from a root Page class, but i don't care...

	var FriendsView = {

		destroy: function() {
			$yield.find(".friends").unbind("click");
            $yield.find(".logo").unbind("click");
		},

		go: function() {
			
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
		destroy: function() {
			$("#shelf").find("li").unbind("click");
            $yield.find(".logo").unbind("click");
		},
		go: function() {
		
			_page = this;

			template.render("bookshelf.html", $yield, function() {
			
				api.usat.getCategories(function(categories) {
			
					api.usat.getBooksListByCategory("horror", function(list) {
                        
                        $(".book-well").bind("click", function() {
                        
                              _page.destroy();
                              ReadingView.go();
                                                
                                                                         
                        });

		
					});
				
				});
		
			});
			
		}
		
	};

    var ReadingView = {
        destroy: function() {
            $yield.find(".logo").unbind("click");
        },
        go: function() {
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

})(jQuery);
