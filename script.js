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
    has(key) {
        const index = this.hash(key);
        if (this.buckets[index] == null) {
            return false;
        }
        // EDGE CASE - What if two keys point to the same index, the index wont be null and hence will return true, even tho they have different values.

        // Case #1: The bucket contains a key-value (not a LinkedList).
        if (!(this.buckets[index] instanceof LinkedList)) {
            // Check if the key matches the one in this bucket.
            return this.buckets[index].key == key;
        }

        // Case #2: The bucket contains a LinkedList caused by collisions.
        if (this.buckets[index] instanceof LinkedList) {
            const indexInList = this.buckets[index].find(key);
            
            // If indexList is not null, that means find() had found the key inside the Linked List and hence we'll return true.
            
           return indexInList != null;
        }

        // Fallback (should not be reachable if the logic is correct):
        return false;
    }
    
    remove(key) {
        // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
        const index = this.hash(key);
        if (this.buckets[index] == null) {
            return false;
        }

        if (!(this.buckets[index] instanceof LinkedList)) {
            // Set the index to null
            this.buckets[index] = null;
            return true;
        } else {
            const indexInList = this.buckets[index].find(key);
            this.buckets[index].removeAt(indexInList);
            // This will keep the Linked List structure of the index. Even whn the list is empty, the head node is still set to null. 
            // This is fine as it allows for easier handling of future collisions. Instead of going back and fort.
           return true;
        }
    }

    length() {
        // We need to iterate over the map and check each bucket.
        let storedKeys = 0; // Initialize the count.
        for (let index = 0; index < this.buckets.length; index++) {
            if (this.buckets[index] !== null) {
                // If this bucket is not empty we check what's inside.

                if (!(this.buckets[index] instanceof LinkedList)) {
                    // If it is not a linked list (the bucket has no collisions), it should have only one key-value pair.
                    storedKeys++; // So, we add 1

                } else {
                    // Otherwise, if it is a Linked List:
                    // The LinkedList class has a length property so we'll take that value then add it to the storedKeys.
                    storedKeys += this.buckets[index].length;
                }
            }
        }
        return storedKeys;
    }
    clear() {
        // Removes all entries in the hash map.
        for (let index = 0; index < this.buckets.length; index++) {
            if (this.buckets[index] !== null) {
                // We will set everything back to its original state, know that this will also set the linked lists to null.
                this.buckets[index] = null;
            }
        }
    }
}

const Map = new HashMap();
Map.set("apple", "red"); // index 10
Map.set("J", "red"); // index 10 - Collision!
Map.set("apple", "blue"); // index 10 - To Edit
Map.set("J", "orange"); // index 10 - To 
Map.set("dog", "pink"); // index 10 - To Edit
Map.set("dfgw9opkl,m", "red"); // index 10 

// console.log(Map.get("apple"));
// console.log(Map.has("dfgw9opkl,m")); // index 10
// console.log(Map.has("dog"));
// console.log(Map.has("apple"));
console.log(Map.remove("apple"))
console.log(Map.remove("J"));
console.log(Map.remove("dfgw9opkl,m"));
// console.log(Map.remove("dfgw9opkl"));
// Map.set("apple", "peach"); // index 10
// Map.set("app", "green"); // index 10
// Map.set("mango", "yellow"); // index 10


// console.log(Map.hash("ddfghjklwrodjkls")); // index 12
console.log(Map.length());



Map.clear()
Map.set("apple", "red"); // index 10
Map.set("J", "red"); // index 10 - Collision!
Map.set("apple", "blue"); // index 10 - To Edit
Map.set("J", "orange"); // index 10 - To 
Map.set("dog", "pink"); // index 10 - To Edit
Map.set("dfgw9opkl,m", "red"); // index 10 
console.log(Map.length());
Map.clear()
console.log(Map.length());

console.log(Map.buckets);



