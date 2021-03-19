"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleParams = exports.PLUGIN_NAME_ENUM = exports.LANGUAGE = exports.PLATFORM_ENUM = exports.DEFAULT_VALUES = void 0;
exports.DEFAULT_VALUES = {
    QUIET: false,
    IOS_BUNDLE_ID: 'com.cocos.demo',
    MAC_BUNDLE_ID: 'com.cocos.demo',
    ANDROID_BUNDLE_ID: 'com.cocos.demo',
    CMAKE_GENERATOR: '',
    CMAKE_PATH: '',
    TEAM_ID: '',
};
var PLATFORM_ENUM;
(function (PLATFORM_ENUM) {
    PLATFORM_ENUM["UNKNOWN"] = "unknown";
    PLATFORM_ENUM["IOS"] = "ios";
    PLATFORM_ENUM["MAC"] = "mac";
    PLATFORM_ENUM["WIN32"] = "win32";
    PLATFORM_ENUM["ANDROID"] = "android";
    PLATFORM_ENUM["IOSSIMULATOR"] = "iossimulator";
    PLATFORM_ENUM["HUAWEI-AGC"] = "huawei-agc";
})(PLATFORM_ENUM = exports.PLATFORM_ENUM || (exports.PLATFORM_ENUM = {}));
var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE[LANGUAGE["JS"] = 0] = "JS";
})(LANGUAGE = exports.LANGUAGE || (exports.LANGUAGE = {}));
var PLUGIN_NAME_ENUM;
(function (PLUGIN_NAME_ENUM) {
    PLUGIN_NAME_ENUM["NEW"] = "New";
    PLUGIN_NAME_ENUM["COMPILE"] = "Compile";
    PLUGIN_NAME_ENUM["GENERATE"] = "Generate";
    PLUGIN_NAME_ENUM["RUN"] = "Run";
})(PLUGIN_NAME_ENUM = exports.PLUGIN_NAME_ENUM || (exports.PLUGIN_NAME_ENUM = {}));
/**
 * cocos console 的参数类
 */
class ConsoleParams {
    constructor() {
        this.quiet = false;
        this.portrait = false;
        this.platform = PLATFORM_ENUM.ANDROID;
        this.language = LANGUAGE.JS;
        this.projDir = '';
        this.buildDir = '';
        this.directory = '';
        this.enginePath = '';
        this.templateName = '';
        this.cmakeGenerator = '';
        this.cmakePath = '';
        this.teamid = '';
        this.sharedDir = '';
        this.pluginName = PLUGIN_NAME_ENUM.NEW;
        this.projectName = '';
        this.debug = true;
        this.cMakeConfig = {
            CC_USE_GLES3: false,
            CC_USE_GLES2: true,
        };
        this.orientation = '';
        this.android = {
            packageName: exports.DEFAULT_VALUES.ANDROID_BUNDLE_ID,
            keyStorePath: '',
            sdkPath: '',
            ndkPath: '',
            androidInstant: false,
            remoteUrl: '',
            apiLevel: 27,
            appABIs: [],
            keystorePassword: '',
            keystoreAlias: '',
            keystoreAliasPassword: '',
            appBundle: false,
            orientation: {
                portrait: true,
                landscapeLeft: false,
                landscapeRight: false,
                upsideDown: false
            }
        };
        this.ios = {
            bundleId: exports.DEFAULT_VALUES.IOS_BUNDLE_ID,
            simulator: false,
            orientation: {
                portrait: true,
                landscapeLeft: false,
                landscapeRight: false,
                upsideDown: false
            }
        };
        this.mac = {
            bundleId: exports.DEFAULT_VALUES.MAC_BUNDLE_ID,
        };
    }
    toJSON() {
        const res = {};
        Object.keys(this).forEach((key) => {
            res[key] = this[key];
        });
        return res;
    }
}
exports.ConsoleParams = ConsoleParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2VkaXRvci0zZC1kZXYvYXBwL3BsYXRmb3Jtcy9pbnRlcm5hbC9uYXRpdmUvc291cmNlL2NvbnNvbGUvZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGNBQWMsR0FBRztJQUMxQixLQUFLLEVBQUUsS0FBSztJQUNaLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsYUFBYSxFQUFFLGdCQUFnQjtJQUMvQixpQkFBaUIsRUFBRSxnQkFBZ0I7SUFDbkMsZUFBZSxFQUFFLEVBQUU7SUFDbkIsVUFBVSxFQUFFLEVBQUU7SUFDZCxPQUFPLEVBQUUsRUFBRTtDQUNkLENBQUM7QUFFRixJQUFZLGFBUVg7QUFSRCxXQUFZLGFBQWE7SUFDckIsb0NBQW1CLENBQUE7SUFDbkIsNEJBQVcsQ0FBQTtJQUNYLDRCQUFXLENBQUE7SUFDWCxnQ0FBZSxDQUFBO0lBQ2Ysb0NBQW1CLENBQUE7SUFDbkIsOENBQTZCLENBQUE7SUFDN0IsMENBQTJCLENBQUE7QUFDL0IsQ0FBQyxFQVJXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBUXhCO0FBRUQsSUFBWSxRQUVYO0FBRkQsV0FBWSxRQUFRO0lBQ2hCLG1DQUFFLENBQUE7QUFDTixDQUFDLEVBRlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFFbkI7QUFFRCxJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDeEIsK0JBQVcsQ0FBQTtJQUNYLHVDQUFtQixDQUFBO0lBQ25CLHlDQUFxQixDQUFBO0lBQ3JCLCtCQUFXLENBQUE7QUFFZixDQUFDLEVBTlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFNM0I7QUFrRUQ7O0dBRUc7QUFDSCxNQUFhLGFBQWE7SUEyRHRCO1FBMURPLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixhQUFRLEdBQWtCLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDaEQsYUFBUSxHQUFhLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQXFCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztRQUNwRCxnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQUMxQixVQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQWlCO1lBQy9CLFlBQVksRUFBRSxLQUFLO1lBQ25CLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUE7UUFDTSxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUVoQyxZQUFPLEdBQW1CO1lBQ3RCLFdBQVcsRUFBRSxzQkFBYyxDQUFDLGlCQUFpQjtZQUM3QyxZQUFZLEVBQUUsRUFBRTtZQUNoQixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsY0FBYyxFQUFFLEtBQUs7WUFDckIsU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixhQUFhLEVBQUUsRUFBRTtZQUNqQixxQkFBcUIsRUFBRSxFQUFFO1lBQ3pCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFdBQVcsRUFBRTtnQkFDVCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLFVBQVUsRUFBRSxLQUFLO2FBQ3BCO1NBQ0osQ0FBQTtRQUVELFFBQUcsR0FBZTtZQUNkLFFBQVEsRUFBRSxzQkFBYyxDQUFDLGFBQWE7WUFDdEMsU0FBUyxFQUFFLEtBQUs7WUFDaEIsV0FBVyxFQUFFO2dCQUNULFFBQVEsRUFBRSxJQUFJO2dCQUNkLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixjQUFjLEVBQUUsS0FBSztnQkFDckIsVUFBVSxFQUFFLEtBQUs7YUFDcEI7U0FDSixDQUFBO1FBRUQsUUFBRyxHQUFlO1lBQ2QsUUFBUSxFQUFFLHNCQUFjLENBQUMsYUFBYTtTQUN6QyxDQUFBO0lBR0QsQ0FBQztJQUVNLE1BQU07UUFDVCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQXJFRCxzQ0FxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgREVGQVVMVF9WQUxVRVMgPSB7XG4gICAgUVVJRVQ6IGZhbHNlLFxuICAgIElPU19CVU5ETEVfSUQ6ICdjb20uY29jb3MuZGVtbycsXG4gICAgTUFDX0JVTkRMRV9JRDogJ2NvbS5jb2Nvcy5kZW1vJyxcbiAgICBBTkRST0lEX0JVTkRMRV9JRDogJ2NvbS5jb2Nvcy5kZW1vJyxcbiAgICBDTUFLRV9HRU5FUkFUT1I6ICcnLFxuICAgIENNQUtFX1BBVEg6ICcnLFxuICAgIFRFQU1fSUQ6ICcnLFxufTtcblxuZXhwb3J0IGVudW0gUExBVEZPUk1fRU5VTSB7XG4gICAgVU5LTk9XTiA9ICd1bmtub3duJyxcbiAgICBJT1MgPSAnaW9zJyxcbiAgICBNQUMgPSAnbWFjJyxcbiAgICBXSU4zMiA9ICd3aW4zMicsXG4gICAgQU5EUk9JRCA9ICdhbmRyb2lkJyxcbiAgICBJT1NTSU1VTEFUT1IgPSAnaW9zc2ltdWxhdG9yJyxcbiAgICAnSFVBV0VJLUFHQycgPSAnaHVhd2VpLWFnYydcbn1cblxuZXhwb3J0IGVudW0gTEFOR1VBR0Uge1xuICAgIEpTXG59XG5cbmV4cG9ydCBlbnVtIFBMVUdJTl9OQU1FX0VOVU0ge1xuICAgIE5FVyA9ICdOZXcnLFxuICAgIENPTVBJTEUgPSAnQ29tcGlsZScsXG4gICAgR0VORVJBVEUgPSAnR2VuZXJhdGUnLFxuICAgIFJVTiA9ICdSdW4nXG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ01ha2VDb25maWcge1xuICAgIC8vIOW8leaTjuaooeWdl1xuICAgIFVTRV9BVURJTz86IGJvb2xlYW47XG4gICAgVVNFX1ZJREVPPzogYm9vbGVhbjtcbiAgICBVU0VfV0VCVklFVz86IGJvb2xlYW47XG5cbiAgICAvLyDmuLLmn5PlkI7nq69cbiAgICBDQ19VU0VfTUVUQUw/OiBib29sZWFuO1xuICAgIENDX1VTRV9WVUtBTj86IGJvb2xlYW47XG4gICAgQ0NfVVNFX0dMRVMzOiBib29sZWFuO1xuICAgIENDX1VTRV9HTEVTMjogYm9vbGVhbjtcblxuICAgIC8vIOW8leaTjui3r+W+hFxuICAgIENPQ09TX1hfUEFUSD86IHN0cmluZztcblxuICAgIC8vYXBw5ZCN56ewXG4gICAgQVBQX05BTUU/OiBzdHJpbmc7XG5cbiAgICAvL2lvcyDlkowgbWFjIOeahGJ1bmRsZSBpZOiuvue9rlxuICAgIE1BQ09TWF9CVU5ETEVfR1VJX0lERU5USUZJRVI/OiBzdHJpbmc7XG5cbiAgICAvL+WFtuS7luWxnuaAp1xuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9yaWVudGF0aW9uIHtcbiAgICBsYW5kc2NhcGVSaWdodDogYm9vbGVhbjtcbiAgICBsYW5kc2NhcGVMZWZ0OiBib29sZWFuO1xuICAgIHBvcnRyYWl0OiBib29sZWFuO1xuICAgIHVwc2lkZURvd246IGJvb2xlYW47XG59XG5cbi8qKlxuICogYW5kcm9pZCDlj4LmlbDphY3nva5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQW5kcm9pZFBhcmFtcyB7XG4gICAgcGFja2FnZU5hbWU6IHN0cmluZztcbiAgICBrZXlTdG9yZVBhdGg6IHN0cmluZztcbiAgICBzZGtQYXRoOiBzdHJpbmc7XG4gICAgbmRrUGF0aDogc3RyaW5nO1xuICAgIGFuZHJvaWRJbnN0YW50OiBib29sZWFuLFxuICAgIHJlbW90ZVVybD86IHN0cmluZztcbiAgICBhcGlMZXZlbDogbnVtYmVyO1xuICAgIGFwcEFCSXM6IEFycmF5PHN0cmluZz47XG4gICAga2V5c3RvcmVQYXNzd29yZDogc3RyaW5nO1xuICAgIGtleXN0b3JlQWxpYXM6IHN0cmluZztcbiAgICBrZXlzdG9yZUFsaWFzUGFzc3dvcmQ6IHN0cmluZztcblxuICAgIG9yaWVudGF0aW9uOiBJT3JpZW50YXRpb247XG4gICAgYXBwQnVuZGxlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElJb3NQYXJhbXMge1xuICAgIGJ1bmRsZUlkOiBzdHJpbmc7XG4gICAgc2ltdWxhdG9yOiBib29sZWFuO1xuICAgIG9yaWVudGF0aW9uOiBJT3JpZW50YXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hY1BhcmFtcyB7XG4gICAgYnVuZGxlSWQ6IHN0cmluZztcbn1cblxuXG4vKipcbiAqIGNvY29zIGNvbnNvbGUg55qE5Y+C5pWw57G7XG4gKi9cbmV4cG9ydCBjbGFzcyBDb25zb2xlUGFyYW1zIHtcbiAgICBwdWJsaWMgcXVpZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgcG9ydHJhaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgcGxhdGZvcm06IFBMQVRGT1JNX0VOVU0gPSBQTEFURk9STV9FTlVNLkFORFJPSUQ7XG4gICAgcHVibGljIGxhbmd1YWdlOiBMQU5HVUFHRSA9IExBTkdVQUdFLkpTO1xuICAgIHB1YmxpYyBwcm9qRGlyOiBzdHJpbmcgPSAnJztcbiAgICBwdWJsaWMgYnVpbGREaXI6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBkaXJlY3Rvcnk6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBlbmdpbmVQYXRoOiBzdHJpbmcgPSAnJztcbiAgICBwdWJsaWMgdGVtcGxhdGVOYW1lOiBzdHJpbmcgPSAnJztcbiAgICBwdWJsaWMgY21ha2VHZW5lcmF0b3I6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBjbWFrZVBhdGg6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyB0ZWFtaWQ6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBzaGFyZWREaXI6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBwbHVnaW5OYW1lOiBQTFVHSU5fTkFNRV9FTlVNID0gUExVR0lOX05BTUVfRU5VTS5ORVc7XG4gICAgcHVibGljIHByb2plY3ROYW1lPzogc3RyaW5nID0gJyc7XG4gICAgcHVibGljIGRlYnVnOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgY01ha2VDb25maWc6IElDTWFrZUNvbmZpZyA9IHtcbiAgICAgICAgQ0NfVVNFX0dMRVMzOiBmYWxzZSxcbiAgICAgICAgQ0NfVVNFX0dMRVMyOiB0cnVlLFxuICAgIH1cbiAgICBwdWJsaWMgb3JpZW50YXRpb246IHN0cmluZyA9ICcnO1xuXG4gICAgYW5kcm9pZDogSUFuZHJvaWRQYXJhbXMgPSB7XG4gICAgICAgIHBhY2thZ2VOYW1lOiBERUZBVUxUX1ZBTFVFUy5BTkRST0lEX0JVTkRMRV9JRCxcbiAgICAgICAga2V5U3RvcmVQYXRoOiAnJyxcbiAgICAgICAgc2RrUGF0aDogJycsXG4gICAgICAgIG5ka1BhdGg6ICcnLFxuICAgICAgICBhbmRyb2lkSW5zdGFudDogZmFsc2UsXG4gICAgICAgIHJlbW90ZVVybDogJycsXG4gICAgICAgIGFwaUxldmVsOiAyNyxcbiAgICAgICAgYXBwQUJJczogW10sXG4gICAgICAgIGtleXN0b3JlUGFzc3dvcmQ6ICcnLFxuICAgICAgICBrZXlzdG9yZUFsaWFzOiAnJyxcbiAgICAgICAga2V5c3RvcmVBbGlhc1Bhc3N3b3JkOiAnJyxcbiAgICAgICAgYXBwQnVuZGxlOiBmYWxzZSxcbiAgICAgICAgb3JpZW50YXRpb246IHtcbiAgICAgICAgICAgIHBvcnRyYWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFuZHNjYXBlTGVmdDogZmFsc2UsXG4gICAgICAgICAgICBsYW5kc2NhcGVSaWdodDogZmFsc2UsXG4gICAgICAgICAgICB1cHNpZGVEb3duOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW9zOiBJSW9zUGFyYW1zID0ge1xuICAgICAgICBidW5kbGVJZDogREVGQVVMVF9WQUxVRVMuSU9TX0JVTkRMRV9JRCxcbiAgICAgICAgc2ltdWxhdG9yOiBmYWxzZSxcbiAgICAgICAgb3JpZW50YXRpb246IHtcbiAgICAgICAgICAgIHBvcnRyYWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFuZHNjYXBlTGVmdDogZmFsc2UsXG4gICAgICAgICAgICBsYW5kc2NhcGVSaWdodDogZmFsc2UsXG4gICAgICAgICAgICB1cHNpZGVEb3duOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFjOiBJTWFjUGFyYW1zID0ge1xuICAgICAgICBidW5kbGVJZDogREVGQVVMVF9WQUxVRVMuTUFDX0JVTkRMRV9JRCxcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9KU09OKCkge1xuICAgICAgICBjb25zdCByZXMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXNba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufVxuIl19