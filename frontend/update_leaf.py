import re

# Read the SVG file
with open('/home/stark/Downloads/dev/elitedebuggers/anek/frontend/public/images/leaf.svg', 'r') as f:
    svg_content = f.read()

path_match = re.search(r'<path[^>]*d="([^"]+)"[^>]*>', svg_content)
path_d = path_match.group(1)

svg_components = f'<svg class="absolute -top-2 -right-3 w-[18px] h-[18px] rotate-[15deg] origin-bottom-left" viewBox="0 0 456 492" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="{path_d}" transform="translate(131.125,31.375)"/></svg>'
svg_index = f'<svg class="absolute -top-2 -right-3.5 w-[22px] h-[22px] rotate-[15deg] origin-bottom-left text-primary" viewBox="0 0 456 492" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="{path_d}" transform="translate(131.125,31.375)"/></svg>'

# Replace in components.js
with open('/home/stark/Downloads/dev/elitedebuggers/anek/frontend/src/components.js', 'r') as f:
    comp_content = f.read()
comp_content = comp_content.replace('<span class="material-symbols-outlined absolute -top-2.5 -right-3 text-[16px] rotate-12">eco</span>', svg_components)
with open('/home/stark/Downloads/dev/elitedebuggers/anek/frontend/src/components.js', 'w') as f:
    f.write(comp_content)

# Replace in index.html
with open('/home/stark/Downloads/dev/elitedebuggers/anek/frontend/index.html', 'r') as f:
    idx_content = f.read()
idx_content = idx_content.replace('<span class="material-symbols-outlined absolute -top-2.5 -right-3 text-[18px] rotate-12 text-primary">eco</span>', svg_index)
with open('/home/stark/Downloads/dev/elitedebuggers/anek/frontend/index.html', 'w') as f:
    f.write(idx_content)

print("Replaced leaf icons.")
