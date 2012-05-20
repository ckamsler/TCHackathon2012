(function($) {

	var Template = function() {}

	Template.prototype = {
	
		constructor: Template,

		render: function(page, $element, fn) {
		
			$.get(page, function(response) {
			
				$element.html(response);

				if (typeof fn === 'function') fn();
			
			});	
		
		}	
	};

	window.template = new Template;

})(jQuery);
