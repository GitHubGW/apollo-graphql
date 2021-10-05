import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  border: 2px solid white;
  display: flex;
  padding: 30px;
  width: 900px;
  max-width: 900px;
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-right: 40px;
`;

const ContentContainer = styled.div`
  flex: 2;
  margin-top: 20px;
`;
const Image = styled.img`
  border-radius: 10px;
  width: 300px;
`;
const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 20px;
`;

const Genres = styled.div``;

const GenreTitle = styled.span`
  margin-right: 5px;
  font-size: 40px;
`;

const Rating = styled.h2`
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  font-size: 30px;
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
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, { variables: { id: +id } });
  console.log(data, loading, error);

  return loading ? (
    <Loading></Loading>
  ) : (
    <Wrapper>
      <Container>
        <ImageContainer>
          <Image src={data?.movieById?.medium_cover_image} alt={data?.movieById?.title}></Image>
        </ImageContainer>
        <ContentContainer>
          <Title>
            {data?.movieById?.title} {data?.movieById?.isLiked ? "❤️‍🔥" : "💔"}
          </Title>
          <Genres>
            {data?.movieById?.genres.map((genre, index) => (
              <GenreTitle key={index}>{genre}</GenreTitle>
            ))}
          </Genres>
          <Rating>⭐️ {data?.movieById?.rating}</Rating>
          <Desc>{data?.movieById?.description_full.slice(0, 230)}</Desc>
        </ContentContainer>
      </Container>
    </Wrapper>
  );
};

export default Detail;
