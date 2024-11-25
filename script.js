class HashMap {
    constructor() {
        this.loadFactor = 0.8;
        this.capacity = 16;
    }
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
      }
}

const Map = new HashMap();
console.log(Map.hash("James"));
console.log(Map.hash("karl"));
console.log(Map.hash("dog"));
console.log(Map.hash("jay"));


