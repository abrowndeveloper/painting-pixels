import { Pixel } from './../models/pixel';
import { Colour } from '../enums/colour';

export class PixelPainterBuilder {
    public constructor() {
        this.populatePixels();
    }

    private pixels: Pixel[] = [];

    public fillPixel(newPixel: Pixel): PixelPainterBuilder {
        const pixel = this.pixels
            .find(pixel => pixel?.x === newPixel.x && pixel?.y === newPixel.y);

        if (pixel) {
            pixel.colour = newPixel.colour;
        }

        return this;
    }

    public fillRowOfPixels(pixelStart: Pixel, pixelEnd: Pixel, colour: Colour): PixelPainterBuilder {
        if (pixelStart.y !== pixelEnd.y) {
            throw Error('The two pixels must have the same Y co-ordinate');
        }

        const pixelsToFill = this.pixels
            .filter(pixel => pixel.y === pixelStart.y &&
                pixel.x >= pixelStart.x &&
                pixel.x <= pixelEnd.x);

        if (pixelsToFill) {
            pixelsToFill.forEach((pixel) => pixel.colour = colour)
        }

        return this;
    }

    public fillColumnOfPixels(pixelStart: Pixel, pixelEnd: Pixel, colour: Colour): PixelPainterBuilder {
        if (pixelStart.x !== pixelEnd.x) {
            throw Error('The two pixels must have the same X co-ordinate');
        }

        const pixelsToFill = this.pixels
            .filter(pixel => (pixel.x === pixelStart.x) &&
                pixel.y >= pixelStart.y &&
                pixel.y <= pixelEnd.y);

        if (pixelsToFill) {
            pixelsToFill.forEach((pixel) => pixel.colour = colour)
        }

        return this;
    }

    // Didn't finish this
    public flood(pixel: Pixel, colour: Colour): PixelPainterBuilder {
        const pixelsWhichMatchHorizontally = this.pixels
            .filter(p => p.x === pixel.x && p.colour !== Colour.Colourless);

        const pixelsPriorWhichMatchHorizontally = pixelsWhichMatchHorizontally.

        const pixelsWhichMatchVertically = this.pixels
            .filter(p => p.y === pixel.y && p.colour !== Colour.Colourless);

        const allPixelsWhichMatch = [...pixelsWhichMatchHorizontally, ...pixelsWhichMatchVertically];

        allPixelsWhichMatch.forEach(p => p.colour = pixel.colour);

        return this;
    }

    public getPixels(): Pixel[] {
        return this.pixels;
    }

    public getPixelsOfColour(colour: Colour): Pixel[] {
        return this.pixels.filter(pixel => pixel.colour.toString() === colour.toString());
    }

    public getBySequentialNumbers(numbers: number[]): number[] {
        return numbers.filter((number, i) => numbers[i - 1] === (number - 1) || numbers[i + 1] === (number + 1));
    }

    public orderAscending(numbers: number[]): number[] {
        return numbers.sort((a, b) => a - b);
    }

    private populatePixels(): void {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                this.pixels.push({
                    colour: Colour.Colourless,
                    x: x + 1,
                    y: y + 1
                });
            }
        }
    }
}
