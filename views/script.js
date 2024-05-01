function addBranch() {
    const branchFields = document.getElementById('branchFields');
    const newBranchField = document.createElement('div');
    newBranchField.classList.add('form-group');
    newBranchField.innerHTML = `
        <label>Branch Address</label>
        <input type="text" placeholder="Branch Address">
    `;
    branchFields.appendChild(newBranchField);
}

function sendVerificationSMS() {
    const mobileNumber = document.getElementById('mobileNumber').value;
    $.ajax({
        url: '/sendVerificationSMS',
        method: 'POST',
        data: { mobileNumber: mobileNumber },
        success: function(response) {
            if (response.success) {
                alert('Verification SMS sent!');
            } else {
                alert('Failed to send verification SMS. Please try again later.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

