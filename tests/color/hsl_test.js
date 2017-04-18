"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();
    
    describe('Testing HSL colors', () => {
        it('test setting value', () => {
            var test = new Color();

            test.setHSL(10, 20, 30);
            test.getHSL().should.be.eql([10, 20, 30]);
            test.getHSLA().should.be.eql([10, 20, 30, 1]);
            test.getHue().should.be.equal(10);
            test.getSaturation().should.be.equal(20);
            test.getLightness().should.be.equal(30);
            test.getAlpha().should.be.equal(1);
        });

        it('test setting HSLA value', () => {
            var test = new Color();

            test.setHSLA(10, 20, 30, .5);
            test.getHSLA().should.be.eql([10, 20, 30, .5]);
        });

        it('test setting array value', () => {
            var test = new Color();

            test.setHSLArray([10, 20, 30, .5]);
            test.getHSLA().should.be.eql([10, 20, 30, .5]);
        });

        it('test each component', () => {
            var test = new Color();

            test.setHSLA(10, 20, 30, .4);

            test.setHue(40);
            test.getHSLA().should.be.eql([40, 20, 30, .4]);

            test.setSaturation(35);
            test.getHSLA().should.be.eql([40, 35, 30, .4]);

            test.setLightness(25);
            test.getHSLA().should.be.eql([40, 35, 25, .4]);

            test.setAlpha(.3);
            test.getHSLA().should.be.eql([40, 35, 25, .3]);
        });

        it('test rounding values', () => {
            var test = new Color();

            test.setHSLA(11.5, 25.4, 78.3, .7);

            test.getHSL().should.be.eql([11.5, 25.4, 78.3]);
            test.getHSLA().should.be.eql([11.5, 25.4, 78.3, .7]);

            test.getHSL(true).should.be.eql([12, 25, 78]);
            test.getHSLA(true).should.be.eql([12, 25, 78, .7]);

            test.getHue().should.be.equal(11.5);
            test.getHue(true).should.be.equal(12);

            test.getSaturation().should.be.equal(25.4);
            test.getSaturation(true).should.be.equal(25);

            test.getLightness().should.be.equal(78.3);
            test.getLightness(true).should.be.equal(78);
        });

        it('test setting rounded values', () => {
            var test = new Color();

            test.setHSLArray([10.1, 20.9, 30.3, .3]);
            test.getHSLA(true).should.be.eql([10, 21, 30, .3]);

            // getHSL(true) should return rounded numbers (tested in function above)
            // therefore setting floating values flagged as rounded should return
            // floating values when calling getHSL(true)

            // This is incorrect usage of function, but its a good for testing
            test = new Color();
            test.setHSLArray([10.2, 20.9, 30.3, .3], true);
            test.getHSLA(true).should.be.eql([10.2, 20.9, 30.3, .3]);

            // Setting rounded value without second parameter should not break rounded components
            test.setLightness(76);
            test.getHSLA(true).should.be.eql([10.2, 20.9, 76, .3]);

            // Setting float value without second parameter should break rounded components
            test.setLightness(56.4);
            test.getHSLA(true).should.be.eql([10, 21, 56, .3]);

            // Test each component
            test.setHue(240.2, true);
            test.getHue().should.be.equal(240.2);
            test.getHue(true).should.be.equal(240.2);

            test.setSaturation(30.2, true);
            test.getSaturation().should.be.equal(30.2);
            test.getSaturation(true).should.be.equal(30.2);

            test.setLightness(54.9, true);
            test.getLightness().should.be.equal(54.9);
            test.getLightness(true).should.be.equal(54.9);
        });
    });
})();
