class Node {
    constructor(student) {
        this.student = student;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(student) {
        const newNode = new Node(student);
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

    findStudent(name) {
        let current = this.head;
        while (current) {
            if (current.student.name.toLowerCase() === name.toLowerCase()) {
                return current.student;
            }
            current = current.next;
        }
        return null;
    }
}

// Creating the linked list and populating it
const studentList = new LinkedList();
