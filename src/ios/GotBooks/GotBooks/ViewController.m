//
//  ViewController.m
//  GotBooks
//
//  Created by Arvind, Vipul on 5/19/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize permissions;

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    permissions = [[NSArray alloc] initWithObjects: @"offline_access",
                                                    @"publish_stream", 
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

@end
