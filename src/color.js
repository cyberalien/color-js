/**
 * This file is part of the cyberalien-color package.
 *
 * (c) Vjacheslav Trushkin <cyberalien@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

const Keywords = require('./keywords');

/**
 * Color class
 *
 * You can set and get color or components in HSL and RGB color spaces,
 * import/export color from/to different commonly used formats, mix colors.
 * Class automatically converts between color spaces when needed.
 *
 * Class automatically converts between color spaces when needed.
 */
class Color
{
    /**
     * @ignore
     */
    constructor() {
        // Reset color spaces
        this._rgb = this._rgbRounded = this._hsl = this._hslRounded = this._luminance = null;
        this._alpha = 1;
    }

    /**
     * Get keywords object
     *
     * @returns {Object}
     */
    static keywords() {
        return Keywords;
    }

    /**
     * Set values
     */

    /**
     * Set value in RGB color space.
     * Setting RGB color resets alpha to 1
     *
     * @param {number} red Red color component in 0-255 range
     * @param {number} green Green color component in 0-255 range
     * @param {number} blue Blue color component in 0-255 range
     * @param {boolean} [rounded] True if values are rounded.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setRGB(red, green, blue, rounded) {
        return this._setRGBArray([red, green, blue, 1], rounded === void 0 ? false : rounded);
    }

    /**
     * Set value in RGB color space with alpha channel.
     *
     * @param {number} red Red color component in 0-255 range
     * @param {number} green Green color component in 0-255 range
     * @param {number} blue Blue color component in 0-255 range
     * @param {number} alpha Alpha in 0-1 range
     * @param {boolean} [rounded] True if values are rounded.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setRGBA(red, green, blue, alpha, rounded) {
        return this._setRGBArray([red, green, blue, alpha], rounded === void 0 ? false : rounded);
    }

    /**
     * Set value as RGB array.
     * If alpha channel is missing, alpha will be reset to 1
     *
     * @param {Array} color Array of color components
     * @param {boolean|Array} [rounded] True if values are rounded or array of rounded values.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color|null} Current color instance for method chaining, null on failure
     */
    setRGBArray(color, rounded) {
        this._setRGBArray(color.slice(0), typeof rounded === 'boolean' ? rounded : false);
        if (rounded !== void 0 && rounded instanceof Array) {
            this._rgbRounded = rounded.slice(0);
        }
        return this;
    }

    /**
     * Set value in HSL color space.
     * Setting HSL color resets alpha to 1
     *
     * @param {number} hue Hue color component in 0-360 range
     * @param {number} saturation Saturation color component in 0-100 range
     * @param {number} lightness Lightness color component in 0-100 range
     * @param {boolean} [rounded] True if values are rounded.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setHSL(hue, saturation, lightness, rounded) {
        return this._setHSLArray([hue, saturation, lightness, 1], rounded === void 0 ? false : rounded);
    }

    /**
     * Set value in HSL color space with alpha channel.
     *
     * @param {number} hue Hue color component in 0-360 range
     * @param {number} saturation Saturation color component in 0-100 range
     * @param {number} lightness Lightness color component in 0-100 range
     * @param {number} alpha Alpha in 0-1 range
     * @param {boolean} [rounded] True if values are rounded.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setHSLA(hue, saturation, lightness, alpha, rounded) {
        return this._setHSLArray([hue, saturation, lightness, alpha], rounded === void 0 ? false : rounded);
    }

    /**
     * Set value as HSL array.
     * If alpha channel is missing, alpha will be reset to 1
     *
     * @param {Array} color Array of color components
     * @param {boolean|Array} [rounded] True if values are rounded or array of rounded values.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color|null} Current color instance for method chaining, null on failure
     */
    setHSLArray(color, rounded) {
        this._setHSLArray(color.slice(0), typeof rounded === 'boolean' ? rounded : false);
        if (rounded !== void 0 && rounded instanceof Array) {
            this._hslRounded = rounded.slice(0);
        }
        return this;
    }

    /**
     * Set alpha channel value
     *
     * @param {number} value Alpha value in 0-1 range
     *
     * @returns {Color} Current color instance for method chaining
     */
    setAlpha(value) {
        this._alpha = value;
        return this;
    }

    /**
     * Set red color component
     *
     * @param {number} value Red color component in 0-255 range
     * @param {boolean} [rounded] True if value is rounded.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setRed(value, rounded) {
        return this._setRGB(0, value, rounded === void 0 ? false : rounded);
    }

    /**
     * Set green color component
     *
     * @param {number} value Green color component in 0-255 range
     * @param {boolean} [rounded] True if value is rounded.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setGreen(value, rounded) {
        return this._setRGB(1, value, rounded === void 0 ? false : rounded);
    }

    /**
     * Set blue color component
     *
     * @param {number} value Blue color component in 0-255 range
     * @param {boolean} [rounded] True if value is rounded.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setBlue(value, rounded) {
        return this._setRGB(2, value, rounded === void 0 ? false : rounded);
    }

    /**
     * Set hue color component
     *
     * @param {number} value Hue color component in 0-360 range
     * @param {boolean} [rounded] True if value is rounded.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setHue(value, rounded) {
        return this._setHSL(0, value, rounded === void 0 ? false : rounded);
    }

    /**
     * Set saturation color component
     *
     * @param {number} value Saturation color component in 0-100 range
     * @param {boolean} [rounded] True if value is rounded.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setSaturation(value, rounded) {
        return this._setHSL(1, value, rounded === void 0 ? false : rounded);
    }

    /**
     * Set lightness color component
     *
     * @param {number} value Lightness color component in 0-100 range
     * @param {boolean} [rounded] True if value is rounded.
     *
     * @returns {Color} Current color instance for method chaining
     */
    setLightness(value, rounded) {
        return this._setHSL(2, value, rounded === void 0 ? false : rounded);
    }

    /**
     * Mix with another color
     *
     * @param {Color} color Color to mix this color with
     * @param {number} [weight] Percentage of mixed color to be included in mix
     *
     * @returns {Color} Current color instance for method chaining
     */
    mix(color, weight) {
        weight = weight === void 0 ? 50 : weight;
        if (weight <= 0) {
            return this;
        }
        if (weight >= 100) {
            this.reset();
            this._setRGBArray(color.getRGBA());
            return this;
        }

        if (this._rgb === null) {
            this._convertToRGB();
        }

        let rgb = color.getRGBA(),
            mix2 = weight / 100, // weight of another color
            mix1 = 1 - mix2; // weight of this color

        return this._setRGBArray([
            this._rgb[0] * mix1 + rgb[0] * mix2,
            this._rgb[1] * mix1 + rgb[1] * mix2,
            this._rgb[2] * mix1 + rgb[2] * mix2,
            this._alpha * mix1 + rgb[3] * mix2
        ]);
    }

    /*
     * Get values
     */

    /**
     * Get RGB value as array
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @return {Array} Array of color values
     */
    getRGB(round) {
        if (this._rgb === null) {
            this._convertToRGB();
        }
        if (round && this._rgbRounded === null) {
            this._roundRGB();
        }

        return round ? this._rgbRounded.slice(0) : this._rgb.slice(0);
    }

    /**
     * Get RGB value as array with alpha channel
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @return {Array} Array of color values
     */
    getRGBA(round) {
        let result = this.getRGB(round);

        result.push(this._alpha);
        return result;
    }

    /**
     * Get HSL value as array
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @return {Array} Array of color values
     */
    getHSL(round) {
        if (this._hsl === null) {
            this._convertToHSL();
        }
        if (round && this._hslRounded === null) {
            this._roundHSL();
        }

        return round ? this._hslRounded.slice(0) : this._hsl.slice(0);
    }

    /**
     * Get HSL value as array with alpha channel
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @return {Array} Array of color values
     */
    getHSLA(round) {
        let result = this.getHSL(round);

        result.push(this._alpha);
        return result;
    }

    /**
     * Get alpha value
     *
     * @returns {number} Alpha value in 0-1 range
     */
    getAlpha() {
        return this._alpha;
    }

    /**
     * Get red color component
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @returns {number} Color component in 0-255 range
     */
    getRed(round) {
        return this._getRGB(0, round);
    }

    /**
     * Get green color component
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @returns {number} Color component in 0-255 range
     */
    getGreen(round) {
        return this._getRGB(1, round);
    }

    /**
     * Get blue color component
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @returns {number} Color component in 0-255 range
     */
    getBlue(round) {
        return this._getRGB(2, round);
    }

    /**
     * Get hue color component
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @returns {number} Color component in 0-360 range
     */
    getHue(round) {
        return this._getHSL(0, round);
    }

    /**
     * Get saturation color component
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @returns {number} Color component in 0-100 range
     */
    getSaturation(round) {
        return this._getHSL(1, round);
    }

    /**
     * Get lightness color component
     *
     * @param {boolean} [round] True if result should be rounded
     *
     * @returns {number} Color component in 0-100 range
     */
    getLightness(round) {
        return this._getHSL(2, round);
    }

    /**
     * Get luminance
     *
     * @returns {number}
     */
    getLuminance() {
        if (this._luminance !== null) {
            return this._luminance;
        }

        let values = [];

        if (this._rgb === null) {
            this._convertToRGB();
        }

        for (let i = 0; i < 3; i++) {
            let value = this._rgb[i] / 255;
            values[i] = value < .03928 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
        }
        this._luminance = values[0] * .2126 + values[1] * .7152 + values[2] * 0.0722;
        return this._luminance;
    }

    /**
     * Calculate contrast between this and another color
     *
     * @param {Color|number} color Color or color's luminance value
     *
     * @returns {number} Contrast in 1-21 range
     */
    getContrast(color) {
        let lum1 = this.getLuminance() + 0.05,
            lum2 = (typeof color === 'number' ? color : color.getLuminance()) + 0.05;

        return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
    }

    /*
     * Misc functions
     */

    /**
     * Reset values.
     *
     * @returns {Color} Current color instance for method chaining
     */
    reset() {
        this._rgb = this._rgbRounded = this._hsl = this._hslRounded = this._luminance = null;
        this._alpha = 1;
        return this;
    }

    /**
     * Normalize all values.
     *
     * @returns {Color} Current color instance for method chaining
     */
    normalize() {
        // Normalize RGB color space
        if (this._rgb !== null) {
            this._rgb = [
                this._rgb[0] < 0 ? 0 : (this._rgb[0] > 255 ? 255 : this._rgb[0]),
                this._rgb[1] < 0 ? 0 : (this._rgb[1] > 255 ? 255 : this._rgb[1]),
                this._rgb[2] < 0 ? 0 : (this._rgb[2] > 255 ? 255 : this._rgb[2])
            ];
            if (this._rgbRounded !== null) {
                this._rgbRounded = [
                    this._rgbRounded[0] < 0 ? 0 : (this._rgbRounded[0] > 255 ? 255 : this._rgbRounded[0]),
                    this._rgbRounded[1] < 0 ? 0 : (this._rgbRounded[1] > 255 ? 255 : this._rgbRounded[1]),
                    this._rgbRounded[2] < 0 ? 0 : (this._rgbRounded[2] > 255 ? 255 : this._rgbRounded[2])
                ];
            }
        }

        // Normalize HSL color space
        if (this._hsl !== null) {
            this._hsl = [
                this._hsl[0] < 0 ? this._hsl[0] % 360 + 360 : (this._hsl[0] >= 360 ? this._hsl[0] % 360 : this._hsl[0]),
                this._hsl[1] < 0 ? 0 : (this._hsl[1] > 100 ? 100 : this._hsl[1]),
                this._hsl[2] < 0 ? 0 : (this._hsl[2] > 100 ? 100 : this._hsl[2])
            ];
            if (this._hslRounded !== null) {
                this._hslRounded = [
                    this._hslRounded[0] < 0 ? this._hslRounded[0] % 360 + 360 : (this._hslRounded[0] >= 360 ? this._hslRounded[0] % 360 : this._hslRounded[0]),
                    this._hslRounded[1] < 0 ? 0 : (this._hslRounded[1] > 100 ? 100 : this._hslRounded[1]),
                    this._hslRounded[2] < 0 ? 0 : (this._hslRounded[2] > 100 ? 100 : this._hslRounded[2])
                ];
            }
        }

        // Normalize alpha
        this._alpha = this._alpha < 0 ? 0 : (this._alpha > 1 ? 1 : this._alpha);

        // Reset luminance cache
        this._luminance = null;

        return this;
    }

    /**
     * Make a clone of color object
     *
     * @returns {Color} New color instance
     */
    clone() {
        let color = new Color();
        if (this._rgb !== null) {
            color.setRGBArray(this._rgb, this._rgbRounded);
        } else {
            color.setHSLArray(this._hsl, this._hslRounded);
        }
        if (this._alpha < 1) {
            color.setAlpha(this._alpha);
        }
        return color;
    }

    /**
     * Create keyword from color object
     *
     * @param {boolean} [findClosest] True if function should find closest keyword, false if exact match is required
     * @param {boolean} [useExtended] True if extended keywords list should be used
     *
     * @returns {string|boolean} Keyword, false on error
     */
    toKeyword(findClosest, useExtended) {
        let color,
            keywords,
            match,
            margin,
            componentMargin,
            rgb,
            keyword,
            diff,
            componentDiff,
            maxComponentDiff,
            i;

        findClosest = findClosest === void 0 ? true : findClosest;
        useExtended = useExtended === void 0 ? true : useExtended;

        // Check for transparent color
        if (this._alpha === 0) {
            return 'transparent';
        }

        // Get keywords and rgb color
        if (useExtended) {
            keywords = Keywords.all;
        } else {
            keywords = Keywords.base;
        }

        if (this._rgb === null) {
            this._convertToRGB();
        }
        color = this._rgb;

        match = false;
        margin = findClosest ? 1000 : 1;
        componentMargin = findClosest ? 256 : 1;

        // Check each component
        for (keyword in keywords) {
            //noinspection JSUnfilteredForInLoop
            rgb = keywords[keyword];
            diff = 0;
            maxComponentDiff = 0;
            for (i = 0; i < 3; i++) {
                componentDiff = Math.abs(rgb[i] - color[i]);
                diff += componentDiff;
                if (diff > margin) {
                    break;
                }
                maxComponentDiff = Math.max(maxComponentDiff, componentDiff);
            }

            // Check for exact match
            if (diff === 0) {
                //noinspection JSUnfilteredForInLoop
                return keyword;
            }

            // Compare to previous results
            if (findClosest && diff < margin) {
                match = keyword;
                margin = diff;
                componentMargin = maxComponentDiff;
            } else if (findClosest && diff === margin && maxComponentDiff < componentMargin) {
                // Same overall difference, but each component difference is smaller
                match = keyword;
                componentMargin = maxComponentDiff;
            }
        }

        return match;
    }

    /**
     * Get hex string
     *
     * @param {boolean} compress True if color should be compressed (such as #123 instead of #112233)
     *
     * @returns {string}
     */
    toHex(compress) {
        return this._getHexValue(compress === void 0 ? false : compress, false);
    }

    /**
     * Get hex string with alpha channel
     *
     * @param {boolean} [compress] True if color should be compressed (such as #f123 instead of #ff112233)
     *
     * @returns {string}
     */
    toIEHex(compress) {
        return this._getHexValue(compress === void 0 ? false : compress, true);
    }

    /**
     * Get color as rgb or rgba string
     *
     * @param {boolean} [compress] True if string should be compressed
     * @param {boolean} [ignoreAlpha] True if alpha channel should be ignored. Returns rgb() string
     * @param {number} [alphaPrecision] Number of digits after dot in alpha. Default = 2
     *
     * @returns {string}
     */
    toRGBString(compress, ignoreAlpha, alphaPrecision) {
        return this.toString({
            format: 'rgb',
            compress: compress === void 0 ? false : compress,
            ignoreAlpha: ignoreAlpha === void 0 ? false : ignoreAlpha,
            alphaPrecision: alphaPrecision === void 0 ? 2 : alphaPrecision
        });
    }

    /**
     * Get color as hsl or hsla string
     *
     * @param {boolean} [compress] True if string should be compressed
     * @param {boolean} [ignoreAlpha] True if alpha channel should be ignored. Returns rgb() string
     * @param {number} [alphaPrecision] Number of digits after dot in alpha. Default = 2
     * @param {number} [roundPrecision] Number of digits after dot in color components. Default = 2
     *
     * @returns {string}
     */
    toHSLString(compress, ignoreAlpha, alphaPrecision, roundPrecision) {
        return this.toString({
            format: 'hsl',
            compress: compress === void 0 ? false : compress,
            ignoreAlpha: ignoreAlpha === void 0 ? false : ignoreAlpha,
            alphaPrecision: alphaPrecision === void 0 ? 2 : alphaPrecision,
            roundPrecision: roundPrecision === void 0 ? 2 : roundPrecision
        });
    }

    /**
     * Get value as string
     *
     * @param {object} options List of options. Possible options:
     *  format: color format. possible values:
     *      auto (default): set automatically.
     *          If RGB color is rounded or roundPrecision is set to 0, result color
     *          will be in hex (if alpha == 1 or ignored) or rgba format. Otherwise
     *          result will be in hsl or hsla format.
     *      rgb: rgb(r, g, b) or rgba(r, g, b, a)
     *      rgba: rgba(r, g, b, a)
     *      hsl: hsl(h, s, l) or hsla(h, s, l, a)
     *      hsla: hsla(h, s, l, a)
     *      hex: hex string
     *      iehex: hex string with alpha channel
     *  ignoreAlpha: true if alpha channel should be ignored. default = false
     *      This option is ignored when format is set to 'hex' or 'iehex'
     *  roundPrecision: number of digits after dot in floating numbers. default = 2
     *      Floating numbers are allowed only in hsl() and hsla() colors
     *  alphaPrecision: number of digits after dot in alpha channel. default = 2
     *      If set to 0 alpha channel is ignored. This option is ignored if alpha value
     *      is 1 or ignoreAlpha is set or if selected format doesn't support alpha channel.
     *  compress: true if result string should be as short as possible. Examples:
     *      compressed:
     *          rgba(1,2,3,.4)
     *          #123
     *      not compressed:
     *          rgba(1, 2, 3, 0.4)
     *          #112233
     *
     * @returns {string}
     */
    toString(options) {
        let rgb,
            hsl,
            result,
            op = options === void 0 ? {} : options,
            format = op.format === void 0 ? 'auto' : op.format,
            ignoreAlpha = op.ignoreAlpha === void 0 ? false : op.ignoreAlpha,
            roundPrecision = op.roundPrecision === void 0 ? 2 : op.roundPrecision,
            alphaPrecision = op.alphaPrecision === void 0 ? 2 : op.alphaPrecision,
            compress = op.compress === void 0 ? false : op.compress,
            alpha = ignoreAlpha ? 1 : Color._round(this._alpha, alphaPrecision),
            comma = compress ? ',' : ', ';

        switch (format) {
            case 'auto':
                // Try hex or rgba format
                if (this._rgb === null) {
                    this._convertToRGB();
                }
                if (this._rgbRounded === null) {
                    this._roundRGB();
                }

                // Check if components are rounded
                if (roundPrecision > 0 && !Color._equalColors(this._rgb, this._rgbRounded)) {
                    format = 'hsl';
                    break;
                }

                // Rounded or precision == 0
                if (alpha === 1) {
                    return this._getHexValue(compress, false);
                }
                result = 'rgba(' +
                    this._rgbRounded[0] + comma +
                    this._rgbRounded[1] + comma +
                    this._rgbRounded[2] + comma +
                    alpha + ')';
                return compress ? Color._compressString(result) : result;

            case 'rgb':
            case 'rgba':
                if (this._rgb === null) {
                    this._convertToRGB();
                }
                if (this._rgbRounded === null) {
                    this._roundRGB();
                }

                result = (alpha === 1 && format !== 'rgba' ? 'rgb(' : 'rgba(') +
                    this._rgbRounded[0] + comma +
                    this._rgbRounded[1] + comma +
                    this._rgbRounded[2] +
                    (alpha === 1 && format !== 'rgba' ? '' : comma + alpha) +
                    ')';
                return compress ? Color._compressString(result) : result;

            case 'hex':
                return this._getHexValue(compress, false);

            case 'iehex':
                return this._getHexValue(compress, true);
        }

        // Only HSL format left
        if (this._hsl === null) {
            this._convertToHSL();
        }

        result = (alpha === 1 && format !== 'hsla' ? 'hsl(' : 'hsla(') +
            Color._round(this._hsl[0], roundPrecision) + comma +
            Color._round(this._hsl[1], roundPrecision) + '%' + comma +
            Color._round(this._hsl[2], roundPrecision) + '%' +
            (alpha === 1 && format !== 'hsla' ? '' : comma + alpha) +
            ')';
        return compress ? Color._compressString(result) : result;
    }

    /**
     * Create new color object from keyword
     *
     * @param {string} keyword Color value
     * @param {boolean} [useExtended] True if extended keywords list should be used
     *
     * @returns {Color|null} Color object on success, null on failure
     */
    static fromKeyword(keyword, useExtended) {
        useExtended = useExtended === void 0 ? true : useExtended;
        keyword = keyword.toLowerCase();

        if (keyword === 'transparent') {
            return (new Color()).setRGBA(0, 0, 0, 0, true);
        }

        let keywords = useExtended ? Keywords.all : Keywords.base;
        if (keywords[keyword] === void 0) {
            return null;
        }
        return (new Color()).setRGBArray(keywords[keyword], true);
    }

    /**
     * Create new color object from HEX string
     *
     * @param {string} color Color string
     *
     * @returns {Color|null} Color object on success, null on failure
     */
    static fromHex(color) {
        let red, green, blue,
            alpha = false,
            start = 0;

        if (color.slice(0, 1) === '#') {
            color = color.slice(1);
        }
        if (!/^[\da-f]+$/i.test(color)) {
            return null;
        }

        //noinspection FallThroughInSwitchStatementJS
        switch (color.length) {
            case 4:
                alpha = color.slice(0, 1);
                alpha += alpha;
                start ++;
            // no break

            case 3:
                red = color.slice(start, ++start);
                green = color.slice(start, ++start);
                blue = color.slice(start, ++start);
                red += red;
                green += green;
                blue += blue;
                break;

            case 8:
                alpha = color.slice(0, 2);
                start += 2;
            // no break

            case 6:
                red = color.slice(start++, ++start);
                green = color.slice(start++, ++start);
                blue = color.slice(start++, ++start);
                break;

            default:
                return null;
        }

        return (new Color()).setRGBA(
            parseInt(red, 16),
            parseInt(green, 16),
            parseInt(blue, 16),
            alpha === false ? 1 : parseInt(alpha, 16) / 255,
            true
        );
    }

    /**
     * Create new color object from string
     *
     * @param {string} color Color string
     *
     * @returns {Color|null} Color object on success, null on failure
     */
    static fromString(color) {
        let parts, keyword, colors, alpha, result,
            r, g, b, h, s, l, rounded;

        if (color.indexOf('(') === -1) {
            // Missing required character. Test for hex string and keyword
            result = Color.fromHex(color);
            return result === null ? Color.fromKeyword(color) : result;
        }

        // Remove whitespace and change to lower case
        color = color.toLowerCase().replace(/\s+/g, '');
        if (color.slice(-1) !== ')') {
            return null;
        }

        color = color.slice(0, color.length - 1);
        parts = color.split('(', 2);
        if (parts.length !== 2 || /[^\d.,%-]/.test(parts[1])) {
            return null;
        }

        keyword = parts[0];
        colors = parts[1].split(',');
        alpha = 1;

        if (keyword.slice(-1) === 'a') {
            // with alpha
            if (colors.length !== 4) {
                return null;
            }
            alpha = parseFloat(colors.pop());
            if (isNaN(alpha)) {
                alpha = 0;
            }
            else {
                alpha = alpha < 0 ? 0 : (alpha > 1 ? 1 : alpha);
            }
        }
        else if (colors.length !== 3) {
            return null;
        }

        switch (keyword)
        {
            case 'rgb':
            case 'rgba':
                if (colors[0].slice(-1) === '%') {
                    // All components must be percentages
                    if (colors[1].slice(-1) !== '%' || colors[2].slice(-1) !== '%') {
                        return null;
                    }

                    // Convert to numbers and normalize colors
                    r = parseFloat(colors[0]);
                    g = parseFloat(colors[1]);
                    b = parseFloat(colors[2]);

                    return (new Color()).setRGBA(
                        isNaN(r) || r < 0 ? 0 : (r > 100 ? 255 : r * 2.55),
                        isNaN(g) || g < 0 ? 0 : (g > 100 ? 255 : g * 2.55),
                        isNaN(b) || b < 0 ? 0 : (b > 100 ? 255 : b * 2.55),
                        alpha
                    );
                }

                // None of components must be percentages
                if (parts[1].indexOf('%') !== -1) {
                    return null;
                }

                // Double values are not allowed in rgb()
                r = parseInt(colors[0]);
                g = parseInt(colors[1]);
                b = parseInt(colors[2]);

                return (new Color()).setRGBA(
                    isNaN(r) || r < 0 ? 0 : (r > 255 ? 255 : r),
                    isNaN(g) || g < 0 ? 0 : (g > 255 ? 255 : g),
                    isNaN(b) || b < 0 ? 0 : (b > 255 ? 255 : b),
                    alpha,
                    true
                );

            case 'hsl':
            case 'hsla':
                if (colors[0].indexOf('%') !== -1 || colors[1].slice(-1) !== '%' || colors[2].slice(-1) !== '%') {
                    // Hue cannot be percentage, saturation and lightness must be percentage
                    return null;
                }

                // All values could be double numbers
                h = parseFloat(colors[0]);
                s = parseFloat(colors[1]);
                l = parseFloat(colors[2]);
                rounded = parts[1].indexOf('.') === -1;

                // Create new object, assign normalized values and return color
                return (new Color()).setHSLA(
                    isNaN(h) ? 0 : (h < 0 ? h % 360 + 360 : (h >= 360 ? h % 360 : h)),
                    isNaN(s) || s < 0 ? 0 : (s > 100 ? 100 : s),
                    isNaN(l) || l < 0 ? 0 : (l > 100 ? 100 : l),
                    alpha,
                    rounded
                );
        }

        return null;
    }

    /*
     * Private functions
     *
     * Do not call these functions directly
     */

    /**
     * Set value as RGB array
     *
     * @param {Array} color Array of color components
     * @param {boolean} [rounded] True if values are rounded.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color|null} Current color instance for method chaining, null on failure
     *
     * @private
     */
    _setRGBArray(color, rounded) {
        if (color.length === 4) {
            this._alpha = color.pop();
        } else if (color.length !== 3) {
            return null;
        } else {
            this._alpha = 1;
        }

        this._resetSpaces('rgb');
        this._rgb = color;
        this._rgbRounded = rounded ? color.slice(0) : null;

        return this;
    }

    /**
     * Set value as HSL array
     *
     * @param {Array} color Array of color components
     * @param {boolean} [rounded] True if values are rounded.
     *  Used for performance to avoid rounding values when its not needed.
     *
     * @returns {Color|null} Current color instance for method chaining, null on failure
     *
     * @private
     */
    _setHSLArray(color, rounded) {
        if (color.length === 4) {
            this._alpha = color.pop();
        } else if (color.length !== 3) {
            return null;
        } else {
            this._alpha = 1;
        }

        this._resetSpaces('hsl');
        this._hsl = color;
        this._hslRounded = rounded ? color.slice(0) : null;

        return this;
    }

    /**
     * Internal function used by setRed() and similar functions
     *
     * @param {number} index
     * @param {number} value
     * @param {boolean} rounded
     *
     * @returns {Color}
     *
     * @private
     */
    _setRGB(index, value, rounded) {
        if (this._rgb === null) {
            this._convertToRGB();
        }

        // Set value
        this._resetSpaces('rgb');
        this._rgb[index] = value;

        // Set rounded value
        if (this._rgbRounded !== null) {
            if (rounded || Math.round(value) === value) {
                this._rgbRounded[index] = value;
            } else {
                this._rgbRounded = null;
            }
        }

        return this;
    }

    /**
     * Internal function used by setHue() and similar functions
     *
     * @param {number} index
     * @param {number} value
     * @param {boolean} rounded
     *
     * @returns {Color}
     *
     * @private
     */
    _setHSL(index, value, rounded) {
        if (this._hsl === null) {
            this._convertToHSL();
        }

        // Set value
        this._resetSpaces('hsl');
        this._hsl[index] = value;

        // Set rounded value
        if (this._hslRounded !== null) {
            if (rounded || Math.round(value) === value) {
                this._hslRounded[index] = value;
            } else {
                this._hslRounded = null;
            }
        }

        return this;
    }

    /**
     * Internal function used by getRed() and similar functions
     *
     * @param {number} index
     * @param {boolean} [round]
     *
     * @returns {*}
     *
     * @private
     */
    _getRGB(index, round) {
        if (this._rgb === null) {
            this._convertToRGB();
        }
        if (round && this._rgbRounded === null) {
            this._roundRGB();
        }
        return round ? this._rgbRounded[index] : this._rgb[index];
    }

    /**
     * Internal function used by getHue() and similar functions
     *
     * @param {number} index
     * @param {boolean} [round]
     *
     * @returns {*}
     *
     * @private
     */
    _getHSL(index, round) {
        if (this._hsl === null) {
            this._convertToHSL();
        }
        if (round && this._hslRounded === null) {
            this._roundHSL();
        }
        return round ? this._hslRounded[index] : this._hsl[index];
    }

    /**
     * Round RGB colors
     *
     * @private
     */
    _roundRGB() {
        let r = Math.round(this._rgb[0]),
            g = Math.round(this._rgb[1]),
            b = Math.round(this._rgb[2]);

        this._rgbRounded = [
            r < 0 ? 0 : (r > 255 ? 255 : r),
            g < 0 ? 0 : (g > 255 ? 255 : g),
            b < 0 ? 0 : (b > 255 ? 255 : b),
        ];
    }

    /**
     * Round HSL colors
     *
     * @private
     */
    _roundHSL() {
        let h = Math.round(this._hsl[0]),
            s = Math.round(this._hsl[1]),
            l = Math.round(this._hsl[2]);

        this._hslRounded = [
            h < 0 ? h % 360 + 360 : (h >= 360 ? h % 360 : h),
            s < 0 ? 0 : (s > 100 ? 100 : s),
            l < 0 ? 0 : (l > 100 ? 100 : l)
        ];
    }

    /**
     * Normalize values
     *
     * @param {number} value Value to normalize
     * @param {number} [max] Maximum value, default = 100
     *
     * @returns {number}
     *
     * @private
     */
    static _normalize(value, max) {
        max = max === void 0 ? 100 : max;
        return value < 0 ? 0 : (value > max ? max : value);
    }

    /**
     * Normalize hue value
     *
     * @param {number} value Value to normalize
     *
     * @returns {number}
     *
     * @private
     */
    static _normalizeHue(value) {
        return value < 0 ? value % 360 + 360 : (value >= 360 ? value % 360 : value);
    }

    /**
     * Convert HSL color to RGB
     *
     * @param {number} r Red color component in 0-255 range
     * @param {number} g Green color component in 0-255 range
     * @param {number} b Blue color component in 0-255 range
     * @param {boolean} round True if result should be rounded
     *
     * @returns {Array<number>} HSL color. Hue is in 0-360 range, other color components are in 0-100 range
     *
     * @private
     */
    static _rgb2hsl(r, g, b, round) {
        let c1 = r / 255,
            c2 = g / 255,
            c3 = b / 255,
            kmin = Math.min(c1, Math.min(c2, c3)),
            kmax = Math.max(c1, Math.max(c2, c3)),
            l = (kmax + kmin) / 2,
            s, h, delta;

        round = round === void 0 ? false : round;

        if (kmax === kmin) {
            s = h = 0;
        } else {
            if (l < 0.5) {
                s = (kmax - kmin) / (kmax + kmin);
            } else {
                s = (kmax - kmin) / (2 - kmax - kmin);
            }

            delta = kmax - kmin;
            if (kmax === c1) {
                h = (c2 - c3) / delta;
            }
            if (kmax === c2) {
                h = 2 + (c3 - c1) / delta;
            }
            if(kmax === c3) {
                h = 4 + (c1 - c2) / delta;
            }

            h = h * 60;
            if (h < 0) {
                h += 360;
            }
        }

        return round ? [Math.round(h), Math.round(s * 100), Math.round(l * 100)] : [h, s * 100, l * 100];
    }

    /**
     * Convert HSL color to RGB
     *
     * @param {number} h Hue color component in 0-360 range
     * @param {number} s Saturation color component in 0-100 range
     * @param {number} l Lightness color component in 0-100 range
     * @param {boolean} round True if result should be rounded
     *
     * @returns {Array<number>} RGB color. Each color component is in 0-255 range
     *
     * @private
     */
    static _hsl2rgb(h, s, l, round) {
        let lum,
            sat,
            hue,
            m1,
            m2,
            c1,
            c2,
            c3;

        function valore(n1, n2, hue) {
            hue = hue < 0 ? hue % 360 + 360 : (hue >= 360 ? hue % 360 : hue);

            if (hue >= 240) {
                return n1;
            }
            if (hue < 60) {
                return n1 + (n2 - n1) * hue / 60;
            }
            if (hue < 180) {
                return n2;
            }
            return n1 + (n2 - n1) * (240 - hue) / 60;
        }

        round = round === void 0 ? false : round;

        hue = h < 0 ? h % 360 + 360 : (h >= 360 ? h % 360 : h);
        sat = s < 0 ? 0 : (s > 100 ? 1 : s / 100);
        lum = l < 0 ? 0 : (l > 100 ? 1 : l / 100);

        if (lum <= 0.5) {
            m2 = lum * (1 + sat);
        } else {
            m2 = lum + sat * (1 - lum);
        }

        m1 = 2 * lum - m2;

        if (sat === 0 && hue === 0) {
            c1 = lum;
            c2 = lum;
            c3 = lum;
        } else {
            c1 = valore(m1, m2, hue + 120);
            c2 = valore(m1, m2, hue);
            c3 = valore(m1, m2, hue - 120);
        }

        return [
            round ? Math.round(c1 * 255) : c1 * 255,
            round ? Math.round(c2 * 255) : c2 * 255,
            round ? Math.round(c3 * 255) : c3 * 255
        ];
    }

    /**
     * Convert color space to RGB
     *
     * @private
     */
    _convertToRGB() {
        this._rgb = this._hsl === null ? [255, 0, 0] : Color._hsl2rgb(this._hsl[0], this._hsl[1], this._hsl[2], false);
        this._rgbRounded = null;
    }

    /**
     * Convert color space to HSL
     *
     * @private
     */
    _convertToHSL() {
        this._hsl = this._rgb === null ? [0, 100, 50] : Color._rgb2hsl(this._rgb[0], this._rgb[1], this._rgb[2], false);
        this._hslRounded = null;
    }

    /**
     * Reset color spaces
     *
     * @param {string} keep Color space to keep
     *
     * @private
     */
    _resetSpaces(keep) {
        keep = keep === void 0 ? '' : keep;
        if (keep !== 'rgb') {
            this._rgb = this._rgbRounded = null;
        }
        if (keep !== 'hsl') {
            this._hsl = this._hslRounded = null;
        }
        this._luminance = null;
    }

    /**
     * Round number
     *
     * @param {number} number Number to round
     * @param {number} precision Number of digits after dot
     *
     * @returns {number}
     *
     * @private
     */
    static _round(number, precision) {
        precision = Math.pow(10, precision);
        return Math.round(number * precision) / precision;
    }

    /**
     * Compare color spacer
     *
     * @param {Array} var1 Array of color components for color 1
     * @param {Array} var2 Array of color components for color 2
     *
     * @returns {boolean} True if colors are the same, false if not
     *
     * @private
     */
    static _equalColors(var1, var2) {
        if (!(var1 instanceof Array && var2 instanceof Array)) {
            return false;
        }

        for (let i = 0; i < 3; i++) {
            if (var1[i] !== var2[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get color as hex string
     *
     * @param {boolean} compress True if color should be compressed
     * @param {boolean} includeAlpha True if result should include alpha channel (IE format)
     *
     * @returns {string}
     *
     * @private
     */
    _getHexValue(compress, includeAlpha) {
        if (this._rgb === null) {
            this._convertToRGB();
        }
        if (this._rgbRounded === null) {
            this._roundRGB();
        }

        // Convert to hex string
        let result = '#';
        if (includeAlpha) {
            let alpha = Math.max(Math.min(Math.round(this._alpha * 255), 255), 0);
            result += (alpha < 16 ? '0' : '') + alpha.toString(16);
        }
        for (let i = 0; i < 3; i++) {
            result += (this._rgbRounded[i] < 16 ? '0' : '') + this._rgbRounded[i].toString(16);
        }

        return compress ? Color._compressString(result) : result;
    }

    /**
     * Compress string
     *
     * @param {string} value Color to compress
     *
     * @returns {string}
     *
     * @private
     */
    static _compressString(value) {
        if (value.slice(0, 1) === '#') {
            // Compress hex string
            let length = value.length - 1;
            if (length !== 6 && length !== 8) {
                return value;
            }

            let str1 = '',
                str2 = '',
                total = length / 2;

            for (let i = 0; i < total; i++) {
                str1 += value.slice(i * 2 + 1, i * 2 + 2);
                str2 += value.slice(i * 2 + 2, i * 2 + 3);
                if (str1 !== str2) {
                    return value;
                }
            }
            return '#' + str1;
        }

        // Remove extra spaces and zeros
        return value.replace(' ', '').replace('(0.', '(.').replace(',0.', ',.');
    }
}

module.exports = Color;
