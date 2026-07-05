import re

with open('frontend/intro.html', 'r') as f:
    content = f.read()

# 1. Extract CSS
style_match = re.search(r'<style id="anek-intro-styles">(.*?)</style>', content, re.DOTALL)
if style_match:
    with open('frontend/src/intro.css', 'w') as f:
        f.write(style_match.group(1).strip())

# 2. Extract HTML snippet
intro_match = re.search(r'<!-- ===== Cinematic Intro ===== -->(.*?)<noscript>', content, re.DOTALL)
html_snippet = intro_match.group(1).strip() if intro_match else ''
# Escape backticks and dollars
html_snippet = html_snippet.replace('`', '\\`').replace('$', '\\$')

# 3. Extract JS logic
# We need to change the cleanup part back to removing the elements instead of redirecting
script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
js_logic = script_match.group(1).strip() if script_match else ''

# Replace the redirect logic back with remove logic
js_logic = js_logic.replace(
"""            // Cleanup and Redirect
            particlesActive = false;
            window.location.href = '/index.html';""",
"""            // Cleanup
            particlesActive = false;
            if (intro) intro.remove();
            if (siteBlur) siteBlur.remove();
            document.body.style.overflow = '';"""
)

# 4. Construct intro.js
intro_js_content = f"""
(function() {{
    // Skip if reduced motion preferred or ?skip=1 in URL
    if (document.documentElement.classList.contains('anek-skip-intro')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const introHTML = `{html_snippet}`;
    
    // Inject CSS if not already there
    if (!document.querySelector('link[href*="intro.css"]')) {{
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/src/intro.css';
        document.head.appendChild(link);
    }}

    // Inject HTML at the top of the body
    document.addEventListener('DOMContentLoaded', () => {{
        document.body.insertAdjacentHTML('afterbegin', introHTML);
        
        // Now run the original animation logic
        {js_logic.replace('(function() {', '', 1).rsplit('})();', 1)[0].strip()}
    }});
}})();
"""

with open('frontend/src/intro.js', 'w') as f:
    f.write(intro_js_content.strip())

print("Created intro.css and intro.js")
