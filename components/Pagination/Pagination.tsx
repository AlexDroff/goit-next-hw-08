import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      forcePage={page - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={`${css.page} ${page === 1 ? css.disabled : ""}`}
      nextClassName={`${css.page} ${page === totalPages ? css.disabled : ""}`}
      breakClassName={css.page}
    />
  );
};

export default Pagination;
