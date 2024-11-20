import React, { useEffect, useRef } from "react";
import CastPoster from "./CastPoster";
import { ScrollView } from "react-native";

const Cast = ({ cast }: { cast: any }) => {
  const MAX_CAST_MEMBERS = 15;

  const limitedCast = cast.slice(0, MAX_CAST_MEMBERS);

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [cast]);

  return (
    <ScrollView horizontal={true} snapToInterval={160} ref={scrollViewRef}>
      {limitedCast.map((person: any, index: number) => (
        <CastPoster key={index} person={person} />
      ))}
    </ScrollView>
  );
};

export default Cast;
