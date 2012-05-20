//
//  ViewController.m
//  GotBooks
//
//  Created by Arvind, Vipul on 5/19/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "ViewController.h"
#import "CJSONDeserializer.h"
#import "GotBooksWebViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize permissions, whitlisResponse;

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.

    whitLiFirstCall = nil;
    whitLiSecondCall = nil;
    whitLiThirdCall = nil;
    
    permissions = [[NSArray alloc] initWithObjects: @"publish_stream", 
                                                    @"read_stream",
                                                    @"email",
                                                    @"user_about_me",
                                                    @"user_activities",
                                                    @"user_birthday",
                                                    @"user_education_history",
                                                    @"user_groups",
                                                    @"user_hometown",
                                                    @"user_interests",
                                                    @"user_likes",                   
                                                    @"user_location",
                                                    @"user_questions",
                                                    @"user_relationships",                   
                                                    @"user_relationship_details",
                                                    @"user_religion_politics",
                                                    @"user_subscriptions",
                                                    @"user_website",
                                                    @"user_work_history",
                                                    @"user_checkins",
                                                    @"user_events",
                                                    @"user_games_activity",
                                                    @"user_notes",
                                                    @"user_photos",
                                                    @"user_status",
                                                    @"user_videos",
                                                    nil];
    [self startListening];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.

    [loginButton release];
    loginButton = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return ( interfaceOrientation == UIInterfaceOrientationLandscapeLeft || 
            interfaceOrientation == UIInterfaceOrientationLandscapeRight);
    //return YES;
}

- (void) dealloc
{
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [self freeOpenURLConnections];
    [loginButton release];

    [permissions release];
    permissions = nil;

    [super dealloc];
}

- (void)viewDidAppear:(BOOL)animated 
{
    FacebookManager *fm = [FacebookManager sharedFacebookManager];
    [fm updateTokenValues];
    [fm setMainDelegate:self];
    
    [self configureElements:TRUE]; 

}
- (IBAction) loginButtonPressed  : (id)sender
{        
	[self configureElements:TRUE]; 
    
    FacebookManager *fm = [FacebookManager sharedFacebookManager];
        
    if (![[fm facebook] isSessionValid]) 
    {
        [[fm facebook] authorize:permissions];
    } else {        
        [self configureElements : TRUE];
        [self startWhitLiCommunication];
    }    
}

- (void)startListening {
	NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
	[nc addObserver:self selector:@selector(handleUserDidLogin:) name:FacebookManagerDidLogin object:nil];
	[nc addObserver:self selector:@selector(handleUserDidLogout:) name:FacebookManagerDidLogout object:nil];
    [nc addObserver:self selector:@selector(handleUserCancelled:) name:FacebookManagerUserCancelled object:nil];
    [nc addObserver:self selector:@selector(handleUseNameAvailable:) name:FacebookManagerUserNameAvailable object:nil];
}

- (IBAction)cancelAction:(id)sender {
    [self dismissWholeFBSharingDlg];
}

- (void)handleUserDidLogin:(NSNotification *)notification {
	[self configureElements:TRUE];
}

- (void)handleUseNameAvailable:(NSNotification *)notification
{    
    [self configureElements:TRUE];
    
    // Start Whit Li communication
    
    [self startWhitLiCommunication];
}

- (void)handleUserCancelled:(NSNotification *)notification
{
    [self dismissWholeFBSharingDlg];
}

- (void) dismissWholeFBSharingDlg
{
}

- (void)configureElements : (bool) bEnable 
{    
    loginLabel.text = (bEnable) ? @"Continue..." : @"Login using your facebook account";
    
    FacebookManager *fm = [FacebookManager sharedFacebookManager];
    
    if (bEnable)
    {
        if ([fm getUsername])
        {
            loginLabel.text = [NSString stringWithFormat:@"Continue as %@",[fm getUsername]];
        }
    }
    else
    {

        loginLabel.text = @"Login using your facebook account";
    }
}

- (void)postToFacebookSucceeded { }
- (void)postToFacebookFailed:(NSString *)error { }
- (void)userInitialized { }

#pragma mark -
#pragma mark Whit Li Communication

- (void) startWhitLiCommunication
{
    FacebookManager *fm = [FacebookManager sharedFacebookManager];
    [fm getUsername];
    //[fm getUserID]
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *tempToken = [defaults objectForKey:@"FBAccessTokenKey"];
    
    NSMutableURLRequest *theRequest = [NSMutableURLRequest requestWithURL: [NSURL URLWithString:@"https://api.whit.li/user/importToken?api_key=5wm7a2hjgfdhwv4wcru4rq9a"]];
    [theRequest setHTTPMethod:@"POST"];
    //[theRequest addValue:@"text/xml" forHTTPHeaderField:@"content-type"];
    [theRequest setCachePolicy:NSURLCacheStorageNotAllowed];
    [theRequest setTimeoutInterval:60.0];
    NSString* pStr = [[NSString alloc] initWithFormat:@"uid=%@&oauth_token=%@&format=json", [fm getUserID], [defaults objectForKey:@"FBAccessTokenKey"]];
                      
    NSData* pBody = [pStr dataUsingEncoding:NSUTF8StringEncoding];
    [theRequest setHTTPBody:pBody];

    whitLiFirstCall = [[NSURLConnection alloc] initWithRequest:theRequest delegate:self];
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response {
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
    
    if (connection == whitLiFirstCall)
    {
        [self makeWhitLisSecondCall];        
    }
    else if (connection == whitLiSecondCall)
    {
        [self deserializeSecondCallDataFromWhitLi : data];
        [self makeWhitLisThirdCall];
    }
    else if (connection == whitLiThirdCall)
    {
        [self deserializeFinalDataFromWhitLi : data];
    }
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
    [connection release];
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection 
{
    //NSLog(@"Succeeded! Received %d bytes of data",[responseData length]);    
}

- (void) makeWhitLisSecondCall
{
    FacebookManager *fm = [FacebookManager sharedFacebookManager];
    NSString *tempID = [fm getUserID];
    NSString *tmpString = [[NSString alloc] initWithFormat:@"https://api.Whit.li/user/populate?uid=%@&format=json&api_key=5wm7a2hjgfdhwv4wcru4rq9a", [fm getUserID]];
    
    NSMutableURLRequest *theRequest = [NSMutableURLRequest requestWithURL: [NSURL URLWithString:tmpString]];
    [theRequest setHTTPMethod:@"GET"];
    [theRequest setCachePolicy:NSURLCacheStorageNotAllowed];
    [theRequest setTimeoutInterval:60.0];
    whitLiSecondCall = [[NSURLConnection alloc]  initWithRequest:theRequest delegate:self];
}

- (void) makeWhitLisThirdCall
{
    FacebookManager *fm = [FacebookManager sharedFacebookManager];
    NSString *tmpString = [[NSString alloc] initWithFormat:@"https://api.whit.li/key/get?uid=%@&key_id=1&schema=fb&format=json&api_key=5wm7a2hjgfdhwv4wcru4rq9a", [fm getUserID]];
    
    NSMutableURLRequest *theRequest = [NSMutableURLRequest requestWithURL: [NSURL URLWithString:tmpString]];
    [theRequest setHTTPMethod:@"GET"];
    [theRequest setCachePolicy:NSURLCacheStorageNotAllowed];
    [theRequest setTimeoutInterval:60.0];
    whitLiThirdCall = [[NSURLConnection alloc]  initWithRequest:theRequest delegate:self];
}

- (void) deserializeSecondCallDataFromWhitLi :(NSData *) data
{
    NSError *error = nil;
    NSDictionary *topDictionary = [[CJSONDeserializer deserializer] deserializeAsDictionary:data error:&error];
    
    if  ((topDictionary) && ([topDictionary count] > 0))
    {
        int i = 0;
    } 
}

- (void) deserializeFinalDataFromWhitLi :(NSData *) data
{
    NSError *error = nil;
    NSDictionary *topDictionary = [[CJSONDeserializer deserializer] deserializeAsDictionary:data error:&error];
    
    if  ((topDictionary) && ([topDictionary count] > 0))
    {
        NSDictionary *bodyDict = [topDictionary valueForKey:@"body"];
        self.whitlisResponse = [bodyDict valueForKey:@"key"];
        NSLog (@"finalString = %@",whitlisResponse);
        [self launchFinalWebView];
    }
}

-(void) freeOpenURLConnections
{
    if (whitLiFirstCall)
    {
        [whitLiFirstCall cancel];
        [whitLiFirstCall release];
    }
    
	whitLiFirstCall = nil;

    if (whitLiSecondCall)
    {
        [whitLiSecondCall cancel];
        [whitLiSecondCall release];
    }
    
	whitLiSecondCall = nil;

    if (whitLiThirdCall)
    {
        [whitLiThirdCall cancel];
        [whitLiThirdCall release];
    }
    
	whitLiThirdCall = nil;
}

-(void) launchFinalWebView
{
    GotBooksWebViewController *vc	= [[GotBooksWebViewController alloc] initWithNibName:@"GotBooksWebView" bundle:nil];
    [vc setUrl : whitlisResponse];
    [self presentModalViewController : vc animated:YES];	
}


@end
