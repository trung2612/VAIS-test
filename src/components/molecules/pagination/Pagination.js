import React from "react";
import classnames from "classname";
import { Link } from "react-router-dom";
import { usePagination } from "./usePagination";
import "./pagination.css";

export const Pagination = (props) => {
  const { siblingCount = 1, currentPage, totalPage, className } = props;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  const { hasPagination, range } = usePagination({
    currentPage,
    totalPage,
    siblingCount,
  });

  if (!hasPagination) return null;

  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
      >
        {isFirstPage ? (
          <div className="arrow left" />
        ) : (
          <Link to={`/1`}>
            <div className="arrow left" />
          </Link>
        )}
      </li>

      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
      >
        {isFirstPage ? (
          <div className="arrow left" />
        ) : (
          <Link to={`/${currentPage - 1}`}>
            <div className="arrow left" />
          </Link>
        )}
      </li>

      {range.map((item, index) => (
        <li key={index} className={classnames("pagination-item")}>
          <Link to={`/${+item}`}>{item}</Link>
        </li>
      ))}

      <li
        className={classnames("pagination-item", {
          disabled: currentPage === totalPage,
        })}
      >
        {isLastPage ? (
          <div className="arrow right" />
        ) : (
          <Link to={`/${totalPage - 1}`}>
            <div className="arrow right" />
          </Link>
        )}
      </li>

      <li
        className={classnames("pagination-item", {
          disabled: currentPage === totalPage,
        })}
      >
        {isLastPage ? (
          <div className="arrow right" />
        ) : (
          <Link to={`/${totalPage}`}>
            <div className="arrow right" />
          </Link>
        )}
      </li>
    </ul>
  );
};
