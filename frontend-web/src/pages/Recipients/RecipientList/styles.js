import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  /* margin: 34px 120px; */
  flex-direction: column;
  /* justify-content: center; */
  padding: 20px;

  .infinite-scroll-component {
    overflow: hidden !important;
  }
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
  }
`;

export const RecipientListTable = styled.table`
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

    /*text-align: left;*/
  }

  tbody {
    height: 60vh;
    /* overflow-y: auto; */
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
    /* fallback */
  }

  tbody td,
  thead th {
    width: 17%;
    float: left;
    :first-child {
      width: 9%;
      /* min-width: 45px; */
    }
    :last-child {
      width: 9%;
      /* text-align: center; */
      /* min-width: 45px; */
    }
    :nth-child(2) {
      width: 23%;
    }
    :nth-child(3) {
      width: 59%;
    }
  }

  // Large devices (desktops, 992px and up)
  @media (max-width: 1199.98px) {
    /* tbody td,
    thead th {
      :nth-child(3) {
        width: 33%;
      }
      :nth-child(4) {
        display: none;
      }
    } */
  }
`;

export const TableHead = styled.tr`
  th:last-child {
    padding-right: 13px;
    text-align: right;
  }
  th:first-child {
    padding-left: 13px;
  }
  th {
    font-size: 16px;
    text-align: left;
    color: #444;
    padding-bottom: 14px;
  }
`;
