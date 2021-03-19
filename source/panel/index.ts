'use strict';

import { dirname, basename, join } from 'path';
import { readFileSync } from "fs";
import {pa} from "../../../../../editor-3d-dev/app/platforms/internal/native/source/console/cocosCli";

const { I18n, Message, Dialog, Profile } = Editor;

export const style = readFileSync(join(__dirname, '../../dist/index.css'), 'utf8');
export const template = readFileSync(join(__dirname, '../../../static/index.html'), 'utf8');

export const $ = {
    images: '.images',
    btnAdd: '.add-images',
    btnDel: '.del-images',

    x: '.x',
    y: '.y',
    opacity: '.opacity'
};

export const methods = {

    pushImage(path: string) {

    },

    async onAddImage() {
        const result = await Dialog.select({
            title: I18n.t('reference-image.dialog.add-image-title'),
            path: await Profile.getConfig('reference-image', 'add-image-path') || '',
            filters: [{ name: 'image', extensions: ['png', 'jpg'] }],
        });
        if (!result || !result.filePaths[0]) {
            return;
        }
        for (let path in result.filePaths) {
            this.pushImage(path);
        }
        //
        const path = dirname(result.filePaths[0]);
        await Profile.setConfig('reference-image', 'add-image-path', path);
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

        }
    },

    async switchImages(path: string) {
        await Message.request('scene', 'execute-scene-script', {
            name: 'reference-image',
            method: 'switchImages',
            args: [ path ],
        });
        await Profile.setConfig('reference-image', 'path', path);
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
        $.images.addEventListener('confirm', this.switchImages);
        $.btnAdd.addEventListener('click', this.onAddImage);
        $.btnDel.addEventListener('click', this.onDelImage);
    },

    unregisterEventListeners() {
        // @ts-ignore
        const $ = this.$;
        $.x.removeEventListener('confirm', this.onMoveX);
        $.y.removeEventListener('confirm', this.onMoveY);
        $.opacity.removeEventListener('confirm', this.onSetOpacity);
        $.images.removeEventListener('confirm', this.switchImages);
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
    panel.$.images.value = await Profile.getConfig('reference-image', 'index');
    const images = await Profile.getConfig('reference-image', 'images');
    for (let path in images) {
        panel.pushImage(path);
    }
};

export const close = function () {
    // @ts-ignore
    const panel = this;
    panel.unregisterEventListeners();
};
