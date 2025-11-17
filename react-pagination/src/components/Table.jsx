export const Table = (props) => {
  return (
    <table className="tableWrapper">
      <thead>
        <tr class="thead-table tableRow">
          <td>ID #</td>
          <td>Title</td>
          <td>Author</td>
          <td>Year Publised</td>
        </tr>
      </thead>
      <tbody class="tbody-table">
          {props.results.map((result) =>(
            <tr key={result.id} className="tableRow">
              <td>{result.id}</td>
              <td>{result.title}</td>
              <td>{result.author}</td>
              <td>{result.yearPublished}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
