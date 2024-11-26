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

                // If it is, check if we already have the same key in the list.
                const indexInList = this.buckets[index].find(key);
                if (indexInList != null) {

                    // Traverse the list to the value of the object and set it to the new value.
                    this.buckets[index].at(indexInList)["value"] = { key: key, value: value };
                } else {
                    // Otherwise add the collision to the list.
                    this.buckets[index].append({ key: key, value: value });
                }
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
    get(key) {
        const index = this.hash(key);

        // If the bucket is empty return null
        if (this.buckets[index] == null) {
            return null;
        }

        // If the bucket is a Linked List, find the "index in the list", then "at" that index get the value. 
        if (this.buckets[index] instanceof LinkedList) {
            const indexInList = this.buckets[index].find(key);
            
            // We also check if the key is found in the list, i.e find() returns null.
            if (indexInList != null) {
                return this.buckets[index].at(indexInList)["value"]["value"]; // The first "value" is the Node itself, the second is the value of the key.      
            } else {
                return null;
            }

        } else {
            return this.buckets[index].value;
        }
    }
}

const Map = new HashMap();
Map.set("apple", "red"); // index 10
Map.set("J", "red"); // index 10 - Collision!
Map.set("apple", "blue"); // index 10 - To Edit
Map.set("J", "orange"); // index 10 - To 
Map.set("dog", "pink"); // index 10 - To Edit
console.log(Map.get("rghjukliolpnmndh"));
 // 12

console.log(Map.hash("rghjukliolpnmndh"));

console.log(Map.buckets);



