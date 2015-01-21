var JocalStorage = (function (win, _) {
  var cache = [],
    properties = {},
    namespace = "JOE";

  // Functions to encapsulate questionable FireFox 3.6.13 behavior
  // when about.config::dom.storage.enabled === false
  // See https://github.com/marcuswestin/store.js/issues#issue/13
  var _isLocalStorageSupported = function () {
    try { return ('localStorage' in win && win['localStorage']); }
    catch (err) { return false; }
  };

  var _initialize = function (ns) {
    namespace = ns || namespace;
    _loadCache();
  };

  var _loadCache = function () {
    if (_isLocalStorageSupported()) {
      cache = JSON.parse(localStorage.getItem(namespace + ":cache")) || [];
      properties = JSON.parse(localStorage.getItem(namespace + ":properties")) || {};
      properties.lastId = properties.lastId || 0;
    }
  };

  var _digest = function () {
    if (_isLocalStorageSupported()) {
      localStorage.setItem(namespace + ":cache", JSON.stringify(cache));
      localStorage.setItem(namespace + ":properties", JSON.stringify(properties));
    }
  };

  var _store = function (obj) {
    // the address may be an issue here with dupes
    // also doesn't work when obj is an array, fix that
    if (!_.contains(cache, obj)) {
      obj.id = ++properties.lastId;
      cache.push(obj);
      _digest();
      return obj;
    }
    return false;
  };

  var _removeFromCache = function (id) {
    var removed = _.remove(cache, function (obj) {
      return obj.id === id;
    });

    if (removed.length > 0) {
      _digest();
      _loadCache();
    }
  };

  var _nuke = function () {
    cache = [];
    properties = {};
    localStorage.clear();
    _digest();
  };

  return {
    init: function (namespace) {
      _initialize(namespace);
    },
    store: function (arg) {
      var result;
      if (Array.isArray(arg)) {
        result = [];
        for (var i = 0; i < arg.length; i++) {
          result.push(_store(arg[i]));
        }
      }
      else {
        result = _store(arg);
      }

      return result;
    },
    fetch: function () {
      return cache;
    },
    remove: function (id) {
      _removeFromCache(id);
    },
    clear: function () {
      _nuke();
    }
  };
}(_, window));