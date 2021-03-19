"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.afs = void 0;
const fs = __importStar(require("fs"));
const util_1 = require("util");
exports.afs = {
    readFile: util_1.promisify(fs.readFile),
    readdir: util_1.promisify(fs.readdir),
    stat: util_1.promisify(fs.stat),
    exists: util_1.promisify(fs.exists),
    copyFile: util_1.promisify(fs.copyFile),
    writeFile: util_1.promisify(fs.writeFile),
    mkdir: util_1.promisify(fs.mkdir),
    mkdtemp: util_1.promisify(fs.mkdtemp),
    unlink: util_1.promisify(fs.unlink),
    rmdir: util_1.promisify(fs.rmdir)
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZWRpdG9yLTNkLWRldi9hcHAvcGxhdGZvcm1zL2ludGVybmFsL25hdGl2ZS9zb3VyY2UvY29uc29sZS9hZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QjtBQUN6QiwrQkFBK0I7QUFFbEIsUUFBQSxHQUFHLEdBQUc7SUFDZixRQUFRLEVBQUUsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDOUIsSUFBSSxFQUFFLGdCQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUN4QixNQUFNLEVBQUUsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQzVCLFFBQVEsRUFBRSxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDaEMsU0FBUyxFQUFFLGdCQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUNsQyxLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQzFCLE9BQU8sRUFBRSxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDOUIsTUFBTSxFQUFFLGdCQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUM1QixLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0NBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7cHJvbWlzaWZ5fSBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgY29uc3QgYWZzID0ge1xuICAgIHJlYWRGaWxlOiBwcm9taXNpZnkoZnMucmVhZEZpbGUpLFxuICAgIHJlYWRkaXI6IHByb21pc2lmeShmcy5yZWFkZGlyKSxcbiAgICBzdGF0OiBwcm9taXNpZnkoZnMuc3RhdCksXG4gICAgZXhpc3RzOiBwcm9taXNpZnkoZnMuZXhpc3RzKSxcbiAgICBjb3B5RmlsZTogcHJvbWlzaWZ5KGZzLmNvcHlGaWxlKSxcbiAgICB3cml0ZUZpbGU6IHByb21pc2lmeShmcy53cml0ZUZpbGUpLFxuICAgIG1rZGlyOiBwcm9taXNpZnkoZnMubWtkaXIpLFxuICAgIG1rZHRlbXA6IHByb21pc2lmeShmcy5ta2R0ZW1wKSxcbiAgICB1bmxpbms6IHByb21pc2lmeShmcy51bmxpbmspLFxuICAgIHJtZGlyOiBwcm9taXNpZnkoZnMucm1kaXIpXG59O1xuIl19