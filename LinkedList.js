// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO

    // Create a new student node
    const newNode = new Node(newStudent);

    // Scenario where the LinkedList is empty
    if (!this.head) {
      // The new node becomes the head and tail of the LinkedList with length of 1
      this.head = newNode;  
      this.tail = newNode;
      this.length = 1;
    }
    // Scenario where the LinkedList has at least one node
    else {
      // Add the new node to the tail of the LinkedList, update the tail, 
      // and increase length by 1
      const lastNode = this.tail;
      lastNode.next = newNode;
      this.tail = newNode;
      this.length += 1;
    }
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO

    // Set up variables for going through the LinkedList
    let currentNode = this.head;
    let previousNode = null;

    // Repeatedly go through the LinkedList
    while (currentNode) {
      const student = currentNode.data;
      // Scenario where a match is found
      if (student.getEmail().toLowerCase() === email.toLowerCase()) {
        // A match is found at the head, so update the head
        if (this.head === currentNode) {
          this.head = currentNode.next;
        }
        // A match is found at the tail, so update the tail
        if (this.tail === currentNode) {
          this.tail = previousNode;
        }
        // A match is found between the head and tail
        if (previousNode) {
          previousNode.next = currentNode.next;
        }
        // Reduce LinkedList length by 1 and exit 
        this.length--;
        return;
      }
      // Scenario where no match is found so far
      else {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO

    // Set up variables for going through the LinkedList
    let currentNode = this.head;

    // Repeatedly go throught the LinkedList
    while (currentNode) {
      const student = currentNode.data;
      // Scenario where a match is found
      if (student.getEmail().toLowerCase() === email.toLowerCase()) {
        return student;
      }
      // Scenario where no match is found so far
      else {
        currentNode = currentNode.next
      }
    }

    // No match is found
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO

    // Set up variables for going through the LinkedList
    let output = "";
    let currentNode = this.head;

    // Repeatedly go through the linkedList
    while (currentNode) {
      const student = currentNode.data;
      // append student name to the output string
      output += student.getName();
      // append a comma seperator if there is more
      if (currentNode.next) {
        output += ", ";
      }
      currentNode = currentNode.next;
    }
    return output;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO

    // Set up variables for going through the linkedList
    const studentsArray = [];
    let currentNode = this.head;

    // Generate an array of students
    while (currentNode) {
      const student = currentNode.data;
      studentsArray.push(student);
      currentNode = currentNode.next;
    }

    // Sort the array based on ascending student name order
    if (studentsArray.length > 0) {
      studentsArray.sort((student1, student2) => 
        student1.getName().localeCompare(student2.getName()));
    }
    return studentsArray;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO

    // First get an array of students sorted by name
    const studenArray = this.#sortStudentsByName();

    // Filter the array by specialization
    if (studenArray.length > 0) {
      return studenArray.filter((student) => 
        student.getSpecialization().toLowerCase() === specialization.toLowerCase());
    }
    return [];
  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minYear, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO

    // First get an array of students sorted by name
    const studentArray = this.#sortStudentsByName;

    // Filter the array by minimum year
    if (studentArray.length > 0) {
      return studentArray.filter((student) => student.getYear() >= minYear);
    }
    return [];
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO

    // Set up variables for going through the linkedList
    let objectsArray = [];
    let currentNode = this.head;

    // Generate an array of objects representing student properties
    while (currentNode) {
      const student = currentNode.data;
      const object = {name: student.getName(), year: student.getYear(), 
        email: student.getEmail(), specialization: student.getSpecialization()};
      objectsArray.push(object);
      currentNode = currentNode.next;
    }

    // Get a JSON string of the objectsArray to be written to file
    const jsonString = JSON.stringify(objectsArray, null, 4);

    // Write JSON string to file
    const fs = require('fs').promises;
    try {
      await fs.writeFile(fileName, jsonString, 'utf8');
    }
    catch(error) {
      console.log(error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO

    // Read JSON string from file.
    const fs = require('fs').promises;
    try {
      const jsonString = await fs.readFile(fileName, 'utf8')

      // Turn the JSON string into an array of objects
      const objectsArray = JSON.parse(jsonString);
      
      // Reset the LinkedList
      this.clearStudents();

      // Create students from objects in the objectsArray and add to LinkedList
      objectsArray.forEach((object) => {
        const student = new Student(object.name, object.year, object.email, object.specialization);
        this.addStudent(student);
      });
    }
    catch(error) {
      console.log(error);
    }
  }

}

module.exports = { LinkedList }
