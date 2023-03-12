const {name} = require("./model");


/**
 *  Brand properties:
 title, description, videoLink, fileName, visibility,
 thumbnailUrl, playlistId, language, recordingDate,
 category, viewsCount, likesCount, dislikesCount,
 */
const brandSchema = async (db) => {
    const validator = {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "owner",
                "banner",
                "logo",
                "brandName",
                "subDomain",

            ],
            properties: {
                owner: {
                    bsonType: "object",

                    owner_id: {
                        bsonType: "objectId",
                        description: "Must be a Object ID and Is Required",
                        required: true

                    }, ownerName: {
                        bsonType: "string",
                        description: "Must be a string and IS Required!",
                        required: true
                    },
                },
                banner: {
                    bsonType: "string",
                    description: "Must be a string and IS Required!"
                },
                logo: {
                    bsonType: "string",
                    description: "Must be a string and IS Required!"
                },
                brandName: {
                    bsonType: "string",
                    description: "Must be a string and IS Required!"
                },
                subDomain: {
                    bsonType: "string",
                    description: "Must be a string and IS Required!"
                },
                brandColor: {
                    bsonType: "string",
                    description: "Must be a string and IS Required!",
                    default: '#F15B25'
                }

            },
        },
    };


    const collections = await db.listCollections({name}).toArray();
    if (collections.length === 0) {
        console.log(`creating collection ${name}`);
        await db.createCollection(name, {validator});
    } else {
        console.log(`updating collection ${name}`);
        await db.command({
            collMod: name,
            validator,
        });
    }
}

module.exports = {
    brandSchema,
}
