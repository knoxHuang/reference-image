"use strict";
exports.toolbars = [
    {
        position: 'right',
        template: `
            <style>
                .show-icon {
                    width: 35px;
                    margin-top: 1px;
                }
                .show-icon.enabled {
                    opacity: 0.7;
                    color: #f49a00;
                }
            </style>

            <ui-icon value='auto-atlas' class="show-icon" tooltip="i18n:reference-image.show_tips"></ui-icon>
        `,
        $: {
            icon: '.show-icon',
        },
        onConfirm() {
            const $icon = this.$.icon;
            const enabled = $icon.classList.toggle('enabled');
            if (enabled) {
            }
            else {
            }
        },
        ready($window) {
            this.$.icon.addEventListener('click', this.onConfirm);
        },
        close() {
            this.$.icon.removeEventListener('click', this.onConfirm);
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtdG9vbGJhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9zY2VuZS10b29sYmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxDQUFDLFFBQVEsR0FBRztJQUNmO1FBQ0ksUUFBUSxFQUFFLE9BQU87UUFDakIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O1NBYVQ7UUFDRCxDQUFDLEVBQUU7WUFDQyxJQUFJLEVBQUUsWUFBWTtTQUNyQjtRQUVELFNBQVM7WUFDTCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQXdCLENBQUM7WUFDOUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsSUFBSSxPQUFPLEVBQUU7YUFFWjtpQkFDSTthQUVKO1FBQ0wsQ0FBQztRQUVELEtBQUssQ0FBQyxPQUF1QjtZQUN6QixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxLQUFLO1lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RCxDQUFDO0tBQ0o7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cy50b29sYmFycyA9IFtcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgIC5zaG93LWljb24ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzVweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuc2hvdy1pY29uLmVuYWJsZWQge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZjQ5YTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgICAgIDx1aS1pY29uIHZhbHVlPSdhdXRvLWF0bGFzJyBjbGFzcz1cInNob3ctaWNvblwiIHRvb2x0aXA9XCJpMThuOnJlZmVyZW5jZS1pbWFnZS5zaG93X3RpcHNcIj48L3VpLWljb24+XG4gICAgICAgIGAsXG4gICAgICAgICQ6IHtcbiAgICAgICAgICAgIGljb246ICcuc2hvdy1pY29uJyxcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNvbmZpcm0oKSB7XG4gICAgICAgICAgICBjb25zdCAkaWNvbiA9IHRoaXMuJC5pY29uIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBlbmFibGVkID0gJGljb24uY2xhc3NMaXN0LnRvZ2dsZSgnZW5hYmxlZCcpO1xuICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZWFkeSgkd2luZG93OiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy4kLmljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29uZmlybSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlICgpIHtcbiAgICAgICAgICAgIHRoaXMuJC5pY29uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbmZpcm0pO1xuICAgICAgICB9XG4gICAgfVxuXTtcbiJdfQ==