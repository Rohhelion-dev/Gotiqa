function openInquiryModal() {
            document.getElementById('inquiryModal').classList.add('show');
        }

        function closeInquiryModal() {
            document.getElementById('inquiryModal').classList.remove('show');
        }

        function handleContactForm(event) {
            event.preventDefault();
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = 'âœ“ Your message has been sent successfully!';
            successMsg.classList.add('show');

            setTimeout(() => {
                successMsg.classList.remove('show');
                document.querySelector('.contact-form form').reset();
            }, 3000);
        }

        function handleInquiryForm(event) {
            event.preventDefault();
            setTimeout(() => {
                closeInquiryModal();
                document.getElementById('inquiryModal').querySelector('form').reset();
            }, 500);
        }
