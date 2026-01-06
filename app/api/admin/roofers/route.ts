/**
 * Admin API for managing roofers
 * GET: List all roofers with full data
 * POST: Update roofer fields (isPreferred, isHidden, googleBusinessUrl)
 */

import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { rooferData } from '@/app/roofers/data/roofers';

const ROOFERS_FILE_PATH = join(process.cwd(), 'app', 'roofers', 'data', 'roofers.ts');

export async function GET() {
  try {
    // Return ALL roofers including hidden ones for admin
    const roofers = Object.values(rooferData);
    return NextResponse.json({
      roofers: roofers.map(r => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        phone: r.phone,
        email: r.email,
        websiteUrl: r.websiteUrl,
        googleBusinessUrl: (r as any).googleBusinessUrl,
        isPreferred: r.isPreferred,
        isHidden: r.isHidden,
        category: (r as any).category || 'general', // Default to 'general' if not set
        city: (r as any).city,
        state: (r as any).state,
        serviceAreas: r.serviceAreas,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to load roofers', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roofers: updates } = body;

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected array of roofer updates.' },
        { status: 400 }
      );
    }

    // Read the current roofer file
    let content = readFileSync(ROOFERS_FILE_PATH, 'utf-8');

    // Update each roofer
    for (const update of updates) {
      const {
        slug,
        phone,
        email,
        websiteUrl,
        isPreferred,
        isHidden,
        googleBusinessUrl,
        category,
        serviceAreas,
      } = update;

      if (!slug) continue;

      // Helper function to update a field in a roofer object
      const updateRooferField = (fieldName: string, value: any, valueType: 'boolean' | 'string' = 'boolean') => {
        const escapedSlug = slug.replace(/'/g, "\\'");
        const rooferStartPattern = new RegExp(
          `('${escapedSlug}':\\s*\\{)`,
          's'
        );
        
        const match = content.match(rooferStartPattern);
        if (match && match.index !== undefined) {
          const startIndex = match.index + match[0].length;
          // Find the matching closing brace for this roofer object
          let braceCount = 1;
          let i = startIndex;
          let inString = false;
          let stringChar = '';
          
          while (i < content.length && braceCount > 0) {
            const char = content[i];
            const prevChar = i > 0 ? content[i - 1] : '';
            
            // Handle string literals
            if (!inString && (char === '"' || char === "'")) {
              inString = true;
              stringChar = char;
            } else if (inString && char === stringChar && prevChar !== '\\') {
              inString = false;
            }
            
            // Count braces only when not in a string
            if (!inString) {
              if (char === '{') braceCount++;
              if (char === '}') braceCount--;
            }
            
            i++;
          }
          
          const rooferSection = content.substring(startIndex, i - 1);
          
          // Find and replace field in this section
          // The file uses unquoted property names (isPreferred: false,)
          // But we'll also handle quoted names for compatibility
          let fieldPattern: RegExp | null = null;
          let replacement: string | null = null;
          let found = false;
          
          if (valueType === 'boolean') {
            // Try unquoted first (current format): isPreferred: false,
            fieldPattern = new RegExp(`\\b${fieldName}:\\s*(true|false)(,?)`);
            const match = rooferSection.match(fieldPattern);
            if (match) {
              found = true;
              // Preserve the comma if it was there, otherwise add one
              const hasComma = match[2] === ',';
              replacement = `${fieldName}: ${value}${hasComma ? ',' : ''}`;
            } else {
              // Try quoted: "isPreferred": false,
              fieldPattern = new RegExp(`"${fieldName}":\\s*(true|false)(,?)`);
              const quotedMatch = rooferSection.match(fieldPattern);
              if (quotedMatch) {
                found = true;
                const hasComma = quotedMatch[2] === ',';
                replacement = `"${fieldName}": ${value}${hasComma ? ',' : ''}`;
              }
            }
          } else {
            // String values - try unquoted first: category: "sponsored",
            // Handle cases with optional blank lines before the field
            fieldPattern = new RegExp(`(\\s|\\n)*${fieldName}:\\s*"([^"]*)"(,?)`, 'm');
            const match = rooferSection.match(fieldPattern);
            if (match) {
              found = true;
              const hasComma = match[3] === ',';
              // Preserve the whitespace/blank lines before the field
              const whitespace = match[1] || '';
              replacement = `${whitespace}${fieldName}: "${value || ''}"${hasComma ? ',' : ''}`;
            } else {
              // Try quoted: "category": "sponsored",
              fieldPattern = new RegExp(`(\\s|\\n)*"${fieldName}":\\s*"([^"]*)"(,?)`, 'm');
              const quotedMatch = rooferSection.match(fieldPattern);
              if (quotedMatch) {
                found = true;
                const hasComma = quotedMatch[3] === ',';
                const whitespace = quotedMatch[1] || '';
                replacement = `${whitespace}"${fieldName}": "${value || ''}"${hasComma ? ',' : ''}`;
              }
            }
          }
          
          if (found && fieldPattern && replacement) {
            // Replace only the first match (not global) to avoid multiple replacements
            fieldPattern.lastIndex = 0; // Reset regex
            const updatedSection = rooferSection.replace(fieldPattern, replacement);
            
            // Clean up any stray commas that might have been created
            let cleanedSection = updatedSection.replace(/,\s*,/g, ','); // Remove double commas
            cleanedSection = cleanedSection.replace(/,\s*\n\s*,/g, ','); // Remove comma on its own line followed by comma
            cleanedSection = cleanedSection.replace(/^\s*,\s*$/gm, ''); // Remove lines with only a comma
            
            content = content.substring(0, startIndex) + cleanedSection + content.substring(i - 1);
            return true;
          } else {
            // If field doesn't exist, add it before the closing brace
            // Try to find isHidden and add category after it
            const isHiddenPattern = new RegExp(`(isHidden):\\s*(true|false)(,?)(\\s*\\n?)`, 'm');
            const isHiddenMatch = rooferSection.match(isHiddenPattern);
            
            if (isHiddenMatch && isHiddenMatch.index !== undefined) {
              // Insert after isHidden - ensure isHidden has a comma, then add category
              const indent = '    '; // Match typical indentation
              const fieldValue = valueType === 'boolean' 
                ? `${value}`
                : `"${value || ''}"`;
              // Get the isHidden line and ensure it ends with a comma
              const isHiddenLine = isHiddenMatch[0];
              const isHiddenTrimmed = isHiddenLine.trimEnd();
              const hasComma = isHiddenTrimmed.endsWith(',');
              // Create the replacement: isHidden with comma + newline + category field
              const isHiddenWithComma = hasComma ? isHiddenTrimmed : isHiddenTrimmed + ',';
              const newField = `\n${indent}${fieldName}: ${fieldValue}`;
              const updatedRooferSection = rooferSection.substring(0, isHiddenMatch.index) + 
                isHiddenWithComma + newField + 
                rooferSection.substring(isHiddenMatch.index + isHiddenMatch[0].length);
              content = content.substring(0, startIndex) + updatedRooferSection + content.substring(i - 1);
            } else {
              // Fallback: insert before closing brace
              const insertIndex = i - 2; // Before the closing brace
              const indent = '    '; // Match typical indentation
              const fieldValue = valueType === 'boolean' 
                ? `${value}`
                : `"${value || ''}"`;
              const newField = `,\n${indent}${fieldName}: ${fieldValue}`;
              content = content.substring(0, insertIndex) + newField + content.substring(insertIndex);
            }
            return true;
          }
        }
        return false;
      };
      
      // Update isPreferred if provided
      if (isPreferred !== undefined) {
        const success = updateRooferField('isPreferred', isPreferred, 'boolean');
        if (!success) {
          console.warn(`Failed to update isPreferred for roofer: ${slug}`);
        }
      }

      // Update isHidden if provided
      if (isHidden !== undefined) {
        const success = updateRooferField('isHidden', isHidden, 'boolean');
        if (!success) {
          console.warn(`Failed to update isHidden for roofer: ${slug}`);
          throw new Error(`Roofer with slug "${slug}" not found in file`);
        }
      }

      // Update googleBusinessUrl if provided
      if (googleBusinessUrl !== undefined) {
        const success = updateRooferField('googleBusinessUrl', googleBusinessUrl, 'string');
        if (!success) {
          console.warn(`Failed to update googleBusinessUrl for roofer: ${slug}`);
        }
      }

      // Update category if provided
      if (category !== undefined) {
        const success = updateRooferField('category', category, 'string');
        if (!success) {
          console.warn(`Failed to update category for roofer: ${slug}`);
          // Don't throw error, just log it - category is optional
        }
      }

      // Update phone if provided
      if (phone !== undefined) {
        const success = updateRooferField('phone', phone, 'string');
        if (!success) {
          console.warn(`Failed to update phone for roofer: ${slug}`);
        }
      }

      // Update email if provided
      if (email !== undefined) {
        const success = updateRooferField('email', email, 'string');
        if (!success) {
          console.warn(`Failed to update email for roofer: ${slug}`);
        }
      }

      // Update websiteUrl if provided
      if (websiteUrl !== undefined) {
        const success = updateRooferField('websiteUrl', websiteUrl, 'string');
        if (!success) {
          console.warn(`Failed to update websiteUrl for roofer: ${slug}`);
        }
      }

      // Update serviceAreas if provided (this is an object with arrays)
      if (serviceAreas !== undefined) {
        const escapedSlug = slug.replace(/'/g, "\\'");
        const rooferStartPattern = new RegExp(
          `('${escapedSlug}':\\s*\\{)`,
          's'
        );
        
        const match = content.match(rooferStartPattern);
        if (match && match.index !== undefined) {
          const startIndex = match.index + match[0].length;
          // Find the matching closing brace for this roofer object
          let braceCount = 1;
          let i = startIndex;
          let inString = false;
          let stringChar = '';
          
          while (i < content.length && braceCount > 0) {
            const char = content[i];
            const prevChar = i > 0 ? content[i - 1] : '';
            
            // Handle string literals
            if (!inString && (char === '"' || char === "'")) {
              inString = true;
              stringChar = char;
            } else if (inString && char === stringChar && prevChar !== '\\') {
              inString = false;
            }
            
            // Count braces only when not in a string
            if (!inString) {
              if (char === '{') braceCount++;
              if (char === '}') braceCount--;
            }
            
            i++;
          }
          
          const rooferSection = content.substring(startIndex, i - 1);
          
          // Format serviceAreas object
          const regionsArray = (serviceAreas.regions || []).map((r: string) => `'${r}'`).join(', ');
          const countiesArray = (serviceAreas.counties || []).map((c: string) => `'${c}'`).join(', ');
          const citiesArray = (serviceAreas.cities || []).map((c: string) => `'${c}'`).join(', ');
          
          const serviceAreasValue = `{\n      regions: [${regionsArray ? regionsArray : ''}],\n      counties: [${countiesArray ? countiesArray : ''}],\n      cities: [${citiesArray ? citiesArray : ''}]\n    }`;
          
          // Try to find and replace existing serviceAreas (need to handle nested braces)
          const serviceAreasStart = rooferSection.indexOf('serviceAreas:');
          if (serviceAreasStart !== -1) {
            // Find the start of the serviceAreas value (after the colon)
            let serviceAreaValueStart = serviceAreasStart + 'serviceAreas:'.length;
            // Skip whitespace
            while (serviceAreaValueStart < rooferSection.length && /\s/.test(rooferSection[serviceAreaValueStart])) {
              serviceAreaValueStart++;
            }
            
            // Now find the matching closing brace for the serviceAreas object
            let areaBraceCount = 0;
            let areaI = serviceAreaValueStart;
            let areaInString = false;
            let areaStringChar = '';
            
            if (rooferSection[areaI] === '{') {
              areaBraceCount = 1;
              areaI++;
              
              while (areaI < rooferSection.length && areaBraceCount > 0) {
                const char = rooferSection[areaI];
                const prevChar = areaI > 0 ? rooferSection[areaI - 1] : '';
                
                if (!areaInString && (char === '"' || char === "'")) {
                  areaInString = true;
                  areaStringChar = char;
                } else if (areaInString && char === areaStringChar && prevChar !== '\\') {
                  areaInString = false;
                }
                
                if (!areaInString) {
                  if (char === '{') areaBraceCount++;
                  if (char === '}') areaBraceCount--;
                }
                
                areaI++;
              }
              
              // Replace the serviceAreas object
              const beforeServiceAreas = rooferSection.substring(0, serviceAreasStart);
              const afterServiceAreas = rooferSection.substring(areaI);
              const updatedSection = beforeServiceAreas + `serviceAreas: ${serviceAreasValue}` + afterServiceAreas;
              content = content.substring(0, startIndex) + updatedSection + content.substring(i - 1);
            }
          } else {
            // Add serviceAreas before the closing brace or after isHidden
            const isHiddenPattern = /isHidden:\s*(true|false)(,?)/;
            const isHiddenMatch = rooferSection.match(isHiddenPattern);
            
            if (isHiddenMatch && isHiddenMatch.index !== undefined) {
              const insertIndex = isHiddenMatch.index + isHiddenMatch[0].length;
              const hasComma = isHiddenMatch[2] === ',';
              const indent = '    ';
              const newField = `${hasComma ? '' : ','}\n${indent}serviceAreas: ${serviceAreasValue}`;
              const updatedSection = 
                rooferSection.substring(0, insertIndex) + 
                newField + 
                rooferSection.substring(insertIndex);
              content = content.substring(0, startIndex) + updatedSection + content.substring(i - 1);
            } else {
              // Fallback: insert before closing brace
              const insertIndex = i - 2;
              const indent = '    ';
              const newField = `,\n${indent}serviceAreas: ${serviceAreasValue}`;
              content = content.substring(0, insertIndex) + newField + content.substring(insertIndex);
            }
          }
        }
      }
    }

    // Clean up any stray commas that might have been created
    // Remove lines that contain only a comma (with optional whitespace)
    content = content.replace(/^\s*,\s*$/gm, '');
    // Remove double commas
    content = content.replace(/,\s*,/g, ',');
    // Remove comma followed by newline and then comma
    content = content.replace(/,\s*\n\s*,/g, ',');

    // Validate the updated content before writing
    // Check for balanced braces (basic validation)
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      throw new Error(`File structure corrupted: unbalanced braces (${openBraces} open, ${closeBraces} close)`);
    }
    
    // Check that we still have the rooferData export
    if (!content.includes('export const rooferData')) {
      throw new Error('File structure corrupted: missing rooferData export');
    }
    
    // Check for stray commas (comma not followed by a property or closing brace)
    const strayCommaPattern = /,\s*\n\s*[,\}]/g;
    if (strayCommaPattern.test(content)) {
      // Clean up any remaining stray commas before closing braces
      content = content.replace(/,\s*\n\s*\}/g, '\n  }');
    }

    // Write the updated content back
    writeFileSync(ROOFERS_FILE_PATH, content, 'utf-8');

    return NextResponse.json({ success: true, message: 'Roofers updated successfully' });
  } catch (error: any) {
    console.error('Error updating roofers:', error);
    return NextResponse.json(
      { error: 'Failed to update roofers', message: error.message },
      { status: 500 }
    );
  }
}









