import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, AnyAction } from "redux";

import { IReducer, selectBlock } from "reducers";
import { Container } from "./styles";
import { N, INDEX } from "typings";

interface IProps {
  colIndex: INDEX;
  rowIndex: INDEX;
}

interface IState {
  value: N;
  isActive: boolean;
}

const Block: FC<IProps> = ({ colIndex, rowIndex }) => {
  const state = useSelector<IReducer, IState>(
    ({ workingGrid, selectedBlock }) => ({
      isActive: selectedBlock
        ? selectedBlock[0] === rowIndex && selectedBlock[1] === colIndex
        : false,
      value: workingGrid ? workingGrid[rowIndex][colIndex] : 0,
    })
  );
  const dispatch = useDispatch<Dispatch<AnyAction>>();

  const handleClick = () => {
    if (!state.isActive) dispatch(selectBlock([rowIndex, colIndex]));
  };

  return (
    <Container active={state.isActive} onClick={handleClick}>
      {state.value === 0 ? "" : state.value}
    </Container>
  );
};

export default Block;
