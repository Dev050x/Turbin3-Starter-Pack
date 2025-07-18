import { Keypair, PublicKey, Connection, Commitment, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("7h9C95AzCVPomPJYSHN13BVEZYbvHCW981TWsx31udph");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection , keypair , mint , keypair.publicKey );
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection,keypair,mint,ata.address,keypair.publicKey,7n*1_000_000n);
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
