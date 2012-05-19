//
//  ViewController.h
//  GotBooks
//
//  Created by Arvind, Vipul on 5/19/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

/*
 
 Populate user information for the first time:
 
 https://api.whit.li/user/importToken?api_key=5wm7a2hjgfdhwv4wcru4rq9a
 
 request body includes FB uid and oauth:
 uid=5544332211&oauth_token=AAACEdEose0cBAE2L0Ce5smFxCEui40XTgeXuXnZCmU1eYqyNjEBM1bx5WSnf0Ew38bkBQZARGzeZAv5Tg4RQTkI9W4R61C258gmZBWwbbAZDZD&format=json
  
 If the user is login in, Whitli can refresh Facebook data:
 https://api.Whit.li/user/populate?uid=5544332211&format=json&api_key=5wm7a2hjgfdhwv4wcru4rq9a
 
 Get Key containing information:
 https://api.whit.li/key/get?uid=55443322111&key_id=1&schema=fb&format=json&api_key=5wm7a2hjgfdhwv4wcru4rq9a
 
*/ 

#import <UIKit/UIKit.h>
#import "FacebookManager.h"

@interface ViewController : UIViewController <FacebookManagerDelegate>
{
    NSArray *permissions;
    
    IBOutlet UIButton *loginButton;
    IBOutlet UILabel *loginLabel;
}

@property (nonatomic, retain) NSArray *permissions;

- (IBAction) loginButtonPressed  : (id)sender;

@end
