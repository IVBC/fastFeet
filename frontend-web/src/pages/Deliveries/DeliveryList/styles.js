import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
`;

export const InitialContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  strong {
    font-size: 24px;
    text-align: left;
    margin-bottom: 12px;
  }
  aside {
    justify-content: space-between;
    display: flex;
    align-items: flex-end;
    @media (max-width: 410px) {
      flex-wrap: wrap-reverse;
    }
  }
`;

export const DeliveryListTable = styled.table`
  margin-top: 22px;
  border-collapse: collapse;
  width: 100%;
  table {
    width: 100%;
  }

  thead,
  tbody,
  tr,
  td,
  th {
    display: block;
  }

  tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
  }

  thead th {
    height: 30px;
  }

  tbody {
    padding: 0 7px 0 0;
    height: 60vh;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #a6a6a6;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: white;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }

  thead {
    padding: 0 14px 0 0;
  }

  tbody td,
  thead th {
    width: 17%;
    float: left;
    :first-child {
      width: 6%;
      min-width: 45px;
    }
    :last-child {
      width: 7%;
      min-width: 45px;
    }
    :nth-child(2) {
      width: 25%;
    }
    :nth-child(3) {
      width: 20%;
    }
    :nth-child(4) {
      width: 13%;
    }
    :nth-child(5) {
      width: 9%;
    }
    :nth-child(6) {
      width: 10%;
    }
    :nth-child(7) {
      width: 10%;
    }
  }

  @media (max-width: 890px) {
    thead {
      display: none !important;
    }

    &,
    & tbody,
    & tr,
    & td {
      display: block !important;
      width: 100% !important;
    }

    & tr {
      margin-bottom: 15px;
    }

    & td {
      text-align: right;
      padding-left: 50%;
      text-align: right;
      position: relative;
    }

    & td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: calc(50% - 15px);
      padding-left: 15px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: ${colors.second};
    }

    & td div {
      margin-bottom: 0 !important;
      padding-left: 0px !important;
    }
    & td span {
      margin-bottom: 0 !important;
    }
  }

  @media (max-width: 1199.98px) {
    tbody td,
    thead th {
      :nth-child(3) {
        width: 26%;
      }
      :nth-child(2) {
        width: 32%;
      }
      :nth-child(4) {
        display: none;
      }
    }
  }
`;

export const TableHead = styled.tr`
  th:last-child {
    padding-right: 13px;
    text-align: right;
  }
  th:first-child {
    padding-left: 23px;
  }
  th {
    font-size: 16px;
    text-align: left;
    color: ${colors.fontDark};
    padding-bottom: 14px;
  }
`;

export const LoadingContent = styled.div`
  display: flex;
  justify-content: center;
  color: ${colors.fontLigh};
  margin-top: 6px;
`;
