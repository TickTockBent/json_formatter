// DOM Elements
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const errorMessage = document.getElementById('errorMessage');
const themeToggle = document.getElementById('themeToggle');
const heroToggle = document.getElementById('heroToggle');
const heroContent = document.getElementById('heroContent');
const versionBadge = document.getElementById('versionBadge');
const generateBtn = document.getElementById('generateBtn');
const fixBtn = document.getElementById('fixBtn');
const pasteBtn = document.getElementById('pasteBtn');
const clearInputBtn = document.getElementById('clearInputBtn');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const formatToggleBtns = document.querySelectorAll('.toggle-btn');

// State
let currentFormat = 'beautify';
let lastValidJson = null;
let currentSampleIndex = 0;

// Sample JSON data
const sampleJsonData = [
    // Simple user profile
    `{"name":"Alice Johnson","age":28,"email":"alice@example.com","isActive":true,"skills":["JavaScript","Python","Go"],"address":{"street":"123 Main St","city":"San Francisco","zipCode":"94105"}}`,
    
    // E-commerce product
    `{"id":"prod-001","title":"Wireless Bluetooth Headphones","price":89.99,"currency":"USD","inStock":true,"categories":["Electronics","Audio","Headphones"],"ratings":{"average":4.5,"count":127},"specifications":{"batteryLife":"30 hours","weight":"250g","colors":["black","white","blue"]}}`,
    
    // API response with nested data
    `{"success":true,"data":{"users":[{"id":1,"username":"dev_user","profile":{"firstName":"John","lastName":"Doe","avatar":"https://example.com/avatar1.jpg"},"metadata":{"lastLogin":"2025-01-13T10:30:00Z","permissions":["read","write"]}},{"id":2,"username":"admin","profile":{"firstName":"Jane","lastName":"Smith","avatar":"https://example.com/avatar2.jpg"},"metadata":{"lastLogin":"2025-01-13T09:15:00Z","permissions":["read","write","admin"]}}],"pagination":{"page":1,"limit":10,"total":2}},"timestamp":"2025-01-13T10:35:22Z"}`,
    
    // Configuration file
    `{"application":{"name":"MyApp","version":"1.2.3","environment":"production"},"database":{"host":"localhost","port":5432,"name":"myapp_db","ssl":true},"cache":{"enabled":true,"ttl":3600,"provider":"redis"},"features":{"analytics":true,"notifications":false,"betaFeatures":["newUI","advancedSearch"]},"logging":{"level":"info","outputs":["console","file"]}}`,
    
    // Simple array
    `[{"task":"Review pull requests","completed":false,"priority":"high"},{"task":"Update documentation","completed":true,"priority":"medium"},{"task":"Deploy to staging","completed":false,"priority":"low"}]`
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Theme is already applied by inline script, just sync the variable
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Hero state is already applied by inline script, just sync the classes
    const heroCollapsed = localStorage.getItem('heroCollapsed') === 'true';
    if (heroCollapsed) {
        heroContent.classList.add('collapsed');
        document.querySelector('.hero').classList.add('collapsed');
    }
    
    // Set up event listeners
    jsonInput.addEventListener('input', debounce(formatJson, 300));
    themeToggle.addEventListener('click', toggleTheme);
    heroToggle.addEventListener('click', toggleHeroContent);
    generateBtn.addEventListener('click', generateSample);
    fixBtn.addEventListener('click', fixJson);
    pasteBtn.addEventListener('click', pasteFromClipboard);
    clearInputBtn.addEventListener('click', clearInput);
    shareBtn.addEventListener('click', generateShareLink);
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
    
    // Load version information
    loadVersion();
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
        fixBtn.style.display = 'none';
        return;
    }
    
    try {
        // Parse JSON
        const parsed = JSON.parse(input);
        lastValidJson = parsed;
        
        // Clear error
        hideError();
        
        // Hide fix button
        fixBtn.style.display = 'none';
        
        // Display formatted JSON
        displayFormattedJson(parsed);
        
    } catch (error) {
        // Show error
        showError(error.message);
        clearOutput();
        lastValidJson = null;
        
        // Show fix button
        fixBtn.style.display = 'inline-flex';
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
    const currentTheme = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.className = `${newTheme}-mode`;
    localStorage.setItem('theme', newTheme);
    
    // Re-highlight code for new theme
    if (jsonOutput.textContent) {
        Prism.highlightElement(jsonOutput);
    }
}

// Hero content toggle
function toggleHeroContent() {
    const hero = document.querySelector('.hero');
    const isCollapsed = heroContent.classList.contains('collapsed');
    
    if (isCollapsed) {
        heroContent.classList.remove('collapsed');
        hero.classList.remove('collapsed');
        document.documentElement.removeAttribute('data-hero-collapsed');
        localStorage.setItem('heroCollapsed', 'false');
    } else {
        heroContent.classList.add('collapsed');
        hero.classList.add('collapsed');
        document.documentElement.setAttribute('data-hero-collapsed', 'true');
        localStorage.setItem('heroCollapsed', 'true');
    }
}

// Paste from clipboard
async function pasteFromClipboard() {
    try {
        if (navigator.clipboard && navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText();
            jsonInput.value = text;
            formatJson();
        } else {
            // Fallback for browsers that don't support clipboard API
            // Focus the input and let user paste manually
            jsonInput.focus();
            jsonInput.placeholder = 'Paste your JSON here with Ctrl+V...';
            setTimeout(() => {
                jsonInput.placeholder = 'Paste your JSON here... e.g., {"name": "Alice", "age": 30}';
            }, 3000);
        }
    } catch (error) {
        // If clipboard read fails, focus input for manual paste
        jsonInput.focus();
        jsonInput.placeholder = 'Paste your JSON here with Ctrl+V...';
        setTimeout(() => {
            jsonInput.placeholder = 'Paste your JSON here... e.g., {"name": "Alice", "age": 30}';
        }, 3000);
    }
}

// Generate sample JSON
function generateSample() {
    const sampleJson = sampleJsonData[currentSampleIndex];
    jsonInput.value = sampleJson;
    formatJson();
    
    // Cycle to next sample for next click
    currentSampleIndex = (currentSampleIndex + 1) % sampleJsonData.length;
    
    // Show visual feedback
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Generated!
    `;
    generateBtn.classList.add('btn-success');
    
    setTimeout(() => {
        generateBtn.innerHTML = originalText;
        generateBtn.classList.remove('btn-success');
    }, 1500);
}

// Fix JSON
function fixJson() {
    const input = jsonInput.value.trim();
    if (!input) return;
    
    let fixed = input;
    let changesCount = 0;
    const changes = [];
    
    try {
        // 1. Remove trailing commas
        const trailingCommaFix = fixed.replace(/,(\s*[}\]])/g, '$1');
        if (trailingCommaFix !== fixed) {
            changes.push('Removed trailing commas');
            fixed = trailingCommaFix;
            changesCount++;
        }
        
        // 2. Add missing quotes around property names
        const unquotedKeysFix = fixed.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
        if (unquotedKeysFix !== fixed) {
            changes.push('Added quotes around property names');
            fixed = unquotedKeysFix;
            changesCount++;
        }
        
        // 3. Fix single quotes to double quotes
        const singleQuotesFix = fixed.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
        if (singleQuotesFix !== fixed) {
            changes.push('Changed single quotes to double quotes');
            fixed = singleQuotesFix;
            changesCount++;
        }
        
        // 4. Add missing commas between properties
        const missingCommasFix = fixed.replace(/([}\]"])\s*(["\[{])/g, '$1,$2');
        if (missingCommasFix !== fixed) {
            changes.push('Added missing commas');
            fixed = missingCommasFix;
            changesCount++;
        }
        
        // 5. Try to balance brackets - simple cases
        let openBraces = (fixed.match(/\{/g) || []).length;
        let closeBraces = (fixed.match(/\}/g) || []).length;
        let openBrackets = (fixed.match(/\[/g) || []).length;
        let closeBrackets = (fixed.match(/\]/g) || []).length;
        
        // Add missing closing braces
        if (openBraces > closeBraces) {
            fixed += '}'.repeat(openBraces - closeBraces);
            changes.push('Added missing closing braces');
            changesCount++;
        }
        
        // Add missing closing brackets
        if (openBrackets > closeBrackets) {
            fixed += ']'.repeat(openBrackets - closeBrackets);
            changes.push('Added missing closing brackets');
            changesCount++;
        }
        
        // Remove extra closing braces (simple case)
        if (closeBraces > openBraces) {
            const extraBraces = closeBraces - openBraces;
            for (let i = 0; i < extraBraces; i++) {
                fixed = fixed.replace(/}$/, '');
            }
            changes.push('Removed extra closing braces');
            changesCount++;
        }
        
        // Remove extra closing brackets (simple case)
        if (closeBrackets > openBrackets) {
            const extraBrackets = closeBrackets - openBrackets;
            for (let i = 0; i < extraBrackets; i++) {
                fixed = fixed.replace(/]$/, '');
            }
            changes.push('Removed extra closing brackets');
            changesCount++;
        }
        
        // Test if the fixed JSON is valid
        JSON.parse(fixed);
        
        // If we get here, the fix worked!
        jsonInput.value = fixed;
        formatJson();
        
        // Show success feedback
        const originalText = fixBtn.innerHTML;
        fixBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Fixed!
        `;
        fixBtn.classList.remove('btn-warning');
        fixBtn.classList.add('btn-success');
        
        // Show what was changed
        if (changes.length > 0) {
            console.log(`JSON Fix applied ${changesCount} changes:`, changes);
            // Could show this in a tooltip or notification
        }
        
        setTimeout(() => {
            fixBtn.innerHTML = originalText;
            fixBtn.classList.remove('btn-success');
            fixBtn.classList.add('btn-warning');
        }, 3000);
        
    } catch (error) {
        // Fix didn't work
        const originalText = fixBtn.innerHTML;
        fixBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Can't Fix
        `;
        fixBtn.classList.remove('btn-warning');
        fixBtn.classList.add('btn-danger');
        
        setTimeout(() => {
            fixBtn.innerHTML = originalText;
            fixBtn.classList.remove('btn-danger');
            fixBtn.classList.add('btn-warning');
        }, 3000);
        
        showError(`Unable to auto-fix: ${error.message}`);
    }
}

// Clear input
function clearInput() {
    jsonInput.value = '';
    clearOutput();
    hideError();
    fixBtn.style.display = 'none';
    lastValidJson = null;
}

// Generate share link
async function generateShareLink() {
    const inputText = jsonInput.value.trim();
    
    if (!inputText) {
        showError('No JSON to share. Add some JSON first!');
        return;
    }
    
    if (!lastValidJson) {
        showError('Invalid JSON. Please fix errors before sharing.');
        return;
    }
    
    try {
        // Use the input text (minified for shorter URLs)
        const minifiedJson = JSON.stringify(lastValidJson);
        const encodedJson = encodeURIComponent(minifiedJson);
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?json=${encodedJson}`;
        
        // Check URL length (practical limit ~2000 characters)
        if (shareUrl.length > 2000) {
            showError('JSON too large to share via URL (limit: ~2000 characters). Try with smaller JSON.');
            return;
        }
        
        // Copy to clipboard with fallback
        let copySuccess = false;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                copySuccess = true;
            } else {
                // Fallback for non-HTTPS environments
                const textarea = document.createElement('textarea');
                textarea.value = shareUrl;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                copySuccess = document.execCommand('copy');
                document.body.removeChild(textarea);
            }
        } catch (error) {
            // Final fallback - show the URL in a prompt
            copySuccess = false;
        }
        
        // Show feedback based on copy success
        const originalText = shareBtn.innerHTML;
        if (copySuccess) {
            shareBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Link Copied!
            `;
            shareBtn.classList.add('btn-success');
        } else {
            // Show the URL in a prompt as final fallback
            prompt('Copy this share link:', shareUrl);
            shareBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Link Ready!
            `;
            shareBtn.classList.add('btn-success');
        }
        
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
            shareBtn.classList.remove('btn-success');
        }, 2000);
        
        // Also update the browser URL without reload
        history.replaceState(null, null, shareUrl);
        
    } catch (error) {
        showError('Failed to generate share link. Please try again.');
        console.error('Share link error:', error);
    }
}

// Copy to clipboard
async function copyToClipboard() {
    const outputText = jsonOutput.textContent;
    
    if (!outputText) return;
    
    let copySuccess = false;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(outputText);
            copySuccess = true;
        } else {
            // Fallback method
            const textarea = document.createElement('textarea');
            textarea.value = outputText;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            copySuccess = document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    } catch (error) {
        copySuccess = false;
    }
    
    // Show feedback
    const originalText = copyBtn.innerHTML;
    if (copySuccess) {
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;
        copyBtn.classList.add('btn-success');
    } else {
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Failed
        `;
        copyBtn.classList.add('btn-danger');
    }
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove('btn-success', 'btn-danger');
    }, 2000);
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

// Load version information
async function loadVersion() {
    try {
        const response = await fetch('./version.json');
        if (response.ok) {
            const versionData = await response.json();
            versionBadge.textContent = `v${versionData.version}`;
            versionBadge.title = `Version ${versionData.version}\nCommit: ${versionData.commit?.substring(0, 7) || 'unknown'}\nBuilt: ${versionData.timestamp || 'unknown'}`;
            
            // Set href to GitHub commit if commit hash is available
            if (versionData.commit) {
                versionBadge.href = `https://github.com/TickTockBent/json_formatter/commit/${versionData.commit}`;
            }
        } else {
            // Fallback if version.json doesn't exist
            versionBadge.textContent = 'v1.0.0';
            versionBadge.removeAttribute('href');
        }
    } catch (error) {
        // Fallback for any fetch errors
        versionBadge.textContent = 'v1.0.0';
        versionBadge.removeAttribute('href');
        console.log('Could not load version info:', error.message);
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