import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { Profile } from "../models/Profile.js";
import { api } from "./AxiosService.js";
import { profileService } from "./ProfileService.js";

const POST_URL = '/api/posts';

class PostService {
    async getPosts(page) {
        const response = await api.get(`${POST_URL}?page=`);       
        //const posts = [];
        for (let i = 0; i < response.data.posts.length; i++) {
            const p = response.data.posts[i];
            const profileResponse = await profileService.getProfileForPost(p.creatorId);
            const profile = new Profile(profileResponse);
            p['creatorProfile'] = profile;
        }
        AppState.posts = response.data.posts.map(p => new Post(p));
    }

    async getPostBySearch(searchText) {
        const response = await api.get(`${POST_URL}?query=${searchText}`);
        for (let i = 0; i < response.data.posts.length; i++) {
            const p = response.data.posts[i];
            const profileResponse = await profileService.getProfileForPost(p.creatorId);
            const profile = new Profile(profileResponse);
            p['creatorProfile'] = profile;
        }
        AppState.posts = response.data.posts.map(p => new Post(p));
    }

    async createPost(postData) {
        const response = await api.post(POST_URL, postData);
        const profileResponse = await profileService.getProfileForPost(response.data.creatorId);
        response.data['creatorProfile'] = new Profile(profileResponse);
        AppState.posts = [new Post(response.data), ...AppState.posts];
        //this.getPosts(1);
    }

    async deletePost(postId) {
        const response = await api.delete(`${POST_URL}/${postId}`);
        const newPosts = AppState.posts.filter((p) => {
            return p.id != postId;
        })

        AppState.posts = [...newPosts];
    }

    async likePost(postId) {
        const response = await api.post(`${POST_URL}/${postId}/like`)
        const posts = AppState.posts;
        const postIndex = posts.findIndex((p => p.id == postId));
        posts[postIndex].likeIds = response.data.likeIds;
        AppState.posts = posts;
    }
}

export const postService = new PostService();