import { startStream, types } from 'near-lake-framework';

const lakeConfig: types.LakeConfig = {
    s3BucketName: "near-lake-data-testnet",
    s3RegionName: "eu-central-1",
    startBlockHeight: 100756426,
};

async function handleStreamerMessage(streamerMessage: types.StreamerMessage): Promise<void> {
    console.log(`
        Block #${streamerMessage.block.header.height}
        Shards: ${streamerMessage.shards.length}
    `);

    for (let shard of streamerMessage.shards) {
        if (shard.chunk != null) {
            for (let transaction of shard.chunk.transactions) {
                console.log(`Transaction Receiver: ${transaction.transaction.receiverId}`);
                if (transaction.transaction.receiverId == 'certi.testnet') {
                    console.log(`-----------------------------------------------------Transaction: ${transaction.transaction.receiverId}`);
                }
            }
        }
    }
}

(async () => {
    await startStream(lakeConfig, handleStreamerMessage);
})();