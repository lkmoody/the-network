export class Post {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.imgUrl = data.imgUrl;
    this.creatorId = data.creatorId;
    this.creatorProfile = data.creatorProfile;
    this.likeIds = data.likeIds;
    this.createdAt = data.createdAt;
  }
}