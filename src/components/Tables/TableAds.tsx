import React, { useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter, Column, TableInstance, TableState, Row  } from 'react-table';
import { GlobalFilter } from './GlobalFilter'; // Assuming you have a GlobalFilter component for search functionality

interface AdData {
  advertiser: string;
  advertiser_location: string;
  topic: string;
  google_information?: string;
  other_information?: [];
  brand : string;
  advertiser_link: string;
  id: string;
}

interface TableStateWithPagination extends TableState<AdData> {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
}

interface TableInstanceWithPagination<T extends object> extends TableInstance<T> {
  page: Array<Row<T>>;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  state: TableStateWithPagination;
  preGlobalFilteredRows: Array<Row<T>>;
  setGlobalFilter: (filterValue: string | undefined) => void;
}

const TableAds: React.FC<{ columns: Column<AdData>[]; data: AdData[] }> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable<AdData>(
    {
      columns,
      data,
    },
    useGlobalFilter, // useGlobalFilter!
    usePagination // usePagination!
  ) as TableInstanceWithPagination<AdData>;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {/* <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      /> */}
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center p-2 sm:p-2 xl:p-5.5">
  <nav className="mt-4">
    <ul className="flex flex-wrap items-center gap-2">
      {/* Previous Page Button */}
      <li>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={`flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium ${
            !canPreviousPage
              ? 'bg-[#EDEFF1] text-black cursor-not-allowed'
              : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
          } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
        >
          {'<<'}
        </button>
      </li>
      <li>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium ${
            !canPreviousPage
              ? 'bg-[#EDEFF1] text-black cursor-not-allowed'
              : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
          } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
        >
          {'<'}
        </button>
      </li>

      {/* Page Numbers */}
      {pageOptions.map((_, index) => (
        <li key={index}>
          <button
            onClick={() => gotoPage(index)}
            className={`flex items-center justify-center rounded px-3 py-1.5 font-medium ${
              index === pageIndex
                ? 'bg-primary text-white'
                : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
            } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
          >
            {index + 1}
          </button>
        </li>
      ))}

      {/* Next Page Button */}
      <li>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium ${
            !canNextPage
              ? 'bg-[#EDEFF1] text-black cursor-not-allowed'
              : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
          } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
        >
          {'>'}
        </button>
      </li>
      <li>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className={`flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium ${
            !canNextPage
              ? 'bg-[#EDEFF1] text-black cursor-not-allowed'
              : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
          } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
        >
          {'>>'}
        </button>
      </li>
    </ul>
  </nav>
</div>

{/* Page Size Dropdown */}
<div className="mt-4 flex justify-center">
  <select
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium bg-[#EDEFF1] text-black dark:bg-graydark dark:text-white"
  >
    {[10, 20, 30, 40, 50].map((pageSize) => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))}
  </select>
</div>

      {/* <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
    </>
  );
};

export default TableAds;
