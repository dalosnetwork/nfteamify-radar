from SQL import SQL
from User import User
from Player import Player
from Asset import GameAsset
from Market import Market
from crypto import CryptoNFTeamify
from typing import List
from Wallet import Wallet

SQL = SQL()
User = User()
Player = Player()
GameAsset = GameAsset()
Market = Market()
Wallet = Wallet()

fernet_key = SQL.get_fernet_key()

CryptoNFTeamify = CryptoNFTeamify(fernet_key)

class Controller():
    def insert_into_users(self, user_id: int):
        is_new_user = SQL.insert_into_users(user_id)
        if is_new_user:
            wallet_address = Wallet.generate_new_public_address(user_id)
            SQL.insert_into_user_wallet(user_id, wallet_address)


    def encrypt_user_id(self, user_id: int):
        print(user_id)
        return CryptoNFTeamify.encrypt_user_id(user_id)
    
    def decrypt_user_id(self, user_id: str):
        return CryptoNFTeamify.decrypt_user_id(user_id)

    def insert_into_promo_code(self, promo_code: str, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = SQL.insert_into_promo_code(promo_code, user_id)
        
        return result

    def get_package(self):
        result = Market.get_package()

        return result

    def user_balance(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.user_balance(user_id)

        return result

    def buy_point(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.buy_point(user_id)

        return result

    def buy_package(self, package_type: str, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)
        
        result = Market.buy_package(package_type, user_id)

        return result

    def sell_player(self, player_id: int, price: int, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = Market.sell_player(player_id, price, user_id)

        return result

    def callback_from_sale(self, player_id: int, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = Market.callback_from_sale(player_id, user_id)

        return result

    def buy_from_market(self, player_id: int, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = Market.buy_from_market(player_id, user_id)

        return result

    def update_first_eleven(self, player_id_list: List[int], user_id: str):
        player_id_list = [0 if player_id is None else player_id for player_id in player_id_list]

        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.update_first_eleven(player_id_list, user_id)

        return result

    def lock_team(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.lock_team(user_id)

        return result

    def unlock_team(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.unlock_team(user_id)

        return result

    def upgrade_player(self, player_id: int, skill: str, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = Player.upgrade_player(player_id, skill, user_id)

        return result

    def update_user_asset(self, asset_name: str, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = GameAsset.update_user_asset(asset_name, user_id)

        return result

    def get_all_deck(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.get_all_deck(user_id)

        return result

    def get_all_market_players(self):
        result = Market.get_all_market_players()

        return result

    def line_up(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.line_up(user_id)

        return result

    def league(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.league(user_id)

        return result

    def user_detail(self, user_id: str):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.user_detail(user_id)

        return result

    def complete_mission(self, user_id: str, mission_id):
        user_id = CryptoNFTeamify.decrypt_user_id(user_id)

        result = User.complete_mission(user_id, mission_id)

        return result