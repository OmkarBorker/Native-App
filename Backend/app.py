import smtplib
from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from reportlab.lib.pagesizes import letter
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from reportlab.pdfgen import canvas
from PIL import Image
import io
from sqlalchemy.exc import IntegrityError
import base64
from werkzeug.security import check_password_hash, generate_password_hash


app = Flask(__name__)
app.config['ALLOWED_HOSTS'] = ['192.168.0.103']
# Configure the database connection
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:20CSE1021@NITGOA@db.poshvyujxhdsjcsvoitj.supabase.co:6543/postgres'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Omkarborker02@db.bxnpfzilplxsajvvmswg.supabase.co:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


def send_email_with_attachment(name, attachment_data):
    sender_email = "testuserspace12@gmail.com"
    receiver_email = 'doiteasy02@gmail.com'
    subject = f'{name} Pre-Screening Form PDF'
    body = 'Please find the attached PDF.'
    
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'plain'))
    
    attachment = MIMEBase('application', 'octet-stream')
    attachment.set_payload(attachment_data)
    encoders.encode_base64(attachment)
    attachment.add_header('Content-Disposition', f'attachment; filename={name}_details.pdf')
    
    msg.attach(attachment)
    
    server = smtplib.SMTP('smtp.gmail.com', 587) 
    server.ehlo()# Update SMTP server and port
    server.starttls()
    server.ehlo()
    server.login(sender_email, "tkryedvhjjxyhzte")  # Replace with your email password or use environment variables
    server.send_message(msg)
    server.quit()
    
# def generate_pdf(name, age, sex, occupation, address, history, characters, image_data):
#     # Create a PDF document in memory
#     buffer = io.BytesIO()
#     c = canvas.Canvas(buffer, pagesize=letter)
#     c.rect(0, 0, letter[0], letter[1])
#     # Set up PDF content
#     c.drawString(100, 750, f"Name: {name}")
#     c.drawString(100, 730, f"Age: {age}")
#     c.drawString(100, 710, f"Sex: {sex}")
#     c.drawString(100, 690, f"Occupation: {occupation}")
#     c.drawString(100, 670, f"Address: {address}")
#     c.drawString(100, 650, f"History: {history}")
#     c.drawString(100, 630, f"Snellen's Chart Input: {characters}")
    
#     # Decode the base64 image data and embed it in the PDF
#     image_data_bytes = base64.b64decode(image_data)
#     image_filename = f"./generated_pdfs/{name}_image.jpg"
#     with open(image_filename, 'wb') as image_file:
#         image_file.write(image_data_bytes)
#     c.drawString(100,610,"Image of Eye")
#     c.drawImage(image_filename, 100, 400, width=200, height=200)
    
#     c.save()
#     pdf_data = buffer.getvalue()
#     buffer.close()
#     return pdf_data
def generate_pdf(name, age, sex, occupation, address, history, character1,character2, image_data1, image_data2):
    # Create a PDF document in memory
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    print(letter[0],letter[1])
    # Draw a border around the page
    
    c.rect(15, 15, letter[0]-30, letter[1]-30)
    c.rect(20, 20, letter[0]-40, letter[1]-672)
    c.rect(20, 792-140,letter[0]-40,letter[1]-672)
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(letter[0] / 2, letter[1] - 60, "Innovease India Private Limited")
    
    c.setFont("Helvetica", 14)
    c.drawCentredString(letter[0] / 2, letter[1] - 90, "Pre-screening app report")
    # Set up PDF content
    def draw_label_and_variable(x, y,offset, label, variable):
        c.setFont("Helvetica-Bold",12)
        c.drawString(x, y, f"{label}:")
        c.setFont("Helvetica", 12)
        c.drawString(x + offset, y, f"{variable}")
    def draw_label_and_Snellen(x, y,offset, label1, label2, variable1,variable2):
        c.setFont("Helvetica-Bold",12)
        c.drawCentredString(letter[0]/2,512,"Snellens's Chart Data")
        c.drawString(x, y, f"{label1}:")
        c.setFont("Helvetica", 12)
        c.drawString(x + offset, y, f"{variable1}")
        c.setFont("Helvetica-Bold",12)
        c.drawString(x + 2*offset -10 , y, f"{label2}:")
        c.setFont("Helvetica", 12)
        c.drawString(x + 3*offset, y, f"{variable2}")
    def split_text(text, max_width):
        lines = []
        current_line = ""
        words = text.split()
        for word in words:
            if c.stringWidth(current_line + word, "Helvetica", 12) < max_width:
                current_line += word + " "
            else:
                lines.append(current_line.strip())
                current_line = word + " "
        lines.append(current_line.strip())
        return lines 
    draw_label_and_variable((letter[0]-400)/2 +155, 632, 40,"Name",name)
    draw_label_and_variable(letter[0]/2-400/2 + 165, 612, 30, "Age" ,age)
    draw_label_and_variable((letter[0]-400)/2 +165, 592, 30, "Sex", sex)
    draw_label_and_variable((letter[0]-400)/2 +120, 572, 75,"Occupation" ,occupation)
    draw_label_and_variable((letter[0]-400)/2 +137.5, 552, 55.5,"Address", address)
    draw_label_and_variable((letter[0]-400)/2 +145, 532, 50,"History",history)
    draw_label_and_Snellen((letter[0]-400)/2 +110, 492, 50 ,"left eye","right eye" ,character1,character2)
    
    # Decode the base64 image data and embed it in the PDF
    file_path = f"./generated_pdfs/{name}.pdf"
    image_data_bytes = base64.b64decode(image_data1)
    image_filename = f"./generated_pdfs/{name}_image.jpg"
    image_data_bytes2 = base64.b64decode(image_data2)
    image_filename2 = f"./generated_pdfs/{name}_image2.jpg"
    with open(image_filename, 'wb') as image_file:
        image_file.write(image_data_bytes)
    with open(image_filename2, 'wb') as image_file:
        image_file.write(image_data_bytes2)
    c.drawCentredString(letter[0]/2,472,"Image of Left Eye and Right Eye")
    c.drawImage(image_filename, letter[0]/4-50, 280, width=150, height=150)
    c.drawImage(image_filename2, letter[0]/4+200, 280, width=150, height=150)
    c.setFillColorRGB(1, 0, 0)  # Set text color to red
    c.setFont("Helvetica-Oblique", 12)  # Set font to italic with size 10
    # Draw text in the top rectangle
    text = "Enetracare provides portable, easy to use, 24x 7, reliable pre screening test report."
    text_width = c.stringWidth(text)
    c.drawCentredString(letter[0] / 2, 20 + 792-140 + 5, text)
    
    # Draw text in the bottom rectangle
    text = (
"The report IS NOT MEANT FOR MEDICOLEGAL PURPOSES."
"THE REPORT DOES NOT LABEL YOU AS A patient with Cataract."
"FOR DETAILED DIAGNOSIS AND MANAGEMENT, A CONSULTATION WITH AN OPHTHALMOLOGIST IS A MUST." 
)
    text_width = 400  # Adjust as needed
    text_height = 400  # Adjust as needed
    x = (letter[0] - text_width) / 2
    y = (letter[1] - text_height) / 2

    def draw_text_with_overflow(text, x, y, width, height, line_spacing=14):
        lines = []
        line = ''
        for word in text.split():
            test_line = line + word + ' '
            if c.stringWidth(test_line) < width:
                line = test_line
            else:
                lines.append(line.strip())
                line = word + ' '
        lines.append(line.strip())

        # Drawing lines within the provided height
        max_lines = int(height / line_spacing)
        lines_to_draw = lines[:max_lines]

        for i, line in enumerate(lines_to_draw):
            c.drawString(x, y - i * line_spacing, line)

    
    draw_text_with_overflow(text, x, -280 + text_height, text_width, text_height)
    c.setFillColorRGB(0,0,0)
    c.drawString((letter[0] - text_width) / 2,60,"Help us in eliminating cataract related avoidable blindness.")
    c.drawString((letter[0] - text_width) / 2,40,"Join our mission ")
    c.showPage()
    
    # Page 2
    # Set fonts and content for the new page
    c.setFont("Helvetica-Bold", 16)
    c.drawString(40,letter[1]-40,"General Information on Cataract")
    c.setFont("Helvetica",14)
    c.rect(15, 15, letter[0]-30, letter[1]-30)
    # Add information in bullet point form
    bullet_points = [
        "As you age, the lenses in your eyes become less flexible, less clear, and thicker. Aging and some medical conditions can cause proteins and fibres within the lenses to break down and clump together. This is what causes the clouding in the lenses.",
        "As the cataract grows, the clouding becomes worse. A cataract scatters and blocks the light as it passes through the lens. This prevents a sharply defined image from reaching your retina. As a result, your vision becomes blurred.",
        "Cataracts usually happen in both eyes, but not always at the same rate. The cataract in one eye may be worse than the other. This causes a difference in vision between eyes.",
        "The most common cause of cataract is degenerative changes due to the ageing process. With age, proteins in the natural lens degenerate, resulting in a clouded lens called a cataract. There might be other causes such as:",
        "   • Health conditions like diabetes, kidney disease, glaucoma, smoking, eye injuries, infection, and inflammation inside the eye",
        "   • Prolonged use of certain medications can also lead to cataract formation",
        "   • Cataract may also occur in children due to genetic or metabolic defect or due to infection and trauma",
        "If you have cataract, you may experience some or all of the following symptoms.",
        "   • Cloudy vision",
        "   • Colours of objects may appear faded",
        "   • Poor eyesight at night",
        "   • Difficulty in driving at night, especially because of the glare of lights",
        "   • Difficulty in reading in dim light",
        "   • Coloured haloes",
        "   • You may see multiple images or double images",
        "To deal with symptoms of cataracts until you decide to have surgery, try to:",
        "   • Make sure your prescription for your eyeglasses or contact lenses is up to date.",
        "   • Improve the lighting in your home with more or brighter lamps.",
        "   • Wear sunglasses or a broad-brimmed hat to reduce glare during the day.",
        "   • Limit driving at night.",
        "Self-care measures may help for a while, but your vision may get worse as the cataract grows. When vision loss starts to affect your everyday activities, consider cataract surgery"
    ]
    bullet_point_spacing = 16
    max_width = letter[0] - 200  # Adjusted width to fit within the rectangle
    current_height = letter[1] - 60
    # Draw bullet points
    def draw_bullet_point(text, x, y):
        c.drawString(x, y, f" {text}")

    for point in bullet_points:
        lines = split_text(point, max_width)
        for line in lines:
            draw_bullet_point(line, 40, current_height)
            current_height -= bullet_point_spacing
    c.showPage()
    
    # Page 2
    # Set fonts and content for the new page
    c.setFont("Helvetica-Bold", 16)
    c.drawString(40,letter[1]-40,"Preparing for your appointment")
    c.setFont("Helvetica",14)
    c.rect(15, 15, letter[0]-30, letter[1]-30)
    
    bullet_points = [
        "Make an appointment with your eye care professional if you notice changes in your vision. If they determine that you have cataracts, then you may be referred to an eye specialist who can perform cataract surgery.",
        "If you need cataract surgery in both eyes, your doctor will schedule surgery to remove the cataract Cataract surgery involves removing the clouded lens and replacing it with a clear artificial lens.",
        "The artificial lens, called an intraocular lens, is put in the same place as your natural lens. It remains a permanent part of your eye.",

        "Prevention",
        "No studies have proved how to prevent or slow the growth of cataracts. But health care professionals think several strategies may be helpful, including:",
        "•	Regular eye exams.",
        "•	Do not smoke. ",
        "•	Manage other health problems",
        "•	Choose a healthy diet that includes plenty of fruits and vegetables."
    ]
    bullet_point_spacing = 16
    max_width = letter[0] - 200  # Adjusted width to fit within the rectangle
    current_height = letter[1] - 60
    # Draw bullet points
    def draw_bullet_point(text, x, y):
        c.drawString(x, y, f" {text}")

    for point in bullet_points:
        lines = split_text(point, max_width)
        for line in lines:
            draw_bullet_point(line, 40, current_height)
            current_height -= bullet_point_spacing
    c.rect(20, 20, letter[0]-40, letter[1]-672)
    text = (
        "Enetracare provides portable, easy to use, 24x 7, reliable pre screening device that provides information on status of crystalline lens. It can quickly determine cataract in all age groups."

        "In addition to traditional cataract diagnostics, the Enetracare gives information and the need for earlier management including surgical intervention."
    ) 
    text_width = 500  # Adjust as needed
    text_height = 400  # Adjust as needed
    x = (letter[0] - text_width) / 2
    y = (letter[1] - text_height) / 3
    draw_text_with_overflow(text, x, -280 + text_height, text_width, text_height)
    c.save()
    pdf_data = buffer.getvalue()
    buffer.close()
    with open(file_path, 'wb') as pdf_file:
        pdf_file.write(pdf_data)
    return pdf_data
# Define the model for the User_Data table
class User_Data(db.Model):
    __tablename__ = 'User_Data'
    Username = db.Column(db.String(50), primary_key=True)
    Password = db.Column(db.String(50), nullable=True)
    Name = db.Column(db.String(100), nullable=True)
    id_document = db.Column(db.LargeBinary, nullable=True)

# Route to insert data into the User_Data table
@app.route('/authenticate', methods=['POST'])
def authenticate():
    try:
        username = request.form['username']
        password = request.form['password']
        print(username)
        # Fetch user from the database based on the provided username
        user = User_Data.query.filter_by(Username=username).first()
        # print(user)
        if user and user.Password == password:
        # if user and check_password_hash(user.Password, password):
            # Authentication successful
            return jsonify({'message': 'Authentication successful'}), 200
        else:
            # Invalid credentials
            return jsonify({'error': 'Invalid credentials'}), 401

    except KeyError as e:
        return jsonify({'error': f'Missing required field: {e}'}), 400
    except Exception as e:
        return jsonify({'error': f'Error authenticating user: {str(e)}'}), 500

@app.route('/insert_data', methods=['POST'])
def insert_data():
    try:
        new_user = User_Data(
            Username=request.form['phone_number'],
            Password=request.form['password'],
            Name=request.form['name'],
            id_document=request.form['id_document'].encode('utf-8') if request.form['id_document'] else None
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User added successfully!'}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing required field: {e}'}), 400
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Username already exists!'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error adding user: {str(e)}'}), 500

@app.route('/process_form', methods=['POST'])
def process_form():
    if request.method == 'POST':
        form_data = request.json  # Assuming the data is sent as JSON
        name = form_data.get('name')
        age = form_data.get('age')
        sex = form_data.get('sex')
        occupation = form_data.get('occupation')
        address = form_data.get('address')
        history = form_data.get('history')
        characters1 = form_data.get('characters1')
        characters2 = form_data.get('characters2') 
        image_data1 = form_data.get('image')  # Image data received as base64
        image_data2 = form_data.get('image2')  # Image data received as base64
        
        # Perform data validation and PDF generation
        if not (name and age and sex and occupation and address and characters1 and image_data1):
            return jsonify({'error': 'Please provide all required fields including the image.'}), 400
        
        # Generate PDF using ReportLab
        pdf_data = generate_pdf(name, age, sex, occupation, address, history, characters1,characters2, image_data1,image_data2)
        send_email_with_attachment(name, pdf_data)
        # pdf_filename = f"{name}_details.pdf"
        # pdf_path = f"./generated_pdfs/{pdf_filename}"  # Adjust the path as needed
        
        # # Create a PDF document
        # c = canvas.Canvas(pdf_path, pagesize=letter)
        # c.drawString(100, 750, f"Name: {name}")
        # c.drawString(100, 730, f"Age: {age}")
        # c.drawString(100, 710, f"Sex: {sex}")
        # c.drawString(100, 690, f"Occupation: {occupation}")
        # c.drawString(100, 670, f"Address: {address}")
        # c.drawString(100, 650, f"History: {history}")
        # c.drawString(100, 630, f"Snellen's Chart Input: {characters}")
        
        # # Decode the base64 image data and save it in PDF
        # image_data_bytes = base64.b64decode(image_data)
        # image_filename = f"./generated_pdfs/{name}_image.jpg"
        # with open(image_filename, 'wb') as image_file:
        #     image_file.write(image_data_bytes)
        # c.drawString(100,570,"Image of Eye")
        # c.drawImage(image_filename, 100, 300, width=200, height=200)
        
        # c.save()
        return 'successful'
if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=False)
me