let db: IDBDatabase;
const request = window.indexedDB.open('chapter')
request.onsuccess = (e) => {
    db = request.result
}

export default request
