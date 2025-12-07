// payment-gateway-overlay.js - Reusable Payment Gateway Overlay

(function() {
    'use strict';

    // Inject overlay HTML into the page when script loads
    function injectPaymentGateway() {
        const overlayHTML = `
            <div class="payment-gateway-overlay" id="paymentGatewayOverlay">
                <div class="overlay">
                    <div class="payment-modal">
                        <button class="payment-close-btn" onclick="closePaymentGateway()">×</button>
                        
                        <div class="modal-header">
                            <h2>Donate Info</h2>
                            <div class="amount-field">
                                <label>Amount (৳):</label>
                                <input type="text" value="10000.00" id="amount" readonly>
                            </div>
                            <h3 class="payment-method-title">Payment method</h3>
                        </div>

                        <div class="payment-tabs">
                            <button class="tab active" data-tab="cards">Cards</button>
                            <button class="tab" data-tab="mobile">Mobile Banking</button>
                        </div>

                        <div id="cardsTab" class="tab-content active">
                            <div class="card-logos">
                                <img src="images/payment-gateway/visa.jpg" alt="Visa">
                                <img src="images/payment-gateway/mastercard.jpg" alt="Mastercard">
                                <img src="images/payment-gateway/americanex.jpg" alt="American Express">
                            </div>

                            <div class="card-form-container">
                                <input type="text" placeholder="Card Number" maxlength="19">
                                <div class="expiry-cvc-row">
                                    <input type="text" placeholder="MM/YY" maxlength="5">
                                    <input type="text" placeholder="CVC/CVV" maxlength="4">
                                </div>
                                <input type="text" placeholder="Card Holder Name">
                                <div class="checkbox-group">
                                    <input type="checkbox" id="rememberCard">
                                    <label for="rememberCard">Remember this card</label>
                                </div>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="terms" required>
                                    <label for="terms">I agree to the <a href="#" target="_blank">Terms of Service</a></label>
                                </div>
                            </div>
                        </div>

                        <div id="mobileTab" class="tab-content">
                            <div class="mobile-banking-grid">
                                <div class="mobile-banking-option"><img src="images/payment-gateway/nogod.jpg" alt="Nagad"></div>
                                <div class="mobile-banking-option"><img src="images/payment-gateway/dbbl.jpg" alt="DBBL"></div>
                                <div class="mobile-banking-option"><img src="images/payment-gateway/nogod.jpg" alt="bKash"></div>
                                <div class="mobile-banking-option"><img src="images/payment-gateway/rocket.jpg" alt="Rocket"></div>
                                <div class="mobile-banking-option"><img src="images/payment-gateway/upai.jpg" alt="Upay"></div>
                            </div>
                        </div>

                        <button class="pay-button" onclick="processPayment()">
                            Pay <span id="payAmount">10000.00</span> ৳
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insert overlay at the end of body
        document.body.insertAdjacentHTML('beforeend', overlayHTML);
    }

    // Initialize payment gateway functionality
    function initializePaymentGateway() {
        // Tab switching functionality (your original code - unchanged)
        document.querySelectorAll('.payment-gateway-overlay .tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const type = tab.getAttribute('data-tab');
                document.querySelectorAll('.payment-gateway-overlay .tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.payment-gateway-overlay .tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(type === 'cards' ? 'cardsTab' : 'mobileTab').classList.add('active');
            });
        });

        // Listen for ALL donate-btn clicks on the page
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('donate-btn') || e.target.closest('.donate-btn')) {
                e.preventDefault();
                const button = e.target.classList.contains('donate-btn') ? e.target : e.target.closest('.donate-btn');
                const amount = button.getAttribute('data-amount') || button.dataset.amount || '10000.00';
                openPaymentGateway(amount);
            }
        });

        // Close overlay when clicking outside the modal
        document.getElementById('paymentGatewayOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closePaymentGateway();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const overlay = document.getElementById('paymentGatewayOverlay');
                if (overlay && overlay.classList.contains('active')) {
                    closePaymentGateway();
                }
            }
        });
    }

    // Open payment gateway overlay
    window.openPaymentGateway = function(amount) {
        const overlay = document.getElementById('paymentGatewayOverlay');
        const amountInput = document.getElementById('amount');
        const payAmountSpan = document.getElementById('payAmount');
        
        // Set the amount
        if (amountInput) amountInput.value = parseFloat(amount).toFixed(2);
        if (payAmountSpan) payAmountSpan.textContent = parseFloat(amount).toFixed(2);
        
        // Show overlay with animation
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    // Close payment gateway overlay
    window.closePaymentGateway = function() {
        const overlay = document.getElementById('paymentGatewayOverlay');
        
        // Hide with animation
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        
        // Restore body scroll
        document.body.style.overflow = '';
    };

    // Payment processing (your original function)
    window.processPayment = function() {
        const amount = document.getElementById('amount').value;
        alert('Processing payment of ' + amount + ' ৳');
        // Add your payment processing logic here
        // After successful payment, close the overlay:
        // closePaymentGateway();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            injectPaymentGateway();
            initializePaymentGateway();
        });
    } else {
        // DOM already loaded
        injectPaymentGateway();
        initializePaymentGateway();
    }

})();