class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    calculateGPA() {
        let totalPoints = 0;
        let totalSubjects = 0;

        let current = this.head;
        while (current) {
            const marks = current.data.marks;
            totalSubjects++;
            let gradePoint = this.getGradePoint(marks);
            totalPoints += gradePoint;
            current = current.next;
        }

        return totalSubjects ? (totalPoints / totalSubjects).toFixed(2) : 0;
    }

    getGradePoint(marks) {
        if (marks >= 90) return 10.0; // O
        if (marks >= 80) return 9.0;  // A
        if (marks >= 75) return 8.5;  // A-
        if (marks >= 70) return 8.0;  // B+
        if (marks >= 65) return 7.0;  // B
        if (marks >= 60) return 6.5;  // B-
        if (marks >= 55) return 6.0;  // C+
        if (marks >= 50) return 5.0;  // C
        if (marks >= 45) return 4.5;  // C-
        if (marks >= 40) return 4.0;  // D
        return 0;                      // F
    }
}

// HTML elements
const studentNameInput = document.getElementById('studentName');
const subjectMarkInput = document.getElementById('subjectMark');
const addMarkButton = document.getElementById('addMarkButton');
const calculateButton = document.getElementById('calculateButton');
const resultDiv = document.getElementById('result');
const nameOutput = document.getElementById('nameOutput');
const gradesOutput = document.getElementById('gradesOutput');
const gpaOutput = document.getElementById('gpaOutput');
const marksCountOutput = document.getElementById('countOutput');
const marksCountDiv = document.getElementById('marksCount');

// Data management
const studentsList = new SinglyLinkedList();
let studentName = '';
let marks = [];

// Event listeners
addMarkButton.addEventListener('click', () => {
    const mark = parseInt(subjectMarkInput.value);

    // Ensure the student name is entered before adding marks
    if (!studentName) {
        studentName = studentNameInput.value.trim();
        if (!studentName) {
            alert("Please enter the student's name.");
            return;
        }
    }

    if (isNaN(mark) || mark < 0 || mark > 100) {
        alert("Please enter a valid mark between 0 and 100.");
        return;
    }

    // Add the mark to the list and array
    marks.push(mark);
    studentsList.add({ name: studentName, marks: mark });
    subjectMarkInput.value = ''; // Clear input for the next mark

    // Update marks count
    marksCountOutput.textContent = marks.length;
    marksCountDiv.style.display = 'block'; // Show the marks count div

    // Enable Calculate button if marks are added
    if (marks.length > 0) {
        calculateButton.style.display = 'inline'; // Show the calculate button
    }

    console.log(`Marks Entered: ${marks}`);
});

calculateButton.addEventListener('click', () => {
    nameOutput.textContent = studentName;

    let results = "";
    marks.forEach((mark, index) => {
        const gradePoint = studentsList.getGradePoint(mark);
        const grade = getGrade(mark);
        results += `Subject ${index + 1}: ${mark} - Grade Point: ${gradePoint} (${grade})<br>`;
    });

    gradesOutput.innerHTML = results;

    const gpa = studentsList.calculateGPA();
    gpaOutput.textContent = `GPA: ${gpa}`;

    resultDiv.style.display = 'block';
});

// Function to determine the letter grade based on marks
function getGrade(marks) {
    if (marks >= 90) return 'O'; // Outstanding
    if (marks >= 80) return 'A'; // Excellent
    if (marks >= 75) return 'A-'; // Very Good
    if (marks >= 70) return 'B+'; // Good
    if (marks >= 65) return 'B'; // Average
    if (marks >= 60) return 'B-'; // Below Average
    if (marks >= 55) return 'C+'; // Satisfactory
    if (marks >= 50) return 'C'; // Pass
    if (marks >= 45) return 'C-'; // Marginal Pass
    if (marks >= 40) return 'D'; // Fail
    return 'F'; // Fail
}
