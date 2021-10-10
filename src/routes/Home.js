import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Loading from "../components/Loading";
import Movie from "../components/Movie";

const Wrapper = styled.div`
  width: 1280px;
  max-width: 1280px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  column-gap: 25px;
`;

const Header = styled.header`
  padding: 50px 0px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 50px;
  width: 100%;
  text-align: center;
  color: #222;
`;

const Error = styled.h1``;

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

const Home = () => {
  const { data, loading, error } = useQuery(GET_MOVIES);

  return (
    <Wrapper>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {error && <Error>{error}</Error>}
          <Header>Apollo & GraphQL Movie</Header>
          <Container>
            {data?.movies?.map((movie) => (
              <Movie key={movie.id} {...movie}></Movie>
            ))}
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
