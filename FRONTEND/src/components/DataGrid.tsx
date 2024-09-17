import { useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { GridColDef, DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { IDatasetID, IDataset } from "types/appData";
import { useGetAbstractMutation } from "store/services/miscApi";

interface ResultTableProps {
  data: IDataset[];
}

function DataGrid(props: ResultTableProps): JSX.Element {
  const rows = props.data;
  const [
    fetchAbstract,
    { data, isLoading: isAbstractLoading, error: abstractError },
  ] = useGetAbstractMutation();
  const [selectedRow, setSelectedRow] = useState<IDatasetID | null>(null);
  const columns: GridColDef[] = [
    {
      field: "formattedData",
      headerName: "Title (Year); Authors",
      flex: 1,
      renderCell: (params) => (
        <div>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              lineHeight: "20px",
              color: "#176B87",
            }}
          >
            <a
              href={getDoiLink(params.row)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#04364A",
                fontWeight: 600,
              }}
            >
              {params.row.dataset_title}
            </a>
            <span style={{ color: "#04364A" }}>
              {getPublicationYear(params.row)}
            </span>
            {";"} {getAuthorsOrProviders(params.row)}
          </p>
          {selectedRow === params.row.id && (
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                color: "#04364A",
              }}
            >
              <div style={{ padding: "0 0 1rem 0rem" }}>
                {getAbstract(params.row)}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleFetchAbstract = async (id: IDatasetID) => {
    await fetchAbstract({ key: id });
  };

  const getAuthorsOrProviders = (row: IDataset): string => {
    if (row.authors) {
      return row.authors?.join(", ");
    }
    if (row.providers) {
      return row.providers?.join(", ");
    }
    return "No authors or providers to display.";
  };

  const getPublicationYear = (row: IDataset): string => {
    if (row.dataset_publication_date) {
      const publicationDate = new Date(row.dataset_publication_date);
      const year = publicationDate.getFullYear().toString();
      return ` (${year})`;
    } else {
      return "";
    }
  };

  const getAbstract = (row: IDataset): string | React.ReactNode => {
    if (data?.result[0]) {
      return data.result[0];
    }
    if (abstractError) {
      console.error(abstractError);
      return "Error fetching abstract";
    }
    if (isAbstractLoading) {
      return (
        <div>
          <p>Fetching abstract...</p>
          <div>
            <LinearProgress />
          </div>
        </div>
      );
    }
    return "No abstract available";
  };

  const getDoiLink = (row: IDataset): string => {
    return row.doi || "#"; // Use the DOI if available, otherwise use a placeholder
  };

  const handleRowClick = (row: IDataset): void => {
    // Toggle the selectedRow state
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow === row.id ? null : row.id
    );
    handleFetchAbstract(row.id);
  };

  return (
    <MuiDataGrid
      sx={{
        ".MuiDataGrid-virtualScroller":{
          overflowX: "clip"
        },
        ".MuiTablePagination-root": {
          overflowX: "clip",
        },
      }}
      rows={rows.map((row) => ({
        ...row,
        formattedData: row.id,
      }))}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowHeight={() => "auto"}
      onRowClick={(row) => handleRowClick(row.row)}
      pageSizeOptions={[5, 10, 15]}
      checkboxSelection={false}
      disableRowSelectionOnClick
      columnHeaderHeight={0}
    />
  );
}

export default DataGrid;
