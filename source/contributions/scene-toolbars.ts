
async function showRefernceImage(enabled: boolean) {
    await Editor.Message.request('scene', 'execute-scene-script', {
        name: 'reference-image',
        method: 'setImageVisible',
        args: [ enabled ],
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

        async ready($window: HTMLDivElement) {
            const $icon = this.$.icon as HTMLImageElement;
            this.onShow = (enabled: boolean) => {
                showRefernceImage(enabled);
            };
            this.onConfirm = async () => {
                const enabled = $icon.classList.toggle('enabled');
                showRefernceImage(enabled);
            };
            Editor.Message.addBroadcastListener('reference-image:show', this.onShow);
            $icon.addEventListener('click', this.onConfirm);
        },
        close () {
            this.$.icon.removeEventListener('click', this.onConfirm);
            Editor.Message.removeBroadcastListener('reference-image:show', this.onShow);
        }
    }
];
