from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import re

app = Flask(__name__)

# Configure o Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Substitua pelo seu servidor SMTP
app.config['MAIL_PORT'] = 587  # Substitua por sua porta SMTP
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'LucianoDev'  # Substitua por seu e -mail
app.config['MAIL_PASSWORD'] = 'Lgb$1759%3189'  # Substitua por sua senha de e -mail
app.config['MAIL_DEFAULT_SENDER'] = 'luciano.dev.java.ee@gmail.com'  # Substitua por seu e -mail

mail = Mail(app)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Validar entradas
    if not name or not email or not message:
        return jsonify({'success': False, 'message': 'Todos os campos são necessários.'}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'success': False, 'message': 'Formato de email inválido.'}), 400

    # Crie mensagem de email
    msg = Message(subject, recipients=['your_email@example.com'])  # Substitua por seu e -mail
    msg.body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    try:
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Mensagem enviada com sucesso!'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': 'Falha ao enviar mensagem. Por favor, tente novamente mais tarde.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
