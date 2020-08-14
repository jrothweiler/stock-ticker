import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";

import { usePeersSelector } from "./componentHooks/usePeersSelector";
import { useSearchSymbol } from "./componentHooks/useSearchSymbol";
export const TopPeers = (props) => {
  const peersInfo = usePeersSelector();
  const searchSymbol = useSearchSymbol();
  return (
    <DisplayWrapper {...props}>
      <TitleHeader>TOP PEERS</TitleHeader>
      {peersInfo.map((peer) => (
        <Text
          key={peer}
          className="topPeer"
          mr="18px"
          display="inline-block"
          variant="secondary"
          opacity={1}
          onClick={() => searchSymbol(peer)}
        >
          {peer}
        </Text>
      ))}
      {/* WORK is added here as a valid default stock for demonstration purposes */}
      <Text
        className="topPeer"
        display="inline-block"
        variant="secondary"
        opacity={1}
        onClick={() => searchSymbol("WORK")}
      >
        WORK
      </Text>
    </DisplayWrapper>
  );
};
