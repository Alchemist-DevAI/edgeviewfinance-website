#!/bin/bash

# Script to update all Astro pages with Figma color scheme
# Figma Colors:
# Primary Orange: #FF9E10
# Secondary Dark: #1C2C3B  
# Neutral Light: #F7F7F7
# Pure White: #FFFFFF

echo "Updating all pages with Figma color scheme..."

# Define color replacements
# Old Agency11 colors -> New Figma colors
declare -A COLOR_REPLACEMENTS=(
    # Background colors
    ["bg-ColorBlack"]="bg-secondary-dark"
    ["bg-ColorBlue"]="bg-primary-orange"
    ["bg-ColorGreen"]="bg-primary-orange"
    ["bg-ColorYellow"]="bg-primary-orange-light"
    ["bg-ColorOffWhite"]="bg-neutral-light"
    ["bg-ColorWhite"]="bg-pure-white"
    ["bg-ColorLime"]="bg-primary-orange"
    ["bg-ColorPurple"]="bg-primary-orange"
    ["bg-ColorViolet"]="bg-primary-orange-light"
    
    # Text colors
    ["text-ColorBlack"]="text-secondary-dark"
    ["text-ColorBlue"]="text-primary-orange"
    ["text-ColorGreen"]="text-primary-orange"
    ["text-ColorYellow"]="text-primary-orange-light"
    ["text-ColorWhite"]="text-pure-white"
    ["text-ColorLime"]="text-primary-orange"
    ["text-ColorPurple"]="text-primary-orange"
    
    # Border colors
    ["border-ColorBlack"]="border-secondary-dark"
    ["border-ColorBlue"]="border-primary-orange"
    ["border-ColorGreen"]="border-primary-orange"
    ["border-ColorLime"]="border-primary-orange"
    ["border-ColorYellow"]="border-primary-orange-light"
    
    # Hover states
    ["hover:bg-ColorBlack"]="hover:bg-secondary-dark"
    ["hover:bg-ColorBlue"]="hover:bg-primary-orange"
    ["hover:bg-ColorGreen"]="hover:bg-primary-orange"
    ["hover:bg-ColorLime"]="hover:bg-primary-orange"
    ["hover:text-ColorBlue"]="hover:text-primary-orange"
    ["hover:text-ColorLime"]="hover:text-primary-orange"
    ["hover:border-ColorBlue"]="hover:border-primary-orange"
)

# Find all .astro files (excluding index.astro which is already done)
FILES=$(find src/pages -name "*.astro" -type f ! -name "index.astro")

for file in $FILES; do
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Apply color replacements
    for old_color in "${!COLOR_REPLACEMENTS[@]}"; do
        new_color="${COLOR_REPLACEMENTS[$old_color]}"
        sed -i "s/$old_color/$new_color/g" "$file"
    done
    
    # Additional specific replacements for common patterns
    sed -i 's/bg-black\/5/bg-secondary-dark\/5/g' "$file"
    sed -i 's/bg-black\/10/bg-secondary-dark\/10/g' "$file"
    sed -i 's/text-black\/60/text-secondary-dark\/60/g' "$file"
    sed -i 's/text-black\/80/text-secondary-dark\/80/g' "$file"
    
    echo "Updated: $file"
done

echo "All pages updated with Figma colors!"
echo "Backup files created with .bak extension"