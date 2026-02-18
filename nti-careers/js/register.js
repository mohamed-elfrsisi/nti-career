// Register Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MULTI-STEP FORM NAVIGATION
    // ==========================================
    
    let currentStep = 1;
    const totalSteps = 3;
    const form = document.getElementById('registerForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    function updateStep(step) {
        // Hide all steps
        steps.forEach(s => s.classList.remove('active'));
        progressSteps.forEach((ps, index) => {
            ps.classList.remove('active', 'completed');
            if (index + 1 < step) {
                ps.classList.add('completed');
            } else if (index + 1 === step) {
                ps.classList.add('active');
            }
        });
        
        // Show current step
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        
        // Update buttons
        prevBtn.style.display = step === 1 ? 'none' : 'flex';
        nextBtn.style.display = step === totalSteps ? 'none' : 'flex';
        submitBtn.style.display = step === totalSteps ? 'flex' : 'none';
        
        currentStep = step;
    }
    
    function validateStep(step) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                field.style.borderColor = '#dc3545';
            } else {
                field.classList.remove('error');
                field.style.borderColor = '';
            }
        });
        
        // Email validation
        if (step === 1) {
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value)) {
                isValid = false;
                email.style.borderColor = '#dc3545';
            }
            
            // Password match
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                isValid = false;
                confirmPassword.style.borderColor = '#dc3545';
                alert('Passwords do not match!');
            }
        }
        
        return isValid;
    }
    
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            updateStep(currentStep + 1);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        updateStep(currentStep - 1);
    });
    
    // ==========================================
    // PASSWORD STRENGTH METER
    // ==========================================
    
    const passwordInput = document.getElementById('password');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let status = 'Weak';
            let color = '#dc3545';
            
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z\d]/)) strength++;
            
            switch(strength) {
                case 0:
                case 1:
                    status = 'Weak';
                    color = '#dc3545';
                    break;
                case 2:
                    status = 'Fair';
                    color = '#ffc107';
                    break;
                case 3:
                    status = 'Good';
                    color = '#17a2b8';
                    break;
                case 4:
                    status = 'Strong';
                    color = '#28a745';
                    break;
            }
            
            strengthFill.style.width = `${(strength / 4) * 100}%`;
            strengthFill.style.background = color;
            strengthText.textContent = `Password strength: ${status}`;
            strengthText.style.color = color;
        });
    }
    
    // ==========================================
    // TOGGLE PASSWORD VISIBILITY
    // ==========================================
    
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const input = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // ==========================================
    // CERTIFICATES UPLOAD TOGGLE
    // ==========================================
    
    const hasCertificate = document.getElementById('hasCertificate');
    const certificatesArea = document.getElementById('certificatesArea');
    
    if (hasCertificate) {
        hasCertificate.addEventListener('change', function() {
            certificatesArea.style.display = this.checked ? 'block' : 'none';
            if (this.checked) {
                certificatesArea.classList.add('animate-fadeIn');
            }
        });
    }
    
    // ==========================================
    // FORM SUBMISSION
    // ==========================================
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        // Check terms
        const terms = document.getElementById('terms');
        if (terms && !terms.checked) {
            alert('Please agree to the Terms of Service');
            return;
        }
        
        // Loading state
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Show success
        form.style.display = 'none';
        document.querySelector('.form-header').style.display = 'none';
        document.querySelector('.progress-steps').style.display = 'none';
        document.getElementById('successMessage').classList.add('show');
        
        // Confetti effect (simple CSS animation)
        createConfetti();
    });
    
    function createConfetti() {
        const colors = ['#00AEEF', '#003366', '#28a745', '#ffc107'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
                z-index: 9999;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        .animate-fadeIn {
            animation: fadeIn 0.4s ease;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // REAL-TIME VALIDATION
    // ==========================================
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
    
    // ==========================================
    // FILE UPLOAD DRAG & DROP
    // ==========================================
    
    const uploadBox = document.querySelector('.upload-box');
    if (uploadBox) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadBox.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadBox.addEventListener(eventName, () => {
                uploadBox.style.borderColor = '#00AEEF';
                uploadBox.style.background = 'rgba(0,174,239,0.05)';
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadBox.addEventListener(eventName, () => {
                uploadBox.style.borderColor = '#e9ecef';
                uploadBox.style.background = '';
            });
        });
        
        uploadBox.addEventListener('drop', handleDrop);
        uploadBox.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.jpg,.jpeg,.png';
            input.multiple = true;
            input.click();
        });
    }
    
    function handleDrop(e) {
        const files = e.dataTransfer.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        if (files.length > 0) {
            uploadBox.innerHTML = `
                <i class="fa-solid fa-file-circle-check" style="color: #28a745; font-size: 3rem;"></i>
                <p style="color: #28a745; font-weight: 600;">${files.length} file(s) selected</p>
                <small>Click to change files</small>
            `;
        }
    }
});