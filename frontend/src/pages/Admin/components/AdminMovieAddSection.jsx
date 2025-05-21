import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { adminErrorToast, adminMovieToast } from "../../../toasts/toast";

export const AdminMovieAddSection = () => {
  const { signedPerson } = useSelector((store) => store.authentication);

  const [movieInfo, setMovieInfo] = useState({
    movieName: "",
    imagePath: "",
    language: "",
    description: "",
    rating: "",
    duration: "",
    cast: "",
    relDate: "",
    genres: "",
    directors: "",
  });
  const [adminMovieDropDown, setAdminMovieDropDown] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAdminSection = () => {
    setAdminMovieDropDown((prevState) => !prevState);
  };

  const handleMovieInfo = (e) => {
    const name = e.target.name;
    const value =
      name === "genres" || name === "directors"
        ? e.target.value.split(",")
        : e.target.value;

    setMovieInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: name === "rating" ? parseFloat(value) : value,
      };
    });
  };

  const movieAdd = async (e) => {
    e.preventDefault();

    if (
      movieInfo.movieName !== "" &&
      movieInfo.imagePath !== "" &&
      movieInfo.language !== "" &&
      movieInfo.description !== "" &&
      movieInfo.rating !== "" &&
      movieInfo.duration !== "" &&
      movieInfo.cast !== "" &&
      movieInfo.relDate !== "" &&
      movieInfo.genres !== "" &&
      movieInfo.directors !== ""
    ) {
      try {
        // Thêm phim
        setLoading(true);
        const movieResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/adminMovieAdd`,
          {
            email: signedPerson.email,
            password: signedPerson.password,

            name: movieInfo.movieName,
            image_path: movieInfo.imagePath,
            language: movieInfo.language,
            synopsis: movieInfo.description,
            rating: movieInfo.rating,
            duration: movieInfo.duration,
            top_cast: movieInfo.cast,
            release_date: movieInfo.relDate,
          }
        );

        const movieId = movieResponse.data && movieResponse.data[0].last_id;

        if (movieId) {
          // Add genres
          for (const genre of movieInfo.genres) {
            await axios.post(`${import.meta.env.VITE_API_URL}/genreInsert`, {
              email: signedPerson.email,
              password: signedPerson.password,
              movieId,
              genre,
            });
          }

          // Add directors
          for (let idx = 0; idx < movieInfo.directors.length; idx++) {
            const director = movieInfo.directors[idx];
            await axios.post(`${import.meta.env.VITE_API_URL}/directorInsert`, {
              email: signedPerson.email,
              password: signedPerson.password,

              movieId,
              director,
            });

            // Check if it's the last director
            if (idx === movieInfo.directors.length - 1) {
              adminMovieToast();
            }
          }

          toggleAdminSection();
        }
      } catch (err) {
        console.error(err);
        adminErrorToast(err.response.data.message);
      } finally {
        setMovieInfo({
          movieName: "",
          imagePath: "",
          language: "",
          description: "",
          rating: "",
          duration: "",
          cast: "",
          relDate: "",
          genres: "",
          directors: "",
        });
        setLoading(false);
      }
    }
  };

  return (
    <section className="section-admin-movie-add container">
      <div className="form-heading-container">
        <h2 className="form-admin-heading">Thêm Phim</h2>
        <button className="btn-admin-arrow" onClick={toggleAdminSection}>
          {!adminMovieDropDown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 184l144 144 144-144"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 328l144-144 144 144"
              />
            </svg>
          )}
        </button>
      </div>

      {adminMovieDropDown && (
        <form className="form-movie-add" onSubmit={movieAdd}>
          <div>
            <p>Tên phim:</p>
            <input
              name="movieName"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập tên phim"
            />
          </div>

          <div>
            <p>Đường dẫn ảnh phim:</p>
            <input
              name="imagePath"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập đường dẫn ảnh"
            />
          </div>

          <div>
            <p>Ngôn ngữ:</p>
            <input
              name="language"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập ngôn ngữ"
            />
          </div>

          <div>
            <p>Mô tả:</p>
            <input
              name="description"
              onChange={(e) => handleMovieInfo(e)}
              placeholder="Nhập mô tả ngắn"
            />
          </div>

          <div>
            <p>Điểm xếp hạng (10):</p>
            <input
              name="rating"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập điểm xếp hạng"
            />
          </div>

          <div>
            <p>Thời gian chiếu:</p>
            <input
              name="duration"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập thời gian chiếu"
            />
          </div>

          <div>
            <p>Diễn Viên Chính:</p>
            <input
              name="cast"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập tên diễn viên chính"
            />
          </div>

          <div>
            <p>Ngày phát hành:</p>
            <input
              name="relDate"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="(yyyy-mm-dd)"
            />
          </div>

          <div>
            <p>Thể loại phim:</p>
            <input
              name="genres"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập các thể loại"
            />
          </div>

          <div>
            <p>Đạo diễn:</p>
            <input
              name="directors"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Nhập các tên đạo diễn"
            />
          </div>

          <button type="submit" className="btn-admin" disabled={loading}>
            {loading ? "Loading..." : "CONFIRM"}
          </button>
        </form>
      )}
    </section>
  );
};
