"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing string import', () => {
        it('test importing RGB strings', () => {
            var test;

            // Test spacing and case
            test = Color.fromString('rgb(10, 20, 30)');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([10, 20, 30, 1]);

            test = Color.fromString('RGB(10,20,30)');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([10, 20, 30, 1]);

            test = Color.fromString('rgb  (\t10  ,   20  ,   30  )');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([10, 20, 30, 1]);

            // Test percentages
            test = Color.fromString('rgb(10%, 20%, 30%)');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([25.5, 51, 76.5, 1]);

            // Test RGBA
            test = Color.fromString('rgba(10, 20, 30, .5)');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([10, 20, 30, .5]);
        });

        it('test importing HSL strings', () => {
            var test;

            test = Color.fromString('hsl(10, 20%, 30%)');
            (test === null).should.be.equal(false);
            test.getHSLA().should.be.eql([10, 20, 30, 1]);

            test = Color.fromString('HSLA ( 10 , 20% , 30% , .2 )');
            (test === null).should.be.equal(false);
            test.getHSLA().should.be.eql([10, 20, 30, .2]);

            test = Color.fromString('hsl(10.4, 20.7%, 30.1%)');
            (test === null).should.be.equal(false);
            test.getHSL(true).should.be.eql([10, 21, 30]);
        });

        it('test importing HEX strings', () => {
            var test;

            test = Color.fromString('#1a3');
            (test === null).should.be.equal(false);
            test.getRGBA(true).should.be.eql([17, 170, 51, 1]);

            test = Color.fromString('a51234f6');
            (test === null).should.be.equal(false);
            test.getRGBA(true).should.be.eql([18, 52, 246, 165 / 255]);
        });

        it('test importing keywords', () => {
            var test;

            test = Color.fromString('skyblue');
            (test === null).should.be.equal(false);
            test.getRGBA(true).should.be.eql([135, 206, 235, 1]);
        });

        it('test importing invalid strings', () => {
            (Color.fromString('') === null).should.be.equal(true); // Empty string
            (Color.fromString('1') === null).should.be.equal(true); // Invalid string
            (Color.fromString('rgb(10%, 20%, 30)') === null).should.be.equal(true); // Can't mix percentages and raw values
            (Color.fromString('rgb(10, 20, 30%)') === null).should.be.equal(true); // Can't mix percentages and raw values
            (Color.fromString('hsl(10%, 20%, 30%)') === null).should.be.equal(true); // Hue can't be percentage
            (Color.fromString('hsl(10, 20, 30%)') === null).should.be.equal(true); // Saturation must be percentage
            (Color.fromString('hsl(10, 20%, 30)') === null).should.be.equal(true); // Lightness must be percentage
            (Color.fromString('hsl(10, 20%, 0F%)') === null).should.be.equal(true); // Invalid character
            (Color.fromString('rgb(10%, 20%, 30%, 40%)') === null).should.be.equal(true); // Too many components
            (Color.fromString('rgba(10%, 20%, 30%, 40%, 50%)') === null).should.be.equal(true); // Too many components
            (Color.fromString('hsl(10%, 20%, 30%, 40%)') === null).should.be.equal(true); // Too many components
            (Color.fromString('hsla(10%, 20%, 30%, 40%, 50%)') === null).should.be.equal(true); // Too many components
            (Color.fromString('rgb(10%, 20%)') === null).should.be.equal(true); // Too few components
            (Color.fromString('rgba(10%, 20%, 30%)') === null).should.be.equal(true); // Too few components
            (Color.fromString('hsl(10, 20%)') === null).should.be.equal(true); // Too few components
            (Color.fromString('hsla(10, 20%, 30%)') === null).should.be.equal(true); // Too few components

            // Color adjustment strings
            (Color.fromString('rgba(#123, 30%)') === null).should.be.equal(true);
            (Color.fromString('rgba(rgb(10, 20, 30), 30%)') === null).should.be.equal(true);
            (Color.fromString('rgb(@primaryMedium, 20, 30)') === null).should.be.equal(true);
            (Color.fromString('hsl(hue(#123), 20, 30)') === null).should.be.equal(true);
        });
    });
})();
