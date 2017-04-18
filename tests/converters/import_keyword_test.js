"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing keywords import', () => {
        it('test creating object from keyword', () => {
            var test;

            // Test base keyword
            test = Color.fromKeyword('blue');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([0, 0, 255, 1]);

            test = Color.fromKeyword('Red');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([255, 0, 0, 1]);

            (Color.fromKeyword('red', false) === null).should.be.equal(false);

            // Test extended keyword
            test = Color.fromKeyword('limegreen');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([50, 205, 50, 1]);

            test = Color.fromKeyword('SpringGreen');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([0, 255, 127, 1]);

            (Color.fromKeyword('limegreen', false) === null).should.be.equal(true);

            // Test transparent color
            test = Color.fromKeyword('transparent');
            (test === null).should.be.equal(false);
            test.getRGBA().should.be.eql([0, 0, 0, 0]);
        });

        it('test invalid keyword', () => {
            (Color.fromKeyword('') === null).should.be.equal(true); // Empty string
            (Color.fromKeyword('1') === null).should.be.equal(true); // Invalid string
            (Color.fromKeyword('Blackest') === null).should.be.equal(true); // Invalid string
        });
    });
})();
