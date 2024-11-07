// Node class for the singly linked list
class Node {
    constructor(name, subjects) {
        this.name = name;
        this.subjects = subjects;
        this.next = null;
    }
}

// LinkedList class to manage student records
class LinkedList {
    constructor() {
        this.head = null;
    }

    // Method to add a student record
    addStudent(name, subjects) {
        const newNode = new Node(name, subjects);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        console.log("Student record saved:", name);
    }

    // Method to display all student records (for debugging)
    displayRecords() {
        let current = this.head;
        while (current !== null) {
            console.log("Student Name:", current.name);
            console.log("Subjects:", current.subjects);
            current = current.next;
        }
    }
}

// Initialize the linked list
let studentRecords = new LinkedList();

document.getElementById('calculateButton').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    const subjects = [
        { name: document.getElementById('subject1Name').value, marks: parseFloat(document.getElementById('subject1Marks').value) || 0 },
        { name: document.getElementById('subject2Name').value, marks: parseFloat(document.getElementById('subject2Marks').value) || 0 },
        { name: document.getElementById('subject3Name').value, marks: parseFloat(document.getElementById('subject3Marks').value) || 0 },
        { name: document.getElementById('subject4Name').value, marks: parseFloat(document.getElementById('subject4Marks').value) || 0 },
        { name: document.getElementById('subject5Name').value, marks: parseFloat(document.getElementById('subject5Marks').value) || 0 },
        { name: document.getElementById('subject6Name').value, marks: parseFloat(document.getElementById('subject6Marks').value) || 0 }
    ];

    // Validate marks are within the range 0-100
    for (const subject of subjects) {
        if (subject.marks < 0 || subject.marks > 100) {
            alert(`Marks for ${subject.name} should be between 0 and 100.`);
            return; // Exit if any mark is invalid
        }
    }

    const totalMarks = subjects.reduce((acc, subject) => acc + subject.marks, 0);
    const gpa = (totalMarks / 600) * 10; // Assuming each subject is out of 100
    let grade = 'Fail';

    const hasFailed = subjects.some(subject => subject.marks < 45);
    if (!hasFailed) {
        grade = 'Pass';
    }

    // Display results
    document.getElementById('resultStudentName').textContent = studentName;
    document.getElementById('marksList').innerHTML = subjects.map(subject => `<li>${subject.name}: ${subject.marks}</li>`).join('');
    document.getElementById('totalMarks').textContent = totalMarks;

    if (grade === 'Pass') {
        document.getElementById('gpa').textContent = gpa.toFixed(2);
    } else {
        document.getElementById('gpa').textContent = 'N/A'; // GPA not applicable for fails
    }
    document.getElementById('grade').textContent = grade;
    document.getElementById('resultContainer').style.display = 'block';

    // Show save button
    document.getElementById('saveButton').style.display = 'block';
});

// Save button functionality
document.getElementById('saveButton').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    const subjects = [
        { name: document.getElementById('subject1Name').value, marks: parseFloat(document.getElementById('subject1Marks').value) || 0 },
        { name: document.getElementById('subject2Name').value, marks: parseFloat(document.getElementById('subject2Marks').value) || 0 },
        { name: document.getElementById('subject3Name').value, marks: parseFloat(document.getElementById('subject3Marks').value) || 0 },
        { name: document.getElementById('subject4Name').value, marks: parseFloat(document.getElementById('subject4Marks').value) || 0 },
        { name: document.getElementById('subject5Name').value, marks: parseFloat(document.getElementById('subject5Marks').value) || 0 },
        { name: document.getElementById('subject6Name').value, marks: parseFloat(document.getElementById('subject6Marks').value) || 0 }
    ];

    // Save student record as a node in the linked list
    studentRecords.addStudent(studentName, subjects);

    // Reset form for new entry
    document.getElementById('studentName').value = '';
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`subject${i}Name`).value = '';
        document.getElementById(`subject${i}Marks`).value = '';
    }

    // Hide results and save button
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('saveButton').style.display = 'none';

    // Display all records in the console for verification
    studentRecords.displayRecords();
});
