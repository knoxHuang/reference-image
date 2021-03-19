'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
module.paths.push(path_1.join(Editor.App.path, 'node_modules'));
const cc_1 = require("cc");
const fs_1 = require("fs");
const NAME = 'Reference-Image';
exports.methods = {
    // 通过图片创建参考图
    getTargets() {
        let node = cc_1.find(`Editor Scene Background/${NAME}`);
        if (!node) {
            const root = cc_1.find('Editor Scene Background');
            node = new cc_1.PrivateNode(NAME);
            node.parent = root;
            cce.Engine.repaintInEditMode();
        }
        let sprite = node.getComponent(cc_1.Sprite);
        if (!sprite) {
            sprite = node.addComponent(cc_1.Sprite);
            this.setOpacity(100);
        }
        return {
            node,
            sprite
        };
    },
    // 移动参考图
    moveX(x) {
        const { node } = this.getTargets();
        const position = node.position;
        position.x = x;
        node.position = position;
        cce.Engine.repaintInEditMode();
    },
    moveY(y) {
        const { node } = this.getTargets();
        const position = node.position;
        position.y = y;
        node.color = position;
        cce.Engine.repaintInEditMode();
    },
    setOpacity(opacity) {
        const { sprite } = this.getTargets();
        const color = sprite.color;
        color.a = opacity;
        sprite.color = color;
        cce.Engine.repaintInEditMode();
    },
    // 切换参考图
    switchImages(path) {
        const { sprite } = this.getTargets();
        let data = fs_1.readFileSync(path);
        data = new Buffer(data).toString('base64');
        let image = new Image();
        image.src = 'data:png;base64,' + data;
        image.onload = function () {
            sprite.spriteFrame = cc_1.SpriteFrame.createWithImage();
            cce.Engine.repaintInEditMode();
        };
    },
    // 设置参考图是否显示
    setImageVisible(value) {
        const { node } = this.getTargets();
        node.active = value;
        cce.Engine.repaintInEditMode();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtd2Fsa2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvc2NlbmUtd2Fsa2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYiwrQkFBNEI7QUFFNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFFekQsMkJBQXdFO0FBQ3hFLDJCQUFrQztBQUVsQyxNQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUUvQixPQUFPLENBQUMsT0FBTyxHQUFHO0lBQ2QsWUFBWTtJQUNaLFVBQVU7UUFDTixJQUFJLElBQUksR0FBRyxTQUFJLENBQUMsMkJBQTJCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE1BQU0sSUFBSSxHQUFHLFNBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQzdDLElBQUksR0FBRyxJQUFJLGdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUNELE9BQU87WUFDSCxJQUFJO1lBQ0osTUFBTTtTQUNULENBQUE7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLEtBQUssQ0FBQyxDQUFTO1FBQ1gsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUztRQUNYLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWU7UUFDdEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsUUFBUTtJQUNSLFlBQVksQ0FBQyxJQUFZO1FBQ3JCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQW9CLGlCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxNQUFNLEdBQUc7WUFDWCxNQUFNLENBQUMsV0FBVyxHQUFHLGdCQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRCxZQUFZO0lBQ1osZUFBZSxDQUFDLEtBQWM7UUFDMUIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5tb2R1bGUucGF0aHMucHVzaChqb2luKEVkaXRvci5BcHAucGF0aCwgJ25vZGVfbW9kdWxlcycpKTtcblxuaW1wb3J0IHsgUHJpdmF0ZU5vZGUsIFNwcml0ZSwgZmluZCwgSW1hZ2VBc3NldCwgU3ByaXRlRnJhbWUgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuY29uc3QgTkFNRSA9ICdSZWZlcmVuY2UtSW1hZ2UnO1xuXG5leHBvcnRzLm1ldGhvZHMgPSB7XG4gICAgLy8g6YCa6L+H5Zu+54mH5Yib5bu65Y+C6ICD5Zu+XG4gICAgZ2V0VGFyZ2V0cygpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBmaW5kKGBFZGl0b3IgU2NlbmUgQmFja2dyb3VuZC8ke05BTUV9YCk7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGZpbmQoJ0VkaXRvciBTY2VuZSBCYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgICBub2RlID0gbmV3IFByaXZhdGVOb2RlKE5BTUUpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSByb290O1xuICAgICAgICAgICAgY2NlLkVuZ2luZS5yZXBhaW50SW5FZGl0TW9kZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChTcHJpdGUpO1xuICAgICAgICBpZiAoIXNwcml0ZSkge1xuICAgICAgICAgICAgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoU3ByaXRlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3BhY2l0eSgxMDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgc3ByaXRlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8g56e75Yqo5Y+C6ICD5Zu+XG4gICAgbW92ZVgoeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gdGhpcy5nZXRUYXJnZXRzKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbm9kZS5wb3NpdGlvbjtcbiAgICAgICAgcG9zaXRpb24ueCA9IHg7XG4gICAgICAgIG5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgY2NlLkVuZ2luZS5yZXBhaW50SW5FZGl0TW9kZSgpO1xuICAgIH0sXG5cbiAgICBtb3ZlWSh5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgeyBub2RlIH0gPSB0aGlzLmdldFRhcmdldHMoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBub2RlLnBvc2l0aW9uO1xuICAgICAgICBwb3NpdGlvbi55ID0geTtcbiAgICAgICAgbm9kZS5jb2xvciA9IHBvc2l0aW9uO1xuICAgICAgICBjY2UuRW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgfSxcblxuICAgIHNldE9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHsgc3ByaXRlIH0gPSB0aGlzLmdldFRhcmdldHMoKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSBzcHJpdGUuY29sb3I7XG4gICAgICAgIGNvbG9yLmEgPSBvcGFjaXR5O1xuICAgICAgICBzcHJpdGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgY2NlLkVuZ2luZS5yZXBhaW50SW5FZGl0TW9kZSgpO1xuICAgIH0sXG5cbiAgICAvLyDliIfmjaLlj4LogIPlm75cbiAgICBzd2l0Y2hJbWFnZXMocGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgc3ByaXRlIH0gPSB0aGlzLmdldFRhcmdldHMoKTtcbiAgICAgICAgbGV0IGRhdGE6IHN0cmluZyB8IEJ1ZmZlciA9IHJlYWRGaWxlU3luYyhwYXRoKTtcbiAgICAgICAgZGF0YSA9IG5ldyBCdWZmZXIoZGF0YSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gJ2RhdGE6cG5nO2Jhc2U2NCwnICsgZGF0YTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gU3ByaXRlRnJhbWUuY3JlYXRlV2l0aEltYWdlKCk7XG4gICAgICAgICAgICBjY2UuRW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8g6K6+572u5Y+C6ICD5Zu+5piv5ZCm5pi+56S6XG4gICAgc2V0SW1hZ2VWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gdGhpcy5nZXRUYXJnZXRzKCk7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gdmFsdWU7XG4gICAgICAgIGNjZS5FbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcbiAgICB9XG59O1xuIl19