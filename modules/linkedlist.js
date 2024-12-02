import Node from "./nodeModule.js";

export default class LinkedList {
  constructor() {
    this.start = null;
    this.end = null;
    this.length = 0;
  }
  append(value) {
    const newNode = new Node();
    newNode.value = value; // We append the value after instantiation since the node class has default property values of null (which is okay in this case).
    if (this.start == null) {
      this.start = newNode; // Link the current end to the new node
      this.end = this.start; // Both start and end should be equal for the first node
    }

    if (this.end != null) {
      this.end.next = newNode; // Link the current end to be the newly added node.
      this.end = newNode; // Set the end to the new node.
      this.length++; // Adds 1 to the size. *We only need to increment from here since this is where we set the node.
    }
  }
  prepend(value) {
    const newNode = new Node();
    newNode.value = value;

    if (this.start == null) {
      this.start = newNode;
      this.end = this.start;
    }

    if (this.start != null) {
      newNode.next = this.start; // Set the next value of the new node to the current start.
      this.start = newNode; // Set the start to the newly created nede.
      this.length++; // Adds 1 to the size.
    }
  }
  size() {
    return `This Linked List is ${this.length} nodes long.`;
  }
  head() {
    // We have to rename our properties to satisfy the project.
    return this.start;
  }
  tail() {
    return this.end;
  }
  at(index) {
    let current = this.start; // Initialize the current to the start(head).
    for (let i = 0; i < index; i++) {
      current = current.next; // let current advance to the next until the iteration reaches the target(index).
    }
    // Afterwards, simply return current.
    return current;
  }
  pop() {
    if (this.length == 0) {
      throw new Error("Cannot pop from an empty list.");
    }

    if (this.length == 1) {
      // If only one node exists, clear the list.
      this.start = null;
      this.end = null;
      this.length--;
      return;
    } 

    // Traverse to the second to the last node.
    let current = this.start;
    for (let i = 0; i < this.length - 2; i++) {
      current = current.next;
    }
    // Set the current.next to null eliminating succeeding links and setting this.end to the second to last node.
    current.next = null;
    this.end = current;
    this.length--; // Decrement the size of the list.
  }
  find(value) {
    let current = this.start;
    
    for (let i = 0; i < this.length; i++) {
      if (current.value.key == value) {
        return i;
      } else {
        current = current.next;
      }
    }
    return null; // Return null if the value is not found in the list
  }
  toString() {
    let current = this.start;
    let list = ""; // This is a storage for strings to concatenate;
    for (let i = 0; i < this.length; i++) {
      list += `(${current.value}) -> `; // Concatenate all the values into this template.
      current = current.next;
      if (current == null) {
        list += null; // When current is null add null to the last of the list.
      }
    }
    return list; // Return the concatenated list;
  }

  // Extra Credit
  insertAt(value, index) {
    // For this we will be using our existing method "at()" to look for the node in a given index, see at() above.
    const newNode = new Node();
    newNode.value = value;
    newNode.next = this.at(index); // at() will return the current node in a given index and we set that node as the .next value of our 'newNode';
    // But how will the previous node (the one before the index) know who its .next node is?
    // We will also grab that node by traversing to the given index minus 1, then set that node's next to the newNode. Easy.
    // But...
    if (index == 0) {
      this.prepend(value); // Prepend the node and simply return. Also no need to add to the length since prepend already takes care of that.
      return;
    }
    // Otherwise, continue.
    this.at(index - 1).next = newNode;
    this.length++; // Then add 1 to the size of the list.
  }
  removeAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds.");
  }
    if (index == 0) {
      this.start = this.head().next; // head() method returns the current head, so we'll just have to set the start of list to the next node of the head().
      this.length--;
      return;
    }
    if (index == this.length - 1) {
      console.log("hi");
      
      this.pop();
      return;
    }

    // Otherwise grab the previous node and change its next to the current node's .next;
    this.at(index - 1).next = this.at(index + 1);
    this.length--; // Then reduce the size by 1.
  }
}
