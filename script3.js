// Singly linked list node class
class Node {
        constructor(email, password) {
            this.email = email;
            this.password = password;
            this.next = null;
        }
    }
    
    // Singly linked list class for teacher credentials
    class LinkedList {
        constructor() {
            this.head = null;
        }
    
        // Method to add a new teacher's credentials
        addTeacher(email, password) {
            const newNode = new Node(email, password);
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
    
        // Method to validate email and password
        validate(email, password) {
            let current = this.head;
            while (current) {
                if (current.email === email && current.password === password) {
                    return true;
                }
                current = current.next;
            }
            return false;
        }
    }
    
    // Initialize the linked list and add a teacher's credentials
    const teacherList = new LinkedList();
    teacherList.addTeacher("aswigap.23it@kongu.edu", "123");
    
    // Get the modal
    var modal = document.getElementById("loginModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("startCalculatingBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // Handle form submission for teacher login
    document.getElementById('teacherLoginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission to handle with JS
    
        // Get values from the form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        // Check if the email and password match any in the linked list
        if (teacherList.validate(email, password)) {
            // Close the modal
            modal.style.display = "none";
    
            // Redirect to teacher page
            window.location.href = "teacher.html"; // Replace with the actual page you want to redirect to
        } else {
            // Display an error message
            alert("Invalid email or password. Please try again.");
        }
    });
    