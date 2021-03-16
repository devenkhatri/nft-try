import React, { useState, useMemo } from "react";

import Layout from '../components/layout'
import SEO from '../components/seo'

import * as d3 from "d3";
import Mondrian from "../components/Mondrian";
import useMondrianGenerator from "../components/useMondrianGenerator";

import ASCII from 'react-rainbow-ascii'


const Range = ({ name, value, onChange }) => {
    return (
        <div style={{ display: "inline-block" }}>
            {name}
            <br />
            <input
                type="range"
                name={name}
                min={0}
                max={1}
                step={0.1}
                value={value}
                onChange={event => onChange(Number(event.target.value))}
            />
        </div>
    );
};

const AsciiGenerator = () => {

    const [text, setText] = useState('Magic!')
    
    const [redRatio, setRedRatio] = useState(0.2);
    const [yellowRatio, setYellowRatio] = useState(0.4);
    const [blueRatio, setBlueRatio] = useState(0.1);
    const [blackRatio, setBlackRatio] = useState(0.1);
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [subdivisions, setSubdivisions] = useState(0.5);
    const [maxDepth, setMaxDepth] = useState(0.4);

    let mondrian = useMondrianGenerator({
        redRatio,
        yellowRatio,
        blueRatio,
        blackRatio,
        subdivisions,
        maxDepth
    });
    return (
        <Layout>
            <SEO title="Image" />
            <input type="text" value={text} onChange={e=>setText(e.target.value)}></input>
            <ASCII text={text} />            
            <h1>Piet Mondrian generator</h1>
            <p>Tweak the params, see what happens. 👩‍🎤</p>
            <div>
                <Range name="red" value={redRatio} onChange={setRedRatio} />
                <Range
                    name="yellow"
                    value={yellowRatio}
                    onChange={setYellowRatio}
                />
                <Range
                    name="blue"
                    value={blueRatio}
                    onChange={setBlueRatio}
                />
                <Range
                    name="black"
                    value={blackRatio}
                    onChange={setBlackRatio}
                />
                <Range
                    name="subdivisions"
                    value={subdivisions}
                    onChange={setSubdivisions}
                />
                <Range
                    name="maxDepth"
                    value={maxDepth}
                    onChange={setMaxDepth}
                />
            </div>
            <div>
                <label>Width: </label>
                <input
                    type="number"
                    value={width}
                    onChange={event => setWidth(event.target.value)}
                />
                <label>Height: </label>
                <input
                    type="number"
                    value={height}
                    onChange={event => setHeight(event.target.value)}
                />
            </div>
            <svg width={width} height="100%" style={{ margin: "0 auto" }}>
                <Mondrian
                    x={0}
                    y={20}
                    width={width}
                    height={height}
                    data={mondrian}
                />
            </svg>


        </Layout>
    );
}

export default AsciiGenerator
