//
//  FacebookManager.m
//  USAToday1
//
//  Created by Michael Ligon on 3/15/09.
//  Copyright 2009 Mercury Intermedia. All rights reserved.
//

#import "FacebookManager.h"
#import "FBConnect.h"
//#import "CJSONSerializer.h"
#import "FBDialog+ShowInView.h"


///////////////////////////////////////////////////////////////////////////////////////////////////
// This application will not work until you enter your Facebook application's API key here:

//static NSString* kApiKey = @"110109099000613";

// Enter either your API secret or a callback URL (as described in documentation):
//static NSString* kApiSecret = @"54b69eb052aeae2b609dcdb31bb47406"; // @"<YOUR SECRET KEY>";
//static NSString* kGetSessionProxy = nil; // @"<YOUR SESSION CALLBACK)>";

static NSString* kAppId = @"223697494408531";

///////////////////////////////////////////////////////////////////////////////////////////////////

NSString * const FacebookManagerDidLogin = @"facebookManagerDidLogin";
NSString * const FacebookManagerDidLogout = @"facebookManagerDidLogout";
NSString * const FacebookManagerUserCancelled = @"facebookManagerUserCancelled";
NSString * const FacebookManagerUserNameAvailable = @"facebookManagerUserNameAvailable";


NSString * const kFacebookStoryURLKey = @"URL";
NSString * const kFacebookThumbnailURLKey = @"ThumbnailURL";
NSString * const kFacebookThumbnailImageItemKey = @"facebookThumbImage";
NSString * const kFacebookHeadlineKey = @"Headline";
NSString * const kFacebookSummaryKey  = @"Summary";


@implementation FacebookManager

static FacebookManager *_instance;

@synthesize mainDelegate,userName,hasPermission,dialogView;

@synthesize facebook;
@synthesize userPermissions;

- (void)initFacebook
{
    facebook = [[Facebook alloc] initWithAppId:kAppId andDelegate:self];
    [self updateTokenValues];
    
    userPermissions = [[NSMutableDictionary alloc] initWithCapacity:1];
}

- (void) updateTokenValues
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if ([defaults objectForKey:@"FBAccessTokenKey"] && [defaults objectForKey:@"FBExpirationDateKey"]) {
        facebook.accessToken = [defaults objectForKey:@"FBAccessTokenKey"];
        facebook.expirationDate = [defaults objectForKey:@"FBExpirationDateKey"];
    }    
}

- (void) dealloc
{
    // FIXME: this thing has hanging delegates all over the place with no references to kill them

    [facebook release];
    [userPermissions release];

    [(NSObject *)mainDelegate release];
    [dialogView release];
    [userName release];
    [super dealloc];
}

#pragma mark -
#pragma mark Key setters

+ (void)useAPIKey:(NSString *)anAPIKey secretKey:(NSString *)aSecretKey {
	FacebookManager *fm = [FacebookManager sharedFacebookManager];
    
    [fm initFacebook];
}


+(FacebookManager*) sharedFacebookManager {
	
	if (_instance == nil){
		
		_instance = [[FacebookManager alloc] init];
		
	}
	
	return _instance;
	
}

- (id)init {
	return self;
}

- (void)useViewForDialogs:(UIView *)aView {
	self.dialogView = aView;
}	

- (NSString*)getUsername {
	if (self.userName == nil) {
		self.userName = [[NSUserDefaults standardUserDefaults] stringForKey:@"facebookUsername"];
	}
	return self.userName;
}

-(void)setMainDelegate:delegate:(id<FacebookManagerDelegate>)dl
{
    mainDelegate = dl;
}

- (void)postStory:(NSDictionary *)storyData comment:(NSString*)comment delegate:(id<FacebookManagerDelegate>)delegate 
{
	mainDelegate = delegate;
    
    if (![[self facebook] isSessionValid]) {
        int i = 0;
    } else {
        int j = 0;
    }
	
    NSMutableDictionary* params1 = [NSMutableDictionary dictionaryWithObjectsAndKeys:                                    
                                    [storyData objectForKey:kFacebookHeadlineKey], @"name",
                                    [storyData objectForKey:kFacebookStoryURLKey], @"link",
                                    [storyData objectForKey:kFacebookSummaryKey], @"description",
                                    [storyData objectForKey:kFacebookThumbnailURLKey], @"picture",
                                    @"Source: USATODAY.com", @"caption",
                                    comment, @"message",
                                    nil];
    
    [self.facebook requestWithGraphPath:@"me/feed" 
                              andParams:params1
                          andHttpMethod:@"POST"
                            andDelegate:self];

}

- (void)dialog:(FBDialog*)dialog didFailWithError:(NSError*)error {
	NSLog(@"dialog:(FBDialog*)dialog didFailWithError:%@",error);
}

- (void)dialogWillDisappear {
	//NSLog(@"dialogWillDisappear");
}


////////

- (void)storeAuthData:(NSString *)accessToken expiresAt:(NSDate *)expiresAt {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:accessToken forKey:@"FBAccessTokenKey"];
    [defaults setObject:expiresAt forKey:@"FBExpirationDateKey"];
    [defaults synchronize];
}

#pragma mark - FBSessionDelegate Methods
/**
 * Called when the user has logged in successfully.
 */
- (void)fbDidLogin {
    
    [self storeAuthData:[[self facebook] accessToken] expiresAt:[[self facebook] expirationDate]];
    
    NSNotification *note = [NSNotification notificationWithName:FacebookManagerDidLogin object:self];
    [[NSNotificationCenter defaultCenter] postNotification:note];

    NSMutableDictionary *params = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                   @"name",  @"fields",nil];
    [self.facebook requestWithGraphPath:@"me" andParams:params andDelegate:self];
}

-(void)fbDidExtendToken:(NSString *)accessToken expiresAt:(NSDate *)expiresAt {
    NSLog(@"token extended");
    [self storeAuthData:accessToken expiresAt:expiresAt];
}

/**
 * Called when the user canceled the authorization dialog.
 */
-(void)fbDidNotLogin:(BOOL)cancelled 
{
    NSNotification *note = [NSNotification notificationWithName:FacebookManagerUserCancelled object:self];
    [[NSNotificationCenter defaultCenter] postNotification:note];
}

/**
 * Called when the request logout has succeeded.
 */
- (void)fbDidLogout {
    
    // Remove saved authorization information if it exists and it is
    // ok to clear it (logout, session invalid, app unauthorized)
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults removeObjectForKey:@"FBAccessTokenKey"];
    [defaults removeObjectForKey:@"FBExpirationDateKey"];
    [defaults synchronize];
}

/**
 * Called when the session has expired.
 */
- (void)fbSessionInvalidated {
    UIAlertView *alertView = [[UIAlertView alloc]
                              initWithTitle:@"USA TODAY"
                              message:@"Your facebook session has expired."
                              delegate:nil
                              cancelButtonTitle:@"OK"
                              otherButtonTitles:nil,
                              nil];
    [alertView show];
    [alertView release];
    [self fbDidLogout];
}

#pragma mark - FBRequestDelegate Methods
/**
 * Called when the Facebook API request has returned a response. This callback
 * gives you access to the raw response. It's called before
 * (void)request:(FBRequest *)request didLoad:(id)result,
 * which is passed the parsed response object.
 */
- (void)request:(FBRequest *)request didReceiveResponse:(NSURLResponse *)response {
    //NSLog(@"received response");
}

/**
 * Called when a request returns and its response has been parsed into
 * an object. The resulting object may be a dictionary, an array, a string,
 * or a number, depending on the format of the API response. If you need access
 * to the raw response, use:
 *
 * (void)request:(FBRequest *)request
 *      didReceiveResponse:(NSURLResponse *)response
 */
- (void)request:(FBRequest *)request didLoad:(id)result {

    if ([result isKindOfClass:[NSArray class]] && ([result count] > 0)) {
        result = [result objectAtIndex:0];
    }
    
    if ([result objectForKey:@"name"]) 
    {
        self.userName = [result objectForKey:@"name"];
        [[NSUserDefaults standardUserDefaults] setValue:self.userName forKey:@"facebookUsername"];

        NSNotification *note = [NSNotification notificationWithName:FacebookManagerUserNameAvailable object:self];
        [[NSNotificationCenter defaultCenter] postNotification:note];

    }        
}

/**
 * Called when an error prevents the Facebook API request from completing
 * successfully.
 */
- (void)request:(FBRequest *)request didFailWithError:(NSError *)error {
    NSLog(@"Err message: %@", [[error userInfo] objectForKey:@"error_msg"]);
    NSLog(@"Err code: %d", [error code]);
    [facebook logout];
}


///////////////////////////////////////////////////////////////////////////////////////////////////

@end