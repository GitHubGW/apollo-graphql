## Apollo-GraphQL

- 현재 apollo-graphql 프로젝트는 GraphQL 서버를 이용해서 실행되기 때문에 graphql-movie-api로 GraphQL 서버를 실행 후, apollo-graphql을 실행시키기

#### GraphQL 서버(graphql-movie-api)

- http://localhost:4000

#### Apollo-GraphQL

- http://localhost:3000

### resolvers

- apollo.js에 resolvers를 이용해서 GraphQL API에서 받은 필드 외에도 추가적인 필드를 클라이언트단에서 생성할 수 있다.
- 여기서 생성한 필드는 쿼리를 요청할 때 필드랑 같은 이름이어야 한다.
- resolvers에 우리가 받은 Movie라는 스키마에 isLiked라는 쿼리 요청이 오게 되면 isLiked안에 있는 함수를 실행하고 그 함수는 false를 반환하도록 한다.
- Home.js에 gql에 isLiked필드를 추가하고 isLiked는 백엔드가 아닌 프론트엔드에서 요청한 필드이기 때문에 @client를 붙여준다.
- 정리하자면, GET_MOVIES에서 isLiked라는 쿼리를 클라이언트에 보내게 되면 apollo.js에 resolvers안에 있는 isLiked함수를 실행하고, 그 결과값을 가져오는 것이다.

#### apollo.js

```javascript
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
  },
});

export default client;
```

#### Home.js

```javascript
const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      year
      rating
      medium_cover_image
      isLiked @client
    }
  }
`;
```

#### Movie.js

- 아래는 백엔드에 있는 Mutation형태와 비슷하지만 @client를 붙여줬기 때문에 클라이언트에 쿼리를 요청한다.
- 아래와 같이 쿼리를 요청하게 되면 클라이언트에 있는 likeMovie resolvers함수를 찾아서 실행한다.

```javascript
const LIKE_MOVIE = gql`
  mutation LikeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    // cache.modify를 사용해서 받은 field들의 값들을 변경할 수 있다. 
    // (여기서 field란 쿼리를 요청해서 받은 데이터들을 말한다.)
    // id에는 바꿀 대상의 cache id를 전달해주고, fields에는 바꿀 데이터들을 전달해준다.
    // 바꿀 데이터들을 전달해줄 때는 () => "반환값" 형태로 전달해줘야 한다.
    Mutation: {
      likeMovie: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: (isLiked) => !isLiked,
          },
        });
      },
    },
  },
});
```

#### 좋아요를 정상적으로 불러오지 못하는 문제

- Detail페이지에 들어가기 전 Movie페이지에서 Detail페이지에 있는 영화들의 캐시를 미리 저장해놓지 않으면 좋아요를 누르고 들어갔을 때, 좋아요를 제대로 불러오질 못한다.
- 그래서 Movie.js에 Detail.js에 있는 GET_MOVIE 쿼리를 가져와서 useQuery를 통해 쿼리를 미리 요청해서 Detail페이지의 필드들을 먼저 가져와서 캐시에 저장시킨 후, 들어가게 되면 미리 캐시에 저장해놓았던 isLiked를 불러오기 때문에 정상적으로 좋아요를 누른 것을 가져오게 됩니다.

#### Movie.js

```javascript
const GET_MOVIE = gql`
query getMovieById($id: Int!) {
  movie(id: $id) {
    id
    title
    medium_cover_image
    language
    rating
    description_full
    genres
    isLiked @client
}
`;

useQuery(GET_MOVIE, { variables: { id: +id } });
```