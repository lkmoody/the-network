import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { Profile } from "../models/Profile.js";
import { api } from "./AxiosService.js";

const PROFILES_URL = '/api/profiles/';

class ProfileService {
    async getProfileForPost(profileId) {
        const response = await api.get(`${PROFILES_URL}${profileId}`);
        const profile = new Profile(response.data);
        return profile;
    }

    async getActiveProfile(profileId) {
        const response = await api.get(`${PROFILES_URL}${profileId}`);
        AppState.activeProfile = new Profile(response.data);
    }

    async getPostsForProfile(profileId) {
        const response = await api.get(`${PROFILES_URL}${profileId}/posts`);

        for (let i = 0; i < response.data.posts.length; i++) {
            const p = response.data.posts[i];
            const profileResponse = await this.getProfileForPost(p.creatorId);
            const profile = new Profile(profileResponse);
            p['creatorProfile'] = profile;
        }
        
        AppState.posts = response.data.posts.map(p => new Post(p));
    }
}

export const profileService = new ProfileService();