"use strict";

(() => {
    var isBrowser = (typeof module !== 'object' || !module.exports);

    var Color = isBrowser ? CAColor : require('../../src/color');

    var chai = isBrowser ? self.chai : require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Testing string export', () => {
        it('test exporting hex strings', () => {
            var test;

            // Round values, should get hex string
            test = new Color();
            test.setRGB(255, 128, 0);
            test.toString().should.be.equal('#ff8000');
            test.toString({compress: true}).should.be.equal('#ff8000');
            test.toHex().should.be.equal('#ff8000');

            // Compressed hex string
            test = new Color();
            test.setRGB(255, 68, 34);
            test.toString().should.be.equal('#ff4422');
            test.toString({compress: true}).should.be.equal('#f42');
            test.toHex(true).should.be.equal('#f42');

            // Force hex string
            test = new Color();
            test.setRGBA(255, 68, 34, .7);
            test.toString({
                format: 'hex'
            }).should.be.equal('#ff4422');
            test.toHex().should.be.equal('#ff4422');

            test = new Color();
            test.setRGB(255, 64.2, 17);
            test.toString({
                format: 'hex'
            }).should.be.equal('#ff4011');
            test.toHex().should.be.equal('#ff4011');
        });

        it('test exporting rgba strings', () => {
            var test;

            // Round values with alpha, should get rgba color
            test = new Color();
            test.setRGBA(128, 68, 34, .7);
            test.toString().should.be.equal('rgba(128, 68, 34, 0.7)');
            test.toString({compress: true}).should.be.equal('rgba(128,68,34,.7)');

            // Test with explicit format
            test = new Color();
            test.setRGBA(255, 128, 0, .7);
            test.toString({format: 'rgb'}).should.be.equal('rgba(255, 128, 0, 0.7)');
            test.toRGBString().should.be.equal('rgba(255, 128, 0, 0.7)');
            test.toString({format: 'rgb', compress: true}).should.be.equal('rgba(255,128,0,.7)');
            test.toRGBString(true).should.be.equal('rgba(255,128,0,.7)');

            // Test floating numbers
            test = new Color();
            test.setRGBA(255, 64.2, 17, .4123);

            // Test with default alphaPrecision = 2
            test.toString({format: 'rgb'}).should.be.equal('rgba(255, 64, 17, 0.41)');
            test.toRGBString().should.be.equal('rgba(255, 64, 17, 0.41)');
            test.toString({format: 'rgb', compress: true}).should.be.equal('rgba(255,64,17,.41)');
            test.toRGBString(true).should.be.equal('rgba(255,64,17,.41)');

            // Test alphaPrecision
            test.toString({format: 'rgb', alphaPrecision: 1}).should.be.equal('rgba(255, 64, 17, 0.4)');
            test.toRGBString(false, false, 1).should.be.equal('rgba(255, 64, 17, 0.4)');
            test.toString({format: 'rgb', alphaPrecision: 3}).should.be.equal('rgba(255, 64, 17, 0.412)');
            test.toRGBString(false, false, 3).should.be.equal('rgba(255, 64, 17, 0.412)');
            test.toString({
                format: 'rgb',
                alphaPrecision: 5
            }).should.be.equal('rgba(255, 64, 17, 0.4123)');
            test.toRGBString(false, false, 5).should.be.equal('rgba(255, 64, 17, 0.4123)');

            // Test that roundPrecision is ignored
            test.toString({format: 'rgb', roundPrecision: 3}).should.be.equal('rgba(255, 64, 17, 0.41)');

            // Test with rgba format
            test = new Color();
            test.setRGB(255, 128, 0);
            test.toString({format: 'rgba'}).should.be.equal('rgba(255, 128, 0, 1)');
        });

        it('test exporting rgb strings', () => {
            var test;

            test = new Color();
            test.setRGB(255, 128, 0);
            test.toString({format: 'rgb'}).should.be.equal('rgb(255, 128, 0)');
            test.toRGBString().should.be.equal('rgb(255, 128, 0)');
            test.toString({format: 'rgb', compress: true}).should.be.equal('rgb(255,128,0)');
            test.toRGBString(true).should.be.equal('rgb(255,128,0)');
        });

        it('test exporting IE hex strings', () => {
            var test;

            test = new Color();
            test.setRGB(255, 68, 34);
            test.toString({format: 'iehex'}).should.be.equal('#ffff4422');
            test.toIEHex().should.be.equal('#ffff4422');
            test.toString({format: 'iehex', compress: true}).should.be.equal('#ff42');
            test.toIEHex(true).should.be.equal('#ff42');

            test = new Color();
            test.setRGBA(255, 128, 0, .7);
            test.toString({format: 'iehex'}).should.be.equal('#b3ff8000');
            test.toIEHex().should.be.equal('#b3ff8000');
            test.toString({format: 'iehex', compress: true}).should.be.equal('#b3ff8000');
            test.toIEHex(true).should.be.equal('#b3ff8000');
        });

        it('test exporting hsl strings', () => {
            var test;

            test = new Color();
            test.setRGB(255, 37.5, 42.7);
            test.toString().should.be.equal('hsl(358.57, 100%, 57.35%)');
            test.toHSLString().should.be.equal('hsl(358.57, 100%, 57.35%)');
            test.toString({compress: true}).should.be.equal('hsl(358.57,100%,57.35%)');
            test.toHSLString(true).should.be.equal('hsl(358.57,100%,57.35%)');
            test.toString({format: 'hsla'}).should.be.equal('hsla(358.57, 100%, 57.35%, 1)');

            // Test precision
            test.toString({roundPrecision: 0, format: 'hsl'}).should.be.equal('hsl(359, 100%, 57%)');
            test.toString({roundPrecision: 0, format: 'hsla'}).should.be.equal('hsla(359, 100%, 57%, 1)');
            test.toHSLString(false, false, 2, 0).should.be.equal('hsl(359, 100%, 57%)');
            test.toString({roundPrecision: 5}).should.be.equal('hsl(358.56552, 100%, 57.35294%)');
            test.toHSLString(false, false, 2, 5).should.be.equal('hsl(358.56552, 100%, 57.35294%)');

            // Test alpha
            test.setAlpha(.7);
            test.toString().should.be.equal('hsla(358.57, 100%, 57.35%, 0.7)');
            test.toHSLString().should.be.equal('hsla(358.57, 100%, 57.35%, 0.7)');
            test.toString({compress: true}).should.be.equal('hsla(358.57,100%,57.35%,.7)');
            test.toHSLString(true).should.be.equal('hsla(358.57,100%,57.35%,.7)');

            // Test forced HSL format
            test = new Color();
            test.setRGB(255, 128, 0);
            test.toString({format: 'hsl'}).should.be.equal('hsl(30.12, 100%, 50%)');
            test.toHSLString().should.be.equal('hsl(30.12, 100%, 50%)');

            test = new Color();
            test.setRGBA(128, 68, 34, .7);
            test.toString({format: 'hsl'}).should.be.equal('hsla(21.7, 58.02%, 31.76%, 0.7)');
            test.toHSLString().should.be.equal('hsla(21.7, 58.02%, 31.76%, 0.7)');
        });
    });
})();
