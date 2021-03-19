'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.toolbars = [
    {
        position: 'right',
        template: `
            <style>
                .entry-icon {
                    width: 35px;
                    margin-top: 1px;
                }
                .entry-icon.enabled {
                    opacity: 0.7;
                    color: #f49a00;
                }
            </style>

            <ui-icon value='auto-atlas' class="entry-icon" tooltip="i18n:reference-image.entry_tips"></ui-icon>
        `,
        $: {
            icon: '.entry-icon',
        },
        ready($window) {
            const $icon = this.$.icon;
            this.onConfirm = function () {
                const enabled = $icon.classList.toggle('enabled');
                if (enabled) {
                    Editor.Panel.open('reference-image');
                }
                else {
                    Editor.Panel.close('reference-image');
                }
            };
            $icon.src = path_1.join(__dirname, '../icon/new.png');
            $icon.addEventListener('click', this.onConfirm);
        },
        close() {
            if (this.onConfirm) {
                this.$.icon.removeEventListener('confirm', this.onConfirm);
            }
        }
    }
];
exports.methods = {
    // 通过图片创建参考图
    create(path) {
    },
    // 移动参考图
    move(x, y) {
    },
    // 更新参考图
    changeImagePath(path) {
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtd2Fsa2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL3NjZW5lLXdhbGtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsK0JBQTRCO0FBRTVCLE9BQU8sQ0FBQyxRQUFRLEdBQUc7SUFDZjtRQUNJLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztTQWFUO1FBQ0QsQ0FBQyxFQUFFO1lBQ0MsSUFBSSxFQUFFLGFBQWE7U0FDdEI7UUFFRCxLQUFLLENBQUMsT0FBdUI7WUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUF3QixDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUc7Z0JBQ2IsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELElBQUksT0FBTyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNoQztxQkFDSTtvQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsR0FBRyxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMvQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQ0QsS0FBSztZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTthQUM3RDtRQUNMLENBQUM7S0FDSjtDQUNKLENBQUM7QUFFRixPQUFPLENBQUMsT0FBTyxHQUFHO0lBQ2QsWUFBWTtJQUNaLE1BQU0sQ0FBQyxJQUFZO0lBRW5CLENBQUM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO0lBRXpCLENBQUM7SUFFRCxRQUFRO0lBQ1IsZUFBZSxDQUFDLElBQVk7SUFFNUIsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnRzLnRvb2xiYXJzID0gW1xuICAgIHtcbiAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgICAgICAgLmVudHJ5LWljb24ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzVweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuZW50cnktaWNvbi5lbmFibGVkIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC43O1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogI2Y0OWEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3N0eWxlPlxuXG4gICAgICAgICAgICA8dWktaWNvbiB2YWx1ZT0nYXV0by1hdGxhcycgY2xhc3M9XCJlbnRyeS1pY29uXCIgdG9vbHRpcD1cImkxOG46cmVmLW1hcC5lbnRyeV90aXBzXCI+PC91aS1pY29uPlxuICAgICAgICBgLFxuICAgICAgICAkOiB7XG4gICAgICAgICAgICBpY29uOiAnLmVudHJ5LWljb24nLFxuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWR5KCR3aW5kb3c6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCAkaWNvbiA9IHRoaXMuJC5pY29uIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLm9uQ29uZmlybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmFibGVkID0gJGljb24uY2xhc3NMaXN0LnRvZ2dsZSgnZW5hYmxlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIEVkaXRvci5QYW5lbC5vcGVuKCdyZWYtbWFwJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBFZGl0b3IuUGFuZWwuY2xvc2UoJ3JlZi1tYXAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGljb24uc3JjID0gam9pbihfX2Rpcm5hbWUsICcuLi9pY29uL25ldy5wbmcnKTtcbiAgICAgICAgICAgICRpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbmZpcm0pO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZSAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vbkNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiQuaWNvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjb25maXJtJywgdGhpcy5vbkNvbmZpcm0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuXG5leHBvcnRzLm1ldGhvZHMgPSB7XG4gICAgLy8g6YCa6L+H5Zu+54mH5Yib5bu65Y+C6ICD5Zu+XG4gICAgY3JlYXRlKHBhdGg6IHN0cmluZykge1xuXG4gICAgfSxcblxuICAgIC8vIOenu+WKqOWPguiAg+WbvlxuICAgIG1vdmUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcblxuICAgIH0sXG5cbiAgICAvLyDmm7TmlrDlj4LogIPlm75cbiAgICBjaGFuZ2VJbWFnZVBhdGgocGF0aDogc3RyaW5nKSB7XG5cbiAgICB9LFxufTtcbiJdfQ==
