var JocalStorage = (function (_) {
  var cache = [];
  var properties = {};
  var namespace = "JOE";

  var _loadCache = function (ns) {
    namespace = ns || namespace;
    if (localStorage) {
      cache = JSON.parse(localStorage.getItem(namespace + ":cache")) || [];
      properties = JSON.parse(localStorage.getItem(namespace + ":properties")) || {};
      properties.lastId = properties.lastId || 0;
    }
  };

  var _digest = function () {
    if (localStorage) {
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

  _clearCache = function () {
    cache = [];
    properties = {};
    localStorage.clear();
    _digest();
  };

  return {
    init: function (namespace) {
      _loadCache(namespace);
    },
    store: function (obj) {
      return _store(obj);
    },
    fetchCache: function () {
      return cache;
    },
    removeFromCache: function (id) {
      _removeFromCache(id);
    },
    clear: function () {
      _clearCache();
    }
  };
}(_));