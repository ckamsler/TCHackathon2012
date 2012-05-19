//
//  FacebookManager.h
//  USAToday1
//
//  Created by Michael Ligon on 3/15/09.
//  Copyright 2009 Mercury Intermedia. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FBConnect.h"

extern NSString * const FacebookManagerDidLogin;
extern NSString * const FacebookManagerDidLogout;
extern NSString * const FacebookManagerUserCancelled;
extern NSString * const FacebookManagerUserNameAvailable;

extern NSString * const kFacebookStoryURLKey;
extern NSString * const kFacebookThumbnailURLKey;
extern NSString * const kFacebookThumbnailImageItemKey;
extern NSString * const kFacebookHeadlineKey;
extern NSString * const kFacebookSummaryKey;

@protocol FacebookManagerDelegate

- (void)postToFacebookSucceeded;
- (void)postToFacebookFailed:(NSString *)error;
- (void)userInitialized;
@optional
- (void)userLoggedOut;
- (void)dialogDidCancel:(FBDialog*)dialog;
- (void)dialogDidSucceed:(FBDialog*)dialog;
- (void)dialogWillShow:(FBDialog*)dialog;
- (void) dismissWholeFBSharingDlg;
@end

@interface FacebookManager : NSObject<FBDialogDelegate, FBSessionDelegate, FBRequestDelegate> {
	id<FacebookManagerDelegate> mainDelegate;
	bool _settingPermission;
	bool _loggingIn;
	bool _gettingUsername;
	bool hasPermission;
	NSString *userName;
	UIView *dialogView;

    //fb 2.0 integration
    Facebook *facebook;
    NSMutableDictionary *userPermissions;

}

+ (void)useAPIKey:(NSString *)anAPIKey secretKey:(NSString *)aSecretKey;
- (void)useAPIKey:(NSString *)anAPIKey secretKey:(NSString *)aSecretKey;

+(FacebookManager*) sharedFacebookManager;
@property(nonatomic,retain) id<FacebookManagerDelegate> mainDelegate;
@property(nonatomic,retain) NSString *userName;
@property(nonatomic,assign) bool hasPermission;
@property (nonatomic, retain) UIView *dialogView;

@property (nonatomic, retain) Facebook *facebook;
@property (nonatomic, retain) NSMutableDictionary *userPermissions;

//-(void)postStory:(MFlowItem*)storyData comment:(NSString*)comment delegate:(id<FacebookManagerDelegate>)delegate;

-(void)postStory:(NSDictionary *)storyData comment:(NSString*)comment delegate:(id<FacebookManagerDelegate>)delegate;

-(void)logoutUser:(id<FacebookManagerDelegate>)delegate;
-(void)setMainDelegate:delegate:(id<FacebookManagerDelegate>)delegate;

- (NSString*)getUsername;
- (void) updateTokenValues;



@end
