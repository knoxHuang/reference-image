"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocosConfig = void 0;
exports.cocosConfig = {
    "languages": [
        "js"
    ],
    "platforms": [
        "ios",
        "mac",
        "win32",
        "android",
        "ios-simulator",
        "huawei-agc"
    ],
    "supportTemplates": ["link", "default"],
    "default": {
        "projectName": "MyGame"
    },
    "availableTargetPlatforms": {
        "mac": [
            "mac",
            "ios",
            "android",
            "huawei-agc"
        ],
        "win32": [
            "win32",
            "android",
            "huawei-agc"
        ]
    },
    "defaultGeneratePlatforms": {
        "mac": ["mac", "ios-simulator"],
        "win32": ["win32"]
    },
    "cmake": {
        "win32": {
            "generators": [
                {
                    "G": "Visual Studio 16 2019",
                    "A": "win32"
                },
                {
                    "G": "Visual Studio 15 2017"
                },
                {
                    "G": "Visual Studio 14 2015"
                },
                {
                    "G": "Visual Studio 12 2013"
                },
                {
                    "G": "Visual Studio 11 2012"
                },
                {
                    "G": "Visual Studio 10 2010"
                },
                {
                    "G": "Visual Studio 9 2008"
                }
            ]
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29jb3NDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9lZGl0b3ItM2QtZGV2L2FwcC9wbGF0Zm9ybXMvaW50ZXJuYWwvbmF0aXZlL3NvdXJjZS9jb25zb2xlL2NvY29zQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLFdBQVcsRUFBRTtRQUNULElBQUk7S0FDUDtJQUNELFdBQVcsRUFBRTtRQUNULEtBQUs7UUFDTCxLQUFLO1FBQ0wsT0FBTztRQUNQLFNBQVM7UUFDVCxlQUFlO1FBQ2YsWUFBWTtLQUNmO0lBQ0Qsa0JBQWtCLEVBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO0lBQ3RDLFNBQVMsRUFBRTtRQUNQLGFBQWEsRUFBRSxRQUFRO0tBQzFCO0lBQ0QsMEJBQTBCLEVBQUU7UUFDeEIsS0FBSyxFQUFFO1lBQ0gsS0FBSztZQUNMLEtBQUs7WUFDTCxTQUFTO1lBQ1QsWUFBWTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsT0FBTztZQUNQLFNBQVM7WUFDVCxZQUFZO1NBQ2Y7S0FDSjtJQUNELDBCQUEwQixFQUFFO1FBQ3hCLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUM7UUFDOUIsT0FBTyxFQUFDLENBQUMsT0FBTyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ0wsWUFBWSxFQUFFO2dCQUNWO29CQUNJLEdBQUcsRUFBRSx1QkFBdUI7b0JBQzVCLEdBQUcsRUFBRSxPQUFPO2lCQUNmO2dCQUNEO29CQUNJLEdBQUcsRUFBRSx1QkFBdUI7aUJBQy9CO2dCQUNEO29CQUNJLEdBQUcsRUFBRSx1QkFBdUI7aUJBQy9CO2dCQUNEO29CQUNJLEdBQUcsRUFBRSx1QkFBdUI7aUJBQy9CO2dCQUNEO29CQUNJLEdBQUcsRUFBRSx1QkFBdUI7aUJBQy9CO2dCQUNEO29CQUNJLEdBQUcsRUFBRSx1QkFBdUI7aUJBQy9CO2dCQUNEO29CQUNJLEdBQUcsRUFBRSxzQkFBc0I7aUJBQzlCO2FBQ0o7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjb2Nvc0NvbmZpZyA9IHtcbiAgICBcImxhbmd1YWdlc1wiOiBbXG4gICAgICAgIFwianNcIlxuICAgIF0sXG4gICAgXCJwbGF0Zm9ybXNcIjogW1xuICAgICAgICBcImlvc1wiLFxuICAgICAgICBcIm1hY1wiLFxuICAgICAgICBcIndpbjMyXCIsXG4gICAgICAgIFwiYW5kcm9pZFwiLFxuICAgICAgICBcImlvcy1zaW11bGF0b3JcIixcbiAgICAgICAgXCJodWF3ZWktYWdjXCJcbiAgICBdLFxuICAgIFwic3VwcG9ydFRlbXBsYXRlc1wiOltcImxpbmtcIiwgXCJkZWZhdWx0XCJdLFxuICAgIFwiZGVmYXVsdFwiOiB7XG4gICAgICAgIFwicHJvamVjdE5hbWVcIjogXCJNeUdhbWVcIlxuICAgIH0sXG4gICAgXCJhdmFpbGFibGVUYXJnZXRQbGF0Zm9ybXNcIjoge1xuICAgICAgICBcIm1hY1wiOiBbXG4gICAgICAgICAgICBcIm1hY1wiLFxuICAgICAgICAgICAgXCJpb3NcIixcbiAgICAgICAgICAgIFwiYW5kcm9pZFwiLFxuICAgICAgICAgICAgXCJodWF3ZWktYWdjXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJ3aW4zMlwiOiBbXG4gICAgICAgICAgICBcIndpbjMyXCIsXG4gICAgICAgICAgICBcImFuZHJvaWRcIixcbiAgICAgICAgICAgIFwiaHVhd2VpLWFnY1wiXG4gICAgICAgIF1cbiAgICB9LFxuICAgIFwiZGVmYXVsdEdlbmVyYXRlUGxhdGZvcm1zXCI6IHtcbiAgICAgICAgXCJtYWNcIjpbXCJtYWNcIiwgXCJpb3Mtc2ltdWxhdG9yXCJdLFxuICAgICAgICBcIndpbjMyXCI6W1wid2luMzJcIl1cbiAgICB9LFxuICAgIFwiY21ha2VcIjoge1xuICAgICAgICBcIndpbjMyXCI6IHtcbiAgICAgICAgICAgIFwiZ2VuZXJhdG9yc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDE2IDIwMTlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBXCI6IFwid2luMzJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDE1IDIwMTdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDE0IDIwMTVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDEyIDIwMTNcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDExIDIwMTJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDEwIDIwMTBcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkdcIjogXCJWaXN1YWwgU3R1ZGlvIDkgMjAwOFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==