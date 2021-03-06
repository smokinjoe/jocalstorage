var JocalStorage = function (options) {
  var cache = [],
      properties = {},
      options = options || {},
      namespace = options.namespace || "JOE",
      table = options.table || "cache";

  // Functions to encapsulate questionable FireFox 3.6.13 behavior
  // when about.config::dom.storage.enabled === false
  // See https://github.com/marcuswestin/store.js/issues#issue/13
  var isLocalStorageSupported = function () {
    try { return ('localStorage' in window && window['localStorage']); }
    catch (err) { return false; }
  };

  var loadCache = function () {
    if (isLocalStorageSupported()) {
      cache = JSON.parse(localStorage.getItem(namespace + ":" + table)) || [];
      properties = JSON.parse(localStorage.getItem(namespace + ":" + table + ":properties")) || {};
      properties.lastId = properties.lastId || 0;
    }
  };

  var digest = function () {
    if (isLocalStorageSupported()) {
      localStorage.setItem(namespace + ":" + table, JSON.stringify(cache));
      localStorage.setItem(namespace + ":" + table + ":properties", JSON.stringify(properties));
    }
  };

  var get = function (id) {
    var result = false;
    for (var i = 0; i < cache.length; i++) {
      if (cache[i].id === id) {
        result = cache[i];
      }
    }
    return result;
  };

  var store = function (obj) {
    // JOE: doesn't really do anything ... should I have the test revolve around id?
    if (!_.contains(cache, obj)) {
      obj.id = ++properties.lastId;
      cache.push(obj);
      digest();
      return obj.id;
    }
    return false;
  };

  var removeFromCache = function (id) {
    var removed = _.remove(cache, function (obj) {
      return obj.id === id;
    });

    if (removed.length > 0) {
      digest();
      loadCache();
      return removed;
    }

    return false;
  };

  var nuke = function () {
    cache = [];
    properties.lastId = 0;
    //localStorage.clear();
    digest();
  };

  return {
    init: function () {
      loadCache();
    },
    store: function (arg) {
      var result;
      if (Array.isArray(arg)) {
        result = [];
        for (var i = 0; i < arg.length; i++) {
          result.push(store(arg[i]));
        }
      }
      else {
        result = store(arg);
      }

      return result;
    },
    get: function (id) {
      if (id) {
        return get(id);
      }
      return cache;
    },
    remove: function (id) {
      removeFromCache(id);
    },
    clear: function () {
      nuke();
    },

    debug: function () {
      console.log("JOE: properties: ", properties);
      console.log("JOE: cache: ", cache);
    }
  };

};