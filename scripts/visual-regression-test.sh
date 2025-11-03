#!/bin/bash

# Visual Regression Test Script
# Compares before-refactor vs after-phase-1 screenshots

BEFORE_DIR="styling-baseline/before-refactor"
AFTER_DIR="styling-baseline/after-phase-1" 
DIFF_DIR="styling-baseline/visual-diff"

# Create diff directory
mkdir -p "$DIFF_DIR"/{desktop,mobile,interactive-states}

echo "🔍 Visual Regression Testing - Phase 1 CSS Refactoring"
echo "=================================================="

# Counters
TOTAL_COMPARED=0
IDENTICAL=0
DIFFERENT=0

# Function to compare images
compare_image() {
    local before_img="$1"
    local after_img="$2"
    local diff_img="$3"
    local name="$4"
    
    if [ ! -f "$before_img" ]; then
        echo "   ❌ Missing before image: $name"
        return 1
    fi
    
    if [ ! -f "$after_img" ]; then
        echo "   ❌ Missing after image: $name"
        return 1
    fi
    
    # Use ImageMagick compare
    # -metric AE counts different pixels, -fuzz allows minor differences
    result=$(compare -metric AE -fuzz 1% "$before_img" "$after_img" "$diff_img" 2>&1)
    exit_code=$?
    
    TOTAL_COMPARED=$((TOTAL_COMPARED + 1))
    
    if [ $exit_code -eq 0 ] || [ "$result" = "0" ]; then
        echo "   ✅ IDENTICAL: $name"
        IDENTICAL=$((IDENTICAL + 1))
        rm -f "$diff_img"  # Remove diff file if identical
    else
        echo "   🔄 DIFFERENT: $name ($result pixels different)"
        DIFFERENT=$((DIFFERENT + 1))
    fi
}

echo ""
echo "🖥️  Comparing Desktop Screenshots..."
echo "--------------------------------"
for img in "$BEFORE_DIR"/desktop/*.png; do
    filename=$(basename "$img")
    name=$(echo "$filename" | sed 's/-desktop\.png$//')
    
    before_img="$BEFORE_DIR/desktop/$filename"
    after_img="$AFTER_DIR/desktop/$filename"
    diff_img="$DIFF_DIR/desktop/diff-$filename"
    
    compare_image "$before_img" "$after_img" "$diff_img" "$name (desktop)"
done

echo ""
echo "📱 Comparing Mobile Screenshots..."
echo "-------------------------------"
for img in "$BEFORE_DIR"/mobile/*.png; do
    filename=$(basename "$img")
    name=$(echo "$filename" | sed 's/-mobile\.png$//')
    
    before_img="$BEFORE_DIR/mobile/$filename"
    after_img="$AFTER_DIR/mobile/$filename"
    diff_img="$DIFF_DIR/mobile/diff-$filename"
    
    compare_image "$before_img" "$after_img" "$diff_img" "$name (mobile)"
done

echo ""
echo "⚡ Comparing Interactive States..."
echo "-------------------------------"
for img in "$BEFORE_DIR"/interactive-states/*.png; do
    filename=$(basename "$img")
    name=$(echo "$filename" | sed 's/\.png$//')
    
    before_img="$BEFORE_DIR/interactive-states/$filename"
    after_img="$AFTER_DIR/interactive-states/$filename"
    diff_img="$DIFF_DIR/interactive-states/diff-$filename"
    
    compare_image "$before_img" "$after_img" "$diff_img" "$name"
done

echo ""
echo "📊 VISUAL REGRESSION TEST RESULTS"
echo "=================================="
echo "Total Compared: $TOTAL_COMPARED"
echo "Identical: $IDENTICAL"
echo "Different: $DIFFERENT"

if [ $DIFFERENT -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS: All screenshots are identical!"
    echo "✅ Phase 1 CSS refactoring maintained zero visual changes"
    exit 0
else
    echo ""
    echo "⚠️  WARNING: $DIFFERENT screenshots show differences"
    echo "📁 Check diff images in: $DIFF_DIR"
    exit 1
fi