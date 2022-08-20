import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { Profile } from "../models/Profile.js";
import { api } from "./AxiosService.js";
import { profileService } from "./ProfileService.js";

const POST_URL = '/api/posts';

class PostService {
    async getPosts() {
        const response = await api.get(POST_URL);       
        //const posts = [];
        for (let i = 0; i < response.data.posts.length; i++) {
            const p = response.data.posts[i];
            const profileResponse = await profileService.getProfileForPost(p.creatorId);
            const profile = new Profile(profileResponse);
            p['creatorProfile'] = profile;
        }
        AppState.posts = response.data.posts.map(p => new Post(p));
    }
}

export const postService = new PostService();