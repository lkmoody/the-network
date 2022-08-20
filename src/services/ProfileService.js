import { Profile } from "../models/Profile.js";
import { api } from "./AxiosService.js";

const PROFILES_URL = '/api/profiles/';

class ProfileService {
    async getProfileForPost(profileId) {
        const response = await api.get(`${PROFILES_URL}${profileId}`);
        const profile = new Profile(response.data);
        return profile;
    }
}

export const profileService = new ProfileService();