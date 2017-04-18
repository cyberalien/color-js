"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing color space conversion', () => {
        it('test RGB to HSL conversion', () => {
            var test = new Color();

            test.setRGBA(255, 128, 0, .2);
            test.getRGBA().should.be.eql([255, 128, 0, .2]);
            test.getHue(true).should.be.equal(30);
            test.getSaturation().should.be.equal(100);
            test.getLightness().should.be.equal(50);
        });

        it('test HSL to RGB conversion', () => {
            var test = new Color();

            test.setHSLA(270, 50, 25, .7);
            test.getHSLA().should.be.eql([270, 50, 25, .7]);
            test.getRed().should.be.equal(63.75);
            test.getGreen().should.be.equal(31.875);
            test.getBlue().should.be.equal(95.625);
        });

        it('test color space reset', () => {
            // Test if one color space is reset after another one is changed
            var test = new Color();

            test.setHSLA(270, 50, 25, .7);
            test.getHue().should.be.equal(270);
            test.getSaturation().should.be.equal(50);
            test.getLightness().should.be.equal(25);
            test.getHSL(true).should.be.eql([270, 50, 25]);

            test.setGreen(128);
            test.getHue().should.not.be.equal(270);
            test.getSaturation().should.not.be.equal(50);
            test.getLightness().should.not.be.equal(25);
            test.getHSL(true).should.not.be.eql([270, 50, 25]);

            test.getRGB().should.be.eql([63.75, 128, 95.625]);
            test.getRGB(true).should.be.eql([64, 128, 96]);

            test.setHue(210); // changes only green and blue
            test.getRed().should.be.equal(63.75);
            test.getGreen().should.not.be.equal(128);
            test.getBlue().should.not.be.equal(95.625);
            test.getRGB(true).should.not.be.eql([64, 128, 96]);

            test.setSaturation(75);
            test.getRed().should.not.be.equal(63.75);
        });
    });
})();
