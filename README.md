# Certificate Generator

An interactive, canvas-based certificate generation tool that allows users to create personalized certificates by uploading Excel data and PNG templates, then drawing text fields directly on the certificate canvas for precise positioning.

## 🌟 Features

- **Interactive Canvas Drawing**: Draw rectangular text fields directly on your certificate template
- **Excel Data Integration**: Upload XLSX files and automatically populate certificate fields
- **Smart Field Mapping**: Automatically detects and maps Excel columns (especially "name" field with auto-capitalization)
- **Custom Text Fields**: Add static text that appears on all certificates
- **Real-time Preview**: See exactly how text will appear as you draw and configure fields
- **Font Customization**: Choose from multiple fonts, sizes, and colors for each text field
- **Visual Overlays**: See positioned fields with colored overlays for easy management
- **Bulk PDF Generation**: Generate individual PDF certificates for each Excel row
- **ZIP Download**: Download all certificates in a single ZIP file

## 🛠️ How It Works

1. **Upload Files**: Load your PNG certificate template and XLSX data file
2. **Draw Text Fields**: Click and drag on the canvas to draw rectangular areas where text should appear
3. **Configure Fields**: Set field name, font, size, and color for each drawn area
4. **Map Data**: Match field names to Excel column headers or enter custom text
5. **Generate**: Create PDF certificates for all Excel rows and download as ZIP

## 🎯 Key Features Explained

### Canvas Drawing System
- **Click & Drag**: Draw rectangular areas on your certificate template
- **Minimum Size**: Fields must be at least 50x50 pixels to be valid
- **Visual Feedback**: Blue outline appears while drawing
- **Save Confirmation**: Popup asks if you want to save each drawn field

### Field Configuration
- **Field Name**: Either match an Excel column header exactly or enter custom text
- **Font Options**: Times New Roman, Great Vibes, Pacifico, Dancing Script, Alex Brush
- **Font Size**: Range from 20 to 150 pixels
- **Font Color**: Full color picker for any color choice

### Smart Data Handling
- **Name Capitalization**: The "name" field automatically capitalizes names properly
- **Empty Data Handling**: Gracefully handles missing data in Excel rows
- **Column Matching**: Exact match required between field names and Excel headers

## 📋 File Requirements

### Excel File (.xlsx)
- **Format**: Must be .xlsx (not .xls or .csv)
- **Size**: Under 5MB recommended
- **Structure**: Headers in first row, data in subsequent rows
- **Example**:
  ```
  | name          | course            | date       | instructor    |
  |---------------|-------------------|------------|---------------|
  | john doe      | Web Development   | 2024-01-15 | Jane Smith    |
  | alice johnson | Python Basics     | 2024-01-20 | Bob Wilson    |
  ```

### Certificate Template (.png)
- **Format**: PNG images only
- **Size**: Under 5MB, high resolution recommended
- **Quality**: Use high-resolution images for better PDF output

## 🚀 Step-by-Step Usage

### 1. Initial Setup
1. Open the certificate generator in your web browser
2. Upload your PNG certificate template using "Choose File"
3. Upload your XLSX data file using the Excel upload button

### 2. Creating Text Fields
1. **Draw Field**: Click and drag on the canvas to create a rectangular text area
2. **Configure Field**: 
   - Enter field name (e.g., "name", "course", "date") or custom text
   - Select font type from dropdown
   - Set font size (20-150 pixels)
   - Choose font color
3. **Save Field**: Click "Yes" in the confirmation popup to save the field

### 3. Field Management
- **Visual Overlays**: Saved fields appear as colored rectangles with labels
- **Delete Fields**: Double-click on any overlay to remove a field
- **Multiple Fields**: Create as many fields as needed

### 4. Generate Certificates
1. Click "Generate Certificates" button
2. System validates that you have:
   - Uploaded Excel file
   - Uploaded certificate template  
   - Created at least one valid text field
3. Enter ZIP file name when prompted
4. Download the generated ZIP file containing all PDF certificates

## 🎨 Font Options

The generator includes several beautiful fonts perfect for certificates:

- **Times New Roman**: Classic, professional serif font
- **Great Vibes**: Elegant script font for formal certificates
- **Pacifico**: Friendly, casual script font
- **Dancing Script**: Flowing cursive font
- **Alex Brush**: Handwritten brush script style

## ⚙️ Technical Details

### Canvas Scaling
- Maintains aspect ratio of original image
- Automatically scales overlays to match canvas display size
- Preserves exact positioning for PDF generation

### PDF Generation
- Creates individual PDF for each Excel row
- Maintains original image resolution and quality
- Automatic orientation detection (landscape/portrait)
- Uses jsPDF library for reliable PDF creation

### Data Processing
- Processes Excel files using SheetJS (xlsx.js)
- Stops processing at first completely empty row
- Handles undefined/null values gracefully

## 🔧 Advanced Tips

### Field Naming Strategy
- Use exact Excel column headers for dynamic data
- Common field names: "name", "course", "date", "instructor"
- For static text, enter the exact text you want to appear

### Font Size Guidelines
- **Names**: 80-120px typically works well
- **Course Titles**: 60-100px
- **Dates**: 40-80px
- **Small Text**: 30-60px

### Template Design Tips
- Leave adequate white space for text
- Use contrasting colors for better text visibility
- Test with longest expected names/text
- Consider certificate orientation (landscape vs portrait)

## 🐛 Troubleshooting

### Common Issues

**"Upload an Excel file first!"**
- Make sure you've selected and uploaded a .xlsx file
- File must be under 5MB

**"Upload a certificate image first!"**
- Upload a PNG image file
- Ensure image is not corrupted

**"Save Atleast a Valid Section or Text!"**
- Draw at least one text field on the canvas
- Make sure drawn area is at least 50x50 pixels
- Confirm the field in the popup dialog

**Fields not appearing correctly:**
- Check that field names match Excel column headers exactly
- Verify font color contrasts with certificate background
- Ensure text fits within drawn boundaries

**PDF quality issues:**
- Use higher resolution certificate templates
- Avoid excessive font sizes that may cause overflow

## 📁 Project Structure

```
Certificate_Gen/
├── index.html              # Main application interface
├── script.js              # Complete application logic  
├── styles.css             # Stylesheet (not shown)
├── images/
│   └── CertGen.svg        # Application logo
└── README.md             # This documentation
```

## 🔗 Dependencies

The application uses these CDN libraries:
- **XLSX.js** (v0.18.5): Excel file processing
- **JSZip** (v3.10.1): ZIP file creation
- **jsPDF** (v2.5.1): PDF generation
- **FileSaver.js** (v2.0.5): File download functionality
- **Google Fonts**: Font loading for certificate text

## 💡 Usage Examples

### Basic Certificate Fields
1. **Name Field**: Draw area, enter "name" as field name
2. **Course Field**: Draw area, enter "course" as field name  
3. **Date Field**: Draw area, enter "date" as field name

### Custom Text Fields
1. **Static Title**: Draw area, enter "Certificate of Completion"
2. **Organization**: Draw area, enter "XYZ Training Institute"
3. **Signature Line**: Draw area, enter "Director Signature"

### Mixed Approach
- Combine Excel data fields ("name", "course") with static text ("Presented to", "For successful completion of")

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🚀 Future Development

### Upcoming Features
- **Template Designer**: Create and customize certificate templates from scratch
- **Design Library**: Save, manage, and reuse your custom templates
- **Advanced Text Effects**: Shadows, outlines, gradients, and text styling
- **Shape & Graphics**: Add borders, logos, icons, and decorative elements
- **Bulk Email Integration**: Automatically send certificates to recipients via email
