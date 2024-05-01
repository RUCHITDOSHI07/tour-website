// Function to send verification code to mobile number
function sendVerificationCode() {
    const mobileNumber = document.getElementById('mobileNumber').value;
    $.ajax({
        url: '/sendVerificationCode',
        method: 'POST',
        data: { mobileNumber: mobileNumber },
        success: function(response) {
            if (response.success) {
                alert('Verification code sent to your mobile number!');
            } else {
                alert('Failed to send verification code. Please try again later.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

// Function to verify Gmail and mobile number
function verifyDetails() {
    const gmail = document.getElementById('gmail').value;
    const verificationCode = document.getElementById('verificationCode').value;
    $.ajax({
        url: '/verifyDetails',
        method: 'POST',
        data: { gmail: gmail, verificationCode: verificationCode },
        success: function(response) {
            if (response.success) {
                alert('Details verified successfully!');
                // Redirect to profile page or perform other actions
            } else {
                alert('Failed to verify details. Please check your verification code.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}
