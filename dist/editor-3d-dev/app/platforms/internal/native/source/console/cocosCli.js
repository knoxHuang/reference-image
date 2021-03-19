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
exports.NativeConsole = exports.cchelper = exports.EXT_LIST = exports.CCPlugin = exports.pa = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ml = __importStar(require("./multiLanguage"));
const cocosConfig_1 = require("./cocosConfig");
const os = __importStar(require("os"));
const afs_1 = require("./afs");
const childProcess = __importStar(require("child_process"));
const default_1 = require("./default");
const editor = __importStar(require("editor"));
const iconv = require('iconv-lite');
var ArgumentItemType;
(function (ArgumentItemType) {
    ArgumentItemType[ArgumentItemType["BOOLFLAG"] = 0] = "BOOLFLAG";
    ArgumentItemType[ArgumentItemType["STRINGVALUE"] = 1] = "STRINGVALUE";
    ArgumentItemType[ArgumentItemType["ACTION"] = 2] = "ACTION";
    ArgumentItemType[ArgumentItemType["ENUM"] = 3] = "ENUM";
})(ArgumentItemType || (ArgumentItemType = {}));
/** pre-defined arguments */
exports.pa = {
    help: { short: "-h", long: "--help", help: "show this message", argType: ArgumentItemType.ACTION },
    srcDir: { short: "-s", long: "--src", help: ml.getString("COCOSHELPARGSRC"), argType: ArgumentItemType.STRINGVALUE },
    quiet: {
        short: '-q',
        long: "--quiet",
        help: ml.getString("COCOSHELPARGPLATFORM"),
        argType: ArgumentItemType.BOOLFLAG
    },
    platform: {
        short: "-p",
        long: "--platform",
        help: ml.getString("COCOSHELPARGPLATFORM"),
        argType: ArgumentItemType.ENUM,
        enumValues: cocosConfig_1.cocosConfig.platforms
    },
    doListPlatforms: {
        short: "",
        long: "--list-platforms",
        help: "list available platforms",
        argType: ArgumentItemType.ACTION
    },
    projDir: {
        short: "",
        long: "--proj-dir",
        help: ml.getString("COCOSHELPARGPROJDIR"),
        argType: ArgumentItemType.STRINGVALUE
    },
    buildDir: {
        short: "",
        long: "--build-dir",
        help: "specify directory where to build project",
        argType: ArgumentItemType.STRINGVALUE
    },
    packageName: {
        short: "-p",
        long: "--package",
        help: ml.getString("NEWARGPACKAGE"),
        argType: ArgumentItemType.STRINGVALUE
    },
    directory: {
        short: "-d",
        long: "--directory",
        help: ml.getString("NEWARGDIR"),
        argType: ArgumentItemType.STRINGVALUE
    },
    iosBundleid: {
        short: "",
        long: "--ios-bundleid",
        help: ml.getString("NEWARGIOSBUNDLEID"),
        argType: ArgumentItemType.STRINGVALUE
    },
    macBundleid: {
        short: "",
        long: "--mac-bundleid",
        help: ml.getString("NEWARGMACBUNDLEID"),
        argType: ArgumentItemType.STRINGVALUE
    },
    enginePath: {
        short: "-e",
        long: "--engine-path",
        help: ml.getString("NEWARGENGINEPATH"),
        argType: ArgumentItemType.STRINGVALUE
    },
    portrait: { short: "", long: "--portrait", help: ml.getString("NEWARGPORTRAIT"), argType: ArgumentItemType.BOOLFLAG },
    noNative: {
        short: "",
        long: "--no-native",
        help: ml.getString("NEWARGNONATIVE"),
        argType: ArgumentItemType.BOOLFLAG
    },
    language: {
        short: "-l",
        long: "--language",
        help: ml.getString("NEWARGLANG"),
        argType: ArgumentItemType.ENUM,
        enumValues: cocosConfig_1.cocosConfig.languages
    },
    doListTemplates: {
        short: "",
        long: "--list-templates",
        help: "List available templates. To be used with --template option.",
        argType: ArgumentItemType.ACTION
    },
    templateName: {
        short: "-k",
        long: "--template-name",
        help: 'Name of the template to be used to create the game. To list available names, use --list-templates.',
        argType: ArgumentItemType.STRINGVALUE
    },
    cmakeGenerator: {
        short: "-G",
        long: "--cmake-generator",
        help: "Set cmake generator",
        argType: ArgumentItemType.STRINGVALUE
    },
    cmakePath: {
        short: "",
        long: "--cmake-path",
        help: "path to cmake.exe or cmake",
        argType: ArgumentItemType.STRINGVALUE
    },
    iosSimulator: {
        short: "",
        long: "--ios-simulator",
        help: "enable iOS simulator support",
        argType: ArgumentItemType.BOOLFLAG
    },
    teamid: { short: "", long: "--team-id", help: "Apple developer team id", argType: ArgumentItemType.STRINGVALUE },
    sharedDir: {
        short: "",
        long: "--shared-dir",
        help: "Shared source directory",
        argType: ArgumentItemType.STRINGVALUE
    },
};
class CCPlugin {
    constructor(param) {
        this._cocos2dPath = null;
        this._templatePath = null;
        this._pluginName = null;
        this.extArgs = [];
        this.parser = param;
        //工程里面的 native/engine 目录
        this.nativeTemplateDir = path.join(Editor.Project.path, 'native', 'engine');
        this.platformTemplatePath = path.join(this.nativeTemplateDir, this.parser.platform);
    }
    extendArgv(args) {
        this.extArgs = this.extArgs.concat(args);
    }
    getCocosRoot() {
        let enginePath = this.getEnginePath();
        if (!!enginePath) {
            return enginePath;
        }
        if (!this._cocos2dPath) {
            this._cocos2dPath = path.join(__dirname, "../../..");
            if (!fs.existsSync(path.join(this._cocos2dPath, "cocos"))) {
                console.warn(ml.getString("COCOS_WARNING_ENGINE_NOT_FOUND"));
                this._cocos2dPath = null;
            }
        }
        return this._cocos2dPath;
    }
    getConsleRoot() {
        let enginePath = this.getEnginePath();
        if (!!enginePath) {
            return path.join(enginePath, "tools/cocos-console");
        }
        return path.join(__dirname, "..");
    }
    getTemplatesRootPath() {
        let enginePath = this.getEnginePath();
        if (!!enginePath) {
            return path.join(enginePath, "templates");
        }
        if (!this._templatePath) {
            let cocos2dPath = this.getCocosRoot();
            if (cocos2dPath) {
                this._templatePath = path.join(cocos2dPath, "templates");
            }
            else {
                this._templatePath = null;
            }
        }
        return this._templatePath;
    }
    get projectDir() {
        let dir = this.args.directory;
        return cchelper.replaceEnvVariables(dir);
    }
    getCmakeGenerator() {
        return this.args.cmakeGenerator;
    }
    getBuildDir() {
        return this.args.buildDir;
    }
    getCmakePath() {
        let cp = this.args.cmakePath;
        return !!cp ? cp : `${path.join(editor.App.path, '../tools/cmake/bin/cmake')}${process.platform === 'win32' ? '.exe' : ''}`;
    }
    enableIosSimulator() {
        return this.args.ios.simulator;
    }
    getAppTeamId() {
        return this.args.teamid;
    }
    async runCmake(args) {
        return new Promise((resolve, reject) => {
            console.log(`run cmake with ${args.join(" ")}`);
            let cp = childProcess.spawn(this.getCmakePath(), args, {
                stdio: ["pipe", "pipe", "pipe"],
                env: process.env,
                shell: true,
            });
            cp.stdout.on("data", (data) => {
                console.log(`[cmake] ${iconv.decode(data, 'gbk').toString()}`);
            });
            cp.stderr.on("data", (data) => {
                console.error(`[cmake-err] ${iconv.decode(data, 'gbk').toString()}`);
            });
            cp.on("close", (code, sig) => {
                if (code !== 0) {
                    reject(new Error(`run cmake failed "cmake ${args.join(" ")}", code: ${code}, signal: ${sig}`));
                    return;
                }
                resolve();
            });
        });
    }
    doListPlatforms() {
        console.log("support platforms:");
        for (let p of cocosConfig_1.cocosConfig.platforms) {
            console.log(` - ${p}`);
        }
    }
    doShowHelp() {
        let parser = this.parser;
    }
    setEnv(key, value) {
        process.env[key] = value;
    }
    getEnv(key) {
        return process.env[key];
    }
    getCurrentPlatform() {
        let p = os.platform();
        if (p === "darwin") {
            return default_1.PLATFORM_ENUM.MAC;
        }
        else if (p == "win32") {
            return default_1.PLATFORM_ENUM.WIN32;
        }
        console.warn(`platform ${p} is not supported!`);
        return default_1.PLATFORM_ENUM.UNKNOWN;
    }
    getEnginePath() {
        return this.args.enginePath;
    }
    ///////////////// helper methods
    getTemplatesDirNames() {
        let templateDir = this.getTemplatesRootPath();
        let dirs = [];
        if (templateDir) {
            dirs = fs.readdirSync(templateDir).filter(x => !x.startsWith("."));
            dirs = dirs.filter(d => {
                let p = path.join(templateDir, d);
                let stat = fs.statSync(p);
                return stat.isDirectory();
            });
        }
        return dirs;
    }
    getTemplateDirPaths() {
        let templateDir = this.getTemplatesRootPath();
        return this.getTemplatesDirNames().map(x => path.join(templateDir, x));
    }
    getPlatform() {
        let p = this.parser.platform;
        if (!p) {
            p = this.getCurrentPlatform();
            console.log(`platform not specified, use current platform ${p}`);
        }
        return p;
    }
    setPlatform(p) {
        this.parser.platform = p;
    }
    getPluginName() {
        return this._pluginName;
    }
    setPluginName(name) {
        this._pluginName = name;
    }
    async exec() {
        console.log(`[plugin ${this.getPluginName()}]: running ...`);
        this.init();
        await this.run();
        console.log(`  [plugin ${this.getPluginName()}]: done!`);
    }
    get args() {
        return this.parser;
    }
}
exports.CCPlugin = CCPlugin;
//因为加密后有多个后缀
exports.EXT_LIST = ['.js', '.ccc', '.ccd', '.jsg', '.jsc'];
class cchelper {
    static replaceEnvVariables(str) {
        return str.replace(/\$\{([^\}]*)\}/g, (_, n) => process.env[n] == undefined ? _ : process.env[n]).replace(/(\~)/g, (_, n) => process.env["HOME"]);
    }
    static fixPath(p) {
        p = this.replaceEnvVariables(p);
        if (os.platform() == "win32") {
            if (p.indexOf(" ") >= 0) {
                console.error(`space found in path "${p}"`);
            }
            return p.replace(/\\/g, "/").replace(/\/+/, "/");
        }
        return p;
    }
    static async delay(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                resolve();
            }, ms);
        });
    }
    static join(p1, ...p2) {
        let l = p2.map(x => this.replaceEnvVariables(x));
        if (path.isAbsolute(l[l.length - 1]))
            return l[l.length - 1];
        return path.join(this.replaceEnvVariables(p1), ...p2);
    }
    static copyFileSync(srcRoot, srcFile, dstRoot, dstFile) {
        // console.log(`copyFileSync args: ${JSON.stringify(arguments)}`);
        srcRoot = this.replaceEnvVariables(srcRoot);
        srcFile = this.replaceEnvVariables(srcFile);
        dstRoot = this.replaceEnvVariables(dstRoot);
        dstFile = this.replaceEnvVariables(dstFile);
        let src = path.isAbsolute(srcFile) ? srcFile : path.join(srcRoot, srcFile);
        let dst = path.isAbsolute(dstFile) ? dstFile : path.join(dstRoot, dstFile);
        // console.error(`copyFileSync ${src} -> ${dst}`);
        this.makeDirectoryRecursive(path.dirname(dst));
        fs.copyFileSync(src, dst);
    }
    static async copyFileAsync(src, dst) {
        // console.log(`[async] copyFile ${src} -> ${dst}`);
        this.makeDirectoryRecursive(path.parse(dst).dir);
        await afs_1.afs.copyFile(src, dst);
    }
    static async copyRecursiveAsync(srcDir, dst) {
        srcDir = this.replaceEnvVariables(srcDir);
        dst = this.replaceEnvVariables(dst);
        let tasks = [];
        let srcStat = await afs_1.afs.stat(srcDir);
        if (!srcStat) {
            console.error(`failed to stat ${srcDir}`);
            return;
        }
        if (srcStat.isDirectory()) {
            this.makeDirectoryRecursive(dst);
            let files = await afs_1.afs.readdir(srcDir);
            for (let f of files) {
                if (f == "." || f == "..")
                    continue;
                let fp = path.join(srcDir, f);
                let tsk = this.copyRecursiveAsync(fp, path.join(dst, f));
                tasks.push(tsk);
            }
            await Promise.all(tasks);
        }
        else if (srcStat.isFile()) {
            try {
                await this.copyFileAsync(srcDir, dst);
            }
            catch (e) {
                await this.delay(10);
                // console.warn(`error: retry copying ${srcDir} -> to ${dst} ... ${e}`);
                await this.copyFileAsync(srcDir, dst);
            }
        }
    }
    static prepareDirsForFiles(srcRoot, files, dstDir) {
        let tree = {};
        for (let f of files) {
            let parts = f.split("/");
            let p = tree;
            for (let i of parts) {
                if (i in p) {
                    p = p[i];
                }
                else {
                    p = p[i] = {};
                }
            }
        }
        let mkdirs = (srcDir, attrs, dstDir) => {
            let srcStat = fs.statSync(srcDir);
            if (!srcStat.isDirectory())
                return;
            if (!fs.existsSync(dstDir)) {
                // console.log(`prepereDir ${dstDir}`);
                fs.mkdirSync(dstDir);
            }
            for (let i in attrs) {
                if (i !== "." && i !== "..") {
                    mkdirs(path.join(srcDir, i), attrs[i], path.join(dstDir, i));
                }
            }
        };
        mkdirs(srcRoot, tree, dstDir);
    }
    static parallelCopyFiles(par, srcRoot, files, dstDir) {
        let runningTasks = 0;
        dstDir = this.replaceEnvVariables(dstDir);
        cchelper.prepareDirsForFiles(srcRoot, files, dstDir);
        return new Promise((resolve, reject) => {
            let copyAsync = async (src, dst) => {
                runningTasks += 1;
                await this.copyRecursiveAsync(src, dst);
                runningTasks -= 1;
                scheduleCopy();
            };
            let scheduleCopy = () => {
                if (files.length > 0 && runningTasks < par) {
                    let f = files.shift();
                    let srcFile = path.join(srcRoot, f);
                    if (fs.existsSync(srcFile)) {
                        copyAsync(srcFile, path.join(dstDir, f));
                    }
                    else {
                        console.warn(`warning: copyFile: ${srcFile} not exists!`);
                    }
                }
                if (files.length == 0 && runningTasks == 0) {
                    resolve();
                }
            };
            for (let i = 0; i < par; i++)
                scheduleCopy();
        });
    }
    static makeDirectoryRecursive(dir) {
        if (dir.length == 0)
            return;
        let dirs = [];
        let p = dir;
        while (!fs.existsSync(p)) {
            dirs.push(p);
            p = path.join(p, "..");
        }
        while (dirs.length > 0) {
            fs.mkdirSync(dirs[dirs.length - 1]);
            dirs.length = dirs.length - 1;
        }
    }
    static async removeDirectoryRecursive(dir) {
        let stat = await afs_1.afs.stat(dir);
        if (stat.isFile()) {
            await afs_1.afs.unlink(dir);
        }
        else if (stat.isDirectory()) {
            let list = await afs_1.afs.readdir(dir);
            let tasks = [];
            for (let f of list) {
                if (f == "." || f == "..")
                    continue;
                let fp = path.join(dir, f);
                tasks.push(this.removeDirectoryRecursive(fp));
            }
            await Promise.all(tasks);
            await afs_1.afs.rmdir(dir);
        }
    }
    static async copyFilesWithConfig(cfg, srcRoot, dstRoot) {
        if (!fs.existsSync(srcRoot)) {
            console.error(`copy file srcRoot ${srcRoot} is not exists!`);
            return;
        }
        srcRoot = this.replaceEnvVariables(srcRoot);
        dstRoot = this.replaceEnvVariables(dstRoot);
        let from = this.replaceEnvVariables(cfg.from);
        let to = this.replaceEnvVariables(cfg.to);
        if (path.isAbsolute(from)) {
            srcRoot = from;
            from = ".";
        }
        if (path.isAbsolute(to)) {
            dstRoot = to;
            to = ".";
        }
        // console.log(`copy ${JSON.stringify(cfg)}, ${from} -> ${to} from ${srcRoot} -> ${dstRoot}`);
        let buildPrefixTree = (list0) => {
            let tree = {};
            let list = list0.map(x => Array.from(x));
            while (list.length > 0) {
                let t = list.shift();
                let p = tree;
                while (t.length > 0) {
                    let c = t.shift();
                    if (!(c in p)) {
                        p[c] = {};
                    }
                    p = p[c];
                }
            }
            return tree;
        };
        let matchPrefixTree = (str, tree) => {
            if (tree == null) {
                return false;
            }
            let arr = Array.from(str);
            let i = 0;
            let p = tree;
            while (arr[i] in p) {
                p = p[arr[i]];
                i++;
            }
            return i == arr.length && Object.keys(p).length == 0;
        };
        let includePrefix = cfg.include ? buildPrefixTree(cfg.include) : null;
        let excludePrefix = cfg.exclude ? buildPrefixTree(cfg.exclude) : null;
        let cpR_async = async (srcRoot, srcDir, dstRoot) => {
            let currFullDir = path.join(srcRoot, srcDir);
            let stat = await afs_1.afs.stat(currFullDir);
            if (stat.isDirectory()) {
                let files = await afs_1.afs.readdir(currFullDir);
                let subcopies = [];
                for (let f of files) {
                    if (f == "." || f == "..")
                        continue;
                    let pathInSrcRoot = path.join(srcDir, f);
                    if (excludePrefix && matchPrefixTree(pathInSrcRoot, excludePrefix)) {
                        if (includePrefix && matchPrefixTree(pathInSrcRoot, includePrefix)) {
                            //include
                        }
                        else {
                            console.log(` - skip copy ${srcRoot} ${pathInSrcRoot} to ${dstRoot}`);
                            continue;
                        }
                    }
                    subcopies.push(cpR_async(srcRoot, pathInSrcRoot, dstRoot));
                }
                await Promise.all(subcopies);
            }
            else if (stat.isFile()) {
                // let dstFileAbs = path.isAbsolute(srcDir) ? srcDir : path.join(dstRoot, srcDir);
                await this.copyFileAsync(currFullDir, path.join(dstRoot, srcDir));
            }
        };
        let copyFrom = this.replaceEnvVariables(path.normalize(path.join(srcRoot, from)));
        let copyTo = this.replaceEnvVariables(path.normalize(path.join(dstRoot, to)));
        await cpR_async(srcRoot, from, copyTo);
    }
    static async replaceInFile(patterns, filepath) {
        filepath = this.replaceEnvVariables(filepath);
        if (!fs.existsSync(filepath)) {
            return;
        }
        // console.log(`replace ${filepath} with ${JSON.stringify(patterns)}`);
        let lines = (await afs_1.afs.readFile(filepath)).toString("utf8").split("\n");
        let newContent = lines.map(l => {
            patterns.forEach(p => {
                l = l.replace(new RegExp(p.reg), this.replaceEnvVariables(p.text));
            });
            return l;
        }).join("\n");
        await afs_1.afs.writeFile(filepath, newContent);
    }
    static exactValueFromFile(regexp, filename, idx) {
        if (!(fs.existsSync(filename))) {
            console.error(`file ${filename} not exist!`);
            return;
        }
        let lines = fs.readFileSync(filename).toString("utf-8").split("\n");
        for (let l of lines) {
            let r = l.match(regexp);
            if (r) {
                return r[idx];
            }
        }
    }
    static async runCmd(cmd, args, slient, cwd) {
        return new Promise((resolve, reject) => {
            console.log(`[runCmd]: ${cmd} ${args.join(" ")}`);
            let cp = childProcess.spawn(cmd, args, {
                shell: true,
                env: process.env,
                cwd: cwd || process.cwd()
            });
            if (!slient) {
                cp.stdout.on(`data`, (chunk) => {
                    console.log(`[runCmd ${cmd}] ${chunk}`);
                });
                cp.stderr.on(`data`, (chunk) => {
                    console.log(`[runCmd ${cmd} - error] ${chunk}`);
                });
            }
            cp.on("close", (code, signal) => {
                if (code != 0 && !slient)
                    return reject(`faile to exec ${cmd} ${args.join(" ")}`);
                resolve();
            });
        });
    }
    static existsSync(filePath) {
        let extName = path.extname(filePath);
        let filePathNotExt = path.basename(filePath, extName);
        filePath = path.join(path.dirname(filePath), filePathNotExt);
        return !!exports.EXT_LIST.find((ext) => {
            return fs.existsSync(filePath + ext);
        });
    }
}
exports.cchelper = cchelper;
class NativeConsole {
    constructor(params) {
        this._params = params;
    }
    loadPlugin(pluginName) {
        let p = null;
        let scriptPath = path.join(__dirname, `plugin${pluginName}`);
        if (!cchelper.existsSync(scriptPath)) {
            console.error(`Plugin ${pluginName} is not defined!`);
            return p;
        }
        let exp = require(scriptPath);
        let klsName = `CCPlugin${pluginName.toUpperCase()}`;
        if (klsName in exp) {
            p = new exp[klsName](this._params);
        }
        else {
            console.error(`${klsName} not defined in plugin_${pluginName}.js`);
            return p;
        }
        p.setPluginName(pluginName);
        return p;
    }
    async run() {
        let pluginName = this._params.pluginName;
        let task = [];
        let p;
        do {
            p = this.loadPlugin(pluginName);
            task.push(p);
        } while ((pluginName = p.depends()) !== null);
        for (let i = task.length - 1; i >= 0; i--) {
            await task[i].exec();
        }
    }
}
exports.NativeConsole = NativeConsole;
process.on("unhandledRejection", (err, promise) => {
    console.error(`----unhandledRejection---`);
    console.error(err);
});
// let runner = new CCPluginRunner();
//
// runner.run().then(() => {
//     console.log(`[all done!]`);
//     process.exit(0);
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29jb3NDbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9lZGl0b3ItM2QtZGV2L2FwcC9wbGF0Zm9ybXMvaW50ZXJuYWwvbmF0aXZlL3NvdXJjZS9jb25zb2xlL2NvY29zQ2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLG9EQUFzQztBQUN0QywrQ0FBc0Q7QUFDdEQsdUNBQXlCO0FBQ3pCLCtCQUEwQjtBQUMxQiw0REFBOEM7QUFDOUMsdUNBQXlFO0FBQ3pFLCtDQUFpQztBQUNqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFcEMsSUFBSyxnQkFLSjtBQUxELFdBQUssZ0JBQWdCO0lBQ2pCLCtEQUFRLENBQUE7SUFDUixxRUFBVyxDQUFBO0lBQ1gsMkRBQU0sQ0FBQTtJQUNOLHVEQUFJLENBQUE7QUFDUixDQUFDLEVBTEksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUtwQjtBQWNELDRCQUE0QjtBQUNmLFFBQUEsRUFBRSxHQUFHO0lBQ2QsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFDO0lBQ2hHLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUM7SUFDbEgsS0FBSyxFQUFFO1FBQ0gsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLHNCQUFzQixD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QUM7Q0FLSjtBQXhDRCxzQ0F3Q0M7QUFFRCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgscUNBQXFDO0FBQ3JDLEVBQUU7QUFDRiw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLHVCQUF1QjtBQUN2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBtbCBmcm9tIFwiLi9tdWx0aUxhbmd1YWdlXCI7XG5pbXBvcnQge2NvY29zQ29uZmlnIGFzIGNvY29zQ2ZnfSBmcm9tIFwiLi9jb2Nvc0NvbmZpZ1wiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5pbXBvcnQge2Fmc30gZnJvbSBcIi4vYWZzXCI7XG5pbXBvcnQgKiBhcyBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7Q29uc29sZVBhcmFtcywgUExBVEZPUk1fRU5VTSwgUExVR0lOX05BTUVfRU5VTX0gZnJvbSAnLi9kZWZhdWx0JztcbmltcG9ydCAqIGFzIGVkaXRvciBmcm9tICdlZGl0b3InO1xuY29uc3QgaWNvbnYgPSByZXF1aXJlKCdpY29udi1saXRlJyk7XG5cbmVudW0gQXJndW1lbnRJdGVtVHlwZSB7XG4gICAgQk9PTEZMQUcsXG4gICAgU1RSSU5HVkFMVUUsXG4gICAgQUNUSU9OLFxuICAgIEVOVU0sXG59XG5cbmludGVyZmFjZSBBcmd1bWVudENvbmZpZyB7XG4gICAgc2hvcnQ6IHN0cmluZztcbiAgICBsb25nOiBzdHJpbmc7XG4gICAgZmllbGQ/OiBzdHJpbmc7XG4gICAgaGVscDogc3RyaW5nO1xuICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGU7XG4gICAgYWN0aW9uPzogKCkgPT4gdm9pZDtcbiAgICBlbnVtVmFsdWVzPzogc3RyaW5nW107XG4gICAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgZGVmYXVsdFZhbHVlPzogc3RyaW5nO1xufVxuXG4vKiogcHJlLWRlZmluZWQgYXJndW1lbnRzICovXG5leHBvcnQgY29uc3QgcGEgPSB7XG4gICAgaGVscDoge3Nob3J0OiBcIi1oXCIsIGxvbmc6IFwiLS1oZWxwXCIsIGhlbHA6IFwic2hvdyB0aGlzIG1lc3NhZ2VcIiwgYXJnVHlwZTogQXJndW1lbnRJdGVtVHlwZS5BQ1RJT059LFxuICAgIHNyY0Rpcjoge3Nob3J0OiBcIi1zXCIsIGxvbmc6IFwiLS1zcmNcIiwgaGVscDogbWwuZ2V0U3RyaW5nKFwiQ09DT1NIRUxQQVJHU1JDXCIpLCBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLlNUUklOR1ZBTFVFfSxcbiAgICBxdWlldDoge1xuICAgICAgICBzaG9ydDogJy1xJyxcbiAgICAgICAgbG9uZzogXCItLXF1aWV0XCIsXG4gICAgICAgIGhlbHA6IG1sLmdldFN0cmluZyhcIkNPQ09TSEVMUEFSR1BMQVRGT1JNXCIpLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLkJPT0xGTEFHXG4gICAgfSxcbiAgICBwbGF0Zm9ybToge1xuICAgICAgICBzaG9ydDogXCItcFwiLFxuICAgICAgICBsb25nOiBcIi0tcGxhdGZvcm1cIixcbiAgICAgICAgaGVscDogbWwuZ2V0U3RyaW5nKFwiQ09DT1NIRUxQQVJHUExBVEZPUk1cIiksXG4gICAgICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGUuRU5VTSxcbiAgICAgICAgZW51bVZhbHVlczogY29jb3NDZmcucGxhdGZvcm1zXG4gICAgfSxcbiAgICBkb0xpc3RQbGF0Zm9ybXM6IHtcbiAgICAgICAgc2hvcnQ6IFwiXCIsXG4gICAgICAgIGxvbmc6IFwiLS1saXN0LXBsYXRmb3Jtc1wiLFxuICAgICAgICBoZWxwOiBcImxpc3QgYXZhaWxhYmxlIHBsYXRmb3Jtc1wiLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLkFDVElPTlxuICAgIH0sXG4gICAgcHJvakRpcjoge1xuICAgICAgICBzaG9ydDogXCJcIixcbiAgICAgICAgbG9uZzogXCItLXByb2otZGlyXCIsXG4gICAgICAgIGhlbHA6IG1sLmdldFN0cmluZyhcIkNPQ09TSEVMUEFSR1BST0pESVJcIiksXG4gICAgICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGUuU1RSSU5HVkFMVUVcbiAgICB9LFxuICAgIGJ1aWxkRGlyOiB7XG4gICAgICAgIHNob3J0OiBcIlwiLFxuICAgICAgICBsb25nOiBcIi0tYnVpbGQtZGlyXCIsXG4gICAgICAgIGhlbHA6IFwic3BlY2lmeSBkaXJlY3Rvcnkgd2hlcmUgdG8gYnVpbGQgcHJvamVjdFwiLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLlNUUklOR1ZBTFVFXG4gICAgfSxcbiAgICBwYWNrYWdlTmFtZToge1xuICAgICAgICBzaG9ydDogXCItcFwiLFxuICAgICAgICBsb25nOiBcIi0tcGFja2FnZVwiLFxuICAgICAgICBoZWxwOiBtbC5nZXRTdHJpbmcoXCJORVdBUkdQQUNLQUdFXCIpLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLlNUUklOR1ZBTFVFXG4gICAgfSxcbiAgICBkaXJlY3Rvcnk6IHtcbiAgICAgICAgc2hvcnQ6IFwiLWRcIixcbiAgICAgICAgbG9uZzogXCItLWRpcmVjdG9yeVwiLFxuICAgICAgICBoZWxwOiBtbC5nZXRTdHJpbmcoXCJORVdBUkdESVJcIiksXG4gICAgICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGUuU1RSSU5HVkFMVUVcbiAgICB9LFxuICAgIGlvc0J1bmRsZWlkOiB7XG4gICAgICAgIHNob3J0OiBcIlwiLFxuICAgICAgICBsb25nOiBcIi0taW9zLWJ1bmRsZWlkXCIsXG4gICAgICAgIGhlbHA6IG1sLmdldFN0cmluZyhcIk5FV0FSR0lPU0JVTkRMRUlEXCIpLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLlNUUklOR1ZBTFVFXG4gICAgfSxcbiAgICBtYWNCdW5kbGVpZDoge1xuICAgICAgICBzaG9ydDogXCJcIixcbiAgICAgICAgbG9uZzogXCItLW1hYy1idW5kbGVpZFwiLFxuICAgICAgICBoZWxwOiBtbC5nZXRTdHJpbmcoXCJORVdBUkdNQUNCVU5ETEVJRFwiKSxcbiAgICAgICAgYXJnVHlwZTogQXJndW1lbnRJdGVtVHlwZS5TVFJJTkdWQUxVRVxuICAgIH0sXG4gICAgZW5naW5lUGF0aDoge1xuICAgICAgICBzaG9ydDogXCItZVwiLFxuICAgICAgICBsb25nOiBcIi0tZW5naW5lLXBhdGhcIixcbiAgICAgICAgaGVscDogbWwuZ2V0U3RyaW5nKFwiTkVXQVJHRU5HSU5FUEFUSFwiKSxcbiAgICAgICAgYXJnVHlwZTogQXJndW1lbnRJdGVtVHlwZS5TVFJJTkdWQUxVRVxuICAgIH0sXG4gICAgcG9ydHJhaXQ6IHtzaG9ydDogXCJcIiwgbG9uZzogXCItLXBvcnRyYWl0XCIsIGhlbHA6IG1sLmdldFN0cmluZyhcIk5FV0FSR1BPUlRSQUlUXCIpLCBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLkJPT0xGTEFHfSxcbiAgICBub05hdGl2ZToge1xuICAgICAgICBzaG9ydDogXCJcIixcbiAgICAgICAgbG9uZzogXCItLW5vLW5hdGl2ZVwiLFxuICAgICAgICBoZWxwOiBtbC5nZXRTdHJpbmcoXCJORVdBUkdOT05BVElWRVwiKSxcbiAgICAgICAgYXJnVHlwZTogQXJndW1lbnRJdGVtVHlwZS5CT09MRkxBR1xuICAgIH0sXG4gICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgc2hvcnQ6IFwiLWxcIixcbiAgICAgICAgbG9uZzogXCItLWxhbmd1YWdlXCIsXG4gICAgICAgIGhlbHA6IG1sLmdldFN0cmluZyhcIk5FV0FSR0xBTkdcIiksXG4gICAgICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGUuRU5VTSxcbiAgICAgICAgZW51bVZhbHVlczogY29jb3NDZmcubGFuZ3VhZ2VzXG4gICAgfSxcbiAgICBkb0xpc3RUZW1wbGF0ZXM6IHtcbiAgICAgICAgc2hvcnQ6IFwiXCIsXG4gICAgICAgIGxvbmc6IFwiLS1saXN0LXRlbXBsYXRlc1wiLFxuICAgICAgICBoZWxwOiBcIkxpc3QgYXZhaWxhYmxlIHRlbXBsYXRlcy4gVG8gYmUgdXNlZCB3aXRoIC0tdGVtcGxhdGUgb3B0aW9uLlwiLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLkFDVElPTlxuICAgIH0sXG4gICAgdGVtcGxhdGVOYW1lOiB7XG4gICAgICAgIHNob3J0OiBcIi1rXCIsXG4gICAgICAgIGxvbmc6IFwiLS10ZW1wbGF0ZS1uYW1lXCIsXG4gICAgICAgIGhlbHA6ICdOYW1lIG9mIHRoZSB0ZW1wbGF0ZSB0byBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgZ2FtZS4gVG8gbGlzdCBhdmFpbGFibGUgbmFtZXMsIHVzZSAtLWxpc3QtdGVtcGxhdGVzLicsXG4gICAgICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGUuU1RSSU5HVkFMVUVcbiAgICB9LFxuICAgIGNtYWtlR2VuZXJhdG9yOiB7XG4gICAgICAgIHNob3J0OiBcIi1HXCIsXG4gICAgICAgIGxvbmc6IFwiLS1jbWFrZS1nZW5lcmF0b3JcIixcbiAgICAgICAgaGVscDogXCJTZXQgY21ha2UgZ2VuZXJhdG9yXCIsXG4gICAgICAgIGFyZ1R5cGU6IEFyZ3VtZW50SXRlbVR5cGUuU1RSSU5HVkFMVUVcbiAgICB9LFxuICAgIGNtYWtlUGF0aDoge1xuICAgICAgICBzaG9ydDogXCJcIixcbiAgICAgICAgbG9uZzogXCItLWNtYWtlLXBhdGhcIixcbiAgICAgICAgaGVscDogXCJwYXRoIHRvIGNtYWtlLmV4ZSBvciBjbWFrZVwiLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLlNUUklOR1ZBTFVFXG4gICAgfSxcbiAgICBpb3NTaW11bGF0b3I6IHtcbiAgICAgICAgc2hvcnQ6IFwiXCIsXG4gICAgICAgIGxvbmc6IFwiLS1pb3Mtc2ltdWxhdG9yXCIsXG4gICAgICAgIGhlbHA6IFwiZW5hYmxlIGlPUyBzaW11bGF0b3Igc3VwcG9ydFwiLFxuICAgICAgICBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLkJPT0xGTEFHXG4gICAgfSxcbiAgICB0ZWFtaWQ6IHtzaG9ydDogXCJcIiwgbG9uZzogXCItLXRlYW0taWRcIiwgaGVscDogXCJBcHBsZSBkZXZlbG9wZXIgdGVhbSBpZFwiLCBhcmdUeXBlOiBBcmd1bWVudEl0ZW1UeXBlLlNUUklOR1ZBTFVFfSxcbiAgICBzaGFyZWREaXI6IHtcbiAgICAgICAgc2hvcnQ6IFwiXCIsXG4gICAgICAgIGxvbmc6IFwiLS1zaGFyZWQtZGlyXCIsXG4gICAgICAgIGhlbHA6IFwiU2hhcmVkIHNvdXJjZSBkaXJlY3RvcnlcIixcbiAgICAgICAgYXJnVHlwZTogQXJndW1lbnRJdGVtVHlwZS5TVFJJTkdWQUxVRVxuICAgIH0sXG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ0NQbHVnaW4ge1xuICAgIHByaXZhdGUgX2NvY29zMmRQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF90ZW1wbGF0ZVBhdGg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgX3BsdWdpbk5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgZXh0QXJnczogc3RyaW5nW10gPSBbXTtcbiAgICBuYXRpdmVUZW1wbGF0ZURpcjogc3RyaW5nO1xuICAgIHBsYXRmb3JtVGVtcGxhdGVQYXRoOiBzdHJpbmc7XG4gICAgcGFyc2VyOiBDb25zb2xlUGFyYW1zO1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtOiBDb25zb2xlUGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyc2VyID0gcGFyYW07XG4gICAgICAgIC8v5bel56iL6YeM6Z2i55qEIG5hdGl2ZS9lbmdpbmUg55uu5b2VXG4gICAgICAgIHRoaXMubmF0aXZlVGVtcGxhdGVEaXIgPSBwYXRoLmpvaW4oRWRpdG9yLlByb2plY3QucGF0aCwgJ25hdGl2ZScsICdlbmdpbmUnKTtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybVRlbXBsYXRlUGF0aCA9IHBhdGguam9pbih0aGlzLm5hdGl2ZVRlbXBsYXRlRGlyLCB0aGlzLnBhcnNlci5wbGF0Zm9ybSk7XG4gICAgfVxuXG4gICAgZXh0ZW5kQXJndihhcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLmV4dEFyZ3MgPSB0aGlzLmV4dEFyZ3MuY29uY2F0KGFyZ3MpO1xuICAgIH1cblxuICAgIGdldENvY29zUm9vdCgpOiBzdHJpbmcgfCBudWxsIHtcblxuICAgICAgICBsZXQgZW5naW5lUGF0aCA9IHRoaXMuZ2V0RW5naW5lUGF0aCgpO1xuICAgICAgICBpZiAoISFlbmdpbmVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5naW5lUGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fY29jb3MyZFBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvY29zMmRQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi8uLlwiKTtcbiAgICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4odGhpcy5fY29jb3MyZFBhdGgsIFwiY29jb3NcIikpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1sLmdldFN0cmluZyhcIkNPQ09TX1dBUk5JTkdfRU5HSU5FX05PVF9GT1VORFwiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29jb3MyZFBhdGggPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2NvczJkUGF0aDtcbiAgICB9XG5cbiAgICBnZXRDb25zbGVSb290KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBlbmdpbmVQYXRoID0gdGhpcy5nZXRFbmdpbmVQYXRoKCk7XG4gICAgICAgIGlmICghIWVuZ2luZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oZW5naW5lUGF0aCwgXCJ0b29scy9jb2Nvcy1jb25zb2xlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIik7XG4gICAgfVxuXG4gICAgZ2V0VGVtcGxhdGVzUm9vdFBhdGgoKTogc3RyaW5nIHwgbnVsbCB7XG5cbiAgICAgICAgbGV0IGVuZ2luZVBhdGggPSB0aGlzLmdldEVuZ2luZVBhdGgoKTtcbiAgICAgICAgaWYgKCEhZW5naW5lUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGguam9pbihlbmdpbmVQYXRoLCBcInRlbXBsYXRlc1wiKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCF0aGlzLl90ZW1wbGF0ZVBhdGgpIHtcbiAgICAgICAgICAgIGxldCBjb2NvczJkUGF0aCA9IHRoaXMuZ2V0Q29jb3NSb290KCk7XG4gICAgICAgICAgICBpZiAoY29jb3MyZFBhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZVBhdGggPSBwYXRoLmpvaW4oY29jb3MyZFBhdGgsIFwidGVtcGxhdGVzXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZVBhdGggPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZVBhdGg7XG4gICAgfVxuXG4gICAgZ2V0IHByb2plY3REaXIoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IGRpciA9IHRoaXMuYXJncy5kaXJlY3Rvcnk7XG4gICAgICAgIHJldHVybiBjY2hlbHBlci5yZXBsYWNlRW52VmFyaWFibGVzKGRpcik7XG4gICAgfVxuXG4gICAgZ2V0Q21ha2VHZW5lcmF0b3IoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJncy5jbWFrZUdlbmVyYXRvcjtcbiAgICB9XG5cbiAgICBnZXRCdWlsZERpcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hcmdzLmJ1aWxkRGlyO1xuICAgIH1cblxuICAgIGdldENtYWtlUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY3AgPSB0aGlzLmFyZ3MuY21ha2VQYXRoO1xuICAgICAgICByZXR1cm4gISFjcCA/IGNwIDogYCR7cGF0aC5qb2luKGVkaXRvci5BcHAucGF0aCwgJy4uL3Rvb2xzL2NtYWtlL2Jpbi9jbWFrZScpfSR7cHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyA/ICcuZXhlJyA6ICcnfWA7XG4gICAgfVxuXG4gICAgZW5hYmxlSW9zU2ltdWxhdG9yKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcmdzLmlvcy5zaW11bGF0b3I7XG4gICAgfVxuXG4gICAgZ2V0QXBwVGVhbUlkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyZ3MudGVhbWlkO1xuICAgIH1cblxuICAgIGFzeW5jIHJ1bkNtYWtlKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcnVuIGNtYWtlIHdpdGggJHthcmdzLmpvaW4oXCIgXCIpfWApO1xuICAgICAgICAgICAgbGV0IGNwID0gY2hpbGRQcm9jZXNzLnNwYXduKHRoaXMuZ2V0Q21ha2VQYXRoKCksIGFyZ3MsIHtcbiAgICAgICAgICAgICAgICBzdGRpbzogW1wicGlwZVwiLCBcInBpcGVcIiwgXCJwaXBlXCJdLFxuICAgICAgICAgICAgICAgIGVudjogcHJvY2Vzcy5lbnYsXG4gICAgICAgICAgICAgICAgc2hlbGw6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNwLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbY21ha2VdICR7aWNvbnYuZGVjb2RlKGRhdGEsICdnYmsnKS50b1N0cmluZygpfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjcC5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbY21ha2UtZXJyXSAke2ljb252LmRlY29kZShkYXRhLCAnZ2JrJykudG9TdHJpbmcoKX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3Aub24oXCJjbG9zZVwiLCAoY29kZTogbnVtYmVyLCBzaWc6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb2RlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYHJ1biBjbWFrZSBmYWlsZWQgXCJjbWFrZSAke2FyZ3Muam9pbihcIiBcIil9XCIsIGNvZGU6ICR7Y29kZX0sIHNpZ25hbDogJHtzaWd9YCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRvTGlzdFBsYXRmb3JtcygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdXBwb3J0IHBsYXRmb3JtczpcIik7XG4gICAgICAgIGZvciAobGV0IHAgb2YgY29jb3NDZmcucGxhdGZvcm1zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgIC0gJHtwfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb1Nob3dIZWxwKCkge1xuICAgICAgICBsZXQgcGFyc2VyID0gdGhpcy5wYXJzZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEVudihrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgICBwcm9jZXNzLmVudltrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEVudihrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLmVudltrZXldITtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50UGxhdGZvcm0oKTogUExBVEZPUk1fRU5VTSB7XG4gICAgICAgIGxldCBwID0gb3MucGxhdGZvcm0oKTtcbiAgICAgICAgaWYgKHAgPT09IFwiZGFyd2luXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQTEFURk9STV9FTlVNLk1BQ1xuICAgICAgICB9IGVsc2UgaWYgKHAgPT0gXCJ3aW4zMlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gUExBVEZPUk1fRU5VTS5XSU4zMlxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihgcGxhdGZvcm0gJHtwfSBpcyBub3Qgc3VwcG9ydGVkIWApO1xuICAgICAgICByZXR1cm4gUExBVEZPUk1fRU5VTS5VTktOT1dOO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGluaXQoKTogYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IHJ1bigpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gICAgYWJzdHJhY3QgZGVwZW5kcygpOiBQTFVHSU5fTkFNRV9FTlVNIHwgbnVsbDtcblxuICAgIGdldEVuZ2luZVBhdGgoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyZ3MuZW5naW5lUGF0aDtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLyBoZWxwZXIgbWV0aG9kc1xuXG4gICAgZ2V0VGVtcGxhdGVzRGlyTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICBsZXQgdGVtcGxhdGVEaXIgPSB0aGlzLmdldFRlbXBsYXRlc1Jvb3RQYXRoKCk7XG4gICAgICAgIGxldCBkaXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAodGVtcGxhdGVEaXIpIHtcbiAgICAgICAgICAgIGRpcnMgPSBmcy5yZWFkZGlyU3luYyh0ZW1wbGF0ZURpcikuZmlsdGVyKHggPT4gIXguc3RhcnRzV2l0aChcIi5cIikpO1xuICAgICAgICAgICAgZGlycyA9IGRpcnMuZmlsdGVyKGQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwID0gcGF0aC5qb2luKHRlbXBsYXRlRGlyISwgZCk7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBmcy5zdGF0U3luYyhwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdC5pc0RpcmVjdG9yeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpcnM7XG4gICAgfVxuXG4gICAgZ2V0VGVtcGxhdGVEaXJQYXRocygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZURpciA9IHRoaXMuZ2V0VGVtcGxhdGVzUm9vdFBhdGgoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGVtcGxhdGVzRGlyTmFtZXMoKS5tYXAoeCA9PiBwYXRoLmpvaW4odGVtcGxhdGVEaXIhLCB4KSk7XG4gICAgfVxuXG4gICAgZ2V0UGxhdGZvcm0oKTogUExBVEZPUk1fRU5VTSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJzZXIucGxhdGZvcm07XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IHRoaXMuZ2V0Q3VycmVudFBsYXRmb3JtKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcGxhdGZvcm0gbm90IHNwZWNpZmllZCwgdXNlIGN1cnJlbnQgcGxhdGZvcm0gJHtwfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIHNldFBsYXRmb3JtKHA6IFBMQVRGT1JNX0VOVU0pIHtcbiAgICAgICAgdGhpcy5wYXJzZXIucGxhdGZvcm0gPSBwXG4gICAgfVxuXG4gICAgZ2V0UGx1Z2luTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGx1Z2luTmFtZSE7XG4gICAgfVxuXG4gICAgc2V0UGx1Z2luTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGx1Z2luTmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgYXN5bmMgZXhlYygpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtwbHVnaW4gJHt0aGlzLmdldFBsdWdpbk5hbWUoKX1dOiBydW5uaW5nIC4uLmApO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ydW4oKTtcbiAgICAgICAgY29uc29sZS5sb2coYCAgW3BsdWdpbiAke3RoaXMuZ2V0UGx1Z2luTmFtZSgpfV06IGRvbmUhYCk7XG4gICAgfVxuXG5cbiAgICBnZXQgYXJncygpOiBDb25zb2xlUGFyYW1zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICAgIH1cbn1cblxuLy/lm6DkuLrliqDlr4blkI7mnInlpJrkuKrlkI7nvIBcbmV4cG9ydCBjb25zdCBFWFRfTElTVCA9IFsnLmpzJywgJy5jY2MnLCAnLmNjZCcsICcuanNnJywgJy5qc2MnXTtcbmV4cG9ydCBjbGFzcyBjY2hlbHBlciB7XG5cbiAgICBzdGF0aWMgcmVwbGFjZUVudlZhcmlhYmxlcyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwkXFx7KFteXFx9XSopXFx9L2csIChfLCBuKSA9PiBwcm9jZXNzLmVudltuXSA9PSB1bmRlZmluZWQgPyBfIDogcHJvY2Vzcy5lbnZbbl0hKS5yZXBsYWNlKC8oXFx+KS9nLCAoXywgbikgPT4gcHJvY2Vzcy5lbnZbXCJIT01FXCJdISk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZml4UGF0aChwOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBwID0gdGhpcy5yZXBsYWNlRW52VmFyaWFibGVzKHApO1xuICAgICAgICBpZiAob3MucGxhdGZvcm0oKSA9PSBcIndpbjMyXCIpIHtcbiAgICAgICAgICAgIGlmIChwLmluZGV4T2YoXCIgXCIpID49IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBzcGFjZSBmb3VuZCBpbiBwYXRoIFwiJHtwfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKS5yZXBsYWNlKC9cXC8rLywgXCIvXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBkZWxheTxUPihtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCBtcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBqb2luKHAxOiBzdHJpbmcsIC4uLnAyOiBzdHJpbmdbXSk6IHN0cmluZyB7XG5cbiAgICAgICAgbGV0IGwgPSBwMi5tYXAoeCA9PiB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoeCkpO1xuICAgICAgICBpZiAocGF0aC5pc0Fic29sdXRlKGxbbC5sZW5ndGggLSAxXSkpIHJldHVybiBsW2wubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4odGhpcy5yZXBsYWNlRW52VmFyaWFibGVzKHAxKSwgLi4ucDIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb3B5RmlsZVN5bmMoc3JjUm9vdDogc3RyaW5nLCBzcmNGaWxlOiBzdHJpbmcsIGRzdFJvb3Q6IHN0cmluZywgZHN0RmlsZTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGNvcHlGaWxlU3luYyBhcmdzOiAke0pTT04uc3RyaW5naWZ5KGFyZ3VtZW50cyl9YCk7XG4gICAgICAgIHNyY1Jvb3QgPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoc3JjUm9vdCk7XG4gICAgICAgIHNyY0ZpbGUgPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoc3JjRmlsZSk7XG4gICAgICAgIGRzdFJvb3QgPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoZHN0Um9vdCk7XG4gICAgICAgIGRzdEZpbGUgPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoZHN0RmlsZSk7XG4gICAgICAgIGxldCBzcmMgPSBwYXRoLmlzQWJzb2x1dGUoc3JjRmlsZSkgPyBzcmNGaWxlIDogcGF0aC5qb2luKHNyY1Jvb3QsIHNyY0ZpbGUpO1xuICAgICAgICBsZXQgZHN0ID0gcGF0aC5pc0Fic29sdXRlKGRzdEZpbGUpID8gZHN0RmlsZSA6IHBhdGguam9pbihkc3RSb290LCBkc3RGaWxlKTtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihgY29weUZpbGVTeW5jICR7c3JjfSAtPiAke2RzdH1gKTtcbiAgICAgICAgdGhpcy5tYWtlRGlyZWN0b3J5UmVjdXJzaXZlKHBhdGguZGlybmFtZShkc3QpKTtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKHNyYywgZHN0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgY29weUZpbGVBc3luYyhzcmM6IHN0cmluZywgZHN0OiBzdHJpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFthc3luY10gY29weUZpbGUgJHtzcmN9IC0+ICR7ZHN0fWApO1xuICAgICAgICB0aGlzLm1ha2VEaXJlY3RvcnlSZWN1cnNpdmUocGF0aC5wYXJzZShkc3QpLmRpcik7XG4gICAgICAgIGF3YWl0IGFmcy5jb3B5RmlsZShzcmMsIGRzdCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGNvcHlSZWN1cnNpdmVBc3luYyhzcmNEaXI6IHN0cmluZywgZHN0OiBzdHJpbmcpIHtcbiAgICAgICAgc3JjRGlyID0gdGhpcy5yZXBsYWNlRW52VmFyaWFibGVzKHNyY0Rpcik7XG4gICAgICAgIGRzdCA9IHRoaXMucmVwbGFjZUVudlZhcmlhYmxlcyhkc3QpO1xuXG4gICAgICAgIGxldCB0YXNrczogUHJvbWlzZTxhbnk+W10gPSBbXTtcbiAgICAgICAgbGV0IHNyY1N0YXQgPSBhd2FpdCBhZnMuc3RhdChzcmNEaXIpO1xuXG4gICAgICAgIGlmICghc3JjU3RhdCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZmFpbGVkIHRvIHN0YXQgJHtzcmNEaXJ9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyY1N0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRGlyZWN0b3J5UmVjdXJzaXZlKGRzdCk7XG4gICAgICAgICAgICBsZXQgZmlsZXMgPSBhd2FpdCBhZnMucmVhZGRpcihzcmNEaXIpO1xuICAgICAgICAgICAgZm9yIChsZXQgZiBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgIGlmIChmID09IFwiLlwiIHx8IGYgPT0gXCIuLlwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBsZXQgZnAgPSBwYXRoLmpvaW4oc3JjRGlyLCBmKTtcbiAgICAgICAgICAgICAgICBsZXQgdHNrID0gdGhpcy5jb3B5UmVjdXJzaXZlQXN5bmMoZnAsIHBhdGguam9pbihkc3QsIGYpKTtcbiAgICAgICAgICAgICAgICB0YXNrcy5wdXNoKHRzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0YXNrcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3JjU3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvcHlGaWxlQXN5bmMoc3JjRGlyLCBkc3QpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoMTApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihgZXJyb3I6IHJldHJ5IGNvcHlpbmcgJHtzcmNEaXJ9IC0+IHRvICR7ZHN0fSAuLi4gJHtlfWApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29weUZpbGVBc3luYyhzcmNEaXIsIGRzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlcGFyZURpcnNGb3JGaWxlcyhzcmNSb290OiBzdHJpbmcsIGZpbGVzOiBzdHJpbmdbXSwgZHN0RGlyOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRyZWU6IGFueSA9IHt9O1xuICAgICAgICBmb3IgKGxldCBmIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICBsZXQgcGFydHMgPSBmLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgIGxldCBwID0gdHJlZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgb2YgcGFydHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSBpbiBwKSB7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBwW2ldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBwW2ldID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1rZGlycyA9IChzcmNEaXI6IHN0cmluZywgYXR0cnM6IGFueSwgZHN0RGlyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBzcmNTdGF0ID0gZnMuc3RhdFN5bmMoc3JjRGlyKTtcbiAgICAgICAgICAgIGlmICghc3JjU3RhdC5pc0RpcmVjdG9yeSgpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZHN0RGlyKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBwcmVwZXJlRGlyICR7ZHN0RGlyfWApO1xuICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkc3REaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBhdHRycykge1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSBcIi5cIiAmJiBpICE9PSBcIi4uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWtkaXJzKHBhdGguam9pbihzcmNEaXIsIGkpLCBhdHRyc1tpXSwgcGF0aC5qb2luKGRzdERpciwgaSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1rZGlycyhzcmNSb290LCB0cmVlLCBkc3REaXIpO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHBhcmFsbGVsQ29weUZpbGVzKHBhcjogbnVtYmVyLCBzcmNSb290OiBzdHJpbmcsIGZpbGVzOiBzdHJpbmdbXSwgZHN0RGlyOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJ1bm5pbmdUYXNrcyA9IDA7XG4gICAgICAgIGRzdERpciA9IHRoaXMucmVwbGFjZUVudlZhcmlhYmxlcyhkc3REaXIpO1xuICAgICAgICBjY2hlbHBlci5wcmVwYXJlRGlyc0ZvckZpbGVzKHNyY1Jvb3QsIGZpbGVzLCBkc3REaXIpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvcHlBc3luYyA9IGFzeW5jIChzcmM6IHN0cmluZywgZHN0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVGFza3MgKz0gMTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvcHlSZWN1cnNpdmVBc3luYyhzcmMsIGRzdCk7XG4gICAgICAgICAgICAgICAgcnVubmluZ1Rhc2tzIC09IDE7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVDb3B5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNjaGVkdWxlQ29weSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCAmJiBydW5uaW5nVGFza3MgPCBwYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSBmaWxlcy5zaGlmdCgpITtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNyY0ZpbGUgPSBwYXRoLmpvaW4oc3JjUm9vdCwgZik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHNyY0ZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5QXN5bmMoc3JjRmlsZSwgcGF0aC5qb2luKGRzdERpciwgZikpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHdhcm5pbmc6IGNvcHlGaWxlOiAke3NyY0ZpbGV9IG5vdCBleGlzdHMhYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PSAwICYmIHJ1bm5pbmdUYXNrcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcjsgaSsrKSBzY2hlZHVsZUNvcHkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIG1ha2VEaXJlY3RvcnlSZWN1cnNpdmUoZGlyOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGRpci5sZW5ndGggPT0gMCkgcmV0dXJuO1xuICAgICAgICBsZXQgZGlyczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IHAgPSBkaXI7XG4gICAgICAgIHdoaWxlICghZnMuZXhpc3RzU3luYyhwKSkge1xuICAgICAgICAgICAgZGlycy5wdXNoKHApO1xuICAgICAgICAgICAgcCA9IHBhdGguam9pbihwLCBcIi4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChkaXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXJzW2RpcnMubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgZGlycy5sZW5ndGggPSBkaXJzLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgcmVtb3ZlRGlyZWN0b3J5UmVjdXJzaXZlKGRpcjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBzdGF0ID0gYXdhaXQgYWZzLnN0YXQoZGlyKTtcbiAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IGFmcy51bmxpbmsoZGlyKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gYXdhaXQgYWZzLnJlYWRkaXIoZGlyKTtcbiAgICAgICAgICAgIGxldCB0YXNrczogUHJvbWlzZTxhbnk+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGYgb2YgbGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChmID09IFwiLlwiIHx8IGYgPT0gXCIuLlwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBsZXQgZnAgPSBwYXRoLmpvaW4oZGlyLCBmKTtcbiAgICAgICAgICAgICAgICB0YXNrcy5wdXNoKHRoaXMucmVtb3ZlRGlyZWN0b3J5UmVjdXJzaXZlKGZwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0YXNrcyk7XG4gICAgICAgICAgICBhd2FpdCBhZnMucm1kaXIoZGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBjb3B5RmlsZXNXaXRoQ29uZmlnKGNmZzogeyBmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIGluY2x1ZGU/OiBzdHJpbmdbXSwgZXhjbHVkZT86IHN0cmluZ1tdIH0sIHNyY1Jvb3Q6IHN0cmluZywgZHN0Um9vdDogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHNyY1Jvb3QpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBjb3B5IGZpbGUgc3JjUm9vdCAke3NyY1Jvb3R9IGlzIG5vdCBleGlzdHMhYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIHNyY1Jvb3QgPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoc3JjUm9vdCk7XG4gICAgICAgIGRzdFJvb3QgPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoZHN0Um9vdCk7XG4gICAgICAgIGxldCBmcm9tID0gdGhpcy5yZXBsYWNlRW52VmFyaWFibGVzKGNmZy5mcm9tKVxuICAgICAgICBsZXQgdG8gPSB0aGlzLnJlcGxhY2VFbnZWYXJpYWJsZXMoY2ZnLnRvKTtcbiAgICAgICAgaWYgKHBhdGguaXNBYnNvbHV0ZShmcm9tKSkge1xuICAgICAgICAgICAgc3JjUm9vdCA9IGZyb207XG4gICAgICAgICAgICBmcm9tID0gXCIuXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGguaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAgICAgICAgIGRzdFJvb3QgPSB0bztcbiAgICAgICAgICAgIHRvID0gXCIuXCI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBjb3B5ICR7SlNPTi5zdHJpbmdpZnkoY2ZnKX0sICR7ZnJvbX0gLT4gJHt0b30gZnJvbSAke3NyY1Jvb3R9IC0+ICR7ZHN0Um9vdH1gKTtcblxuICAgICAgICBsZXQgYnVpbGRQcmVmaXhUcmVlID0gKGxpc3QwOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgbGV0IHRyZWU6IGFueSA9IHt9O1xuICAgICAgICAgICAgbGV0IGxpc3QgPSBsaXN0MC5tYXAoeCA9PiBBcnJheS5mcm9tKHgpKTtcbiAgICAgICAgICAgIHdoaWxlIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGxpc3Quc2hpZnQoKSE7XG4gICAgICAgICAgICAgICAgbGV0IHAgPSB0cmVlO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSB0LnNoaWZ0KCkhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShjIGluIHApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwW2NdID0ge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcCA9IHBbY107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG1hdGNoUHJlZml4VHJlZSA9IChzdHI6IHN0cmluZywgdHJlZTogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICBpZiAodHJlZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGFyciA9IEFycmF5LmZyb20oc3RyKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGxldCBwID0gdHJlZTtcbiAgICAgICAgICAgIHdoaWxlIChhcnJbaV0gaW4gcCkge1xuICAgICAgICAgICAgICAgIHAgPSBwW2FycltpXV07XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkgPT0gYXJyLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhwKS5sZW5ndGggPT0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmNsdWRlUHJlZml4ID0gY2ZnLmluY2x1ZGUgPyBidWlsZFByZWZpeFRyZWUoY2ZnLmluY2x1ZGUpIDogbnVsbDtcbiAgICAgICAgbGV0IGV4Y2x1ZGVQcmVmaXggPSBjZmcuZXhjbHVkZSA/IGJ1aWxkUHJlZml4VHJlZShjZmcuZXhjbHVkZSkgOiBudWxsO1xuXG4gICAgICAgIGxldCBjcFJfYXN5bmMgPSBhc3luYyAoc3JjUm9vdDogc3RyaW5nLCBzcmNEaXI6IHN0cmluZywgZHN0Um9vdDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3VyckZ1bGxEaXIgPSBwYXRoLmpvaW4oc3JjUm9vdCwgc3JjRGlyKTtcbiAgICAgICAgICAgIGxldCBzdGF0ID0gYXdhaXQgYWZzLnN0YXQoY3VyckZ1bGxEaXIpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlcyA9IGF3YWl0IGFmcy5yZWFkZGlyKGN1cnJGdWxsRGlyKTtcbiAgICAgICAgICAgICAgICBsZXQgc3ViY29waWVzOiBQcm9taXNlPGFueT5bXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGYgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGYgPT0gXCIuXCIgfHwgZiA9PSBcIi4uXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aEluU3JjUm9vdCA9IHBhdGguam9pbihzcmNEaXIsIGYpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjbHVkZVByZWZpeCAmJiBtYXRjaFByZWZpeFRyZWUocGF0aEluU3JjUm9vdCwgZXhjbHVkZVByZWZpeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlUHJlZml4ICYmIG1hdGNoUHJlZml4VHJlZShwYXRoSW5TcmNSb290LCBpbmNsdWRlUHJlZml4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5jbHVkZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgIC0gc2tpcCBjb3B5ICR7c3JjUm9vdH0gJHtwYXRoSW5TcmNSb290fSB0byAke2RzdFJvb3R9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3ViY29waWVzLnB1c2goY3BSX2FzeW5jKHNyY1Jvb3QsIHBhdGhJblNyY1Jvb3QsIGRzdFJvb3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoc3ViY29waWVzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIGxldCBkc3RGaWxlQWJzID0gcGF0aC5pc0Fic29sdXRlKHNyY0RpcikgPyBzcmNEaXIgOiBwYXRoLmpvaW4oZHN0Um9vdCwgc3JjRGlyKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvcHlGaWxlQXN5bmMoY3VyckZ1bGxEaXIsIHBhdGguam9pbihkc3RSb290LCBzcmNEaXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb3B5RnJvbSA9IHRoaXMucmVwbGFjZUVudlZhcmlhYmxlcyhwYXRoLm5vcm1hbGl6ZShwYXRoLmpvaW4oc3JjUm9vdCwgZnJvbSkpKTtcbiAgICAgICAgbGV0IGNvcHlUbyA9IHRoaXMucmVwbGFjZUVudlZhcmlhYmxlcyhwYXRoLm5vcm1hbGl6ZShwYXRoLmpvaW4oZHN0Um9vdCwgdG8pKSk7XG4gICAgICAgIGF3YWl0IGNwUl9hc3luYyhzcmNSb290LCBmcm9tLCBjb3B5VG8pO1xuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyByZXBsYWNlSW5GaWxlKHBhdHRlcm5zOiB7IHJlZzogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfVtdLCBmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGZpbGVwYXRoID0gdGhpcy5yZXBsYWNlRW52VmFyaWFibGVzKGZpbGVwYXRoKTtcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVwYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGByZXBsYWNlICR7ZmlsZXBhdGh9IHdpdGggJHtKU09OLnN0cmluZ2lmeShwYXR0ZXJucyl9YCk7XG4gICAgICAgIGxldCBsaW5lcyA9IChhd2FpdCBhZnMucmVhZEZpbGUoZmlsZXBhdGgpKS50b1N0cmluZyhcInV0ZjhcIikuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSBsaW5lcy5tYXAobCA9PiB7XG4gICAgICAgICAgICBwYXR0ZXJucy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICAgIGwgPSBsLnJlcGxhY2UobmV3IFJlZ0V4cChwLnJlZyksIHRoaXMucmVwbGFjZUVudlZhcmlhYmxlcyhwLnRleHQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG5cbiAgICAgICAgYXdhaXQgYWZzLndyaXRlRmlsZShmaWxlcGF0aCwgbmV3Q29udGVudCk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZXhhY3RWYWx1ZUZyb21GaWxlKHJlZ2V4cDogUmVnRXhwLCBmaWxlbmFtZTogc3RyaW5nLCBpZHg6IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghKGZzLmV4aXN0c1N5bmMoZmlsZW5hbWUpKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZmlsZSAke2ZpbGVuYW1lfSBub3QgZXhpc3QhYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmVzID0gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKS50b1N0cmluZyhcInV0Zi04XCIpLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICBmb3IgKGxldCBsIG9mIGxpbmVzKSB7XG4gICAgICAgICAgICBsZXQgciA9IGwubWF0Y2gocmVnZXhwKTtcbiAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBydW5DbWQoY21kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBzbGllbnQ6IGJvb2xlYW4sIGN3ZD86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtydW5DbWRdOiAke2NtZH0gJHthcmdzLmpvaW4oXCIgXCIpfWApO1xuICAgICAgICAgICAgbGV0IGNwID0gY2hpbGRQcm9jZXNzLnNwYXduKGNtZCwgYXJncywge1xuICAgICAgICAgICAgICAgIHNoZWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudjogcHJvY2Vzcy5lbnYsXG4gICAgICAgICAgICAgICAgY3dkOiBjd2QhIHx8IHByb2Nlc3MuY3dkKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFzbGllbnQpIHtcbiAgICAgICAgICAgICAgICBjcC5zdGRvdXQub24oYGRhdGFgLCAoY2h1bmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtydW5DbWQgJHtjbWR9XSAke2NodW5rfWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNwLnN0ZGVyci5vbihgZGF0YWAsIChjaHVuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW3J1bkNtZCAke2NtZH0gLSBlcnJvcl0gJHtjaHVua31gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNwLm9uKFwiY2xvc2VcIiwgKGNvZGUsIHNpZ25hbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb2RlICE9IDAgJiYgIXNsaWVudCkgcmV0dXJuIHJlamVjdChgZmFpbGUgdG8gZXhlYyAke2NtZH0gJHthcmdzLmpvaW4oXCIgXCIpfWApO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXhpc3RzU3luYyhmaWxlUGF0aCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZXh0TmFtZSA9IHBhdGguZXh0bmFtZShmaWxlUGF0aCk7XG4gICAgICAgIGxldCBmaWxlUGF0aE5vdEV4dCA9IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgsIGV4dE5hbWUpO1xuICAgICAgICBmaWxlUGF0aCA9IHBhdGguam9pbihwYXRoLmRpcm5hbWUoZmlsZVBhdGgpLCBmaWxlUGF0aE5vdEV4dCk7XG5cbiAgICAgICAgcmV0dXJuICEhRVhUX0xJU1QuZmluZCgoZXh0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhmaWxlUGF0aCArIGV4dClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVDb25zb2xlIHtcbiAgICBwcml2YXRlIF9wYXJhbXM6IENvbnNvbGVQYXJhbXM7XG5cbiAgICBwcml2YXRlIGxvYWRQbHVnaW4ocGx1Z2luTmFtZTogUExVR0lOX05BTUVfRU5VTSk6IENDUGx1Z2luIHtcbiAgICAgICAgbGV0IHA6IENDUGx1Z2luIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGxldCBzY3JpcHRQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgYHBsdWdpbiR7cGx1Z2luTmFtZX1gKTtcbiAgICAgICAgaWYgKCFjY2hlbHBlci5leGlzdHNTeW5jKHNjcmlwdFBhdGgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSBpcyBub3QgZGVmaW5lZCFgKTtcbiAgICAgICAgICAgIHJldHVybiBwITtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBleHAgPSByZXF1aXJlKHNjcmlwdFBhdGgpO1xuICAgICAgICBsZXQga2xzTmFtZSA9IGBDQ1BsdWdpbiR7cGx1Z2luTmFtZS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgIGlmIChrbHNOYW1lIGluIGV4cCkge1xuICAgICAgICAgICAgcCA9IG5ldyBleHBba2xzTmFtZV0odGhpcy5fcGFyYW1zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7a2xzTmFtZX0gbm90IGRlZmluZWQgaW4gcGx1Z2luXyR7cGx1Z2luTmFtZX0uanNgKTtcbiAgICAgICAgICAgIHJldHVybiBwITtcbiAgICAgICAgfVxuICAgICAgICBwIS5zZXRQbHVnaW5OYW1lKHBsdWdpbk5hbWUpO1xuICAgICAgICByZXR1cm4gcCE7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJ1bigpIHtcbiAgICAgICAgbGV0IHBsdWdpbk5hbWUgPSB0aGlzLl9wYXJhbXMucGx1Z2luTmFtZTtcbiAgICAgICAgbGV0IHRhc2s6IENDUGx1Z2luW10gPSBbXTtcbiAgICAgICAgbGV0IHA6IENDUGx1Z2luO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBwID0gdGhpcy5sb2FkUGx1Z2luKHBsdWdpbk5hbWUpO1xuICAgICAgICAgICAgdGFzay5wdXNoKHApO1xuICAgICAgICB9IHdoaWxlICgocGx1Z2luTmFtZSA9IHAuZGVwZW5kcygpISkgIT09IG51bGwpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0YXNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBhd2FpdCB0YXNrW2ldLmV4ZWMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogQ29uc29sZVBhcmFtcykge1xuICAgICAgICB0aGlzLl9wYXJhbXMgPSBwYXJhbXM7XG4gICAgfVxufVxuXG5wcm9jZXNzLm9uKFwidW5oYW5kbGVkUmVqZWN0aW9uXCIsIChlcnIsIHByb21pc2UpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGAtLS0tdW5oYW5kbGVkUmVqZWN0aW9uLS0tYCk7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xufSk7XG5cbi8vIGxldCBydW5uZXIgPSBuZXcgQ0NQbHVnaW5SdW5uZXIoKTtcbi8vXG4vLyBydW5uZXIucnVuKCkudGhlbigoKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coYFthbGwgZG9uZSFdYCk7XG4vLyAgICAgcHJvY2Vzcy5leGl0KDApO1xuLy8gfSk7XG4iXX0=