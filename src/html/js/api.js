(function($){

	var Kover = function() {};	

	Kover.prototype = {
	
		constructor: Kover,

		books: {
			categories: "",
			list: {}
		},

		init: function(whitLiResponse) {},
		
		usat: {
		
			getCategories: function(fn) {
				// http://api.usatoday.com/open/bestsellers/books/categories?api_key=ajttbn768qy4kgyvc7dmzbgm	

				var request = "http://api.usatoday.com/open/bestsellers/books/categories?api_key=ajttbn768qy4kgyvc7dmzbgm";
				
				// magically make ios request...
				// and on the response...

				api.books.categories = tempCategories.Categories;

				if (typeof fn === 'function') fn(api.books.categories);
			},

			getBooksByCategory: function(category, callback) {
				// http://api.usatoday.com/open/bestsellers/books/titles?api_key=ajttbn768qy4kgyvc7dmzbgm&category=horror 	
				// magically make ios request...
	
				api.books.list[category] = tempBooksList;			
						

				if (typeof fn === 'function') fn(api.books.list[category]);
			}
		
		}
	};	


	window.api = new Kover();


})(jQuery);

// temp
var tempCategories = {"APIParameters":{"ISBN":"","Year":"","Month":"","Date":"","MinYear":"","MaxYear":"","Title":"","Author":"","Category":"","Class":"","ExcludeCurrentWeek":"true","RecentWeekAllowance":"24","Count":0},"Categories":[{"CategoryID":0,"CategoryName":"----"},{"CategoryID":111,"CategoryName":"Mass market"},{"CategoryID":112,"CategoryName":"Trade"},{"CategoryID":121,"CategoryName":"Horror"},{"CategoryID":122,"CategoryName":"Fantasy/Sci-fi"},{"CategoryID":131,"CategoryName":"Mystery"},{"CategoryID":132,"CategoryName":"Romance"},{"CategoryID":133,"CategoryName":"Western"},{"CategoryID":140,"CategoryName":"Youth"},{"CategoryID":150,"CategoryName":"Children"},{"CategoryID":151,"CategoryName":"General fiction"},{"CategoryID":211,"CategoryName":"Pets"},{"CategoryID":212,"CategoryName":"Cookbooks"},{"CategoryID":213,"CategoryName":"Family/Childcare/Home"},{"CategoryID":214,"CategoryName":"Crafts/Antiques/Collectibles/Gardening"},{"CategoryID":221,"CategoryName":"Literature/Poetry/Drama/Art"},{"CategoryID":222,"CategoryName":"Photography"},{"CategoryID":223,"CategoryName":"Music/Dance"},{"CategoryID":231,"CategoryName":"Computing"},{"CategoryID":232,"CategoryName":"Science/Technology"},{"CategoryID":241,"CategoryName":"Psychology/Self-help"},{"CategoryID":242,"CategoryName":"Diet/Health"},{"CategoryID":243,"CategoryName":"Foreign language"},{"CategoryID":244,"CategoryName":"Study aids"},{"CategoryID":251,"CategoryName":"Biography"},{"CategoryID":252,"CategoryName":"History"},{"CategoryID":253,"CategoryName":"Current affairs"},{"CategoryID":261,"CategoryName":"Religion/Inspiration"},{"CategoryID":262,"CategoryName":"Philosophy"},{"CategoryID":271,"CategoryName":"Travel"},{"CategoryID":272,"CategoryName":"Transportation"},{"CategoryID":273,"CategoryName":"Sports/Games"},{"CategoryID":274,"CategoryName":"Movies/TV"},{"CategoryID":292,"CategoryName":"Humor"},{"CategoryID":293,"CategoryName":"Regional"},{"CategoryID":294,"CategoryName":"Nature"},{"CategoryID":295,"CategoryName":"Reference"},{"CategoryID":298,"CategoryName":"Business"},{"CategoryID":299,"CategoryName":"Miscellaneous"},{"CategoryID":324,"CategoryName":"Memoir"}]};	

var tempBooksList = 
{"APIParameters":{"ISBN":"","Year":"","Month":"","Date":"","MinYear":"","MaxYear":"","Title":"","Author":"","Category":"horror","Class":"","ExcludeCurrentWeek":"true","RecentWeekAllowance":"24","Count":0},"Titles":[{"Title":"A Room for the Dead","TitleAPIUrl":"/Titles/9780786000890","Author":"Noel Hynd"},{"Title":"All That Glitters","TitleAPIUrl":"/Titles/9780671873196","Author":"V.C. Andrews"},{"Title":"Anno Dracula","TitleAPIUrl":"/Titles/9780380723454","Author":"Kim Newman"},{"Title":"Bag of Bones","TitleAPIUrl":"/Titles/9780671024239","Author":"Stephen King"},{"Title":"Bag of Bones","TitleAPIUrl":"/Titles/9780684853505","Author":"Stephen King"},{"Title":"Black Lightning","TitleAPIUrl":"/Titles/9780449225042","Author":"John Saul"},{"Title":"Bone Deep","TitleAPIUrl":"/Titles/9780425153406","Author":"David Wiltse"},{"Title":"Brooke","TitleAPIUrl":"/Titles/9780671020323","Author":"V.C. Andrews"},{"Title":"Butterfly","TitleAPIUrl":"/Titles/9780671020293","Author":"V.C. Andrews"},{"Title":"Cell","TitleAPIUrl":"/Titles/9780743292337","Author":"Stephen King"},{"Title":"Cell","TitleAPIUrl":"/Titles/9781416524519","Author":"Stephen King"},{"Title":"Coldheart Canyon","TitleAPIUrl":"/Titles/9780061030185","Author":"Clive Barker"},{"Title":"Crystal","TitleAPIUrl":"/Titles/9780671020309","Author":"V.C. Andrews"},{"Title":"Curfew","TitleAPIUrl":"/Titles/9780425143346","Author":"Phil Rickman"},{"Title":"Dark Rivers of the Heart","TitleAPIUrl":"/Titles/9780345396570","Author":"Dean Koontz"},{"Title":"Dark Rivers of the Heart","TitleAPIUrl":"/Titles/9780679425243","Author":"Dean Koontz"},{"Title":"Daughter of Darkness","TitleAPIUrl":"/Titles/9781439155011","Author":"V.C. Andrews"},{"Title":"Demon Seed","TitleAPIUrl":"/Titles/9780425158593","Author":"Dean Koontz"},{"Title":"Desperation","TitleAPIUrl":"/Titles/9780451188465","Author":"Stephen King"},{"Title":"Desperation","TitleAPIUrl":"/Titles/9780670868360","Author":"Stephen King"},{"Title":"Desperation/The Regulators Combination Set","TitleAPIUrl":"/Titles/9780670776054","Author":"Stephen King and Richard Bachman"},{"Title":"Different Seasons","TitleAPIUrl":"/Titles/9780451197122","Author":"Stephen King"},{"Title":"Dolores Claiborne","TitleAPIUrl":"/Titles/9780451177094","Author":"Stephen King"},{"Title":"Dolores Claiborne","TitleAPIUrl":"/Titles/9780451184115","Author":"Stephen King"},{"Title":"Everville","TitleAPIUrl":"/Titles/9780061093081","Author":"Clive Barker"},{"Title":"Everything\u0027s Eventual","TitleAPIUrl":"/Titles/9780743235150","Author":"Stephen King"},{"Title":"Everything\u0027s Eventual","TitleAPIUrl":"/Titles/9780743457354","Author":"Stephen King"},{"Title":"Everything\u0027s Eventual","TitleAPIUrl":"/Titles/9781416537816","Author":"Stephen King"},{"Title":"Extinct ","TitleAPIUrl":"/Titles/9780312962128","Author":"Charles Wilson "},{"Title":"Eye of the Storm","TitleAPIUrl":"/Titles/9780671039837","Author":"V.C. Andrews"},{"Title":"Fatal Cure","TitleAPIUrl":"/Titles/9780399138799","Author":"Robin Cook"},{"Title":"Fatal Cure","TitleAPIUrl":"/Titles/9780425145630","Author":"Robin Cook"},{"Title":"Fear Nothing","TitleAPIUrl":"/Titles/9780553106640","Author":"Dean Koontz"},{"Title":"Fear Nothing","TitleAPIUrl":"/Titles/9780553579758","Author":"Dean Koontz"},{"Title":"Four Past Midnight","TitleAPIUrl":"/Titles/9780451185976","Author":"Stephen King"},{"Title":"Frankenstein","TitleAPIUrl":"/Titles/9780451183774","Author":"Mary Shelley"},{"Title":"From the Borderlands","TitleAPIUrl":"/Titles/9780446610353","Author":"Edited by Thomas F. Monteleone, Elizabeth E. Monteleone"},{"Title":"Galilee","TitleAPIUrl":"/Titles/9780061092008","Author":"Clive Barker"},{"Title":"Ghosts","TitleAPIUrl":"/Titles/9780821743591","Author":"Noel Hynd"},{"Title":"Guardian","TitleAPIUrl":"/Titles/9780449223048","Author":"John Saul"},{"Title":"Heart Song","TitleAPIUrl":"/Titles/9780671534721","Author":"V.C. Andrews"},{"Title":"Hidden Jewel","TitleAPIUrl":"/Titles/9780671873202","Author":"V.C. Andrews"},{"Title":"Hideaway","TitleAPIUrl":"/Titles/9780425135259","Author":"Dean Koontz"},{"Title":"Hideaway","TitleAPIUrl":"/Titles/9780425203897","Author":"Dean Koontz"},{"Title":"Icebound","TitleAPIUrl":"/Titles/9780345384355","Author":"Dean Koontz"},{"Title":"Implant","TitleAPIUrl":"/Titles/9780812544701","Author":"F. Paul Wilson"},{"Title":"In the Dark of the Night","TitleAPIUrl":"/Titles/9780345487025","Author":"John Saul"},{"Title":"Insomnia","TitleAPIUrl":"/Titles/9780451184962","Author":"Stephen King"},{"Title":"Insomnia","TitleAPIUrl":"/Titles/9780670855032","Author":"Stephen King"},{"Title":"Intensity","TitleAPIUrl":"/Titles/9780345384362","Author":"Dean Koontz"},{"Title":"Intensity","TitleAPIUrl":"/Titles/9780679425250","Author":"Dean Koontz"},{"Title":"Into the Fire","TitleAPIUrl":"/Titles/9780425150122","Author":"David Wiltse"},{"Title":"Into the Woods","TitleAPIUrl":"/Titles/9780743428590","Author":"V.C. Andrews"},{"Title":"Lightning","TitleAPIUrl":"/Titles/9780425192030","Author":"Dean Koontz"},{"Title":"Lightning Strikes","TitleAPIUrl":"/Titles/9780671007690","Author":"V.C. Andrews"},{"Title":"Lost Boys","TitleAPIUrl":"/Titles/9780061091315","Author":"Orson Scott Card"},{"Title":"Melody","TitleAPIUrl":"/Titles/9780671534714","Author":"V.C. Andrews"},{"Title":"Mr. Murder","TitleAPIUrl":"/Titles/9780399138744","Author":"Dean Koontz"},{"Title":"Mr. Murder","TitleAPIUrl":"/Titles/9780425144428","Author":"Dean Koontz"},{"Title":"Mr. Murder","TitleAPIUrl":"/Titles/9780425210758","Author":"Dean Koontz"},{"Title":"Music in the Night","TitleAPIUrl":"/Titles/9780671534745","Author":"V.C. Andrews"},{"Title":"Natural Causes","TitleAPIUrl":"/Titles/9780553568769","Author":"Michael Palmer"},{"Title":"Nightmares & Dreamscapes","TitleAPIUrl":"/Titles/9780451180230","Author":"Stephen King"},{"Title":"Nightmares & Dreamscapes","TitleAPIUrl":"/Titles/9780670851089","Author":"Stephen King"},{"Title":"Olivia","TitleAPIUrl":"/Titles/9780671007614","Author":"V.C. Andrews"},{"Title":"Orphans Omnibus","TitleAPIUrl":"/Titles/9780743403610","Author":"V.C. Andrews"},{"Title":"Pearl in the Mist","TitleAPIUrl":"/Titles/9780671759360","Author":"V.C. Andrews"},{"Title":"Raven","TitleAPIUrl":"/Titles/9780671020316","Author":"V.C. Andrews"},{"Title":"Ripper","TitleAPIUrl":"/Titles/9780451177025","Author":"Michael Slade"},{"Title":"Roadwork","TitleAPIUrl":"/Titles/9780451197870","Author":"Stephen King"},{"Title":"Rose Madder","TitleAPIUrl":"/Titles/9780451186362","Author":"Stephen King"},{"Title":"Rose Madder","TitleAPIUrl":"/Titles/9780670858699","Author":"Stephen King"},{"Title":"Ruby","TitleAPIUrl":"/Titles/9780671759346","Author":"V.C. Andrews"},{"Title":"Runaways","TitleAPIUrl":"/Titles/9780671007638","Author":"V.C. Andrews"},{"Title":"Santa\u0027s Twin","TitleAPIUrl":"/Titles/9780061053559","Author":"Dean Koontz, art by Phil Parks"},{"Title":"Secret Whispers","TitleAPIUrl":"/Titles/9781439154977","Author":"V.C. Andrews"},{"Title":"Storm of the Century","TitleAPIUrl":"/Titles/9780671032647","Author":"Stephen King"},{"Title":"Superstitious","TitleAPIUrl":"/Titles/9780446519533","Author":"R.L. Stine"},{"Title":"Superstitious","TitleAPIUrl":"/Titles/9780446603508","Author":"R.L. Stine"},{"Title":"Tarnished Gold","TitleAPIUrl":"/Titles/9780671873219","Author":"V.C. Andrews"},{"Title":"The Blackstone Chronicles, Part 1: An Eye for an Eye: The Doll","TitleAPIUrl":"/Titles/9780449227817","Author":"John Saul"},{"Title":"The Blackstone Chronicles, Part 2: Twist of Fate: The Locket","TitleAPIUrl":"/Titles/9780449227848","Author":"John Saul"},{"Title":"The Blackstone Chronicles, Part 3: Ashes to Ashes","TitleAPIUrl":"/Titles/9780449227862","Author":"John Saul"},{"Title":"The Blackstone Chronicles, Part 4: In the Shadow of Evil: The Handkerchief","TitleAPIUrl":"/Titles/9780449227886","Author":"John Saul"},{"Title":"The Blackstone Chronicles, Part 5: Day of Reckoning; The Stereoscope","TitleAPIUrl":"/Titles/9780449227893","Author":"John Saul"},{"Title":"The Blackstone Chronicles, Part 6: Asylum","TitleAPIUrl":"/Titles/9780449227947","Author":"John Saul"},{"Title":"The Blair Witch Project","TitleAPIUrl":"/Titles/9780451199669","Author":"Compiled by D. A. Stern"},{"Title":"The Blood Countess","TitleAPIUrl":"/Titles/9780440221913","Author":"Andrei Codrescu"},{"Title":"The Dark Tower I: The Gunslinger","TitleAPIUrl":"/Titles/9780451210845","Author":"Stephen King"},{"Title":"The Dark Tower I: The Gunslinger","TitleAPIUrl":"/Titles/9780670032549","Author":"Stephen King"},{"Title":"The Dark Tower II: The Drawing of the Three","TitleAPIUrl":"/Titles/9780451210852","Author":"Stephen King"},{"Title":"The Dark Tower III: The Wastelands","TitleAPIUrl":"/Titles/9780451210869","Author":"Stephen King"},{"Title":"The Dark Tower IV: Wizard and Glass","TitleAPIUrl":"/Titles/9780451194862","Author":"Stephen King"},{"Title":"The Dark Tower IV: Wizard and Glass","TitleAPIUrl":"/Titles/9780451210876","Author":"Stephen King"},{"Title":"The Dark Tower IV: Wizard and Glass","TitleAPIUrl":"/Titles/9780452279179","Author":"Stephen King"},{"Title":"The Dark Tower IV: Wizard and Glass","TitleAPIUrl":"/Titles/9781880418383","Author":"Stephen King; art by Dave McKean"},{"Title":"The Dark Tower V: Wolves of the Calla","TitleAPIUrl":"/Titles/9780743251624","Author":"Stephen King"},{"Title":"The Dark Tower V: Wolves of the Calla","TitleAPIUrl":"/Titles/9781416516934","Author":"Stephen King"},{"Title":"The Dark Tower V: Wolves of the Calla","TitleAPIUrl":"/Titles/9781880418567","Author":"Stephen King"},{"Title":"The Dark Tower VI: Song of Susannah","TitleAPIUrl":"/Titles/9780743254557","Author":"Stephen King"},{"Title":"The Dark Tower VI: Song of Susannah","TitleAPIUrl":"/Titles/9781416521495","Author":"Stephen King"},{"Title":"The Dark Tower VI: Song of Susannah","TitleAPIUrl":"/Titles/9781880418598","Author":"Stephen King"},{"Title":"The Dark Tower VII: The Dark Tower","TitleAPIUrl":"/Titles/9780743254564","Author":"Stephen King"},{"Title":"The Dark Tower VII: The Dark Tower","TitleAPIUrl":"/Titles/9781416524526","Author":"Stephen King"},{"Title":"The Dark Tower VII: The Dark Tower","TitleAPIUrl":"/Titles/9781880418628","Author":"Stephen King"},{"Title":"The Dark Tower: The Gunslinger Born","TitleAPIUrl":"/Titles/9780785121442","Author":"Stephen King, creative director; Peter David,  Robin Furth, Jae Lee, Richard Isanove"},{"Title":"The Descent","TitleAPIUrl":"/Titles/9780515131758","Author":"Jeff Long"},{"Title":"The Devil\u0027s Labyrinth","TitleAPIUrl":"/Titles/9780345487049","Author":"John Saul"},{"Title":"The Edge of Sleep","TitleAPIUrl":"/Titles/9780425143339","Author":"David Wiltse"},{"Title":"The Funhouse","TitleAPIUrl":"/Titles/9780425142486","Author":"Dean Koontz"},{"Title":"The Girl Who Loved Tom Gordon","TitleAPIUrl":"/Titles/9780671042851","Author":"Stephen King"},{"Title":"The Girl Who Loved Tom Gordon","TitleAPIUrl":"/Titles/9780684867625","Author":"Stephen King"},{"Title":"The Green Mile","TitleAPIUrl":"/Titles/9780451933027","Author":"Stephen King"},{"Title":"The Green Mile","TitleAPIUrl":"/Titles/9780452278905","Author":"Stephen King"},{"Title":"The Green Mile","TitleAPIUrl":"/Titles/9780671032654","Author":"Stephen King"},{"Title":"The Green Mile","TitleAPIUrl":"/Titles/9780671041786","Author":"Stephen King"},{"Title":"The Green Mile, Part 1: The Two Dead Girls","TitleAPIUrl":"/Titles/9780451190499","Author":"Stephen King"},{"Title":"The Green Mile, Part 2: The Mouse on the Mile","TitleAPIUrl":"/Titles/9780451190529","Author":"Stephen King"},{"Title":"The Green Mile, Part 3: Coffey\u0027s Hands","TitleAPIUrl":"/Titles/9780451190543","Author":"Stephen King"},{"Title":"The Green Mile, Part 4: The Bad Death of Eduard Delacroix","TitleAPIUrl":"/Titles/9780451190550","Author":"Stephen King"},{"Title":"The Green Mile, Part 5: Night Journey","TitleAPIUrl":"/Titles/9780451190567","Author":"Stephen King"},{"Title":"The Green Mile, Part 6: Coffey on the Mile","TitleAPIUrl":"/Titles/9780451190574","Author":"Stephen King"},{"Title":"The Haunting","TitleAPIUrl":"/Titles/9780140287431","Author":"Shirley Jackson"},{"Title":"The Journals of Eleanor Druse","TitleAPIUrl":"/Titles/9781401301231","Author":"Eleanor Druse"},{"Title":"The Key to Midnight","TitleAPIUrl":"/Titles/9780425147511","Author":"Dean Koontz"},{"Title":"The Listeners","TitleAPIUrl":"/Titles/9780812550399","Author":"Christopher Pike"},{"Title":"The Long Walk","TitleAPIUrl":"/Titles/9780451196712","Author":"Stephen King"},{"Title":"The Master of Blacktower","TitleAPIUrl":"/Titles/9780425149416","Author":"Barbara Michaels"},{"Title":"The Mist","TitleAPIUrl":"/Titles/9780451223296","Author":"Stephen King"},{"Title":"The Presence","TitleAPIUrl":"/Titles/9780449002414","Author":"John Saul"},{"Title":"The Presence","TitleAPIUrl":"/Titles/9780449910559","Author":"John Saul"},{"Title":"The Regulators","TitleAPIUrl":"/Titles/9780451191014","Author":"Richard Bachman (aka Stephen King)"},{"Title":"The Regulators","TitleAPIUrl":"/Titles/9780525941903","Author":"Richard Bachman (aka Stephen King)"},{"Title":"The Return","TitleAPIUrl":"/Titles/9780451206879","Author":"Bentley Little"},{"Title":"The Secret Life of Laszlo, Count Dracula","TitleAPIUrl":"/Titles/9780061009433","Author":"Roderick Anscombe"},{"Title":"The Select","TitleAPIUrl":"/Titles/9780440218661","Author":"F. Paul Wilson"},{"Title":"The Shawshank Redemption","TitleAPIUrl":"/Titles/9780451183941","Author":"Stephen King"},{"Title":"The Shining","TitleAPIUrl":"/Titles/9780451193889","Author":"Stephen King"},{"Title":"The Stand","TitleAPIUrl":"/Titles/9780451179289","Author":"Stephen King"},{"Title":"The Stepford Wives","TitleAPIUrl":"/Titles/9780060738198","Author":"Ira Levin"},{"Title":"The Taking","TitleAPIUrl":"/Titles/9780553584509","Author":"Dean Koontz"},{"Title":"The Taking","TitleAPIUrl":"/Titles/9780553593501","Author":"Dean Koontz"},{"Title":"The Taking","TitleAPIUrl":"/Titles/9780553802504","Author":"Dean Koontz"},{"Title":"The Throat","TitleAPIUrl":"/Titles/9780451179180","Author":"Peter Straub"},{"Title":"The Wildflowers","TitleAPIUrl":"/Titles/9780743423472","Author":"V.C. Andrews"},{"Title":"The Wizard\u0027s Daughter","TitleAPIUrl":"/Titles/9780425146422","Author":"Barbara Michaels"},{"Title":"Thinner","TitleAPIUrl":"/Titles/9780451190758","Author":"Stephen King"},{"Title":"Ticktock","TitleAPIUrl":"/Titles/9780345384300","Author":"Dean Koontz"},{"Title":"Unfinished Symphony","TitleAPIUrl":"/Titles/9780671534738","Author":"V.C. Andrews"},{"Title":"Watchers","TitleAPIUrl":"/Titles/9780425188804","Author":"Dean Koontz"},{"Title":"Winter Moon","TitleAPIUrl":"/Titles/9780345386106","Author":"Dean Koontz"}]};

