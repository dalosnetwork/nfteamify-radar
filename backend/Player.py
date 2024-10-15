from SQL import SQL

SQL = SQL()

class Player():
    def upgrade_player(self, player_id: int, skill: str, user_id: int):
        result = SQL.upgrade_player(player_id, skill, user_id)

        return result