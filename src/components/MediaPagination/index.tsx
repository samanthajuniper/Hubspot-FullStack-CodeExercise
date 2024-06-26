import * as React from 'react'
import TablePagination from '@mui/material/TablePagination'

export interface MediaPaginationProps {
  handlePageChange: (pageNumber: number) => void
  handleChangeItemsPerPage: (limit: string) => void
  page: number
  totalPages: number
  totalRecords: number
  pageSize: number
}

const MediaPagination: React.FC<MediaPaginationProps> = ({
  handlePageChange,
  handleChangeItemsPerPage,
  page,
  totalRecords,
  pageSize,
}) => (
  <TablePagination
    component="div"
    count={totalRecords}
    page={page - 1}
    onPageChange={(e, page) => {
      handlePageChange(page + 1)
    }}
    rowsPerPage={pageSize}
    onRowsPerPageChange={e => {
      handleChangeItemsPerPage(e.target.value)
    }}
    rowsPerPageOptions={[4, 8, 12, 16]}
    labelRowsPerPage="Items per page:"
  />
)

export default React.memo(MediaPagination)
