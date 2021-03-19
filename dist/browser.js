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
        console.log('test');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWI7Ozs7O0dBS0c7QUFDVSxRQUFBLE9BQU8sR0FBRztJQUNuQixJQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDSixDQUFDO0FBRUY7OztHQUdHO0FBQ1UsUUFBQSxJQUFJLEdBQUcsY0FBWSxDQUFDLENBQUM7QUFFbEM7OztHQUdHO0FBQ1UsUUFBQSxNQUFNLEdBQUcsY0FBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICog5o+S5Lu25a6a5LmJ55qE5pa55rOVXG4gKiBNZXRob2RzIGRlZmluZWQgYnkgZXh0ZW5zaW9uXG4gKiDlj6/ku6XlnKggcGFja2FnZS5qc29uIOmHjOeahCBjb250cmlidXRpb25zIOmHjOWumuS5iSBtZXNzYWdlcyDop6blj5Hov5nph4znmoTmlrnms5VcbiAqIEFuZCBvZiBjb3Vyc2UsIG1lc3NhZ2VzIGNhbiBiZSBkZWZpbmVkIGluIHRoZSBjb250cmlidXRpb25zIHNlY3Rpb24gaW4gcGFja2FnZS5KU09OIHRvIHRyaWdnZXIgdGhlIG1ldGhvZCBoZXJlXG4gKi9cbmV4cG9ydCBjb25zdCBtZXRob2RzID0ge1xuICAgIG9wZW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4gICAgICAgIEVkaXRvci5QYW5lbC5vcGVuKCdyZWZlcmVuY2UtaW1hZ2UnKTtcbiAgICB9LFxufTtcblxuLyoqXG4gKiDlkK/liqjnmoTml7blgJnmiafooYznmoTliJ3lp4vljJbmlrnms5VcbiAqIEluaXRpYWxpemF0aW9uIG1ldGhvZCBwZXJmb3JtZWQgYXQgc3RhcnR1cFxuICovXG5leHBvcnQgY29uc3QgbG9hZCA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICog5o+S5Lu26KKr5YWz6Zet55qE5pe25YCZ5omn6KGM55qE5Y246L295pa55rOVXG4gKiBVbmluc3RhbGwgbWV0aG9kIHBlcmZvcm1lZCB3aGVuIHRoZSBleHRlbnNpb24gaXMgY2xvc2VkXG4gKi9cbmV4cG9ydCBjb25zdCB1bmxvYWQgPSBmdW5jdGlvbigpIHt9O1xuIl19