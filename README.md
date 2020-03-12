# sparkyuka
(incomplete, do contribute) A port (some of) Yuka library's functionality to use Spark AR declarative signal bindings and all of Spark AR's data structures whenever possible. (https://sparkar.facebook.com/ar-studio/learn/documentation/reference/scripting/summary)

Refer to https://github.com/Mugen87/yuka for the entire Yuka library.

There may be some features in Yuka that may be too hard or difficult to do with a declarative reactive (signal-binding) approach. https://sparkar.facebook.com/ar-studio/learn/documentation/scripting/reactive/ If this is so, then these features would rather not be ported. Instead, both libraries can be used side by side depending on what is needed, and perhaps some helper methods to translate Spark AR signal binding values to YUKA's default imperative class instances.

Naming conventions for reactive modules is prefixed with `packagename_ClassName` or `packagename_commonModule` rather than regular ClassName.

To get type hinting/intellisense to work, you need run a dummy .arproj at the root with Spark AR, then create a dummy script asset to form a locally defined `tsconfig.json` at scripts folder. Current caveat atm: To allow typehinting to work across all sub-directories, you have to manually delete off the `"include":["*.js"]}` in the tsconfig file.

Some important things to take note for Spark AR at the time of writing this (some of YUKA library features uses certain incompatible features with Spark AR):

- No TypedArrays available in Spark AR javascript environment. (eg. Float32Array, Int32Array)
- No Object.freeze available as well either.
- No import from npm eco-system (unless you use a Webpack/Rollup/etc. build toolchain or something).
- Imports only work for script files being manually imported into Spark AR project as well.  (unless you use a Webpack/Rollup/etc. build toolchain or something).
