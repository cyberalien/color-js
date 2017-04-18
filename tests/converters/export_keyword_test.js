"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing keywords export', () => {
        it('test color to keyword conversion', () => {
            var test = new Color();

            // Test base keyword
            test = new Color();
            test.setRGB(0, 0, 255);
            test.toKeyword().should.be.equal('blue');

            // Test extended keywords
            test = new Color();
            test.setRGB(255, 250, 250);
            test.toKeyword().should.be.equal('snow');

            // Test closest match
            test = new Color();
            test.setRGB(125, 140, 10);
            test.toKeyword(true, false).should.be.equal('olive');

            test = new Color();
            test.setRGB(64, 64, 64);
            test.toKeyword(true, false).should.be.equal('gray');

            // Test exact match
            test = new Color();
            test.setRGB(0, 0, 128);
            test.toKeyword(false, false).should.be.equal('navy');

            test = new Color();
            test.setRGB(250, 128, 114);
            test.toKeyword(false).should.be.equal('salmon');

            test = new Color();
            test.setRGB(250, 128, 114);
            test.toKeyword(false, false).should.be.equal(false);

            test = new Color();
            test.setRGB(10, 20, 30);
            test.toKeyword(false).should.be.equal(false);

            // Test transparent color
            test = new Color();
            test.setRGBA(0, 0, 128, 0);
            test.toKeyword().should.be.equal('transparent');

            test = new Color();
            test.setRGBA(255, 128, 64, 0);
            test.toKeyword().should.be.equal('transparent');
        });
    });
})();
