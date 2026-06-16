/**
 * Gotiqa Farm Management Platform - Contact & Inquiry Controllers
 * Branch: kech0
 */

document.addEventListener("DOMContentLoaded", () => {

    initWhatsAppWidget();
});

// 1. Modal Visibility Controllers
function openInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) modal.classList.add('show');
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) modal.classList.remove('show');
}

// 2. Background Form Processors (AJAX)

/**
 * Handles silent background email submission to FormSubmit.co
 * @param {HTMLFormElement} formElement 
 * @returns {Promise<boolean>} True if submission succeeded
 */
async function sendEmailBackground(formElement) {
    const actionUrl = formElement.getAttribute('action');
    const formData = new FormData(formElement);

    try {
        const response = await fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.error("FormSubmit Connection Error:", error);
        return false;
    }
}

// 3. Form Submission Handlers

/**
 * Primary Contact Form Submission Orchestrator
 * @param {Event} event - The native submit event
 * @param {string} type - Submission medium: 'email' or 'whatsapp'
 */
async function handleContactForm(event, type = 'email') {
    event.preventDefault();
    const form = document.querySelector('.contact-form form');
    const successMsg = document.getElementById('successMessage');
    const phoneNumber = "254722143483";

    if (type === 'whatsapp') {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value || 'Not provided';
        const subjectSelect = document.getElementById('subject');
        const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
        const message = document.getElementById('message').value;

        // Construct clean string message payload with linebreaks (%0A) and bold markdown (*)
        const text = `*New Gotiqa Farm Contact Request*%0A%0A` +
                     `*Name:* ${name}%0A` +
                     `*Email:* ${email}%0A` +
                     `*Phone:* ${phone}%0A` +
                     `*Subject:* ${subject}%0A%0A` +
                     `*Message:*%0A${message}`;

        // Uses deep-link app-switching protocol to keep from filling browser with empty tabs
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${text}`;
        
        successMsg.innerHTML = '&#10004; Sent to WhatsApp App successfully!';
    } else {
        successMsg.innerHTML = 'Sending message...';
        successMsg.classList.add('show');
        
        const success = await sendEmailBackground(form);
        if (success) {
            successMsg.innerHTML = '&#10004; Your message has been emailed successfully!';
        } else {
            successMsg.innerHTML = '&#10006; Email failed. Please use Chat on WhatsApp!';
        }
    }

    successMsg.classList.add('show');
    setTimeout(() => {
        successMsg.classList.remove('show');
        form.reset();
    }, 4000);
}

/**
 * Detailed Inquiry Modal Form Submission Orchestrator
 * @param {Event} event - The native submit event
 * @param {string} type - Submission medium: 'email' or 'whatsapp'
 */
async function handleInquiryForm(event, type = 'email') {
    event.preventDefault();
    const modal = document.getElementById('inquiryModal');
    const form = modal.querySelector('form');
    const phoneNumber = "254722143483";

    if (type === 'whatsapp') {
        const name = document.getElementById('inquiry-name').value;
        const email = document.getElementById('inquiry-email').value;
        const phone = document.getElementById('inquiry-phone').value || 'Not provided';
        const subjectSelect = document.getElementById('inquiry-subject');
        const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
        const message = document.getElementById('inquiry-message').value;

        const text = `*New Detailed Gotiqa Inquiry*%0A%0A` +
                     `*Name:* ${name}%0A` +
                     `*Email:* ${email}%0A` +
                     `*Phone:* ${phone}%0A` +
                     `*Inquiry Type:* ${subject}%0A%0A` +
                     `*Message:*%0A${message}`;

        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${text}`;
    } else {
        await sendEmailBackground(form);
    }

    setTimeout(() => {
        closeInquiryModal();
        form.reset();
    }, 500);
}

// 4. Floating Live Chat Widget Factory


function initWhatsAppWidget() {
    const widgetHtml = `
        <div id="wa-live-widget" style="position: fixed; bottom: 25px; right: 25px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div id="wa-toggle-btn" style="background: #25D366; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0px 4px 16px rgba(0,0,0,0.25); cursor: pointer; transition: transform 0.2s ease;">
                <img src="assets/img/social-whatsapp.svg" style="width: 32px; height: 32px; filter: invert(1);" alt="WhatsApp Chat">
            </div>
            
            <div id="wa-chat-box" style="display: none; position: absolute; bottom: 75px; right: 0; width: 320px; background: #fff; border-radius: 12px; box-shadow: 0px 8px 24px rgba(0,0,0,0.2); overflow: hidden; border: 1px solid #eaeaea;">
                <div style="background: #075E54; color: #fff; padding: 15px; display: flex; align-items: center; gap: 10px;">
                    <div style="background: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <img src="assets/img/gotiqa-ram-head.svg" style="width: 26px; height: 26px;" alt="Gotiqa">
                    </div>
                    <div>
                        <h4 style="margin: 0; font-size: 15px; font-weight: 600;">Gotiqa Farm Help Desk</h4>
                        <p style="margin: 0; font-size: 11px; opacity: 0.85;">Typically replies within minutes</p>
                    </div>
                </div>
                <div style="padding: 20px; background: #e5ddd5; min-height: 80px;">
                    <div style="background: #fff; padding: 10px 14px; border-radius: 0px 8px 8px 8px; font-size: 13px; color: #333; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.15); line-height: 1.4;">
                        Hello there! 🌾 Welcome to Gotiqa Farm. How can we help you manage your livestock or operations today?
                    </div>
                </div>
                <div style="padding: 12px; background: #fff; text-align: center;">
                    <a id="wa-start-chat-btn" href="#" style="display: block; background: #25D366; color: #fff; padding: 10px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(37,211,102,0.3);">
                        Start Live Chat
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', widgetHtml);

    const toggleBtn = document.getElementById('wa-toggle-btn');
    const chatBox = document.getElementById('wa-chat-box');
    const startChatBtn = document.getElementById('wa-start-chat-btn');

    // UI Presentation toggles
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = chatBox.style.display === 'block';
        chatBox.style.display = isOpen ? 'none' : 'block';
        toggleBtn.style.transform = isOpen ? 'scale(1)' : 'scale(0.9)';
    });

    // Deep link binding
    startChatBtn.addEventListener('click', () => {
        const phoneNumber = "254722143483";
        const customGreeting = encodeURIComponent("Hello Gotiqa Farm! I'm browsing your website and would like to ask a quick question.");
        startChatBtn.href = `whatsapp://send?phone=${phoneNumber}&text=${customGreeting}`;
    });

    // Outer click listener to drop down the window frame safely
    document.addEventListener('click', (e) => {
        const widgetContainer = document.getElementById('wa-live-widget');
        if (widgetContainer && !widgetContainer.contains(e.target)) {
            chatBox.style.display = 'none';
            toggleBtn.style.transform = 'scale(1)';
        }
    });
}