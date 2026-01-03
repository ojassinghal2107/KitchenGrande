document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enquiryForm');
    const messageDiv = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', function(event) {
            // CRITICAL STEP 1: Stop the default HTML form submission/redirect
            event.preventDefault(); 
            
            // Clear previous messages
            messageDiv.innerHTML = '';
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

            // CRITICAL STEP 2: Gather form data
            const formData = new FormData(form);
            const enquiryData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email')
            };

            // CRITICAL STEP 3: Send data using the fetch API
            fetch('/sendEnquiry', {
                method: 'POST',
                // Tell the server we are sending JSON data
                headers: {
                    'Content-Type': 'application/json' 
                },
                // Convert JavaScript object to JSON string
                body: JSON.stringify(enquiryData) 
            })
            .then(response => {
                if (response.ok) {
                    // Success (Status 200)
                    messageDiv.innerHTML = '<div class="alert alert-success">Thank you! Your consultation request has been received.</div>';
                    form.reset(); // Clear the form fields
                } else {
                    // Failure (Status 4xx or 5xx)
                    throw new Error('Server error: Failed to submit form.');
                }
            })
            .catch(error => {
                console.error('Submission Error:', error);
                messageDiv.innerHTML = '<div class="alert alert-danger">An error occurred. Please try calling us instead.</div>';
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Submit Enquiry';
            });
        });
    }
});