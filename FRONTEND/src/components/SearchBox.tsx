import Search from "@mui/icons-material/Search";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useDatafill } from "hooks/useDatafill";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateSelectedKeyword } from "store/selectedKeyword/selectedKeywordSlice";
import { useGetRelatedKeywordDataMutation } from "store/services/dataApi";
import { IKeywordData } from "types/appData";
/**
 * The SearchBox component handles all the functionalities related to getting related keyword data
 */

function SearchBox(): JSX.Element {
  const selectedKeywordObject = useAppSelector(
    (state) => state.selectedKeyword.selectedKeyword as IKeywordData
  );
  const keywordData = useAppSelector((state) => state.dataset.keywordData);

  const { fetchAndSetRelatedDataAgainstKeyword } = useDatafill();

  const dispatch = useAppDispatch();
  const [, { isLoading }] = useGetRelatedKeywordDataMutation({
    fixedCacheKey: "shared-keyword-mutation",
  });

  React.useEffect(() => {
    fetchAndSetRelatedDataAgainstKeyword();
  }, [selectedKeywordObject]);

  const handleChange = (
    event: React.SyntheticEvent,
    value: IKeywordData | null
  ) => {
    dispatch(updateSelectedKeyword(value));
  };

  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"left"}
        textAlign={"center"}
      >
        <Grid item xs={12}>
          <Autocomplete
            size="small"
            options={keywordData}
            getOptionLabel={(option: IKeywordData) => option.keyword}
            value={selectedKeywordObject}
            onChange={handleChange}
            isOptionEqualToValue={(option: IKeywordData, value: IKeywordData) =>
              option.keyword === value.keyword
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search"
                InputProps={{
                  style: {
                    fontFamily: "Montserrat, sans-serif",
                    color: "#190019",
                  },
                  ...params.InputProps,
                  sx: { borderRadius: 20 },
                  startAdornment: (
                    <InputAdornment style={{ color: "grey" }} position="start">
                      {isLoading ? <CircularProgress size={20} /> : <Search />}
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.keyword}>
                <Typography
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#854F6C",
                  }}
                >
                  {option.keyword}
                </Typography>
              </li>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default SearchBox;
