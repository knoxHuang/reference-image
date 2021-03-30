'use strict';

declare const Editor: any;

import { dirname, basename, extname, join } from 'path';
import { readFileSync } from "fs";

const { I18n, Message, Dialog, Profile } = Editor;

export const style = readFileSync(join(__dirname, '../../dist/index.css'), 'utf8');
export const template = readFileSync(join(__dirname, '../../statics/index.html'), 'utf8');

let ui_editor: HTMLElement;
let ui_images: HTMLElement;
let ui_x: HTMLElement;
let ui_y: HTMLElement;
let ui_opacity: HTMLElement;
let btn_add: HTMLElement;
let btn_del: HTMLElement;
export const $ = {
    ui_editor: '.config',
    ui_images: '.images',
    btnAdd: '.add-image',
    btnDel: '.del-image',

    x: '.x',
    y: '.y',
    opacity: '.opacity'
};

let images: string[] = [];
let index: number = 0;
let x: number = 0;
let y: number = 0;
let opacity: number = 0;
let show = true;

let onMoveXFunc: any;
let onMoveYFunc: any;
let onAddImageFunc: any;
let onDelImageFunc: any;
let onSetOpacityFunc: any;
let onSwitchImagesFunc: any;
export const methods = {

    async 'scene:ready'() {
        this.sendSwitchImages();
        Message.broadcast('reference-image:show', show);
    },

    async updateImages() {
        // @ts-ignore
        const panel = this;
        // clear
        while ( ui_images.firstChild ) {
            ui_images.removeChild(ui_images.firstChild);
        }
        for (let i = 0; i < images.length; ++i) {
            const option = document.createElement('option');
            option.setAttribute('value', `${i}`);
            ui_images.appendChild(option);
            const path = images[i];
            option.text = basename(path, extname(path));
        }
        btn_del.removeAttribute('disabled');
        ui_editor.removeAttribute('disabled');
        ui_images.removeAttribute('placeholder');
        ui_images.setAttribute('value', '');
        if (images.length === 0) {
            ui_images.setAttribute('placeholder', I18n.t('reference-image.none'));
            btn_del.setAttribute('disabled', '');
            ui_editor.setAttribute('disabled', '');
            await this.resetImage();
        }
        else {
            ui_images.setAttribute('value', `${index}`);
            await this.sendSwitchImages();
        }
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
        for (let path of result.filePaths) {
            if (!images.includes(path)) {
                images.push(path);
            }
        }
        index = images.length - 1;
        await this.updateImages();
        const path = dirname(result.filePaths[0]);
        await Profile.setConfig('reference-image', 'root-path', path);
    },

    async onDelImage() {
        const result = await Dialog.info(I18n.t('reference-image.dialog.del_image_message', {
            path: images[index]
        }), {
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
            await this.updateImages();
        }
    },

    async resetImage() {
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'resetImage',
        });
    },

    async sendSwitchImages() {
        const path: string = images[index];
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'switchImages',
            args: [ path ],
        });
        await this.sendMoveX();
        await this.sendMoveY();
        await this.sendOpacity();
    },

    async onSwitchImages(event: Event) {
        // @ts-ignore
        index = parseInt(event.target.value);
        await this.sendSwitchImages();
    },

    async sendOpacity() {
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'setOpacity',
            args: [ opacity ],
        });
    },

    async sendMoveX() {
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'moveX',
            args: [ x ],
        });
    },

    async sendMoveY() {
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'moveY',
            args: [ y ],
        });
    },

    async onMoveX(event: Event) {
        // @ts-ignore
        x = event.target.value;
        await Profile.setConfig('reference-image', 'x', x);
        await this.sendMoveX();
    },

    async onMoveY(event: Event) {
        // @ts-ignore
        y = event.target.value;
        await Profile.setConfig('reference-image', 'y', y);
        await this.sendMoveY();
    },

    async onSetOpacity(event: Event) {
        // @ts-ignore
        opacity = event.target.value;
        await Profile.setConfig('reference-image', 'opacity', opacity);
        await this.sendOpacity();
    },

    registerEventListeners() {
        onMoveXFunc = this.onMoveX.bind(this);
        onMoveYFunc = this.onMoveY.bind(this);
        onSetOpacityFunc = this.onSetOpacity.bind(this);
        onSwitchImagesFunc = this.onSwitchImages.bind(this);
        onAddImageFunc = this.onAddImage.bind(this);
        onDelImageFunc = this.onDelImage.bind(this);

        ui_x.addEventListener('confirm', onMoveXFunc);
        ui_y.addEventListener('confirm', onMoveYFunc);
        ui_opacity.addEventListener('confirm', onSetOpacityFunc);
        ui_images.addEventListener('confirm', onSwitchImagesFunc);
        btn_add.addEventListener('click', onAddImageFunc);
        btn_del.addEventListener('click', onDelImageFunc);
    },

    unregisterEventListeners() {
        ui_x.removeEventListener('confirm', onMoveXFunc);
        ui_y.removeEventListener('confirm', onMoveYFunc);
        ui_opacity.removeEventListener('confirm', onSetOpacityFunc);
        ui_images.removeEventListener('confirm', onSwitchImagesFunc);
        btn_add.removeEventListener('click', onAddImageFunc);
        btn_del.removeEventListener('click', onDelImageFunc);
    }
};

export const ready = async function() {
    // @ts-ignore
    const panel = this;

    ui_x = panel.$.x;
    ui_y = panel.$.y;
    ui_editor = panel.$.ui_editor;
    ui_images = panel.$.ui_images;
    ui_opacity = panel.$.opacity;
    btn_add = panel.$.btnAdd;
    btn_del = panel.$.btnDel;

    panel.registerEventListeners();
    x = await Profile.getConfig('reference-image', 'x') || 0;
    y = await Profile.getConfig('reference-image', 'y') || 0;
    opacity = await Profile.getConfig('reference-image', 'opacity') || 100;
    index = await Profile.getConfig('reference-image', 'index') || index;
    images = await Profile.getConfig('reference-image', 'images') || [];

    // @ts-ignore
    ui_x.value = x;
    // @ts-ignore
    ui_y.value = y;
    // @ts-ignore
    ui_opacity.value = opacity;
    // @ts-ignore
    ui_images.value = index;
    await panel.updateImages();

    show = await Profile.getConfig('reference-image', 'show');
    Message.broadcast('reference-image:show', show);
};

export const close = async function () {
    // @ts-ignore
    this.unregisterEventListeners();
    await Profile.setConfig('reference-image', 'images', images);
    await Profile.setConfig('reference-image', 'index', index);
};
