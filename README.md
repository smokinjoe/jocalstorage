# JocalStorage
Simple API to utilize HTML5 localStorage (..yeah you gotta use lodash).

Came up with the idea while working on a little hobby-project.  I needed some sort of data store and hadn't really used `localStorage` that indepthly.  Figured this was a great way to start!

## HOW IT WORKS!
Here are some API methods:

### init(namespace)

You gotta use `JocalStorage.init()` to turn the thing on.  Optional is a `namespace` parameter if you would like to keep data separate.  By default it is **JOE**.

### store(arg)

Utilize `JocalStorage.store(arg)` to save to `localStorage`.

**arg** can be either an Object or an Array of Objects.


### get(id)

If you wanna grab a particular 'record' from `localStorage` then utilize `JocalStorage.get(id)` where `id` is the `id` of the object you wanna go on and get.

To retrieve the entire `JocalStorage` cache then pass no arguments, `JocalStorage.get()`.

### remove(id)

Call `JocalStorage.remove(id)` where `id` is equals the `id` of the particular 'record' you wanna blow away.

### clear()

`JocalStorage.clear()` blows away entire `localStorage` (which should proooobably change) as well as the `JocalStorage` cache.
