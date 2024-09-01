// Typing Animation for Profession Text
const typingText = document.querySelector('.typing-text');
const profession = ['Web Developer', 'Designer', 'Freelancer', 'Photographer'];
let professionIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < profession[professionIndex].length) {
        typingText.textContent += profession[professionIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 150);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = profession[professionIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        professionIndex = (professionIndex + 1) % profession.length;
        setTimeout(type, 500);
    }
}

// Start the typing effect on window load
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});
document.addEventListener('DOMContentLoaded', function () {
    // Select the skills section and all skill progress bars
    const skillSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create an Intersection Observer to watch when the skills section enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the section is in view
            if (entry.isIntersecting) {
                // Loop through each skill bar and set its width based on the data-progress attribute
                skillBars.forEach(skillBar => {
                    const progress = skillBar.getAttribute('data-progress');
                    skillBar.style.width = progress;
                });
                // Stop observing after the animation is done
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the skills section is visible
    
    // Start observing the skills section
    observer.observe(skillSection);
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, message })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('contact-form').reset();
    })
    .catch(error => console.error('Error:', error));
});


