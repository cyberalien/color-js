"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing mixing colors', () => {
        it('test mixing colors', () => {
            var color1 = new Color(),
                color2 = new Color();

            // Test 50% mix
            color1.setRGB(10, 20, 30);
            color2.setRGB(0, 40, 60);
            color1.mix(color2);
            color1.getRGBA().should.be.eql([5, 30, 45, 1]);

            // Test 100% mix
            color1.setRGB(10, 20, 30);
            color2.setRGB(0, 40, 60);
            color1.mix(color2, 100);
            color1.getRGBA().should.be.eql([0, 40, 60, 1]);

            // Test 0% mix
            color1.setRGB(10, 20, 30);
            color2.setRGB(0, 40, 60);
            color1.getRGBA().should.be.eql([10, 20, 30, 1]);

            // Test 75% mix
            color1.setRGB(10, 20, 30);
            color2.setRGB(0, 40, 60);
            color1.mix(color2, 75);
            color1.getRGBA().should.be.eql([2.5, 35, 52.5, 1]);

            // Test 30% mix
            color1.setRGB(10, 20, 30);
            color2.setRGB(0, 40, 60);
            color1.mix(color2, 30);
            color1.getRGBA().should.be.eql([7, 26, 39, 1]);

            // Test with alpha
            color1.setRGBA(10, 20, 30, .6);
            color2.setRGBA(0, 40, 60, .2);
            color1.mix(color2, 75);
            color1.getRGB().should.be.eql([2.5, 35, 52.5]);
            (Math.round(color1.getAlpha() * 1000) / 1000).should.be.equal(.3); // Round 0.30000000000000004
        });
    });
})();
