from SQL import SQL
from typing import List
from Wallet import Wallet

SQL = SQL()
Wallet = Wallet()

class User():
    def update_first_eleven(self, player_id_list: List[int], user_id: int):
        check_players = SQL.check_players(player_id_list, user_id)

        if check_players:
            player_id_list = "|".join(map(str, player_id_list))

            result = SQL.update_first_eleven(player_id_list, user_id)

            return result
        else:
            return False

    def user_balance(self, user_id: int):
        result = Wallet.user_balance(user_id)

        return result

    def buy_point(self, user_id: int):
        result = Wallet.buy_point(user_id)

        return result

    def lock_team(self, user_id: int):
        result = SQL.lock_team(user_id)

        return result

    def unlock_team(self, user_id: int):
        result = SQL.unlock_team(user_id)

        return result

    def get_all_deck(self, user_id: int):
        result = SQL.get_all_deck(user_id)

        return result

    def line_up(self, user_id: int):
        first_eleven = SQL.line_up(user_id)

        result = {"first_eleven": first_eleven}

        return result

    def top_players(self, user_id: int):
        result = SQL.top_players(user_id)

        return result

    def league(self, user_id: int):
        top_players = SQL.top_players(user_id)
        get_history = SQL.get_history(user_id)
        prize = SQL.get_pool_prize()
        # add user rank

        result = {"top_players": top_players, "history": get_history, "prize": prize}

        return result

    def user_detail(self, user_id: int):
        result = SQL.user_detail(user_id)
        missions = SQL.get_user_missions(user_id)

        return {"user": result, "missions": missions}

    def complete_mission(self, user_id: int, mission_id):
        result = SQL.complete_mission(user_id, mission_id)

        return result
