"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing hex string export', () => {
        it('test exporting hex strings', () => {
            var test;

            // Test with color that can be compressed
            test = new Color();
            test.setRGBA(17, 170, 51, 204 / 255);
            test.toHex().should.be.equal('#11aa33');
            test.toHex(true).should.be.equal('#1a3');
            test.toIEHex().should.be.equal('#cc11aa33');
            test.toIEHex(true).should.be.equal('#c1a3');

            // Change alpha to something that cannot be compressed
            test.setAlpha(.25);
            test.toHex(true).should.be.equal('#1a3');
            test.toIEHex().should.be.equal('#4011aa33');
            test.toIEHex(true).should.be.equal('#4011aa33');

            // Change component to something that cannot be compressed
            test.setRed(100);
            test.toHex(true).should.be.equal('#64aa33');

            // Test HSL conversion
            test.setHSLA(270, 50, 25, .7);
            test.toHex().should.be.equal('#402060');
            test.toIEHex().should.be.equal('#b3402060');
        });
    });
})();
