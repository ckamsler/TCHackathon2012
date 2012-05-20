//
//  GotBooksWebViewController.h
//

#import <UIKit/UIKit.h>


@interface GotBooksWebViewController : UIViewController <UIWebViewDelegate>
{
	IBOutlet UIWebView *theWebView;
}

@property (nonatomic, retain) NSString *whitlisResponse;
- (void)setUrl:(NSString *)whitlisResponseIn ;

@end
