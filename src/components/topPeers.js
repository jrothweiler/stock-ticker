import React from "react";
import { peersSelector } from "../selectors/peersSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import en from "timeago.js/lib/lang/vi";
import { useDispatch, useSelector } from "react-redux";

timeago.register("en", en);

export const TopPeers = (props) => {
  let currentText = "WORK";

const handleSearch = (peer) => {
  console.log(`search ${peer}`)
  dispatch({ type: "searchSymbol", payload: peer });
}
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  const peersInfo = useSelector(peersSelector);
  return (
    <DisplayWrapper height={props.height}>
      <TitleHeader>TOP PEERS</TitleHeader>
      {peersInfo &&
        peersInfo.map((peer) => (
              <Text key={peer} className="topPeer" display="inline-block" variant="secondary" onClick={handleSearch(peer)}>
                {peer}&nbsp;&nbsp;&nbsp;
              </Text>
        ))
      }
      <Text className="topPeer" display="inline-block" variant="secondary">
      WORK&nbsp;&nbsp;&nbsp;
    </Text>
    </DisplayWrapper>
  );
};
