"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing cloning color object', () => {
        it('test rgb clone', () => {
            var color1 = new Color(),
                color2;

            color1.setRGB(10, 20, 30);
            color2 = color1.clone();

            // Check clone
            color2.getRGBA().should.be.eql([10, 20, 30, 1]);

            // Change original color
            color1.setRed(15);
            color1.setAlpha(0.5);
            color2.getRGBA().should.be.eql([10, 20, 30, 1]);

            // Change cloned color
            color2.setGreen(25);
            color2.setAlpha(0.7);
            color1.getRGBA().should.be.eql([15, 20, 30, 0.5]);
        });

        it('test hsl clone', () => {
            var color1 = new Color(),
                color2;

            color1.setHSL(11, 22, 33.5);
            color2 = color1.clone();

            // Check clone
            color2.getHSLA().should.be.eql([11, 22, 33.5, 1]);
            color2.getHSLA(true).should.be.eql([11, 22, 34, 1]);

            // Change original color
            color1.setHue(40);
            color1.setAlpha(0.5);
            color2.getHSLA().should.be.eql([11, 22, 33.5, 1]);

            // Change cloned color
            color2.setLightness(25);
            color2.setAlpha(0.7);
            color1.getHSLA().should.be.eql([40, 22, 33.5, 0.5]);
        });
    });
})();
