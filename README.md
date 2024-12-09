# HashMap-OdinProject
### This is an Odin Project: [HashMap](https://www.theodinproject.com/lessons/javascript-hashmap)

The goal of this project was to deepen my understanding of how hash maps work under the hood, including concepts like hashing, collision handling, and dynamic resizing.

## Overview:
In this project, I integrated my pre-existing LinkedList module to handle collisions, enabling the hash map to effectively store and retrieve key-value pairs even in the presence of hash collisions.

## Key Features of the Implementation:
* Custom Hashing Function: Generates hash codes for string keys based on modular arithmetic.
* Collision Handling: Uses linked lists to resolve collisions within buckets.
* Dynamic Resizing: Implements rehashing to maintain efficiency when the load factor exceeds 0.75.
* Efficiency: Designed to ensure an even distribution of keys across buckets, minimizing potential performance bottlenecks.

## Challenges and Reflections:
This project took me approximately two weeks to complete. While I’m proud of the final result, I feel I could have completed it more quickly had I maintained focus and motivation. Despite having worked on the Odin Project for over a year, the journey sometimes feels overwhelming. However, each project reinforces my skills and brings me one step closer to mastery.

## Lessons Learned:
* Integration of Modules: This project was an opportunity to reuse and adapt code, such as the linked list, to fit a new context.
* Understanding Load Factors: I now have a better grasp of why and how hash maps use dynamic resizing to optimize performance.

* The Importance of Note-Taking: Writing detailed comments within the codebase is invaluable. Comments not only serve as documentation for future reference but also act as a guide when revisiting or integrating the code into other projects. Effective note-taking includes:

    * Explaining the purpose of functions and key sections of code.
    * Documenting edge cases, assumptions, and limitations encountered during development.
    *  Highlighting design decisions that could impact future changes or debugging efforts.
    * By maintaining clear and concise documentation, I’m setting myself up for more efficient collaboration with others (or my future self) when revisiting or extending the project.

## Personal Note:
Staying motivated during a long-term learning journey like the Odin Project can be tough, but each completed project is a testament to growth. This hash map implementation is another milestone, reminding me why I started this journey in the first place. If you’re working through the Odin Project too, remember: progress, no matter how slow, is still progress. Keep going!