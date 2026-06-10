function openInquiryModal() {
            document.getElementById('inquiryModal').classList.add('show');
        }

        function closeInquiryModal() {
            document.getElementById('inquiryModal').classList.remove('show');
        }

        function handleInquiryForm(event) {
            event.preventDefault();
            setTimeout(() => {
                closeInquiryModal();
                document.getElementById('inquiryModal').querySelector('form').reset();
            }, 500);
        }
