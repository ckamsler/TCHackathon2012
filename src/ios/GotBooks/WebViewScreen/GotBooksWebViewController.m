//
//  GotBooksWebViewController.m

#import "GotBooksWebViewController.h"


@interface GotBooksWebViewController (private)
- (void)startListening;
- (void)layoutSharedContentView;
@end

@implementation GotBooksWebViewController
@synthesize whitlisResponse;

#pragma mark -
#pragma mark Initializer

- (id)init {
	self = [super initWithNibName:@"GotBooksWebViewController" bundle:[NSBundle mainBundle]];
	
	return self;
}


#pragma mark -
#pragma mark LifeCycle

- (void) connection:(NSURLConnection *)connection didReceiveData:(NSData *)data 
{
    NSString* response = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
    
    [theWebView stringByEvaluatingJavaScriptFromString :[NSString stringWithFormat:@"window.api.init(\'%@\')", whitlisResponse]];
}

- (void)viewDidLoad {
	[super viewDidLoad];

}

- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

    theWebView.scalesPageToFit = TRUE;
	theWebView.delegate = self;

    [theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"app" ofType:@"html"]isDirectory:NO]]];

}


- (IBAction)cancelAction:(id)sender {

}

#pragma mark -
#pragma mark Memory management

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
    [super viewDidUnload];

    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void) dealloc
{
    [super dealloc];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return ( interfaceOrientation == UIInterfaceOrientationLandscapeLeft || 
            interfaceOrientation == UIInterfaceOrientationLandscapeRight);
    //return YES;
}

- (void)setUrl:(NSString *)whitlisResponseIn {
	//[theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:newUrl]]];
    self.whitlisResponse = whitlisResponseIn;
}

#pragma mark -
#pragma mark UIWebView Delgates
#pragma mark -

- (BOOL)webView: (UIWebView *) webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType 
{
    NSString *requestString = [[request URL] absoluteString];
    
    if ([requestString hasPrefix:@"js-frame"]) {
    
        [self makeRequestWithUrl:@"http://api.usatoday.com/open/bestsellers/books/categories?api_key=ajttbn768qy4kgyvc7dmzbgm"];
        
        return NO;
    }
    
	return YES;
}


- (void)webViewDidFinishLoad:(UIWebView *)webView {
	if(webView.loading) return;	
    
    NSString *pTempStr = [theWebView stringByEvaluatingJavaScriptFromString :[NSString stringWithFormat:@"window.api.init(\'%@\')", whitlisResponse]];
    
    NSLog(@"pTempStr = %@",pTempStr);

}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
	[self webViewDidFinishLoad:webView];
}

- (void) makeRequestWithUrl:(NSString *) url
{
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:url]];
 
    [[NSURLConnection alloc] initWithRequest:urlRequest delegate:self];
    
}

@end
