from cryptography.fernet import Fernet
import os
import subprocess

# Cargar las variables de entorno
from dotenv import load_dotenv
load_dotenv()

# Desencriptar la contraseña
def decrypt_password():
    fernet_key = os.getenv('FERNET_KEY').encode()
    encrypted_password = os.getenv('DB_PASSWORD').encode()
    cipher_suite = Fernet(fernet_key)
    decrypted_password = cipher_suite.decrypt(encrypted_password).decode()
    return decrypted_password

# Guardar la contraseña desencriptada en un archivo
decrypted_password = decrypt_password()
with open('db_password.txt', 'w') as f:
    f.write(decrypted_password)
    
subprocess.run(["docker-compose", "up", "--build"])
