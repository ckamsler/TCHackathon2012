//
//  FBDialog+ShowInView.m
//  USAToday_iPad
//
//  Created by Tyson Tune on 3/11/10.
//  Copyright 2010 Mercury Intermedia. All rights reserved.
//

#import "FBDialog+ShowInView.h"

static CGFloat kFacebookBlueForCategory[4] = {0.42578125, 0.515625, 0.703125, 1.0};
static CGFloat kBorderBlackForCategory[4] = {0.3, 0.3, 0.3, 1};
static CGFloat kBorderBlueForCategory[4] = {0.23, 0.35, 0.6, 1.0};
static CGFloat kTitleMarginXForCategory = 8;
static CGFloat kTitleMarginYForCategory = 4;
static CGFloat kBorderWidthForCategory = 0;

#define titleLabelHeight 390.00


@implementation FBDialog (ShowInView)

// these are just redeclares of the private methods in FBDialog to prevent warnings for missing methods
- (void)addRoundedRectToPath:(CGContextRef)context rect:(CGRect)rect radius:(float)radius {
	CGContextBeginPath(context);
	CGContextSaveGState(context);
	
	if (radius == 0) {
		CGContextTranslateCTM(context, CGRectGetMinX(rect), CGRectGetMinY(rect));
		CGContextAddRect(context, rect);
	} else {
		rect = CGRectOffset(CGRectInset(rect, 0.5, 0.5), 0.5, 0.5);
		CGContextTranslateCTM(context, CGRectGetMinX(rect)-0.5, CGRectGetMinY(rect)-0.5);
		CGContextScaleCTM(context, radius, radius);
		float fw = CGRectGetWidth(rect) / radius;
		float fh = CGRectGetHeight(rect) / radius;
		
		CGContextMoveToPoint(context, fw, fh/2);
		CGContextAddArcToPoint(context, fw, fh, fw/2, fh, 1);
		CGContextAddArcToPoint(context, 0, fh, 0, fh/2, 1);
		CGContextAddArcToPoint(context, 0, 0, fw/2, 0, 1);
		CGContextAddArcToPoint(context, fw, 0, fw, fh/2, 1);
	}
	
	CGContextClosePath(context);
	CGContextRestoreGState(context);
}


- (void)addObservers {
	// ROTATION CODE BELOW WAS REMOVED TO FIX A ROTATION PROBLEM ON IPAD
//	[[NSNotificationCenter defaultCenter] addObserver:self
//											 selector:@selector(deviceOrientationDidChange:)
//												 name:@"UIDeviceOrientationDidChangeNotification" object:nil];
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(keyboardWillShow:) name:@"UIKeyboardWillShowNotification" object:nil];
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(keyboardWillHide:) name:@"UIKeyboardWillHideNotification" object:nil];
}

- (void)strokeLines:(CGRect)rect stroke:(const CGFloat*)strokeColor {
	CGContextRef context = UIGraphicsGetCurrentContext();
	CGColorSpaceRef space = CGColorSpaceCreateDeviceRGB();
	
	CGContextSaveGState(context);
	CGContextSetStrokeColorSpace(context, space);
	CGContextSetStrokeColor(context, strokeColor);
	CGContextSetLineWidth(context, 1.0);
    
	{
		CGPoint points[] = {rect.origin.x+0.5, rect.origin.y-0.5,
			rect.origin.x+rect.size.width, rect.origin.y-0.5};
		CGContextStrokeLineSegments(context, points, 2);
	}
	{
		CGPoint points[] = {rect.origin.x+0.5, rect.origin.y+rect.size.height-0.5,
			rect.origin.x+rect.size.width-0.5, rect.origin.y+rect.size.height-0.5};
		CGContextStrokeLineSegments(context, points, 2);
	}
	{
		CGPoint points[] = {rect.origin.x+rect.size.width-0.5, rect.origin.y,
			rect.origin.x+rect.size.width-0.5, rect.origin.y+rect.size.height};
		CGContextStrokeLineSegments(context, points, 2);
	}
	{
		CGPoint points[] = {rect.origin.x+0.5, rect.origin.y,
			rect.origin.x+0.5, rect.origin.y+rect.size.height};
		CGContextStrokeLineSegments(context, points, 2);
	}
	
	CGContextRestoreGState(context);
	
	CGColorSpaceRelease(space);
}


- (void)drawRect:(CGRect)rect fill:(const CGFloat*)fillColors radius:(CGFloat)radius {
	CGContextRef context = UIGraphicsGetCurrentContext();
	CGColorSpaceRef space = CGColorSpaceCreateDeviceRGB();
	
	if (fillColors) {
		CGContextSaveGState(context);
		CGContextSetFillColor(context, fillColors);
		if (radius) {
			[self addRoundedRectToPath:context rect:rect radius:radius];
			CGContextFillPath(context);
		} else {
			CGContextFillRect(context, rect);
		}
		CGContextRestoreGState(context);
	}
	
	CGColorSpaceRelease(space);
}


// actual changed below here
- (void)drawRect:(CGRect)rect {
	
	CGRect headerRect = CGRectMake(
								   ceil(rect.origin.x + kBorderWidthForCategory), ceil(rect.origin.y + kBorderWidthForCategory),
								   rect.size.width - kBorderWidthForCategory*2, titleLabelHeight);
	[self drawRect:headerRect fill:kFacebookBlueForCategory radius:0];
	[self strokeLines:headerRect stroke:kBorderBlueForCategory];
	
	CGRect webRect = CGRectMake(
								ceil(rect.origin.x + kBorderWidthForCategory), headerRect.origin.y + headerRect.size.height,
								rect.size.width - kBorderWidthForCategory*2, _webView.frame.size.height+1);
	[self strokeLines:webRect stroke:kBorderBlackForCategory];
}

- (void)showInView:(UIView *)aView{
	self.frame = aView.frame;
	
	[self load];
	
	CGFloat innerWidth = self.frame.size.width - (kBorderWidthForCategory+1)*2;  
	//[_iconView sizeToFit];
	//[_titleLabel sizeToFit];
	[_closeButton sizeToFit];
	/*_titleLabel.frame = CGRectMake(
								   kBorderWidthForCategory + kTitleMarginXForCategory + _iconView.frame.size.width + kTitleMarginXForCategory,
								   kBorderWidthForCategory,
								   innerWidth - (_titleLabel.frame.size.height + _iconView.frame.size.width + kTitleMarginXForCategory*2),
								   _titleLabel.frame.size.height + kTitleMarginYForCategory*2);
     */
	
	/*_iconView.frame = CGRectMake(
								 kBorderWidthForCategory + kTitleMarginXForCategory,
								 kBorderWidthForCategory + floor(titleLabelHeight/2 - _iconView.frame.size.height/2),
								 _iconView.frame.size.width,
								 _iconView.frame.size.height);
     */
	
	_closeButton.frame = CGRectMake(
									self.frame.size.width - (titleLabelHeight + kBorderWidthForCategory),
									kBorderWidthForCategory,
									titleLabelHeight,
									titleLabelHeight);
	
	_webView.frame = CGRectMake(
								kBorderWidthForCategory+1,
								kBorderWidthForCategory + titleLabelHeight,
								innerWidth,
								self.frame.size.height - (titleLabelHeight + 1 + kBorderWidthForCategory*2));
	
	[_spinner sizeToFit];
	[_spinner startAnimating];
	_spinner.center = _webView.center;

	[aView addSubview:self];
	
	[self dialogWillAppear];
    	
	[self addObservers];
}

// keyboard notification overrides

- (void)keyboardWillShow:(NSNotification*)notification {
	UIInterfaceOrientation orientation = [UIApplication sharedApplication].statusBarOrientation;
	if (UIInterfaceOrientationIsLandscape(orientation)) {
//		_webView.frame = CGRectInset(_webView.frame,
//									 -(kPadding + kBorderWidth),
//									 -(kPadding + kBorderWidth) - _titleLabel.frame.size.height);
	}
	
	_showingKeyboard = YES;
}

- (void)keyboardWillHide:(NSNotification*)notification {
	UIInterfaceOrientation orientation = [UIApplication sharedApplication].statusBarOrientation;
	if (UIInterfaceOrientationIsLandscape(orientation)) {
//		_webView.frame = CGRectInset(_webView.frame,
//									 kPadding + kBorderWidth,
//									 kPadding + kBorderWidth + _titleLabel.frame.size.height);
	}
	
	_showingKeyboard = NO;
}

@end
