import * as React from "react";
import { DatabaseAd } from "../utils/types";
import Ad from "./components/Ad";
import AdList from "./components/AdList";
import ReactPaginate from "react-paginate";

const App = () => {
  const [ads, setAds] = React.useState<DatabaseAd[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchAds(currentPage);
  }, [currentPage]);

  const fetchAds = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/ads?page=${page}`
      );
      const data = await response.json();
      setAds(data.ads);
      setTotalPages(data.totalPages);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError("Something went wrong. Please try refreshing the page.");
      setLoading(false);
    }
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="container">
      <h1>Apartments for sale</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h3>{error}</h3>}
      {ads && (
        <AdList>
          {ads.map((ad) => (
            <Ad {...ad} key={ad.id} />
          ))}
        </AdList>
      )}
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={totalPages}
        pageRangeDisplayed={2}
        previousLabel="<"
      />
    </div>
  );
};

export default App;
