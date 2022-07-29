(function () {
/**
 * Fuse.js v6.6.2 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2022 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */ function $119b89bfb9f77c84$var$isArray(value) {
    return !Array.isArray ? $119b89bfb9f77c84$var$getTag(value) === "[object Array]" : Array.isArray(value);
}
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
const $119b89bfb9f77c84$var$INFINITY = 1 / 0;
function $119b89bfb9f77c84$var$baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") return value;
    let result = value + "";
    return result == "0" && 1 / value == -$119b89bfb9f77c84$var$INFINITY ? "-0" : result;
}
function $119b89bfb9f77c84$var$toString(value) {
    return value == null ? "" : $119b89bfb9f77c84$var$baseToString(value);
}
function $119b89bfb9f77c84$var$isString(value) {
    return typeof value === "string";
}
function $119b89bfb9f77c84$var$isNumber(value) {
    return typeof value === "number";
}
// Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
function $119b89bfb9f77c84$var$isBoolean(value) {
    return value === true || value === false || $119b89bfb9f77c84$var$isObjectLike(value) && $119b89bfb9f77c84$var$getTag(value) == "[object Boolean]";
}
function $119b89bfb9f77c84$var$isObject(value) {
    return typeof value === "object";
}
// Checks if `value` is object-like.
function $119b89bfb9f77c84$var$isObjectLike(value) {
    return $119b89bfb9f77c84$var$isObject(value) && value !== null;
}
function $119b89bfb9f77c84$var$isDefined(value) {
    return value !== undefined && value !== null;
}
function $119b89bfb9f77c84$var$isBlank(value) {
    return !value.trim().length;
}
// Gets the `toStringTag` of `value`.
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function $119b89bfb9f77c84$var$getTag(value) {
    return value == null ? value === undefined ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
const $119b89bfb9f77c84$var$EXTENDED_SEARCH_UNAVAILABLE = "Extended search is not available";
const $119b89bfb9f77c84$var$INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
const $119b89bfb9f77c84$var$LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key)=>`Invalid value for key ${key}`;
const $119b89bfb9f77c84$var$PATTERN_LENGTH_TOO_LARGE = (max)=>`Pattern length exceeds max of ${max}.`;
const $119b89bfb9f77c84$var$MISSING_KEY_PROPERTY = (name)=>`Missing ${name} property in key`;
const $119b89bfb9f77c84$var$INVALID_KEY_WEIGHT_VALUE = (key)=>`Property 'weight' in key '${key}' must be a positive integer`;
const $119b89bfb9f77c84$var$hasOwn = Object.prototype.hasOwnProperty;
class $119b89bfb9f77c84$var$KeyStore {
    get(keyId) {
        return this._keyMap[keyId];
    }
    keys() {
        return this._keys;
    }
    toJSON() {
        return JSON.stringify(this._keys);
    }
    constructor(keys){
        this._keys = [];
        this._keyMap = {};
        let totalWeight = 0;
        keys.forEach((key)=>{
            let obj = $119b89bfb9f77c84$var$createKey(key);
            totalWeight += obj.weight;
            this._keys.push(obj);
            this._keyMap[obj.id] = obj;
            totalWeight += obj.weight;
        });
        // Normalize weights so that their sum is equal to 1
        this._keys.forEach((key)=>{
            key.weight /= totalWeight;
        });
    }
}
function $119b89bfb9f77c84$var$createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
    let getFn = null;
    if ($119b89bfb9f77c84$var$isString(key) || $119b89bfb9f77c84$var$isArray(key)) {
        src = key;
        path = $119b89bfb9f77c84$var$createKeyPath(key);
        id = $119b89bfb9f77c84$var$createKeyId(key);
    } else {
        if (!$119b89bfb9f77c84$var$hasOwn.call(key, "name")) throw new Error($119b89bfb9f77c84$var$MISSING_KEY_PROPERTY("name"));
        const name = key.name;
        src = name;
        if ($119b89bfb9f77c84$var$hasOwn.call(key, "weight")) {
            weight = key.weight;
            if (weight <= 0) throw new Error($119b89bfb9f77c84$var$INVALID_KEY_WEIGHT_VALUE(name));
        }
        path = $119b89bfb9f77c84$var$createKeyPath(name);
        id = $119b89bfb9f77c84$var$createKeyId(name);
        getFn = key.getFn;
    }
    return {
        path: path,
        id: id,
        weight: weight,
        src: src,
        getFn: getFn
    };
}
function $119b89bfb9f77c84$var$createKeyPath(key) {
    return $119b89bfb9f77c84$var$isArray(key) ? key : key.split(".");
}
function $119b89bfb9f77c84$var$createKeyId(key) {
    return $119b89bfb9f77c84$var$isArray(key) ? key.join(".") : key;
}
function $119b89bfb9f77c84$var$get(obj1, path1) {
    let list = [];
    let arr = false;
    const deepGet = (obj, path, index)=>{
        if (!$119b89bfb9f77c84$var$isDefined(obj)) return;
        if (!path[index]) // If there's no path left, we've arrived at the object we care about.
        list.push(obj);
        else {
            let key = path[index];
            const value = obj[key];
            if (!$119b89bfb9f77c84$var$isDefined(value)) return;
            // If we're at the last value in the path, and if it's a string/number/bool,
            // add it to the list
            if (index === path.length - 1 && ($119b89bfb9f77c84$var$isString(value) || $119b89bfb9f77c84$var$isNumber(value) || $119b89bfb9f77c84$var$isBoolean(value))) list.push($119b89bfb9f77c84$var$toString(value));
            else if ($119b89bfb9f77c84$var$isArray(value)) {
                arr = true;
                // Search each item in the array.
                for(let i = 0, len = value.length; i < len; i += 1)deepGet(value[i], path, index + 1);
            } else if (path.length) // An object. Recurse further.
            deepGet(value, path, index + 1);
        }
    };
    // Backwards compatibility (since path used to be a string)
    deepGet(obj1, $119b89bfb9f77c84$var$isString(path1) ? path1.split(".") : path1, 0);
    return arr ? list : list[0];
}
const $119b89bfb9f77c84$var$MatchOptions = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: false,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: false,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
};
const $119b89bfb9f77c84$var$BasicOptions = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: false,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: false,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: true,
    // Default sort function: sort by ascending score, ascending index
    sortFn: (a, b)=>a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
const $119b89bfb9f77c84$var$FuzzyOptions = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
};
const $119b89bfb9f77c84$var$AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: $119b89bfb9f77c84$var$get,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: false,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: false,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
};
var $119b89bfb9f77c84$var$Config = {
    ...$119b89bfb9f77c84$var$BasicOptions,
    ...$119b89bfb9f77c84$var$MatchOptions,
    ...$119b89bfb9f77c84$var$FuzzyOptions,
    ...$119b89bfb9f77c84$var$AdvancedOptions
};
const $119b89bfb9f77c84$var$SPACE = /[^ ]+/g;
// Field-length norm: the shorter the field, the higher the weight.
// Set to 3 decimals to reduce index size.
function $119b89bfb9f77c84$var$norm(weight = 1, mantissa = 3) {
    const cache = new Map();
    const m = Math.pow(10, mantissa);
    return {
        get (value) {
            const numTokens = value.match($119b89bfb9f77c84$var$SPACE).length;
            if (cache.has(numTokens)) return cache.get(numTokens);
            // Default function is 1/sqrt(x), weight makes that variable
            const norm1 = 1 / Math.pow(numTokens, 0.5 * weight);
            // In place of `toFixed(mantissa)`, for faster computation
            const n = parseFloat(Math.round(norm1 * m) / m);
            cache.set(numTokens, n);
            return n;
        },
        clear () {
            cache.clear();
        }
    };
}
class $119b89bfb9f77c84$var$FuseIndex {
    setSources(docs = []) {
        this.docs = docs;
    }
    setIndexRecords(records = []) {
        this.records = records;
    }
    setKeys(keys = []) {
        this.keys = keys;
        this._keysMap = {};
        keys.forEach((key, idx)=>{
            this._keysMap[key.id] = idx;
        });
    }
    create() {
        if (this.isCreated || !this.docs.length) return;
        this.isCreated = true;
        // List is Array<String>
        if ($119b89bfb9f77c84$var$isString(this.docs[0])) this.docs.forEach((doc, docIndex)=>{
            this._addString(doc, docIndex);
        });
        else // List is Array<Object>
        this.docs.forEach((doc, docIndex)=>{
            this._addObject(doc, docIndex);
        });
        this.norm.clear();
    }
    // Adds a doc to the end of the index
    add(doc) {
        const idx = this.size();
        if ($119b89bfb9f77c84$var$isString(doc)) this._addString(doc, idx);
        else this._addObject(doc, idx);
    }
    // Removes the doc at the specified index of the index
    removeAt(idx) {
        this.records.splice(idx, 1);
        // Change ref index of every subsquent doc
        for(let i = idx, len = this.size(); i < len; i += 1)this.records[i].i -= 1;
    }
    getValueForItemAtKeyId(item, keyId) {
        return item[this._keysMap[keyId]];
    }
    size() {
        return this.records.length;
    }
    _addString(doc, docIndex) {
        if (!$119b89bfb9f77c84$var$isDefined(doc) || $119b89bfb9f77c84$var$isBlank(doc)) return;
        let record = {
            v: doc,
            i: docIndex,
            n: this.norm.get(doc)
        };
        this.records.push(record);
    }
    _addObject(doc, docIndex) {
        let record = {
            i: docIndex,
            $: {}
        };
        // Iterate over every key (i.e, path), and fetch the value at that key
        this.keys.forEach((key, keyIndex)=>{
            let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
            if (!$119b89bfb9f77c84$var$isDefined(value)) return;
            if ($119b89bfb9f77c84$var$isArray(value)) {
                let subRecords = [];
                const stack = [
                    {
                        nestedArrIndex: -1,
                        value: value
                    }
                ];
                while(stack.length){
                    const { nestedArrIndex: nestedArrIndex , value: value  } = stack.pop();
                    if (!$119b89bfb9f77c84$var$isDefined(value)) continue;
                    if ($119b89bfb9f77c84$var$isString(value) && !$119b89bfb9f77c84$var$isBlank(value)) {
                        let subRecord = {
                            v: value,
                            i: nestedArrIndex,
                            n: this.norm.get(value)
                        };
                        subRecords.push(subRecord);
                    } else if ($119b89bfb9f77c84$var$isArray(value)) value.forEach((item, k)=>{
                        stack.push({
                            nestedArrIndex: k,
                            value: item
                        });
                    });
                }
                record.$[keyIndex] = subRecords;
            } else if ($119b89bfb9f77c84$var$isString(value) && !$119b89bfb9f77c84$var$isBlank(value)) {
                let subRecord = {
                    v: value,
                    n: this.norm.get(value)
                };
                record.$[keyIndex] = subRecord;
            }
        });
        this.records.push(record);
    }
    toJSON() {
        return {
            keys: this.keys,
            records: this.records
        };
    }
    constructor({ getFn: getFn = $119b89bfb9f77c84$var$Config.getFn , fieldNormWeight: fieldNormWeight = $119b89bfb9f77c84$var$Config.fieldNormWeight  } = {}){
        this.norm = $119b89bfb9f77c84$var$norm(fieldNormWeight, 3);
        this.getFn = getFn;
        this.isCreated = false;
        this.setIndexRecords();
    }
}
function $119b89bfb9f77c84$var$createIndex(keys, docs, { getFn: getFn = $119b89bfb9f77c84$var$Config.getFn , fieldNormWeight: fieldNormWeight = $119b89bfb9f77c84$var$Config.fieldNormWeight  } = {}) {
    const myIndex = new $119b89bfb9f77c84$var$FuseIndex({
        getFn: getFn,
        fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys.map($119b89bfb9f77c84$var$createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
}
function $119b89bfb9f77c84$var$parseIndex(data, { getFn: getFn = $119b89bfb9f77c84$var$Config.getFn , fieldNormWeight: fieldNormWeight = $119b89bfb9f77c84$var$Config.fieldNormWeight  } = {}) {
    const { keys: keys , records: records  } = data;
    const myIndex = new $119b89bfb9f77c84$var$FuseIndex({
        getFn: getFn,
        fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
}
function $119b89bfb9f77c84$var$computeScore$1(pattern, { errors: errors = 0 , currentLocation: currentLocation = 0 , expectedLocation: expectedLocation = 0 , distance: distance = $119b89bfb9f77c84$var$Config.distance , ignoreLocation: ignoreLocation = $119b89bfb9f77c84$var$Config.ignoreLocation  } = {}) {
    const accuracy = errors / pattern.length;
    if (ignoreLocation) return accuracy;
    const proximity = Math.abs(expectedLocation - currentLocation);
    if (!distance) // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
    return accuracy + proximity / distance;
}
function $119b89bfb9f77c84$var$convertMaskToIndices(matchmask = [], minMatchCharLength = $119b89bfb9f77c84$var$Config.minMatchCharLength) {
    let indices = [];
    let start = -1;
    let end = -1;
    let i = 0;
    for(let len = matchmask.length; i < len; i += 1){
        let match = matchmask[i];
        if (match && start === -1) start = i;
        else if (!match && start !== -1) {
            end = i - 1;
            if (end - start + 1 >= minMatchCharLength) indices.push([
                start,
                end
            ]);
            start = -1;
        }
    }
    // (i-1 - start) + 1 => i - start
    if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([
        start,
        i - 1
    ]);
    return indices;
}
// Machine word size
const $119b89bfb9f77c84$var$MAX_BITS = 32;
function $119b89bfb9f77c84$var$search(text, pattern, patternAlphabet, { location: location = $119b89bfb9f77c84$var$Config.location , distance: distance = $119b89bfb9f77c84$var$Config.distance , threshold: threshold = $119b89bfb9f77c84$var$Config.threshold , findAllMatches: findAllMatches = $119b89bfb9f77c84$var$Config.findAllMatches , minMatchCharLength: minMatchCharLength = $119b89bfb9f77c84$var$Config.minMatchCharLength , includeMatches: includeMatches = $119b89bfb9f77c84$var$Config.includeMatches , ignoreLocation: ignoreLocation = $119b89bfb9f77c84$var$Config.ignoreLocation  } = {}) {
    if (pattern.length > $119b89bfb9f77c84$var$MAX_BITS) throw new Error($119b89bfb9f77c84$var$PATTERN_LENGTH_TOO_LARGE($119b89bfb9f77c84$var$MAX_BITS));
    const patternLen = pattern.length;
    // Set starting location at beginning text and initialize the alphabet.
    const textLen = text.length;
    // Handle the case when location > text.length
    const expectedLocation = Math.max(0, Math.min(location, textLen));
    // Highest score beyond which we give up.
    let currentThreshold = threshold;
    // Is there a nearby exact match? (speedup)
    let bestLocation = expectedLocation;
    // Performance: only computer matches when the minMatchCharLength > 1
    // OR if `includeMatches` is true.
    const computeMatches = minMatchCharLength > 1 || includeMatches;
    // A mask of the matches, used for building the indices
    const matchMask = computeMatches ? Array(textLen) : [];
    let index;
    // Get all exact matches, here for speed up
    while((index = text.indexOf(pattern, bestLocation)) > -1){
        let score = $119b89bfb9f77c84$var$computeScore$1(pattern, {
            currentLocation: index,
            expectedLocation: expectedLocation,
            distance: distance,
            ignoreLocation: ignoreLocation
        });
        currentThreshold = Math.min(score, currentThreshold);
        bestLocation = index + patternLen;
        if (computeMatches) {
            let i = 0;
            while(i < patternLen){
                matchMask[index + i] = 1;
                i += 1;
            }
        }
    }
    // Reset the best location
    bestLocation = -1;
    let lastBitArr = [];
    let finalScore = 1;
    let binMax = patternLen + textLen;
    const mask = 1 << patternLen - 1;
    for(let i = 0; i < patternLen; i += 1){
        // Scan for the best match; each iteration allows for one more error.
        // Run a binary search to determine how far from the match location we can stray
        // at this error level.
        let binMin = 0;
        let binMid = binMax;
        while(binMin < binMid){
            const score = $119b89bfb9f77c84$var$computeScore$1(pattern, {
                errors: i,
                currentLocation: expectedLocation + binMid,
                expectedLocation: expectedLocation,
                distance: distance,
                ignoreLocation: ignoreLocation
            });
            if (score <= currentThreshold) binMin = binMid;
            else binMax = binMid;
            binMid = Math.floor((binMax - binMin) / 2 + binMin);
        }
        // Use the result from this iteration as the maximum for the next.
        binMax = binMid;
        let start = Math.max(1, expectedLocation - binMid + 1);
        let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
        // Initialize the bit array
        let bitArr = Array(finish + 2);
        bitArr[finish + 1] = (1 << i) - 1;
        for(let j = finish; j >= start; j -= 1){
            let currentLocation = j - 1;
            let charMatch = patternAlphabet[text.charAt(currentLocation)];
            if (computeMatches) // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
            matchMask[currentLocation] = +!!charMatch;
            // First pass: exact match
            bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
            // Subsequent passes: fuzzy match
            if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
            if (bitArr[j] & mask) {
                finalScore = $119b89bfb9f77c84$var$computeScore$1(pattern, {
                    errors: i,
                    currentLocation: currentLocation,
                    expectedLocation: expectedLocation,
                    distance: distance,
                    ignoreLocation: ignoreLocation
                });
                // This match will almost certainly be better than any existing match.
                // But check anyway.
                if (finalScore <= currentThreshold) {
                    // Indeed it is
                    currentThreshold = finalScore;
                    bestLocation = currentLocation;
                    // Already passed `loc`, downhill from here on in.
                    if (bestLocation <= expectedLocation) break;
                    // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
                    start = Math.max(1, 2 * expectedLocation - bestLocation);
                }
            }
        }
        // No hope for a (better) match at greater error levels.
        const score = $119b89bfb9f77c84$var$computeScore$1(pattern, {
            errors: i + 1,
            currentLocation: expectedLocation,
            expectedLocation: expectedLocation,
            distance: distance,
            ignoreLocation: ignoreLocation
        });
        if (score > currentThreshold) break;
        lastBitArr = bitArr;
    }
    const result = {
        isMatch: bestLocation >= 0,
        // Count exact matches (those with a score of 0) to be "almost" exact
        score: Math.max(0.001, finalScore)
    };
    if (computeMatches) {
        const indices = $119b89bfb9f77c84$var$convertMaskToIndices(matchMask, minMatchCharLength);
        if (!indices.length) result.isMatch = false;
        else if (includeMatches) result.indices = indices;
    }
    return result;
}
function $119b89bfb9f77c84$var$createPatternAlphabet(pattern) {
    let mask = {};
    for(let i = 0, len = pattern.length; i < len; i += 1){
        const char = pattern.charAt(i);
        mask[char] = (mask[char] || 0) | 1 << len - i - 1;
    }
    return mask;
}
class $119b89bfb9f77c84$var$BitapSearch {
    searchIn(text) {
        const { isCaseSensitive: isCaseSensitive , includeMatches: includeMatches  } = this.options;
        if (!isCaseSensitive) text = text.toLowerCase();
        // Exact match
        if (this.pattern === text) {
            let result = {
                isMatch: true,
                score: 0
            };
            if (includeMatches) result.indices = [
                [
                    0,
                    text.length - 1
                ]
            ];
            return result;
        }
        // Otherwise, use Bitap algorithm
        const { location: location , distance: distance , threshold: threshold , findAllMatches: findAllMatches , minMatchCharLength: minMatchCharLength , ignoreLocation: ignoreLocation  } = this.options;
        let allIndices = [];
        let totalScore = 0;
        let hasMatches = false;
        this.chunks.forEach(({ pattern: pattern , alphabet: alphabet , startIndex: startIndex  })=>{
            const { isMatch: isMatch , score: score , indices: indices  } = $119b89bfb9f77c84$var$search(text, pattern, alphabet, {
                location: location + startIndex,
                distance: distance,
                threshold: threshold,
                findAllMatches: findAllMatches,
                minMatchCharLength: minMatchCharLength,
                includeMatches: includeMatches,
                ignoreLocation: ignoreLocation
            });
            if (isMatch) hasMatches = true;
            totalScore += score;
            if (isMatch && indices) allIndices = [
                ...allIndices,
                ...indices
            ];
        });
        let result = {
            isMatch: hasMatches,
            score: hasMatches ? totalScore / this.chunks.length : 1
        };
        if (hasMatches && includeMatches) result.indices = allIndices;
        return result;
    }
    constructor(pattern1, { location: location = $119b89bfb9f77c84$var$Config.location , threshold: threshold = $119b89bfb9f77c84$var$Config.threshold , distance: distance = $119b89bfb9f77c84$var$Config.distance , includeMatches: includeMatches = $119b89bfb9f77c84$var$Config.includeMatches , findAllMatches: findAllMatches = $119b89bfb9f77c84$var$Config.findAllMatches , minMatchCharLength: minMatchCharLength = $119b89bfb9f77c84$var$Config.minMatchCharLength , isCaseSensitive: isCaseSensitive = $119b89bfb9f77c84$var$Config.isCaseSensitive , ignoreLocation: ignoreLocation = $119b89bfb9f77c84$var$Config.ignoreLocation  } = {}){
        this.options = {
            location: location,
            threshold: threshold,
            distance: distance,
            includeMatches: includeMatches,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            isCaseSensitive: isCaseSensitive,
            ignoreLocation: ignoreLocation
        };
        this.pattern = isCaseSensitive ? pattern1 : pattern1.toLowerCase();
        this.chunks = [];
        if (!this.pattern.length) return;
        const addChunk = (pattern, startIndex)=>{
            this.chunks.push({
                pattern: pattern,
                alphabet: $119b89bfb9f77c84$var$createPatternAlphabet(pattern),
                startIndex: startIndex
            });
        };
        const len = this.pattern.length;
        if (len > $119b89bfb9f77c84$var$MAX_BITS) {
            let i = 0;
            const remainder = len % $119b89bfb9f77c84$var$MAX_BITS;
            const end = len - remainder;
            while(i < end){
                addChunk(this.pattern.substr(i, $119b89bfb9f77c84$var$MAX_BITS), i);
                i += $119b89bfb9f77c84$var$MAX_BITS;
            }
            if (remainder) {
                const startIndex = len - $119b89bfb9f77c84$var$MAX_BITS;
                addChunk(this.pattern.substr(startIndex), startIndex);
            }
        } else addChunk(this.pattern, 0);
    }
}
class $119b89bfb9f77c84$var$BaseMatch {
    static isMultiMatch(pattern) {
        return $119b89bfb9f77c84$var$getMatch(pattern, this.multiRegex);
    }
    static isSingleMatch(pattern) {
        return $119b89bfb9f77c84$var$getMatch(pattern, this.singleRegex);
    }
    search() {}
    constructor(pattern){
        this.pattern = pattern;
    }
}
function $119b89bfb9f77c84$var$getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null;
}
// Token: 'file
class $119b89bfb9f77c84$var$ExactMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "exact";
    }
    static get multiRegex() {
        return /^="(.*)"$/;
    }
    static get singleRegex() {
        return /^=(.*)$/;
    }
    search(text) {
        const isMatch = text === this.pattern;
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: [
                0,
                this.pattern.length - 1
            ]
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
// Token: !fire
class $119b89bfb9f77c84$var$InverseExactMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "inverse-exact";
    }
    static get multiRegex() {
        return /^!"(.*)"$/;
    }
    static get singleRegex() {
        return /^!(.*)$/;
    }
    search(text) {
        const index = text.indexOf(this.pattern);
        const isMatch = index === -1;
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: [
                0,
                text.length - 1
            ]
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
// Token: ^file
class $119b89bfb9f77c84$var$PrefixExactMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "prefix-exact";
    }
    static get multiRegex() {
        return /^\^"(.*)"$/;
    }
    static get singleRegex() {
        return /^\^(.*)$/;
    }
    search(text) {
        const isMatch = text.startsWith(this.pattern);
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: [
                0,
                this.pattern.length - 1
            ]
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
// Token: !^fire
class $119b89bfb9f77c84$var$InversePrefixExactMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "inverse-prefix-exact";
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/;
    }
    static get singleRegex() {
        return /^!\^(.*)$/;
    }
    search(text) {
        const isMatch = !text.startsWith(this.pattern);
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: [
                0,
                text.length - 1
            ]
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
// Token: .file$
class $119b89bfb9f77c84$var$SuffixExactMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "suffix-exact";
    }
    static get multiRegex() {
        return /^"(.*)"\$$/;
    }
    static get singleRegex() {
        return /^(.*)\$$/;
    }
    search(text) {
        const isMatch = text.endsWith(this.pattern);
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: [
                text.length - this.pattern.length,
                text.length - 1
            ]
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
// Token: !.file$
class $119b89bfb9f77c84$var$InverseSuffixExactMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "inverse-suffix-exact";
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/;
    }
    static get singleRegex() {
        return /^!(.*)\$$/;
    }
    search(text) {
        const isMatch = !text.endsWith(this.pattern);
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: [
                0,
                text.length - 1
            ]
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
class $119b89bfb9f77c84$var$FuzzyMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "fuzzy";
    }
    static get multiRegex() {
        return /^"(.*)"$/;
    }
    static get singleRegex() {
        return /^(.*)$/;
    }
    search(text) {
        return this._bitapSearch.searchIn(text);
    }
    constructor(pattern, { location: location = $119b89bfb9f77c84$var$Config.location , threshold: threshold = $119b89bfb9f77c84$var$Config.threshold , distance: distance = $119b89bfb9f77c84$var$Config.distance , includeMatches: includeMatches = $119b89bfb9f77c84$var$Config.includeMatches , findAllMatches: findAllMatches = $119b89bfb9f77c84$var$Config.findAllMatches , minMatchCharLength: minMatchCharLength = $119b89bfb9f77c84$var$Config.minMatchCharLength , isCaseSensitive: isCaseSensitive = $119b89bfb9f77c84$var$Config.isCaseSensitive , ignoreLocation: ignoreLocation = $119b89bfb9f77c84$var$Config.ignoreLocation  } = {}){
        super(pattern);
        this._bitapSearch = new $119b89bfb9f77c84$var$BitapSearch(pattern, {
            location: location,
            threshold: threshold,
            distance: distance,
            includeMatches: includeMatches,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            isCaseSensitive: isCaseSensitive,
            ignoreLocation: ignoreLocation
        });
    }
}
// Token: 'file
class $119b89bfb9f77c84$var$IncludeMatch extends $119b89bfb9f77c84$var$BaseMatch {
    static get type() {
        return "include";
    }
    static get multiRegex() {
        return /^'"(.*)"$/;
    }
    static get singleRegex() {
        return /^'(.*)$/;
    }
    search(text) {
        let location = 0;
        let index;
        const indices = [];
        const patternLen = this.pattern.length;
        // Get all exact matches
        while((index = text.indexOf(this.pattern, location)) > -1){
            location = index + patternLen;
            indices.push([
                index,
                location - 1
            ]);
        }
        const isMatch = !!indices.length;
        return {
            isMatch: isMatch,
            score: isMatch ? 0 : 1,
            indices: indices
        };
    }
    constructor(pattern){
        super(pattern);
    }
}
// ❗Order is important. DO NOT CHANGE.
const $119b89bfb9f77c84$var$searchers = [
    $119b89bfb9f77c84$var$ExactMatch,
    $119b89bfb9f77c84$var$IncludeMatch,
    $119b89bfb9f77c84$var$PrefixExactMatch,
    $119b89bfb9f77c84$var$InversePrefixExactMatch,
    $119b89bfb9f77c84$var$InverseSuffixExactMatch,
    $119b89bfb9f77c84$var$SuffixExactMatch,
    $119b89bfb9f77c84$var$InverseExactMatch,
    $119b89bfb9f77c84$var$FuzzyMatch
];
const $119b89bfb9f77c84$var$searchersLen = $119b89bfb9f77c84$var$searchers.length;
// Regex to split by spaces, but keep anything in quotes together
const $119b89bfb9f77c84$var$SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
const $119b89bfb9f77c84$var$OR_TOKEN = "|";
// Return a 2D array representation of the query, for simpler parsing.
// Example:
// "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
function $119b89bfb9f77c84$var$parseQuery(pattern, options = {}) {
    return pattern.split($119b89bfb9f77c84$var$OR_TOKEN).map((item1)=>{
        let query = item1.trim().split($119b89bfb9f77c84$var$SPACE_RE).filter((item)=>item && !!item.trim());
        let results = [];
        for(let i = 0, len = query.length; i < len; i += 1){
            const queryItem = query[i];
            // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
            let found = false;
            let idx = -1;
            while(!found && ++idx < $119b89bfb9f77c84$var$searchersLen){
                const searcher = $119b89bfb9f77c84$var$searchers[idx];
                let token = searcher.isMultiMatch(queryItem);
                if (token) {
                    results.push(new searcher(token, options));
                    found = true;
                }
            }
            if (found) continue;
            // 2. Handle single query matches (i.e, once that are *not* quoted)
            idx = -1;
            while(++idx < $119b89bfb9f77c84$var$searchersLen){
                const searcher = $119b89bfb9f77c84$var$searchers[idx];
                let token = searcher.isSingleMatch(queryItem);
                if (token) {
                    results.push(new searcher(token, options));
                    break;
                }
            }
        }
        return results;
    });
}
// These extended matchers can return an array of matches, as opposed
// to a singl match
const $119b89bfb9f77c84$var$MultiMatchSet = new Set([
    $119b89bfb9f77c84$var$FuzzyMatch.type,
    $119b89bfb9f77c84$var$IncludeMatch.type
]);
/**
 * Command-like searching
 * ======================
 *
 * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
 * search in a given text.
 *
 * Search syntax:
 *
 * | Token       | Match type                 | Description                            |
 * | ----------- | -------------------------- | -------------------------------------- |
 * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
 * | `=scheme`   | exact-match                | Items that are `scheme`                |
 * | `'python`   | include-match              | Items that include `python`            |
 * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
 * | `^java`     | prefix-exact-match         | Items that start with `java`           |
 * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
 * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
 * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
 *
 * A single pipe character acts as an OR operator. For example, the following
 * query matches entries that start with `core` and end with either`go`, `rb`,
 * or`py`.
 *
 * ```
 * ^core go$ | rb$ | py$
 * ```
 */ class $119b89bfb9f77c84$var$ExtendedSearch {
    static condition(_, options) {
        return options.useExtendedSearch;
    }
    searchIn(text) {
        const query = this.query;
        if (!query) return {
            isMatch: false,
            score: 1
        };
        const { includeMatches: includeMatches , isCaseSensitive: isCaseSensitive  } = this.options;
        text = isCaseSensitive ? text : text.toLowerCase();
        let numMatches = 0;
        let allIndices = [];
        let totalScore = 0;
        // ORs
        for(let i = 0, qLen = query.length; i < qLen; i += 1){
            const searchers1 = query[i];
            // Reset indices
            allIndices.length = 0;
            numMatches = 0;
            // ANDs
            for(let j = 0, pLen = searchers1.length; j < pLen; j += 1){
                const searcher = searchers1[j];
                const { isMatch: isMatch , indices: indices , score: score  } = searcher.search(text);
                if (isMatch) {
                    numMatches += 1;
                    totalScore += score;
                    if (includeMatches) {
                        const type = searcher.constructor.type;
                        if ($119b89bfb9f77c84$var$MultiMatchSet.has(type)) allIndices = [
                            ...allIndices,
                            ...indices
                        ];
                        else allIndices.push(indices);
                    }
                } else {
                    totalScore = 0;
                    numMatches = 0;
                    allIndices.length = 0;
                    break;
                }
            }
            // OR condition, so if TRUE, return
            if (numMatches) {
                let result = {
                    isMatch: true,
                    score: totalScore / numMatches
                };
                if (includeMatches) result.indices = allIndices;
                return result;
            }
        }
        // Nothing was matched
        return {
            isMatch: false,
            score: 1
        };
    }
    constructor(pattern, { isCaseSensitive: isCaseSensitive = $119b89bfb9f77c84$var$Config.isCaseSensitive , includeMatches: includeMatches = $119b89bfb9f77c84$var$Config.includeMatches , minMatchCharLength: minMatchCharLength = $119b89bfb9f77c84$var$Config.minMatchCharLength , ignoreLocation: ignoreLocation = $119b89bfb9f77c84$var$Config.ignoreLocation , findAllMatches: findAllMatches = $119b89bfb9f77c84$var$Config.findAllMatches , location: location = $119b89bfb9f77c84$var$Config.location , threshold: threshold = $119b89bfb9f77c84$var$Config.threshold , distance: distance = $119b89bfb9f77c84$var$Config.distance  } = {}){
        this.query = null;
        this.options = {
            isCaseSensitive: isCaseSensitive,
            includeMatches: includeMatches,
            minMatchCharLength: minMatchCharLength,
            findAllMatches: findAllMatches,
            ignoreLocation: ignoreLocation,
            location: location,
            threshold: threshold,
            distance: distance
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.query = $119b89bfb9f77c84$var$parseQuery(this.pattern, this.options);
    }
}
const $119b89bfb9f77c84$var$registeredSearchers = [];
function $119b89bfb9f77c84$var$register(...args) {
    $119b89bfb9f77c84$var$registeredSearchers.push(...args);
}
function $119b89bfb9f77c84$var$createSearcher(pattern, options) {
    for(let i = 0, len = $119b89bfb9f77c84$var$registeredSearchers.length; i < len; i += 1){
        let searcherClass = $119b89bfb9f77c84$var$registeredSearchers[i];
        if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
    }
    return new $119b89bfb9f77c84$var$BitapSearch(pattern, options);
}
const $119b89bfb9f77c84$var$LogicalOperator = {
    AND: "$and",
    OR: "$or"
};
const $119b89bfb9f77c84$var$KeyType = {
    PATH: "$path",
    PATTERN: "$val"
};
const $119b89bfb9f77c84$var$isExpression = (query)=>!!(query[$119b89bfb9f77c84$var$LogicalOperator.AND] || query[$119b89bfb9f77c84$var$LogicalOperator.OR]);
const $119b89bfb9f77c84$var$isPath = (query)=>!!query[$119b89bfb9f77c84$var$KeyType.PATH];
const $119b89bfb9f77c84$var$isLeaf = (query)=>!$119b89bfb9f77c84$var$isArray(query) && $119b89bfb9f77c84$var$isObject(query) && !$119b89bfb9f77c84$var$isExpression(query);
const $119b89bfb9f77c84$var$convertToExplicit = (query)=>({
        [$119b89bfb9f77c84$var$LogicalOperator.AND]: Object.keys(query).map((key)=>({
                [key]: query[key]
            }))
    });
// When `auto` is `true`, the parse function will infer and initialize and add
// the appropriate `Searcher` instance
function $119b89bfb9f77c84$var$parse(query1, options, { auto: auto = true  } = {}) {
    const next = (query)=>{
        let keys = Object.keys(query);
        const isQueryPath = $119b89bfb9f77c84$var$isPath(query);
        if (!isQueryPath && keys.length > 1 && !$119b89bfb9f77c84$var$isExpression(query)) return next($119b89bfb9f77c84$var$convertToExplicit(query));
        if ($119b89bfb9f77c84$var$isLeaf(query)) {
            const key = isQueryPath ? query[$119b89bfb9f77c84$var$KeyType.PATH] : keys[0];
            const pattern = isQueryPath ? query[$119b89bfb9f77c84$var$KeyType.PATTERN] : query[key];
            if (!$119b89bfb9f77c84$var$isString(pattern)) throw new Error($119b89bfb9f77c84$var$LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
            const obj = {
                keyId: $119b89bfb9f77c84$var$createKeyId(key),
                pattern: pattern
            };
            if (auto) obj.searcher = $119b89bfb9f77c84$var$createSearcher(pattern, options);
            return obj;
        }
        let node = {
            children: [],
            operator: keys[0]
        };
        keys.forEach((key)=>{
            const value = query[key];
            if ($119b89bfb9f77c84$var$isArray(value)) value.forEach((item)=>{
                node.children.push(next(item));
            });
        });
        return node;
    };
    if (!$119b89bfb9f77c84$var$isExpression(query1)) query1 = $119b89bfb9f77c84$var$convertToExplicit(query1);
    return next(query1);
}
// Practical scoring function
function $119b89bfb9f77c84$var$computeScore(results, { ignoreFieldNorm: ignoreFieldNorm = $119b89bfb9f77c84$var$Config.ignoreFieldNorm  }) {
    results.forEach((result)=>{
        let totalScore = 1;
        result.matches.forEach(({ key: key , norm: norm2 , score: score  })=>{
            const weight = key ? key.weight : null;
            totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
        });
        result.score = totalScore;
    });
}
function $119b89bfb9f77c84$var$transformMatches(result, data) {
    const matches = result.matches;
    data.matches = [];
    if (!$119b89bfb9f77c84$var$isDefined(matches)) return;
    matches.forEach((match)=>{
        if (!$119b89bfb9f77c84$var$isDefined(match.indices) || !match.indices.length) return;
        const { indices: indices , value: value  } = match;
        let obj = {
            indices: indices,
            value: value
        };
        if (match.key) obj.key = match.key.src;
        if (match.idx > -1) obj.refIndex = match.idx;
        data.matches.push(obj);
    });
}
function $119b89bfb9f77c84$var$transformScore(result, data) {
    data.score = result.score;
}
function $119b89bfb9f77c84$var$format(results, docs, { includeMatches: includeMatches = $119b89bfb9f77c84$var$Config.includeMatches , includeScore: includeScore = $119b89bfb9f77c84$var$Config.includeScore  } = {}) {
    const transformers = [];
    if (includeMatches) transformers.push($119b89bfb9f77c84$var$transformMatches);
    if (includeScore) transformers.push($119b89bfb9f77c84$var$transformScore);
    return results.map((result)=>{
        const { idx: idx  } = result;
        const data = {
            item: docs[idx],
            refIndex: idx
        };
        if (transformers.length) transformers.forEach((transformer)=>{
            transformer(result, data);
        });
        return data;
    });
}
class $119b89bfb9f77c84$export$2e2bcd8739ae039 {
    setCollection(docs, index) {
        this._docs = docs;
        if (index && !(index instanceof $119b89bfb9f77c84$var$FuseIndex)) throw new Error($119b89bfb9f77c84$var$INCORRECT_INDEX_TYPE);
        this._myIndex = index || $119b89bfb9f77c84$var$createIndex(this.options.keys, this._docs, {
            getFn: this.options.getFn,
            fieldNormWeight: this.options.fieldNormWeight
        });
    }
    add(doc) {
        if (!$119b89bfb9f77c84$var$isDefined(doc)) return;
        this._docs.push(doc);
        this._myIndex.add(doc);
    }
    remove(predicate = ()=>false) {
        const results = [];
        for(let i = 0, len = this._docs.length; i < len; i += 1){
            const doc = this._docs[i];
            if (predicate(doc, i)) {
                this.removeAt(i);
                i -= 1;
                len -= 1;
                results.push(doc);
            }
        }
        return results;
    }
    removeAt(idx) {
        this._docs.splice(idx, 1);
        this._myIndex.removeAt(idx);
    }
    getIndex() {
        return this._myIndex;
    }
    search(query, { limit: limit = -1  } = {}) {
        const { includeMatches: includeMatches , includeScore: includeScore , shouldSort: shouldSort , sortFn: sortFn , ignoreFieldNorm: ignoreFieldNorm  } = this.options;
        let results = $119b89bfb9f77c84$var$isString(query) ? $119b89bfb9f77c84$var$isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        $119b89bfb9f77c84$var$computeScore(results, {
            ignoreFieldNorm: ignoreFieldNorm
        });
        if (shouldSort) results.sort(sortFn);
        if ($119b89bfb9f77c84$var$isNumber(limit) && limit > -1) results = results.slice(0, limit);
        return $119b89bfb9f77c84$var$format(results, this._docs, {
            includeMatches: includeMatches,
            includeScore: includeScore
        });
    }
    _searchStringList(query) {
        const searcher = $119b89bfb9f77c84$var$createSearcher(query, this.options);
        const { records: records  } = this._myIndex;
        const results = [];
        // Iterate over every string in the index
        records.forEach(({ v: text , i: idx , n: norm3  })=>{
            if (!$119b89bfb9f77c84$var$isDefined(text)) return;
            const { isMatch: isMatch , score: score , indices: indices  } = searcher.searchIn(text);
            if (isMatch) results.push({
                item: text,
                idx: idx,
                matches: [
                    {
                        score: score,
                        value: text,
                        norm: norm3,
                        indices: indices
                    }
                ]
            });
        });
        return results;
    }
    _searchLogical(query) {
        const expression = $119b89bfb9f77c84$var$parse(query, this.options);
        const evaluate = (node, item, idx)=>{
            if (!node.children) {
                const { keyId: keyId , searcher: searcher  } = node;
                const matches = this._findMatches({
                    key: this._keyStore.get(keyId),
                    value: this._myIndex.getValueForItemAtKeyId(item, keyId),
                    searcher: searcher
                });
                if (matches && matches.length) return [
                    {
                        idx: idx,
                        item: item,
                        matches: matches
                    }
                ];
                return [];
            }
            const res = [];
            for(let i = 0, len = node.children.length; i < len; i += 1){
                const child = node.children[i];
                const result = evaluate(child, item, idx);
                if (result.length) res.push(...result);
                else if (node.operator === $119b89bfb9f77c84$var$LogicalOperator.AND) return [];
            }
            return res;
        };
        const records = this._myIndex.records;
        const resultMap = {};
        const results = [];
        records.forEach(({ $: item , i: idx  })=>{
            if ($119b89bfb9f77c84$var$isDefined(item)) {
                let expResults = evaluate(expression, item, idx);
                if (expResults.length) {
                    // Dedupe when adding
                    if (!resultMap[idx]) {
                        resultMap[idx] = {
                            idx: idx,
                            item: item,
                            matches: []
                        };
                        results.push(resultMap[idx]);
                    }
                    expResults.forEach(({ matches: matches  })=>{
                        resultMap[idx].matches.push(...matches);
                    });
                }
            }
        });
        return results;
    }
    _searchObjectList(query) {
        const searcher = $119b89bfb9f77c84$var$createSearcher(query, this.options);
        const { keys: keys , records: records  } = this._myIndex;
        const results = [];
        // List is Array<Object>
        records.forEach(({ $: item , i: idx  })=>{
            if (!$119b89bfb9f77c84$var$isDefined(item)) return;
            let matches = [];
            // Iterate over every key (i.e, path), and fetch the value at that key
            keys.forEach((key, keyIndex)=>{
                matches.push(...this._findMatches({
                    key: key,
                    value: item[keyIndex],
                    searcher: searcher
                }));
            });
            if (matches.length) results.push({
                idx: idx,
                item: item,
                matches: matches
            });
        });
        return results;
    }
    _findMatches({ key: key , value: value , searcher: searcher  }) {
        if (!$119b89bfb9f77c84$var$isDefined(value)) return [];
        let matches = [];
        if ($119b89bfb9f77c84$var$isArray(value)) value.forEach(({ v: text , i: idx , n: norm4  })=>{
            if (!$119b89bfb9f77c84$var$isDefined(text)) return;
            const { isMatch: isMatch , score: score , indices: indices  } = searcher.searchIn(text);
            if (isMatch) matches.push({
                score: score,
                key: key,
                value: text,
                idx: idx,
                norm: norm4,
                indices: indices
            });
        });
        else {
            const { v: text , n: norm5  } = value;
            const { isMatch: isMatch , score: score , indices: indices  } = searcher.searchIn(text);
            if (isMatch) matches.push({
                score: score,
                key: key,
                value: text,
                norm: norm5,
                indices: indices
            });
        }
        return matches;
    }
    constructor(docs, options = {}, index){
        this.options = {
            ...$119b89bfb9f77c84$var$Config,
            ...options
        };
        this.options.useExtendedSearch;
        this._keyStore = new $119b89bfb9f77c84$var$KeyStore(this.options.keys);
        this.setCollection(docs, index);
    }
}
$119b89bfb9f77c84$export$2e2bcd8739ae039.version = "6.6.2";
$119b89bfb9f77c84$export$2e2bcd8739ae039.createIndex = $119b89bfb9f77c84$var$createIndex;
$119b89bfb9f77c84$export$2e2bcd8739ae039.parseIndex = $119b89bfb9f77c84$var$parseIndex;
$119b89bfb9f77c84$export$2e2bcd8739ae039.config = $119b89bfb9f77c84$var$Config;
$119b89bfb9f77c84$export$2e2bcd8739ae039.parseQuery = $119b89bfb9f77c84$var$parse;
$119b89bfb9f77c84$var$register($119b89bfb9f77c84$var$ExtendedSearch);


var $ed998f6185713332$export$1e511d4a378977f5;
var $ed998f6185713332$export$9f17032d917177de;
var $ed998f6185713332$export$ff7f7c97cdce86e;
"use strict";
$ed998f6185713332$export$1e511d4a378977f5 = true;
$ed998f6185713332$export$9f17032d917177de = $ed998f6185713332$export$ff7f7c97cdce86e = void 0;
var $ed998f6185713332$var$peq = new Uint32Array(0x10000);
var $ed998f6185713332$var$myers_32 = function(a, b) {
    var n = a.length;
    var m = b.length;
    var lst = 1 << n - 1;
    var pv = -1;
    var mv = 0;
    var sc = n;
    var i = n;
    while(i--)$ed998f6185713332$var$peq[a.charCodeAt(i)] |= 1 << i;
    for(i = 0; i < m; i++){
        var eq = $ed998f6185713332$var$peq[b.charCodeAt(i)];
        var xv = eq | mv;
        eq |= (eq & pv) + pv ^ pv;
        mv |= ~(eq | pv);
        pv &= eq;
        if (mv & lst) sc++;
        if (pv & lst) sc--;
        mv = mv << 1 | 1;
        pv = pv << 1 | ~(xv | mv);
        mv &= xv;
    }
    i = n;
    while(i--)$ed998f6185713332$var$peq[a.charCodeAt(i)] = 0;
    return sc;
};
var $ed998f6185713332$var$myers_x = function(b, a) {
    var n = a.length;
    var m = b.length;
    var mhc = [];
    var phc = [];
    var hsize = Math.ceil(n / 32);
    var vsize = Math.ceil(m / 32);
    for(var i = 0; i < hsize; i++){
        phc[i] = -1;
        mhc[i] = 0;
    }
    var j = 0;
    for(; j < vsize - 1; j++){
        var mv_1 = 0;
        var pv_1 = -1;
        var start_1 = j * 32;
        var vlen_1 = Math.min(32, m) + start_1;
        for(var k = start_1; k < vlen_1; k++)$ed998f6185713332$var$peq[b.charCodeAt(k)] |= 1 << k;
        for(var i = 0; i < n; i++){
            var eq = $ed998f6185713332$var$peq[a.charCodeAt(i)];
            var pb = phc[i / 32 | 0] >>> i & 1;
            var mb = mhc[i / 32 | 0] >>> i & 1;
            var xv = eq | mv_1;
            var xh = ((eq | mb) & pv_1) + pv_1 ^ pv_1 | eq | mb;
            var ph = mv_1 | ~(xh | pv_1);
            var mh = pv_1 & xh;
            if (ph >>> 31 ^ pb) phc[i / 32 | 0] ^= 1 << i;
            if (mh >>> 31 ^ mb) mhc[i / 32 | 0] ^= 1 << i;
            ph = ph << 1 | pb;
            mh = mh << 1 | mb;
            pv_1 = mh | ~(xv | ph);
            mv_1 = ph & xv;
        }
        for(var k = start_1; k < vlen_1; k++)$ed998f6185713332$var$peq[b.charCodeAt(k)] = 0;
    }
    var mv = 0;
    var pv = -1;
    var start = j * 32;
    var vlen = Math.min(32, m - start) + start;
    for(var k = start; k < vlen; k++)$ed998f6185713332$var$peq[b.charCodeAt(k)] |= 1 << k;
    var score = m;
    for(var i = 0; i < n; i++){
        var eq = $ed998f6185713332$var$peq[a.charCodeAt(i)];
        var pb = phc[i / 32 | 0] >>> i & 1;
        var mb = mhc[i / 32 | 0] >>> i & 1;
        var xv = eq | mv;
        var xh = ((eq | mb) & pv) + pv ^ pv | eq | mb;
        var ph = mv | ~(xh | pv);
        var mh = pv & xh;
        score += ph >>> m - 1 & 1;
        score -= mh >>> m - 1 & 1;
        if (ph >>> 31 ^ pb) phc[i / 32 | 0] ^= 1 << i;
        if (mh >>> 31 ^ mb) mhc[i / 32 | 0] ^= 1 << i;
        ph = ph << 1 | pb;
        mh = mh << 1 | mb;
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }
    for(var k = start; k < vlen; k++)$ed998f6185713332$var$peq[b.charCodeAt(k)] = 0;
    return score;
};
var $ed998f6185713332$var$distance = function(a, b) {
    if (a.length < b.length) {
        var tmp = b;
        b = a;
        a = tmp;
    }
    if (b.length === 0) return a.length;
    if (a.length <= 32) return $ed998f6185713332$var$myers_32(a, b);
    return $ed998f6185713332$var$myers_x(a, b);
};
$ed998f6185713332$export$9f17032d917177de = $ed998f6185713332$var$distance;
var $ed998f6185713332$var$closest = function(str, arr) {
    var min_distance = Infinity;
    var min_index = 0;
    for(var i = 0; i < arr.length; i++){
        var dist = $ed998f6185713332$var$distance(str, arr[i]);
        if (dist < min_distance) {
            min_distance = dist;
            min_index = i;
        }
    }
    return arr[min_index];
};
$ed998f6185713332$export$ff7f7c97cdce86e = $ed998f6185713332$var$closest;


var $39da3df97ab2d361$export$2e2bcd8739ae039 = [
    {
        title: "1000 Airplanes on the Roof",
        composer: "Philip Glass",
        date: "1988",
        Premiere: "July 15, 1988"
    },
    {
        title: "1492 epopea lirica d'America",
        composer: "Antonio Braga",
        date: "1992"
    },
    {
        title: "1984",
        composer: "Lorin Maazel",
        date: "2005",
        Librettist: "\n",
        Language: "English",
        "Based on": "Nineteen Eighty-Four",
        Premiere: "3 May 2005",
        "Website": "www.1984theopera.com"
    },
    {
        title: "Le 66",
        composer: "Jacques Offenbach",
        date: "1856"
    },
    {
        title: "L'abandon d'Ariane",
        composer: "Darius Milhaud",
        date: "1928",
        Librettist: "Henri Hoppenot",
        Language: "French",
        "Based on": "Ariadne",
        Premiere: "20 April 1928"
    },
    {
        title: "Abu Hassan",
        composer: "Carl Maria von Weber",
        date: "1811",
        Librettist: "Franz Carl Hiemer",
        Language: "German",
        "Based on": "One Thousand and One Nights",
        Premiere: "4 June 1811"
    },
    {
        title: "Acante et C\xe9phise",
        composer: "Jean-Philippe Rameau",
        date: "1751"
    },
    {
        title: "Achille et Polyx\xe8ne",
        composer: "Jean-Baptiste Lully",
        date: "1687",
        Librettist: "Jean Galbert de Campistron",
        Language: "French",
        "Based on": "Aeneid",
        Premiere: "7 November 1687"
    },
    {
        title: "Acis and Galatea",
        composer: "George Frideric Handel",
        date: "1718"
    },
    {
        title: "Acis et Galat\xe9e",
        composer: "Jean-Baptiste Lully",
        date: "1686"
    },
    {
        title: "Act\xe9on",
        composer: "Marc-Antoine Charpentier",
        date: "1683\u20131685",
        Language: "French",
        "Based on": "Ovid"
    },
    {
        title: "Adelaide",
        composer: "Antonio Sartorio",
        date: "1672"
    },
    {
        title: "Adelaide di Borgogna",
        composer: "Gioachino Rossini",
        date: "1817",
        Librettist: "Giovanni Schmidt",
        Language: "Italian",
        Premiere: "27 December 1817"
    },
    {
        title: "Adelia",
        composer: "Gaetano Donizetti",
        date: "1841",
        "Other title": "La figlia dell'arciere",
        Librettist: "\n",
        Language: "Italian",
        Premiere: "11 February 1841"
    },
    {
        title: "Adelson e Salvini",
        composer: "Vincenzo Bellini",
        date: "1825",
        Librettist: "Andrea Leone Tottola",
        Language: "Italian",
        "Based on": "Baculard d'Arnaud",
        Premiere: "12 February 1825"
    },
    {
        title: "Admeto",
        composer: "Handel",
        date: "1727"
    },
    {
        title: "Adriana Lecouvreur",
        composer: "Francesco Cilea",
        date: "1902",
        Librettist: "Arturo Colautti",
        Language: "Italian",
        "Based on": "Adrienne Lecouvreur",
        Premiere: "6 November 1902"
    },
    {
        title: "Adriana Mater",
        composer: "Kaija Saariaho",
        date: "2008",
        Librettist: "Amin Maalouf",
        Language: "French",
        Premiere: "3 April 2006"
    },
    {
        title: "The Adventures of Pinocchio",
        composer: "Jonathan Dove",
        date: "2007",
        Librettist: "Alasdair Middleton",
        Language: "English",
        "Based on": "The Adventures of Pinocchio",
        Premiere: "21 December 2007"
    },
    {
        title: "L'Africaine(Vasco de Gama)",
        composer: "Giacomo Meyerbeer",
        date: "1865",
        Librettist: "Eug\xe8ne Scribe",
        Language: "French",
        Premiere: "28 April 1865"
    },
    {
        title: "After All!",
        composer: "Alfred Cellier",
        date: "1878"
    },
    {
        title: "Ages Ago",
        composer: "Frederic Clay",
        date: "1869"
    },
    {
        title: "Agrippina",
        composer: "Handel",
        date: "1709"
    },
    {
        title: "Die \xe4gyptische Helena",
        composer: "Richard Strauss",
        date: "1928",
        Librettist: "Hugo von Hofmannsthal",
        Language: "German",
        "Based on": "Helen",
        Premiere: "6 June 1928"
    },
    {
        title: "Aida",
        composer: "Giuseppe Verdi",
        date: "1871",
        Librettist: "Antonio Ghislanzoni",
        Language: "Italian",
        Premiere: "24 December 1871"
    },
    {
        title: "Ainadamar",
        composer: "Osvaldo Golijov",
        date: "2003",
        Translation: "Fountain of Tears",
        Librettist: "David Henry Hwang",
        Language: "Spanish",
        "Based on": "Federico Garc\xeda Lorca",
        Premiere: "August 10, 2003"
    },
    {
        title: "Akhnaten",
        composer: "Philip Glass",
        date: "1984",
        Premiere: "March 24, 1984"
    },
    {
        title: "Alahor in Granata",
        composer: "Gaetano Donizetti",
        date: "1826",
        Librettist: "M.A.",
        Language: "Italian",
        "Based on": "Jean-Pierre Claris de Florian",
        Premiere: "7 January 1826"
    },
    {
        title: "Albert Herring",
        composer: "Britten",
        date: "1947",
        Librettist: "Eric Crozier",
        Language: "English",
        "Based on": "Le Rosier de Madame Husson",
        Premiere: "20 June 1947"
    },
    {
        title: "Alceste",
        composer: "Gluck",
        date: "1767"
    },
    {
        title: "Alceste",
        composer: "Handel",
        date: "1750"
    },
    {
        title: "Alceste",
        composer: "Lully",
        date: "1674"
    },
    {
        title: "Alcina",
        composer: "Handel",
        date: "1735",
        Language: "Italian",
        "Based on": "L'isola di Alcina",
        Premiere: "16 April 1735"
    },
    {
        title: "Alessandro",
        composer: "Handel",
        date: "1726"
    },
    {
        title: "Alessandro nelle Indie",
        composer: "Pacini",
        date: "1824",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "Alessandro nell'Indie",
        Premiere: "29 September 1824"
    },
    {
        title: "Alexandre bis",
        composer: "Martin\u016F",
        date: "1964",
        Librettist: "Andr\xe9 Wurmser",
        Language: "French",
        Premiere: "18 February 1964"
    },
    {
        title: "Alzira",
        composer: "Verdi",
        date: "1845",
        Librettist: "Salvatore Cammarano",
        Language: "Italian",
        "Based on": "Voltaire",
        Premiere: "12 August 1845"
    },
    {
        title: "Amadis",
        composer: "Lully",
        date: "1684"
    },
    {
        title: "Amadis",
        composer: "Massenet",
        date: "1922",
        Librettist: "Jules Claretie",
        Language: "French",
        "Based on": "Amadis de Gaula",
        Premiere: "1 April 1922"
    },
    {
        title: "Amahl and the Night Visitors",
        composer: "Menotti",
        date: "1951",
        Librettist: "Menotti",
        Language: "English",
        "Based on": "Hieronymus Bosch",
        Premiere: "December 24, 1951"
    },
    {
        title: "An American Tragedy",
        composer: "Picker",
        date: "2005",
        Librettist: "Gene Scheer",
        Language: "English",
        "Based on": "An American Tragedy",
        Premiere: "December 2, 2005"
    },
    {
        title: "Amelia",
        composer: "Hagen",
        date: "2010",
        Librettist: "Gardner McFall",
        Language: "English",
        Premiere: "May 8, 2010"
    },
    {
        title: "L'amico Fritz",
        composer: "Pietro Mascagni",
        date: "Pietro Mascagni",
        Librettist: "P. Suardon",
        Language: "Italian",
        "Based on": "L'Ami Fritz",
        Premiere: "31 October 1891"
    },
    {
        title: "L'Amour de loin",
        composer: "Kaija Saariaho",
        date: "2000",
        Translation: "Love from Afar",
        Librettist: "Amin Maalouf",
        Language: "French",
        Premiere: "15 August 2000"
    },
    {
        title: "Andrea Ch\xe9nier",
        composer: "Giordano",
        date: "1896",
        Librettist: "Luigi Illica",
        Premiere: "28 March 1896 (1896-03-28)La Scala, Milan, Kingdom of Italy"
    },
    {
        title: "L'Ange de Nisida",
        composer: "Donizetti",
        date: "1839",
        Translation: "The Angel of Nisida",
        Librettist: "\n",
        Language: "French"
    },
    {
        title: "Angelo",
        composer: "Cui",
        date: "1876"
    },
    {
        title: "Aniara",
        composer: "Blomdahl",
        date: "1959",
        Librettist: "Erik Lindegren",
        Language: "Swedish",
        "Based on": "Aniara",
        Premiere: "31 May 1959"
    },
    {
        title: "Anna Bolena",
        composer: "Donizetti",
        date: "1830",
        Librettist: "Felice Romani",
        Language: "Italian",
        Premiere: "26 December 1830"
    },
    {
        title: "Anna Nicole",
        composer: "Mark-Anthony Turnage",
        date: "2011",
        Librettist: "Richard Thomas",
        "Based on": "Anna Nicole Smith",
        Premiere: "17 February 2011"
    },
    {
        title: "Antigonae",
        composer: "Orff",
        date: "1949",
        Language: "German",
        "Based on": "Friedrich H\xf6lderlin",
        Premiere: "9 August 1949"
    },
    {
        title: "Apollo et Hyacinthus",
        composer: "Wolfgang Amadeus Mozart",
        date: "1767",
        Librettist: "Rufinus Widl",
        Language: "Latin",
        "Based on": "Ovid",
        Premiere: "1767"
    },
    {
        title: "Aquarius",
        composer: "Karel Goeyvaerts",
        date: "2009"
    },
    {
        title: "Arabella",
        composer: "Richard Strauss",
        date: "1933",
        Librettist: "Hugo von Hofmannsthal",
        Language: "German",
        Premiere: "1 July 1933"
    },
    {
        title: "Ariadne auf Naxos",
        composer: "R. Strauss",
        date: "1912",
        Librettist: "Hugo von Hofmannsthal",
        Language: "German",
        Premiere: "25 October 1912"
    },
    {
        title: "Ariodante",
        composer: "Handel",
        date: "1734"
    },
    {
        title: "Arizona Lady",
        composer: "Emmerich K\xe1lm\xe1n",
        date: "1954"
    },
    {
        title: "L'arlesiana",
        composer: "Cilea",
        date: "Cilea",
        Librettist: "Leopoldo Marenco",
        Language: "Italian",
        "Based on": "Alphonse Daudet",
        Premiere: "27 November 1897"
    },
    {
        title: "Armida",
        composer: "Dvo\u0159\xe1k",
        date: "1904",
        Librettist: "Jaroslav Vrchlick\xfd",
        Language: "Czech",
        "Based on": "Torquato Tasso",
        Premiere: "25 March 1904"
    },
    {
        title: "Armida",
        composer: "Rossini",
        date: "1817",
        Librettist: "Giovanni Schmidt",
        Language: "Italian",
        "Based on": "Gerusalemme liberata",
        Premiere: "11 November 1817"
    },
    {
        title: "Armide",
        composer: "Gluck",
        date: "1777"
    },
    {
        title: "Armide",
        composer: "Lully",
        date: "1686"
    },
    {
        title: "Aroldo",
        composer: "Verdi",
        date: "1857",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "16 August 1857"
    },
    {
        title: "Artamene",
        composer: "Tomaso Albinoni",
        date: "1741"
    },
    {
        title: "Les arts florissants",
        composer: "Charpentier",
        date: "1685",
        Language: "French",
        Premiere: "1685"
    },
    {
        title: "Ascanio in Alba",
        composer: "Mozart",
        date: "1771",
        Librettist: "Giuseppe Parini",
        Language: "Italian",
        Premiere: "17 October 1771"
    },
    {
        title: "Atmen gibt das Leben",
        composer: "Stockhausen",
        date: "1977",
        "English": "Breathing Gives Life",
        "Catalogue": "39",
        "Composed": " (",
        "Duration": "50 minutes",
        "Scoring": "choir a cappella with solo parts, in Part II also orchestra (playback)"
    },
    {
        title: "Attila",
        composer: "Verdi",
        date: "1846",
        Librettist: "Temistocle Solera",
        Language: "Italian",
        "Based on": "Zacharias Werner",
        Premiere: "17 March 1846"
    },
    {
        title: "Atys",
        composer: "Lully",
        date: "1676"
    },
    {
        title: "Aufstieg und Fall der Stadt Mahagonny",
        composer: "Weill",
        date: "1930",
        Translation: "Rise and Fall of the City of Mahagonny",
        Librettist: "Bertolt Brecht",
        Language: "German",
        Premiere: "9 March 1930"
    },
    {
        title: "Babes in Toyland",
        composer: "Herbert",
        date: "1903"
    },
    {
        title: "Babylon",
        composer: "Widmann",
        date: "2012",
        Librettist: "Peter Sloterdijk",
        Language: "German",
        Premiere: "27 October 2012"
    },
    {
        title: "Die Bajadere",
        composer: "K\xe1lm\xe1n",
        date: "1921"
    },
    {
        title: "Un ballo in maschera",
        composer: "Verdi",
        date: "1859",
        Translation: "A Masked Ball",
        Librettist: "Antonio Somma",
        Language: "Italian",
        "Based on": "Eug\xe8ne Scribe",
        Premiere: "17 February 1859"
    },
    {
        title: "Bandanna",
        composer: "Hagen",
        date: "1998",
        Librettist: "Paul Muldoon",
        Language: "English",
        Premiere: "February 25, 1999"
    },
    {
        title: "Bang!",
        composer: "Rutter",
        date: "1975"
    },
    {
        title: "Der Barbier von Bagdad",
        composer: "Cornelius",
        date: "1858",
        Translation: "The Barber of Baghdad",
        Librettist: "Cornelius",
        Language: "German",
        "Based on": "One Thousand and One Nights",
        Premiere: "15 December 1858"
    },
    {
        title: "Il barbiere di SivigliaThe Barber of Seville",
        composer: "Rossini",
        date: "1816",
        "Native title": "Il barbiere di Siviglia, ossia L'inutile precauzione",
        Librettist: "Cesare Sterbini",
        Language: "Italian",
        "Based on": "Pierre Beaumarchais",
        Premiere: "20 February 1816"
    },
    {
        title: "The Bartered Bride",
        composer: "Smetana",
        date: "1866",
        "Native title": "Prodan\xe1 nev\u011Bsta",
        Librettist: "Karel Sabina",
        Language: "Czech",
        Premiere: "30 May 1866"
    },
    {
        title: "Beatrix Cenci",
        composer: "Ginastera",
        date: "1971",
        Librettist: "\n",
        Language: "Spanish",
        "Based on": "Beatrice Cenci",
        Premiere: "10 September 1971"
    },
    {
        title: "B\xe9atrice et B\xe9n\xe9dict",
        composer: "Berlioz",
        date: "1862",
        Librettist: "Hector Berlioz",
        Language: "French",
        "Based on": "Much Ado About Nothing",
        Premiere: "9 August 1862"
    },
    {
        title: "The Beggar's Opera",
        composer: "Gay",
        date: "1728",
        Librettist: "John Gay",
        Premiere: "29 January 1728"
    },
    {
        title: "Belisario",
        composer: "Donizetti",
        date: "1836",
        Librettist: "Salvadore Cammarano",
        Language: "Italian",
        "Based on": "Belisarius",
        Premiere: "18 March 1836"
    },
    {
        title: "La belle au bois dormant",
        composer: "Carafa",
        date: "1825"
    },
    {
        title: "La belle au bois dormant",
        composer: "Lecocq",
        date: "1900"
    },
    {
        title: "La belle H\xe9l\xe8ne",
        composer: "Offenbach",
        date: "1864"
    },
    {
        title: "Il Bellerofonte",
        composer: "Myslive\u010Dek",
        date: "1767"
    },
    {
        title: "Benvenuto Cellini",
        composer: "Berlioz",
        date: "1838",
        Librettist: "\n",
        Language: "French",
        "Based on": "Benvenuto Cellini",
        Premiere: "10 September 1838"
    },
    {
        title: "Bertha",
        composer: "Rorem",
        date: "1973"
    },
    {
        title: "Betrothal in a Monastery",
        composer: "Prokofiev",
        date: "1946",
        "Native title": "\u041E\u0431\u0440\u0443\u0447\u0435\u043D\u0438\u0435 \u0432 \u043C\u043E\u043D\u0430\u0441\u0442\u044B\u0440\u0435",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "Richard Brinsley Sheridan",
        Premiere: "3 November 1946"
    },
    {
        title: "Billy Budd",
        composer: "Britten",
        date: "1951",
        Librettist: "\n",
        Language: "English",
        "Based on": "Billy Budd",
        Premiere: "1 December 1951"
    },
    {
        title: "Bitter Sweet",
        composer: "Coward",
        date: "1929"
    },
    {
        title: "Blue Monday",
        composer: "Gershwin",
        date: "1929",
        "Music": "George Gershwin",
        "Lyrics": "Buddy DeSylva",
        "Book": "Buddy DeSylva",
        "Productions": "Broadway"
    },
    {
        title: "Bluebeard's Castle",
        composer: "Bart\xf3k",
        date: "1918",
        "Native title": "Hungarian: A k\xe9kszak\xe1ll\xfa herceg v\xe1ra",
        Librettist: "B\xe9la Bal\xe1zs",
        Language: "Hungarian",
        "Based on": "La Barbe bleue",
        Premiere: "24 May 1918"
    },
    {
        title: "La boh\xe8me",
        composer: "Puccini",
        date: "1896",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "Henri Murger",
        Premiere: "1 February 1896"
    },
    {
        title: "La boh\xe8me",
        composer: "Leoncavallo",
        date: "1897",
        Librettist: "Leoncavallo",
        Language: "Italian",
        "Based on": "La Vie de Boh\xe8me",
        Premiere: "6 May 1897 (1897-05-06)La Fenice, Venice"
    },
    {
        title: "Bomarzo",
        composer: "Ginastera",
        date: "1967",
        Librettist: "Manuel Mujica La\xednez",
        Language: "Spanish",
        "Based on": "Novel",
        Premiere: "19 May 1967"
    },
    {
        title: "Les Bor\xe9ades",
        composer: "Rameau",
        date: "1770"
    },
    {
        title: "Boris Godunov",
        composer: "Mussorgsky",
        date: "1874",
        "Native title": "Russian",
        Librettist: "Mussorgsky",
        Language: "Russian",
        "Based on": "Boris Godunov",
        Premiere: "27 January 1874"
    },
    {
        title: "The Brandenburgers in Bohemia",
        composer: "Smetana",
        date: "1866",
        "Native title": "Branibo\u0159i v \u010Cech\xe1ch",
        Librettist: "Karel Sabina",
        Language: "Czech",
        Premiere: "5 January 1866"
    },
    {
        title: "The Bravest Hussar",
        composer: "Jacobi",
        date: "1905"
    },
    {
        title: "Brundib\xe1r",
        composer: "Kr\xe1sa",
        date: "1943"
    },
    {
        title: "\xc7a Ira",
        composer: "Waters",
        date: "2005",
        "Released": "26 September 2005",
        "Recorded": "2 December 1988 \u2013 29 August 2005",
        "Genre": "Classicalopera",
        "Length": "108",
        "Label": "Sony Classical",
        "Producer": "Roger WatersRick Wentworth"
    },
    {
        title: "Candide",
        composer: "Bernstein",
        date: "1956",
        "Music": "Leonard Bernstein",
        "Lyrics": "\n",
        "Book": "\n",
        "Basis": "Candide",
        "Productions": "\n",
        "Awards": "\n"
    },
    {
        title: "La canterina",
        composer: "Haydn",
        date: "1766",
        Language: "Italian",
        Premiere: "1766"
    },
    {
        title: "Capriccio",
        composer: "Richard Strauss",
        date: "1942",
        Librettist: "\n",
        Language: "German",
        Premiere: "28 October 1942"
    },
    {
        title: "The Captain's Daughter",
        composer: "Cui",
        date: "1911"
    },
    {
        title: "Cardillac",
        composer: "Paul Hindemith",
        date: "1926",
        Librettist: "Ferdinand Lion",
        Language: "German",
        "Based on": "Das Fr\xe4ulein von Scuderi",
        Premiere: "9 November 1926"
    },
    {
        title: "Carmen",
        composer: "Bizet",
        date: "1875",
        Librettist: "\n",
        Language: "French",
        "Based on": "Carmen",
        Premiere: "3 March 1875"
    },
    {
        title: "Casanova's Homecoming",
        composer: "Argento",
        date: "1985"
    },
    {
        title: "Cavalleria rusticana",
        composer: "Mascagni",
        date: "1890",
        Librettist: "Giovanni Targioni-Tozzetti",
        Language: "Italian",
        "Based on": "Cavalleria rusticana",
        Premiere: "17 May 1890"
    },
    {
        title: "The Cave",
        composer: "Reich",
        date: "1994",
        Language: "English",
        "Based on": "The Cave of the Patriarchs",
        Premiere: "October 22, 1993"
    },
    {
        title: "Cendrillon",
        composer: "Massenet",
        date: "1899",
        Librettist: "Henri Ca\xefn",
        Language: "French",
        "Based on": "Perrault",
        Premiere: "24 May 1899"
    },
    {
        title: "La Cenerentola",
        composer: "Rossini",
        date: "1817",
        "Other title": "La Cenerentola, ossia La bont\xe0 in trionfo",
        Librettist: "Jacopo Ferretti",
        Language: "Italian",
        "Based on": "Cendrillon",
        Premiere: "25 January 1817"
    },
    {
        title: "La Cenicienta",
        composer: "Hen",
        date: "1966"
    },
    {
        title: "Champion",
        composer: "Terence Blanchard",
        date: "2013",
        Librettist: "Michael Cristofer",
        Language: "English",
        Premiere: "15 June 2013"
    },
    {
        title: "Charles VI",
        composer: "Hal\xe9vy",
        date: "1843"
    },
    {
        title: "Charlotte Corday",
        composer: "Lorenzo Ferrero",
        date: "1989",
        Librettist: "Giuseppe Di Leva",
        Language: "Italian",
        Premiere: "21 February 1989"
    },
    {
        title: "Chopin",
        composer: "Giacomo Orefice",
        date: "1901"
    },
    {
        title: "Le Cid",
        composer: "Massenet",
        date: "1885",
        Librettist: "\n",
        Language: "French",
        "Based on": "Le Cid",
        Premiere: "30 November 1885"
    },
    {
        title: "La clemenza di Tito",
        composer: "Mozart",
        date: "1791",
        Translation: "The Clemency of Titus",
        Librettist: "Caterino Mazzol\xe0",
        Language: "Italian",
        "Based on": "Pietro Metastasio",
        Premiere: "6 September 1791"
    },
    {
        title: "Cold Mountain",
        composer: "Jennifer Higdon",
        date: "2015"
    },
    {
        title: "Comedy on the Bridge",
        composer: "Martin\u016F",
        date: "1937"
    },
    {
        title: "Le comte Ory",
        composer: "Rossini",
        date: "1828",
        Librettist: "\n",
        Language: "French",
        Premiere: "20 August 1828"
    },
    {
        title: "La Conquista",
        composer: "Ferrero",
        date: "2005",
        Librettist: "\n",
        Language: "English, Spanish, Nahuatl",
        "Based on": "Alessandro Baricco",
        Premiere: "12 March 2005"
    },
    {
        title: "Les contes d'Hoffmann",
        composer: "Offenbach",
        date: "1881"
    },
    {
        title: "Der Corregidor",
        composer: "Wolf",
        date: "1896",
        Librettist: "Rosa Mayreder",
        Language: "German",
        "Based on": "El sombrero de tres picos",
        Premiere: "7 June 1896"
    },
    {
        title: "Cos\xec fan tutte ossia La scuola degli amanti",
        composer: "Mozart",
        date: "1790",
        Translation: "Thus Do They All, or The School for Lovers",
        Librettist: "Lorenzo Da Ponte",
        Language: "Italian",
        Premiere: "26 January 1790"
    },
    {
        title: "The Countess",
        composer: "Moniuszko",
        date: "1860",
        "Native title": "Hrabina",
        Librettist: "W\u0142odzimierz Wolski",
        Language: "Polish",
        Premiere: "7 February 1860"
    },
    {
        title: "Covid fan tutte",
        composer: "Mozart",
        date: "2020"
    },
    {
        title: "The Crucible",
        composer: "Ward",
        date: "1961",
        Librettist: "Bernard Stambler",
        Language: "English",
        "Based on": "The Crucible",
        Premiere: "October 26, 1961"
    },
    {
        title: "Die Cs\xe1rd\xe1sf\xfcrstin",
        composer: "K\xe1lm\xe1n",
        date: "1915"
    },
    {
        title: "The Cunning Little Vixen",
        composer: "Jan\xe1\u010Dek",
        date: "1924",
        "Native title": "Czech: ",
        Librettist: "Leo\u0161 Jan\xe1\u010Dek",
        Language: "Czech",
        "Based on": "Rudolf T\u011Bsnohl\xeddek",
        Premiere: "6 November 1924"
    },
    {
        title: "La Curandera",
        composer: "Robert Xavier Rodriguez",
        date: "2006"
    },
    {
        title: "Curlew River",
        composer: "Britten",
        date: "1964",
        "Description": "A Parable for Church Performance",
        Librettist: "William Plomer",
        "Based on": "Sumidagawa",
        Premiere: "13 June 1964"
    },
    {
        title: "Cyrano de Bergerac",
        composer: "Alfano",
        date: "1936",
        Librettist: "Henri Ca\xefn",
        Language: "French",
        "Based on": "Edmond Rostand",
        Premiere: "22 January 1936"
    },
    {
        title: "Dafne",
        composer: "Peri",
        date: "1597",
        Librettist: "Ottavio Rinuccini",
        Language: "Italian",
        "Based on": "Daphne",
        Premiere: "1598"
    },
    {
        title: "Dalibor",
        composer: "Smetana",
        date: "1868",
        Librettist: "Josef Wenzig",
        Language: "Czech",
        Premiere: "16 May 1868"
    },
    {
        title: "La damnation de Faust",
        composer: "Berlioz",
        date: "1893",
        "English": "The Damnation of Faust",
        "Opus": "24",
        Language: "French",
        "Based on": "Goethe's ",
        "Composed": " (",
        "Performed": " (",
        "Scoring": "four soloistschildren's chorusseven-part choirorchestra"
    },
    {
        title: "The Dangerous Liaisons",
        composer: "Susa",
        date: "1994"
    },
    {
        title: "Dantons Tod",
        composer: "Einem",
        date: "1947",
        Translation: "Dantons Death",
        Librettist: "\n",
        Language: "German",
        "Based on": "Danton's Death",
        Premiere: "6 August 1947"
    },
    {
        title: "Daphne",
        composer: "Strauss",
        date: "1938",
        Librettist: "Joseph Gregor",
        Language: "German",
        Premiere: "2 October 1938"
    },
    {
        title: "Dardanus",
        composer: "Rameau",
        date: "1739",
        Librettist: "Charles-Antoine Leclerc de La Bru\xe8re",
        Language: "French",
        "Based on": "Greek myth of Dardanus",
        Premiere: "19 November 1739"
    },
    {
        title: "Dardanus",
        composer: "Sacchini",
        date: "1784",
        Librettist: "Nicolas-Fran\xe7ois Guillard",
        Language: "French",
        "Based on": "Charles-Antoine Leclerc de La Bru\xe8re",
        Premiere: "18 September 1784"
    },
    {
        title: "Dead Man Walking",
        composer: "Heggie",
        date: "2000",
        Librettist: "Terrence McNally",
        "Based on": "Dead Man Walking",
        Premiere: "October 7, 2000"
    },
    {
        title: "Death in Venice",
        composer: "Britten",
        date: "1973",
        Librettist: "Myfanwy Piper",
        Language: "English",
        "Based on": "Tod in Venedig",
        Premiere: "16 June 1973"
    },
    {
        title: "The Death of Klinghoffer",
        composer: "Adams",
        date: "1991",
        Librettist: "Alice Goodman",
        Language: "English",
        Premiere: "19 March 1991"
    },
    {
        title: "The Desert Song",
        composer: "Romberg",
        date: "1926",
        "Music": "Sigmund Romberg",
        "Lyrics": "Otto Harbach",
        "Book": "Oscar Hammerstein II",
        "Productions": "Broadway"
    },
    {
        title: "Destiny",
        composer: "Leo\u0161 Jan\xe1\u010Dek",
        date: "1934",
        "Native title": "Osud",
        Librettist: "\n",
        Language: "Czech",
        Premiere: "1958"
    },
    {
        title: "The Devil and Kate",
        composer: "Dvo\u0159\xe1k",
        date: "1899",
        Librettist: "Adolf Wenig",
        Language: "Czech",
        "Based on": "Josef Kajet\xe1n Tyl",
        Premiere: "18 November 1899"
    },
    {
        title: "The Devil Take Her",
        composer: "Benjamin",
        date: "1931"
    },
    {
        title: "Dialogues des Carm\xe9lites",
        composer: "Poulenc",
        date: "1957",
        Translation: "Dialogues of the Carmelites",
        Librettist: "Poulenc",
        Language: "French",
        "Based on": "Dialogues des Carm\xe9lites",
        Premiere: "26 January 1957"
    },
    {
        title: "Dido and Aeneas",
        composer: "Purcell",
        date: "1689",
        Librettist: "Nahum Tate",
        "Based on": "Aeneid",
        Premiere: "1689"
    },
    {
        title: "Dienstag aus Licht",
        composer: "Stockhausen",
        date: "1993",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "May 28, 1993"
    },
    {
        title: "Djamileh",
        composer: "Bizet",
        date: "1872",
        Librettist: "Louis Gallet",
        Language: "French",
        "Based on": "Namouna",
        Premiere: "22 May 1872"
    },
    {
        title: "Doctor Atomic",
        composer: "John Adams",
        date: "2005",
        Librettist: "Peter Sellars",
        Language: "English",
        Premiere: "1 October 2005"
    },
    {
        title: "Dolores Claiborne",
        composer: "Picker",
        date: "2013",
        Librettist: "J. D. McClatchy",
        Language: "English",
        "Based on": "Dolores Claiborne",
        Premiere: "September 18, 2013"
    },
    {
        title: "Don Carlos",
        composer: "Verdi",
        date: "1867",
        Librettist: "\n",
        Language: "French, also in Italian translation",
        "Based on": "Don Carlos",
        Premiere: "11 March 1867"
    },
    {
        title: "Don Giovanni",
        composer: "Mozart",
        date: "1787",
        "Other title": "Il dissoluto punito, ossia il Don Giovanni",
        Librettist: "Lorenzo Da Ponte",
        Language: "Italian",
        "Based on": "Don Juan",
        Premiere: "29 October 1787"
    },
    {
        title: "Don Pasquale",
        composer: "Donizetti",
        date: "1843",
        Librettist: "\n",
        Language: "Italian",
        Premiere: "3 January 1843"
    },
    {
        title: "Don Rodrigo",
        composer: "Ginastera",
        date: "1964",
        Librettist: "Alejandro Casona",
        Language: "Spanish",
        Premiere: "24 July 1964"
    },
    {
        title: "Don Sanche",
        composer: "Liszt",
        date: "1825",
        Librettist: "\n",
        Language: "French",
        "Based on": "Jean-Pierre Claris de Florian",
        Premiere: "17 October 1825"
    },
    {
        title: "La donna del lago",
        composer: "Rossini",
        date: "1819",
        Translation: "The Lady of the Lake",
        Librettist: "Andrea Leone Tottola",
        Language: "Italian",
        "Based on": "The Lady of the Lake",
        Premiere: "24 September 1819"
    },
    {
        title: "Le donne curiose",
        composer: "Wolf-Ferrari",
        date: "1903",
        Translation: "The Inquisitive Women",
        Librettist: "Luigi Sugana",
        Language: "Italian",
        "Based on": "Le donne curiose",
        Premiere: "27 November 1903"
    },
    {
        title: "Donnerstag aus Licht",
        composer: "Stockhausen",
        date: "1981",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "March 15, 1981"
    },
    {
        title: "Dr. Sun Yat-sen",
        composer: "Huang Ruo",
        date: "2014"
    },
    {
        title: "I due Foscari",
        composer: "Verdi",
        date: "1844",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "Lord Byron",
        Premiere: "3 November 1844"
    },
    {
        title: "Edgar",
        composer: "Puccini",
        date: "1899",
        Librettist: "Ferdinando Fontana",
        Language: "Italian",
        "Based on": "Alfred de Musset",
        Premiere: "21 April 1889"
    },
    {
        title: "The Eighth Wonder",
        composer: "John",
        date: "1995",
        Librettist: "Dennis Watkins",
        Language: "English",
        "Based on": "Building of the Sydney Opera House",
        Premiere: "14 October 1995"
    },
    {
        title: "Einstein on the Beach",
        composer: "Glass",
        date: "1976",
        Librettist: "\n",
        Premiere: "July 25, 1976"
    },
    {
        title: "Elektra",
        composer: "R. Strauss",
        date: "1909",
        Librettist: "Hugo von Hofmannsthal",
        Language: "German",
        "Based on": "Sophocles",
        Premiere: "25 January 1909"
    },
    {
        title: "L'elisir d'amore",
        composer: "Donizetti",
        date: "1832",
        Librettist: "Felice Romani",
        Language: "Italian",
        "Based on": "Eug\xe8ne Scribe",
        Premiere: "12 May 1832"
    },
    {
        title: "Emmeline",
        composer: "Picker",
        date: "1996",
        Librettist: "J. D. McClatchy",
        Language: "English",
        "Based on": "Judith Rossner",
        Premiere: "1996"
    },
    {
        title: "L'enfant et les sortil\xe8ges",
        composer: "Ravel",
        date: "1925",
        Librettist: "Colette",
        Language: "French",
        Premiere: "21 March 1925"
    },
    {
        title: "The English Cat Die englische Katze",
        composer: "Henze",
        date: "1983",
        Librettist: "Edward Bond",
        "Based on": "Les peines de coeur d'une chatte anglaise",
        Premiere: "2 June 1983"
    },
    {
        title: "Die Entf\xfchrung aus dem Serail",
        composer: "Mozart",
        date: "1782",
        Librettist: "Gottlieb Stephanie",
        Language: "German",
        "Based on": "Christoph Friedrich Bretzner",
        Premiere: "16 July 1782"
    },
    {
        title: "Ernani",
        composer: "Verdi",
        date: "1844",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "Hernani",
        Premiere: "9 March 1844"
    },
    {
        title: "Ero the Joker",
        composer: "Gotovac",
        date: "1935",
        "Native title": "Ero s onoga svijeta",
        Librettist: "Milan Begovi\u0107",
        Language: "Croatian",
        "Based on": "folktale",
        Premiere: "2 November 1935"
    },
    {
        title: "Esclarmonde",
        composer: "Massenet",
        date: "1888",
        Librettist: "\n",
        Language: "French",
        "Based on": "Parth\xe9nop\xe9us de Blois",
        Premiere: "15 May 1889"
    },
    {
        title: "L'\xe9toile",
        composer: "Chabrier",
        date: "1877",
        Librettist: "\n",
        Language: "French",
        Premiere: "28 November 1877"
    },
    {
        title: "Eugene Onegin",
        composer: "Tchaikovsky",
        date: "1879",
        "Description": "lyrical scenes",
        "Native title": "Russian",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "Eugene Onegin",
        Premiere: "29 March 1879"
    },
    {
        title: "Euridice",
        composer: "Peri",
        date: "1600",
        Librettist: "Ottavio Rinuccini",
        Language: "Italian",
        "Based on": "Ovid",
        Premiere: "6 October 1600"
    },
    {
        title: "Euryanthe",
        composer: "Weber",
        date: "1823",
        Librettist: "Helmina von Ch\xe9zy",
        Language: "German",
        "Based on": "13th-century French romance",
        Premiere: "25 October 1823"
    },
    {
        title: "Evangeline",
        composer: "Luening",
        date: "1986"
    },
    {
        title: "Everest",
        composer: "Talbot",
        date: "2015",
        Librettist: "Gene Scheer",
        Language: "English",
        Premiere: "January 30, 2015"
    },
    {
        title: "The Excursions of Mr. Brou\u010Dek",
        composer: "Jan\xe1\u010Dek",
        date: "1920",
        "Native title": "V\xfdlety p\xe1n\u011B Brou\u010Dkovy",
        "Other title": "The Excursions of Mr. Brou\u010Dek to the Moon and to the 15th Century",
        Language: "Czech",
        "Based on": "Svatopluk \u010Cech",
        Premiere: "23 April 1920"
    },
    {
        title: "Facing Goya",
        composer: "Nyman",
        date: "2000"
    },
    {
        title: "The Fair at Sorochyntsi",
        composer: "Mussorgsky",
        date: "1913",
        "Native title": "Russian",
        Librettist: "Mussorgsky",
        Language: "Russian",
        "Based on": "The Fair at Sorochyntsi",
        Premiere: "13 October 1917"
    },
    {
        title: "Falstaff",
        composer: "Verdi",
        date: "1893",
        Librettist: "Arrigo Boito",
        Language: "Italian",
        "Based on": "The Merry Wives of Windsor",
        Premiere: "9 February 1893"
    },
    {
        title: "La fanciulla del West",
        composer: "Puccini",
        date: "1910",
        Translation: "The Girl of the West",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "David Belasco",
        Premiere: "10 December 1910"
    },
    {
        title: "Fantastic Mr. Fox",
        composer: "Picker",
        date: "1998",
        Librettist: "Donald Sturrock",
        Language: "English",
        "Based on": "children's novel",
        Premiere: "December 9, 1998"
    },
    {
        title: "Die Faschingsfee",
        composer: "K\xe1lm\xe1n",
        date: "1917"
    },
    {
        title: "Faust",
        composer: "Gounod",
        date: "1859",
        Librettist: "\n",
        Language: "French",
        "Based on": "Faust et Marguerite",
        Premiere: "19 March 1859"
    },
    {
        title: "La favorite",
        composer: "Donizetti",
        date: "1840",
        Librettist: "\n",
        Language: "French",
        "Based on": "Le comte de Comminges",
        Premiere: "2 December 1840"
    },
    {
        title: "A Feast in Time of Plague",
        composer: "Cui",
        date: "1901"
    },
    {
        title: "A Feast in the Time of Plague",
        composer: "2020",
        date: "2020"
    },
    {
        title: "Fedora",
        composer: "Giordano",
        date: "1898",
        Librettist: "Arturo Colautti",
        Language: "Italian",
        "Based on": "F\xe9dora",
        Premiere: "17 November 1898"
    },
    {
        title: "Die Feen",
        composer: "Wagner",
        date: "1833",
        Translation: "The Fairies",
        Librettist: "Richard Wagner (1833)",
        Language: "German",
        "Based on": "Carlo Gozzi",
        Premiere: "29 June 1888"
    },
    {
        title: "Feuersnot",
        composer: "Richard Strauss",
        date: "1901",
        Librettist: "Ernst von Wolzogen",
        Language: "German",
        "Based on": 'J. Ketel\'s "Das erloschene Feuer zu Audenaerde"',
        Premiere: "21 November 1901"
    },
    {
        title: "Fidelio",
        composer: "Beethoven",
        date: "1805",
        Librettist: "Joseph Sonnleithner",
        Language: "German",
        Premiere: "Original premiere 20 November 1805"
    },
    {
        title: "The Fiery Angel",
        composer: "Prokofiev",
        date: "1955",
        "Native title": "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0430\u043D\u0433\u0435\u043B",
        Librettist: "Prokofiev",
        Language: "Russian",
        "Based on": "The Fiery Angel",
        Premiere: "25 November 1955"
    },
    {
        title: "La figlia del mago",
        composer: "Ferrero",
        date: "1981",
        Librettist: "Marco Ravasini",
        Language: "imaginary language",
        Premiere: "31 July 1981"
    },
    {
        title: "La fille du r\xe9giment",
        composer: "Donizetti",
        date: "1840",
        Librettist: "\n",
        Language: "French",
        Premiere: "11 February 1840"
    },
    {
        title: "The Finnish Prisoner",
        composer: "Orlando Gough",
        date: "2007",
        Librettist: "Stephen Plaice",
        Language: "English",
        Premiere: "11 July 2007"
    },
    {
        title: "Fire Shut Up in My Bones",
        composer: "Terence Blanchard",
        date: "2019",
        Librettist: "Kasi Lemmons",
        Language: "English",
        "Based on": "Charles M. Blow",
        Premiere: "June 15, 2019"
    },
    {
        title: "Die Fledermaus",
        composer: "J. Strauss",
        date: "1874"
    },
    {
        title: "Le Flibustier",
        composer: "Cui",
        date: "1894"
    },
    {
        title: "Der fliegende Holl\xe4nderThe Flying Dutchman",
        composer: "Wagner",
        date: "1843",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Der fliegende Holl\xe4nder",
        Premiere: "2 January 1843"
    },
    {
        title: "Florencia en el Amazonas",
        composer: "Cat\xe1n",
        date: "1996",
        Librettist: "Marcela Fuentes-Berain",
        Language: "Spanish",
        "Based on": "Love in the Time of Cholera",
        Premiere: "25 October 1996"
    },
    {
        title: "La forza del destino",
        composer: "Verdi",
        date: "1862",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "\xc1ngel de Saavedra",
        Premiere: "10 November 1862"
    },
    {
        title: "Four Saints in Three Acts",
        composer: "Thomson",
        date: "1934"
    },
    {
        title: "Francesca da Rimini",
        composer: "Zandonai",
        date: "1914",
        Librettist: "Tito Ricordi",
        Language: "Italian",
        "Based on": "Francesca da Rimini",
        Premiere: "19 February 1914"
    },
    {
        title: "Francesca da Rimini",
        composer: "Rachmaninoff",
        date: "1906",
        "Native title": "Russian",
        Librettist: "Modest Ilyich Tchaikovsky",
        Language: "Russian",
        "Based on": "Francesca da Rimini",
        Premiere: "24 January 1906"
    },
    {
        title: "Der Freisch\xfctz",
        composer: "Weber",
        date: "1821",
        Translation: "The Marksman",
        Librettist: "Friedrich Kind",
        Language: "German",
        Premiere: "18 June 1821"
    },
    {
        title: "Freitag aus Licht",
        composer: "Stockhausen",
        date: "1996",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "12 September 1996"
    },
    {
        title: "From the House of the Dead",
        composer: "Jan\xe1\u010Dek",
        date: "1930",
        "Native title": "Z mrtv\xe9ho domu",
        Librettist: "Leo\u0161 Jan\xe1\u010Dek",
        Language: "Czech",
        "Based on": "The House of the Dead",
        Premiere: "12 April 1930"
    },
    {
        title: "Galileo Galilei",
        composer: "Glass",
        date: "2002",
        Librettist: "Mary Zimmerman",
        "Based on": "Galileo Galilei",
        Premiere: "2002"
    },
    {
        title: "The Gambler",
        composer: "Prokofiev",
        date: "1929",
        "Native title": "\u0418\u0433\u0440\u043E\u043A",
        Librettist: "Prokofiev",
        Language: "Russian",
        "Based on": "The Gambler",
        Premiere: "1929"
    },
    {
        title: "La gazza ladra",
        composer: "Rossini",
        date: "1817",
        Translation: "The Thieving Magpie",
        Librettist: "Giovanni Gherardini",
        Language: "Italian",
        "Based on": "La pie voleuse",
        Premiere: "31 May 1817"
    },
    {
        title: "Genevi\xe8ve de Brabant",
        composer: "Offenbach",
        date: "1859",
        Librettist: "\n",
        Language: "French",
        "Based on": "Genevieve of Brabant",
        Premiere: "19 November 1859"
    },
    {
        title: "Genoveva",
        composer: "Schumann",
        date: "1850",
        Librettist: "\n",
        Language: "German",
        "Based on": "Genevieve of Brabant",
        Premiere: "25 June 1850"
    },
    {
        title: "Das Gesicht im Spiegel",
        composer: "Widmann",
        date: "2003",
        Translation: "The Face in the Mirror",
        Librettist: "Roland Schimmelpfennig",
        Language: "German",
        Premiere: "17 July 2003"
    },
    {
        title: "The Ghosts of Versailles",
        composer: "Corigliano",
        date: "1991",
        Librettist: "William M. Hoffman",
        Language: "English",
        "Based on": "La M\xe8re coupable",
        Premiere: "19 December 1991"
    },
    {
        title: "Gianni Schicchi",
        composer: "Puccini",
        date: "1918",
        "Description": "part of ",
        Librettist: "Giovacchino Forzano",
        Language: "Italian",
        "Based on": "Dante",
        Premiere: "14 December 1918"
    },
    {
        title: "Gilgamesh",
        composer: "Brucci",
        date: "1986"
    },
    {
        title: "La Gioconda",
        composer: "Ponchielli",
        date: "1876",
        Librettist: "Arrigo Boito",
        Language: "Italian",
        "Based on": "Angelo, Tyrant of Padua",
        Premiere: "8 April 1876"
    },
    {
        title: "Un giorno di regno",
        composer: "Verdi",
        date: "1840",
        "Other title": "Il finto Stanislao",
        Librettist: "Felice Romani",
        Language: "Italian",
        "Based on": "Alexandre-Vincent Pineux Duval",
        Premiere: "5 September 1840"
    },
    {
        title: "Giovanna d'Arco",
        composer: "Verdi",
        date: "1845",
        Librettist: "Temistocle Solera",
        Language: "Italian",
        "Based on": "Schiller",
        Premiere: "15 February 1845"
    },
    {
        title: "Giulio Cesare",
        composer: "Handel",
        date: "1724"
    },
    {
        title: "Gloriana",
        composer: "Britten",
        date: "1953",
        Librettist: "William Plomer",
        Language: "English",
        "Based on": "Elizabeth and Essex: A Tragic History",
        Premiere: "8 June 1953"
    },
    {
        title: "The Golden Cockerel",
        composer: "Rimsky-Korsakov",
        date: "1907",
        "Native title": "Zolotoy petushok (",
        "Other title": "Le coq d'or",
        Librettist: "Vladimir Belsky",
        Language: "RussianFrench",
        "Based on": "Pushkin",
        Premiere: "7 October 1909"
    },
    {
        title: "G\xf6tterd\xe4mmerung",
        composer: "Wagner",
        date: "1876",
        Translation: "Twilight of the Gods",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "17 August 1876"
    },
    {
        title: "Goyescas",
        composer: "Granados",
        date: "1916"
    },
    {
        title: "Le Grand Macabre",
        composer: "Ligeti",
        date: "1978",
        Librettist: "\n",
        Language: "German",
        "Based on": "La balade du grand macabre",
        Premiere: "12 April 1978"
    },
    {
        title: "The Greater Good, or the Passion of Boule de Suif",
        composer: "Hartke",
        date: "2006"
    },
    {
        title: "The Great Friendship",
        composer: "Muradeli",
        date: "1947"
    },
    {
        title: "The Greek Passion",
        composer: "Martin\u016F",
        date: "1961",
        Librettist: "Martin\u016F",
        Language: "English",
        "Based on": "The Greek Passion",
        Premiere: "19 June 1961"
    },
    {
        title: "Il Guarany",
        composer: "Carlos Gomes",
        date: "Carlos Gomes",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "O Guarani",
        Premiere: "19 March 1870"
    },
    {
        title: "Guillaume TellWilliam Tell",
        composer: "Rossini",
        date: "1829",
        Librettist: "\n",
        Language: "French",
        "Based on": "Wilhelm Tell",
        Premiere: "3 August 1829"
    },
    {
        title: "Hagith",
        composer: "Karol Szymanowski",
        date: "1922",
        Librettist: "Felix D\xf6rmann",
        Language: "German",
        Premiere: "13 May 1922"
    },
    {
        title: "Halka",
        composer: "Moniuszko",
        date: "1854",
        Librettist: "W\u0142odzimierz Wolski",
        Language: "Polish",
        Premiere: "28 February 1854"
    },
    {
        title: "The Handmaid's Tale",
        composer: "Poul Ruders",
        date: "2000"
    },
    {
        title: "H\xe4nsel und Gretel",
        composer: "Humperdinck",
        date: "1893",
        Librettist: "Adelheid Wette",
        Language: "German",
        Premiere: "23 December 1893"
    },
    {
        title: "H\xe1ry J\xe1nos",
        composer: "Kod\xe1ly",
        date: "1926",
        Librettist: "\n",
        Language: "Hungarian",
        "Based on": "The Veteran",
        Premiere: "1926"
    },
    {
        title: "The Haughty Princess",
        composer: "Jacobi",
        date: "1904"
    },
    {
        title: "The Haunted Manor",
        composer: "Moniuszko",
        date: "1865",
        "Native title": "Straszny dw\xf3r",
        Librettist: "Jan Ch\u0119ci\u0144ski",
        Language: "Polish",
        Premiere: "28 September 1865"
    },
    {
        title: "Die heilige Ente",
        composer: "G\xe1l",
        date: "1923"
    },
    {
        title: "Die Herzogin von Chicago",
        composer: "K\xe1lm\xe1n",
        date: "1928"
    },
    {
        title: "L'heure espagnole",
        composer: "Ravel",
        date: "1911",
        Librettist: "Franc-Nohain",
        Language: "French",
        "Based on": "Franc-Nohain's play",
        Premiere: "19 May 1911"
    },
    {
        title: "Die Hochzeit",
        composer: "Wagner",
        date: "Wagner",
        Librettist: "Richard Wagner",
        Language: "German"
    },
    {
        title: "Hugh the Drover",
        composer: "Vaughan Williams",
        date: "1958",
        Librettist: "Harold Child",
        Language: "English",
        Premiere: "14 July 1924"
    },
    {
        title: "Les Huguenots",
        composer: "Meyerbeer",
        date: "1836",
        Librettist: "\n",
        Language: "French",
        Premiere: "29 February 1836"
    },
    {
        title: "The Ice Break",
        composer: "Tippett",
        date: "1977",
        Librettist: "Michael Tippett",
        Language: "English",
        Premiere: "7 July 1977"
    },
    {
        title: "Idomeneo",
        composer: "Mozart",
        date: "1781",
        Librettist: "Giambattista Varesco",
        Language: "Italian",
        "Based on": "Antoine Danchet",
        Premiere: "29 January 1781"
    },
    {
        title: "L'incoronazione di Poppea",
        composer: "Monteverdi",
        date: "1642"
    },
    {
        title: "Les Indes galantes",
        composer: "Rameau",
        date: "1735",
        Librettist: "Louis Fuzelier",
        Language: "French",
        Premiere: "23 August 1735"
    },
    {
        title: "Iolanta",
        composer: "Tchaikovsky",
        date: "1892",
        "Native title": "Russian: ",
        Librettist: "Modest Tchaikovsky",
        Language: "Russian",
        "Based on": "Kong Ren\xe9s Datter",
        Premiere: "18 December 1892"
    },
    {
        title: "Iphig\xe9nie en Tauride",
        composer: "Gluck",
        date: "1779"
    },
    {
        title: "Iris",
        composer: "Mascagni",
        date: "1899",
        Librettist: "Luigi Illica",
        Language: "Italian",
        Premiere: "22 November 1898"
    },
    {
        title: "L'\xeele de Tulipatan",
        composer: "Offenbach",
        date: "1868",
        Librettist: "\n",
        Language: "French",
        Premiere: "30 September 1868"
    },
    {
        title: "L'italiana in Algeri",
        composer: "Rossini",
        date: "1813",
        Translation: "The Italian Girl in Algiers",
        Librettist: "Angelo Anelli",
        Language: "Italian",
        Premiere: "22 May 1813"
    },
    {
        title: "Ivan the Fool",
        composer: "Cui",
        date: "Cui"
    },
    {
        title: "The Jacobin",
        composer: "Dvo\u0159\xe1k",
        date: "1889",
        Librettist: "Marie \u010Cervinkov\xe1-Riegrov\xe1",
        Language: "Czech",
        Premiere: "12 February 1889"
    },
    {
        title: "Jen\u016Ffa",
        composer: "Jan\xe1\u010Dek",
        date: "1904",
        "Native title": "Jej\xed pastorky\u0148a ",
        Librettist: "Jan\xe1\u010Dek",
        Language: "Czech",
        "Based on": "Jej\xed pastorky\u0148a",
        Premiere: "21 January 1904"
    },
    {
        title: "J\xe9rusalem",
        composer: "Giuseppe Verdi",
        date: "1847",
        Librettist: "\n",
        Language: "French",
        "Based on": "I Lombardi alla prima crociata",
        Premiere: "26 November 1847"
    },
    {
        title: "I gioielli della Madonna",
        composer: "Wolf-Ferrari",
        date: "1911",
        Translation: "The Jewels of the Madonna",
        Librettist: "\n",
        Language: "Italian",
        Premiere: "23 December 1911"
    },
    {
        title: "Judith",
        composer: "Serov",
        date: "1863",
        "Native title": "Russian",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "Book of Judith",
        Premiere: "16 May 1863"
    },
    {
        title: "Juha",
        composer: "Aarre Merikanto",
        date: "Aarre Merikanto"
    },
    {
        title: "La Juive",
        composer: "Hal\xe9vy",
        date: "1835",
        Translation: "The Jewess",
        Librettist: "Eug\xe8ne Scribe",
        Language: "French",
        Premiere: "23 February 1835"
    },
    {
        title: "Julie",
        composer: "Boesmans",
        date: "2005",
        Librettist: "\n",
        Language: "German",
        "Based on": "August Strindberg",
        Premiere: "2005"
    },
    {
        title: "Der Kaiser von Atlantis",
        composer: "Ullmann",
        date: "1975",
        "Description": '"legend in four scenes"',
        Translation: "The Emperor of Atlantis",
        Librettist: "Peter Kien",
        Language: "German",
        Premiere: "16 December 1975"
    },
    {
        title: "Kaiserin Josephine",
        composer: "K\xe1lm\xe1n",
        date: "1936"
    },
    {
        title: "Die Kalewainen in Pochjola",
        composer: "K. M\xfcller-Berghaus",
        date: "2017",
        Translation: "The men of Kaleva in the Northland",
        "Other title": "Kalevalaiset Pohjolassa",
        Librettist: "Fritz W. O. Spengler",
        Language: "German",
        "Based on": "Kalevala",
        Premiere: "28 February 2017",
        "Website": "http://www.kalewainen.fi/"
    },
    {
        title: "K\xe1\u0165a Kabanov\xe1",
        composer: "Jan\xe1\u010Dek",
        date: "1921",
        Librettist: "Vincenc \u010Cervinka",
        Language: "Czech",
        "Based on": "The Storm",
        Premiere: "23 November 1921"
    },
    {
        title: "Khovanshchina",
        composer: "Modest Mussorgsky",
        date: "1886",
        "Native title": "\u0425\u043E\u0432\u0430\u043D\u0449\u0438\u043D\u0430",
        Language: "Russian",
        Premiere: "9 February 1886"
    },
    {
        title: "King RogerKr\xf3l Roger",
        composer: "Karol Szymanowski",
        date: "1926",
        Librettist: "Karol Szymanowski",
        Language: "Polish",
        Premiere: "19 June 1926"
    },
    {
        title: "King Priam",
        composer: "Michael Tippett",
        date: "Michael Tippett",
        Librettist: "Tippett",
        Language: "English",
        "Based on": "Iliad",
        Premiere: "29 May 1962"
    },
    {
        title: "Koanga",
        composer: "Frederick Delius",
        date: "Frederick Delius",
        Librettist: "Charles F. Keary",
        Language: "English",
        "Based on": "The Grandissimes: A Story of Creole Life",
        Premiere: "13 June 1904"
    },
    {
        title: "The Knot Garden",
        composer: "Michael Tippett",
        date: "1970",
        Librettist: "Tippett",
        Language: "English",
        Premiere: "2 December 1970"
    },
    {
        title: "Kr\xfat\u0148ava",
        composer: "Eugen Sucho\u0148",
        date: "1949"
    },
    {
        title: "Lady Macbeth of Mtsensk",
        composer: "Shostakovich",
        date: "1934",
        "Native title": "Russian: ",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "Lady Macbeth of the Mtsensk District",
        Premiere: "22 January 1934"
    },
    {
        title: "Lakm\xe9",
        composer: "Delibes",
        date: "1883",
        Librettist: "\n",
        Language: "French",
        "Based on": 'Th\xe9odore Pavie\'s story "Les babouches du Brahamane"',
        Premiere: "14 April 1883"
    },
    {
        title: "Das Land des L\xe4chelnsThe Land of Smiles",
        composer: "Leh\xe1r",
        date: "1929",
        Librettist: "\n",
        Language: "German",
        Premiere: "10 October 1929"
    },
    {
        title: "The Legend of the Invisible City of Kitezh and the Maiden Fevroniya",
        composer: "Rimsky-Korsakov",
        date: "1912",
        "Native title": "Russian",
        Librettist: "Vladimir Belsky",
        Language: "Russian",
        "Based on": "Russian legends",
        Premiere: "20. February 1907"
    },
    {
        title: '"Leo, the Royal Cadet"',
        composer: "Oscar Ferdinand Telgmann",
        date: "1889",
        "Music": "Oscar Ferdinand Telgmann",
        "Lyrics": "George Frederick Cameron",
        "Productions": "1,700 performances from 1889-1925. 1982, 1990, 2010"
    },
    {
        title: "The Letter",
        composer: "Paul Moravec",
        date: "2009"
    },
    {
        title: "La liberazione di Ruggiero dall'isola d'Alcina",
        composer: "Caccini",
        date: "1625",
        Librettist: "Ferdinando Saracinelli",
        Language: "Italian",
        "Based on": "Orlando Furioso",
        Premiere: "3 February 1625"
    },
    {
        title: "Das Liebesverbot",
        composer: "Wagner",
        date: "1836",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Shakespeare's",
        Premiere: "29 March 1836"
    },
    {
        title: "Life is a Dream",
        composer: "Lewis Spratlan",
        date: "2010"
    },
    {
        title: "The Little Prince",
        composer: "Portman",
        date: "2003",
        Librettist: "Nicholas Wright",
        Language: "English",
        "Based on": "The Little Prince",
        Premiere: "31 May 2003"
    },
    {
        title: "Little Red Riding Hood",
        composer: "Cui",
        date: "1921?"
    },
    {
        title: "Little Women",
        composer: "Mark Adamo",
        date: "1999",
        Librettist: "Mark Adamo",
        Language: "English",
        "Based on": "Little Women",
        Premiere: "March 13, 1998"
    },
    {
        title: "Lohengrin",
        composer: "Wagner",
        date: "1850",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Medieval German Romance",
        Premiere: "28 August 1850"
    },
    {
        title: "I Lombardi",
        composer: "Verdi",
        date: "1843",
        Librettist: "Temistocle Solera",
        Language: "Italian",
        "Based on": "Tommaso Grossi",
        Premiere: "11 February 1843"
    },
    {
        title: "Lord Byron",
        composer: "Thomson",
        date: "1972"
    },
    {
        title: "Loreley",
        composer: "Catalani",
        date: "1890",
        Librettist: "\n",
        Premiere: "16 February 1890"
    },
    {
        title: "Louise",
        composer: "Charpentier",
        date: "1900",
        Librettist: "Gustave Charpentier",
        Language: "French",
        Premiere: "2 February 1900 (1900-02-02)"
    },
    {
        title: "Louis Riel",
        composer: "Somers",
        date: "1967",
        Librettist: "\n",
        Language: "EnglishFrench",
        Premiere: "September 23, 1967"
    },
    {
        title: "The Love for Three Oranges",
        composer: "Prokofiev",
        date: "1921",
        "Native title": "\nL'amour des trois oranges\n\u041B\u044E\u0431\u043E\u0432\u044C \u043A \u0442\u0440\u0451\u043C \u0430\u043F\u0435\u043B\u044C\u0441\u0438\u043D\u0430\u043C, (Lyubov' k tryom apel'sinam)\n",
        Librettist: "Prokofiev",
        Language: "Russian / French",
        "Based on": "L'amore delle tre melarance",
        Premiere: "30 December 1921"
    },
    {
        title: "Lucia di Lammermoor",
        composer: "Donizetti",
        date: "1835",
        Librettist: "Salvadore Cammarano",
        Language: "Italian",
        "Based on": "The Bride of Lammermoor",
        Premiere: "26 September 1835"
    },
    {
        title: "Lucio Silla",
        composer: "Mozart",
        date: "1772",
        Librettist: "Giovanni de Gamerra",
        Language: "Italian",
        Premiere: "26 December 1772"
    },
    {
        title: "Lucrezia Borgia",
        composer: "Donizetti",
        date: "1834",
        Librettist: "Felice Romani",
        Language: "Italian",
        "Based on": "Lucrezia Borgia",
        Premiere: "26 December 1833"
    },
    {
        title: "Luisa Miller",
        composer: "Verdi",
        date: "1849",
        Librettist: "Salvadore Cammarano",
        Language: "Italian",
        "Based on": "Kabale und Liebe",
        Premiere: "8 December 1849"
    },
    {
        title: "Lulu",
        composer: "Berg",
        date: "1937",
        Librettist: "Berg",
        Language: "German",
        "Based on": "Erdgeist",
        Premiere: "2 June 1937"
    },
    {
        title: "Die lustige Witwe",
        composer: "Leh\xe1r",
        date: "1905"
    },
    {
        title: "Die lustigen Weiber von Windsor",
        composer: "Nicolai",
        date: "1849",
        Translation: "The Merry Wives of Windsor",
        Librettist: "Salomon Hermann Mosenthal",
        Language: "German",
        "Based on": "The Merry Wives of Windsor",
        Premiere: "9 March 1849"
    },
    {
        title: "Macbeth",
        composer: "Verdi",
        date: "1844",
        Librettist: "\n",
        Language: "\n",
        "Based on": "Macbeth",
        Premiere: "\n14 March 1847 (1847-03-14) (Italian)\n21 April 1865 (1865-04-21) (French)\n"
    },
    {
        title: "Madama Butterfly",
        composer: "Puccini",
        date: "1904",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "John Luther Long",
        Premiere: "17 February 1904"
    },
    {
        title: "Mademoiselle Fifi",
        composer: "Cui",
        date: "1903"
    },
    {
        title: "The Maid of Orleans",
        composer: "Tchaikovsky",
        date: "1881",
        "Native title": "Russian: ",
        Librettist: "Tchaikovsky",
        Language: "Russian",
        "Based on": "Joan of Arc",
        Premiere: "25 February 1881"
    },
    {
        title: "The Makropulos Affair",
        composer: "Jan\xe1\u010Dek",
        date: "1926",
        "Native title": "V\u011Bc Makropulos",
        "Other title": "The Makropoulos Case",
        Librettist: "Jan\xe1\u010Dek",
        Language: "Czech",
        "Based on": "V\u011Bc Makropulos",
        Premiere: "18 December 1926"
    },
    {
        title: "Les Mamelles de Tir\xe9sias",
        composer: "Poulenc",
        date: "1947",
        Translation: "The Breasts of Tiresias",
        Librettist: "Poulenc",
        Language: "French",
        "Based on": "The Breasts of Tiresias",
        Premiere: "3 June 1947"
    },
    {
        title: "The Man and Men",
        composer: "2010",
        date: "2010"
    },
    {
        title: "The Man Who Mistook His Wife for a Hat",
        composer: "Nyman",
        date: "1986",
        "Released": "1988",
        "Recorded": "1987",
        "Genre": "Opera",
        "Length": "57",
        Language: "English",
        "Label": "CBS Masterworks",
        "Producer": "David Cunningham"
    },
    {
        title: "The Mandarin's Son",
        composer: "Cui",
        date: "1878"
    },
    {
        title: "Manon",
        composer: "Massenet",
        date: "1884",
        Librettist: "\n",
        Language: "French",
        "Based on": "Manon Lescaut",
        Premiere: "19 January 1884"
    },
    {
        title: "Manon Lescaut",
        composer: "Puccini",
        date: "1893",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "Abb\xe9 Pr\xe9vost",
        Premiere: "1 February 1893"
    },
    {
        title: "Mare nostro",
        composer: "Lorenzo Ferrero",
        date: "1985",
        Librettist: "Marco Ravasini",
        Language: "Italian",
        "Based on": "Vittorio Alfieri",
        Premiere: "11 September 1985"
    },
    {
        title: "Margaret Garner",
        composer: "Danielpour",
        date: "2005",
        Librettist: "Toni Morrison",
        Language: "English",
        Premiere: "7 May 2005"
    },
    {
        title: "Mar\xeda de Buenos Aires",
        composer: "Piazzolla",
        date: "1968",
        Librettist: "Horacio Ferrer",
        Language: "Spanish",
        Premiere: "8 May 1968"
    },
    {
        title: "Maria Golovin",
        composer: "Menotti",
        date: "1958",
        Librettist: "Menotti",
        Language: "English",
        Premiere: "August 20, 1958"
    },
    {
        title: "Maria Stuarda",
        composer: "Donizetti",
        date: "1835",
        Librettist: "Giuseppe Bardari",
        Language: "Italian",
        "Based on": "Maria Stuart",
        Premiere: "30 December 1835"
    },
    {
        title: "Marilyn",
        composer: "Ferrero",
        date: "1980",
        Librettist: "\n",
        Language: "English and the language of the country in which it is performed",
        "Based on": "Marilyn Monroe",
        Premiere: "23 February 1980"
    },
    {
        title: "The Marriage Market",
        composer: "Jacobi",
        date: "1911"
    },
    {
        title: "Martha",
        composer: "Flotow",
        date: "1847",
        Librettist: "Friedrich Wilhelm Riese",
        Language: "German",
        "Based on": "Jules-Henri Vernoy de Saint-Georges",
        Premiere: "25 November 1847"
    },
    {
        title: "Les martyrs",
        composer: "Donizetti",
        date: "1840",
        Librettist: "Eug\xe8ne Scribe",
        Language: "French",
        "Based on": "Polyeucte",
        Premiere: "10 April 1840"
    },
    {
        title: "The Mask of Orpheus",
        composer: "Birtwistle",
        date: "1968",
        Librettist: "Peter Zinovieff",
        Language: "English",
        "Based on": "Orpheus",
        Premiere: "21 May 1986"
    },
    {
        title: "I masnadieri",
        composer: "Verdi",
        date: "1847",
        Librettist: "Andrea Maffei",
        Language: "Italian",
        "Based on": "Friedrich von Schiller",
        Premiere: "22 July 1847"
    },
    {
        title: "Maskarade",
        composer: "Nielsen",
        date: "1906",
        Librettist: "Vilhelm Andersen",
        Language: "Danish",
        Premiere: "11 November 1906"
    },
    {
        title: "Mateo Falcone",
        composer: "Cui",
        date: "1907"
    },
    {
        title: "Mathis der Maler",
        composer: "Hindemith",
        date: "1938",
        Translation: "Matthias the Painter",
        Librettist: "Hindemith",
        Language: "German",
        "Based on": "Matthias Gr\xfcnewald",
        Premiere: "28 May 1938"
    },
    {
        title: "Il matrimonio segreto",
        composer: "Cimarosa",
        date: "1792",
        Translation: "The Secret Marriage",
        Librettist: "Giovanni Bertati",
        Language: "Italian",
        "Based on": "The Clandestine Marriage",
        Premiere: "7 February 1792"
    },
    {
        title: "Mavra",
        composer: "Stravinsky",
        date: "1922",
        Librettist: "Boris Kochno",
        Language: "Russian",
        "Based on": "The Little House in Kolomna",
        Premiere: "18 May 1922"
    },
    {
        title: "May Night",
        composer: "Rimsky-Korsakov",
        date: "1880",
        "Native title": "Russian",
        Language: "Russian",
        "Based on": "May Night, or the Drowned Maiden",
        Premiere: "1892"
    },
    {
        title: "Mazeppa",
        composer: "Tchaikovsky",
        date: "1884",
        "Native title": "Russian: ",
        Librettist: "Victor Burenin",
        Language: "Russian",
        "Based on": "Poltava",
        Premiere: "15 February 1884"
    },
    {
        title: "M\xe9d\xe9e",
        composer: "Cherubini",
        date: "1797",
        Librettist: "Fran\xe7ois-Beno\xeet Hoffmann",
        Language: "French",
        "Based on": "Medea",
        Premiere: "13 March 1797"
    },
    {
        title: "M\xe9d\xe9e",
        composer: "Charpentier",
        date: "1693"
    },
    {
        title: "The Medium",
        composer: "Menotti",
        date: "1946",
        Librettist: "Menotti",
        Language: "English",
        Premiere: "May 8, 1946"
    },
    {
        title: "Mefistofele",
        composer: "Boito",
        date: "1868"
    },
    {
        title: "Die Meistersinger von N\xfcrnberg",
        composer: "Wagner",
        date: "1868",
        Translation: "The Mastersingers of Nuremberg",
        Librettist: "Richard Wagner",
        Language: "German",
        Premiere: "21 June 1868"
    },
    {
        title: "The Merchant Kalashnikov",
        composer: "Anton Rubinstein",
        date: "1880"
    },
    {
        title: "La Merope",
        composer: "Giacomelli",
        date: "1734"
    },
    {
        title: "The Midsummer Marriage",
        composer: "Michael Tippett",
        date: "Michael Tippett",
        Librettist: "Tippett",
        Language: "English",
        "Based on": "The Magic Flute",
        Premiere: "27 January 1955"
    },
    {
        title: "A Midsummer Night's Dream",
        composer: "Britten",
        date: "1960",
        Librettist: "\n",
        Language: "English",
        "Based on": "A Midsummer Night's Dream",
        Premiere: "11 June 1960"
    },
    {
        title: "Mignon",
        composer: "Thomas",
        date: "1866",
        Librettist: "\n",
        Language: "French",
        "Based on": "Wilhelm Meisters Lehrjahre",
        Premiere: "17 November 1866"
    },
    {
        title: "The Mines of Sulphur",
        composer: "Bennett",
        date: "1963"
    },
    {
        title: "The Miserly Knight",
        composer: "Rachmaninoff",
        date: "1906",
        "Native title": "Russian",
        Language: "Russian",
        "Based on": "Alexander Pushkin",
        Premiere: "24 January 1906"
    },
    {
        title: "Miss Julie",
        composer: "Rorem",
        date: "1965"
    },
    {
        title: "Mittwoch aus Licht",
        composer: "Stockhausen",
        date: "2012",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "August 22, 2012"
    },
    {
        title: "Mlada",
        composer: "Cui",
        date: "1872"
    },
    {
        title: "Mlada",
        composer: "Rimsky-Korsakov",
        date: "1890",
        "Native title": "Russian",
        Librettist: "Viktor Krylov",
        Language: "Russian",
        Premiere: "1892"
    },
    {
        title: "Montag aus Licht",
        composer: "Stockhausen",
        date: "1988",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "May 7, 1988"
    },
    {
        title: "Moses und Aron",
        composer: "Schoenberg",
        date: "1957",
        Translation: "Moses and Aaron",
        Librettist: "Schoenberg",
        Language: "German",
        "Based on": "Book of Exodus",
        Premiere: "6 June 1957"
    },
    {
        title: "The Most Important Man",
        composer: "1957",
        date: "1957",
        Librettist: "Gian Carlo Menotti",
        Language: "English",
        Premiere: "March 12, 1971"
    },
    {
        title: "Motezuma",
        composer: "Vivaldi",
        date: "1733",
        Librettist: "Alvise Giusti",
        Premiere: "14 November 1733"
    },
    {
        title: "Mozart and Salieri",
        composer: "Rimsky-Korsakov",
        date: "1898",
        "Native title": "Russian",
        Language: "Russian",
        "Based on": "Mozart and Salieri",
        Premiere: "1898"
    },
    {
        title: "Nabucco",
        composer: "Verdi",
        date: "1842",
        Librettist: "Temistocle Solera",
        Language: "Italian",
        "Based on": "Play",
        Premiere: "9 March 1842"
    },
    {
        title: "Eine Nacht in Venedig",
        composer: "J. Strauss",
        date: "1883"
    },
    {
        title: "N\u0119dza uszcz\u0119\u015Bliwiona",
        composer: "Maciej Kamie\u0144ski",
        date: "1778"
    },
    {
        title: "The New Moon",
        composer: "Romberg",
        date: "1928"
    },
    {
        title: "Nicholas and Alexandra",
        composer: "Drattell",
        date: "2003",
        "Directed by": "Franklin J. Schaffner",
        "Screenplay by": "James Goldman",
        "Based on": "Nicholas and Alexandra",
        "Produced by": "Sam Spiegel",
        "Starring": "\n",
        "Cinematography": "Freddie Young",
        "Edited by": "Ernest Walter",
        "Music by": "Richard Rodney Bennett",
        "Productioncompany": "Horizon Pictures",
        "Distributed by": "Columbia Pictures",
        "Release date": "\n",
        "Running time": "[1]",
        "Country": "United Kingdom",
        Language: "English",
        "Budget": "[2]",
        "Box office": "(rentals)"
    },
    {
        title: "The Nightingale",
        composer: "Stravinsky",
        date: "1914",
        "Description": "conte lyrique",
        "Native title": "\nRussian: \u0421\u043E\u043B\u043E\u0432\u0435\u0439\nFrench: Le rossignol\n",
        Librettist: "\n",
        "Based on": "The Nightingale",
        Premiere: "26 May 1914"
    },
    {
        title: "Nina",
        composer: "Paisiello",
        date: "1789"
    },
    {
        title: "El Ni\xf1o",
        composer: "John Adams",
        date: "2000"
    },
    {
        title: "Nixon in China",
        composer: "Adams",
        date: "1987",
        Librettist: "Alice Goodman",
        Language: "English",
        Premiere: "October 22, 1987",
        "Website": "www.earbox.com/nixon-in-china/"
    },
    {
        title: "Norma",
        composer: "Bellini",
        date: "1831",
        Librettist: "Felice Romani",
        Language: "Italian",
        "Based on": "Alexandre Soumet",
        Premiere: "26 December 1831"
    },
    {
        title: "The Nose",
        composer: "Shostakovich",
        date: "1930",
        "Native title": "Russian: ",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "The Nose",
        Premiere: "18 January 1930"
    },
    {
        title: "The Marriage of Figaro",
        composer: "Mozart",
        date: "1786",
        "Native title": "Le nozze di Figaro",
        Librettist: "Lorenzo Da Ponte",
        Language: "Italian",
        "Based on": "La folle journ\xe9e, ou le Mariage de Figaro",
        Premiere: "1 May 1786"
    },
    {
        title: "Oberto Conte di San Bonifacio",
        composer: "Verdi",
        date: "1839",
        Librettist: "Temistocle Solera",
        Language: "Italian",
        "Based on": "Antonio Piazza",
        Premiere: "17 November 1839"
    },
    {
        title: "L'oca del Cairo",
        composer: "Mozart",
        date: "1783",
        Translation: "The Goose of Cairo",
        Librettist: "Giovanni Battista Varesco",
        Language: "Italian"
    },
    {
        title: "\u0152dipe",
        composer: "George Enescu",
        date: "1936",
        Librettist: "Edmond Fleg",
        Language: "French",
        "Based on": "The Theban plays",
        Premiere: "13 March 1936"
    },
    {
        title: "Oedipus rex",
        composer: "Igor Stravinsky",
        date: "1927",
        "Description": "Opera",
        Librettist: "Jean Cocteau",
        "Based on": "Oedipus Rex",
        Premiere: "30 May 1927"
    },
    {
        title: "The Old Maid and the Thief",
        composer: "Menotti",
        date: "1939",
        Librettist: "Menotti",
        Language: "English",
        Premiere: "April 22, 1939"
    },
    {
        title: "Operation Orfeo",
        composer: "Bo Holten",
        date: "Bo Holten"
    },
    {
        title: "Das Opfer",
        composer: "Winfried Zillig",
        date: "Winfried Zillig",
        Translation: "The Sacrifice",
        Librettist: "Reinhard Goering",
        Language: "German",
        "Based on": "Die S\xfcdpolexpedition des Kapit\xe4ns Scott",
        Premiere: "12 November 1937"
    },
    {
        title: "Oresteia",
        composer: "Taneyev",
        date: "1895"
    },
    {
        title: "L'Orfeo",
        composer: "Monteverdi",
        date: "1607",
        Librettist: "Alessandro Striggio",
        Language: "Italian",
        "Based on": "Greek legend",
        Premiere: "1607 "
    },
    {
        title: "Orfeo ed Euridice",
        composer: "Gluck",
        date: "1762"
    },
    {
        title: "Orlando furioso",
        composer: "Vivaldi",
        date: "1727",
        Librettist: "Grazio Braccioli",
        Premiere: "November 1727 (1727-11)Teatro Sant'Angelo, Venice"
    },
    {
        title: "Orph\xe9e aux enfers",
        composer: "Offenbach",
        date: "1858"
    },
    {
        title: "Orph\xe9e et Eurydice",
        composer: "Gluck",
        date: "1774"
    },
    {
        title: "Oscar",
        composer: "2013",
        date: "2013",
        Librettist: "\n",
        Premiere: "27 July 2013"
    },
    {
        title: "Otello",
        composer: "Verdi",
        date: "1887",
        Librettist: "Arrigo Boito",
        Language: "Italian",
        "Based on": "Othello",
        Premiere: "5 February 1887"
    },
    {
        title: "Otello",
        composer: "Rossini",
        date: "1816",
        Librettist: "Francesco Maria Berio di Salsa",
        Language: "Italian",
        Premiere: "4 December 1816"
    },
    {
        title: "Owen Wingrave",
        composer: "Britten",
        date: "1971",
        Librettist: "Myfanwy Piper",
        Language: "English",
        "Based on": "Henry James",
        Premiere: "16 May 1971"
    },
    {
        title: "Pagliacci",
        composer: "Leoncavallo",
        date: "1892",
        Librettist: "Ruggero Leoncavallo",
        Language: "Italian",
        Premiere: "21 May 1892"
    },
    {
        title: "Paradise Lost",
        composer: "Penderecki",
        date: "1978",
        "Description": "Sacra Rappresentazione",
        Librettist: "Christopher Fry",
        Language: "English",
        "Based on": '"Paradise Lost" by John Milton',
        Premiere: "29 November 1978"
    },
    {
        title: "Parsifal",
        composer: "Wagner",
        date: "1882",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Parzival",
        Premiere: "26 July 1882"
    },
    {
        title: "Patience",
        composer: "Gilbert and Sullivan",
        date: "1881"
    },
    {
        title: "Le Pays",
        composer: "Ropartz",
        date: "1912"
    },
    {
        title: "Les p\xeacheurs de perles",
        composer: "Bizet",
        date: "1863",
        Librettist: "\n",
        Language: "French",
        Premiere: "30 September 1863"
    },
    {
        title: "Pell\xe9as et M\xe9lisande",
        composer: "Debussy",
        date: "1902",
        Language: "French",
        "Based on": "Pell\xe9as et M\xe9lisande",
        Premiere: "30 April 1902"
    },
    {
        title: "Peter Grimes",
        composer: "Britten",
        date: "1945",
        Librettist: "Montagu Slater",
        Premiere: "7 June 1945"
    },
    {
        title: "Le piccole storie",
        composer: "Ferrero",
        date: "2007",
        Librettist: "Giuseppe Di Leva",
        Language: "Italian",
        Premiere: "9 December 2007"
    },
    {
        title: "The Pirates of Penzance",
        composer: "Gilbert and Sullivan",
        date: "1879"
    },
    {
        title: "Polyph\xe8me",
        composer: "Cras",
        date: "1945"
    },
    {
        title: "Porgy and Bess",
        composer: "Gershwin",
        date: "1935",
        Librettist: "DuBose Heyward",
        Language: "English",
        "Based on": "Porgy",
        Premiere: "September 30, 1935"
    },
    {
        title: "Porin",
        composer: "Lisinski",
        date: "1851"
    },
    {
        title: "Powder Her Face",
        composer: "Thomas Ad\xe8s",
        date: "1995",
        Librettist: "Philip Hensher",
        "Based on": "Margaret Campbell, Duchess of Argyll",
        Premiere: "1 July 1995"
    },
    {
        title: "The Power of the Fiend",
        composer: "Serov",
        date: "1871",
        "Native title": "Russian",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "Live Not as You Would Like To",
        Premiere: "14 April 1871"
    },
    {
        title: "Prince Igor",
        composer: "Borodin",
        date: "1890",
        "Native title": "Russian",
        Librettist: "Borodin",
        Language: "Russian",
        "Based on": "The Lay of Igor's Host",
        Premiere: "4 November 1890"
    },
    {
        title: "Prisoner of the Caucasus",
        composer: "Cui",
        date: "1883"
    },
    {
        title: "I puritani",
        composer: "Bellini",
        date: "1835",
        Librettist: "Carlo Pepoli",
        Language: "Italian",
        "Based on": "T\xeates Rondes et Cavalieres",
        Premiere: "24 January 1835"
    },
    {
        title: "Puss in Boots",
        composer: "Cui",
        date: "1915"
    },
    {
        title: "I quatro rusteghi",
        composer: "Wolf-Ferrari",
        date: "1906",
        Translation: "The Four Curmudgeons",
        Librettist: "\n",
        Language: "Venetian dialect",
        "Based on": "I rusteghi",
        Premiere: "19 March 1906"
    },
    {
        title: "The Queen of Spades",
        composer: "Tchaikovsky",
        date: "1890",
        "Native title": "\u041F\u0438\u043A\u043E\u0432\u0430\u044F \u0434\u0430\u043C\u0430",
        Librettist: "Modest Tchaikovsky",
        Language: "Russian",
        "Based on": "The Queen of Spades",
        Premiere: "29 March 1890"
    },
    {
        title: "A Quiet Place",
        composer: "Bernstein",
        date: "1983",
        Librettist: "Stephen Wadsworth",
        Language: "English",
        Premiere: "17 June 1983"
    },
    {
        title: "Radamisto",
        composer: "Handel",
        date: "1720"
    },
    {
        title: "The Rake's Progress",
        composer: "Stravinsky",
        date: "1951",
        Librettist: "\n",
        "Based on": "A Rake's Progress",
        Premiere: "11 September 1951"
    },
    {
        title: "The Rape of Lucretia",
        composer: "Britten",
        date: "1946",
        Librettist: "Ronald Duncan",
        Language: "English",
        "Based on": "Le Viol de Lucr\xe8ce",
        Premiere: "12 July 1946"
    },
    {
        title: "Il re pastore",
        composer: "Mozart",
        date: "1775",
        Librettist: "Metastasio",
        Language: "Italian",
        "Based on": "Aminta",
        Premiere: "23 April 1775"
    },
    {
        title: "El retablo de maese Pedro",
        composer: "de Falla",
        date: "1923",
        Translation: "Master Peter's Puppet Show",
        Language: "Spanish",
        "Based on": "Don Quixote",
        Premiere: "25 June 1923"
    },
    {
        title: "Das Rheingold",
        composer: "Wagner",
        date: "1869",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "22 September 1869"
    },
    {
        title: "Rienzi",
        composer: "Wagner",
        date: "1842",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "20 October 1842"
    },
    {
        title: "Rigoletto",
        composer: "Verdi",
        date: "1851",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "Le roi s'amuse",
        Premiere: "11 March 1851"
    },
    {
        title: "Rinaldo",
        composer: "Handel",
        date: "1711"
    },
    {
        title: "Der Ring des Nibelungen",
        composer: "Wagner",
        date: "1876",
        Translation: "The Ring of the Nibelung",
        Librettist: "Richard Wagner",
        Language: "German",
        Premiere: "\nIndividually:\n22 September 1869 (22 September 1869) Das Rheingold\n26 June 1870 (26 June 1870) Die Walk\xfcre\nAs a cycle:\n13 August 1876 (1876-08-13) Das Rheingold\n14 August 1876 Die Walk\xfcre\n16 August 1876 Siegfried\n17 August 1876 G\xf6tterd\xe4mmerung\n"
    },
    {
        title: "R\xedo de Sangre",
        composer: "Don Davis",
        date: "2010",
        Librettist: "Kate Gale",
        Language: "Spanish",
        Premiere: "22 October 2010"
    },
    {
        title: "Risorgimento!",
        composer: "Lorenzo Ferrero",
        date: "2011",
        Librettist: "Dario Oliveri",
        Language: "Italian",
        Premiere: "26 March 2011"
    },
    {
        title: "Il ritorno d'Ulisse in patria",
        composer: "Monteverdi",
        date: "1640",
        Librettist: "Giacomo Badoaro",
        Language: "Italian",
        "Based on": "Homer",
        Premiere: "1639\u20131640 "
    },
    {
        title: "Roberto Devereux",
        composer: "Donizetti",
        date: "1837",
        Librettist: "Salvadore Cammarano",
        Language: "Italian",
        "Based on": "Elisabeth d'Angleterre",
        Premiere: "28 October 1837"
    },
    {
        title: "Rodelinda",
        composer: "Handel",
        date: "1725"
    },
    {
        title: "Rogneda",
        composer: "Serov",
        date: "1865",
        "Native title": "Russian",
        Librettist: "Dmitry Averkiev",
        Language: "Russian",
        "Based on": "Mikhail Zagoskin",
        Premiere: "27 October 1865"
    },
    {
        title: "Le roi de Lahore",
        composer: "Massenet",
        date: "1877",
        Librettist: "Louis Gallet",
        Language: "French",
        Premiere: "27 April 1877"
    },
    {
        title: "Rom\xe9o et Juliette",
        composer: "Gounod",
        date: "1867",
        Librettist: "\n",
        Language: "French",
        "Based on": "Romeo and Juliet",
        Premiere: "27 April 1867"
    },
    {
        title: "La rondine",
        composer: "Puccini",
        date: "1917",
        Librettist: "Giuseppe Adami",
        Language: "Italian",
        Premiere: "27 March 1917"
    },
    {
        title: "Der Rosenkavalier",
        composer: "R. Strauss",
        date: "1911",
        Librettist: "Hugo von Hofmannsthal",
        Language: "German",
        Premiere: "26 January 1911"
    },
    {
        title: "The Rose of Castille",
        composer: "Michael Balfe",
        date: "1857",
        Librettist: "\n",
        Language: "English",
        Premiere: "29 October 1857"
    },
    {
        title: "Rusalka",
        composer: "Dargomyzhsky",
        date: "1856"
    },
    {
        title: "Rusalka",
        composer: "Dvo\u0159\xe1k",
        date: "1901",
        Librettist: "Jaroslav Kvapil",
        Language: "Czech",
        "Based on": "Karel Jarom\xedr Erben",
        Premiere: "31 March 1901"
    },
    {
        title: "Ruslan and Lyudmila",
        composer: "Glinka",
        date: "1842"
    },
    {
        title: "Sadko",
        composer: "Rimsky-Korsakov",
        date: "1898",
        "Native title": "Russian: ",
        Librettist: "Rimsky-Korsakov",
        Language: "Russian",
        Premiere: "7 January 1898"
    },
    {
        title: "Saint Fran\xe7ois d'Assise",
        composer: "Messiaen",
        date: "1983",
        Librettist: "Messiaen",
        Language: "French",
        "Based on": "Francis of Assisi",
        Premiere: "28 November 1983"
    },
    {
        title: "The Saint of Bleecker Street",
        composer: "Menotti",
        date: "1954",
        Librettist: "Menotti",
        Language: "English",
        Premiere: "December 27, 1954"
    },
    {
        title: "Salammb\xf4",
        composer: "Reyer",
        date: "1890",
        Librettist: "Camille du Locle",
        Language: "French",
        "Based on": "Gustave Flaubert",
        Premiere: "10 February 1890"
    },
    {
        title: "Salome",
        composer: "R. Strauss",
        date: "1905",
        Librettist: "Oscar Wilde",
        Language: "German",
        Premiere: "9 December 1905"
    },
    {
        title: "Salvatore Giuliano",
        composer: "Lorenzo Ferrero",
        date: "1986",
        Librettist: "Giuseppe Di Leva",
        Language: "Italian",
        "Based on": "Salvatore Giuliano",
        Premiere: "25 January 1986"
    },
    {
        title: "Samson",
        composer: "Handel",
        date: "1743"
    },
    {
        title: "Samstag aus Licht",
        composer: "Stockhausen",
        date: "1984",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "May 25, 1984"
    },
    {
        title: "Samson et Dalila",
        composer: "Saint-Sa\xebns",
        date: "1877",
        Librettist: "Ferdinand Lemaire",
        Language: "French",
        "Based on": "Samson and Delilah",
        Premiere: "2 December 1877"
    },
    {
        title: "Il Sant'Alessio",
        composer: "Landi",
        date: "1632"
    },
    {
        title: "The Saracen",
        composer: "Cui",
        date: "1899"
    },
    {
        title: "\u0160\xe1rka",
        composer: "Jan\xe1\u010Dek",
        date: "1925",
        Librettist: "Julius Zeyer",
        Language: "Czech",
        "Based on": "Bohemian legends of \u0160\xe1rka",
        Premiere: "11 November 1925"
    },
    {
        title: "Satyagraha",
        composer: "Glass",
        date: "1980",
        Librettist: "\n",
        "Based on": "Mahatma Gandhi",
        Premiere: "September 5, 1980"
    },
    {
        title: "The Scarecrow",
        composer: "Turrin",
        date: "2006"
    },
    {
        title: "The Scarlet Letter",
        composer: "Laitman",
        date: "Laitman"
    },
    {
        title: "Der Schauspieldirektor",
        composer: "Mozart",
        date: "1786",
        Translation: "The Impresario",
        Librettist: "Gottlieb Stephanie",
        Language: "German",
        Premiere: "7 February 1786"
    },
    {
        title: "Der Schmied von Gent",
        composer: "Schreker",
        date: "1932"
    },
    {
        title: "Die Schuldigkeit des ersten Gebots",
        composer: "Mozart",
        date: "1767",
        Language: "German",
        Premiere: "12 March 1767"
    },
    {
        title: "Schwanda the Bagpiper",
        composer: "Weinberger",
        date: "1927"
    },
    {
        title: "Semele",
        composer: "Eccles",
        date: "1707",
        Librettist: "William Congreve",
        "Based on": "Ovid"
    },
    {
        title: "Semele",
        composer: "Handel",
        date: "1744"
    },
    {
        title: "Semiramide",
        composer: "Rossini",
        date: "1823",
        Librettist: "Gaetano Rossi",
        Language: "Italian",
        "Based on": "Semiramis",
        Premiere: "3 February 1823"
    },
    {
        title: "Serse",
        composer: "Handel",
        date: "1738"
    },
    {
        title: "Shell Shock",
        composer: "Nicholas Lens",
        date: "2014",
        Librettist: "\n",
        Language: "English",
        Premiere: "24 October 2014"
    },
    {
        title: "Le si\xe8ge de Corinthe",
        composer: "Rossini",
        date: "1826",
        Translation: "The Siege of Corinth",
        Librettist: "\n",
        Language: "French",
        "Based on": "Third Siege of Missolonghi",
        Premiere: "9 October 1826"
    },
    {
        title: "Shining Brow",
        composer: "Hagen",
        date: "1992",
        Librettist: "Paul Muldoon",
        Language: "English",
        Premiere: "April 21, 1993"
    },
    {
        title: "Siegfried",
        composer: "Wagner",
        date: "1876",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "16 August 1876"
    },
    {
        title: "Simon Boccanegra",
        composer: "Verdi",
        date: "1857",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "Antonio Garc\xeda Guti\xe9rrez",
        Premiere: "\n12 March 1857 (1857-03-12) (first version)\n24 March 1881 (1881-03-24) (second version)\n"
    },
    {
        title: "Simplicius",
        composer: "J. Strauss",
        date: "1887"
    },
    {
        title: "The Skating Rink",
        composer: "Sawer",
        date: "2018"
    },
    {
        title: "Slow Man",
        composer: "Nicholas Lens",
        date: "2012",
        Librettist: "\n",
        Premiere: "24 October 2014"
    },
    {
        title: "The Snow Bogatyr",
        composer: "Cui",
        date: "1906"
    },
    {
        title: "The Snow Maiden",
        composer: "Rimsky-Korsakov",
        date: "1882",
        Librettist: "Rimsky-Korsakov",
        Language: "Russian",
        "Based on": "The Snow Maiden",
        Premiere: "29 January 1882"
    },
    {
        title: "Il sogno di Scipione",
        composer: "Mozart",
        date: "1772",
        Librettist: "Pietro Metastasio",
        Language: "Italian",
        "Based on": "Somnium Scipionis",
        Premiere: "1 May 1772"
    },
    {
        title: "La sonnambula",
        composer: "Bellini",
        date: "1831",
        Librettist: "Felice Romani",
        Language: "Italian",
        "Based on": "La somnambule, ou L'arriv\xe9e d'un nouveau seigneur",
        Premiere: "6 March 1831"
    },
    {
        title: "Sonntag aus Licht",
        composer: "Stockhausen",
        date: "2011",
        Librettist: "Stockhausen",
        Language: "German",
        Premiere: "April 9, 2011"
    },
    {
        title: "Lo sposo deluso",
        composer: "Mozart",
        date: "1783",
        Translation: "The Deluded Bridegroom",
        Librettist: "unknown poet",
        Language: "Italian",
        "Based on": "Cimarosa"
    },
    {
        title: "Stiffelio",
        composer: "Giuseppe Verdi",
        date: "Giuseppe Verdi",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "Le pasteur, ou L'\xe9vangile et le foyer",
        Premiere: "16 November 1850"
    },
    {
        title: "The Stone Guest",
        composer: "Dargomyzhsky",
        date: "1872"
    },
    {
        title: "Street Scene",
        composer: "Weill",
        date: "1947",
        Librettist: "Langston Hughes",
        Language: "English",
        "Based on": "Street Scene",
        Premiere: "9 January 1947"
    },
    {
        title: "Suor Angelica",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giovacchino Forzano",
        Language: "Italian",
        Premiere: "14 December 1918"
    },
    {
        title: "Susannah",
        composer: "Floyd",
        date: "1955",
        Librettist: "Floyd",
        Language: "English",
        "Based on": "Susannah and the Elders",
        Premiere: "February 24, 1955"
    },
    {
        title: "Sv\xe4topluk",
        composer: "Sucho\u0148",
        date: "1960"
    },
    {
        title: "Szibill",
        composer: "Jacobi",
        date: "1914"
    },
    {
        title: "Il tabarro",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giuseppe Adami",
        Language: "Italian",
        "Based on": "La houppelande",
        Premiere: "14 December 1918"
    },
    {
        title: "The Tale of Tsar Saltan",
        composer: "Rimsky-Korsakov",
        date: "1900",
        Librettist: "Vladimir Belsky",
        Language: "Russian",
        "Based on": "The Tale of Tsar Saltan",
        Premiere: "3 November 1900"
    },
    {
        title: "Tancredi",
        composer: "Rossini",
        date: "1813",
        Librettist: "Gaetano Rossi",
        Language: "Italian",
        "Based on": "Tancr\xe8de",
        Premiere: "6 February 1813"
    },
    {
        title: "Tannh\xe4user",
        composer: "Wagner",
        date: "1845",
        "Native title": "Tannh\xe4user und der S\xe4ngerkrieg auf Wartburg",
        Librettist: "Richard Wagner",
        Language: "German",
        Premiere: "19 October 1845"
    },
    {
        title: "Tartuffe",
        composer: "Mechem",
        date: "1980"
    },
    {
        title: "Tea: A Mirror of Soul",
        composer: "Tan Dun",
        date: "2007"
    },
    {
        title: "De temporum fine comoedia",
        composer: "Orff",
        date: "1973",
        Translation: "A Play on the End of Time",
        Language: "GreekGermanLatin",
        Premiere: "20 August 1973"
    },
    {
        title: "The Tempest",
        composer: "Thomas Ad\xe8s",
        date: "2004"
    },
    {
        title: "The Tender Land",
        composer: "Copland",
        date: "1954",
        Librettist: "Horace Everett",
        Language: "English",
        Premiere: "April 1, 1954"
    },
    {
        title: "Th\xe9r\xe8se Raquin",
        composer: "Picker",
        date: "2001",
        Librettist: "Gene Scheer",
        Language: "English",
        "Based on": "Th\xe9r\xe8se Raquin",
        Premiere: "November 30, 2001"
    },
    {
        title: "The Three Feathers",
        composer: "Laitman",
        date: "2014",
        "Name": "The Three Feathers",
        alternate: "Die drei Federn",
        "Aarne\u2013Thompson grouping": "ATU 402 (The Animal Bride)",
        "Region": "Germany",
        "Published in": "Kinder- und Hausm\xe4rchen",
        "Related": "The Frog Princess"
    },
    {
        title: "Tha\xefs",
        composer: "Massenet",
        date: "1894",
        Librettist: "Louis Gallet",
        Language: "French",
        "Based on": "Tha\xefs",
        Premiere: "16 March 1894"
    },
    {
        title: "Die Dreigroschenoper",
        Translation: "The Threepenny Opera",
        composer: "Weill",
        date: "1928",
        "Music": "Kurt Weill",
        "Lyrics": "Bertolt Brecht",
        "Book": "Bertolt Brecht",
        "Basis": "The Beggar's Opera",
        Premiere: "31 August "
    },
    {
        title: "Three Tales",
        composer: "Reich",
        date: "2002",
        Language: "English",
        "Based on": "\n",
        Premiere: "May 12, 2002"
    },
    {
        title: "Tiefland",
        composer: "Eugen d'Albert",
        date: "1911",
        Translation: "The Lowlands",
        Librettist: "Rudolf Lothar",
        Language: "German",
        "Based on": "Terra baixa",
        Premiere: "15 November 1903"
    },
    {
        title: "Tosca",
        composer: "Puccini",
        date: "1900",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "La Tosca",
        Premiere: "14 January 1900"
    },
    {
        title: "La traviata",
        composer: "Verdi",
        date: "1853",
        Librettist: "Francesco Maria Piave",
        Language: "Italian",
        "Based on": "La Dame aux cam\xe9lias",
        Premiere: "6 March 1853"
    },
    {
        title: "Treemonisha",
        composer: "Joplin",
        date: "1911"
    },
    {
        title: "Tristan und Isolde",
        composer: "Wagner",
        date: "1865",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Tristan and Iseult",
        Premiere: "10 June 1865"
    },
    {
        title: "Trouble in Tahiti",
        composer: "Bernstein",
        date: "1952",
        Librettist: "Leonard Bernstein",
        Language: "English",
        Premiere: "12 June 1952"
    },
    {
        title: "Il trovatore",
        composer: "Verdi",
        date: "1853",
        Librettist: "Salvadore Cammarano",
        Language: "Italian",
        "Based on": "Antonio Garc\xeda Guti\xe9rrez",
        Premiere: "19 January 1853"
    },
    {
        title: "Troy",
        composer: "Bujor Hoinic",
        date: "2018",
        Librettist: "Artun Hoinic",
        Language: "Turkish",
        "Based on": "Iliad",
        Premiere: "9 November 2018"
    },
    {
        title: "Les Troyens",
        composer: "Berlioz",
        date: "1863",
        Librettist: "Berlioz",
        Language: "French",
        "Based on": "Aeneid",
        Premiere: "4 November 1863"
    },
    {
        title: "The Tsar's Bride",
        composer: "Rimsky-Korsakov",
        date: "1899",
        "Native title": "Russian",
        Librettist: "Ilia Tyumenev",
        Language: "Russian",
        "Based on": "The Tsar's Bride",
        Premiere: "1899"
    },
    {
        title: "Turandot",
        composer: "Puccini",
        date: "1926",
        Librettist: "\n",
        Language: "Italian",
        "Based on": "Carlo Gozzi",
        Premiere: "25 April 1926"
    },
    {
        title: "Il turco in Italia",
        composer: "Rossini",
        date: "1814",
        Translation: "The Turk in Italy",
        Librettist: "Felice Romani",
        Language: "Italian",
        Premiere: "14 August 1814"
    },
    {
        title: "The Turn of the Screw",
        composer: "Britten",
        date: "1954",
        Librettist: "Myfanwy Piper",
        Language: "English",
        "Based on": "The Turn of the Screw",
        Premiere: "14 September 1954"
    },
    {
        title: "Vanessa",
        composer: "Barber",
        date: "1958",
        Librettist: "Gian Carlo Menotti",
        Language: "English",
        Premiere: "January 15, 1958"
    },
    {
        title: "Veinticinco de agosto, 1983",
        composer: "Solare",
        date: "1992"
    },
    {
        title: "Verbum nobile",
        composer: "Moniuszko",
        date: "1861",
        "Native title": "Straszny dw\xf3r",
        Librettist: "Jan Ch\u0119ci\u0144ski",
        Language: "Polish",
        Premiere: "1 January 1861"
    },
    {
        title: "La vestale",
        composer: "Spontini",
        date: "1807",
        Librettist: "\xc9tienne de Jouy",
        Language: "French",
        Premiere: "15 December 1807"
    },
    {
        title: "Il viaggio a Reims",
        composer: "Rossini",
        date: "1825",
        Librettist: "Luigi Balocchi",
        Language: "Italian",
        "Based on": "Corinne ou l'Italie",
        Premiere: "19 June 1825"
    },
    {
        title: "La vida breve",
        composer: "de Falla",
        date: "1913",
        Translation: "The Brief Life",
        Librettist: "Carlos Fern\xe1ndez-Shaw",
        Language: "Spanish (Andalusian dialect)",
        Premiere: "1 April 1913"
    },
    {
        title: "Le Villi",
        composer: "Puccini",
        date: "1884",
        Librettist: "Ferdinando Fontana",
        Language: "Italian",
        "Based on": "Jean-Baptiste Alphonse Karr",
        Premiere: "31 May 1884"
    },
    {
        title: "Violanta",
        composer: "Korngold",
        date: "1916",
        Librettist: "Hans M\xfcller-Einigen",
        Language: "German",
        Premiere: "28 March 1916"
    },
    {
        title: "Violet",
        composer: "Roger Scruton",
        date: "2005"
    },
    {
        title: "Volo di notte",
        composer: "Dallapiccola",
        date: "1940",
        Translation: "Night Flight",
        Librettist: "Dallapiccola",
        Language: "Italian",
        "Based on": "Vol de nuit",
        Premiere: "May 10, 1940"
    },
    {
        title: "Les v\xeapres siciliennes",
        composer: "Verdi",
        date: "1855",
        Librettist: "\n",
        Language: "French",
        "Based on": "Donizetti",
        Premiere: "13 June 1855"
    },
    {
        title: "Venus and Adonis",
        composer: "Blow",
        date: "1683",
        Librettist: "Aphra Behn",
        "Based on": "Venus"
    },
    {
        title: "Vera of Las Vegas",
        composer: "Hagen",
        date: "1996",
        Librettist: "Paul Muldoon",
        Language: "English",
        Premiere: "June 25, 2003"
    },
    {
        title: "Die Walk\xfcre",
        composer: "Wagner",
        date: "1870",
        Translation: "The Valkyrie",
        Librettist: "Richard Wagner",
        Language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "26 June 1870"
    },
    {
        title: "La Wally",
        composer: "Catalani",
        date: "1892",
        Librettist: "Luigi Illica",
        Premiere: "20 January 1892"
    },
    {
        title: "War and Peace",
        composer: "Prokofiev",
        date: "1946",
        "Native title": "\u0412\u043E\u0439\u043D\u0430 \u0438 \u043C\u0438\u0440",
        Librettist: "\n",
        Language: "Russian",
        "Based on": "War and Peace",
        Premiere: "12 June 1946"
    },
    {
        title: "A Wedding",
        composer: "Bolcom",
        date: "2004"
    },
    {
        title: "Wei\xdfe Rose",
        alternate: "Weisse Rose",
        composer: "Udo Zimmermann",
        date: "Udo Zimmermann",
        Librettist: "Ingo Zimmermann",
        Language: "German",
        "Based on": "Die Wei\xdfe Rose",
        Premiere: "17 June 1967"
    },
    {
        title: "Werther",
        composer: "Massenet",
        date: "1892",
        Librettist: "\n",
        Language: "French",
        "Based on": "Die Leiden des jungen Werther",
        Premiere: "16 February 1892"
    },
    {
        title: "What Men Live By",
        composer: "Martin\u016F",
        date: "1953"
    },
    {
        title: "Written on Skin",
        composer: "George Benjamin",
        date: "George Benjamin"
    },
    {
        title: "William Ratcliff",
        composer: "Cui",
        date: "1869"
    },
    {
        title: "Wozzeck",
        composer: "Berg",
        date: "1925",
        Librettist: "Berg",
        Language: "German",
        "Based on": "Woyzeck",
        Premiere: "14 December 1925"
    },
    {
        title: "Wuthering Heights",
        composer: "Floyd",
        date: "1958",
        Librettist: "Floyd",
        Language: "English",
        "Based on": "Wuthering Heights",
        Premiere: "July 16, 1958"
    },
    {
        title: "Wuthering Heights",
        composer: "Herrmann",
        date: "1982",
        Librettist: "Lucille Fletcher",
        Language: "English",
        "Based on": "Emily Bront\xeb",
        Premiere: "November 6, 1982"
    },
    {
        title: "X, The Life and Times of Malcolm X",
        composer: "Davis",
        date: "1986"
    },
    {
        title: "Yerma",
        composer: "Villa-Lobos",
        date: "1971"
    },
    {
        title: "Zaide",
        composer: "Mozart",
        date: "1780",
        Librettist: "Johann Andreas Schachtner",
        Language: "German"
    },
    {
        title: "The Magic Flute",
        composer: "Mozart",
        date: "1791",
        "Native title": "Die Zauberfl\xf6te",
        Librettist: "Emanuel Schikaneder",
        Language: "German",
        Premiere: "30 September 1791"
    }
].filter((opera)=>opera.Language).map((opera)=>({
        ...opera,
        normalized: $39da3df97ab2d361$export$a3295358bff77e(opera.title)
    }));
function $39da3df97ab2d361$export$a3295358bff77e(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, " ").replace(/[^\w\s]/g, "_").trim();
}


const $80103596bd80a7b3$var$fuse = new (0, $119b89bfb9f77c84$export$2e2bcd8739ae039)((0, $39da3df97ab2d361$export$2e2bcd8739ae039), {
    keys: [
        "normalized",
        "Translation",
        "alternate",
        "Native title"
    ],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.2
});
const $80103596bd80a7b3$var$targetOpera = (0, $39da3df97ab2d361$export$2e2bcd8739ae039)[Math.floor(Math.random() * (0, $39da3df97ab2d361$export$2e2bcd8739ae039).length)];
const $80103596bd80a7b3$var$inputEl = document.getElementById("opera-input");
const $80103596bd80a7b3$var$guessButton = document.getElementById("guess-button");
const $80103596bd80a7b3$var$selectedOperaEl = $80103596bd80a7b3$var$guessButton; // document.getElementById("selected-opera")!;
const $80103596bd80a7b3$var$scoreTemplate = document.getElementById("score-template");
function $80103596bd80a7b3$var$doGuess() {
    let guessedOpera = (0, $39da3df97ab2d361$export$2e2bcd8739ae039)[parseInt($80103596bd80a7b3$var$selectedOperaEl.dataset.refIndex)];
    let scoreRow = $80103596bd80a7b3$var$scoreTemplate.content.cloneNode(true);
    scoreRow.querySelector("h2").textContent = $80103596bd80a7b3$var$selectedOperaEl.textContent;
    let composerDist = (0, $ed998f6185713332$export$9f17032d917177de)((0, $39da3df97ab2d361$export$a3295358bff77e)($80103596bd80a7b3$var$targetOpera.composer), (0, $39da3df97ab2d361$export$a3295358bff77e)(guessedOpera.Composer));
    scoreRow.querySelector(".composer-score").textContent = composerDist.toString();
    document.body.appendChild(scoreRow);
    $80103596bd80a7b3$var$inputEl.value = "";
    $80103596bd80a7b3$var$fuse.removeAt(Number($80103596bd80a7b3$var$selectedOperaEl.dataset.refIndex));
    $80103596bd80a7b3$var$disableGuessBtn();
}
$80103596bd80a7b3$var$guessButton.onclick = $80103596bd80a7b3$var$doGuess;
$80103596bd80a7b3$var$inputEl.oninput = ()=>{
    $80103596bd80a7b3$var$selectedOperaEl.textContent = "";
    let input = $80103596bd80a7b3$var$inputEl.value;
    let [suggestion] = $80103596bd80a7b3$var$fuse.search((0, $39da3df97ab2d361$export$a3295358bff77e)(input), {
        limit: 1
    });
    if (suggestion) {
        $80103596bd80a7b3$var$guessButton.removeAttribute("disabled");
        let [{ indices: [indices] , key: key , value: value  }] = suggestion.matches;
        $80103596bd80a7b3$var$selectedOperaEl.dataset.refIndex = suggestion.refIndex.toString();
        if (key === "normalized") {
            let [before, match, after] = $80103596bd80a7b3$var$split(suggestion.item.title || "", indices);
            $80103596bd80a7b3$var$selectedOperaEl.appendChild(document.createTextNode(before));
            let strong = document.createElement("strong");
            strong.textContent = match;
            $80103596bd80a7b3$var$selectedOperaEl.appendChild(strong);
            $80103596bd80a7b3$var$selectedOperaEl.appendChild(document.createTextNode(after));
        } else $80103596bd80a7b3$var$selectedOperaEl.textContent = suggestion.item.title;
    } else $80103596bd80a7b3$var$disableGuessBtn();
};
function $80103596bd80a7b3$var$disableGuessBtn() {
    $80103596bd80a7b3$var$selectedOperaEl.textContent = "Unknown opera";
    $80103596bd80a7b3$var$guessButton.setAttribute("disabled", "disabled");
}
$80103596bd80a7b3$var$inputEl.onkeydown = (e)=>{
    if (e.key === "Enter") $80103596bd80a7b3$var$doGuess();
};
function $80103596bd80a7b3$var$split(title, indices) {
    let curr = 0;
    let result = [];
    for (const index of indices){
        result.push(title.substring(curr, index + 1));
        curr = index + 1;
    }
    result.push(title.substring(curr));
    return result;
}

})();
//# sourceMappingURL=index.99290f1d.js.map
