"use strict";
async function showRefernceImage(enabled) {
    await Editor.Message.request('scene', 'execute-scene-script', {
        name: 'reference-image',
        method: 'setImageVisible',
        args: [enabled],
    });
    await Editor.Profile.setConfig('reference-image', 'show', enabled);
}
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
        async ready($window) {
            const $icon = this.$.icon;
            this.onShow = (enabled) => {
                showRefernceImage(enabled);
            };
            this.onConfirm = async () => {
                const enabled = $icon.classList.toggle('enabled');
                showRefernceImage(enabled);
            };
            Editor.Message.addBroadcastListener('reference-image:show', this.onShow);
            $icon.addEventListener('click', this.onConfirm);
        },
        close() {
            this.$.icon.removeEventListener('click', this.onConfirm);
            Editor.Message.removeBroadcastListener('reference-image:show', this.onShow);
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtdG9vbGJhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9zY2VuZS10b29sYmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsS0FBSyxVQUFVLGlCQUFpQixDQUFDLE9BQWdCO0lBQzdDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFO1FBQzFELElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsQ0FBRSxPQUFPLENBQUU7S0FDcEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVELE9BQU8sQ0FBQyxRQUFRLEdBQUc7SUFDZjtRQUNJLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztTQWFUO1FBQ0QsQ0FBQyxFQUFFO1lBQ0MsSUFBSSxFQUFFLFlBQVk7U0FDckI7UUFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQXVCO1lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBd0IsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBZ0IsRUFBRSxFQUFFO2dCQUMvQixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUN4QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELEtBQUs7WUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hGLENBQUM7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmFzeW5jIGZ1bmN0aW9uIHNob3dSZWZlcm5jZUltYWdlKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdleGVjdXRlLXNjZW5lLXNjcmlwdCcsIHtcbiAgICAgICAgbmFtZTogJ3JlZmVyZW5jZS1pbWFnZScsXG4gICAgICAgIG1ldGhvZDogJ3NldEltYWdlVmlzaWJsZScsXG4gICAgICAgIGFyZ3M6IFsgZW5hYmxlZCBdLFxuICAgIH0pO1xuICAgIGF3YWl0IEVkaXRvci5Qcm9maWxlLnNldENvbmZpZygncmVmZXJlbmNlLWltYWdlJywgJ3Nob3cnLCBlbmFibGVkKTtcbn1cblxuZXhwb3J0cy50b29sYmFycyA9IFtcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgIC5zaG93LWljb24ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzVweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuc2hvdy1pY29uLmVuYWJsZWQge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZjQ5YTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgICAgIDx1aS1pY29uIHZhbHVlPSdhdXRvLWF0bGFzJyBjbGFzcz1cInNob3ctaWNvblwiIHRvb2x0aXA9XCJpMThuOnJlZmVyZW5jZS1pbWFnZS5zaG93X3RpcHNcIj48L3VpLWljb24+XG4gICAgICAgIGAsXG4gICAgICAgICQ6IHtcbiAgICAgICAgICAgIGljb246ICcuc2hvdy1pY29uJyxcbiAgICAgICAgfSxcblxuICAgICAgICBhc3luYyByZWFkeSgkd2luZG93OiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgJGljb24gPSB0aGlzLiQuaWNvbiBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5vblNob3cgPSAoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHNob3dSZWZlcm5jZUltYWdlKGVuYWJsZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMub25Db25maXJtID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSAkaWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdlbmFibGVkJyk7XG4gICAgICAgICAgICAgICAgc2hvd1JlZmVybmNlSW1hZ2UoZW5hYmxlZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UuYWRkQnJvYWRjYXN0TGlzdGVuZXIoJ3JlZmVyZW5jZS1pbWFnZTpzaG93JywgdGhpcy5vblNob3cpO1xuICAgICAgICAgICAgJGljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29uZmlybSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlICgpIHtcbiAgICAgICAgICAgIHRoaXMuJC5pY29uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbmZpcm0pO1xuICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVtb3ZlQnJvYWRjYXN0TGlzdGVuZXIoJ3JlZmVyZW5jZS1pbWFnZTpzaG93JywgdGhpcy5vblNob3cpO1xuICAgICAgICB9XG4gICAgfVxuXTtcbiJdfQ==