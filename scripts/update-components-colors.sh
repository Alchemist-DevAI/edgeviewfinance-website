#!/bin/bash

# Update components with Figma colors
echo "Updating components with Figma color scheme..."

# Find all .astro files in components
FILES=$(find src/components -name "*.astro" -type f)

for file in $FILES; do
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Apply same color replacements
    sed -i 's/bg-ColorBlack/bg-secondary-dark/g' "$file"
    sed -i 's/bg-ColorBlue/bg-primary-orange/g' "$file"
    sed -i 's/bg-ColorGreen/bg-primary-orange/g' "$file"
    sed -i 's/bg-ColorYellow/bg-primary-orange-light/g' "$file"
    sed -i 's/bg-ColorOffWhite/bg-neutral-light/g' "$file"
    sed -i 's/bg-ColorWhite/bg-pure-white/g' "$file"
    sed -i 's/bg-ColorLime/bg-primary-orange/g' "$file"
    sed -i 's/bg-ColorPurple/bg-primary-orange/g' "$file"
    sed -i 's/bg-ColorViolet/bg-primary-orange-light/g' "$file"
    
    sed -i 's/text-ColorBlack/text-secondary-dark/g' "$file"
    sed -i 's/text-ColorBlue/text-primary-orange/g' "$file"
    sed -i 's/text-ColorGreen/text-primary-orange/g' "$file"
    sed -i 's/text-ColorYellow/text-primary-orange-light/g' "$file"
    sed -i 's/text-ColorWhite/text-pure-white/g' "$file"
    sed -i 's/text-ColorLime/text-primary-orange/g' "$file"
    sed -i 's/text-ColorPurple/text-primary-orange/g' "$file"
    
    sed -i 's/border-ColorBlack/border-secondary-dark/g' "$file"
    sed -i 's/border-ColorBlue/border-primary-orange/g' "$file"
    sed -i 's/border-ColorGreen/border-primary-orange/g' "$file"
    sed -i 's/border-ColorLime/border-primary-orange/g' "$file"
    sed -i 's/border-ColorYellow/border-primary-orange-light/g' "$file"
    
    sed -i 's/hover:bg-ColorBlack/hover:bg-secondary-dark/g' "$file"
    sed -i 's/hover:bg-ColorBlue/hover:bg-primary-orange/g' "$file"
    sed -i 's/hover:bg-ColorGreen/hover:bg-primary-orange/g' "$file"
    sed -i 's/hover:bg-ColorLime/hover:bg-primary-orange/g' "$file"
    sed -i 's/hover:text-ColorBlue/hover:text-primary-orange/g' "$file"
    sed -i 's/hover:text-ColorLime/hover:text-primary-orange/g' "$file"
    sed -i 's/hover:border-ColorBlue/hover:border-primary-orange/g' "$file"
    
    echo "Updated: $file"
done

echo "All components updated with Figma colors!"