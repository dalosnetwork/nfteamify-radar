import sqlite3
import random
import hashlib
import requests

class SQL():
    def __init__(self):
        conn = sqlite3.connect('nfteamify.db')
        c = conn.cursor()

        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                score INTEGER DEFAULT 0
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS promo_code (
                user_id INTEGER,
                code TEXT,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS crypto_key (
                fernet TEXT
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS user_details (
                user_id INTEGER,
                balance INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS packages (
                package_type TEXT PRIMARY KEY,
                price INTEGER
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS users_players (
                user_id INTEGER,
                player_id INTEGER,
                is_locked INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS sale_player (
                player_id INTEGER,
                price INTEGER,
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS first_elevens (
                user_id INTEGER,
                first_eleven TEXT,
                lock_team INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS players (
                player_id INTEGER PRIMARY KEY,
                name TEXT,
                age INTEGER,
                race TEXT,
                position TEXT,
                GK INTEGER DEFAULT 0,
                DEF INTEGER DEFAULT 0,
                MD INTEGER DEFAULT 0,
                FRW INTEGER DEFAULT 0,
                Overall INTEGER DEFAULT 0,
                number INTEGER
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS history (
                user_id INTEGER,
                last_eleven TEXT,
                is_win INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS user_asset (
                user_id INTEGER,
                asset_name TEXT,
                price INTEGER,
                level INTEGER DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS prices (
                user_id INTEGER,
                player_id INTEGER,
                GK INTEGER DEFAULT 0,
                DEF INTEGER DEFAULT 0,
                MD INTEGER DEFAULT 0,
                FRW INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS missions (
            mission_id INTEGER PRIMARY KEY,
            mission_name TEXT NOT NULL,
            mission_link TEXT NOT NULL,
            reward INTEGER NOT NULL
        )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS missions_completed (
            user_id INTEGER NOT NULL,
            mission_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, mission_id),
            FOREIGN KEY (mission_id) REFERENCES missions(mission_id)
        )
        ''')

        c.execute('''
            CREATE TABLE IF NOT EXISTS user_wallet (
            user_id INTEGER NOT NULL,
            wallet_address TEXT,
            wallet_balance FLOAT
        )
        ''')

        conn.commit()
        conn.close()

    def user_balance(self, user_id: int):
        try:
            conn = sqlite3.connect('nfteamify.db')
            c = conn.cursor()
            c.execute("SELECT wallet_address, wallet_balance FROM user_wallet WHERE user_id = ?", (user_id,))
            result = c.fetchone()
            if result:
                return {"wallet_address": result[0], "wallet_balance": result[1]}
            else:
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False
        finally:
            conn.close()        

    def buy_point(self, user_id: int):
        # Veritabanı bağlantısını aç
        conn = sqlite3.connect('nfteamify.db')
        c = conn.cursor()

        try:
            # Kullanıcının cüzdan bakiyesini kontrol et
            c.execute('''
                SELECT wallet_balance FROM user_wallet WHERE user_id = ?
            ''', (user_id,))
            result = c.fetchone()

            if result:
                wallet_balance = result[0]
                # Kullanıcının cüzdan bakiyesi 0.1 veya fazlaysa
                if wallet_balance >= 0.1:
                    # Cüzdan bakiyesini 0.1 azalt
                    new_wallet_balance = wallet_balance - 0.1
                    c.execute('''
                        UPDATE user_wallet SET wallet_balance = ? WHERE user_id = ?
                    ''', (new_wallet_balance, user_id))

                    # Kullanıcının user_details tablosundaki balance değerini 1000 arttır
                    c.execute('''
                        UPDATE user_details SET balance = balance + 1000 WHERE user_id = ?
                    ''', (user_id,))

                    # Değişiklikleri kaydet
                    conn.commit()
                    return True
                else:
                    print("Yetersiz bakiye. Kullanıcının cüzdanında yeterli bakiye yok.")
                    return False
            else:
                print("Kullanıcı bulunamadı.")
                return False
        finally:
            # Veritabanı bağlantısını kapat
            conn.close()


    def insert_into_user_wallet(self, user_id: int, wallet_address: str):
        conn = sqlite3.connect('nfteamify.db')
        try:
            c = conn.cursor()

            # Veriyi ekle
            c.execute('INSERT INTO user_wallet (user_id, wallet_address) VALUES (?, ?)', (user_id, wallet_address))
            conn.commit()
            
            return True
        except sqlite3.Error as e:
            return False
        finally:
            conn.close()

    def insert_into_users(self, user_id: int):
        conn = sqlite3.connect('nfteamify.db')
        try:
            c = conn.cursor()

            c.execute('SELECT user_id FROM users WHERE user_id = ?', (user_id,))
            result = c.fetchone()
            line_up = "0|0|0|0|0|0|0|0|0|0|0"
            if result is None:
                c.execute('INSERT INTO users (user_id, score) VALUES (?, 0)', (user_id,))
                c.execute('INSERT INTO first_elevens VALUES (?, ?, 0)', (user_id, line_up))
                c.execute('INSERT INTO user_asset VALUES (?, "STADIUM", 0, 250)', (user_id,))
                c.execute('INSERT INTO user_details VALUES (?, 10000)', (user_id,))
                conn.commit()
                return True
            else:
                return False
        finally:
            conn.close()

    def insert_into_promo_code(self, promo_code: str, user_id: int):
        conn = sqlite3.connect('nfteamify.db')
        c = conn.cursor()

        c.execute('SELECT code FROM promo_code WHERE code = ?', (promo_code,))
        result = c.fetchone()

        if result is not None:
            c.execute('SELECT user_id FROM promo_code WHERE code = ?', (promo_code,))
            result = c.fetchone()
            
            if result[0] is None:
                c.execute('UPDATE promo_code SET user_id = ? WHERE code = ?', (user_id, promo_code))
                conn.commit()

                return True
            else:
                return False
        else:
            return False

        conn.close()

    def get_fernet_key(self):
        conn = sqlite3.connect('nfteamify.db')
        c = conn.cursor()

        c.execute('SELECT fernet FROM crypto_key')
        result = c.fetchone()

        if result:
            fernet_key_bytes = result[0].encode()
            return fernet_key_bytes
        else:
            return None

        conn.close()

    def get_package(self):
        conn = sqlite3.connect('nfteamify.db')
        c = conn.cursor()

        c.execute('SELECT rowid, package_type, price, color, description FROM packages ORDER BY price ASC')
        packages = c.fetchall()

        packages_list = [{"id": package[0], "package": package[1], "price": package[2], "color": package[3], "description": package[4]} for package in packages]

        conn.close()

        return packages_list

    def increase_pool_prize(self, amount):
        # Veritabanı bağlantısını aç
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # Mevcut pool_prize değerini al
        cursor.execute("SELECT pool_prize FROM prizes LIMIT 1")
        pool_prize = cursor.fetchone()

        if pool_prize is not None:
            # Yeni değeri hesapla
            new_prize = pool_prize[0] + amount

            # pool_prize değerini güncelle
            cursor.execute("UPDATE prizes SET pool_prize = ? WHERE 1=1", (new_prize,))
            conn.commit()
        else:
            print("Hata: pool_prize değeri bulunamadı.")

        # Veritabanı bağlantısını kapat
        conn.close()

    def add_random_player(self, package_type, user_id):
        conn = sqlite3.connect('nfteamify.db')
        c = conn.cursor()

        # Mevcut en yüksek player_id'yi bul
        c.execute('SELECT MAX(player_id) FROM players')
        max_id = c.fetchone()[0]
        if max_id is None:
            max_id = 0

        # Ülkelere göre isim ve soyisimler
        name_dict = {
        'Argentina': (["Santiago", "Mateo", "Thiago", "Lautaro", "Joaquin", "Agustín", "Francisco", "Juan", "Lucas", "Benjamín", 
                    "Valentín", "Federico", "Martín", "Facundo", "Tomás", "Julian", "Luciano", "Ignacio", "Ezequiel", "Nicolás"], 
                    ["Gonzalez", "Fernandez", "Martinez", "Lopez", "Perez", "Rodriguez", "Gomez", "Diaz", "Alvarez", "Sosa", 
                    "Torres", "Ramirez", "Flores", "Romero", "Ortiz", "Vargas", "Benitez", "Herrera", "Morales", "Castro"]),
        'Brazil': (["Joao", "Gabriel", "Lucas", "Matheus", "Pedro", "Felipe", "Gustavo", "Thiago", "Henrique", "Rafael", 
                    "Bruno", "Leandro", "Fernando", "Eduardo", "Rodrigo", "Vitor", "André", "Caio", "Victor", "Samuel"], 
                ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Lima", "Costa", "Almeida", "Cardoso", "Gomes", 
                    "Barbosa", "Mendes", "Rocha", "Freitas", "Carvalho", "Araujo", "Ferreira", "Ribeiro", "Nogueira", "Vieira"]),
        'Chile': (["Benjamín", "Vicente", "Matías", "Joaquín", "Martín", "Tomás", "Emilio", "Simón", "Felipe", "Cristóbal", 
                "Lucas", "Andrés", "Nicolás", "Ignacio", "Rodrigo", "Sebastián", "Gonzalo", "Pablo", "Leonardo", "Esteban"], 
                ["Gutiérrez", "Muñoz", "Rojas", "Jiménez", "Pino", "Pérez", "Soto", "Castillo", "Cárdenas", "Figueroa", 
                "Araya", "Lagos", "Vega", "Mendoza", "Valenzuela", "Cruz", "Morales", "Salazar", "Navarrete", "Sepúlveda"]),
        'Colombia': (["Sebastián", "Nicolás", "Alejandro", "Mateo", "Daniel", "Camilo", "Juan", "David", "Miguel", "Carlos", 
                    "Andrés", "Luis", "Santiago", "Tomás", "Felipe", "Cristian", "Julián", "Manuel", "Fabian", "Leonardo"], 
                    ["Rodríguez", "Gómez", "Martínez", "García", "Ramírez", "Torres", "Cruz", "Díaz", "Suárez", "Moreno", 
                    "Pérez", "Soto", "Vargas", "Castaño", "Ríos", "López", "Barrera", "Hernández", "Murillo", "Montoya"]),
        'Germany': (["Hans", "Franz", "Jürgen", "Karl", "Friedrich", "Wolfgang", "Heinrich", "Peter", "Manfred", "Gerhard", 
                    "Stefan", "Michael", "Johann", "Bernd", "Matthias", "Ulrich", "Günter", "Andreas", "Otto", "Rainer"], 
                    ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Becker", "Wagner", "Hoffmann", "Schulz", "Koch", 
                    "Bauer", "Richter", "Klein", "Wolf", "Zimmermann", "Schwarz", "Krüger", "Neumann", "Schroeder", "Hartmann"]),
        'France': (["Pierre", "Louis", "Hugo", "Arthur", "Léo", "Maxime", "Antoine", "Alexandre", "Charles", "Théo", 
                    "Gabriel", "Baptiste", "Julien", "Quentin", "Lucas", "Thomas", "Paul", "Nicolas", "Clement", "Victor"], 
                ["Dupont", "Martin", "Bernard", "Petit", "Moreau", "Lefebvre", "Leroy", "Roux", "Fournier", "Gautier", 
                    "Dupuis", "Girard", "Mercier", "Blanc", "Bonnet", "Masson", "Robin", "Fabre", "Renaud", "Garnier"]),
        'England': (["John", "William", "James", "George", "Henry", "Thomas", "Edward", "Arthur", "Richard", "Charles", 
                    "Joseph", "Frederick", "David", "Robert", "Albert", "Alfred", "Francis", "Harry", "Samuel", "Oliver"], 
                    ["Smith", "Johnson", "Brown", "Williams", "Taylor", "Davies", "Evans", "Thomas", "Wilson", "Roberts", 
                    "Walker", "Harris", "Lewis", "Clark", "Wood", "Baker", "Harrison", "Turner", "Hill", "Green"]),
        'Italy': (["Marco", "Luca", "Giovanni", "Francesco", "Matteo", "Alessandro", "Stefano", "Riccardo", "Davide", "Andrea", 
                "Gabriele", "Leonardo", "Antonio", "Simone", "Giuseppe", "Federico", "Michele", "Tommaso", "Emanuele", "Vincenzo"], 
                ["Rossi", "Bianchi", "Ferrari", "Esposito", "Romano", "Colombo", "Ricci", "Marino", "Greco", "Conti", 
                "De Luca", "Gallo", "Costa", "Giordano", "Bruno", "Rizzo", "Lombardi", "Barbieri", "Vitale", "Mancini"]),
        'Spain': (["Carlos", "Javier", "Alejandro", "Manuel", "Diego", "David", "Alberto", "Raúl", "Miguel", "Pablo", 
                "Eduardo", "Francisco", "Antonio", "José", "Álvaro", "Sergio", "Ignacio", "Ramón", "Juan", "Roberto"], 
                ["García", "Martínez", "Rodríguez", "Sánchez", "Ramírez", "Hernández", "López", "Pérez", "González", "Díaz", 
                "Torres", "Flores", "Ortega", "Vargas", "Moreno", "Castro", "Cruz", "Fernández", "Rubio", "Santos"]),
        'Nigeria': (["Emeka", "Chinedu", "Tunde", "Olumide", "Obinna", "Chibueze", "Ifeanyi", "Kelechi", "Uche", "Chukwuemeka", 
                    "Babatunde", "Segun", "Kunle", "Adeola", "Tobi", "Femi", "Chika", "Oluwaseun", "Nnamdi", "Ebuka"], 
                    ["Okafor", "Adebayo", "Ibrahim", "Eze", "Olawale", "Chukwu", "Nwachukwu", "Akinyemi", "Okeke", "Ogunleye", 
                    "Chima", "Afolabi", "Agbaje", "Olowokere", "Ezeani", "Osimhen", "Ajayi", "Obi", "Balogun", "Onyeka"]),
        'Japan': (["Hiroshi", "Yuki", "Takeshi", "Kenji", "Satoshi", "Shota", "Ryu", "Masashi", "Kenta", "Takashi", 
                "Kazuya", "Kazuki", "Haruto", "Daichi", "Kaito", "Shin", "Yoshihiro", "Tatsuya", "Kouji", "Shun"], 
                ["Tanaka", "Yamamoto", "Kobayashi", "Sato", "Nakamura", "Yamada", "Matsumoto", "Inoue", "Kimura", "Shimizu", 
                "Hayashi", "Ito", "Fujita", "Sakai", "Morita", "Kudo", "Kaneko", "Suzuki", "Ogawa", "Takagi"]),
        'Turkey': (["Ahmet", "Mehmet", "Emre", "Mert", "Ali", "Mustafa", "Fatih", "Hüseyin", "İbrahim", "Oğuz", 
                    "Burak", "Volkan", "Serkan", "Can", "Barış", "Eren", "Osman", "Hakan", "Kadir", "Uğur"], 
                ["Yılmaz", "Kaya", "Demir", "Çelik", "Şahin", "Öztürk", "Aydın", "Kara", "Aksoy", "Erdoğan", 
                    "Çetin", "Arslan", "Şimşek", "Turan", "Erdem", "Koç", "Kurt", "Özdemir", "Polat", "Aslan"]),
        'default': (["John", "Alex", "Chris", "Michael", "David", "Robert", "Daniel", "Paul", "Mark", "Steven", 
                    "Anthony", "Brian", "Jason", "Kevin", "Eric", "Matthew", "Joshua", "Andrew", "Nathan", "Jonathan"], 
                    ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", 
                    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"])
        }

        # Rastgele ülke seçimi
        race = random.choice([
            'ar', 'br', 'cl', 'co', 'cr', 'cu', 'ec', 'sv', 'hn', 'mx', 'py', 'pe', 'uy', 've',
    'al', 'at', 'be', 'bg', 'hr', 'cz', 'dk', 'gb-eng', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'is', 'ie', 'it',
    'lv', 'lt', 'lu', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'rs', 'sk', 'si', 'es', 'se', 'ch', 'tr',
    'ao', 'cm', 'eg', 'gh', 'ci', 'ma', 'ng', 'sn', 'za', 'tn', 'dz',
    'au', 'ir', 'iq', 'il', 'jp', 'jo', 'kp', 'sa', 'kr', 'qa'
        ])

        # Ülkeye göre isim ve soyisim seçimi
        if race in name_dict:
            first_names, last_names = name_dict[race]
        else:
            first_names, last_names = name_dict['default']

        first_name = random.choice(first_names)
        last_name = random.choice(last_names)

        # Yeni oyuncu için player_id
        player_id = max_id + 1
        name = f"{first_name} {last_name}"
        age = random.randint(16, 40)
        position = random.choice(['GK', 'DEF', 'MD', 'FRW'])

        if package_type == 'BRONZE':
            self.increase_pool_prize(250) # Dinamik yap
            if position == "GK":
                GK = random.randint(50, 70)
                DEF = random.randint(40, GK - 5)
                MD = random.randint(30, DEF - 5)
                FRW = random.randint(20, MD - 5)
                Overall = GK
            elif position == "DEF":
                DEF = random.randint(50, 70)
                MD = random.randint(40, DEF - 5)
                FRW = random.randint(30, MD - 5)
                GK = random.randint(20, FRW - 5)
                Overall = int(((DEF * 0.8) + (MD * 0.2)) / (0.8 + 0.2))
            elif position == "MD":
                MD = random.randint(50, 70)
                DEF = random.randint(40, MD - 5)
                FRW = random.randint(30, DEF - 5)
                GK = random.randint(20, FRW - 5)
                Overall = int(((DEF * 0.1) + (MD * 0.8) + (FRW * 0.1)) / (0.8 + 0.1 + 0.1))
            else:
                FRW = random.randint(50, 70)
                MD = random.randint(40, FRW - 5)
                DEF = random.randint(30, MD - 5)
                GK = random.randint(20, DEF - 5)
                Overall = int(((FRW * 0.8) + (MD * 0.2)) / (0.8 + 0.2))
        elif package_type == 'SILVER':
            self.increase_pool_prize(750) # Dinamik yap
            if position == "GK":
                GK = random.randint(71, 80)
                DEF = random.randint(60, GK - 5)
                MD = random.randint(50, DEF - 5)
                FRW = random.randint(40, MD - 5)
                Overall = GK
            elif position == "DEF":
                DEF = random.randint(71, 80)
                MD = random.randint(60, DEF - 5)
                FRW = random.randint(50, MD - 5)
                GK = random.randint(40, FRW - 5)
                Overall = int(((DEF * 0.8) + (MD * 0.2)) / (0.8 + 0.2))
            elif position == "MD":
                MD = random.randint(71, 80)
                DEF = random.randint(60, MD - 5)
                FRW = random.randint(50, DEF - 5)
                GK = random.randint(40, FRW - 5)
                Overall = int(((DEF * 0.1) + (MD * 0.8) + (FRW * 0.1)) / (0.8 + 0.1 + 0.1))
            else:
                FRW = random.randint(71, 80)
                MD = random.randint(60, FRW - 5)
                DEF = random.randint(50, MD - 5)
                GK = random.randint(40, DEF - 5)
                Overall = int(((FRW * 0.8) + (MD * 0.2)) / (0.8 + 0.2))
        elif package_type == 'GOLD':
            self.increase_pool_prize(2000) # Dinamik yap
            if position == "GK":
                GK = random.randint(81, 99)
                DEF = random.randint(70, GK - 5)
                MD = random.randint(60, DEF - 5)
                FRW = random.randint(50, MD - 5)
                Overall = GK
            elif position == "DEF":
                DEF = random.randint(81, 99)
                MD = random.randint(70, DEF - 5)
                FRW = random.randint(60, MD - 5)
                GK = random.randint(50, FRW - 5)
                Overall = int(((DEF * 0.8) + (MD * 0.2)) / (0.8 + 0.2))
            elif position == "MD":
                MD = random.randint(81, 99)
                DEF = random.randint(70, MD - 5)
                FRW = random.randint(60, DEF - 5)
                GK = random.randint(50, FRW - 5)
                Overall = int(((DEF * 0.1) + (MD * 0.8) + (FRW * 0.1)) / (0.8 + 0.1 + 0.1))
            else:
                FRW = random.randint(81, 99)
                MD = random.randint(70, FRW - 5)
                DEF = random.randint(60, MD - 5)
                GK = random.randint(50, DEF - 5)
                Overall = int(((FRW * 0.8) + (MD * 0.2)) / (0.8 + 0.2))
        
        number = random.randint(1, 99)

        c.execute('''
            INSERT INTO players (player_id, name, age, race, position, GK, DEF, MD, FRW, Overall, number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (player_id, name, age, race, position, GK, DEF, MD, FRW, Overall, number))

        c.execute('''
            INSERT INTO users_players (user_id, player_id, is_locked)
            VALUES (?, ?, 0)
        ''', (user_id, player_id))

        c.execute('''
            INSERT INTO prices (user_id, player_id, GK, DEF, MD, FRW)
            VALUES (?, ?, 100, 100, 100, 100)
        ''', (user_id, player_id))

        conn.commit()
        conn.close()
        
        return {"name": name,
                "age": age,
                "race": race,
                "position": position,
                "GK": GK,
                "DEF": DEF,
                "MD": MD,
                "FRW": FRW,
                "Overall": Overall,
                "number": number}
        

    def buy_package(self, package_type, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        query = """
        UPDATE user_details
        SET balance = balance - (
            SELECT price FROM packages WHERE package_type = ?
        )
        WHERE user_id = ? AND balance >= (
            SELECT price FROM packages WHERE package_type = ?
        );
        """
        
        cursor.execute(query, (package_type, user_id, package_type))
        conn.commit()
        conn.close()
        
        if cursor.rowcount > 0:
            player = self.add_random_player(package_type, user_id)
            result = True

            return {"status": True, "data": [player]}
        else:
            player = None
            result = False

            return {"status": False}
        
    def sell_player(self, player_id, price, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        try:
            # Step 1: Update users_players to set is_locked to 1
            update_query = """
            UPDATE users_players
            SET is_locked = 1
            WHERE user_id = ? AND player_id = ?
            """
            cursor.execute(update_query, (user_id, player_id))
            
            if cursor.rowcount == 0:
                conn.rollback()
                return False
            
            # Step 2: Insert into sale_player
            insert_query = """
            INSERT INTO sale_player (player_id, price, user_id)
            VALUES (?, ?, ?)
            """
            cursor.execute(insert_query, (player_id, price, user_id))
            
            if cursor.rowcount == 0:
                conn.rollback()
                return False
            
            # Step 3: Update first_elevens to replace player_id with 0
            select_first_eleven_query = """
            SELECT first_eleven
            FROM first_elevens
            WHERE user_id = ?
            """
            cursor.execute(select_first_eleven_query, (user_id,))
            first_eleven_result = cursor.fetchone()
            
            if first_eleven_result:
                first_eleven = first_eleven_result[0]
                updated_first_eleven = '|'.join(['0' if int(x) == player_id else x for x in first_eleven.split('|')])
                
                update_first_eleven_query = """
                UPDATE first_elevens
                SET first_eleven = ?
                WHERE user_id = ?
                """
                cursor.execute(update_first_eleven_query, (updated_first_eleven, user_id))
                
                if cursor.rowcount == 0:
                    conn.rollback()
                    return False
            
            conn.commit()
            return True
        
        except Exception as e:
            conn.rollback()
            print(f"Error: {e}")
            return False
        
        finally:
            conn.close()


    def callback_from_sale(self, player_id, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        # İlk olarak silinen kayıtları al
        select_query = """
        SELECT user_id, player_id FROM sale_player
        WHERE user_id = ? AND player_id = ?
        """
        cursor.execute(select_query, (user_id, player_id))
        deleted_rows = cursor.fetchall()
        
        # Silme işlemini gerçekleştir
        delete_query = """
        DELETE FROM sale_player
        WHERE user_id = ? AND player_id = ?
        """
        cursor.execute(delete_query, (user_id, player_id))
        
        # Silinen kayıtlar varsa update işlemini gerçekleştir
        if deleted_rows:
            update_query = """
            UPDATE users_players
            SET is_locked = 0
            WHERE user_id = ? AND player_id = ?
            """
            cursor.execute(update_query, (user_id, player_id))
        
        conn.commit()
        
        # Güncellenen satır sayısını kontrol et
        result = cursor.rowcount > 0
        
        conn.close()
        return result

    def buy_from_market(self, player_id, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        try:
            # İlk olarak satıcıyı ve fiyatı almak için sorgu
            select_query = """
            SELECT user_id AS seller_id, price
            FROM sale_player
            WHERE player_id = ?
            """
            cursor.execute(select_query, (player_id,))
            result = cursor.fetchone()
            
            if not result:
                conn.close()
                return False
            
            seller_id, price = result
            
            # sale_player tablosundan kaydı sil
            delete_sale_query = """
            DELETE FROM sale_player
            WHERE player_id = ?
            """
            cursor.execute(delete_sale_query, (player_id,))
            
            # user_details tablosunda bakiyeyi güncelle
            update_balance_query = """
            UPDATE user_details
            SET balance = CASE
                WHEN user_id = ?
                    THEN balance - ?
                WHEN user_id = ?
                    THEN balance + ?
            END
            WHERE user_id IN (?, ?)
            """
            cursor.execute(update_balance_query, (user_id, price, seller_id, price, user_id, seller_id))
            
            # users_players tablosundan kaydı sil
            delete_user_player_query = """
            DELETE FROM users_players
            WHERE user_id = ? AND player_id = ?
            """
            cursor.execute(delete_user_player_query, (seller_id, player_id))
            
            # users_players tablosuna yeni kaydı ekle
            insert_user_player_query = """
            INSERT INTO users_players (user_id, player_id, is_locked)
            VALUES (?, ?, 0)
            """
            cursor.execute(insert_user_player_query, (user_id, player_id))

            # prices tablosunda user_id'yi güncelle
            update_prices_query = """
            UPDATE prices
            SET user_id = ?
            WHERE player_id = ?
            """
            cursor.execute(update_prices_query, (user_id, player_id))

            conn.commit()
            
            # Güncellenen veya eklenen satır sayısını kontrol et
            result = cursor.rowcount > 0

        except sqlite3.Error as e:
            print(f"Database error: {e}")
            result = False
        finally:
            conn.close()

        return result


    def check_players(self, player_id_list, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # Sale_player tablosunda olup olmadığını kontrol et
        placeholders = ','.join(['?'] * len(player_id_list))
        
        query = f"""
        SELECT player_id
        FROM sale_player
        WHERE player_id IN ({placeholders});
        """
        
        cursor.execute(query, player_id_list)
        sale_player_results = cursor.fetchall()
        
        # Eğer herhangi bir player_id sale_player tablosunda varsa False döndür
        if sale_player_results:
            conn.close()
            return False

        # Geçerli player_id'leri belirle (0 olanlar hariç)
        valid_player_ids = [player_id for player_id in player_id_list if player_id != '0']
        # Eğer valid player_id yoksa True döndür
        if not valid_player_ids:
            conn.close()
            return True

        # user_id'ye karşılık gelen player_id'leri kontrol et
        placeholders = ','.join(['?'] * len(valid_player_ids))
        
        query = f"""
        SELECT player_id 
        FROM users_players 
        WHERE user_id = ? 
        AND player_id IN ({placeholders});
        """
        
        cursor.execute(query, [user_id] + valid_player_ids)
        user_player_results = cursor.fetchall()
        
        # Dönen sonuçları bir listeye sakla
        user_player_ids = [row[0] for row in user_player_results]
        
        # Her bir player_id'nin user_id'ye ait olup olmadığını kontrol et
        for player_id in valid_player_ids:
            if (int(player_id) not in user_player_ids) and player_id != 0:
                conn.close()
                return False

        conn.close()
        return True


    def update_first_eleven(self, player_id_list, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        query = """
        UPDATE first_elevens
        SET first_eleven = ?
        WHERE user_id = ?;
        """
        
        cursor.execute(query, (player_id_list, user_id))
        conn.commit()
        
        # Check if the update was successful
        if cursor.rowcount > 0:
            result = True
        else:
            result = False
        
        conn.close()
        return result

    def lock_team(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        # İlk olarak first_eleven listesini al
        cursor.execute("SELECT first_eleven FROM first_elevens WHERE user_id = ?", (user_id,))
        first_eleven_data = cursor.fetchone()
        
        if not first_eleven_data:
            conn.close()
            return False
        
        first_eleven = first_eleven_data[0]
        if not first_eleven:
            conn.close()
            return False

        player_ids = first_eleven.split('|')
        
        # first_elevens tablosunda lock_team'i güncelle
        query = """
        UPDATE first_elevens
        SET lock_team = 1
        WHERE user_id = ? AND first_eleven IS NOT NULL;
        """
        
        cursor.execute(query, (user_id,))
        conn.commit()
        
        # first_eleven'daki player_id'leri users_players tablosunda güncelle
        placeholders = ','.join(['?'] * len(player_ids))
        update_query = f"""
        UPDATE users_players
        SET is_locked = 1
        WHERE user_id = ? AND player_id IN ({placeholders});
        """
        
        cursor.execute(update_query, [user_id] + player_ids)
        conn.commit()
        
        # Check if any row was updated
        result = cursor.rowcount > 0
        
        conn.close()
        return result

    def unlock_team(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        # Öncelikle first_eleven listesi alınır
        cursor.execute("SELECT first_eleven FROM first_elevens WHERE user_id = ?", (user_id,))
        first_eleven_data = cursor.fetchone()
        
        if not first_eleven_data:
            conn.close()
            return False

        first_eleven = first_eleven_data[0]
        player_ids = first_eleven.split('|')

        # Sale_player tablosunda olup olmadığını kontrol et
        placeholders = ','.join(['?'] * len(player_ids))
        
        query = f"""
        SELECT player_id
        FROM sale_player
        WHERE player_id IN ({placeholders});
        """
        
        cursor.execute(query, player_ids)
        sale_player_results = cursor.fetchall()
        
        # Sale_player tablosunda olan player_id'leri listede sakla
        sale_player_ids = [str(row[0]) for row in sale_player_results]
        
        # Kilidi açılacak player_id'leri belirle
        unlockable_player_ids = [player_id for player_id in player_ids if player_id not in sale_player_ids]

        if not unlockable_player_ids:
            conn.close()
            return False  # Eğer kilidi açılacak oyuncu yoksa işlemi sonlandır

        # Unlock işlemi için sorguyu hazırla ve çalıştır
        placeholders = ','.join(['?'] * len(unlockable_player_ids))
        
        query = f"""
        UPDATE users_players
        SET is_locked = 0
        WHERE user_id = ?
        AND player_id IN ({placeholders});
        """
        
        cursor.execute(query, [user_id] + unlockable_player_ids)
        conn.commit()
        
        # first_elevens tablosunda lock_team'i güncelle
        query = """
        UPDATE first_elevens
        SET lock_team = 0
        WHERE user_id = ?;
        """
        
        cursor.execute(query, (user_id,))
        conn.commit()
        
        result = cursor.rowcount > 0
        conn.close()
        return result


    def upgrade_player(self, player_id, skill, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # SQL sorguları
        query_price_check = f"""
            SELECT {skill} AS price 
            FROM prices 
            WHERE user_id = ? AND player_id = ?
        """
        
        query_balance_check = """
            SELECT balance 
            FROM user_details 
            WHERE user_id = ? 
            AND balance >= ?
        """
        
        query_age_check = """
            SELECT age 
            FROM players 
            WHERE player_id = ?
        """
        
        query_update_players = f"""
            UPDATE players
            SET {skill} = CASE
                WHEN ? BETWEEN 16 AND 20 THEN {skill} + 3
                WHEN ? BETWEEN 21 AND 26 THEN {skill} + 2
                WHEN ? BETWEEN 27 AND 35 THEN {skill} + 1
                ELSE {skill}
            END
            WHERE player_id = ?
        """
        
        query_update_balance = """
            UPDATE user_details
            SET balance = balance - ?
            WHERE user_id = ?
        """
        
        query_update_prices = f"""
            UPDATE prices
            SET {skill} = {skill} * 2
            WHERE user_id = ?
            AND player_id = ?
        """
        
        try:
            # Step 1: Get the price
            cursor.execute(query_price_check, (user_id, player_id))
            price_result = cursor.fetchone()
            if not price_result:
                conn.close()
                return False

            price = price_result[0]

            # Step 2: Check balance
            cursor.execute(query_balance_check, (user_id, price))
            balance_result = cursor.fetchone()
            if not balance_result:
                conn.close()
                return False

            balance = balance_result[0]

            # Step 3: Get age
            cursor.execute(query_age_check, (player_id,))
            age_result = cursor.fetchone()
            if not age_result:
                conn.close()
                return False

            age = age_result[0]

            # Step 4: Update player
            cursor.execute(query_update_players, (age, age, age, player_id))
            if cursor.rowcount == 0:
                conn.close()
                return False

            # Step 5: Update balance
            cursor.execute(query_update_balance, (price, user_id))
            if cursor.rowcount == 0:
                conn.close()
                return False

            # Step 6: Update prices
            cursor.execute(query_update_prices, (user_id, player_id))
            if cursor.rowcount == 0:
                conn.close()
                return False

            conn.commit()
            return True
        
        except Exception as e:
            conn.rollback()
            print(f"Error: {e}")
            return False
        
        finally:
            conn.close()


    def update_user_asset(self, asset_name, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # SQL sorgusu
        query = f"""
        WITH 
        asset_check AS (
            SELECT price, level 
            FROM user_asset 
            WHERE user_id = ? AND asset_name = ?
        ),
        balance_check AS (
            SELECT balance 
            FROM user_details 
            WHERE user_id = ? 
            AND balance >= (SELECT price FROM asset_check)
        ),
        updated_asset AS (
            UPDATE user_asset
            SET level = level + 1,
                price = price * 2
            WHERE user_id = ? AND asset_name = ?
            RETURNING asset_name
        ),
        updated_balance AS (
            UPDATE user_details
            SET balance = balance - (SELECT price FROM asset_check)
            WHERE user_id = ?
            AND EXISTS (SELECT 1 FROM updated_asset)
            RETURNING user_id
        )
        SELECT EXISTS(SELECT 1 FROM updated_balance) AS success;
        """

        cursor.execute(query, (user_id, asset_name, user_id, user_id, asset_name, user_id))
        conn.commit()

        # Check if the final update was successful
        result = cursor.fetchone()[0] == 1

        conn.close()
        return result

    def get_all_deck(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        query = """
        SELECT 
            p.player_id, p.name, p.age, p.race, p.position, p.GK, p.DEF, p.MD, p.FRW, p.Overall, p.number, up.is_locked,
            pr.GK, pr.DEF, pr.MD, pr.FRW, 
            CASE WHEN sp.player_id IS NOT NULL THEN 1 ELSE 0 END AS is_sale
        FROM 
            users_players up
        JOIN 
            players p ON up.player_id = p.player_id
        LEFT JOIN 
            prices pr ON p.player_id = pr.player_id
        LEFT JOIN
            sale_player sp ON p.player_id = sp.player_id
        WHERE 
            up.user_id = ?
        """
        
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()
        
        conn.close()
        
        # Veriyi sözlük formatında döndür
        result_dict = []
        for row in result:
            player_dict = {
                "player_id": row[0],
                "name": row[1],
                "age": row[2],
                "race": row[3],
                "position": row[4],
                "GK": row[5],
                "DEF": row[6],
                "MD": row[7],
                "FRW": row[8],
                "Overall": row[9],
                "number": row[10],
                "is_locked": row[11],
                "prices": {
                    "GK": row[12],
                    "DEF": row[13],
                    "MD": row[14],
                    "FRW": row[15]
                },
                "is_sale": bool(row[16])
            }
            result_dict.append(player_dict)
        
        return result_dict



    def get_all_market_players(self):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        query = """
        SELECT 
            p.player_id, p.name, p.age, p.race, p.position, p.GK, p.DEF, p.MD, p.FRW, p.Overall, p.number, sp.price
        FROM 
            sale_player sp
        JOIN 
            players p ON sp.player_id = p.player_id
        """
        
        cursor.execute(query)
        result = cursor.fetchall()
        
        conn.close()
        
        # Veriyi sözlük formatında döndür
        result_dict = []
        for row in result:
            player_dict = {
                "player_id": row[0],
                "name": row[1],
                "age": row[2],
                "race": row[3],
                "position": row[4],
                "GK": row[5],
                "DEF": row[6],
                "MD": row[7],
                "FRW": row[8],
                "Overall": row[9],
                "number": row[10],
                "price": row[11]
            }
            result_dict.append(player_dict)
        
        return result_dict


    def line_up(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT first_eleven, lock_team FROM first_elevens WHERE user_id = ?", (user_id,))
        first_eleven_data = cursor.fetchone()
        
        if not first_eleven_data:
            return []

        first_eleven, lock_team = first_eleven_data
        player_ids = first_eleven.split('|')

        # Convert player_ids to integers and handle '0' correctly
        player_ids = [int(pid) if pid != '0' else 0 for pid in player_ids]

        # Remove '0' from player_ids for the SQL query, as '0' does not represent a real player
        query_player_ids = [pid for pid in player_ids if pid != 0]

        placeholders = ','.join('?' * len(query_player_ids))

        # Prepare the query
        query = f"""
        SELECT 
            p.player_id, p.name, p.age, p.race, p.position, p.GK, p.DEF, p.MD, p.FRW, p.Overall, p.number
        FROM 
            players p
        WHERE 
            p.player_id IN ({placeholders})
        """
        
        # Execute the query and fetch results
        cursor.execute(query, query_player_ids)
        result = cursor.fetchall()

        # Close the connection
        conn.close()

        # Format the player data into a sequentially numbered format
        formatted_result = {}
        position_counter = 1  # Start from 1

        for player_id in player_ids:
            if player_id == 0:
                formatted_result[position_counter] = {
                    "position": position_counter,
                    "data": {}
                }
            else:
                player_data = next((player for player in result if player[0] == player_id), None)
                if player_data:
                    formatted_result[position_counter] = {
                        "position": position_counter,
                        "data": {
                            "player_id": player_data[0],
                            "name": player_data[1],
                            "age": player_data[2],
                            "race": player_data[3],
                            "position": player_data[4],
                            "GK": player_data[5],
                            "DEF": player_data[6],
                            "MD": player_data[7],
                            "FRW": player_data[8],
                            "Overall": player_data[9],
                            "number": player_data[10],
                            "lock_team": lock_team
                        }
                    }
                else:
                    formatted_result[position_counter] = {
                        "position": position_counter,
                        "data": {}
                    }
            position_counter += 1

        return formatted_result



    def get_username_from_user_id(self,user_id):
        url = f"https://api.telegram.org/bot6399060333:AAF21jR4E4QlNwAGyRv512FnsIimLajO5Xg/getChat"
        params = {"chat_id": user_id}
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            if data["ok"]:
                return data["result"].get("username", None)
            else:
                print(f"Error: {data['description']}")
                return None
        else:
            print(f"HTTP Error: {response.status_code}")
            return None

    def top_players(self,user_id):
        def hash_user_id(user_id):
            return hashlib.sha256(user_id.encode()).hexdigest()

        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()
        
        # İlk 10 kullanıcıyı skorlarına göre sıralama
        cursor.execute("""
        SELECT user_id, score 
        FROM users 
        WHERE user_id NOT IN (5273385507, 1334604729)
        ORDER BY score DESC 
        LIMIT 10
        """)
        top_10 = cursor.fetchall()
        
        # Belirli bir user_id'nin sırasını bulma
        cursor.execute("""
        SELECT COUNT(*) 
        FROM users 
        WHERE score > (SELECT score FROM users WHERE user_id = ?)
        """, (user_id,))
        rank = cursor.fetchone()[0] + 1
        
        # Sıralamayı hazırlama
        order = {}
        for user in top_10:
            uid = user[0]
            score = user[1]
            if uid == user_id:
                order["YOU"] = score
            else:
                username = self.get_username_from_user_id(uid)
                if username:
                    order[username] = score
                else:
                    order[hash_user_id(str(uid))] = score
        
        result = {
            "order": order,
            "user_order": rank
        }
        
        # Bağlantıyı kapat
        conn.close()
        
        return result

    def get_history(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # Get last_eleven and is_win data for the given user_id
        cursor.execute("SELECT last_eleven, is_win FROM history WHERE user_id = ?", (user_id,))
        history_data = cursor.fetchone()

        if not history_data:
            return []

        last_eleven, is_win = history_data
        player_ids = last_eleven.split('|')

        # Convert player_ids to integers and handle '0' correctly
        player_ids = [int(pid) if pid != '0' else 0 for pid in player_ids]

        # Remove '0' from player_ids for the SQL query, as '0' does not represent a real player
        query_player_ids = [pid for pid in player_ids if pid != 0]

        placeholders = ','.join('?' * len(query_player_ids))

        # Prepare the query
        query = f"""
        SELECT 
            p.player_id, p.name, p.age, p.race, p.position, p.GK, p.DEF, p.MD, p.FRW, p.Overall, p.number
        FROM 
            players p
        WHERE 
            p.player_id IN ({placeholders})
        """

        # Execute the query and fetch results
        cursor.execute(query, query_player_ids)
        result = cursor.fetchall()

        # Close the connection
        conn.close()

        # Format the player data into a sequentially numbered format
        formatted_result = {}
        position_counter = 1  # Start from 1

        for player_id in player_ids:
            if player_id == 0:
                formatted_result[position_counter] = {
                    "position": position_counter,
                    "data": {}
                }
            else:
                player_data = next((player for player in result if player[0] == player_id), None)
                if player_data:
                    formatted_result[position_counter] = {
                        "position": position_counter,
                        "data": {
                            "player_id": player_data[0],
                            "name": player_data[1],
                            "age": player_data[2],
                            "race": player_data[3],
                            "position": player_data[4],
                            "GK": player_data[5],
                            "DEF": player_data[6],
                            "MD": player_data[7],
                            "FRW": player_data[8],
                            "Overall": player_data[9],
                            "number": player_data[10],
                            "is_win": is_win
                        }
                    }
                else:
                    formatted_result[position_counter] = {
                        "position": position_counter,
                        "data": {}
                    }
            position_counter += 1

        return formatted_result


    def user_detail(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # Tek sorgu ile balance ve lock_team değerlerini al
        cursor.execute("""
        SELECT u.balance, f.lock_team
        FROM user_details u
        LEFT JOIN first_elevens f ON u.user_id = f.user_id
        WHERE u.user_id = ?
        """, (user_id,))
        
        result = cursor.fetchone()

        conn.close()

        if result:
            balance = result[0]
            lock_team = result[1]
            return {"balance": balance, "lock_team": lock_team}
        else:
            return {"balance": None, "lock_team": None}

    def get_user_missions(self, user_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # Kullanıcının tamamlamadığı görevleri almak için sorgu
        query = """
        SELECT m.mission_id, m.mission_name, m.mission_link, m.reward
        FROM missions m
        LEFT JOIN missions_completed mc ON m.mission_id = mc.mission_id AND mc.user_id = ?
        WHERE mc.mission_id IS NULL
        """
        
        cursor.execute(query, (user_id,))
        missions = cursor.fetchall()

        # Sonuçları istenen formatta döndür
        result = [{"mission_id": mission[0], "mission_name": mission[1], "mission_link": mission[2], "reward": mission[3]} for mission in missions]
        
        conn.close()
        
        return result

    def complete_mission(self, user_id, mission_id):
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        try:
            # Kullanıcının ilgili görevi daha önce tamamlayıp tamamlamadığını kontrol et
            cursor.execute("""
            SELECT 1 FROM missions_completed 
            WHERE user_id = ? AND mission_id = ?
            """, (user_id, mission_id))
            
            if cursor.fetchone() is None:
                # Kullanıcı görevi tamamlamamış, görevi tamamlanmış olarak ekle
                cursor.execute("""
                INSERT INTO missions_completed (user_id, mission_id)
                VALUES (?, ?)
                """, (user_id, mission_id))
                
                # Görev ödülünü al
                cursor.execute("""
                SELECT reward FROM missions 
                WHERE mission_id = ?
                """, (mission_id,))
                
                reward = cursor.fetchone()[0]
                
                # Kullanıcının mevcut bakiyesini al ve güncelle
                cursor.execute("""
                UPDATE user_details 
                SET balance = balance + ?
                WHERE user_id = ?
                """, (reward, user_id))
                
                # Değişiklikleri kaydet
                conn.commit()
                
                return True  # İşlemler başarılı olduysa True dön
            else:
                return False  # Görev zaten tamamlanmışsa False dön
        except Exception as e:
            conn.rollback()  # Herhangi bir hata durumunda işlemleri geri al
            return False
        finally:
            conn.close()  # Bağlantıyı her durumda kapat

    def get_pool_prize(self):
        # Veritabanı bağlantısını aç
        conn = sqlite3.connect('nfteamify.db')
        cursor = conn.cursor()

        # pool_prize sütunundaki tek bir değeri çek
        cursor.execute("SELECT pool_prize FROM prizes LIMIT 1")
        pool_prize = cursor.fetchone()

        # Veritabanı bağlantısını kapat
        conn.close()

        # Eğer değer bulunmuşsa onu döndür, yoksa 0 döndür
        return pool_prize[0] if pool_prize else 0