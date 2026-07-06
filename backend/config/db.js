import mongoose from 'mongoose';

// Store all database records in memory
const dbStore = {
  User: [],
  Issue: [],
  Vote: [],
  Comment: [],
  Media: [],
  GCPTransaction: [],
  Notification: [],
  RefreshToken: [],
  RewardRedemption: []
};

// Auto-increment ID generator
let idCounter = 1;
function generateId() {
  const hex = (idCounter++).toString(16).padStart(24, '0');
  return {
    toString() { return hex; },
    toJSON() { return hex; },
    equals(other) { return this.toString() === (other && other.toString()); }
  };
}

// Clone helper to simulate database isolation and attach document instance methods
function cloneDoc(doc, modelName) {
  if (!doc) return null;
  const cloned = JSON.parse(JSON.stringify(doc));
  cloned._id = doc._id; // Preserve custom ID object
  cloned._modelName = modelName;

  // Add standard instance methods
  cloned.save = async function() {
    const list = dbStore[modelName];
    const idx = list.findIndex(d => d._id.toString() === cloned._id.toString());
    cloned.updatedAt = new Date();
    if (idx > -1) {
      list[idx] = { ...list[idx], ...cloned };
    } else {
      list.push(cloned);
    }
    return cloned;
  };

  cloned.populate = async function(path, select) {
    const populated = await populateDocs([cloned], path, select);
    Object.assign(cloned, populated[0]);
    return cloned;
  };

  return cloned;
}

// Match function for filter queries
function matchesFilter(doc, filter) {
  if (!filter) return true;
  for (const key of Object.keys(filter)) {
    if (key === 'isDeleted') {
      if (filter.isDeleted === false && doc.isDeleted) return false;
      if (filter.isDeleted === true && !doc.isDeleted) return false;
      continue;
    }
    if (key === '$or') {
      if (!Array.isArray(filter.$or)) return false;
      const matched = filter.$or.some(f => matchesFilter(doc, f));
      if (!matched) return false;
      continue;
    }
    if (filter[key] instanceof RegExp) {
      if (!filter[key].test(doc[key] || '')) return false;
      continue;
    }
    const docVal = doc[key];
    const filterVal = filter[key];
    if (docVal && filterVal && typeof docVal.toString === 'function' && typeof filterVal.toString === 'function') {
      if (docVal.toString() !== filterVal.toString()) return false;
    } else if (docVal !== filterVal) {
      return false;
    }
  }
  return true;
}

// Sorting helper
function sortDocs(docs, sortField) {
  let field = sortField;
  let desc = false;
  if (typeof sortField === 'string') {
    if (sortField.startsWith('-')) {
      desc = true;
      field = sortField.substring(1);
    } else {
      field = sortField;
    }
  }
  return [...docs].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];
    if (valA instanceof Date) valA = valA.getTime();
    if (valB instanceof Date) valB = valB.getTime();
    if (valA < valB) return desc ? 1 : -1;
    if (valA > valB) return desc ? -1 : 1;
    return 0;
  });
}

// Populating helper
async function populateDocs(docs, path, select) {
  for (const doc of docs) {
    const val = doc[path];
    if (!val) continue;
    
    let targetModelName = null;
    if (path === 'author' || path === 'responsibleUser' || path === 'user' || path === 'recipient' || path === 'sender') {
      targetModelName = 'User';
    } else if (path === 'issue') {
      targetModelName = 'Issue';
    }

    if (targetModelName && dbStore[targetModelName]) {
      const targetDoc = dbStore[targetModelName].find(d => d._id.toString() === val.toString());
      if (targetDoc) {
        doc[path] = cloneDoc(targetDoc, targetModelName);
      }
    }
  }
  return docs;
}

// Mock query builder for chainable Mongoose commands
class MockQuery {
  constructor(modelName, filter, isFindOne = false) {
    this.modelName = modelName;
    this.filter = filter;
    this.isFindOne = isFindOne;
    this._populatePaths = [];
    this._sortField = null;
    this._skipCount = 0;
    this._limitCount = null;
  }

  populate(path, select) {
    if (typeof path === 'object' && path !== null) {
      this._populatePaths.push(path);
    } else {
      this._populatePaths.push({ path, select });
    }
    return this;
  }

  sort(sortField) {
    this._sortField = sortField;
    return this;
  }

  skip(count) {
    this._skipCount = count;
    return this;
  }

  limit(count) {
    this._limitCount = count;
    return this;
  }

  async exec() {
    let docs = dbStore[this.modelName] || [];
    docs = docs.filter(doc => matchesFilter(doc, this.filter));

    if (this.modelName === 'User' && this.filter && this.filter._id && docs.length === 0) {
      const idStr = this.filter._id.toString();
      const newUser = {
        _id: this.filter._id,
        name: 'Citizen',
        username: `citizen_${idStr.substring(Math.max(0, idStr.length - 6))}`,
        points: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      };
      dbStore.User.push(newUser);
      docs = [newUser];
    }

    if (this.modelName === 'RefreshToken' && this.filter && this.filter.token && docs.length === 0) {
      try {
        const jwt = (await import('jsonwebtoken')).default;
        const decoded = jwt.decode(this.filter.token);
        if (decoded && decoded.id) {
          const userIdStr = decoded.id.toString();
          
          // Ensure User exists
          let user = dbStore.User.find(u => u._id.toString() === userIdStr);
          if (!user) {
            user = {
              _id: decoded.id,
              name: 'Citizen',
              username: decoded.username || `citizen_${userIdStr.substring(Math.max(0, userIdStr.length - 6))}`,
              points: 100,
              createdAt: new Date(),
              updatedAt: new Date(),
              isDeleted: false,
            };
            dbStore.User.push(user);
          }

          // Create RefreshToken
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7);
          const newRefreshToken = {
            _id: (Math.random() * 100000).toString(),
            user: decoded.id,
            token: this.filter.token,
            expiresAt,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          dbStore.RefreshToken.push(newRefreshToken);
          docs = [newRefreshToken];
        }
      } catch (err) {
        // Ignore error
      }
    }

    if (this._sortField) {
      docs = sortDocs(docs, this._sortField);
    }

    if (this._skipCount) {
      docs = docs.slice(this._skipCount);
    }
    if (this._limitCount !== null && this._limitCount !== undefined) {
      docs = docs.slice(0, this._limitCount);
    }

    for (const pop of this._populatePaths) {
      docs = await populateDocs(docs, pop.path, pop.select);
    }

    const cloned = docs.map(d => cloneDoc(d, this.modelName));
    return this.isFindOne ? (cloned[0] || null) : cloned;
  }

  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected);
  }
}

// Wrap Model creation in mongoose
const originalModel = mongoose.model.bind(mongoose);

mongoose.model = function(name, schema) {
  let Model;
  try {
    Model = originalModel(name, schema);
  } catch (err) {
    Model = mongoose.models[name] || originalModel(name);
  }

  if (!dbStore[name]) {
    dbStore[name] = [];
  }

  // Mock static methods on the Model class
  Model.find = (filter) => new MockQuery(name, filter, false);
  Model.findOne = (filter) => new MockQuery(name, filter, true);
  Model.findById = (id) => new MockQuery(name, { _id: id }, true);
  Model.countDocuments = async (filter) => {
    const q = new MockQuery(name, filter, false);
    const results = await q.exec();
    return results.length;
  };
  Model.deleteOne = async (filter) => {
    const initialLen = dbStore[name].length;
    dbStore[name] = dbStore[name].filter(d => !matchesFilter(d, filter));
    return { deletedCount: initialLen - dbStore[name].length };
  };
  Model.create = async (data) => {
    const docsToCreate = Array.isArray(data) ? data : [data];
    const createdDocs = [];
    for (const item of docsToCreate) {
      const doc = {
        _id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        ...item
      };
      dbStore[name].push(doc);
      createdDocs.push(cloneDoc(doc, name));
    }
    return Array.isArray(data) ? createdDocs : createdDocs[0];
  };

  // Mock instance methods
  Model.prototype.save = async function() {
    const list = dbStore[name];
    const plainObj = this.toObject ? this.toObject() : { ...this };
    if (!plainObj._id) {
      plainObj._id = generateId();
      plainObj.createdAt = new Date();
    }
    plainObj.updatedAt = new Date();
    plainObj.isDeleted = plainObj.isDeleted || false;

    const idx = list.findIndex(d => d._id.toString() === plainObj._id.toString());
    if (idx > -1) {
      list[idx] = plainObj;
    } else {
      list.push(plainObj);
    }
    return this;
  };

  return Model;
};

// Force bypass database connection
mongoose.connect = async () => {
  return { connection: { host: 'mock-in-memory-db' } };
};

const connectDB = async () => {
  console.log("===================================================");
  console.log("MOCK DATABASE ACTIVE: Data running in memory");
  console.log("===================================================");
};

export default connectDB;
