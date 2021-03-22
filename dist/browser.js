'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
/**
 * 插件定义的方法
 * Methods defined by extension
 * 可以在 package.json 里的 contributions 里定义 messages 触发这里的方法
 * And of course, messages can be defined in the contributions section in package.JSON to trigger the method here
 */
exports.methods = {
    open() {
        Editor.Panel.open('reference-image');
    },
};
/**
 * 启动的时候执行的初始化方法
 * Initialization method performed at startup
 */
exports.load = function () { };
/**
 * 插件被关闭的时候执行的卸载方法
 * Uninstall method performed when the extension is closed
 */
exports.unload = function () { };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWI7Ozs7O0dBS0c7QUFDVSxRQUFBLE9BQU8sR0FBRztJQUNuQixJQUFJO1FBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0osQ0FBQztBQUVGOzs7R0FHRztBQUNVLFFBQUEsSUFBSSxHQUFHLGNBQVksQ0FBQyxDQUFDO0FBRWxDOzs7R0FHRztBQUNVLFFBQUEsTUFBTSxHQUFHLGNBQVksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIOaPkuS7tuWumuS5ieeahOaWueazlVxuICogTWV0aG9kcyBkZWZpbmVkIGJ5IGV4dGVuc2lvblxuICog5Y+v5Lul5ZyoIHBhY2thZ2UuanNvbiDph4znmoQgY29udHJpYnV0aW9ucyDph4zlrprkuYkgbWVzc2FnZXMg6Kem5Y+R6L+Z6YeM55qE5pa55rOVXG4gKiBBbmQgb2YgY291cnNlLCBtZXNzYWdlcyBjYW4gYmUgZGVmaW5lZCBpbiB0aGUgY29udHJpYnV0aW9ucyBzZWN0aW9uIGluIHBhY2thZ2UuSlNPTiB0byB0cmlnZ2VyIHRoZSBtZXRob2QgaGVyZVxuICovXG5leHBvcnQgY29uc3QgbWV0aG9kcyA9IHtcbiAgICBvcGVuKCkge1xuICAgICAgICBFZGl0b3IuUGFuZWwub3BlbigncmVmZXJlbmNlLWltYWdlJyk7XG4gICAgfSxcbn07XG5cbi8qKlxuICog5ZCv5Yqo55qE5pe25YCZ5omn6KGM55qE5Yid5aeL5YyW5pa55rOVXG4gKiBJbml0aWFsaXphdGlvbiBtZXRob2QgcGVyZm9ybWVkIGF0IHN0YXJ0dXBcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWQgPSBmdW5jdGlvbigpIHt9O1xuXG4vKipcbiAqIOaPkuS7tuiiq+WFs+mXreeahOaXtuWAmeaJp+ihjOeahOWNuOi9veaWueazlVxuICogVW5pbnN0YWxsIG1ldGhvZCBwZXJmb3JtZWQgd2hlbiB0aGUgZXh0ZW5zaW9uIGlzIGNsb3NlZFxuICovXG5leHBvcnQgY29uc3QgdW5sb2FkID0gZnVuY3Rpb24oKSB7fTtcbiJdfQ==