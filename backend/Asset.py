from SQL import SQL

SQL = SQL()

class GameAsset():
    def update_user_asset(self, asset_name: str, user_id: int):
        result = SQL.update_user_asset(asset_name, user_id)

        return result