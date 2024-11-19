import React, { useEffect, useRef } from "react";
import CastPoster from "./castPoster";
import { ScrollView, StyleSheet } from "react-native";

const Cast = ({ cast }: { cast: any }) => {
  const MAX_CAST_MEMBERS = 15;

  const limitedCast = cast.slice(0, MAX_CAST_MEMBERS);
  return (
    <ScrollView horizontal={true} snapToInterval={160}>
      {limitedCast.map((person: any, index: number) => (
        <CastPoster key={index} person={person} />
      ))}
    </ScrollView>
  );
};

export default Cast;
