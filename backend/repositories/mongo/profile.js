import { Schema } from 'mongoose';

export default (connection) => {
    const ProfileModel = connection.model('Profile', new Schema({
        overallSkills: [String],
        experiences: [
            {
                title: String,
                logo: String,
                company: String,
                type: {
                    type: String,
                },
                start: Date,
                end: Date,
                skills: [String],
                detail: String,
            }
        ]
    }));


    async function getProfile() {
        let profile;

        try {
            profile = await ProfileModel.where({}).findOne();
        } catch (error) {
            throw new Error(error);
        }

        return profile;
    }

    async function updateProfile(newProfile) {
        let profile;

        try {
            const update = {
                $set: newProfile,
            };

            profile = await ProfileModel.findOneAndUpdate({}, update, {
                new: true,
                upsert: true,
            });
        } catch (error) {
            console.log('error', error);
            throw new Error(error);
        }

        return profile;
    }

    return {
        getProfile,
        updateProfile,
    };
}