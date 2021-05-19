import { PixelPainterBuilder } from "../builders/pixel-painter.builder";
import { Colour } from "../enums/colour";
import { Pixel } from "../models/pixel";

describe('When filling a pixel with a colour', () => {
    it('Then the colour is filled', () => {
        const pixel: Pixel = {
            colour: Colour.Blue,
            x: 1,
            y: 1,
        };

        const builder = new PixelPainterBuilder();

        builder.fillPixel(pixel);

        const results = builder.getPixels();

        const result = results.find(r => r.x === pixel.x && r.y === pixel.y);

        expect(result?.colour).toBe(Colour.Blue);
    })
})

describe('When filling a row of pixels with a colour', () => {
    it('Then the pixels are filled with that colour', () => {
        const firstPixel: Pixel = {
            colour: Colour.Blue,
            x: 2,
            y: 2,
        };

        const lastPixel: Pixel = {
            colour: Colour.Blue,
            x: 8,
            y: 2,
        };

        const builder = new PixelPainterBuilder();

        builder.fillRowOfPixels(firstPixel, lastPixel, Colour.Blue);

        const results = builder.getPixelsOfColour(Colour.Blue);

        expect(results.length).toBe(7);
    })
})

describe('When filling a column of pixels with a colour', () => {
    it('Then the pixels are filled with that colour', () => {
        const firstPixel: Pixel = {
            colour: Colour.Blue,
            x: 8,
            y: 2,
        };

        const lastPixel: Pixel = {
            colour: Colour.Blue,
            x: 8,
            y: 9,
        };

        const builder = new PixelPainterBuilder();

        builder.fillColumnOfPixels(firstPixel, lastPixel, Colour.Blue);

        const results = builder.getPixelsOfColour(Colour.Blue);

        expect(results.length).toBe(8);
    })
})

describe('When flooding pixels with a colour', () => {
    it('Then the approriate pixels are filled with colour', () => {
        const bluePixelStart: Pixel = {
            colour: Colour.Blue,
            x: 2,
            y: 2,
        };

        const bluePixelEnd: Pixel = {
            colour: Colour.Blue,
            x: 8,
            y: 2,
        };

        const greenPixelStart: Pixel = {
            colour: Colour.Green,
            x: 8,
            y: 2,
        };

        const greenPixelEnd: Pixel = {
            colour: Colour.Green,
            x: 8,
            y: 9,
        };

        const floodingPixel: Pixel = {
            colour: Colour.Red,
            x: 7,
            y: 2,
         }

        const builder = new PixelPainterBuilder();

        builder.fillRowOfPixels(bluePixelStart, bluePixelEnd, Colour.Blue)
                .fillColumnOfPixels(greenPixelStart, greenPixelEnd, Colour.Green)
                .flood()

        const results = builder.getPixels();

        const result = results.find(r => r.x === pixel.x && r.y === pixel.y);

        expect(result?.colour).toBe(Colour.Blue);
    })
})
