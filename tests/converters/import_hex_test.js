"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing hex string import', () => {
        it('test importing hex strings', () => {
            var test;

            // 3 characters
            test = Color.fromHex('1a3');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([17, 170, 51, 1]);

            // 4 characters
            test = Color.fromHex('#1a3');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([17, 170, 51, 1]);

            // 5 characters
            test = Color.fromHex('21a3B');
            (test === null).should.be.equal(true);

            test = Color.fromHex('#c1a3');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([17, 170, 51, 204 / 255]);

            // 6 characters
            test = Color.fromHex('1234F6');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([18, 52, 246, 1]);

            // 7 characters
            test = Color.fromHex('#11Aa33');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([17, 170, 51, 1]);

            // 8 characters
            test = Color.fromHex('a51234f6');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([18, 52, 246, 165 / 255]);

            // 9 characters
            test = Color.fromHex('#a51234f6');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([18, 52, 246, 165 / 255]);

            // 10+ characters and invalid strings
            (Color.fromHex('a51234f612') === null).should.be.equal(true);
            (Color.fromHex('#a51234f612') === null).should.be.equal(true);
            (Color.fromHex('1az') === null).should.be.equal(true);
            (Color.fromHex('#12G') === null).should.be.equal(true);
            (Color.fromHex('12G521') === null).should.be.equal(true);
        });
    });
})();
