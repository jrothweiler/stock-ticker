import React from "react";
import { peersSelector } from "../selectors/peersSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";

export const TopPeers = (props) => {
    const dispatch = useDispatch();
    const peersInfo = useSelector(peersSelector);

  const handleSearch = (peer) => {
    dispatch({ type: "searchSymbol", payload: peer });
}

  return (
    <DisplayWrapper height={props.height}>
      <TitleHeader>TOP PEERS</TitleHeader>
      {peersInfo &&
        peersInfo.map((peer) => (
              <Text key={peer} className="topPeer" display="inline-block" variant="secondary" onClick={() => handleSearch(peer)}>
                {peer}&nbsp;&nbsp;&nbsp;
              </Text>
        ))
      }
      <Text className="topPeer" display="inline-block" variant="secondary" onClick={() => handleSearch("WORK")}>
      WORK&nbsp;&nbsp;&nbsp;&nbsp;
    </Text>
    </DisplayWrapper>
  );
};
