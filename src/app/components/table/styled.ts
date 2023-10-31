import { Table } from "antd";
import { mobileWidth } from "src/app/global/constants";
import { styled } from "styled-components";


export const StyledResultsTableDiv = styled.div`
    width: 100%;
`

export const StyledMobileTdDividerLine = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`
// export const StyledMobileRowDividerLine = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   height: 1px;
//   background-color: rgba(0, 0, 0, 0.3);
// `
export const StyledMobileRow = styled.tr`
  display: flex;

  td{
    flex: 2;
    padding: 2px 10px 2px 5px;
  }

  td:first-child{  
    flex: 1;
    padding: 0 10px;
    display: flex;
    justify-content: right;
    align-items: center;
  }
`

export const StyledCellHeightSpan = styled.span`
    height: 47px; /* ROW HEIGHT */
    overflow: hidden; 
    
    // ONLY FOR NEW BROWSERS, puts elipsis on overflow in multiple lines
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

export const StyledTableDivWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px 0;

  /* FIXES COLUMN WIDTH */
  .table-wrapper table {
    table-layout: fixed !important; /* rewrite inline styles */
  }

  .ant-table-thead > tr > th {
    background-color: #4d4d4d; 
    color: white;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
  }
  @media (min-width: ${mobileWidth}px) {
      .ant-table-tbody > tr:nth-child(3n) {
        background-color: #e6faff; 
      }
  }

  td.ant-table-column-sort {
      background-color: rgba(255, 255, 255, 0);
  }

  /* Mobile-specific styles */
  @media (max-width: ${mobileWidth}px) {
    .ant-table-tbody > tr:nth-child(2n) {
      background-color: #e6faff; 
    }

    .ant-table {
      margin-top: 20px;

    .ant-table-thead {
      display: none; /* Hide the table header on mobile */
    }

      .ant-table-tbody > tr > td {
          border: none
      }

      .ant-table-tbody {
        display: block;

        .ant-table-row {
          display: flex; /* Display rows as flex containers */
          padding: 7px;

          .ant-table-cell {
            flex: 1; /* Distribute cell width equally */
            padding: 0;
          }
        }
      }
    }
  }
`