import { useState, useEffect } from "react";

export function usePagination(count, apiCall) {
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await apiCall(count, page);
        setResults(data.results);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [count, page, apiCall]);

  const nextPage = () => {
    setPage(page + 1);
  }
  const prevPage = () => {
    setPage(page - 1) 
  }

  const canNextPage = () => {
    const currentPage = page + 1;
    const lastPage = Math.ceil(total / count);
    return currentPage !== lastPage;
  }
  const canPrevPage = () => {
    return page !== 0;
  }
  return { results, total, loading, page, setPage, nextPage, prevPage, canNextPage, canPrevPage };
}
