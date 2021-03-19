'use strict';

import { join } from "path";

module.paths.push(join(Editor.App.path, 'node_modules'));

import { PrivateNode, Sprite, find, ImageAsset, SpriteFrame } from 'cc';
import { readFileSync } from "fs";

const NAME = 'Reference-Image';

exports.methods = {
    // 通过图片创建参考图
    getTargets() {
        let node = find(`Editor Scene Background/${NAME}`);
        if (!node) {
            const root = find('Editor Scene Background');
            node = new PrivateNode(NAME);
            node.parent = root;
            cce.Engine.repaintInEditMode();
        }
        let sprite = node.getComponent(Sprite);
        if (!sprite) {
            sprite = node.addComponent(Sprite);
            this.setOpacity(100);
        }
        return {
            node,
            sprite
        }
    },

    // 移动参考图
    moveX(x: number) {
        const { node } = this.getTargets();
        const position = node.position;
        position.x = x;
        node.position = position;
        cce.Engine.repaintInEditMode();
    },

    moveY(y: number) {
        const { node } = this.getTargets();
        const position = node.position;
        position.y = y;
        node.color = position;
        cce.Engine.repaintInEditMode();
    },

    setOpacity(opacity: number) {
        const { sprite } = this.getTargets();
        const color = sprite.color;
        color.a = opacity;
        sprite.color = color;
        cce.Engine.repaintInEditMode();
    },

    // 切换参考图
    switchImages(path: string) {
        const { sprite } = this.getTargets();
        let data: string | Buffer = readFileSync(path);
        data = new Buffer(data).toString('base64');
        let image = new Image();
        image.src = 'data:png;base64,' + data;
        image.onload = function () {
            sprite.spriteFrame = SpriteFrame.createWithImage();
            cce.Engine.repaintInEditMode();
        }
    },

    // 设置参考图是否显示
    setImageVisible(value: boolean) {
        const { node } = this.getTargets();
        node.active = value;
        cce.Engine.repaintInEditMode();
    }
};
