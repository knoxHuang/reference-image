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
            const $icon = this.$.icon as HTMLImageElement;
            const enabled = $icon.classList.toggle('enabled');
            if (enabled) {

            }
            else {

            }
        },

        ready($window: HTMLDivElement) {
            this.$.icon.addEventListener('click', this.onConfirm);
        },
        close () {
            this.$.icon.removeEventListener('click', this.onConfirm);
        }
    }
];
