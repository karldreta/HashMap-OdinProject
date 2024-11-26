import LinkedList from "./modules/linkedlist.js";

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
        const index = this.hash(key);
        if (this.buckets[index] == null) {
            this.buckets[index] = { key: key, value: value };
        } 
        // If the keys are the same overwrite the value while still keeping yhe key
        if (this.buckets[index].key == key) {
            this.buckets[index] = { key: key, value: value };
        } 
        // We'll be implementing a Linked List here
        else {
            // Check first if the current index is already a Linked List
            if (this.buckets[index] instanceof LinkedList) {
                this.buckets[index].append({ key: key, value: value });
            } else {
                // If its NOT a Linked List create one
                let list = new LinkedList();

                // After initiation of the list append the current key/value pair in the index to the start of the list.
                list.append({ key: this.buckets[index].key, value: this.buckets[index].value}); 

                // Then append the new key/value pair -- the one that caused the collision.
                list.append({ key: key, value: value });

                // Then turn the entire index(bucket) into the list. *Note, the order of operations matter here.
                this.buckets[index] = list; 
            }
        }
    }
}

const Map = new HashMap();
console.log(Map.hash("apple"));
console.log(Map.hash("J"));
Map.set("apple", "red"); // index 10
Map.set("J", "red"); // index 10 - Collision!
Map.set("apple", "blue"); // index 10

Map.set("orange", "cat");
console.log(Map.buckets);
console.log(Map.buckets[14]["key"]);

console.log(Map.buckets[10]);

// const list = new LinkedList();
// list.append("Bryan"); // 2
// list.append("Jerald"); // 3
// list.append("Eric"); // 4
// list.append("Justin"); // 5
// // list.prepend("Karl"); // 0
// // list.prepend("Rey"); // 1
// // list.insertAt("John", 5);
// // list.removeAt(4);
// console.log(list.size());
// console.log(list.toString());
// // console.log(list.find("Karl"));



