'use strict';

import { join } from "path";

declare const cce: any;
declare const Editor: any;

module.paths.push(join(Editor.App.path, 'node_modules'));

// @ts-ignore
import { PrivateNode, Canvas, Sprite, find, ImageAsset, SpriteFrame } from 'cc';
import { readFileSync } from "fs";

const NAME = 'Reference-Image';

exports.methods = {
    // 通过图片创建参考图
    async getTargets() {
        let canvas = find(`Editor Scene Background/${NAME}-Canvas`);
        if (!canvas) {
            canvas = new PrivateNode(`${NAME}-Canvas`);
            canvas.addComponent(Canvas);
            canvas.parent = find('Editor Scene Background');
        }
        let node = canvas.getChildByName(NAME);
        if (!node) {
            node = new PrivateNode(NAME);
            node.parent = canvas;
        }
        node.active = await Editor.Profile.getConfig('reference-image', 'show');

        let sprite = node.getComponent(Sprite) || node.addComponent(Sprite);
        const color = sprite.color;
        color.a = await Editor.Profile.getConfig('reference-image', 'opacity') || 100;
        sprite.color = color;
        cce.Engine.repaintInEditMode();
        return {
            node,
            sprite
        }
    },

    // 移动参考图
    async moveX(x: number) {
        const { node } = await this.getTargets();
        const position = node.position;
        position.x = x;
        node.position = position;
        cce.Engine.repaintInEditMode();
    },

    async moveY(y: number) {
        const { node } = await this.getTargets();
        const position = node.position;
        position.y = y;
        node.position = position;
        cce.Engine.repaintInEditMode();
    },

    async setOpacity(opacity: number) {
        const { sprite } = await this.getTargets();
        const color = sprite.color;
        color.a = opacity;
        sprite.color = color;
        cce.Engine.repaintInEditMode();
    },

    // 切换参考图
    async switchImages(path: string) {
        const { sprite } = await this.getTargets();
        let data: string | Buffer = readFileSync(path);
        data = new Buffer(data).toString('base64');
        let image = new Image();
        image.src = 'data:png;base64,' + data;
        image.onload = () => {
            sprite.spriteFrame = SpriteFrame.createWithImage(image);
            cce.Engine.repaintInEditMode();
        }
    },

    // 清空
    async resetImage() {
        const { sprite } = await this.getTargets();
        sprite.spriteFrame = null;
        cce.Engine.repaintInEditMode();
    },

    // 设置参考图是否显示
    async setImageVisible(value: boolean) {
        const { node } = await this.getTargets();
        node.active = value;
        if (value) {
            let images = await Editor.Profile.getConfig('reference-image', 'images');
            if (images && images.length === 0) {
                Editor.Panel.open('reference-image');
            }
        }
        cce.Engine.repaintInEditMode();
    }
};
