import "./global.css";
// import s from "./style.module.css"
import { TvShow } from "./api/TvShow";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetails } from "./Components/TVShowDetails/TVShowDetails";
import { TVShowList } from "./Components/TVShowList/TVShowList";
import { SearchBar } from "./Components/SearchBar/SearchBar";

export function App() {
  const [currentTVshow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    try {
      const POPULARS = await TvShow.fetchPopulars();
      if (POPULARS.length > 0) {
        setCurrentTVShow(POPULARS[0]);
      }
    } catch (error) {
      alert("Request error");
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendations = await TvShow.fetchRecommendations(tvShowId);
      if (recommendations.length > 0) {
        setRecommendationList(recommendations.slice(0, 10));
      }
    } catch (error) {
      alert("Request error");
    }
  }

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TvShow.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Request error");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVshow) {
      fetchRecommendations(currentTVshow.id);
    }
  }, [currentTVshow]);

  function setCurrentTvShowFromRecommendation(tvShow) {
    alert(JSON.stringify(tvShow));
  }
  return (
    <div
      className="flex flex-col h-screen p-8"
      style={{
        background: currentTVshow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVshow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className="basis-1/12 flex w-full justify-between align-center">
        <div className="mx-auto">
          <SearchBar onSubmit={searchTVShow} />
        </div>
      </div>
      <div className="basis-2/3">
        {currentTVshow && <TVShowDetails tvShow={currentTVshow} />}
      </div>
      <div className="basis-1/3">
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
