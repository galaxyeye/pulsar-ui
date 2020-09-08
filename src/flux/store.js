import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
import getHarvestStatus from "../data/harvest-status";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  harvestStatus: getHarvestStatus(),
  devMode: false
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleDevtools = this.toggleDevtools.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.TOGGLE_DEVTOOLS:
        this.toggleDevtools();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  toggleDevtools() {
    console.log("Store.toggleDevtools")
    _store.devMode = !_store.devMode;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getHarvestStatus() {
    return _store.harvestStatus;
  }

  getDevMode() {
    return _store.devMode;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  addDevtoolsToggleListener(callback) {
    console.log("received")
    this.on(Constants.CHANGE, callback);
  }

  removeDevtoolsToggleListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
