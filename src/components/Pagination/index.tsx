import * as React from 'react'
import TablePagination from '@mui/material/TablePagination'

interface MediaPaginationProps {
  handlePageChange: (pageNumber: number) => void
  handleChangeRowsPerPage: (limit: string) => void
  page: number
  totalPages: number
  totalRecords: number
  pageSize: number
}

const MediaPagination: React.FC<MediaPaginationProps> = ({
  handlePageChange,
  handleChangeRowsPerPage,
  page,
  totalRecords,
  pageSize,
}) => {
  return (
    <TablePagination
      component="div"
      count={totalRecords}
      page={page - 1}
      onPageChange={(e, page) => {
        console.log(page)
        handlePageChange(page)
      }}
      rowsPerPage={pageSize}
      onRowsPerPageChange={e => {
        console.log(e.target.value)
        handleChangeRowsPerPage(e.target.value)
      }}
      rowsPerPageOptions={[6, 9, 12, 15]}
    />
  )
}

export default MediaPagination
