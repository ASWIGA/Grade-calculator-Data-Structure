// Node structure for each student
class StudentNode {
    constructor(name) {
        this.name = name;
        this.subjects = []; // Store subjects and marks
        this.totalMarks = 0;
        this.gpa = 0;
        this.grade = '';
        this.next = null;
    }
}

// Singly Linked List to manage students
class StudentLinkedList {
    constructor() {
        this.head = null;
    }

    // Add student
    addStudent(name) {
        const newStudent = new StudentNode(name);
        if (!this.head) {
            this.head = newStudent;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newStudent;
        }
        return newStudent;
    }

    // Find student by name
    findStudent(name) {
        let current = this.head;
        while (current) {
            if (current.name.toLowerCase() === name.toLowerCase()) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}

const studentList = new StudentLinkedList();
let currentStudent = null;

// Teacher section - Add subjects and marks
document.getElementById('addSubjectButton').addEventListener('click', () => {
    const studentName = document.getElementById('teacherStudentName').value.trim();
    const subjectName = document.getElementById('subjectName').value.trim();
    const subjectMark = parseInt(document.getElementById('subjectMark').value);

    if (!studentName || !subjectName || isNaN(subjectMark)) {
        alert("Please fill out all fields.");
        return;
    }

    // Check if we're working on a new student
    if (!currentStudent || currentStudent.name.toLowerCase() !== studentName.toLowerCase()) {
        currentStudent = studentList.findStudent(studentName);
        if (!currentStudent) {
            currentStudent = studentList.addStudent(studentName);
        }
    }

    // Add subject and mark
    currentStudent.subjects.push({ name: subjectName, mark: subjectMark });
    document.getElementById('subjectName').value = '';
    document.getElementById('subjectMark').value = '';
});

// Save student details and calculate GPA
document.getElementById('saveStudentButton').addEventListener('click', () => {
    if (currentStudent) {
        let totalMarks = 0;
        currentStudent.subjects.forEach(subject => totalMarks += subject.mark);

        currentStudent.totalMarks = totalMarks;
        currentStudent.gpa = (totalMarks / currentStudent.subjects.length) / 10;
        currentStudent.grade = currentStudent.gpa < 4.5 ? 'Fail' : 'Pass';
        
        alert("Student data saved successfully.");
        currentStudent = null;
    } else {
        alert("No student to save.");
    }
});

// Student section - View marks by name
document.getElementById('viewMarksButton').addEventListener('click', () => {
    const studentName = document.getElementById('studentName').value.trim();
    const student = studentList.findStudent(studentName);

    const resultContainer = document.getElementById('resultContainer');
    const marksList = document.getElementById('marksList');
    const gpaDisplay = document.getElementById('gpaDisplay');
    const gradeDisplay = document.getElementById('gradeDisplay');
    const studentNameDisplay = document.getElementById('studentNameDisplay');

    if (student) {
        marksList.innerHTML = '';
        studentNameDisplay.textContent = student.name;

        student.subjects.forEach(subject => {
            const listItem = document.createElement('li');
            listItem.textContent = `${subject.name}: ${subject.mark}`;
            marksList.appendChild(listItem);
        });

        gpaDisplay.textContent = `GPA: ${student.gpa.toFixed(2)}`;
        gradeDisplay.textContent = `Grade: ${student.grade}`;
        resultContainer.style.display = 'block';
    } else {
        alert("Student not found.");
        resultContainer.style.display = 'none';
    }
});
