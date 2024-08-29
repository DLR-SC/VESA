import { CircularProgress } from "@mui/material";
import WordCloud from "chartHooks/WordCloud";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { IContainerProps, IKeywordData } from "types/appData";
import EmptyDatasetCard from "../components/EmptyDatasetCard";

import { updateSelectedKeyword } from "store/selectedKeyword/selectedKeywordSlice";
import {
  useGetInitialKeywordDataQuery,
  useGetRelatedKeywordDataMutation,
} from "store/services/dataApi";
import CenteredCard from "../components/CenteredCard";

function WordCloudContainer(props: IContainerProps): JSX.Element {
  const keywordData = useAppSelector((state) => state.dataset.keywordData);
  const dispatch = useAppDispatch();
  const { isFetching, isLoading: isInitialLoading } =
    useGetInitialKeywordDataQuery();
  const [, { isLoading }] = useGetRelatedKeywordDataMutation();

  const handleKeywordSelect = useCallback(
    (keywordObj: IKeywordData) => {
      dispatch(updateSelectedKeyword(keywordObj));
    },
    [dispatch]
  );

  if (isFetching || isLoading || isInitialLoading) {
    return (
      <CenteredCard>
        <CircularProgress size={60} />
      </CenteredCard>
    );
  }

  return keywordData.length ? (
    <WordCloud
      data={keywordData}
      selectedKeywordCallback={handleKeywordSelect}
    />
  ) : (
    <EmptyDatasetCard />
  );
}

export default WordCloudContainer;
