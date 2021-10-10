import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 35px;
  transition: 0.5s;
  &:hover {
    transform: scale(1.03);
  }
`;

const SCLink = styled(Link)`
  text-decoration: none;
`;

const Image = styled.img`
  vertical-align: top;
  width: 100%;
  border-radius: 10px;
`;

const MovieContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const Title = styled.h1`
  color: black;
  font-size: 28px;
  text-align: center;
`;

const Rating = styled.h2`
  color: orange;
  text-align: center;
  margin-top: 10px;
  font-size: 22px;
`;

const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 35px;
`;

const LIKE_MOVIE = gql`
  mutation LikeMovie($id: Int!, $isLiked: Boolean!) {
    likeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const GET_MOVIE = gql`
  query getMovieById($id: Int!) {
    movieById(id: $id) {
      id
      title
      genres
      description_full
      year
      rating
      medium_cover_image
      isLiked @client
    }
  }
`;

const Movie = ({ id, medium_cover_image, title, description_full, rating, isLiked }) => {
  const [likeMovie, { data, loading, error }] = useMutation(LIKE_MOVIE, { variables: { id: +id, isLiked } });
  useQuery(GET_MOVIE, { variables: { id: +id } });

  return (
    <Container>
      <SCLink to={`/${id}`}>
        <Image src={medium_cover_image && medium_cover_image} alt={title} />
        <MovieContent>
          <Title>{title && title}</Title>
          <Rating>⭐️ {rating && rating}</Rating>
        </MovieContent>
      </SCLink>
      <LikeButton onClick={likeMovie}>{isLiked ? "💖" : "💔"}</LikeButton>
    </Container>
  );
};

export default Movie;
