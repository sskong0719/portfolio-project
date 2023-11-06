import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

def send_email(name, email, message):
    smtp_username = os.getenv('SMTP_USERNAME')
    smtp_password = os.getenv('SMTP_PASSWORD')
    print(smtp_username)
    print(smtp_password)
    print(name)
    print(email)
    print(message)
    sender = 'skportfolioproject@gmail.com'
    recipient = 'samuelkong990719@gmail.com'

    subject = '[SKPP] New message from {} ({})'.format(name, email)
    body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

    # Connect to the SMTP server
    # SMTP configuration
    # SSL 465, TLS 587
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(smtp_username, smtp_password)

    # Compose the email
    email_message = f"Subject: {subject}\n\n{body}"

    # Send the email
    server.sendmail(sender, recipient, email_message)

    # Disconnect from the SMTP server
    server.quit()
