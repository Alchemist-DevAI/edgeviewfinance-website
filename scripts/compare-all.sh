#!/bin/bash

cd "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure"

echo "🔍 Visual Regression Testing - Complete Comparison"
echo "==============================================="

total=0
identical=0
different=0

echo ""
echo "🖥️ Desktop Screenshots:"
echo "----------------------"

for file in about blog business-acquisition-finance commercial-property-finance contact equipment-finance home-loans homepage invoice-trade-finance services-overview success-stories vehicle-finance working-capital-finance; do
    before="styling-baseline/before-refactor/desktop/${file}-desktop.png"
    after="styling-baseline/after-phase-1/desktop/${file}-desktop.png"
    diff="styling-baseline/visual-diff/desktop/diff-${file}-desktop.png"
    
    if [ -f "$before" ] && [ -f "$after" ]; then
        result=$(compare -metric AE -fuzz 1% "$before" "$after" "$diff" 2>&1)
        total=$((total + 1))
        
        if [ "$result" = "0" ]; then
            echo "   ✅ $file-desktop: IDENTICAL"
            identical=$((identical + 1))
            rm -f "$diff"
        else
            echo "   🔄 $file-desktop: $result pixels different"
            different=$((different + 1))
        fi
    else
        echo "   ❌ $file-desktop: Missing files"
    fi
done

echo ""
echo "📱 Mobile Screenshots:"
echo "---------------------"

for file in about blog business-acquisition-finance commercial-property-finance contact equipment-finance home-loans homepage invoice-trade-finance services-overview success-stories vehicle-finance working-capital-finance; do
    before="styling-baseline/before-refactor/mobile/${file}-mobile.png"
    after="styling-baseline/after-phase-1/mobile/${file}-mobile.png"
    diff="styling-baseline/visual-diff/mobile/diff-${file}-mobile.png"
    
    if [ -f "$before" ] && [ -f "$after" ]; then
        result=$(compare -metric AE -fuzz 1% "$before" "$after" "$diff" 2>&1)
        total=$((total + 1))
        
        if [ "$result" = "0" ]; then
            echo "   ✅ $file-mobile: IDENTICAL"
            identical=$((identical + 1))
            rm -f "$diff"
        else
            echo "   🔄 $file-mobile: $result pixels different"
            different=$((different + 1))
        fi
    else
        echo "   ❌ $file-mobile: Missing files"
    fi
done

echo ""
echo "⚡ Interactive States:"
echo "--------------------"

for file in button-primary-default button-primary-hover button-secondary-default button-secondary-hover card-service-default card-service-hover card-success-story-default card-success-story-hover form-field-default form-field-focused navigation-header-default navigation-header-sticky navigation-mobile-menu-closed; do
    before="styling-baseline/before-refactor/interactive-states/${file}.png"
    after="styling-baseline/after-phase-1/interactive-states/${file}.png"
    diff="styling-baseline/visual-diff/interactive-states/diff-${file}.png"
    
    if [ -f "$before" ] && [ -f "$after" ]; then
        result=$(compare -metric AE -fuzz 1% "$before" "$after" "$diff" 2>&1)
        total=$((total + 1))
        
        if [ "$result" = "0" ]; then
            echo "   ✅ $file: IDENTICAL"
            identical=$((identical + 1))
            rm -f "$diff"
        else
            echo "   🔄 $file: $result pixels different"
            different=$((different + 1))
        fi
    else
        echo "   ❌ $file: Missing files"
    fi
done

echo ""
echo "📊 FINAL RESULTS:"
echo "=================="
echo "Total Compared: $total"
echo "Identical: $identical"
echo "Different: $different"

percentage=$(( identical * 100 / total ))
echo "Success Rate: ${percentage}%"

if [ $different -eq 0 ]; then
    echo ""
    echo "🎉 PERFECT: All screenshots are identical!"
    echo "✅ Phase 1 CSS refactoring achieved zero visual changes"
elif [ $different -le 3 ]; then
    echo ""
    echo "✅ EXCELLENT: Only $different minor differences detected"
    echo "📊 Within acceptable tolerance for refactoring"
else
    echo ""
    echo "⚠️ REVIEW NEEDED: $different screenshots show differences"
    echo "🔍 Manual inspection recommended"
fi