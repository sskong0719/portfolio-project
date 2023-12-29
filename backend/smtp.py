import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

def send_email(name, email, message):
    # SMTP configuration
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465  # SSL port
    smtp_username = os.getenv('SMTP_USERNAME')
    smtp_password = os.getenv('SMTP_PASSWORD')
    sender = 'skportfolioproject@gmail.com'
    recipient = 'samuelkong990719@gmail.com'

    # Email subject
    subject = '[SKPP] New message from {} ({})'.format(name, email)

    # Create a multipart message and set headers
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # Add body to email with UTF-8 encoding
    body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    # Connect to the SMTP server
    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
        server.login(smtp_username, smtp_password)
        server.send_message(msg)  # send_message automatically encodes the message

    # No need to explicitly quit with the 'with' statement
