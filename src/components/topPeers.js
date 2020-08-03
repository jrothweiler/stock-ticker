import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";

import { usePeersSelector } from "./componentHooks/usePeersSelector";
import { searchSymbol } from "./componentHooks/searchSymbol";
export const TopPeers = (props) => {
  const peersInfo = usePeersSelector();

  return (
    <DisplayWrapper {...props}>
      <TitleHeader>TOP PEERS</TitleHeader>
      {peersInfo.map((peer) => (
        <Text
          key={peer}
          className="topPeer"
          mr="1.0rem"
          display="inline-block"
          variant="secondary"
          onClick={searchSymbol(peer)}
        >
          {peer}
        </Text>
      ))}
      {/* WORK is added here as a valid default stock for demonstration purposes */}
      <Text
        className="topPeer"
        display="inline-block"
        variant="secondary"
        onClick={searchSymbol("WORK")}
      >
        WORK
      </Text>
    </DisplayWrapper>
  );
};
