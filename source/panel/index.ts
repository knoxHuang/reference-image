'use strict';

import { dirname, basename, extname, join } from 'path';
import { readFileSync } from "fs";

const { I18n, Message, Dialog, Profile } = Editor;

export const style = readFileSync(join(__dirname, '../../dist/index.css'), 'utf8');
export const template = readFileSync(join(__dirname, '../../../static/index.html'), 'utf8');

export const $ = {
    ui_images: '.images',
    btnAdd: '.add-images',
    btnDel: '.del-images',

    x: '.x',
    y: '.y',
    opacity: '.opacity'
};

let images: string[] = [];
let index: number = 0;
export const methods = {

    updateImages() {
        // @ts-ignore
        const panel = this;
        // @ts-ignore
        const ui_images: HTMLElement = panel.$.ui_images;
        // clear
        while ( ui_images.firstChild ) {
            ui_images.removeChild(ui_images.firstChild);
        }
        for (let i = 0; i < images.length; ++i) {
            const path = images[i];
            const option = document.createElement('div');
            option.innerHTML = `<option value=${i}>${basename(path, extname(path))}</option>`;
            ui_images.appendChild(option);
        }
        ui_images.setAttribute('value', `${index}`);
    },

    async onAddImage() {
        const result = await Dialog.select({
            title: I18n.t('reference-image.dialog.add-image-title'),
            path: await Profile.getConfig('reference-image', 'root-path') || '',
            filters: [{ name: 'image', extensions: ['png', 'jpg'] }],
        });
        if (!result || !result.filePaths[0]) {
            return;
        }
        images = images.concat(result.filePaths);
        this.updateImages();
        const path = dirname(result.filePaths[0]);
        await Profile.setConfig('reference-image', 'root-path', path);
    },

    async onDelImage() {
        const result = await Dialog.info(I18n.t('reference-image.dialog.del_image_message'), {
            buttons: [
                I18n.t('reference-image.dialog.yes'),
                I18n.t('reference-image.dialog.cancel'),
            ],
            default: 0,
            cancel: 1,
        });
        if (result.response === 0) {
            images.splice(index, 1);
            index--;
            if (index < 0) {
                index = 0;
            }
            this.updateImages();
        }
    },

    async switchImages(path: string) {
        debugger;
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'switchImages',
            args: [ path ],
        });
    },

    async onMoveX(event: Event) {
        // @ts-ignore
        const x = event.target.value;
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'moveX',
            args: [ x ],
        });
        await Profile.setConfig('reference-image', 'x', x);
    },

    async onMoveY(event: Event) {
        // @ts-ignore
        const y = event.target.value;
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'moveY',
            args: [ y ],
        });
        await Profile.setConfig('reference-image', 'y', y);
    },

    async onSetOpacity(event: Event) {
        // @ts-ignore
        const opacity = event.target.value;
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'setOpacity',
            args: [ opacity ],
        });
        await Profile.setConfig('reference-image', 'opacity', opacity);
    },

    registerEventListeners() {
        // @ts-ignore
        const $ = this.$;
        $.x.addEventListener('confirm', this.onMoveX);
        $.y.addEventListener('confirm', this.onMoveY);
        $.opacity.addEventListener('confirm', this.onSetOpacity);
        $.ui_images.addEventListener('confirm', this.switchImages);
        $.btnAdd.addEventListener('click', this.onAddImage);
        $.btnDel.addEventListener('click', this.onDelImage);
    },

    unregisterEventListeners() {
        // @ts-ignore
        const $ = this.$;
        $.x.removeEventListener('confirm', this.onMoveX);
        $.y.removeEventListener('confirm', this.onMoveY);
        $.opacity.removeEventListener('confirm', this.onSetOpacity);
        $.ui_images.removeEventListener('confirm', this.switchImages);
        $.btnAdd.removeEventListener('click', this.onAddImage);
        $.btnDel.removeEventListener('click', this.onDelImage);
    }
};

export const ready = async function() {
    // @ts-ignore
    const panel = this;
    panel.registerEventListeners();
    panel.$.x.value = await Profile.getConfig('reference-image', 'x') || 0;
    panel.$.y.value = await Profile.getConfig('reference-image', 'y');
    panel.$.opacity.value = await Profile.getConfig('reference-image', 'opacity');
    index = await Profile.getConfig('reference-image', 'index') || index;
    panel.$.ui_images.value = index;
    images = await Profile.getConfig('reference-image', 'images');
    panel.updateImages();
};

export const close = async function () {
    // @ts-ignore
    const panel = this;
    panel.unregisterEventListeners();
    await Profile.setConfig('reference-image', 'images', images);
    await Profile.setConfig('reference-image', 'index', index);
};
