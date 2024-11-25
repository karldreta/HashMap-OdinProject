class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
    }
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
      }
    set(key, value) {
        let index = this.hash(key);
        if (this.buckets[index] == null) {
            this.buckets[index] = { key: key, value: value };
        } 

    }
}

const Map = new HashMap();
console.log(Map.hash("apple"));
console.log(Map.hash("J"));
Map.set("apple", "blue"); // index 10
Map.set("J", "red"); // index 10
console.log(Map.buckets);




