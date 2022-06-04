import DextrackerUtils from ".";

export abstract class DextrackerGlobal {
  static globalObject = {
    loaded: false,
  };

  static finishLoading() {
    DextrackerUtils.log("Module was loaded!!!");
    this.globalObject.loaded = true;
  }

  static runIfLoaded(cb: () => void) {
    if (this.globalObject.loaded) {
      cb();
    } else {
      DextrackerUtils.log(
        "Action cannot be performed while module is not loaded..."
      );
    }
  }
}
