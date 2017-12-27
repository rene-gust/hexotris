import {AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig} from '@ionic-native/admob-free';
import * as jQuery from 'jquery';
declare var require: any;

export class AdMobBanner {

    static readonly adMobFree = new AdMobFree();
    static toggleShowProBanner = false;
    static countryCode;

    static readonly bannerConfig:AdMobFreeBannerConfig = {
        id: 'ca-app-pub-xxx/xxx',
        autoShow: true,
        isTesting: false,
        offsetTopBar: true
    };

    static readonly interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: false,
        autoShow: true,
        id: 'ca-app-pub-xxx/xxx'
    };

    static pageOpenedCount = 0;

    public static async showBannerAd() {
        try {
            AdMobBanner.adMobFree.banner.config(AdMobBanner.bannerConfig);
            await AdMobBanner.adMobFree.banner.prepare();
        }
        catch (e) {
        }
    }

    public static getCountry() {
        var ip2country = require('ip2country');
        jQuery.ajax({
            type: "GET",
            url: "http://ec2-13-58-63-51.us-east-2.compute.amazonaws.com/ip",
            success: function (data) {
                AdMobBanner.countryCode = ip2country(data['ip']);
            }
        });
    }

    public static gameOver() {
        AdMobBanner.pageOpenedCount++;
        if (AdMobBanner.pageOpenedCount % 2 == 0) {
            AdMobBanner.showBanner();
        }
    }

    private static showBanner() {
        if (!AdMobBanner.toggleShowProBanner) {
            AdMobBanner.toggleShowProBanner = true;
            AdMobBanner.showAffiliateBanner();
        } else {
            AdMobBanner.toggleShowProBanner = false;
            AdMobBanner.showProBanner();
        }
    }

    private static showAffiliateBanner() {
        AdMobBanner.showInterstitial();

    }

    public static showInterstitial() {
        try {
            (<any>window).startAppSDK.showInterstitial();
        }
        catch (e) {
        }
    }

    private static showProBanner() {
        var canvasHeight = jQuery('#canvas').height();
        var $banner = jQuery('#proBanner');
        $banner.show();
        $banner.height(canvasHeight - 100);
        jQuery('#proBannerLink').css('top', (canvasHeight/2) - 150 + 'px');
    }
}