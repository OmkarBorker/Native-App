import json
import datetime
from fpdf import FPDF

# JSON data input
json_data = '''
{
    "title": "JSON to PDF Conversion",
    "content": "This is an example of a JSON file being converted to a PDF file using Python.",
    "author": "Your Name",
    "date": "2022-01-01"
}
'''

# Function to convert JSON data to PDF
def json_to_pdf(data):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Extract data from JSON
    title = data['title']
    content = data['content']
    author = data['author']
    date = data['date']

    # Write data to PDF
    pdf.cell(200, 10, txt=title, ln=1, align="C")
    pdf.cell(200, 10, txt=content, ln=2, align="L")
    pdf.cell(200, 10, txt=f"Author: {author}", ln=3, align="L")
    pdf.cell(200, 10, txt=f"Date: {date}", ln=4, align="L")

    # Save PDF
    pdf.output('output.pdf')

# Main program execution
if __name__ == "__main__":
    data = json.loads(json_data)
    json_to_pdf(data)
    print("JSON data successfully converted to PDF.")