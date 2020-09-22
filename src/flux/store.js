import {EventEmitter} from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
import getHarvestStatus from "../data/harvest-status";
import getAuth from "../data/userAuth";

let _store = {
  menuVisible: false,
  apiHost: "http://localhost:8182",
  portalUrl: "",
  auth: getAuth(),
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
    this.changePortalUrl = this.changePortalUrl.bind(this);

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
      case Constants.CHANGE_PORTAL_URL:
        this.changePortalUrl(payload);
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

  changePortalUrl(portalUrl) {
    _store.portalUrl = portalUrl
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getAuth() {
    return _store.auth;
  }

  getPortalUrl() {
    return _store.portalUrl;
  }

  getHarvestStatus() {
    return _store.harvestStatus;
  }

  getDevMode() {
    return _store.devMode;
  }

  getApiHost() {
    return _store.apiHost;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  addDevtoolsToggleListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeDevtoolsToggleListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  addPortalUrlChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removePortalUrlChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
