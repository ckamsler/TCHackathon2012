//
//  ViewController.h
//  GotBooks
//
//  Created by Arvind, Vipul on 5/19/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

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
