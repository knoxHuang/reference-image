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

            <ui-icon value='ref-image' class="show-icon" tooltip="i18n:reference-image.show_tips"></ui-icon>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtdG9vbGJhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9zY2VuZS10b29sYmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsS0FBSyxVQUFVLGlCQUFpQixDQUFDLE9BQWdCO0lBQzdDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFO1FBQzFELElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsQ0FBRSxPQUFPLENBQUU7S0FDcEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVELE9BQU8sQ0FBQyxRQUFRLEdBQUc7SUFDZjtRQUNJLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztTQWFUO1FBQ0QsQ0FBQyxFQUFFO1lBQ0MsSUFBSSxFQUFFLFlBQVk7U0FDckI7UUFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQXVCO1lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBd0IsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBZ0IsRUFBRSxFQUFFO2dCQUMvQixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUN4QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELEtBQUs7WUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hGLENBQUM7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmRlY2xhcmUgY29uc3QgRWRpdG9yOiBhbnk7XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dSZWZlcm5jZUltYWdlKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdleGVjdXRlLXNjZW5lLXNjcmlwdCcsIHtcbiAgICAgICAgbmFtZTogJ3JlZmVyZW5jZS1pbWFnZScsXG4gICAgICAgIG1ldGhvZDogJ3NldEltYWdlVmlzaWJsZScsXG4gICAgICAgIGFyZ3M6IFsgZW5hYmxlZCBdLFxuICAgIH0pO1xuICAgIGF3YWl0IEVkaXRvci5Qcm9maWxlLnNldENvbmZpZygncmVmZXJlbmNlLWltYWdlJywgJ3Nob3cnLCBlbmFibGVkKTtcbn1cblxuZXhwb3J0cy50b29sYmFycyA9IFtcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgIC5zaG93LWljb24ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzVweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuc2hvdy1pY29uLmVuYWJsZWQge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZjQ5YTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgICAgIDx1aS1pY29uIHZhbHVlPSdyZWYtaW1hZ2UnIGNsYXNzPVwic2hvdy1pY29uXCIgdG9vbHRpcD1cImkxOG46cmVmZXJlbmNlLWltYWdlLnNob3dfdGlwc1wiPjwvdWktaWNvbj5cbiAgICAgICAgYCxcbiAgICAgICAgJDoge1xuICAgICAgICAgICAgaWNvbjogJy5zaG93LWljb24nLFxuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIHJlYWR5KCR3aW5kb3c6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCAkaWNvbiA9IHRoaXMuJC5pY29uIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLm9uU2hvdyA9IChlbmFibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgc2hvd1JlZmVybmNlSW1hZ2UoZW5hYmxlZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5vbkNvbmZpcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICRpY29uLmNsYXNzTGlzdC50b2dnbGUoJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBzaG93UmVmZXJuY2VJbWFnZShlbmFibGVkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5hZGRCcm9hZGNhc3RMaXN0ZW5lcigncmVmZXJlbmNlLWltYWdlOnNob3cnLCB0aGlzLm9uU2hvdyk7XG4gICAgICAgICAgICAkaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Db25maXJtKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2UgKCkge1xuICAgICAgICAgICAgdGhpcy4kLmljb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29uZmlybSk7XG4gICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5yZW1vdmVCcm9hZGNhc3RMaXN0ZW5lcigncmVmZXJlbmNlLWltYWdlOnNob3cnLCB0aGlzLm9uU2hvdyk7XG4gICAgICAgIH1cbiAgICB9XG5dO1xuIl19