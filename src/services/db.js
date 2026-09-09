const DB_NAME = "triveni-pustakalaya-db";
const DB_VERSION = 1;

let dbInstance = null;

/*
========================================
OPEN DATABASE
========================================
*/

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("data")) {
        db.createObjectStore("data", {
          keyPath: "key",
        });
      }
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/*
========================================
SAVE DATA
========================================
*/

export async function saveData(key, value) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("data", "readwrite");

    const store = transaction.objectStore("data");

    store.put({
      key,
      value,
      updatedAt: Date.now(),
    });

    transaction.oncomplete = () => {
      resolve(true);
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
}

/*
========================================
GET DATA
========================================
*/

export async function getData(key) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("data", "readonly");

    const store = transaction.objectStore("data");

    const request = store.get(key);

    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.value);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/*
========================================
DELETE DATA
========================================
*/

export async function deleteData(key) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("data", "readwrite");

    const store = transaction.objectStore("data");

    store.delete(key);

    transaction.oncomplete = () => {
      resolve(true);
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
}
