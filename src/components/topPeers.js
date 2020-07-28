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
    <DisplayWrapper {...props}>
      <TitleHeader>TOP PEERS</TitleHeader>
      {peersInfo &&
        peersInfo.map((peer) => (
              <Text key={peer} className="topPeer" mr="1.0rem" display="inline-block" variant="secondary" onClick={() => handleSearch(peer)}>
                {peer}
              </Text>
        ))
      }
      {/* WORK is added here as a valid default stock for demonstration purposes */}
      <Text className="topPeer" display="inline-block" variant="secondary" onClick={() => handleSearch("WORK")}>
      WORK
    </Text>
    </DisplayWrapper>
  );
};
