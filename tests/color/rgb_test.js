"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing RGB colors', () => {
        it('test setting value', () => {
            var test = new Color();

            test.setRGB(10, 20, 30);
            test.getRGB().should.be.eql([10, 20, 30]);
            test.getRGBA().should.be.eql([10, 20, 30, 1]);
            test.getRed().should.be.equal(10);
            test.getGreen().should.be.equal(20);
            test.getBlue().should.be.equal(30);
            test.getAlpha().should.be.equal(1);
        });

        it('test setting RGBA value', () => {
            var test = new Color();

            test.setRGBA(10, 20, 30, .5);
            test.getRGBA().should.be.eql([10, 20, 30, .5]);
        });

        it('test setting array value', () => {
            var test = new Color();

            test.setRGBArray([10, 20, 30, .5]);
            test.getRGBA().should.be.eql([10, 20, 30, .5]);
        });

        it('test each component', () => {
            var test = new Color();

            test.setRGBA(10, 20, 30, .4);

            test.setRed(40);
            test.getRGBA().should.be.eql([40, 20, 30, .4]);

            test.setGreen(35);
            test.getRGBA().should.be.eql([40, 35, 30, .4]);

            test.setBlue(125);
            test.getRGBA().should.be.eql([40, 35, 125, .4]);

            test.setAlpha(.3);
            test.getRGBA().should.be.eql([40, 35, 125, .3]);
        });

        it('test rounding values', () => {
            var test = new Color();

            test.setRGBA(11.5, 25.4, 78.3, .7);

            test.getRGB().should.be.eql([11.5, 25.4, 78.3]);
            test.getRGBA().should.be.eql([11.5, 25.4, 78.3, .7]);

            test.getRGB(true).should.be.eql([12, 25, 78]);
            test.getRGBA(true).should.be.eql([12, 25, 78, .7]);

            test.getRed().should.be.equal(11.5);
            test.getRed(true).should.be.equal(12);

            test.getGreen().should.be.equal(25.4);
            test.getGreen(true).should.be.equal(25);

            test.getBlue().should.be.equal(78.3);
            test.getBlue(true).should.be.equal(78);
        });

        it('test setting rounded values', () => {
            var test = new Color();

            test.setRGBArray([10.1, 20.9, 30.3, .3]);
            test.getRGBA(true).should.be.eql([10, 21, 30, .3]);

            // rgb(true) should return rounded numbers (tested in function above)
            // therefore setting floating values flagged as rounded should return
            // floating values when calling rgb(true)

            // This is incorrect usage of function, but its a good for testing
            test = new Color();
            test.setRGBArray([10.2, 20.9, 30.3, .3], true);
            test.getRGBA(true).should.be.eql([10.2, 20.9, 30.3, .3]);

            // Setting rounded value without second parameter should not break rounded components
            test.setBlue(76);
            test.getRGBA(true).should.be.eql([10.2, 20.9, 76, .3]);

            // Setting float value without second parameter should break rounded components
            test.setBlue(176.4);
            test.getRGBA(true).should.be.eql([10, 21, 176, .3]);

            // Test each component
            test.setRed(40.2, true);
            test.getRed().should.be.equal(40.2);
            test.getRed(true).should.be.equal(40.2);

            test.setGreen(30.2, true);
            test.getGreen().should.be.equal(30.2);
            test.getGreen(true).should.be.equal(30.2);

            test.setBlue(54.9, true);
            test.getBlue().should.be.equal(54.9);
            test.getBlue(true).should.be.equal(54.9);
        });
    });
})();
