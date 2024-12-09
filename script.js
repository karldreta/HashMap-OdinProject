import LinkedList from "./modules/linkedlist.js";

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
        // this.double = 2; ?
            // this.capacity *= 2; When we reinitialize.
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
        // After setting down the key-value pair we should then:
        // Check if we need to rehash by getting the length() of the stored keys,
        // Length over table size or length / this.capacity. 
        // Check if (length / this.capacity) > this.loadFactor (0.75)
            // if it is:
            // Create new buckets (doubledBuckets)
            // Call the entries() method inside this class, which returns an array of arrays that each contain all the key-value pair from the original buckets(this.buckets).
                // hash() each key "entries()[index][0]" returning the index upon which to put this entry on the new buckets (doubledBuckets).
                // 
                // Question, the capacity (which comes after the modulo) at hash() needs to be doubled 

        // For rehashing:
        if ((this.length() / this.capacity) > this.loadFactor) {
            this.capacity *= 2; // Double the capacity
            let doubledBuckets = new Array(this.capacity).fill(null);
            this.entries().forEach(element => {
                // console.log(element[0]);
                // console.log(this.hash(element[0])); // the "this.capacity" inside the hash is now updated to double.
                // doubledBuckets[this.hash(element[0])] = element;
                // console.log(doubledBuckets);
                if (doubledBuckets[this.hash(element[0])] == null) {
                    doubledBuckets[this.hash(element[0])] = { key: element[0], value: element[1] };
                }
                // We'll be implementing a Linked List here
            //     else {
            //         // Check first if the current index is already a Linked List
            //         if (doubledBuckets[this.hash(element[0])] instanceof LinkedList) {
            //             // If it is, check if we already have the same key in the list.
            //             const indexInList = doubledBuckets[this.hash(element[0])].find(this.hash(element[0]));
            //             if (indexInList != null) {
        
            //                 // Traverse the list to the value of the object and set it to the new value.
            //                 doubledBuckets[this.hash(element[0])].at(indexInList)[element[0]] = { key: key, value: value };
            //             } else {
            //                 // Otherwise add the collision to the list.
            //                 doubledBuckets[this.hash(element[0])].append({ key: element[0], value: element[1] });
            //             }
            //         } else {
            //             // If its NOT a Linked List create one
            //             let list = new LinkedList();
        
            //             // After initiation of the list append the current key/value pair in the index to the start of the list.
            //             list.append({ key: element[0], value: element[1] }); 
        
            //             // Then append the new key/value pair -- the one that caused the collision.
            //             list.append({ key: element[0], value: element[1] });
        
            //             // Then turn the entire index(bucket) into the list. *Note, the order of operations matter here.
            //             doubledBuckets[this.hash(element[0])] = list; 
            //         }
            //     }
            // });
            this.buckets = doubledBuckets;
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
            // We will reinitialize the buckets, know that this will also set the linked lists to null.
            this.buckets = new Array(this.capacity).fill(null);
            // This way we no longer need to loop.
    }
    keys() {
        // Returns an array containing all the keys inside the hash map.
        let keysArray = [];        
        for (let index = 0; index < this.buckets.length; index++) {
            if (this.buckets[index] !== null) {
                if (!(this.buckets[index] instanceof LinkedList)) {
                    // If it's not a Linked List that means there's is no collision (so one key-value only), we'll just have to push the key in our array
                    keysArray.push(this.buckets[index].key);
                } else {
                    // Well have to create another array which we will concatenate to the keysArray.
                    let current = this.buckets[index].head(); // There is a built in head method on every Linked List which will give us the head of the list.
                    let listArray = [];
                    for (let i = 0; i < this.buckets[index].length; i++) {
                        listArray.push(current.value.key)         
                        current = current.next;
                      }
                    keysArray = keysArray.concat(listArray);
                }
            }
        }
        return keysArray;
    }
    values() {
        // Returns an array containing all the values.
        // Here, we can simply copy the code above, but instead of "keys" we'll use "values".
        let valuesArray = [];        
        for (let index = 0; index < this.buckets.length; index++) {
            if (this.buckets[index] !== null) {
                if (!(this.buckets[index] instanceof LinkedList)) {

                    valuesArray.push(this.buckets[index].value);
                } else {

                    let current = this.buckets[index].head(); 
                    let listArray = [];
                    for (let i = 0; i < this.buckets[index].length; i++) {
                        listArray.push(current.value.value)         
                        current = current.next;
                      }
                      valuesArray = valuesArray.concat(listArray);
                }
            }
        }
        return valuesArray;
    }
    entries() {
        // Returns an array that contains each key, value pair.
        // We'll simply enclose each index in brackets as we push.
        let entriesArray = [];
        for (let index = 0; index < this.buckets.length; index++) {
            if (this.buckets[index] !== null) {
                if (!(this.buckets[index] instanceof LinkedList)) {
                    entriesArray.push([this.buckets[index].key, this.buckets[index].value]);
                } else {
                    let current = this.buckets[index].head(); 
                    let listArray = [];
                    for (let i = 0; i < this.buckets[index].length; i++) {
                        listArray.push([current.value.key, current.value.value])         
                        current = current.next;
                      }
                      entriesArray = entriesArray.concat(listArray);
                }
            }
        }
        return entriesArray;
    }
}

const test = new HashMap();
// Map.set("apple", "red"); // index 10
// Map.set("J", "red"); // index 10 - Collision!
// Map.set("apple", "blue"); // index 10 - To Edit
// Map.set("J", "orange"); // index 10 - To 
// Map.set("dog", "pink"); // index 10 - To Edit
// Map.set("dfgw9opkl,m", "red"); // index 10 

// console.log(Map.get("apple"));
// console.log(Map.has("dfgw9opkl,m")); // index 10
// console.log(Map.has("dog"));
// console.log(Map.has("apple"));
// console.log(Map.remove("apple"))
// console.log(Map.remove("J"));
// console.log(Map.remove("dfgw9opkl,m"));
// console.log(Map.remove("dfgw9opkl"));
// Map.set("apple", "peach"); // index 10
// Map.set("app", "green"); // index 10
// Map.set("mango", "yellow"); // index 10


// console.log(Map.hash("ddfghjklwrodjkls")); // index 12

// console.log(Map.keys());
// console.log(Map.values());
// console.log(Map.entries());
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
test.set('moon', 'gold')

console.log(test.buckets[28]);



