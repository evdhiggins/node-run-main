const Module = require("module");

const scriptPath = process.argv[1];

const makeLoadFn = (originalLoad) =>
  function () {
    const loadedModule = originalLoad.apply(this, arguments);
    const modulePath = arguments[0];
    if (
      modulePath === scriptPath &&
      loadedModule &&
      typeof loadedModule.main === "function"
    ) {
      loadedModule.main();
    }
    return loadedModule;
  };

const _load = Module._load;
Module._load = makeLoadFn(_load);
