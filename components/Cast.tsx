import React, { useEffect, useRef } from 'react';
import CastPoster from './castPoster';
import { ScrollView, StyleSheet } from 'react-native';

const Cast = ({ cast, onScrollBegin, onScrollEnd }: { cast: any, onScrollBegin: () => void, onScrollEnd: () => void }) => {

    const scrollViewRef = useRef<ScrollView>(null);
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }, [cast])

    return (
        <ScrollView horizontal={true} snapToInterval={160} onScrollBeginDrag={onScrollBegin} onScrollEndDrag={onScrollEnd} ref={scrollViewRef}>
            <CastPoster person={cast[0]} />
            <CastPoster person={cast[1]} />
            <CastPoster person={cast[2]} />
            <CastPoster person={cast[3]} />
            <CastPoster person={cast[4]} />
            <CastPoster person={cast[5]} />
            <CastPoster person={cast[6]} />
            <CastPoster person={cast[7]} />
            <CastPoster person={cast[8]} />
            <CastPoster person={cast[9]} />
            <CastPoster person={cast[10]} />
        </ScrollView>
    );
};



export default Cast;