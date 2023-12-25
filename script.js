document.addEventListener("DOMContentLoaded", function () {
  // Datepicker for the Form Date
  $("#formDate").datepicker({
    format: "mm/dd/yyyy",
    autoclose: true,
  });

  // Get form elements
  const userJobType = document.getElementById("userJobType");
  const sportTypeGroup = document.getElementById("sportTypeGroup");
  const operatingSystems = document.querySelectorAll("input[type=checkbox]");
  const userCategory = document.querySelectorAll('input[name="userCategory"]');
  const comments = document.getElementById("comments");
  const formDate = document.getElementById("formDate");
  const userInfoForm = document.getElementById("userInfoForm");
  let savedFormData = null; // Variable to store form data

  // Sport Type visibility based on User Job Type
  userJobType.addEventListener("change", function () {
    sportTypeGroup.style.display = this.value === "Designer" ? "none" : "block";
  });

  // Reset event listener for the form
  userInfoForm.addEventListener("reset", function () {
    sportTypeGroup.style.display = "block"; // Make sure SportType is visible
  });

  // Autofill Form Date when Linux is checked
  operatingSystems.forEach((os) => {
    os.addEventListener("change", function () {
      if (document.getElementById("linux").checked) {
        const today = new Date();
        const formattedDate =
          today.getMonth() +
          1 +
          "/" +
          today.getDate() +
          "/" +
          today.getFullYear();
        formDate.value = formattedDate;
      }
    });
  });

  // Autofill Comments when User Category is East Coast
  userCategory.forEach((category) => {
    category.addEventListener("change", function () {
      if (this.value === "East Coast") {
        comments.value = "Hello World";
      }
    });
  });

  // Form submission
  userInfoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = {
      userName: document.getElementById("userName").value,
      userJobType: userJobType.value,
      userCategory: document.querySelector('input[name="userCategory"]:checked')
        .value,
      operatingSystem: Array.from(
        document.querySelectorAll("input[type=checkbox]:checked")
      ).map((el) => el.value),
      comments: comments.value,
      sportType: document.getElementById("sportType").value,
      formDate: formDate.value,
    };
    console.log(JSON.stringify(formData));
    savedFormData = formData; // Save form data for later use
  });

  // Reload form with saved data
  window.reloadForm = function () {
    if (savedFormData) {
      document.getElementById("userName").value = savedFormData.userName;
      document.getElementById("userJobType").value = savedFormData.userJobType;
      document.querySelector(
        `input[name="userCategory"][value="${savedFormData.userCategory}"]`
      ).checked = true;
      operatingSystems.forEach((os) => {
        os.checked = savedFormData.operatingSystem.includes(os.value);
      });
      document.getElementById("comments").value = savedFormData.comments;
      document.getElementById("sportType").value = savedFormData.sportType;
      document.getElementById("formDate").value = savedFormData.formDate;

      // Check if UserJobType is 'Designer' and update SportType visibility
      sportTypeGroup.style.display =
        savedFormData.userJobType === "Designer" ? "none" : "block";
    }
  };
});
