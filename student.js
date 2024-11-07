// Node class for the singly linked list
class Node {
    constructor(name) {
        this.name = name;  // Student's name
        this.marks = null;  // Marks will be set later
        this.next = null;  // Link to the next student node
    }
}

// LinkedList class to manage student records
class LinkedList {
    constructor() {
        this.head = null;  // Head of the list (first student)
    }

    // Method to add a student record (teacher enters only the name)
    addStudent(name) {
        const newNode = new Node(name);

        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Method to find a student by name
    getStudentByName(name) {
        let current = this.head;
        while (current !== null) {
            if (current.name.toLowerCase() === name.toLowerCase()) {
                return current;  // Student found
            }
            current = current.next;
        }
        return null;  // Student not found
    }

    // Method to set marks for a student (marks are entered separately)
    setMarks(name, marks) {
        const student = this.getStudentByName(name);
        if (student) {
            student.marks = marks;  // Set marks for the student
            console.log(`Marks for ${student.name} set to: ${marks}`);
        } else {
            console.log("Student not found. Please check the name and try again.");
        }
    }

    // Method to display marks of a student
    displayMarks(studentName) {
        const student = this.getStudentByName(studentName);
        if (student) {
            if (student.marks !== null) {
                console.log(`${student.name}'s Marks: ${student.marks}`);
            } else {
                console.log(`${student.name} does not have marks assigned yet.`);
            }
        } else {
            console.log("Student not found. Please check the name and try again.");
        }
    }
}

// Create a linked list to store student records
const studentRecords = new LinkedList();

// Variable to store student name globally (for viewing marks later)
let currentStudentName = "";

// Function to simulate the teacher inputting student data (name only)
function addStudentData() {
    const name = prompt("Enter the student's name: ");  // Teacher enters student name
    studentRecords.addStudent(name);  // Add the student record to the linked list
    console.log(`Student data added for ${name}`);
}

// Function to allow teachers to set marks for a student
function setMarksForStudent() {
    const studentName = prompt("Enter the student's name to assign marks:");  // Teacher enters student name
    const marks = parseFloat(prompt(`Enter marks for ${studentName}:`));  // Teacher enters marks for the student
    studentRecords.setMarks(studentName, marks);  // Set marks for the student
}

// Function to allow students to view their marks
function viewMarks() {
    if (currentStudentName === "") {
        currentStudentName = prompt("Enter your name to view marks:");  // Student enters their name only once
    }

    studentRecords.displayMarks(currentStudentName);  // Display the marks for the student
}

// Example usage:

// Teacher adds student data dynamically (Name only)
addStudentData();  // Teacher adds data for a student
addStudentData();  // Teacher adds data for another student

// Teacher sets marks for a student
setMarksForStudent();  // Teacher assigns marks to a student

// Allow the student to view their marks
viewMarks();
