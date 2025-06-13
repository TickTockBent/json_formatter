// DOM Elements
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const errorMessage = document.getElementById('errorMessage');
const themeToggle = document.getElementById('themeToggle');
const pasteBtn = document.getElementById('pasteBtn');
const clearInputBtn = document.getElementById('clearInputBtn');
const copyBtn = document.getElementById('copyBtn');
const formatToggleBtns = document.querySelectorAll('.toggle-btn');

// State
let currentFormat = 'beautify';
let lastValidJson = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = `${savedTheme}-mode`;
    
    // Set up event listeners
    jsonInput.addEventListener('input', debounce(formatJson, 300));
    themeToggle.addEventListener('click', toggleTheme);
    pasteBtn.addEventListener('click', pasteFromClipboard);
    clearInputBtn.addEventListener('click', clearInput);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Format toggle buttons
    formatToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            formatToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFormat = btn.dataset.format;
            if (lastValidJson) {
                displayFormattedJson(lastValidJson);
            }
        });
    });
    
    // Check for URL parameter
    checkUrlParameter();
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format JSON
function formatJson() {
    const input = jsonInput.value.trim();
    
    if (!input) {
        clearOutput();
        return;
    }
    
    try {
        // Parse JSON
        const parsed = JSON.parse(input);
        lastValidJson = parsed;
        
        // Clear error
        hideError();
        
        // Display formatted JSON
        displayFormattedJson(parsed);
        
    } catch (error) {
        // Show error
        showError(error.message);
        clearOutput();
        lastValidJson = null;
    }
}

// Display formatted JSON
function displayFormattedJson(json) {
    let formatted;
    
    if (currentFormat === 'beautify') {
        formatted = JSON.stringify(json, null, 2);
    } else {
        formatted = JSON.stringify(json);
    }
    
    // Update output
    jsonOutput.textContent = formatted;
    
    // Re-highlight syntax
    Prism.highlightElement(jsonOutput);
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.className = `${newTheme}-mode`;
    localStorage.setItem('theme', newTheme);
    
    // Re-highlight code for new theme
    if (jsonOutput.textContent) {
        Prism.highlightElement(jsonOutput);
    }
}

// Paste from clipboard
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        jsonInput.value = text;
        formatJson();
    } catch (error) {
        // Fallback for browsers that don't support clipboard API
        jsonInput.focus();
        document.execCommand('paste');
        formatJson();
    }
}

// Clear input
function clearInput() {
    jsonInput.value = '';
    clearOutput();
    hideError();
    lastValidJson = null;
}

// Copy to clipboard
async function copyToClipboard() {
    const outputText = jsonOutput.textContent;
    
    if (!outputText) return;
    
    try {
        await navigator.clipboard.writeText(outputText);
        
        // Show success feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;
        copyBtn.classList.add('btn-success');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('btn-success');
        }, 2000);
        
    } catch (error) {
        // Fallback method
        const textarea = document.createElement('textarea');
        textarea.value = outputText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// Error handling
function showError(message) {
    errorMessage.textContent = `Error: ${message}`;
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.classList.remove('show');
}

// Clear output
function clearOutput() {
    jsonOutput.textContent = '';
}

// Check for URL parameter
function checkUrlParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const jsonParam = urlParams.get('json');
    
    if (jsonParam) {
        try {
            // Decode and parse
            const decoded = decodeURIComponent(jsonParam);
            jsonInput.value = decoded;
            formatJson();
        } catch (error) {
            showError('Invalid JSON in URL parameter');
        }
    }
}

// Add success button style
const style = document.createElement('style');
style.textContent = `
    .btn-success {
        background-color: #10B981 !important;
        color: white !important;
    }
    .btn-success:hover {
        background-color: #059669 !important;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to format
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        formatJson();
    }
    
    // Ctrl/Cmd + Shift + C to copy
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyToClipboard();
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearInput();
    }
});