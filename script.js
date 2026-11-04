document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        full_name: document.getElementById('full_name').value,
        dob: document.getElementById('dob').value,
        mobile: document.getElementById('mobile').value,
        city: document.getElementById('city').value,
        father_name: document.getElementById('father_name').value,
        mother_name: document.getElementById('mother_name').value,
        gender: document.querySelector('input[name="gender"]:checked').value
    };

    const messageElement = document.getElementById('responseMessage');
    messageElement.style.color = '#555';
    messageElement.textContent = 'Submitting...';

    // REPLACE THE URL BELOW with your actual live Render backend URL ending with /api/register
    const BACKEND_URL = 'https://registration-form-76nd.onrender.com/api/register';

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            messageElement.style.color = 'green';
            messageElement.textContent = 'Registration successful!';
            document.getElementById('registrationForm').reset();
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = result.message || 'Registration failed.';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.style.color = 'red';
        messageElement.textContent = 'Server connection error.';
    }
});