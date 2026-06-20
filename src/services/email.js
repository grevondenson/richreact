// Email service for contact form responses using simple mailto

// Send response email to contact form submitter using mailto
export const sendContactResponse = async (contactData, responseMessage, adminName = 'Richmond Tutorial Hub Admin') => {
  try {
    console.log('📧 Opening email client for response to:', contactData.email);
    
    // Use mailto to open email client with pre-filled professional message
    const mailtoLink = generateMailtoLink(contactData, responseMessage);
    window.open(mailtoLink, '_blank');
    
    console.log('✅ Email client opened with professional message');
    console.log('👆 IMPORTANT: Click "Send" in your email client to complete the response');
    
    return { success: true, method: 'mailto' };
    
  } catch (error) {
    console.error('❌ Failed to open email client:', error);
    throw new Error(`Email client failed to open: ${error.message}`);
  }
};

// Generate mailto link with professional email formatting
export const generateMailtoLink = (contactData, responseMessage) => {
  const subject = encodeURIComponent(`Re: ${contactData.subject}`);
  
  // Create a professional email body
  const emailBody = `Dear ${contactData.fullName},

Thank you for contacting Richmond Tutorial Hub. We have received your inquiry and are pleased to respond.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR ORIGINAL MESSAGE (submitted on ${new Date(contactData.submittedAt?.toDate?.() || contactData.submittedAt).toLocaleDateString()}):

"${contactData.message}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUR RESPONSE:

${responseMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you have any further questions, please don't hesitate to contact us.

Best regards,
Richmond Tutorial Hub Team
Chemistry Tutoring Excellence

📧 Email: info@richmondtutorialhub.com
🌐 Website: www.richmondtutorialhub.com
📞 Phone: [Your Contact Number]

---
This email was sent in response to your inquiry submitted through our website.
Richmond Tutorial Hub - Helping students excel in chemistry education.`;

  const body = encodeURIComponent(emailBody);
  return `mailto:${contactData.email}?subject=${subject}&body=${body}`;
};

// Test the mailto system
export const testMailtoSystem = () => {
  const testContact = {
    fullName: 'John Doe',
    email: 'student@example.com',
    subject: 'Chemistry Tutoring Question',
    message: 'I need help understanding organic chemistry reactions.',
    submittedAt: new Date()
  };
  
  const testResponse = 'Thank you for your inquiry! I would be happy to help you with organic chemistry.';
  
  console.log('🧪 Testing mailto system...');
  const mailtoLink = generateMailtoLink(testContact, testResponse);
  console.log('📧 Opening email client with test message...');
  window.open(mailtoLink, '_blank');
  console.log('✅ Email client should have opened with professional message!');
  console.log('👆 REMEMBER: Click "Send" in your email client to complete the test');
  
  return mailtoLink;
};

// Make functions available in browser console for testing
if (typeof window !== 'undefined') {
  window.emailService = {
    testMailto: testMailtoSystem,
    instructions: () => {
      console.log(`
📧 Manual Email System Instructions:

1. Click "Open Email Client" in admin panel
2. Your email app opens with professional message
3. 👆 IMPORTANT: Click "Send" in your email app
4. Student receives the email

✅ Simple, reliable, no external dependencies!
      `);
    }
  };
  
  console.log('📧 Manual Email System Ready:');
  console.log('   window.emailService.testMailto() - Test email client');
  console.log('   window.emailService.instructions() - Show instructions');
}
