from cryptography.fernet import Fernet

class CryptoNFTeamify():
    def __init__(self, fernet_key):
        self.fernet_key = fernet_key

    def decrypt_user_id(self, user_id: str):        
        fernet = Fernet(self.fernet_key)
        
        user_id_bytes = user_id.encode()
        
        decrypted_user_id_bytes = fernet.decrypt(user_id_bytes)
        
        decrypted_user_id = decrypted_user_id_bytes.decode()

        return int(decrypted_user_id)

    def encrypt_user_id(self, user_id: int):
        fernet = Fernet(self.fernet_key)
        
        user_id_str = str(user_id)
        
        user_id_bytes = user_id_str.encode()
        
        encrypted_user_id_bytes = fernet.encrypt(user_id_bytes)
        
        encrypted_user_id = encrypted_user_id_bytes.decode()

        return encrypted_user_id