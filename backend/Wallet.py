from bip_utils import Bip39SeedGenerator, Bip32Slip10Secp256k1, Bip44, Bip44Coins
from solana.keypair import Keypair
from solana.publickey import PublicKey
from solana.transaction import Transaction
from solana.system_program import TransferParams, transfer
from solana.rpc.api import Client
from solana.rpc.types import TxOpts
from solana.rpc.commitment import Confirmed
import base64

from SQL import SQL

SQL = SQL()

class Wallet():
    def __init__(self):
        mnemonic = "vintage surge pudding library hurdle oval slab jungle race gospel response prosper"  # replace real one get from env
        self.seed_bytes = Bip39SeedGenerator(mnemonic).Generate()

        # Use Bip44.FromSeed instead of FromBip32
        self.bip44_master_key = Bip44.FromSeed(self.seed_bytes, Bip44Coins.SOLANA)

        # Set up Solana client
        self.client = Client("https://api.mainnet-beta.solana.com")

    def user_balance(self, user_id: int):
        result = SQL.user_balance(user_id)
        return result

    def generate_new_public_address(self, user_index: int):
        bip44_derivator = self.bip44_master_key.DeriveAccount(user_index)
        derived_private_key = bip44_derivator.PrivateKey().Raw().ToBytes()

        user_keypair = Keypair.from_secret_key(derived_private_key)
        user_public_key = user_keypair.public_key

        return str(user_public_key)

    def buy_point(self, user_id: int):
        # self.check_and_send_balance(self, user_id)
        result = SQL.buy_point(user_id)
        return result

    def check_and_send_balance(self, user_id: int):
        user_data = SQL.query(f"SELECT wallet_address, wallet_balance FROM user_wallet WHERE user_id = {user_id}")

        if not user_data:
            return "User wallet not found."

        wallet_address, wallet_balance = user_data[0]

        if wallet_balance < 0.1:
            return "Insufficient balance to send SOL."

        # Solana transaction details
        destination_wallet = "53HRTRvLQGcjRNAxtY9SbpU9269oHJWa9neciKXp9Nuu"  # Replace with actual destination wallet
        amount_to_send = 0.1 * (10 ** 9)

        user_keypair = self.get_user_keypair(user_id)
        if not user_keypair:
            return "User keypair not found."

        transaction = Transaction().add(
            transfer(
                TransferParams(
                    from_pubkey=user_keypair.public_key,
                    to_pubkey=PublicKey(destination_wallet),
                    lamports=int(amount_to_send)
                )
            )
        )

        # Send transaction
        try:
            response = self.client.send_transaction(transaction, user_keypair, opts=TxOpts(skip_preflight=True, preflight_commitment=Confirmed))
            return f"Transaction successful. Signature: {response['result']}"
        except Exception as e:
            return f"Transaction failed: {str(e)}"

    def get_user_keypair(self, user_index: int):
        bip44_derivator = self.bip44_master_key.DeriveAccount(user_index)
        derived_private_key = bip44_derivator.PrivateKey().Raw().ToBytes()

        return Keypair.from_secret_key(derived_private_key)
