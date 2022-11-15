export default function TableView({ rowList }) {
  const rows = rowList.map((r) => (
    <tr key={r.header}>
      <th>{r.header}: </th>
      <td>{r.data}</td>
    </tr>
  ));
  return (
    <div className="table-view">
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
