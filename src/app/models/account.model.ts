export default interface Account {
    avatar: {
        gravatar: {
          hash: String
        }
      },
    id: Number,
    iso_639_1: String,
    iso_3166_1: String,
    name: String,
    include_adult: Boolean,
    username: String
}