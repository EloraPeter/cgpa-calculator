let currentSemester = 1;
let totalSemesters = 0;
let semesterGPAs = [];
let allCourses = [];

const motivationalQuotes = [
    "Omo, you dey try! Keep pushing that CGPA! 🚀",
    "First Class dey call your name! No dulling! 💪",
    "Na you go collect that degree with swag! 🌟",
    "Chop knuckle, your grades dey fire! 😎",
    "Odogwu, you go make am! Keep grinding! 🎓",
    "Baba, you too much! Aim for that First Class! 🏆"
];

function showStep2() {
    const semestersInput = document.getElementById('semesters');
    totalSemesters = parseInt(semestersInput.value);
    if (totalSemesters < 1 || totalSemesters > 12 || isNaN(totalSemesters)) {
        semestersInput.classList.add('border-red-500');
        showError(semestersInput, 'Oya, enter 1-12 semesters abeg.');
        return;
    }
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    document.getElementById('semesterTitle').textContent = `Semester ${currentSemester} 📚`;
    updateProgress(25);
}

function generateCourseInputs() {
    const coursesInput = document.getElementById('courses');
    const numCourses = parseInt(coursesInput.value);
    if (numCourses < 1 || numCourses > 10 || isNaN(numCourses)) {
        coursesInput.classList.add('border-red-500');
        showError(coursesInput, 'Enter 1-10 courses, no wahala.');
        return;
    }

    let courseInputs = '';
    for (let i = 1; i <= numCourses; i++) {
        courseInputs += `
            <div class="mb-4">
                <label class="block text-green-700 mb-2 font-medium">Course ${i} 📖</label>
                <input type="text" class="courseCode w-full p-3 border rounded-lg mb-2" placeholder="Course Code (e.g., MTH101)" maxlength="10">
                <input type="number" class="credits w-full p-3 border rounded-lg mb-2" placeholder="Credits (e.g., 3)" min="1" max="10" required>
                <select class="grade w-full p-3 border rounded-lg" required>
                    <option value="" disabled selected>Select Grade</option>
                    <option value="5.0">A (5.0) 🎉</option>
                    <option value="4.0">B (4.0)</option>
                    <option value="3.0">C (3.0)</option>
                    <option value="2.0">D (2.0)</option>
                    <option value="1.0">E (1.0)</option>
                    <option value="0.0">F (0.0)</option>
                </select>
            </div>
        `;
    }
    document.getElementById('courseInputs').innerHTML = courseInputs;
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
    updateProgress(50);
}

function calculateGPA() {
    const courseCodes = document.getElementsByClassName('courseCode');
    const credits = document.getElementsByClassName('credits');
    const grades = document.getElementsByClassName('grade');
    let totalCredits = 0;
    let totalPoints = 0;
    let semesterCourses = [];

    for (let i = 0; i < credits.length; i++) {
        const courseCode = courseCodes[i].value || `Course ${i + 1}`;
        const credit = parseFloat(credits[i].value);
        const grade = parseFloat(grades[i].value);
        if (isNaN(credit) || credit < 1 || credit > 10 || isNaN(grade)) {
            credits[i].classList.add('border-red-500');
            showError(credits[i], 'Enter valid credits (1-10) abeg.');
            return;
        }
        totalCredits += credit;
        totalPoints += credit * grade;
        semesterCourses.push({ code: courseCode, credits: credit, grade: grade });
    }

    const gpa = (totalPoints / totalCredits).toFixed(2);
    semesterGPAs.push(parseFloat(gpa));
    allCourses.push({ semester: currentSemester, courses: semesterCourses });
    const cgpa = (semesterGPAs.reduce((a, b) => a + b, 0) / semesterGPAs.length).toFixed(2);
    const degreeClass = getDegreeClassification(cgpa);

    document.getElementById('gpaResult').textContent = `Semester ${currentSemester} GPA: ${gpa} 🌟`;
    document.getElementById('cgpaResult').textContent = `Cumulative CGPA: ${cgpa} 🎉`;
    document.getElementById('degreeClass').textContent = `Degree Class: ${degreeClass} 🏆`;
    document.getElementById('motivationalQuote').textContent = cgpa >= 4.50 ? 
        "Omo, First Class material! You be OG! 🥇" : 
        motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    updateProgress(100);
    triggerConfetti();
    playCelebrationSound();
}

function getDegreeClassification(cgpa) {
    cgpa = parseFloat(cgpa);
    if (cgpa >= 4.50) return "First Class";
    if (cgpa >= 3.50) return "Second Class Upper (2:1)";
    if (cgpa >= 2.40) return "Second Class Lower (2:2)";
    if (cgpa >= 1.50) return "Third Class";
    if (cgpa >= 1.00) return "Pass";
    return "Fail";
}

function nextSemester() {
    if (currentSemester < totalSemesters) {
        currentSemester++;
        document.getElementById('result').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        document.getElementById('semesterTitle').textContent = `Semester ${currentSemester} 📚`;
        document.getElementById('courses').value = '';
        updateProgress(25);
    } else {
        document.getElementById('result').classList.remove('hidden');
        updateProgress(100);
    }
}

function prevSemester() {
    if (currentSemester > 1) {
        currentSemester--;
        semesterGPAs.pop();
        allCourses.pop();
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        document.getElementById('semesterTitle').textContent = `Semester ${currentSemester} 📚`;
        updateProgress(25);
    }
}

function restart() {
    currentSemester = 1;
    totalSemesters = 0;
    semesterGPAs = [];
    allCourses = [];
    document.getElementById('semesters').value = '';
    document.getElementById('courses').value = '';
    document.getElementById('courseInputs').innerHTML = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('progressBar').style.width = '0%';
    updateProgress(0);
}

function saveData() {
    const data = { totalSemesters, currentSemester, semesterGPAs, allCourses };
    localStorage.setItem('naijaCGPA', JSON.stringify(data));
    showError(document.getElementById('result'), 'Data saved successfully! You fit load am later.');
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('naijaCGPA'));
    if (data) {
        totalSemesters = data.totalSemesters;
        currentSemester = data.currentSemester;
        semesterGPAs = data.semesterGPAs;
        allCourses = data.allCourses;
        document.getElementById('semesters').value = totalSemesters;
        showStep2();
        showError(document.getElementById('step1'), 'Data loaded! Continue your hustle!');
    } else {
        showError(document.getElementById('step1'), 'No saved data found, abeg.');
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Naija CGPA Calculator Results', 20, 20);
    doc.setFontSize(12);
    doc.text(`Cumulative CGPA: ${document.getElementById('cgpaResult').textContent.split(': ')[1]}`, 20, 30);
    doc.text(`Degree Class: ${document.getElementById('degreeClass').textContent.split(': ')[1]}`, 20, 40);
    let y = 50;
    allCourses.forEach(sem => {
        doc.text(`Semester ${sem.semester}`, 20, y);
        y += 10;
        sem.courses.forEach(course => {
            doc.text(`${course.code}: ${course.credits} credits, Grade ${course.grade}`, 30, y);
            y += 10;
        });
    });
    doc.save('Naija_CGPA_Result.pdf');
    showError(document.getElementById('result'), 'PDF downloaded! Check your files, fam!');
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
    element.classList.remove('border-red-500');
}

function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#008000', '#ffffff', '#008000']
    });
}

function playCelebrationSound() {
    const audio = document.getElementById('celebrationSound');
    audio.play().catch(() => console.log('Audio play failed, likely due to browser restrictions.'));
}

function updateProgress(percentage) {
    document.getElementById('progressBar').style.width = `${percentage}%`;
}