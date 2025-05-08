document.addEventListener('DOMContentLoaded', function() {
    // Handle logout
    const logoutLink = document.querySelector('.logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('You have been logged out.');
            window.location.href = 'login.html'; // Change to your actual login page URL
        });
    }

    // Handle back navigation
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.history.back();
        });
    }

    // Form submission for majorForm
    const majorForm = document.getElementById('majorForm');
    if (majorForm) {
        majorForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.querySelector('input[type="text"]').value.trim();
            const email = document.querySelector('input[type="email"]').value.trim();

            if (fullName === '' || email === '') {
                alert('Please fill in all fields.');
                return;
            }

            sessionStorage.setItem('fullName', fullName);
            sessionStorage.setItem('email', email);
            window.location.href = '2assesment details.html';     
        });
    }

    // Auto-fill fields from URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const fullName = getUrlParameter('fullname');
    const email = getUrlParameter('email');
    const password = getUrlParameter('password');

    if (document.getElementById('fullName')) {
        document.getElementById('fullName').value = sessionStorage.getItem('fullName') || fullName || '';
    }
    if (document.getElementById('email')) {
        document.getElementById('email').value = sessionStorage.getItem('email') || email || '';
    }
    if (document.getElementById('password')) {
        document.getElementById('password').value = password || '';
    }

    // Populate country dropdown
    const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", /* ... other countries ... */ "Zimbabwe"];
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Populate graduation year dropdown
    const gradYearSelect = document.getElementById('gradYear');
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 20;
    for (let year = currentYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        gradYearSelect.appendChild(option);
    }

    // Populate previous school graduation year dropdown
    const previousSchoolGradYearSelect = document.getElementById('previousSchoolGradYear');
    for (let year = currentYear - 20; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        previousSchoolGradYearSelect.appendChild(option);
    }

    // Form submission for assessmentForm
    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value.trim();
            const dob = document.getElementById('dob').value;
            const citizenshipStatus = document.getElementById('citizenshipStatus').value;
            const password = document.getElementById('password').value;
            const validationMessage = document.getElementById('validationMessage');
            validationMessage.textContent = '';

            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /[0-9]/.test(password);
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            if (password.length < minLength) {
                validationMessage.textContent = 'Password must be at least 8 characters long.';
                return;
            } else if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
                validationMessage.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
                return;
            }

            if (fullName === '' || dob === '' || citizenshipStatus === '') {
                alert('Please fill in all required fields.');
                return;
            }

            window.location.href = '3Olevel Grades.html'; // Change to your actual next page URL
        });
    }

    // Function to add subjects dynamically
    function addSubject() {
        const subjectList = document.getElementById('subjectList');
        const newSubjectDiv = document.createElement('div');
        newSubjectDiv.classList.add('course');

        const subjectInput = document.createElement('input');
        subjectInput.type = 'text';
        subjectInput.placeholder = 'Enter Subject Name';
        subjectInput.classList.add('subject-input');

        const gradeOptions = document.createElement('div');
        gradeOptions.classList.add('grade-options');

        const grades = ['A', 'B', 'C', 'D', 'E', 'U'];
        grades.forEach(grade => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = grade;
            button.onclick = function() {
                Array.from(gradeOptions.children).forEach(btn => {
                    btn.style.backgroundColor = '#007bff';
                });
                button.style.backgroundColor = '#0056b3';
            };
            gradeOptions.appendChild(button);
        });

        newSubjectDiv.appendChild(subjectInput);
        newSubjectDiv.appendChild(gradeOptions);
        subjectList.appendChild(newSubjectDiv);
    }
    

    // Next page navigation for subjects
    const nextPageButton = document.getElementById('nextPage');
    if (nextPageButton) {
        nextPageButton.addEventListener('click', function() {
            const subjects = document.querySelectorAll('.subject-input');
            const allFilled = Array.from(subjects).every(input => input.value.trim() !== '');

            if (!allFilled) {
                const validationMessage = document.getElementById('validationMessage');
                validationMessage.textContent = 'Please fill in all subject fields before proceeding.';
                validationMessage.style.color = 'red';
            } else {
                window.location.href = '4Alevel Grades.html'; // Replace with your actual next page URL
            }
        });
    }
});