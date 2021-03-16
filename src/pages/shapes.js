import React, { createRef } from "react";

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle } from 'react-shapes';

import CryptoJS from "crypto-js";
import Chance from 'chance';

import { saveSvgAsPng } from 'save-svg-as-png';

const ShapesGenerator = () => {

    var data = [{ id: 1 }, { id: 2 }]

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    // console.log(ciphertext)

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // console.log(decryptedData); // [{id: 1}, {id: 2}]

    //https://jsfiddle.net/franciscop/819Lr84a/
    const chance = new Chance();
    chance.mixin({
        svg: function (options) {
            options = options || {};
            options.size = options.max_size || 30;
            if (typeof options.lines === 'undefined') options.lines = 20;
            if (typeof options.circles === 'undefined') options.circles = 10;
            if (typeof options.triangles === 'undefined') options.triangles = 10;
            if (typeof options.opacity === 'undefined') options.opacity = 0.3;
            options.background = options.background || chance.color();

            // Create a coordinate within an area bigger than the svg
            function point(min, max) {
                return chance.integer({ min: min || -50, max: max || 150 });
            }

            // Generate the actual svg
            // Docs: developer.mozilla.org/en-US/docs/Web/SVG/Element/line
            // viewBox use: stackoverflow.com/q/17498855
            var svg = '<svg version="1.1" viewBox="0 0 100 100"';
            svg += 'xmlns="http://www.w3.org/2000/svg"';
            svg += 'style="background-color:' + options.background + '">';
            for (var i = 0; i < options.lines; i++) {
                svg += '<line stroke="' + chance.color() + '" ';
                svg += 'stroke-width="' + point(1, 5) + '" ';
                svg += 'opacity="' + options.opacity + '" ';
                svg += 'x1="' + point() + '" y1="' + point() + '" ';
                svg += 'x2="' + point() + '" y2="' + point() + '" />';
            }
            for (var i = 0; i < options.circles; i++) {
                svg += '<circle cx="' + point() + '" ';
                svg += 'cy="' + point() + '" ';
                svg += 'r="' + point(1, options.max_size / 2) + '" ';
                svg += 'opacity="' + options.opacity + '" ';
                svg += 'fill="' + chance.color() + '"/>';
            }
            for (var i = 0; i < options.triangles; i++) {
                var s = options.max_size;
                var x = point();
                var y = point();
                svg += '<polygon fill="' + chance.color() + '" points="';
                svg += (x) + ',' + (y) + ' ';
                svg += (x + point(-s, s)) + ',' + (y + point(-s, s)) + ' ';
                svg += (x + point(-s, s)) + ',' + (y + point(-s, s));
                svg += '" opacity="' + options.opacity + '" ';
                svg += 'fill="' + chance.color() + '"/>';
            }
            return svg + '</svg>';
        }
    });
    const randomArt = chance.svg({
        lines: 25,
        triangles: 10,
        circles: 20,
        max_size: 30,
        opacity: 0.7,
        background1: 'black'
    });    
    const svgRef = createRef();

    const handleSave = () => {
        const svgElement = svgRef.current.querySelector('svg');
        saveSvgAsPng(svgElement, 'shapes.png', {scale: 1});
   };

    // Encrypt
    var ciphertext = CryptoJS.Rabbit.encrypt(randomArt, 'secret key 123').toString();
    console.log(CryptoJS.SHA256(randomArt))

    // Decrypt
    // var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log(decryptedData)

    return (
        <Layout>
            <SEO title="Image" />
            <h1>Shapes generator</h1>
            <div>
                <button onClick={handleSave}>Save</button>
            </div>
            <div ref={svgRef} style={{width:"100%", height:"auto"}} dangerouslySetInnerHTML={{ __html: randomArt }} />
            {/* <Rectangle width={100} height={100} fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
            <Circle r={50} fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
            <Ellipse rx={300} ry={100} fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
            <Line x1={25} x2={350} y1={25} y2={350} stroke={{ color: '#E65243' }} strokeWidth={3} />
            <Polyline points='25,25 25,350 500,350 500,500 305,250 20,15' fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
            <CornerBox size={400} width={150} orientation='topLeft' fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} />
            <Triangle width={150} height={150} fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} /> */}

        </Layout>
    );
}

export default ShapesGenerator
