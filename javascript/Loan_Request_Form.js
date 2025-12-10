// --- Constants and Global Variables ---

const loanForm = document.getElementById('loanForm');
const categoryButtons = document.querySelectorAll('.category-btn');
const durationRadios = document.querySelectorAll('input[name="loanDuration"]');
const customDurationInput = document.querySelector('.custom-duration-input');
const proofUploadInput = document.getElementById('proofUpload');
const amountNeededInput = document.getElementById('amountNeeded');

// --- Event Listeners and Functions ---

/**
 * 1. Category Button Toggling
 */
function handleCategoryClick(event) {
    const button = event.currentTarget;
    // Toggle the 'selected' class on click
    button.classList.toggle('selected');
}

categoryButtons.forEach(button => {
    button.addEventListener('click', handleCategoryClick);
});

/**
 * 2. Custom Duration Input Logic
 */
function handleDurationChange(event) {
    const selectedValue = event.target.value;
    if (selectedValue === 'Custom') {
        customDurationInput.disabled = false;
        customDurationInput.placeholder = 'Type duration'; // Change placeholder for clarity
        customDurationInput.focus();
    } else {
        customDurationInput.disabled = true;
        customDurationInput.value = '';
        customDurationInput.placeholder = 'Type';
    }
}

durationRadios.forEach(radio => {
    radio.addEventListener('change', handleDurationChange);
});

// Initial check to ensure correct state on page load (in case 'Custom' is pre-checked)
document.addEventListener('DOMContentLoaded', () => {
    const checkedDuration = document.querySelector('input[name="loanDuration"]:checked');
    if (checkedDuration && checkedDuration.value === 'Custom') {
        customDurationInput.disabled = false;
        customDurationInput.placeholder = 'Type duration';
    } else {
         customDurationInput.disabled = true;
    }
});

/**
 * 3. Form Submission Handling
 */
loanForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission

    // --- Collect Selected Data ---

    // 1. Get Selected Categories
    const selectedCategories = Array.from(document.querySelectorAll('.category-btn.selected'))
                                    .map(btn => btn.getAttribute('data-category'));

    // 2. Get Amount Needed
    const amountNeeded = amountNeededInput.value.trim();

    // Basic validation for amount
    if (!amountNeeded || isNaN(parseFloat(amountNeeded))) {
        alert('Please enter a valid amount needed.');
        return;
    }

    // 3. Get Loan Duration
    const selectedDurationRadio = document.querySelector('input[name="loanDuration"]:checked');
    let loanDuration = selectedDurationRadio ? selectedDurationRadio.value : '';

    if (loanDuration === 'Custom') {
        const customValue = customDurationInput.value.trim();
        if (customValue) {
            loanDuration = customValue;
        } else {
            alert('Please enter a value for the Custom duration.');
            return;
        }
    }

    // 4. Get Repayment Option(s)
    const repaymentOptions = Array.from(document.querySelectorAll('input[name="repaymentOption"]:checked'))
                                    .map(checkbox => checkbox.value);

    // 5. Get Reason for Loan
    const reasonForLoan = document.getElementById('reasonForLoan').value.trim();

    // 6. Get Proof Documents (File List)
    const proofFiles = proofUploadInput.files;

    // 7. Get Confirmation State
    const isConfirmed = document.getElementById('confirmation').checked;

    if (!isConfirmed) {
        alert('You must confirm the authenticity of the information provided.');
        return;
    }


    // --- Log/Process Data ---

    const formData = {
        categories: selectedCategories,
        amountNeeded: amountNeeded,
        loanDuration: loanDuration,
        repaymentOptions: repaymentOptions,
        reason: reasonForLoan,
        proofFileCount: proofFiles.length,
        proofFileNames: Array.from(proofFiles).map(file => file.name),
        confirmation: isConfirmed
    };

    console.log('--- Form Submission Data ---');
    console.log(formData);
    
    // In a real application, you would now send this data to a server using the Fetch API or XMLHttpRequest.
    // Example: fetch('/api/loan-request', { method: 'POST', body: JSON.stringify(formData) })
    
    alert('Loan Request Submitted! Check the console for collected data.');
    
    // Optional: Reset form after successful submission
    // loanForm.reset();
});

/**
 * 4. Amount Needed Input Formatting (Optional: to enforce number-only input)
 */
amountNeededInput.addEventListener('input', function(event) {
    // Replace anything that's not a digit or a dot with an empty string
    // Allows for decimal amounts
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
});

// --- Proof Upload Button Fix (optional: to show selection status) ---

proofUploadInput.addEventListener('change', function() {
    const uploadBtn = document.querySelector('.upload-btn');
    if (this.files.length > 0) {
        uploadBtn.textContent = `Uploaded ${this.files.length} file(s)`;
        uploadBtn.style.backgroundColor = '#50a19e';
        uploadBtn.style.color = '#012324';
        uploadBtn.style.borderColor = '#50a19e';
    } else {
        // Reset to original state
        uploadBtn.innerHTML = `<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="currentColor">
                            <path d="M7.29167 12.5V4.01042L4.58333 6.71875L3.125 5.20833L8.33333 0L13.5417 5.20833L12.0833 6.71875L9.375 4.01042V12.5H7.29167ZM2.08333 16.6667C1.51042 16.6667 1.02014 16.4628 0.6125 16.0552C0.204861 15.6476 0.000694444 15.1569 0 14.5833V11.4583H2.08333V14.5833H14.5833V11.4583H16.6667V14.5833C16.6667 15.1562 16.4628 15.6469 16.0552 16.0552C15.6476 16.4635 15.1569 16.6674 14.5833 16.6667H2.08333Z"/>
                        </svg> Upload`;
        uploadBtn.style.backgroundColor = '#ACC0C0';
        uploadBtn.style.color = '#308EB4';
        uploadBtn.style.borderColor = '#308EB4';
    }
});