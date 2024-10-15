from SQL import SQL

SQL = SQL()

class Market():
    def get_package(self):
        result = SQL.get_package()

        return result

    def buy_package(self, package_type: str, user_id: int):
        result = SQL.buy_package(package_type, user_id)

        return result

    def sell_player(self, player_id: int, price: int, user_id: int):
        result = SQL.sell_player(player_id, price, user_id)

        return result

    def callback_from_sale(self, player_id: int, user_id: int):
        result = SQL.callback_from_sale(player_id, user_id)

        return result

    def buy_from_market(self, player_id: int, user_id: int):
        result = SQL.buy_from_market(player_id, user_id)

        return result

    def get_all_market_players(self):
        result = SQL.get_all_market_players()

        return result