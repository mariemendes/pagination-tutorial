import { Table } from "./components/Table";
import { usePagination } from "./hooks/usePagination";
import { fetchBooks } from "./utils/api";

function App() {
  const { results, nextPage, prevPage, canNextPage, canPrevPage } = usePagination(10, fetchBooks);

  return (
    <>
      <Table results={results} />
      <div class="btn-wrapper">
        <button class="btn btn-prev" onClick={prevPage} disabled={!canPrevPage()}>Prev</button>
        <button class="btn btn-next" onClick={nextPage} disabled={!canNextPage()}>Next</button>
      </div>
    </>
  );
}

export default App;
