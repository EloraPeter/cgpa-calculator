function calculateCGPA() {
  
  var numSemesters = Number(prompt("How many semesters do you want to calculate?")); 
  var totalGPA = 0; 

  // Loop through each semester
  for (var i = 1; i <= numSemesters; i++) {
    
    var numCourses = Number(prompt(`How many courses are in semester ${i}?`));
    var totalGradePoints = 0; 
    var totalCreditUnits = 0; 

    // Loop through each course in the semester
    for (var j = 1; j <= numCourses; j++) {
      // Ask for grade points and credit units for each course
      var gradePoint = Number(prompt(`Enter the grade points for course ${j}:`)); 
      var creditUnit = Number(prompt(`Enter the credit units for course ${j}:`)); 
      
      // Calculate total grade points and credit units
      totalGradePoints += gradePoint * creditUnit; 
      totalCreditUnits += creditUnit; 
    }

    // Calculate GPA for the each semester
    var gpa = totalGradePoints / totalCreditUnits; // GPA formula
    alert(`GPA for semester ${i}: ${gpa.toFixed(2)}`); // Show the GPA for each semester
    totalGPA += gpa; 
  }

  // Calculate overall CGPA
  var cgpa = totalGPA / numSemesters; 
  alert(`Your Cumulative GPA (CGPA) is: ${cgpa.toFixed(2)}`); // Shows the final CGPA and round it up to 2 decimal places
}


calculateCGPA();
