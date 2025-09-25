// Password Generator App in Vanilla JavaScript
class PasswordGenerator {
    constructor() {
        this.passwordLength = 12;
        this.includeUppercase = true;
        this.includeLowercase = true;
        this.includeNumbers = true;
        this.includeSymbols = false;
        this.generatedPassword = '';
        this.copySuccess = false;
        
        this.init();
    }

    init() {
        this.bindElements();
        this.attachEventListeners();
        this.generatePassword();
    }

    bindElements() {
        this.passwordInput = document.getElementById('passwordInput');
        this.copyBtn = document.getElementById('copyBtn');
        this.lengthLabel = document.getElementById('lengthLabel');
        this.lengthSlider = document.getElementById('lengthSlider');
        this.uppercaseCheck = document.getElementById('uppercase');
        this.lowercaseCheck = document.getElementById('lowercase');
        this.numbersCheck = document.getElementById('numbers');
        this.symbolsCheck = document.getElementById('symbols');
        this.strengthIndicator = document.getElementById('strengthIndicator');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.warningInfo = document.getElementById('warningInfo');
    }

    attachEventListeners() {
        this.lengthSlider.addEventListener('input', (e) => {
            this.passwordLength = parseInt(e.target.value);
            this.lengthLabel.textContent = `密碼長度: ${this.passwordLength}`;
        });

        this.uppercaseCheck.addEventListener('change', (e) => {
            this.includeUppercase = e.target.checked;
            this.updateValidation();
        });

        this.lowercaseCheck.addEventListener('change', (e) => {
            this.includeLowercase = e.target.checked;
            this.updateValidation();
        });

        this.numbersCheck.addEventListener('change', (e) => {
            this.includeNumbers = e.target.checked;
            this.updateValidation();
        });

        this.symbolsCheck.addEventListener('change', (e) => {
            this.includeSymbols = e.target.checked;
            this.updateValidation();
        });

        this.generateBtn.addEventListener('click', () => {
            this.generatePassword();
        });

        this.clearBtn.addEventListener('click', () => {
            this.clearPassword();
        });

        this.copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });
    }

    updateValidation() {
        const hasValidOptions = this.includeUppercase || this.includeLowercase || 
                               this.includeNumbers || this.includeSymbols;
        
        this.generateBtn.disabled = !hasValidOptions;
        this.warningInfo.style.display = hasValidOptions ? 'none' : 'block';
        
        if (!hasValidOptions) {
            this.clearPassword();
        }
    }

    generatePassword() {
        let chars = '';
        
        if (this.includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (this.includeNumbers) chars += '0123456789';
        if (this.includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!chars) {
            this.generatedPassword = '';
            this.updateUI();
            return;
        }

        let password = '';
        
        // Ensure at least one character from each selected category
        if (this.includeUppercase) {
            const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            password += upperChars[Math.floor(Math.random() * upperChars.length)];
        }
        if (this.includeLowercase) {
            const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
            password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
        }
        if (this.includeNumbers) {
            const numberChars = '0123456789';
            password += numberChars[Math.floor(Math.random() * numberChars.length)];
        }
        if (this.includeSymbols) {
            const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
        }

        // Fill the rest randomly
        for (let i = password.length; i < this.passwordLength; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }

        // Shuffle the password to avoid predictable patterns
        this.generatedPassword = this.shuffleString(password);
        this.updateUI();
        this.updatePasswordStrength();
    }

    shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    updatePasswordStrength() {
        if (!this.generatedPassword) {
            this.strengthIndicator.textContent = '-';
            this.strengthIndicator.className = 'strength';
            return;
        }

        let score = 0;
        const length = this.generatedPassword.length;
        
        // Length scoring
        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (length >= 16) score += 1;

        // Character variety scoring
        if (this.includeUppercase && /[A-Z]/.test(this.generatedPassword)) score += 1;
        if (this.includeLowercase && /[a-z]/.test(this.generatedPassword)) score += 1;
        if (this.includeNumbers && /[0-9]/.test(this.generatedPassword)) score += 1;
        if (this.includeSymbols && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.generatedPassword)) score += 2;

        let strengthText, strengthClass;
        if (score <= 2) {
            strengthText = '弱';
            strengthClass = 'strength weak';
        } else if (score <= 4) {
            strengthText = '中等';
            strengthClass = 'strength medium';
        } else if (score <= 6) {
            strengthText = '強';
            strengthClass = 'strength strong';
        } else {
            strengthText = '很強';
            strengthClass = 'strength very-strong';
        }

        this.strengthIndicator.textContent = strengthText;
        this.strengthIndicator.className = strengthClass;
    }

    async copyToClipboard() {
        if (!this.generatedPassword) return;

        try {
            await navigator.clipboard.writeText(this.generatedPassword);
            this.showCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.generatedPassword;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopySuccess();
        }
    }

    showCopySuccess() {
        this.copySuccess = true;
        this.copyBtn.textContent = '✅';
        this.copyBtn.title = '已複製!';
        setTimeout(() => {
            this.copySuccess = false;
            this.copyBtn.textContent = '📋';
            this.copyBtn.title = '複製到剪貼簿';
        }, 2000);
    }

    clearPassword() {
        this.generatedPassword = '';
        this.copySuccess = false;
        this.updateUI();
        this.updatePasswordStrength();
    }

    updateUI() {
        this.passwordInput.value = this.generatedPassword;
        this.passwordInput.className = this.generatedPassword ? 
            'password-input has-password' : 'password-input';
        this.copyBtn.disabled = !this.generatedPassword;
        this.clearBtn.disabled = !this.generatedPassword;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});