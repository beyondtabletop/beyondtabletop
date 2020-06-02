export class BtBase {
  version?: number
  id: string

  getProto() {
    return {}
  }

  getLookup() {
    return {}
  }

  constructor(init = {}) {
    const self = this

    const proto: any = self.getProto()
    const lookup = self.getLookup()

    const randomSecureString = (length = 12) => {
      let text = ''
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }

    const initArray = (slug, array) => {
      self[slug] = []
      const construct = !!array[0] ? array[0].constructor : lookup[slug]
      init[slug].forEach(item => {
        self[slug].push(new construct(item))
      })
    }

    const initObject = (slug, item) => {
      self[slug] = new item.constructor(init[slug])
    }

    const initPrimitive = slug => {
      self[slug] = init[slug]
    }

    proto.id = randomSecureString()
    Object.assign(self, proto)

    Object.keys(proto).forEach(slug => {
      const item = proto[slug]
      if (init[slug] !== undefined) {
        if (typeof item === 'object' && item !== null) {
          if (item instanceof Array) {
            initArray(slug, item)
          } else {
            initObject(slug, item)
          }
        } else {
          initPrimitive(slug)
        }
      }
    })
  }

  updateModel(incoming, remoteChanges, localChanges) {
    const conflicts = []

    // This compares changes between remote and local. we start by removing
    // the property, so if a change to the same object occurrs we know about it
    // Then we push remote and local addresses to the conflicts array
    const checkConflicts = () => {
      const mapper = x => x.substr(0, x.lastIndexOf('.'))
      const importantConflict = (a, b) => a.includes('_added') || a.includes('_removed') || b.includes('_added') || b.includes('_removed')
      const localMapped = localChanges.list.map(mapper)

      remoteChanges.list.map(mapper).forEach((x, remoteIndex) => {
        const localIndex = localMapped.indexOf(x)
        if (localIndex > -1) {
          const isImportantConflict = importantConflict(remoteChanges.list[remoteIndex], localChanges.list[localIndex])
          const exactSameChange = remoteChanges.list[remoteIndex] === localChanges.list[localIndex]
          if (isImportantConflict || exactSameChange) {
            conflicts.push({
              remote: remoteChanges.list[remoteIndex],
              local: localChanges.list[localIndex]
            })
          }
        }
      })
    }

    // Simple recursive function to interate through the changes lookup
    // and remove the conflicting change
    const removeConflict = (parent, segments) => {
      const segment = segments.shift()
      const segmentChanges = parent.changes && parent.changes.includes(segment)
      if (segmentChanges) {
        parent.changes.splice(parent.changes.indexOf(segment), 1)
      } else if (parent[segment] && segments.length > 0) {
        removeConflict(parent[segment], segments)
      } else {
        delete parent[segment]
      }
    }

    // The only conflict we have to manually address is if a local item gets
    // added and remote doesn't know about it yet. OR if a remote deletes something
    // we were still editing locally
    const resolveConflicts = () => {
      conflicts.forEach(conflict => {
        let segments;
        if (conflict.remote.includes('_removed')) {
          segments = conflict.remote.replace(/base\.|\._removed/gi, '').split('.')
          removeConflict(remoteChanges.lookup, segments)
        } else {
          segments = conflict.remote.replace(/base\./gi, '').split('.')
          removeConflict(remoteChanges.lookup, segments)
        }
      })
    }

    // Resets changes object to initial state
    const resetChanges = () => {
      remoteChanges.lookup = {}
    }

    // Guard against version rollbacks
    if (this.version && incoming.version < this.version) {
      resetChanges()
      return
    }

    checkConflicts()
    if (conflicts.length > 0) {
      resolveConflicts()
    }

    this.commitUpdate(incoming, remoteChanges.lookup)
    resetChanges()
  }

  commitUpdate(incoming, lookup) {
    const proto: any = this.getProto()
    const arrayLookup: any = this.getLookup()
    const self: any = this

    // if the lookup object has a changes object on it, there
    // are properties that need to be addressed here
    // we start by ignoring all properties that begin with _
    // becuase those are handled elsewhere
    // Once we finish we delete the lookup id and changes

    const arrayFullyDeleted = (a, b, item) => {
      return item instanceof Array && a && !b
    }

    const handlePrimitives = (a, b) => {
      if (!!lookup.changes) {
        lookup.changes
          .filter(x => x.charAt(0) !== '_')
          .map(slug => ({ slug, item: proto[slug] }))
          // Filter out non primitive
          // Unless an entire array has been deleted
          .filter(({item, slug}) => typeof item !== 'object' || item === null || arrayFullyDeleted(a[slug], b[slug], item))
          .forEach(({slug}) => a[slug] = b[slug])
        delete lookup.changes
        delete lookup.id
      }
    }

    // Iterate over the given lookup IDs, check for associated objects on
    // both a and b (y and z respectively). If this associated object has
    // changes, we take care of the _ prefaced actions, namely: removing
    // and adding objects. Finally we send it through the recursive process
    // if both objects exist to check for further changes
    const updateArray = (a, b, slug) => {
      Object.keys(lookup[slug]).forEach(id => {
        const construct = !!proto[slug][0] ? proto[slug][0].constructor : arrayLookup[slug]
        const y = a[slug].find(x => x.id === id)
        const z = b[slug].find(x => x.id === id)
        if (!!lookup[slug][id].changes) {
          if (lookup[slug][id].changes.includes('_added')) {
            a[slug] = a[slug] || []
            a[slug].push(new construct(z))
          }
          if (lookup[slug][id].changes.includes('_removed')) {
            a[slug].splice(a[slug].indexOf(y), 1)
          }
        }
        if (!!y && !!z) {
          y.commitUpdate(z, lookup[slug][id])
        }
      })
    }

    // Check through proto keys that exist in our lookup and send them to
    // updateArray or into recursive commitUpdate. Primitives are handled separately
    const updateObject = (a, b) => {
      Object.keys(proto)
        // Filter out slugs that aren't in the lookup
        .filter(x => lookup[x] !== undefined)
        .map(slug => ({ slug, item: proto[slug] }))
        // Filter out slugs defined as primitives in the proto
        .filter(({item}) => typeof item === 'object' && item !== null)
        .forEach(({item, slug}) => {
          if (item instanceof Array) {
            updateArray(a, b, slug)
          } else {
            a[slug].commitUpdate(b[slug], lookup[slug])
          }
        })
    }

    handlePrimitives(self, incoming)
    updateObject(self, incoming)
  }

  compareChanges(rival, changesList, changesLookup, context, isNew = false) {
    const proto: any = this.getProto()
    const arrayLookup: any = this.getLookup()
    const self: any = this

    // Sometimes data is null in one place and undefined in the other place
    // In this case we usually want to ignore the property, since we don't
    // want to send any undefined values to Firebase
    const nullAndUndefined = (a, b) => {
      return (a === null && b === undefined) || (a === undefined && b === null)
    }

    const anyUndefinedValules = (a, b) => {
      return (isNew && b === undefined) || a === undefined
    }

    // We never want to nullify or undefined-ify ID on any object
    const overwritingIdWithNothing = (a, b, slug) => slug === 'id' && isNew && !!a && !b

    const shouldAddPrimitiveChange = (a, b, slug) => {
      return !nullAndUndefined(a, b) && !anyUndefinedValules(a, b) && !overwritingIdWithNothing(a, b, slug)
    }

    // JSON stringify comparison
    const identicalObjects = (a, b) => {
      return JSON.stringify(a) === JSON.stringify(b)
    }

    // We add changes to an array: changesList and an object: changesLookup
    // We can pass in different lookup object and different context for the
    // given changes. If the change doesn't exist on the array we add it.
    // However, duplicate changes can be added to the lookup
    const addChange = (id, property, changesObject = changesLookup, context_mod = '') => {
      changesObject.id = (id || '')
      changesObject.changes = changesObject.changes || []
      changesObject.changes.push(property)
      const change = `${context}${context_mod}.${property}`
      if (changesList.indexOf(change) === -1) {
        changesList.push(change)
      }
    }

    // Just barely still need this helper method.
    const addChangeForSlug = slug => {
      addChange(self.id, slug)
    }

    // This logs if an item was removed or added
    // action is a string of either '_added' or '_removed'
    const addArrayChange = (slug, id, action) => {
      addChange(id, action, changesLookup[slug][id], `.${slug}.${id}`)
    }

    // Clean up the changes object, removing all empties
    const removeEmptyObjects = (parent, slug) => {
      if (Object.keys(parent[slug]).length === 0) {
        delete parent[slug]
      }
    }

    const findIndex = (array, id) => {
      let index = array.findIndex(x => x.id === id)
      if (index < 0) {
        index = array.length
      }
      return index
    }

    const compareIndex = (array, a, b) => {
      return findIndex(array, a.id) - findIndex(array, b.id)
    }

    // Compare 2 arrays on a given slug (Example: character.feats)
    const compareArray = (a, b, slug) => {
      // Grab the construct (aka the Class of the array's iterator)
      // from either the first element in the prototype's array or
      // from the given lookup object for that array
      const construct = !!proto[slug][0] ? proto[slug][0].constructor : arrayLookup[slug]

      // Initialize the change object at the slug if we need to
      changesLookup[slug] = changesLookup[slug] || {}

      // If both arrays exist, that means a whole array wasn't added or deleted
      if (!!a && !!b) {

        // Iterate over a every time because a is always Classed rather
        // than just raw object data. we use y as the iterator for a and
        // z for the iterator for b. x is reserved as a generic interator
        a.forEach(y => {

          // initialize changes object at the given y.id
          changesLookup[slug][y.id] = changesLookup[slug][y.id] || {}

          // Find z by y's ID. If we find it, we compare the two
          // found objects' properties. Otherwise we log that an
          // item was either added or removed, depending on if
          // the incoming data is old or new
          const z = b.find(x => x.id === y.id)
          if (!!z) {
            new construct(y).compareChanges(z, changesList, changesLookup[slug][y.id], `${context}.${slug}.${y.id}`, isNew)
          } else {
            addArrayChange(slug, y.id, (isNew ? '_removed' : '_added'))
          }

          removeEmptyObjects(changesLookup[slug], y.id)
        })

        // Because we iterated over a, we need lookup if there are items
        // in b that weren't in a. if we find any, we initialize the
        // changes object and log them as either added or removed items
        const aIdMap = a.map(x => x.id)
        b.filter(x => !aIdMap.includes(x.id)).forEach(z => {
          changesLookup[slug][z.id] = changesLookup[slug][z.id] || {}
          addArrayChange(slug, z.id, (isNew ? '_added' : '_removed'))
        })

        // Finally after applying the changes to each array item, we need
        // to ensure the items are in the same order for incoming changes
        if (isNew) {
          a.sort((x, y) => compareIndex(b, x, y))
        }

      // If one array exists and it has any substance (aka more than 0 length)
      // then we need to treat this slug like we would treat a primitive
      // because we need to add or delete the entire array.
      // If it's an empty array in one spot and undefined in the other
      // that means there's been no change
      } else if (!!a && a.length > 0 || !!b && b.length > 0) {
        addChangeForSlug(slug)
      }

      removeEmptyObjects(changesLookup, slug)
    }

    // Initialize the changes object at slug, recurse into compareChanges
    // after we finish we clean up empty objects
    const compareObject = (slug) => {
      changesLookup[slug] = {}
      self[slug].compareChanges(rival[slug] || {}, changesList, changesLookup[slug], `${context}.${slug}`, isNew)
      removeEmptyObjects(changesLookup, slug)
    }

    // construct two new Objects from the data sets given
    // if they match then we can just get out of here
    if (identicalObjects(new self.constructor(self), new self.constructor(rival))) {
      return
    }

    // Iterate over the keys given on the proto. If a key doesn't exist
    // on the proto, we don't care about it.
    Object.keys(proto).forEach(slug => {
      const item = proto[slug]

      // This comparison is very likely unhelpful for everything except
      // primitive values, but it's here to stay for now
      if (self[slug] !== rival[slug]) {
        if (typeof item === 'object' && item !== null) {

          // If it's an array, we send it to our local compareArray method
          // Otherwise it's an object and send it to compareObject
          if (item instanceof Array) {
            compareArray(self[slug], rival[slug], slug)
          } else {
            compareObject(slug)
          }
        } else {

          // Finaly if it's not an object it must be primitive, so we
          // do a null/undefined comparison check and add the change
          if (shouldAddPrimitiveChange(self[slug], rival[slug], slug)) {
            addChangeForSlug(slug)
          }
        }
      }
    })

    return
  }

  databaseSafe(): any {
    const proto: any = this.getProto()
    const keys = [...Object.keys(proto), 'id']
    const self: any = this
    const safe: any = {}

    keys.forEach(slug => {
      const item = proto[slug]
      if (Array.isArray(item)) {
        if (self[slug] && self[slug].length > 0) {
          safe[slug] = self[slug].map(x => x.databaseSafe())
        }
      } else if (typeof item === 'object' && item !== null) {
        safe[slug] = self[slug].databaseSafe()
      } else if (self[slug] !== undefined && self[slug] !== null) {
        safe[slug] = self[slug]
      }
    })

    return safe
  }
}
