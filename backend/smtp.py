import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

def send_email(name, email, message):
    # SMTP configuration
    smtp_server = 'smtp.gmail.com'
    # SSL 465, TLS 587
    smtp_port = 465
    smtp_username = os.getenv('SMTP_USERNAME')
    smtp_password = os.getenv('SMTP_PASSWORD')
    sender = 'skportfolioproject@gmail.com'
    recipient = 'samuelkong990719@gmail.com'

    subject = '[SKPP] New message from {} ({})'.format(name, email)
    body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

    # Connect to the SMTP server
    server = smtplib.SMTP_SSL(smtp_server, smtp_port)
    server.login(smtp_username, smtp_password)

    # Compose the email
    email_message = f"Subject: {subject}\n\n{body}"

    # Send the email
    server.sendmail(sender, recipient, email_message)

    # Disconnect from the SMTP server
    server.quit()
