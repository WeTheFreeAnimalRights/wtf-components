import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import { useTranslations } from '../../hooks/useTranslations';

// ShadCN
import {
    Pagination as ShadPagination,
    PaginationContent as ShadPaginationContent,
    PaginationItem as ShadPaginationItem,
    PaginationLink as ShadPaginationLink,
    PaginationPrevious as ShadPaginationPrevious,
    PaginationEllipsis as ShadPaginationEllipsis,
    PaginationNext as ShadPaginationNext,
} from '_/components/pagination';

export const Pagination = ({
    className,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const { t } = useTranslations();

    const minPage = currentPage > 1 ? currentPage - 1 : 1;
    const maxPage = currentPage > totalPages - 1 ? totalPages : currentPage + 1;
    const paginationItems = range(minPage, maxPage + 1);

    return (
        <ShadPagination className={className}>
            <ShadPaginationContent>
                {currentPage > 1 && (
                    <ShadPaginationItem>
                        <ShadPaginationPrevious
                            ariaLabel={t('go-to-previous')}
                            label={t('previous')}
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (typeof onPageChange === 'function') {
                                    onPageChange(currentPage - 1);
                                }
                            }}
                        />
                    </ShadPaginationItem>
                )}
                {currentPage > 2 && (
                    <ShadPaginationItem>
                        <ShadPaginationEllipsis label={t('more-pages')} />
                    </ShadPaginationItem>
                )}
                {paginationItems.map((pageCount) => (
                    <ShadPaginationItem key={`page-${pageCount}`}>
                        <ShadPaginationLink
                            isActive={pageCount === currentPage}
                            className={
                                pageCount === currentPage
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                if (
                                    typeof onPageChange === 'function' &&
                                    pageCount !== currentPage
                                ) {
                                    onPageChange(pageCount);
                                }
                            }}
                        >
                            {pageCount}
                        </ShadPaginationLink>
                    </ShadPaginationItem>
                ))}
                {currentPage < totalPages - 1 && (
                    <ShadPaginationItem>
                        <ShadPaginationEllipsis label={t('more-pages')} />
                    </ShadPaginationItem>
                )}
                {currentPage < totalPages && (
                    <ShadPaginationItem>
                        <ShadPaginationNext
                            ariaLabel={t('go-to-next')}
                            label={t('next')}
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (typeof onPageChange === 'function') {
                                    onPageChange(currentPage + 1);
                                }
                            }}
                        />
                    </ShadPaginationItem>
                )}
            </ShadPaginationContent>
        </ShadPagination>
    );
};

Pagination.propTypes = {
    /**
     * Current page in the pagination
     */
    currentPage: PropTypes.number,

    /**
     * Total number of pages in the pagination
     */
    totalPages: PropTypes.number,

    /**
     * Handler when the page is changed
     */
    onPageChange: PropTypes.func,

    /**
     * Optional extra classname to the pagination
     */
    className: PropTypes.string,
};
