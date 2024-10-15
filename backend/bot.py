import asyncio
import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

from Controller import Controller

Controller = Controller()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = int(update.effective_user.id)
    
    # Insert user_id to db
    Controller.insert_into_users(user_id)

    fernet_user_id = Controller.encrypt_user_id(user_id)

    keyboard = [
        [InlineKeyboardButton("⚽ Play", web_app=WebAppInfo(url=f"https://nfteamify.com/team?user={fernet_user_id}"))],
        [InlineKeyboardButton("🔗 Telegram", url='https://t.me/+qcU88PE5Nx0zZDZk'), InlineKeyboardButton("🔗 Twitter", url='https://x.com/nfteamify')],
        [InlineKeyboardButton("🎟️ PROMO CODE", web_app=WebAppInfo(url=f"https://nfteamify.com/promo?user={fernet_user_id}"))],
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    image_path = os.path.join('images', 'nfteamify.jpeg')
    if os.path.exists(image_path):
        with open(image_path, 'rb') as image:
            await context.bot.send_photo(chat_id=update.effective_chat.id, photo=image, reply_markup=reply_markup)
    else:
        await update.message.reply_text('Image not found.')

async def main():
    app = ApplicationBuilder().token("6399060333:AAF21jR4E4QlNwAGyRv512FnsIimLajO5Xg").build()

    app.add_handler(CommandHandler("start", start))

    await app.initialize()
    await app.start()
    print("Bot started.")
    await app.updater.start_polling()

    # Sonsuz döngü
    await asyncio.Event().wait()

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except RuntimeError as e:
        if str(e) == 'Event loop is closed':
            new_loop = asyncio.new_event_loop()
            asyncio.set_event_loop(new_loop)
            new_loop.run_until_complete(main())