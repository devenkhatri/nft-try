import React, { useState, useMemo } from "react";

import Layout from '../components/layout'
import SEO from '../components/seo'

import potrace from 'potrace';

const Posterize = () => {
    var imagePath = "/images/gatsby-icon.png";
    imagePath = "/images/yao.jpg";

    const [tracedSVG, setTracedSVG] = React.useState()
    const [posterizedSVG, setPosterizedSVG] = React.useState()

    var traceParameters = {
        threshold: 128
    };
    potrace.trace(imagePath, traceParameters, function (err, svg) {
        if (err) throw err;
        setTracedSVG(svg)  
    });

    var posterizerParameters = {
        steps: 3,
        threshold: 128
    };
    potrace.posterize(imagePath, posterizerParameters, function (err, svg) {
        if (err) throw err;
        setPosterizedSVG(svg);
    });
    return (
        <Layout>
            <SEO title="Image" />
            <h1>Posterize Image</h1>
            <div style={{ width: "100%", height: "auto" }} dangerouslySetInnerHTML={{ __html: tracedSVG }} />
            <div style={{ width: "100%", height: "auto" }} dangerouslySetInnerHTML={{ __html: posterizedSVG }} />
        </Layout>
    );
}

export default Posterize
