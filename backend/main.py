from fastapi import FastAPI, HTTPException, Request
from Controller import Controller
from fastapi.middleware.cors import CORSMiddleware
import threading
import match_service
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm domainlerden gelen isteklere izin verir
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metodlarına izin verir
    allow_headers=["*"],  # Tüm header'lara izin verir
)

Controller = Controller()

@app.get("/")
async def get_hello():
    return {"SEVDIM SENİ BIRLAN BİR ETTIN BENİ YERLAN BİR"}

@app.get("/user_balance")
async def user_balance(user_id: str):
    result = Controller.user_balance(user_id)
    
    if result:
        return {"status": 200, "data": result}
    else:
        return {"status": 403}


@app.post("/buy_point")
async def buy_point(request: Request):
    body = await request.json()
    user_id = body['user_id']

    result = Controller.buy_point(user_id)

    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.get("/get_package")
async def get_package():
    result = Controller.get_package()

    if result:
        return {"status": 200, "data": result}
    else:
        return {"status": 403}

@app.post("/buy_package")
async def buy_package(request: Request):
    body = await request.json()
    package_type = body['package_type']
    user_id = body['user_id']

    result = Controller.buy_package(package_type, user_id)

    if result["status"]:
        return {"status": 200, "data": result["data"]}
    else:
        raise HTTPException(status_code=403, detail={"status": 403, "message": "Forbidden"})

@app.post("/sell_player")
async def sell_player(request: Request):
    body = await request.json()

    player_id = body['player_id']
    price = body['price']
    user_id = body['user_id']

    result = Controller.sell_player(player_id, price, user_id)

    if result:
        return {"status": 200}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")

@app.post("/callback_from_sale")
async def callback_from_sale(request: Request):
    body = await request.json()

    player_id = body['player_id']
    user_id = body['user_id']

    result = Controller.callback_from_sale(player_id, user_id)

    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.post("/buy_from_market")
async def buy_from_market(request: Request):
    body = await request.json()

    player_id = body['player_id']
    user_id = body['user_id']

    result = Controller.buy_from_market(player_id, user_id)

    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.post("/update_first_eleven")
async def update_first_eleven(request: Request):
    body = await request.json()

    player_id_list = list(body['player_id_list'])
    user_id = body['user_id']

    result = Controller.update_first_eleven(player_id_list, user_id)

    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.post("/lock_team")
async def lock_team(request: Request):
    body = await request.json()

    user_id = body['user_id']

    result = Controller.lock_team(user_id)

    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.post("/unlock_team")
async def unlock_team(request: Request):
    body = await request.json()

    user_id = body['user_id']

    result = Controller.unlock_team(user_id)

    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.post("/upgrade_player")
async def upgrade_player(request: Request):
    body = await request.json()

    player_id = body['player_id']
    skill = body['skill']
    user_id = body['user_id']
    
    result = Controller.upgrade_player(player_id, skill, user_id)

    if result:
        return {"status": 200}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")

@app.post("/update_user_asset")
async def update_user_asset(request: Request):
    body = await request.json()

    asset_name = body['asset_name']
    user_id = body['user_id']

    result = Controller.update_user_asset(asset_name, user_id)

    if result:
        return {"status": 200}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")

@app.post("/complete_mission")
async def complete_mission(request: Request):
    body = await request.json()

    user_id = body["user_id"]
    mission_id = body["mission_id"]

    result = Controller.complete_mission(user_id, mission_id)

    if result:
        return {"status": 200}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")


@app.post("/promo_code")
async def promo_code(promo_code: str, user_id: str):
    result = Controller.insert_into_promo_code(promo_code, user_id)
    
    if result:
        return {"status": 200}
    else:
        return {"status": 403}

@app.get("/get_all_deck")
async def get_all_deck(user_id: str):
    result = Controller.get_all_deck(user_id)

    if result:
        return {"status": 200, "data": result}
    else:
        raise HTTPException(status_code=403, detail={"status": 403, "message": "Forbidden"})

@app.get("/get_all_market_players")
async def get_all_market_players():
    result = Controller.get_all_market_players()

    if result:
        return {"status": 200, "data": result}
    else:
        return {"status": 403}

@app.get("/line_up")
async def line_up(user_id: str):
    result = Controller.line_up(user_id)

    if result:
        return {"status": 200, "data": result}
    else:
        raise HTTPException(status_code=403, detail={"status": 403, "message": "Forbidden"})

@app.get("/league")
async def league(user_id: str):
    result = Controller.league(user_id)
    
    if result:
        return {"status": 200, "data": result}
    else:
        raise HTTPException(status_code=403, detail={"status": 403, "message": "Forbidden"})

@app.get("/user_detail")
async def user_detail(user_id: str):
    result = Controller.user_detail(user_id)

    if result:
        return {"status": 200, "data": result}
    else:
        raise HTTPException(status_code=403, detail={"status": 403, "message": "Forbidden"})


if __name__ == "__main__":
    import uvicorn
    match_thread = threading.Thread(target=match_service.run_scheduler)
    match_thread.daemon = True
    match_thread.start()
    uvicorn.run(app, host="0.0.0.0", port=6545)
