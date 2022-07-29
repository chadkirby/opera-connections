(function () {
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
/**
 * Fuse.js v6.6.2 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2022 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */ function $e6f0901d5580ff51$var$isArray(value) {
    return !Array.isArray ? $e6f0901d5580ff51$var$getTag(value) === "[object Array]" : Array.isArray(value);
}
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
const $e6f0901d5580ff51$var$INFINITY = 1 / 0;
function $e6f0901d5580ff51$var$baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") return value;
    let result = value + "";
    return result == "0" && 1 / value == -$e6f0901d5580ff51$var$INFINITY ? "-0" : result;
}
function $e6f0901d5580ff51$var$toString(value) {
    return value == null ? "" : $e6f0901d5580ff51$var$baseToString(value);
}
function $e6f0901d5580ff51$var$isString(value) {
    return typeof value === "string";
}
function $e6f0901d5580ff51$var$isNumber(value) {
    return typeof value === "number";
}
// Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
function $e6f0901d5580ff51$var$isBoolean(value) {
    return value === true || value === false || $e6f0901d5580ff51$var$isObjectLike(value) && $e6f0901d5580ff51$var$getTag(value) == "[object Boolean]";
}
function $e6f0901d5580ff51$var$isObject(value) {
    return typeof value === "object";
}
// Checks if `value` is object-like.
function $e6f0901d5580ff51$var$isObjectLike(value) {
    return $e6f0901d5580ff51$var$isObject(value) && value !== null;
}
function $e6f0901d5580ff51$var$isDefined(value) {
    return value !== undefined && value !== null;
}
function $e6f0901d5580ff51$var$isBlank(value) {
    return !value.trim().length;
}
// Gets the `toStringTag` of `value`.
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function $e6f0901d5580ff51$var$getTag(value) {
    return value == null ? value === undefined ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
const $e6f0901d5580ff51$var$EXTENDED_SEARCH_UNAVAILABLE = "Extended search is not available";
const $e6f0901d5580ff51$var$INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
const $e6f0901d5580ff51$var$LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key)=>`Invalid value for key ${key}`;
const $e6f0901d5580ff51$var$PATTERN_LENGTH_TOO_LARGE = (max)=>`Pattern length exceeds max of ${max}.`;
const $e6f0901d5580ff51$var$MISSING_KEY_PROPERTY = (name)=>`Missing ${name} property in key`;
const $e6f0901d5580ff51$var$INVALID_KEY_WEIGHT_VALUE = (key)=>`Property 'weight' in key '${key}' must be a positive integer`;
const $e6f0901d5580ff51$var$hasOwn = Object.prototype.hasOwnProperty;
class $e6f0901d5580ff51$var$KeyStore {
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
            let obj = $e6f0901d5580ff51$var$createKey(key);
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
function $e6f0901d5580ff51$var$createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
    let getFn = null;
    if ($e6f0901d5580ff51$var$isString(key) || $e6f0901d5580ff51$var$isArray(key)) {
        src = key;
        path = $e6f0901d5580ff51$var$createKeyPath(key);
        id = $e6f0901d5580ff51$var$createKeyId(key);
    } else {
        if (!$e6f0901d5580ff51$var$hasOwn.call(key, "name")) throw new Error($e6f0901d5580ff51$var$MISSING_KEY_PROPERTY("name"));
        const name = key.name;
        src = name;
        if ($e6f0901d5580ff51$var$hasOwn.call(key, "weight")) {
            weight = key.weight;
            if (weight <= 0) throw new Error($e6f0901d5580ff51$var$INVALID_KEY_WEIGHT_VALUE(name));
        }
        path = $e6f0901d5580ff51$var$createKeyPath(name);
        id = $e6f0901d5580ff51$var$createKeyId(name);
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
function $e6f0901d5580ff51$var$createKeyPath(key) {
    return $e6f0901d5580ff51$var$isArray(key) ? key : key.split(".");
}
function $e6f0901d5580ff51$var$createKeyId(key) {
    return $e6f0901d5580ff51$var$isArray(key) ? key.join(".") : key;
}
function $e6f0901d5580ff51$var$get(obj1, path1) {
    let list = [];
    let arr = false;
    const deepGet = (obj, path, index)=>{
        if (!$e6f0901d5580ff51$var$isDefined(obj)) return;
        if (!path[index]) // If there's no path left, we've arrived at the object we care about.
        list.push(obj);
        else {
            let key = path[index];
            const value = obj[key];
            if (!$e6f0901d5580ff51$var$isDefined(value)) return;
            // If we're at the last value in the path, and if it's a string/number/bool,
            // add it to the list
            if (index === path.length - 1 && ($e6f0901d5580ff51$var$isString(value) || $e6f0901d5580ff51$var$isNumber(value) || $e6f0901d5580ff51$var$isBoolean(value))) list.push($e6f0901d5580ff51$var$toString(value));
            else if ($e6f0901d5580ff51$var$isArray(value)) {
                arr = true;
                // Search each item in the array.
                for(let i = 0, len = value.length; i < len; i += 1)deepGet(value[i], path, index + 1);
            } else if (path.length) // An object. Recurse further.
            deepGet(value, path, index + 1);
        }
    };
    // Backwards compatibility (since path used to be a string)
    deepGet(obj1, $e6f0901d5580ff51$var$isString(path1) ? path1.split(".") : path1, 0);
    return arr ? list : list[0];
}
const $e6f0901d5580ff51$var$MatchOptions = {
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
const $e6f0901d5580ff51$var$BasicOptions = {
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
const $e6f0901d5580ff51$var$FuzzyOptions = {
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
const $e6f0901d5580ff51$var$AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: $e6f0901d5580ff51$var$get,
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
var $e6f0901d5580ff51$var$Config = {
    ...$e6f0901d5580ff51$var$BasicOptions,
    ...$e6f0901d5580ff51$var$MatchOptions,
    ...$e6f0901d5580ff51$var$FuzzyOptions,
    ...$e6f0901d5580ff51$var$AdvancedOptions
};
const $e6f0901d5580ff51$var$SPACE = /[^ ]+/g;
// Field-length norm: the shorter the field, the higher the weight.
// Set to 3 decimals to reduce index size.
function $e6f0901d5580ff51$var$norm(weight = 1, mantissa = 3) {
    const cache = new Map();
    const m = Math.pow(10, mantissa);
    return {
        get (value) {
            const numTokens = value.match($e6f0901d5580ff51$var$SPACE).length;
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
class $e6f0901d5580ff51$var$FuseIndex {
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
        if ($e6f0901d5580ff51$var$isString(this.docs[0])) this.docs.forEach((doc, docIndex)=>{
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
        if ($e6f0901d5580ff51$var$isString(doc)) this._addString(doc, idx);
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
        if (!$e6f0901d5580ff51$var$isDefined(doc) || $e6f0901d5580ff51$var$isBlank(doc)) return;
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
            if (!$e6f0901d5580ff51$var$isDefined(value)) return;
            if ($e6f0901d5580ff51$var$isArray(value)) {
                let subRecords = [];
                const stack = [
                    {
                        nestedArrIndex: -1,
                        value: value
                    }
                ];
                while(stack.length){
                    const { nestedArrIndex: nestedArrIndex , value: value  } = stack.pop();
                    if (!$e6f0901d5580ff51$var$isDefined(value)) continue;
                    if ($e6f0901d5580ff51$var$isString(value) && !$e6f0901d5580ff51$var$isBlank(value)) {
                        let subRecord = {
                            v: value,
                            i: nestedArrIndex,
                            n: this.norm.get(value)
                        };
                        subRecords.push(subRecord);
                    } else if ($e6f0901d5580ff51$var$isArray(value)) value.forEach((item, k)=>{
                        stack.push({
                            nestedArrIndex: k,
                            value: item
                        });
                    });
                }
                record.$[keyIndex] = subRecords;
            } else if ($e6f0901d5580ff51$var$isString(value) && !$e6f0901d5580ff51$var$isBlank(value)) {
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
    constructor({ getFn: getFn = $e6f0901d5580ff51$var$Config.getFn , fieldNormWeight: fieldNormWeight = $e6f0901d5580ff51$var$Config.fieldNormWeight  } = {}){
        this.norm = $e6f0901d5580ff51$var$norm(fieldNormWeight, 3);
        this.getFn = getFn;
        this.isCreated = false;
        this.setIndexRecords();
    }
}
function $e6f0901d5580ff51$var$createIndex(keys, docs, { getFn: getFn = $e6f0901d5580ff51$var$Config.getFn , fieldNormWeight: fieldNormWeight = $e6f0901d5580ff51$var$Config.fieldNormWeight  } = {}) {
    const myIndex = new $e6f0901d5580ff51$var$FuseIndex({
        getFn: getFn,
        fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys.map($e6f0901d5580ff51$var$createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
}
function $e6f0901d5580ff51$var$parseIndex(data, { getFn: getFn = $e6f0901d5580ff51$var$Config.getFn , fieldNormWeight: fieldNormWeight = $e6f0901d5580ff51$var$Config.fieldNormWeight  } = {}) {
    const { keys: keys , records: records  } = data;
    const myIndex = new $e6f0901d5580ff51$var$FuseIndex({
        getFn: getFn,
        fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
}
function $e6f0901d5580ff51$var$computeScore$1(pattern, { errors: errors = 0 , currentLocation: currentLocation = 0 , expectedLocation: expectedLocation = 0 , distance: distance = $e6f0901d5580ff51$var$Config.distance , ignoreLocation: ignoreLocation = $e6f0901d5580ff51$var$Config.ignoreLocation  } = {}) {
    const accuracy = errors / pattern.length;
    if (ignoreLocation) return accuracy;
    const proximity = Math.abs(expectedLocation - currentLocation);
    if (!distance) // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
    return accuracy + proximity / distance;
}
function $e6f0901d5580ff51$var$convertMaskToIndices(matchmask = [], minMatchCharLength = $e6f0901d5580ff51$var$Config.minMatchCharLength) {
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
const $e6f0901d5580ff51$var$MAX_BITS = 32;
function $e6f0901d5580ff51$var$search(text, pattern, patternAlphabet, { location: location = $e6f0901d5580ff51$var$Config.location , distance: distance = $e6f0901d5580ff51$var$Config.distance , threshold: threshold = $e6f0901d5580ff51$var$Config.threshold , findAllMatches: findAllMatches = $e6f0901d5580ff51$var$Config.findAllMatches , minMatchCharLength: minMatchCharLength = $e6f0901d5580ff51$var$Config.minMatchCharLength , includeMatches: includeMatches = $e6f0901d5580ff51$var$Config.includeMatches , ignoreLocation: ignoreLocation = $e6f0901d5580ff51$var$Config.ignoreLocation  } = {}) {
    if (pattern.length > $e6f0901d5580ff51$var$MAX_BITS) throw new Error($e6f0901d5580ff51$var$PATTERN_LENGTH_TOO_LARGE($e6f0901d5580ff51$var$MAX_BITS));
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
        let score = $e6f0901d5580ff51$var$computeScore$1(pattern, {
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
            const score = $e6f0901d5580ff51$var$computeScore$1(pattern, {
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
                finalScore = $e6f0901d5580ff51$var$computeScore$1(pattern, {
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
        const score = $e6f0901d5580ff51$var$computeScore$1(pattern, {
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
        const indices = $e6f0901d5580ff51$var$convertMaskToIndices(matchMask, minMatchCharLength);
        if (!indices.length) result.isMatch = false;
        else if (includeMatches) result.indices = indices;
    }
    return result;
}
function $e6f0901d5580ff51$var$createPatternAlphabet(pattern) {
    let mask = {};
    for(let i = 0, len = pattern.length; i < len; i += 1){
        const char = pattern.charAt(i);
        mask[char] = (mask[char] || 0) | 1 << len - i - 1;
    }
    return mask;
}
class $e6f0901d5580ff51$var$BitapSearch {
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
            const { isMatch: isMatch , score: score , indices: indices  } = $e6f0901d5580ff51$var$search(text, pattern, alphabet, {
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
    constructor(pattern1, { location: location = $e6f0901d5580ff51$var$Config.location , threshold: threshold = $e6f0901d5580ff51$var$Config.threshold , distance: distance = $e6f0901d5580ff51$var$Config.distance , includeMatches: includeMatches = $e6f0901d5580ff51$var$Config.includeMatches , findAllMatches: findAllMatches = $e6f0901d5580ff51$var$Config.findAllMatches , minMatchCharLength: minMatchCharLength = $e6f0901d5580ff51$var$Config.minMatchCharLength , isCaseSensitive: isCaseSensitive = $e6f0901d5580ff51$var$Config.isCaseSensitive , ignoreLocation: ignoreLocation = $e6f0901d5580ff51$var$Config.ignoreLocation  } = {}){
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
                alphabet: $e6f0901d5580ff51$var$createPatternAlphabet(pattern),
                startIndex: startIndex
            });
        };
        const len = this.pattern.length;
        if (len > $e6f0901d5580ff51$var$MAX_BITS) {
            let i = 0;
            const remainder = len % $e6f0901d5580ff51$var$MAX_BITS;
            const end = len - remainder;
            while(i < end){
                addChunk(this.pattern.substr(i, $e6f0901d5580ff51$var$MAX_BITS), i);
                i += $e6f0901d5580ff51$var$MAX_BITS;
            }
            if (remainder) {
                const startIndex = len - $e6f0901d5580ff51$var$MAX_BITS;
                addChunk(this.pattern.substr(startIndex), startIndex);
            }
        } else addChunk(this.pattern, 0);
    }
}
class $e6f0901d5580ff51$var$BaseMatch {
    static isMultiMatch(pattern) {
        return $e6f0901d5580ff51$var$getMatch(pattern, this.multiRegex);
    }
    static isSingleMatch(pattern) {
        return $e6f0901d5580ff51$var$getMatch(pattern, this.singleRegex);
    }
    search() {}
    constructor(pattern){
        this.pattern = pattern;
    }
}
function $e6f0901d5580ff51$var$getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null;
}
// Token: 'file
class $e6f0901d5580ff51$var$ExactMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
class $e6f0901d5580ff51$var$InverseExactMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
class $e6f0901d5580ff51$var$PrefixExactMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
class $e6f0901d5580ff51$var$InversePrefixExactMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
class $e6f0901d5580ff51$var$SuffixExactMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
class $e6f0901d5580ff51$var$InverseSuffixExactMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
class $e6f0901d5580ff51$var$FuzzyMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
    constructor(pattern, { location: location = $e6f0901d5580ff51$var$Config.location , threshold: threshold = $e6f0901d5580ff51$var$Config.threshold , distance: distance = $e6f0901d5580ff51$var$Config.distance , includeMatches: includeMatches = $e6f0901d5580ff51$var$Config.includeMatches , findAllMatches: findAllMatches = $e6f0901d5580ff51$var$Config.findAllMatches , minMatchCharLength: minMatchCharLength = $e6f0901d5580ff51$var$Config.minMatchCharLength , isCaseSensitive: isCaseSensitive = $e6f0901d5580ff51$var$Config.isCaseSensitive , ignoreLocation: ignoreLocation = $e6f0901d5580ff51$var$Config.ignoreLocation  } = {}){
        super(pattern);
        this._bitapSearch = new $e6f0901d5580ff51$var$BitapSearch(pattern, {
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
class $e6f0901d5580ff51$var$IncludeMatch extends $e6f0901d5580ff51$var$BaseMatch {
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
const $e6f0901d5580ff51$var$searchers = [
    $e6f0901d5580ff51$var$ExactMatch,
    $e6f0901d5580ff51$var$IncludeMatch,
    $e6f0901d5580ff51$var$PrefixExactMatch,
    $e6f0901d5580ff51$var$InversePrefixExactMatch,
    $e6f0901d5580ff51$var$InverseSuffixExactMatch,
    $e6f0901d5580ff51$var$SuffixExactMatch,
    $e6f0901d5580ff51$var$InverseExactMatch,
    $e6f0901d5580ff51$var$FuzzyMatch
];
const $e6f0901d5580ff51$var$searchersLen = $e6f0901d5580ff51$var$searchers.length;
// Regex to split by spaces, but keep anything in quotes together
const $e6f0901d5580ff51$var$SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
const $e6f0901d5580ff51$var$OR_TOKEN = "|";
// Return a 2D array representation of the query, for simpler parsing.
// Example:
// "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
function $e6f0901d5580ff51$var$parseQuery(pattern, options = {}) {
    return pattern.split($e6f0901d5580ff51$var$OR_TOKEN).map((item1)=>{
        let query = item1.trim().split($e6f0901d5580ff51$var$SPACE_RE).filter((item)=>item && !!item.trim());
        let results = [];
        for(let i = 0, len = query.length; i < len; i += 1){
            const queryItem = query[i];
            // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
            let found = false;
            let idx = -1;
            while(!found && ++idx < $e6f0901d5580ff51$var$searchersLen){
                const searcher = $e6f0901d5580ff51$var$searchers[idx];
                let token = searcher.isMultiMatch(queryItem);
                if (token) {
                    results.push(new searcher(token, options));
                    found = true;
                }
            }
            if (found) continue;
            // 2. Handle single query matches (i.e, once that are *not* quoted)
            idx = -1;
            while(++idx < $e6f0901d5580ff51$var$searchersLen){
                const searcher = $e6f0901d5580ff51$var$searchers[idx];
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
const $e6f0901d5580ff51$var$MultiMatchSet = new Set([
    $e6f0901d5580ff51$var$FuzzyMatch.type,
    $e6f0901d5580ff51$var$IncludeMatch.type
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
 */ class $e6f0901d5580ff51$var$ExtendedSearch {
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
                        if ($e6f0901d5580ff51$var$MultiMatchSet.has(type)) allIndices = [
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
    constructor(pattern, { isCaseSensitive: isCaseSensitive = $e6f0901d5580ff51$var$Config.isCaseSensitive , includeMatches: includeMatches = $e6f0901d5580ff51$var$Config.includeMatches , minMatchCharLength: minMatchCharLength = $e6f0901d5580ff51$var$Config.minMatchCharLength , ignoreLocation: ignoreLocation = $e6f0901d5580ff51$var$Config.ignoreLocation , findAllMatches: findAllMatches = $e6f0901d5580ff51$var$Config.findAllMatches , location: location = $e6f0901d5580ff51$var$Config.location , threshold: threshold = $e6f0901d5580ff51$var$Config.threshold , distance: distance = $e6f0901d5580ff51$var$Config.distance  } = {}){
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
        this.query = $e6f0901d5580ff51$var$parseQuery(this.pattern, this.options);
    }
}
const $e6f0901d5580ff51$var$registeredSearchers = [];
function $e6f0901d5580ff51$var$register(...args) {
    $e6f0901d5580ff51$var$registeredSearchers.push(...args);
}
function $e6f0901d5580ff51$var$createSearcher(pattern, options) {
    for(let i = 0, len = $e6f0901d5580ff51$var$registeredSearchers.length; i < len; i += 1){
        let searcherClass = $e6f0901d5580ff51$var$registeredSearchers[i];
        if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
    }
    return new $e6f0901d5580ff51$var$BitapSearch(pattern, options);
}
const $e6f0901d5580ff51$var$LogicalOperator = {
    AND: "$and",
    OR: "$or"
};
const $e6f0901d5580ff51$var$KeyType = {
    PATH: "$path",
    PATTERN: "$val"
};
const $e6f0901d5580ff51$var$isExpression = (query)=>!!(query[$e6f0901d5580ff51$var$LogicalOperator.AND] || query[$e6f0901d5580ff51$var$LogicalOperator.OR]);
const $e6f0901d5580ff51$var$isPath = (query)=>!!query[$e6f0901d5580ff51$var$KeyType.PATH];
const $e6f0901d5580ff51$var$isLeaf = (query)=>!$e6f0901d5580ff51$var$isArray(query) && $e6f0901d5580ff51$var$isObject(query) && !$e6f0901d5580ff51$var$isExpression(query);
const $e6f0901d5580ff51$var$convertToExplicit = (query)=>({
        [$e6f0901d5580ff51$var$LogicalOperator.AND]: Object.keys(query).map((key)=>({
                [key]: query[key]
            }))
    });
// When `auto` is `true`, the parse function will infer and initialize and add
// the appropriate `Searcher` instance
function $e6f0901d5580ff51$var$parse(query1, options, { auto: auto = true  } = {}) {
    const next = (query)=>{
        let keys = Object.keys(query);
        const isQueryPath = $e6f0901d5580ff51$var$isPath(query);
        if (!isQueryPath && keys.length > 1 && !$e6f0901d5580ff51$var$isExpression(query)) return next($e6f0901d5580ff51$var$convertToExplicit(query));
        if ($e6f0901d5580ff51$var$isLeaf(query)) {
            const key = isQueryPath ? query[$e6f0901d5580ff51$var$KeyType.PATH] : keys[0];
            const pattern = isQueryPath ? query[$e6f0901d5580ff51$var$KeyType.PATTERN] : query[key];
            if (!$e6f0901d5580ff51$var$isString(pattern)) throw new Error($e6f0901d5580ff51$var$LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
            const obj = {
                keyId: $e6f0901d5580ff51$var$createKeyId(key),
                pattern: pattern
            };
            if (auto) obj.searcher = $e6f0901d5580ff51$var$createSearcher(pattern, options);
            return obj;
        }
        let node = {
            children: [],
            operator: keys[0]
        };
        keys.forEach((key)=>{
            const value = query[key];
            if ($e6f0901d5580ff51$var$isArray(value)) value.forEach((item)=>{
                node.children.push(next(item));
            });
        });
        return node;
    };
    if (!$e6f0901d5580ff51$var$isExpression(query1)) query1 = $e6f0901d5580ff51$var$convertToExplicit(query1);
    return next(query1);
}
// Practical scoring function
function $e6f0901d5580ff51$var$computeScore(results, { ignoreFieldNorm: ignoreFieldNorm = $e6f0901d5580ff51$var$Config.ignoreFieldNorm  }) {
    results.forEach((result)=>{
        let totalScore = 1;
        result.matches.forEach(({ key: key , norm: norm2 , score: score  })=>{
            const weight = key ? key.weight : null;
            totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
        });
        result.score = totalScore;
    });
}
function $e6f0901d5580ff51$var$transformMatches(result, data) {
    const matches = result.matches;
    data.matches = [];
    if (!$e6f0901d5580ff51$var$isDefined(matches)) return;
    matches.forEach((match)=>{
        if (!$e6f0901d5580ff51$var$isDefined(match.indices) || !match.indices.length) return;
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
function $e6f0901d5580ff51$var$transformScore(result, data) {
    data.score = result.score;
}
function $e6f0901d5580ff51$var$format(results, docs, { includeMatches: includeMatches = $e6f0901d5580ff51$var$Config.includeMatches , includeScore: includeScore = $e6f0901d5580ff51$var$Config.includeScore  } = {}) {
    const transformers = [];
    if (includeMatches) transformers.push($e6f0901d5580ff51$var$transformMatches);
    if (includeScore) transformers.push($e6f0901d5580ff51$var$transformScore);
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
class $e6f0901d5580ff51$export$2e2bcd8739ae039 {
    setCollection(docs, index) {
        this._docs = docs;
        if (index && !(index instanceof $e6f0901d5580ff51$var$FuseIndex)) throw new Error($e6f0901d5580ff51$var$INCORRECT_INDEX_TYPE);
        this._myIndex = index || $e6f0901d5580ff51$var$createIndex(this.options.keys, this._docs, {
            getFn: this.options.getFn,
            fieldNormWeight: this.options.fieldNormWeight
        });
    }
    add(doc) {
        if (!$e6f0901d5580ff51$var$isDefined(doc)) return;
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
        let results = $e6f0901d5580ff51$var$isString(query) ? $e6f0901d5580ff51$var$isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        $e6f0901d5580ff51$var$computeScore(results, {
            ignoreFieldNorm: ignoreFieldNorm
        });
        if (shouldSort) results.sort(sortFn);
        if ($e6f0901d5580ff51$var$isNumber(limit) && limit > -1) results = results.slice(0, limit);
        return $e6f0901d5580ff51$var$format(results, this._docs, {
            includeMatches: includeMatches,
            includeScore: includeScore
        });
    }
    _searchStringList(query) {
        const searcher = $e6f0901d5580ff51$var$createSearcher(query, this.options);
        const { records: records  } = this._myIndex;
        const results = [];
        // Iterate over every string in the index
        records.forEach(({ v: text , i: idx , n: norm3  })=>{
            if (!$e6f0901d5580ff51$var$isDefined(text)) return;
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
        const expression = $e6f0901d5580ff51$var$parse(query, this.options);
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
                else if (node.operator === $e6f0901d5580ff51$var$LogicalOperator.AND) return [];
            }
            return res;
        };
        const records = this._myIndex.records;
        const resultMap = {};
        const results = [];
        records.forEach(({ $: item , i: idx  })=>{
            if ($e6f0901d5580ff51$var$isDefined(item)) {
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
        const searcher = $e6f0901d5580ff51$var$createSearcher(query, this.options);
        const { keys: keys , records: records  } = this._myIndex;
        const results = [];
        // List is Array<Object>
        records.forEach(({ $: item , i: idx  })=>{
            if (!$e6f0901d5580ff51$var$isDefined(item)) return;
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
        if (!$e6f0901d5580ff51$var$isDefined(value)) return [];
        let matches = [];
        if ($e6f0901d5580ff51$var$isArray(value)) value.forEach(({ v: text , i: idx , n: norm4  })=>{
            if (!$e6f0901d5580ff51$var$isDefined(text)) return;
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
            ...$e6f0901d5580ff51$var$Config,
            ...options
        };
        this.options.useExtendedSearch;
        this._keyStore = new $e6f0901d5580ff51$var$KeyStore(this.options.keys);
        this.setCollection(docs, index);
    }
}
$e6f0901d5580ff51$export$2e2bcd8739ae039.version = "6.6.2";
$e6f0901d5580ff51$export$2e2bcd8739ae039.createIndex = $e6f0901d5580ff51$var$createIndex;
$e6f0901d5580ff51$export$2e2bcd8739ae039.parseIndex = $e6f0901d5580ff51$var$parseIndex;
$e6f0901d5580ff51$export$2e2bcd8739ae039.config = $e6f0901d5580ff51$var$Config;
$e6f0901d5580ff51$export$2e2bcd8739ae039.parseQuery = $e6f0901d5580ff51$var$parse;
$e6f0901d5580ff51$var$register($e6f0901d5580ff51$var$ExtendedSearch);


var $b8ebf9cc3dfaa67d$exports = {};
/*!
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 Mykhailo Stadnyk <mikhus@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @version 2.1.7
 */ !function(e1) {
    "use strict";
    function t1(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }
    function i1(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }
    function r1(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    function n1(e, t) {
        if (t || (t = "undefined" == typeof window ? $parcel$global : window), void 0 !== t[e]) return t[e];
        for(var i = [
            "webkit",
            "moz",
            "ms",
            "o"
        ], r = 0, n = i.length, o = e.charAt(0).toUpperCase() + e.substr(1); r < n; r++){
            var a = t[i[r] + o];
            if (void 0 !== a) return a;
        }
        return null;
    }
    function o1(e2, t, i, r, n, a, l) {
        if ("function" != typeof r) throw new TypeError("Invalid animation rule:", r);
        var s = e2 - i, d = s / n, u = 0;
        d > 1 && (d = 1), 1 !== d && (u = r(d), isFinite(u) && !isNaN(u) && (d = u)), t && t(d), s < n ? l.frame = U(function(e) {
            return o1(e, t, i, r, n, a, l);
        }) : (a && a(), l.inProgress = !1);
    }
    function a1() {
        Array.prototype.constructor.apply(this, arguments);
    }
    function l1(e) {
        if (!(e instanceof DOMException && 2152923147 === e.result)) throw e;
    }
    function s1(e, t2) {
        return t2.replace(ee, function(t, i) {
            var r = e[i];
            return void 0 !== r ? r : t;
        });
    }
    function d1(e) {
        return e.majorTicks instanceof Array || (e.majorTicks = e.majorTicks ? [
            e.majorTicks
        ] : []), e.majorTicks.length || (e.majorTicks.push(te.formatMajorTickNumber(e.minValue, e)), e.majorTicks.push(te.formatMajorTickNumber(e.maxValue, e))), [
            "right" !== e.tickSide,
            "left" !== e.tickSide
        ];
    }
    function u1(e, t, i, r, n, o) {
        e.beginPath(), e.moveTo(t + o, i), e.lineTo(t + r - o, i), e.quadraticCurveTo(t + r, i, t + r, i + o), e.lineTo(t + r, i + n - o), e.quadraticCurveTo(t + r, i + n, t + r - o, i + n), e.lineTo(t + o, i + n), e.quadraticCurveTo(t, i + n, t, i + n - o), e.lineTo(t, i + o), e.quadraticCurveTo(t, i, t + o, i), e.closePath();
    }
    function c1(e, t) {
        var i = t.valueDec, r = t.valueInt, n = 0, o = void 0, a = void 0, l = void 0;
        if (e = parseFloat(e), l = e < 0, e = Math.abs(e), i > 0) {
            for(a = e.toFixed(i).toString().split("."), o = r - a[0].length; n < o; ++n)a[0] = "0" + a[0];
            a = (l ? "-" : "") + a[0] + "." + a[1];
        } else {
            for(a = Math.round(e).toString(), o = r - a.length; n < o; ++n)a = "0" + a;
            a = (l ? "-" : "") + a;
        }
        return a;
    }
    function h1(e, t) {
        var i = void 0, r = !1;
        return i = 0 === t.majorTicksDec ? Math.round(e).toString() : e.toFixed(t.majorTicksDec), t.majorTicksInt > 1 ? (r = ~i.indexOf("."), ~i.indexOf("-") ? "-" + [
            t.majorTicksInt + t.majorTicksDec + 2 + (r ? 1 : 0) - i.length
        ].join("0") + i.replace("-", "") : [
            t.majorTicksInt + t.majorTicksDec + 1 + (r ? 1 : 0) - i.length
        ].join("0") + i) : i;
    }
    function f1(e) {
        return e * Math.PI / 180;
    }
    function v1(e, t) {
        return {
            x: -e * Math.sin(t),
            y: e * Math.cos(t)
        };
    }
    function m1(e, t, i, r) {
        var n = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0, a = e.createLinearGradient(n ? 0 : o, n ? o : 0, n ? 0 : r, n ? r : 0);
        return a.addColorStop(0, t), a.addColorStop(1, i), a;
    }
    function g1(e, t) {
        if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2]) return e.restore(), !0;
        e.save();
        var i = t.borderShadowWidth;
        return i && (e.shadowBlur = i, e.shadowColor = t.colorBorderShadow), !0;
    }
    function p1(e, t) {
        t.needleShadow && (e.shadowOffsetX = 2, e.shadowOffsetY = 2, e.shadowBlur = 10, e.shadowColor = t.colorNeedleShadowDown);
    }
    function w(e, t, i) {
        return e["font" + t + "Style"] + " " + e["font" + t + "Weight"] + " " + e["font" + t + "Size"] * i + "px " + e["font" + t];
    }
    function b(e) {
        e.shadowOffsetX = null, e.shadowOffsetY = null, e.shadowBlur = null, e.shadowColor = "", e.strokeStyle = null, e.lineWidth = 0, e.save();
    }
    function y(e, t, i, r) {
        t.valueTextShadow && (e.shadowOffsetX = i, e.shadowOffsetY = i, e.shadowBlur = r, e.shadowColor = t.colorValueTextShadow);
    }
    function x1(e3, t, i, r, n, o) {
        if (t.valueBox) {
            b(e3);
            var a = t.valueDec ? 1 + t.valueDec : 0, l = "9".repeat(Math.max.apply(null, [
                String(parseInt(i)).length + a
            ].concat(t.majorTicks.map(function(e) {
                return String(parseInt(e, 10)).length + a;
            })))), s = t.valueText || c1(i, t), d = o / 200, h = o / 100, f = .4 * h, v = 1.2 * h;
            e3.font = w(t, "Value", d), y(e3, t, f, v);
            var m = e3.measureText(t.valueText ? s : "-" + c1(Number(l), t)).width;
            b(e3);
            var g = parseFloat(t.fontValueSize) * d + f + v, p = h * parseFloat(t.valueBoxStroke), x = 2 * o - 2 * p, k = m + 10 * h, T = 1.1 * g + f + v, S = h * t.valueBoxBorderRadius, O = (parseFloat(t.valueBoxWidth) || 0) / 100 * x;
            O > k && (k = O), k > x && (k = x);
            var A = r - k / 2, V = n - T / 2, C = n - 5.75 * h;
            if (e3.beginPath(), S ? u1(e3, A, V, k, T, S) : e3.rect(A, V, k, T), p) {
                var P = e3.createRadialGradient(r, C, 10 * h, r, C, 20 * h);
                P.addColorStop(0, t.colorValueBoxRect), P.addColorStop(1, t.colorValueBoxRectEnd), e3.strokeStyle = P, e3.lineWidth = p, e3.stroke();
            }
            t.colorValueBoxShadow && (e3.shadowBlur = 1.2 * h, e3.shadowColor = t.colorValueBoxShadow), t.colorValueBoxBackground && (e3.fillStyle = t.colorValueBoxBackground, e3.fill()), e3.closePath(), e3.restore(), y(e3, t, f, v), e3.fillStyle = t.colorValueText, e3.textAlign = "center", e3.textBaseline = "alphabetic", e3.fillText(s, A + k / 2, n + T / 2 - g / 3), e3.restore();
        }
    }
    function k1(e) {
        var t = e.value, i = e.minValue, r = e.maxValue, n = .01 * (r - i);
        return {
            normal: t < i ? i : t > r ? r : t,
            indented: t < i ? i - n : t > r ? r + n : t
        };
    }
    function T1(e, t, i, r, n) {
        i.beginPath(), i.arc(0, 0, $(e), 0, 2 * ie, !0), i.lineWidth = t, i.strokeStyle = n ? te.linearGradient(i, r, n, e) : r, i.stroke(), i.closePath();
    }
    function S1(e, t) {
        var i = H.pixelRatio;
        return e.maxRadius || (e.maxRadius = e.max - t.borderShadowWidth - t.borderOuterWidth * i - t.borderMiddleWidth * i - t.borderInnerWidth * i + (t.borderOuterWidth ? .5 : 0) + (t.borderMiddleWidth ? .5 : 0) + (t.borderInnerWidth ? .5 : 0)), e.maxRadius;
    }
    function O1(e, t) {
        var i = H.pixelRatio, r = t.borderShadowWidth * i, n = e.max - r - t.borderOuterWidth * i / 2, o = n - t.borderOuterWidth * i / 2 - t.borderMiddleWidth * i / 2 + .5, a = o - t.borderMiddleWidth * i / 2 - t.borderInnerWidth * i / 2 + .5, l = S1(e, t), s = void 0, d = !1;
        e.save(), t.borderOuterWidth && (d = te.drawShadow(e, t, d), T1(n, t.borderOuterWidth * i, e, t.colorBorderOuter, t.colorBorderOuterEnd)), t.borderMiddleWidth && (d = te.drawShadow(e, t, d), T1(o, t.borderMiddleWidth * i, e, t.colorBorderMiddle, t.colorBorderMiddleEnd)), t.borderInnerWidth && (d = te.drawShadow(e, t, d), T1(a, t.borderInnerWidth * i, e, t.colorBorderInner, t.colorBorderInnerEnd)), te.drawShadow(e, t, d), e.beginPath(), e.arc(0, 0, $(l), 0, 2 * ie, !0), t.colorPlateEnd ? (s = e.createRadialGradient(0, 0, l / 2, 0, 0, l), s.addColorStop(0, t.colorPlate), s.addColorStop(1, t.colorPlateEnd)) : s = t.colorPlate, e.fillStyle = s, e.fill(), e.closePath(), e.restore();
    }
    function A1(e, t) {
        var i = e.max * (parseFloat(t.highlightsWidth) || 0) / 100;
        if (i) {
            var r = $(C1(e, t) - i / 2), n = 0, o = t.highlights.length, a = (t.maxValue - t.minValue) / t.ticksAngle;
            for(e.save(); n < o; n++){
                var l = t.highlights[n];
                e.beginPath(), e.rotate(re), e.arc(0, 0, r, te.radians(t.startAngle + (l.from - t.minValue) / a), te.radians(t.startAngle + (l.to - t.minValue) / a), !1), e.strokeStyle = l.color, e.lineWidth = i, e.lineCap = t.highlightsLineCap, e.stroke(), e.closePath(), e.restore(), e.save();
            }
        }
    }
    function V1(e, t) {
        var i = C1(e, t), r = void 0, n = void 0, o = void 0, a = 0, l = 0, s = Math.abs(t.minorTicks) || 0, d = t.ticksAngle / (t.maxValue - t.minValue);
        for(e.lineWidth = H.pixelRatio, e.strokeStyle = t.colorMinorTicks || t.colorStrokeTicks, e.save(), t.exactTicks ? (n = t.maxValue - t.minValue, r = s ? n / s : 0, l = (Q.mod(t.majorTicks[0], s) || 0) * d) : r = s * (t.majorTicks.length - 1); a < r; ++a)(o = t.startAngle + l + a * (t.ticksAngle / r)) <= t.ticksAngle + t.startAngle && (e.rotate(te.radians(o)), e.beginPath(), e.moveTo(0, i), e.lineTo(0, i - .075 * e.max), j(e));
    }
    function C1(e, t) {
        var i = e.max / 100;
        return S1(e, t) - 5 * i - (t.barWidth ? 2 * (parseFloat(t.barStrokeWidth) || 0) + ((parseFloat(t.barWidth) || 0) + 5) * i : 0);
    }
    function P1(e, t) {
        te.prepareTicks(t);
        var i = $(C1(e, t)), r = void 0, n = void 0, o = t.majorTicks.length, a = H.pixelRatio;
        for(e.lineWidth = 2 * a, e.save(), n = t.colorMajorTicks instanceof Array ? t.colorMajorTicks : new Array(o).fill(t.colorStrokeTicks || t.colorMajorTicks), r = 0; r < o; ++r)e.strokeStyle = n[r], e.rotate(te.radians(N(t, t.exactTicks ? t.majorTicks[r] : r, o))), e.beginPath(), e.moveTo(0, i), e.lineTo(0, i - .15 * e.max), j(e);
        t.strokeTicks && (e.strokeStyle = t.colorStrokeTicks || n[0], e.rotate(re), e.beginPath(), e.arc(0, 0, i, te.radians(t.startAngle), te.radians(t.startAngle + t.ticksAngle), !1), j(e));
    }
    function N(e, t, i) {
        if (e.exactTicks) {
            var r = e.ticksAngle / (e.maxValue - e.minValue);
            return e.startAngle + r * (t - e.minValue);
        }
        return e.startAngle + t * (e.ticksAngle / (i - 1));
    }
    function j(e) {
        e.stroke(), e.restore(), e.closePath(), e.save();
    }
    function M(e, t) {
        var i = C1(e, t) - .15 * e.max, r = {}, n = 0, o = t.majorTicks.length, a = "needle" !== t.animationTarget, l = t.colorNumbers instanceof Array ? t.colorNumbers : new Array(o).fill(t.colorNumbers), s = a ? -(t.value - t.minValue) / (t.maxValue - t.minValue) * t.ticksAngle : 0;
        for(a && (e.save(), e.rotate(-te.radians(s))), e.font = te.font(t, "Numbers", e.max / 200), e.lineWidth = 0, e.textAlign = "center", e.textBaseline = "middle"; n < o; ++n){
            var d = s + N(t, t.exactTicks ? t.majorTicks[n] : n, o), u = e.measureText(t.majorTicks[n]).width, c = t.fontNumbersSize, h = Math.sqrt(u * u + c * c) / 2, f = te.radialPoint(i - h - t.numbersMargin / 100 * e.max, te.radians(d));
            360 === d && (d = 0), r[d] || (r[d] = !0, e.fillStyle = l[n], e.fillText(t.majorTicks[n], f.x, f.y));
        }
        a && e.restore();
    }
    function B(e, t) {
        t.title && (e.save(), e.font = te.font(t, "Title", e.max / 200), e.fillStyle = t.colorTitle, e.textAlign = "center", e.fillText(t.title, 0, -e.max / 4.25, .8 * e.max), e.restore());
    }
    function W(e, t) {
        t.units && (e.save(), e.font = te.font(t, "Units", e.max / 200), e.fillStyle = t.colorUnits, e.textAlign = "center", e.fillText(te.formatContext(t, t.units), 0, e.max / 3.25, .8 * e.max), e.restore());
    }
    function _(e, t) {
        if (t.needle) {
            var i = t.ticksAngle < 360 ? te.normalizedValue(t).indented : t.value, r = h ? t.startAngle : t.startAngle + (i - t.minValue) / (t.maxValue - t.minValue) * t.ticksAngle;
            "right" === t.barStartPosition && (r = t.startAngle + t.ticksAngle - (i - t.minValue) / (t.maxValue - t.minValue) * t.ticksAngle);
            var n = S1(e, t), o = $(n / 100 * t.needleCircleSize), a = $(n / 100 * t.needleCircleSize * .75), l = $(n / 100 * t.needleEnd), s = $(t.needleStart ? n / 100 * t.needleStart : 0), d = n / 100 * t.needleWidth, u = n / 100 * t.needleWidth / 2, c = H.pixelRatio, h = "needle" !== t.animationTarget;
            e.save(), te.drawNeedleShadow(e, t), e.rotate(te.radians(r)), e.fillStyle = te.linearGradient(e, t.colorNeedle, t.colorNeedleEnd, l - s), "arrow" === t.needleType ? (e.beginPath(), e.moveTo(-u, -s), e.lineTo(-d, 0), e.lineTo(-1 * c, l), e.lineTo(c, l), e.lineTo(d, 0), e.lineTo(u, -s), e.closePath(), e.fill(), e.beginPath(), e.lineTo(-0.5 * c, l), e.lineTo(-1 * c, l), e.lineTo(-d, 0), e.lineTo(-u, -s), e.lineTo(u / 2 * c - 2 * c, -s), e.closePath(), e.fillStyle = t.colorNeedleShadowUp, e.fill()) : (e.beginPath(), e.moveTo(-u, l), e.lineTo(-u, s), e.lineTo(u, s), e.lineTo(u, l), e.closePath(), e.fill()), t.needleCircleSize && (e.restore(), te.drawNeedleShadow(e, t), t.needleCircleOuter && (e.beginPath(), e.arc(0, 0, o, 0, 2 * ie, !0), e.fillStyle = te.linearGradient(e, t.colorNeedleCircleOuter, t.colorNeedleCircleOuterEnd, o), e.fill(), e.closePath()), t.needleCircleInner && (e.beginPath(), e.arc(0, 0, a, 0, 2 * ie, !0), e.fillStyle = te.linearGradient(e, t.colorNeedleCircleInner, t.colorNeedleCircleInnerEnd, a), e.fill(), e.closePath()), e.restore());
        }
    }
    function E(e, t, i) {
        te.drawValueBox(e, t, i, 0, e.max - .33 * e.max, e.max);
    }
    function R(e) {
        var t = e.startAngle, i = e.startAngle + e.ticksAngle, r = t, n = t + (te.normalizedValue(e).normal - e.minValue) / (e.maxValue - e.minValue) * e.ticksAngle;
        if ("middle" === e.barStartPosition) {
            var o = .5 * (e.minValue + e.maxValue);
            e.value < o ? (r = 180 - (o - te.normalizedValue(e).normal) / (e.maxValue - e.minValue) * e.ticksAngle, n = 180) : (r = 180, n = 180 + (te.normalizedValue(e).normal - o) / (e.maxValue - e.minValue) * e.ticksAngle);
        } else "right" === e.barStartPosition && (r = i - n + t, n = i);
        return {
            startAngle: r,
            endAngle: n
        };
    }
    function I(e, t) {
        var i = e.max / 100, r = S1(e, t) - 5 * i, n = parseFloat(t.barStrokeWidth + "") || 0, o = (parseFloat(t.barWidth + "") || 0) * i, a = r - 2 * n - o, l = (r - a) / 2, s = a + l, d = n / s, u = t.startAngle, c = t.startAngle + t.ticksAngle;
        if (e.save(), e.rotate(re), n && (e.beginPath(), e.arc(0, 0, s, te.radians(u) - d, te.radians(c) + d, !1), e.strokeStyle = t.colorBarStroke, e.lineWidth = 2 * l, e.stroke(), e.closePath()), o && (e.beginPath(), e.arc(0, 0, s, te.radians(u), te.radians(c), !1), e.strokeStyle = t.colorBar, e.lineWidth = o, e.stroke(), e.closePath(), t.barShadow && (e.beginPath(), e.arc(0, 0, r, te.radians(u), te.radians(c), !1), e.clip(), e.beginPath(), e.strokeStyle = t.colorBar, e.lineWidth = 1, e.shadowBlur = t.barShadow, e.shadowColor = t.colorBarShadow, e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.arc(0, 0, r, te.radians(t.startAngle), te.radians(t.startAngle + t.ticksAngle), !1), e.stroke(), e.closePath(), e.restore(), e.rotate(re)), t.barProgress)) {
            var h = R(t), f = h.startAngle, v = h.endAngle;
            e.beginPath(), e.arc(0, 0, s, te.radians(f), te.radians(v), !1), e.strokeStyle = t.colorBarProgress, e.lineWidth = o, e.stroke(), e.closePath();
        }
        e.restore();
    }
    function z(e) {
        return e.options.animatedValue ? e.options.value : e.value;
    }
    var D = function e(t, i, r) {
        null === t && (t = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(t, i);
        if (void 0 === n) {
            var o = Object.getPrototypeOf(t);
            return null === o ? void 0 : e(o, i, r);
        }
        if ("value" in n) return n.value;
        var a = n.get;
        if (void 0 !== a) return a.call(r);
    }, F = function e(t, i, r, n) {
        var o = Object.getOwnPropertyDescriptor(t, i);
        if (void 0 === o) {
            var a = Object.getPrototypeOf(t);
            null !== a && e(a, i, r, n);
        } else if ("value" in o && o.writable) o.value = r;
        else {
            var l = o.set;
            void 0 !== l && l.call(n, r);
        }
        return r;
    }, G = function() {
        function e4(e, t) {
            for(var i = 0; i < t.length; i++){
                var r = t[i];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
        }
        return function(t, i, r) {
            return i && e4(t.prototype, i), r && e4(t, r), t;
        };
    }();
    Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for(var i = Object(e), r = 1; r < arguments.length; r++){
                var n = arguments[r];
                if (void 0 !== n && null !== n) for(var o = Object.keys(Object(n)), a = 0, l = o.length; a < l; a++){
                    var s = o[a], d = Object.getOwnPropertyDescriptor(n, s);
                    void 0 !== d && d.enumerable && (i[s] = n[s]);
                }
            }
            return i;
        }
    }), Array.prototype.indexOf || Object.defineProperty(Array.prototype, "indexOf", {
        value: function(e, t) {
            var i;
            if (null === this) throw new TypeError('"this" is null or not defined');
            var r = Object(this), n = r.length >>> 0;
            if (0 === n) return -1;
            var o = +t || 0;
            if (Math.abs(o) === 1 / 0 && (o = 0), o >= n) return -1;
            for(i = Math.max(o >= 0 ? o : n - Math.abs(o), 0); i < n;){
                if (i in r && r[i] === e) return i;
                i++;
            }
            return -1;
        }
    }), Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
        value: function(e) {
            if (null === this) throw new TypeError("this is null or not defined");
            for(var t = Object(this), i = t.length >>> 0, r = arguments[1], n = r >> 0, o = n < 0 ? Math.max(i + n, 0) : Math.min(n, i), a = arguments[2], l = void 0 === a ? i : a >> 0, s = l < 0 ? Math.max(i + l, 0) : Math.min(l, i); o < s;)t[o] = e, o++;
            return t;
        }
    }), "undefined" == typeof window && (window = "undefined" == typeof $parcel$global ? {} : $parcel$global);
    var L = function() {
        function e5() {
            r1(this, e5), this._events = {}, this.addListener = this.on, this.removeListener = this.off;
        }
        return G(e5, [
            {
                key: "emit",
                value: function(e) {
                    if (this._events[e]) {
                        for(var t = 0, i = this._events[e].length, r = arguments.length, n = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)n[o - 1] = arguments[o];
                        for(; t < i; t++)this._events[e][t] && this._events[e][t].apply(this, n);
                    }
                }
            },
            {
                key: "once",
                value: function(e) {
                    for(var t3 = arguments.length, i2 = Array(t3 > 1 ? t3 - 1 : 0), r2 = 1; r2 < t3; r2++)i2[r2 - 1] = arguments[r2];
                    for(var n = 0, o = i2.length, a = this; n < o; n++)!function() {
                        var t = i2[n], r = function i() {
                            a.off(e, i), t.apply(a, arguments);
                        };
                        i2[n] = r;
                    }();
                    this.on.apply(this, [
                        e
                    ].concat(i2));
                }
            },
            {
                key: "on",
                value: function(e) {
                    this._events[e] || (this._events[e] = []);
                    for(var t = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1; t < i; t++)this._events[e].push(arguments.length <= t + 1 ? void 0 : arguments[t + 1]);
                }
            },
            {
                key: "off",
                value: function(e) {
                    if (this._events[e]) for(var t = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1; t < i; t++)for(var r = arguments.length <= t + 1 ? void 0 : arguments[t + 1], n = void 0; ~(n = this._events[e].indexOf(r));)this._events[e].splice(n, 1);
                }
            },
            {
                key: "removeAllListeners",
                value: function(e) {
                    delete this._events[e];
                }
            },
            {
                key: "listeners",
                get: function() {
                    return this._events;
                }
            }
        ]), e5;
    }(), U = n1("requestAnimationFrame") || function(e) {
        return setTimeout(function() {
            return e((new Date).getTime());
        }, 1e3 / 60);
    }, q = {
        linear: function(e) {
            return e;
        },
        quad: function(e) {
            return Math.pow(e, 2);
        },
        dequad: function(e) {
            return 1 - q.quad(1 - e);
        },
        quint: function(e) {
            return Math.pow(e, 5);
        },
        dequint: function(e) {
            return 1 - Math.pow(1 - e, 5);
        },
        cycle: function(e) {
            return 1 - Math.sin(Math.acos(e));
        },
        decycle: function(e) {
            return Math.sin(Math.acos(1 - e));
        },
        bounce: function(e) {
            return 1 - q.debounce(1 - e);
        },
        debounce: function(e) {
            for(var t = 0, i = 1;; t += i, i /= 2)if (e >= (7 - 4 * t) / 11) return -Math.pow((11 - 6 * t - 11 * e) / 4, 2) + Math.pow(i, 2);
        },
        elastic: function(e) {
            return 1 - q.delastic(1 - e);
        },
        delastic: function(e) {
            return Math.pow(2, 10 * (e - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * e);
        }
    }, X = function() {
        function e6() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "linear", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 250, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {};
            if (r1(this, e6), this.duration = i, this.rule = t, this.draw = n, this.end = o, "function" != typeof this.draw) throw new TypeError("Invalid animation draw callback:", n);
            if ("function" != typeof this.end) throw new TypeError("Invalid animation end callback:", o);
        }
        return G(e6, [
            {
                key: "animate",
                value: function(e, t) {
                    var i = this;
                    this.frame && this.cancel();
                    var r = window.performance && window.performance.now ? window.performance.now() : n1("animationStartTime") || Date.now();
                    e = e || this.draw, t = t || this.end, this.draw = e, this.end = t, this.frame = U(function(n) {
                        return o1(n, e, r, q[i.rule] || i.rule, i.duration, t, i);
                    });
                }
            },
            {
                key: "cancel",
                value: function() {
                    if (this.frame) (n1("cancelAnimationFrame") || function(e) {})(this.frame), this.frame = null;
                }
            },
            {
                key: "destroy",
                value: function() {
                    this.cancel(), this.draw = null, this.end = null;
                }
            }
        ]), e6;
    }();
    X.rules = q;
    var Y = function() {
        function t4(i, n, o) {
            r1(this, t4), this.options = i, this.element = n.toLowerCase(), this.type = t4.toDashed(o), this.Type = e1[o], this.mutationsObserved = !1, this.isObservable = !!window.MutationObserver, window.GAUGES_NO_AUTO_INIT || t4.domReady(this.traverse.bind(this));
        }
        return G(t4, [
            {
                key: "isValidNode",
                value: function(e) {
                    return !(!e.tagName || e.tagName.toLowerCase() !== this.element || e.getAttribute("data-type") !== this.type);
                }
            },
            {
                key: "traverse",
                value: function() {
                    for(var e = document.getElementsByTagName(this.element), t = 0, i = e.length; t < i; t++)this.process(e[t]);
                    this.isObservable && !this.mutationsObserved && (new MutationObserver(this.observe.bind(this)).observe(document.body, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0,
                        characterData: !0,
                        attributeOldValue: !0,
                        characterDataOldValue: !0
                    }), this.mutationsObserved = !0);
                }
            },
            {
                key: "observe",
                value: function(e) {
                    for(var t = 0, i = e.length; t < i; t++){
                        var r = e[t];
                        if ("attributes" === r.type && "data-type" === r.attributeName && this.isValidNode(r.target) && r.oldValue !== this.type) setTimeout(this.process.bind(this, r.target));
                        else if (r.addedNodes && r.addedNodes.length) for(var n = 0, o = r.addedNodes.length; n < o; n++)setTimeout(this.process.bind(this, r.addedNodes[n]));
                    }
                }
            },
            {
                key: "process",
                value: function(e7) {
                    var i = this;
                    if (!this.isValidNode(e7)) return null;
                    var r3 = void 0, n2 = JSON.parse(JSON.stringify(this.options)), o = null;
                    for(r3 in n2)if (n2.hasOwnProperty(r3)) {
                        var a = t4.toAttributeName(r3), l = t4.parse(e7.getAttribute(a));
                        null !== l && void 0 !== l && (n2[r3] = l);
                    }
                    return n2.renderTo = e7, o = new this.Type(n2), o.draw && o.draw(), this.isObservable ? (o.observer = new MutationObserver(function(r4) {
                        r4.forEach(function(r) {
                            if ("attributes" === r.type) {
                                var n = r.attributeName.toLowerCase(), a = e7.getAttribute(n).toLowerCase();
                                if ("data-type" === n && a && a !== i.type) o.observer.disconnect(), delete o.observer, o.destroy && o.destroy();
                                else if ("data-" === n.substr(0, 5)) {
                                    var l = n.substr(5).split("-").map(function(e, t) {
                                        return t ? e.charAt(0).toUpperCase() + e.substr(1) : e;
                                    }).join(""), s = {};
                                    s[l] = t4.parse(e7.getAttribute(r.attributeName)), "value" === l ? o && (o.value = s[l]) : o.update && o.update(s);
                                }
                            }
                        });
                    }), o.observer.observe(e7, {
                        attributes: !0
                    }), o) : o;
                }
            }
        ], [
            {
                key: "parse",
                value: function(e) {
                    if ("true" === e) return !0;
                    if ("false" === e) return !1;
                    if ("undefined" !== e) {
                        if ("null" === e) return null;
                        if (/^[-+#.\w\d\s]+(?:,[-+#.\w\d\s]*)+$/.test(e)) return e.split(",");
                        try {
                            return JSON.parse(e);
                        } catch (e8) {}
                        return e;
                    }
                }
            },
            {
                key: "toDashed",
                value: function(e) {
                    for(var t = e.split(/(?=[A-Z])/), i = 1, r = t.length, n = t[0].toLowerCase(); i < r; i++)n += "-" + t[i].toLowerCase();
                    return n;
                }
            },
            {
                key: "toCamelCase",
                value: function(e) {
                    for(var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = e.split(/-/), r = 0, n = i.length, o = ""; r < n; r++)o += r || t ? i[r][0].toUpperCase() + i[r].substr(1).toLowerCase() : i[r].toLowerCase();
                    return o;
                }
            },
            {
                key: "toAttributeName",
                value: function(e) {
                    return "data-" + t4.toDashed(e);
                }
            },
            {
                key: "domReady",
                value: function(e) {
                    if (/comp|inter|loaded/.test((window.document || {}).readyState + "")) return e();
                    window.addEventListener ? window.addEventListener("DOMContentLoaded", e, !1) : window.attachEvent && window.attachEvent("onload", e);
                }
            }
        ]), t4;
    }(), H = function() {
        function e(t, i, n) {
            r1(this, e), e.collection.push(this), this.width = i || 0, this.height = n || 0, this.element = t, this.init();
        }
        return G(e, [
            {
                key: "init",
                value: function() {
                    var t = e.pixelRatio;
                    this.element.width = this.width * t, this.element.height = this.height * t, this.element.style.width = this.width + "px", this.element.style.height = this.height + "px", this.elementClone = this.element.cloneNode(!0), this.context = this.element.getContext("2d"), this.contextClone = this.elementClone.getContext("2d"), this.drawWidth = this.element.width, this.drawHeight = this.element.height, this.drawX = this.drawWidth / 2, this.drawY = this.drawHeight / 2, this.minSide = this.drawX < this.drawY ? this.drawX : this.drawY, this.elementClone.initialized = !1, this.contextClone.translate(this.drawX, this.drawY), this.contextClone.save(), this.context.translate(this.drawX, this.drawY), this.context.save(), this.context.max = this.contextClone.max = this.minSide, this.context.maxRadius = this.contextClone.maxRadius = null;
                }
            },
            {
                key: "destroy",
                value: function() {
                    var t = e.collection.indexOf(this);
                    ~t && e.collection.splice(t, 1), this.context.clearRect(-this.drawX, -this.drawY, this.drawWidth, this.drawHeight), this.context.max = null, delete this.context.max, this.context.maxRadius = null, delete this.context.maxRadius, this.context = null, this.contextClone = null, this.elementClone = null, this.element = null, this.onRedraw = null;
                }
            },
            {
                key: "commit",
                value: function() {
                    var t = e.pixelRatio;
                    return 1 !== t && (this.contextClone.scale(t, t), this.contextClone.save()), this;
                }
            },
            {
                key: "redraw",
                value: function() {
                    return this.init(), this.onRedraw && this.onRedraw(), this;
                }
            }
        ], [
            {
                key: "redraw",
                value: function() {
                    for(var t = 0, i = e.collection.length; t < i; t++)e.collection[t].redraw();
                }
            },
            {
                key: "pixelRatio",
                get: function() {
                    return window.devicePixelRatio || 1;
                }
            }
        ]), e;
    }();
    H.collection = [], window.matchMedia && window.matchMedia("screen and (min-resolution: 2dppx)").addListener(H.redraw);
    var J = {
        renderTo: null,
        width: 0,
        height: 0,
        minValue: 0,
        maxValue: 100,
        value: 0,
        units: !1,
        exactTicks: !1,
        majorTicks: [
            0,
            20,
            40,
            60,
            80,
            100
        ],
        minorTicks: 10,
        strokeTicks: !0,
        animatedValue: !1,
        animateOnInit: !1,
        title: !1,
        borders: !0,
        numbersMargin: 1,
        listeners: null,
        valueInt: 3,
        valueDec: 2,
        majorTicksInt: 1,
        majorTicksDec: 0,
        animation: !0,
        animationDuration: 500,
        animationRule: "cycle",
        colorPlate: "#fff",
        colorPlateEnd: "",
        colorMajorTicks: "#444",
        colorMinorTicks: "#666",
        colorStrokeTicks: "",
        colorTitle: "#888",
        colorUnits: "#888",
        colorNumbers: "#444",
        colorNeedle: "rgba(240,128,128,1)",
        colorNeedleEnd: "rgba(255,160,122,.9)",
        colorValueText: "#444",
        colorValueTextShadow: "rgba(0,0,0,0.3)",
        colorBorderShadow: "rgba(0,0,0,0.5)",
        colorBorderOuter: "#ddd",
        colorBorderOuterEnd: "#aaa",
        colorBorderMiddle: "#eee",
        colorBorderMiddleEnd: "#f0f0f0",
        colorBorderInner: "#fafafa",
        colorBorderInnerEnd: "#ccc",
        colorValueBoxRect: "#888",
        colorValueBoxRectEnd: "#666",
        colorValueBoxBackground: "#babab2",
        colorValueBoxShadow: "rgba(0,0,0,1)",
        colorNeedleShadowUp: "rgba(2,255,255,0.2)",
        colorNeedleShadowDown: "rgba(188,143,143,0.45)",
        colorBarStroke: "#222",
        colorBar: "#ccc",
        colorBarProgress: "#888",
        colorBarShadow: "#000",
        fontNumbers: "Arial",
        fontTitle: "Arial",
        fontUnits: "Arial",
        fontValue: "Arial",
        fontNumbersSize: 20,
        fontTitleSize: 24,
        fontUnitsSize: 22,
        fontValueSize: 26,
        fontNumbersStyle: "normal",
        fontTitleStyle: "normal",
        fontUnitsStyle: "normal",
        fontValueStyle: "normal",
        fontNumbersWeight: "normal",
        fontTitleWeight: "normal",
        fontUnitsWeight: "normal",
        fontValueWeight: "normal",
        needle: !0,
        needleShadow: !0,
        needleType: "arrow",
        needleStart: 5,
        needleEnd: 85,
        needleWidth: 4,
        borderOuterWidth: 3,
        borderMiddleWidth: 3,
        borderInnerWidth: 3,
        borderShadowWidth: 3,
        valueBox: !0,
        valueBoxStroke: 5,
        valueBoxWidth: 0,
        valueText: "",
        valueTextShadow: !0,
        valueBoxBorderRadius: 2.5,
        highlights: [
            {
                from: 20,
                to: 60,
                color: "#eee"
            },
            {
                from: 60,
                to: 80,
                color: "#ccc"
            },
            {
                from: 80,
                to: 100,
                color: "#999"
            }
        ],
        highlightsWidth: 15,
        highlightsLineCap: "butt",
        barWidth: 20,
        barStrokeWidth: 0,
        barProgress: !0,
        barShadow: 0
    };
    a1.prototype = Object.create(Array.prototype), a1.prototype.constructor = a1, a1.prototype.get = function(e) {
        if ("string" == typeof e) for(var t = 0, i = this.length; t < i; t++){
            var r = this[t].options.renderTo.tagName ? this[t].options.renderTo : document.getElementById(this[t].options.renderTo || "");
            if (r.getAttribute("id") === e) return this[t];
        }
        else if ("number" == typeof e) return this[e];
        return null;
    };
    var Z = "2.1.7", $ = (Math.round, Math.abs), K = new a1;
    K.version = Z;
    var Q = function(n3) {
        function o2(i) {
            r1(this, o2);
            var n = t1(this, (o2.__proto__ || Object.getPrototypeOf(o2)).call(this)), a = n.constructor.name;
            if ("BaseGauge" === a) throw new TypeError("Attempt to instantiate abstract class!");
            if (K.push(n), i.listeners && Object.keys(i.listeners).forEach(function(e) {
                (i.listeners[e] instanceof Array ? i.listeners[e] : [
                    i.listeners[e]
                ]).forEach(function(t) {
                    n.on(e, t);
                });
            }), n.version = Z, n.type = e1[a] || o2, n.initialized = !1, i.minValue = parseFloat(i.minValue), i.maxValue = parseFloat(i.maxValue), i.value = parseFloat(i.value) || 0, i.borders || (i.borderInnerWidth = i.borderMiddleWidth = i.borderOuterWidth = 0), !i.renderTo) throw TypeError("Canvas element was not specified when creating the Gauge object!");
            var l = i.renderTo.tagName ? i.renderTo : document.getElementById(i.renderTo);
            if (!(l instanceof HTMLCanvasElement)) throw TypeError("Given gauge canvas element is invalid!");
            return i.width = parseFloat(i.width) || 0, i.height = parseFloat(i.height) || 0, i.width && i.height || (i.width || (i.width = l.parentNode ? l.parentNode.offsetWidth : l.offsetWidth), i.height || (i.height = l.parentNode ? l.parentNode.offsetHeight : l.offsetHeight)), n.options = i || {}, n.options.animateOnInit && (n._value = n.options.value, n.options.value = n.options.minValue), n.canvas = new H(l, i.width, i.height), n.canvas.onRedraw = n.draw.bind(n), n.animation = new X(i.animationRule, i.animationDuration), n;
        }
        return i1(o2, n3), G(o2, [
            {
                key: "update",
                value: function(e) {
                    return Object.assign(this.options, this.type.configure(e || {})), this.canvas.width = this.options.width, this.canvas.height = this.options.height, this.animation.rule = this.options.animationRule, this.animation.duration = this.options.animationDuration, this.canvas.redraw(), this;
                }
            },
            {
                key: "destroy",
                value: function() {
                    var e = K.indexOf(this);
                    ~e && K.splice(e, 1), this.canvas.destroy(), this.canvas = null, this.animation.destroy(), this.animation = null, this.emit("destroy");
                }
            },
            {
                key: "draw",
                value: function() {
                    return this.options.animateOnInit && !this.initialized && (this.value = this._value, this.initialized = !0, this.emit("init")), this.emit("render"), this;
                }
            },
            {
                key: "value",
                set: function(e) {
                    var t = this;
                    e = o2.ensureValue(e, this.options.minValue);
                    var i = this.options.value;
                    if (e !== i) {
                        if (this.options.animation) {
                            if (this.animation.frame && (this.options.value = this._value, this._value === e)) return this.animation.cancel(), void delete this._value;
                            void 0 === this._value && (this._value = e), this.emit("animationStart"), this.animation.animate(function(r) {
                                var n = i + (e - i) * r;
                                t.options.animatedValue && t.emit("value", n, t.value), t.options.value = n, t.draw(), t.emit("animate", r, t.options.value);
                            }, function() {
                                void 0 !== t._value && (t.emit("value", t._value, t.value), t.options.value = t._value, delete t._value), t.draw(), t.emit("animationEnd");
                            });
                        } else this.emit("value", e, this.value), this.options.value = e, this.draw();
                    }
                },
                get: function() {
                    return void 0 === this._value ? this.options.value : this._value;
                }
            }
        ], [
            {
                key: "configure",
                value: function(e) {
                    return e;
                }
            },
            {
                key: "initialize",
                value: function(e, t) {
                    return new Y(t, "canvas", e);
                }
            },
            {
                key: "fromElement",
                value: function(e) {
                    var t = Y.toCamelCase(e.getAttribute("data-type")), i = e.attributes, r = 0, n = i.length, o = {};
                    if (t) {
                        for(/Gauge$/.test(t) || (t += "Gauge"); r < n; r++)o[Y.toCamelCase(i[r].name.replace(/^data-/, ""), !1)] = Y.parse(i[r].value);
                        new Y(o, e.tagName, t).process(e);
                    }
                }
            },
            {
                key: "ensureValue",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    return e = parseFloat(e), !isNaN(e) && isFinite(e) || (e = parseFloat(t) || 0), e;
                }
            },
            {
                key: "mod",
                value: function(e, t) {
                    return (e % t + t) % t;
                }
            },
            {
                key: "version",
                get: function() {
                    return Z;
                }
            }
        ]), o2;
    }(L);
    void 0 !== e1 && (e1.BaseGauge = Q, e1.gauges = (window.document || {}).gauges = K);
    var ee = /{([_a-zA-Z]+[_a-zA-Z0-9]*)}/g, te = {
        roundRect: u1,
        padValue: c1,
        formatMajorTickNumber: h1,
        radians: f1,
        radialPoint: v1,
        linearGradient: m1,
        drawNeedleShadow: p1,
        drawValueBox: x1,
        verifyError: l1,
        prepareTicks: d1,
        drawShadow: g1,
        font: w,
        normalizedValue: k1,
        formatContext: s1
    }, ie = Math.PI, re = ie / 2, ne = Object.assign({}, J, {
        ticksAngle: 270,
        startAngle: 45,
        colorNeedleCircleOuter: "#f0f0f0",
        colorNeedleCircleOuterEnd: "#ccc",
        colorNeedleCircleInner: "#e8e8e8",
        colorNeedleCircleInnerEnd: "#f5f5f5",
        needleCircleSize: 10,
        needleCircleInner: !0,
        needleCircleOuter: !0,
        needleStart: 20,
        animationTarget: "needle",
        useMinPath: !1,
        barWidth: 0,
        barStartPosition: "left"
    }), oe = function(e9) {
        function n(e) {
            return r1(this, n), e = Object.assign({}, ne, e || {}), t1(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, n.configure(e)));
        }
        return i1(n, e9), G(n, [
            {
                key: "draw",
                value: function() {
                    try {
                        var e = this.canvas, t = [
                            -e.drawX,
                            -e.drawY,
                            e.drawWidth,
                            e.drawHeight
                        ], i = t[0], r = t[1], o = t[2], a = t[3], l = this.options;
                        if ("needle" === l.animationTarget) {
                            if (!e.elementClone.initialized) {
                                var s = e.contextClone;
                                s.clearRect(i, r, o, a), s.save(), this.emit("beforePlate"), O1(s, l), this.emit("beforeHighlights"), A1(s, l), this.emit("beforeMinorTicks"), V1(s, l), this.emit("beforeMajorTicks"), P1(s, l), this.emit("beforeNumbers"), M(s, l), this.emit("beforeTitle"), B(s, l), this.emit("beforeUnits"), W(s, l), e.elementClone.initialized = !0;
                            }
                            this.canvas.commit(), e.context.clearRect(i, r, o, a), e.context.save(), e.context.drawImage(e.elementClone, i, r, o, a), e.context.save(), this.emit("beforeProgressBar"), I(e.context, l), this.emit("beforeValueBox"), E(e.context, l, z(this)), this.emit("beforeNeedle"), _(e.context, l);
                        } else {
                            var d = -te.radians((l.value - l.minValue) / (l.maxValue - l.minValue) * l.ticksAngle);
                            if (e.context.clearRect(i, r, o, a), e.context.save(), this.emit("beforePlate"), O1(e.context, l), e.context.rotate(d), this.emit("beforeHighlights"), A1(e.context, l), this.emit("beforeMinorTicks"), V1(e.context, l), this.emit("beforeMajorTicks"), P1(e.context, l), this.emit("beforeNumbers"), M(e.context, l), this.emit("beforeProgressBar"), I(e.context, l), e.context.rotate(-d), e.context.save(), !e.elementClone.initialized) {
                                var u = e.contextClone;
                                u.clearRect(i, r, o, a), u.save(), this.emit("beforeTitle"), B(u, l), this.emit("beforeUnits"), W(u, l), this.emit("beforeNeedle"), _(u, l), e.elementClone.initialized = !0;
                            }
                            e.context.drawImage(e.elementClone, i, r, o, a);
                        }
                        this.emit("beforeValueBox"), E(e.context, l, z(this)), D(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "draw", this).call(this);
                    } catch (e) {
                        te.verifyError(e);
                    }
                    return this;
                }
            },
            {
                key: "value",
                set: function(e) {
                    e = Q.ensureValue(e, this.options.minValue), this.options.animation && 360 === this.options.ticksAngle && this.options.useMinPath && (this._value = e, e = this.options.value + ((e - this.options.value) % 360 + 540) % 360 - 180), F(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "value", e, this);
                },
                get: function() {
                    return D(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "value", this);
                }
            }
        ], [
            {
                key: "configure",
                value: function(e) {
                    return e.barWidth > 50 && (e.barWidth = 50), isNaN(e.startAngle) && (e.startAngle = 45), isNaN(e.ticksAngle) && (e.ticksAngle = 270), e.ticksAngle > 360 && (e.ticksAngle = 360), e.ticksAngle < 0 && (e.ticksAngle = 0), e.startAngle < 0 && (e.startAngle = 0), e.startAngle > 360 && (e.startAngle = 360), e;
                }
            }
        ]), n;
    }(Q);
    void 0 !== e1 && (e1.RadialGauge = oe), Q.initialize("RadialGauge", ne), Object.assign(e1, {
        Collection: a1,
        GenericOptions: J,
        Animation: X,
        BaseGauge: Q,
        drawings: te,
        SmartCanvas: H,
        DomObserver: Y,
        vendorize: n1
    });
}($b8ebf9cc3dfaa67d$exports);


let $40f8308ce56fc3a5$var$rawOperas = [
    {
        title: "1000 Airplanes on the Roof",
        composer: "Glass, Philip",
        date: "1988",
        Premiere: "July 15, 1988"
    },
    {
        title: "1492 epopea lirica d'America",
        composer: "Braga, Antonio",
        date: "1992"
    },
    {
        title: "1984",
        composer: "Maazel, Lorin",
        date: "2005",
        Librettist: "\n",
        language: "English",
        "Based on": "Nineteen Eighty-Four",
        Premiere: "3 May 2005",
        "Website": "www.1984theopera.com"
    },
    {
        title: "Le 66",
        composer: "Offenbach, Jacques",
        date: "1856"
    },
    {
        title: "L'abandon d'Ariane",
        composer: "Milhaud, Darius",
        date: "1928",
        Librettist: "Henri Hoppenot",
        language: "French",
        "Based on": "Ariadne",
        Premiere: "20 April 1928"
    },
    {
        title: "Abu Hassan",
        composer: "von Weber, Carl Maria",
        date: "1811",
        Librettist: "Franz Carl Hiemer",
        language: "German",
        "Based on": "One Thousand and One Nights",
        Premiere: "4 June 1811"
    },
    {
        title: "Acante et C\xe9phise",
        composer: "Rameau, Jean-Philippe",
        date: "1751"
    },
    {
        title: "Achille et Polyx\xe8ne",
        composer: "Lully, Jean-Baptiste",
        date: "1687",
        Librettist: "Jean Galbert de Campistron",
        language: "French",
        "Based on": "Aeneid",
        Premiere: "7 November 1687"
    },
    {
        title: "Acis and Galatea",
        composer: "Handel, George Frideric",
        date: "1718"
    },
    {
        title: "Acis et Galat\xe9e",
        composer: "Lully, Jean-Baptiste",
        date: "1686"
    },
    {
        title: "Act\xe9on",
        composer: "Charpentier, Marc-Antoine",
        date: "1683\u20131685",
        language: "French",
        "Based on": "Ovid"
    },
    {
        title: "Adelaide",
        composer: "Sartorio, Antonio",
        date: "1672"
    },
    {
        title: "Adelaide di Borgogna",
        composer: "Rossini, Gioachino",
        date: "1817",
        Librettist: "Giovanni Schmidt",
        language: "Italian",
        Premiere: "27 December 1817"
    },
    {
        title: "Adelia",
        composer: "Donizetti, Gaetano",
        date: "1841",
        "Other title": "La figlia dell'arciere",
        Librettist: "\n",
        language: "Italian",
        Premiere: "11 February 1841"
    },
    {
        title: "Adelson e Salvini",
        composer: "Bellini, Vincenzo",
        date: "1825",
        Librettist: "Andrea Leone Tottola",
        language: "Italian",
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
        composer: "Cilea, Francesco",
        date: "1902",
        Librettist: "Arturo Colautti",
        language: "Italian",
        "Based on": "Adrienne Lecouvreur",
        Premiere: "6 November 1902"
    },
    {
        title: "Adriana Mater",
        composer: "Saariaho, Kaija",
        date: "2008",
        Librettist: "Amin Maalouf",
        language: "French",
        Premiere: "3 April 2006"
    },
    {
        title: "The Adventures of Pinocchio",
        composer: "Dove, Jonathan",
        date: "2007",
        Librettist: "Alasdair Middleton",
        language: "English",
        "Based on": "The Adventures of Pinocchio",
        Premiere: "21 December 2007"
    },
    {
        title: "L'Africaine(Vasco de Gama)",
        composer: "Meyerbeer, Giacomo",
        date: "1865",
        Librettist: "Eug\xe8ne Scribe",
        language: "French",
        Premiere: "28 April 1865"
    },
    {
        title: "After All!",
        composer: "Cellier, Alfred",
        date: "1878"
    },
    {
        title: "Ages Ago",
        composer: "Clay, Frederic",
        date: "1869"
    },
    {
        title: "Agrippina",
        composer: "Handel",
        date: "1709"
    },
    {
        title: "Die \xe4gyptische Helena",
        composer: "Strauss, Richard",
        date: "1928",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        "Based on": "Helen",
        Premiere: "6 June 1928"
    },
    {
        title: "Aida",
        composer: "Verdi, Giuseppe",
        date: "1871",
        Librettist: "Antonio Ghislanzoni",
        language: "Italian",
        Premiere: "24 December 1871"
    },
    {
        title: "Ainadamar",
        composer: "Golijov, Osvaldo",
        date: "2003",
        Translation: "Fountain of Tears",
        Librettist: "David Henry Hwang",
        language: "Spanish",
        "Based on": "Federico Garc\xeda Lorca",
        Premiere: "August 10, 2003"
    },
    {
        title: "Akhnaten",
        composer: "Glass, Philip",
        date: "1984",
        Premiere: "March 24, 1984"
    },
    {
        title: "Alahor in Granata",
        composer: "Donizetti, Gaetano",
        date: "1826",
        Librettist: "M.A.",
        language: "Italian",
        "Based on": "Jean-Pierre Claris de Florian",
        Premiere: "7 January 1826"
    },
    {
        title: "Albert Herring",
        composer: "Britten",
        date: "1947",
        Librettist: "Eric Crozier",
        language: "English",
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
        language: "Italian",
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
        language: "Italian",
        "Based on": "Alessandro nell'Indie",
        Premiere: "29 September 1824"
    },
    {
        title: "Alexandre bis",
        composer: "Martin\u016F",
        date: "1964",
        Librettist: "Andr\xe9 Wurmser",
        language: "French",
        Premiere: "18 February 1964"
    },
    {
        title: "Alzira",
        composer: "Verdi, Giuseppe",
        date: "1845",
        Librettist: "Salvatore Cammarano",
        language: "Italian",
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
        language: "French",
        "Based on": "Amadis de Gaula",
        Premiere: "1 April 1922"
    },
    {
        title: "Amahl and the Night Visitors",
        composer: "Menotti",
        date: "1951",
        Librettist: "Menotti",
        language: "English",
        "Based on": "Hieronymus Bosch",
        Premiere: "December 24, 1951"
    },
    {
        title: "An American Tragedy",
        composer: "Picker",
        date: "2005",
        Librettist: "Gene Scheer",
        language: "English",
        "Based on": "An American Tragedy",
        Premiere: "December 2, 2005"
    },
    {
        title: "Amelia",
        composer: "Hagen",
        date: "2010",
        Librettist: "Gardner McFall",
        language: "English",
        Premiere: "May 8, 2010"
    },
    {
        title: "L'amico Fritz",
        composer: "Mascagni, Pietro",
        date: "Pietro Mascagni",
        Librettist: "P. Suardon",
        language: "Italian",
        "Based on": "L'Ami Fritz",
        Premiere: "31 October 1891"
    },
    {
        title: "L'Amour de loin",
        composer: "Saariaho, Kaija",
        date: "2000",
        Translation: "Love from Afar",
        Librettist: "Amin Maalouf",
        language: "French",
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
        composer: "Donizetti, Gaetano",
        date: "1839",
        Translation: "The Angel of Nisida",
        Librettist: "\n",
        language: "French"
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
        language: "Swedish",
        "Based on": "Aniara",
        Premiere: "31 May 1959"
    },
    {
        title: "Anna Bolena",
        composer: "Donizetti, Gaetano",
        date: "1830",
        Librettist: "Felice Romani",
        language: "Italian",
        Premiere: "26 December 1830"
    },
    {
        title: "Anna Nicole",
        composer: "Turnage, Mark-Anthony",
        date: "2011",
        Librettist: "Richard Thomas",
        "Based on": "Anna Nicole Smith",
        Premiere: "17 February 2011"
    },
    {
        title: "Antigonae",
        composer: "Orff",
        date: "1949",
        language: "German",
        "Based on": "Friedrich H\xf6lderlin",
        Premiere: "9 August 1949"
    },
    {
        title: "Apollo et Hyacinthus",
        composer: "Mozart",
        date: "1767",
        Librettist: "Rufinus Widl",
        language: "Latin",
        "Based on": "Ovid",
        Premiere: "1767"
    },
    {
        title: "Aquarius",
        composer: "Goeyvaerts, Karel",
        date: "2009"
    },
    {
        title: "Arabella",
        composer: "Strauss, Richard",
        date: "1933",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        Premiere: "1 July 1933"
    },
    {
        title: "Ariadne auf Naxos",
        composer: "Strauss, Richard",
        date: "1912",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        Premiere: "25 October 1912"
    },
    {
        title: "Ariodante",
        composer: "Handel",
        date: "1734"
    },
    {
        title: "Arizona Lady",
        composer: "K\xe1lm\xe1n, Emmerich",
        date: "1954"
    },
    {
        title: "L'arlesiana",
        composer: "Cilea, Francesco",
        date: "Cilea",
        Librettist: "Leopoldo Marenco",
        language: "Italian",
        "Based on": "Alphonse Daudet",
        Premiere: "27 November 1897"
    },
    {
        title: "Armida",
        composer: "Dvo\u0159\xe1k",
        date: "1904",
        Librettist: "Jaroslav Vrchlick\xfd",
        language: "Czech",
        "Based on": "Torquato Tasso",
        Premiere: "25 March 1904"
    },
    {
        title: "Armida",
        composer: "Rossini, Gioachino",
        date: "1817",
        Librettist: "Giovanni Schmidt",
        language: "Italian",
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
        composer: "Verdi, Giuseppe",
        date: "1857",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "16 August 1857"
    },
    {
        title: "Artamene",
        composer: "Albinoni, Tomaso",
        date: "1741"
    },
    {
        title: "Les arts florissants",
        composer: "Charpentier, Marc-Antoine",
        date: "1685",
        language: "French",
        Premiere: "1685"
    },
    {
        title: "Ascanio in Alba",
        composer: "Mozart",
        date: "1771",
        Librettist: "Giuseppe Parini",
        language: "Italian",
        Premiere: "17 October 1771"
    },
    {
        title: "Atmen gibt das Leben",
        composer: "Stockhausen",
        date: "1977",
        Translation: "Breathing Gives Life",
        "Scoring": "choir a cappella with solo parts, in Part II also orchestra (playback)"
    },
    {
        title: "Attila",
        composer: "Verdi, Giuseppe",
        date: "1846",
        Librettist: "Temistocle Solera",
        language: "Italian",
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
        language: "German",
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
        language: "German",
        Premiere: "27 October 2012"
    },
    {
        title: "Die Bajadere",
        composer: "K\xe1lm\xe1n",
        date: "1921"
    },
    {
        title: "Un ballo in maschera",
        composer: "Verdi, Giuseppe",
        date: "1859",
        Translation: "A Masked Ball",
        Librettist: "Antonio Somma",
        language: "Italian",
        "Based on": "Eug\xe8ne Scribe",
        Premiere: "17 February 1859"
    },
    {
        title: "Bandanna",
        composer: "Hagen",
        date: "1998",
        Librettist: "Paul Muldoon",
        language: "English",
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
        language: "German",
        "Based on": "One Thousand and One Nights",
        Premiere: "15 December 1858"
    },
    {
        title: "Il barbiere di SivigliaThe Barber of Seville",
        composer: "Rossini, Gioachino",
        date: "1816",
        "Native title": "Il barbiere di Siviglia, ossia L'inutile precauzione",
        Librettist: "Cesare Sterbini",
        language: "Italian",
        "Based on": "Pierre Beaumarchais",
        Premiere: "20 February 1816"
    },
    {
        title: "The Bartered Bride",
        composer: "Smetana",
        date: "1866",
        "Native title": "Prodan\xe1 nev\u011Bsta",
        Librettist: "Karel Sabina",
        language: "Czech",
        Premiere: "30 May 1866"
    },
    {
        title: "Beatrix Cenci",
        composer: "Ginastera",
        date: "1971",
        Librettist: "\n",
        language: "Spanish",
        "Based on": "Beatrice Cenci",
        Premiere: "10 September 1971"
    },
    {
        title: "B\xe9atrice et B\xe9n\xe9dict",
        composer: "Berlioz",
        date: "1862",
        Librettist: "Hector Berlioz",
        language: "French",
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
        composer: "Donizetti, Gaetano",
        date: "1836",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
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
        language: "French",
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
        language: "Russian",
        "Based on": "Richard Brinsley Sheridan",
        Premiere: "3 November 1946"
    },
    {
        title: "Billy Budd",
        composer: "Britten",
        date: "1951",
        Librettist: "\n",
        language: "English",
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
        Librettist: "Buddy DeSylva"
    },
    {
        title: "Bluebeard's Castle",
        composer: "Bart\xf3k",
        date: "1918",
        "Native title": "Hungarian: A k\xe9kszak\xe1ll\xfa herceg v\xe1ra",
        Librettist: "B\xe9la Bal\xe1zs",
        language: "Hungarian",
        "Based on": "La Barbe bleue",
        Premiere: "24 May 1918"
    },
    {
        title: "La boh\xe8me",
        composer: "Puccini",
        date: "1896",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Henri Murger",
        Premiere: "1 February 1896"
    },
    {
        title: "La boh\xe8me",
        composer: "Leoncavallo",
        date: "1897",
        Librettist: "Leoncavallo",
        language: "Italian",
        "Based on": "La Vie de Boh\xe8me",
        Premiere: "6 May 1897 (1897-05-06)La Fenice, Venice"
    },
    {
        title: "Bomarzo",
        composer: "Ginastera",
        date: "1967",
        Librettist: "Manuel Mujica La\xednez",
        language: "Spanish",
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
        composer: "Mussorgsky, Modest",
        date: "1874",
        "Native title": "Russian",
        Librettist: "Mussorgsky",
        language: "Russian",
        "Based on": "Boris Godunov",
        Premiere: "27 January 1874"
    },
    {
        title: "The Brandenburgers in Bohemia",
        composer: "Smetana",
        date: "1866",
        "Native title": "Branibo\u0159i v \u010Cech\xe1ch",
        Librettist: "Karel Sabina",
        language: "Czech",
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
        title: "Candide",
        composer: "Bernstein",
        date: "1956"
    },
    {
        title: "La canterina",
        composer: "Haydn",
        date: "1766",
        language: "Italian",
        Premiere: "1766"
    },
    {
        title: "Capriccio",
        composer: "Strauss, Richard",
        date: "1942",
        Librettist: "\n",
        language: "German",
        Premiere: "28 October 1942"
    },
    {
        title: "The Captain's Daughter",
        composer: "Cui",
        date: "1911"
    },
    {
        title: "Cardillac",
        composer: "Hindemith, Paul",
        date: "1926",
        Librettist: "Ferdinand Lion",
        language: "German",
        "Based on": "Das Fr\xe4ulein von Scuderi",
        Premiere: "9 November 1926"
    },
    {
        title: "Carmen",
        composer: "Bizet",
        date: "1875",
        Librettist: "\n",
        language: "French",
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
        composer: "Mascagni, Pietro",
        date: "1890",
        Librettist: "Giovanni Targioni-Tozzetti",
        language: "Italian",
        "Based on": "Cavalleria rusticana",
        Premiere: "17 May 1890"
    },
    {
        title: "The Cave",
        composer: "Reich",
        date: "1994",
        language: "English",
        "Based on": "The Cave of the Patriarchs",
        Premiere: "October 22, 1993"
    },
    {
        title: "Cendrillon",
        composer: "Massenet",
        date: "1899",
        Librettist: "Henri Ca\xefn",
        language: "French",
        "Based on": "Perrault",
        Premiere: "24 May 1899"
    },
    {
        title: "La Cenerentola",
        composer: "Rossini, Gioachino",
        date: "1817",
        "Other title": "La Cenerentola, ossia La bont\xe0 in trionfo",
        Librettist: "Jacopo Ferretti",
        language: "Italian",
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
        composer: "Blanchard, Terence",
        date: "2013",
        Librettist: "Michael Cristofer",
        language: "English",
        Premiere: "15 June 2013"
    },
    {
        title: "Charles VI",
        composer: "Hal\xe9vy",
        date: "1843"
    },
    {
        title: "Charlotte Corday",
        composer: "Ferrero, Lorenzo",
        date: "1989",
        Librettist: "Giuseppe Di Leva",
        language: "Italian",
        Premiere: "21 February 1989"
    },
    {
        title: "Chopin",
        composer: "Orefice, Giacomo",
        date: "1901"
    },
    {
        title: "Le Cid",
        composer: "Massenet",
        date: "1885",
        Librettist: "\n",
        language: "French",
        "Based on": "Le Cid",
        Premiere: "30 November 1885"
    },
    {
        title: "La clemenza di Tito",
        composer: "Mozart",
        date: "1791",
        Translation: "The Clemency of Titus",
        Librettist: "Caterino Mazzol\xe0",
        language: "Italian",
        "Based on": "Pietro Metastasio",
        Premiere: "6 September 1791"
    },
    {
        title: "Cold Mountain",
        composer: "Higdon, Jennifer",
        date: "2015"
    },
    {
        title: "Comedy on the Bridge",
        composer: "Martin\u016F",
        date: "1937"
    },
    {
        title: "Le comte Ory",
        composer: "Rossini, Gioachino",
        date: "1828",
        Librettist: "\n",
        language: "French",
        Premiere: "20 August 1828"
    },
    {
        title: "Les contes d'Hoffmann",
        composer: "Offenbach",
        date: "1881",
        language: "French"
    },
    {
        title: "Der Corregidor",
        composer: "Wolf",
        date: "1896",
        Librettist: "Rosa Mayreder",
        language: "German",
        "Based on": "El sombrero de tres picos",
        Premiere: "7 June 1896"
    },
    {
        title: "Cos\xec fan tutte ossia La scuola degli amanti",
        composer: "Mozart",
        date: "1790",
        Translation: "Thus Do They All, or The School for Lovers",
        Librettist: "Lorenzo Da Ponte",
        language: "Italian",
        Premiere: "26 January 1790"
    },
    {
        title: "The Countess",
        composer: "Moniuszko",
        date: "1860",
        "Native title": "Hrabina",
        Librettist: "W\u0142odzimierz Wolski",
        language: "Polish",
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
        language: "English",
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
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1924",
        "Native title": "Czech: ",
        Librettist: "Leo\u0161 Jan\xe1\u010Dek",
        language: "Czech",
        "Based on": "Rudolf T\u011Bsnohl\xeddek",
        Premiere: "6 November 1924"
    },
    {
        title: "La Curandera",
        composer: "Rodriguez, Robert Xavier",
        date: "2006"
    },
    {
        title: "Curlew River",
        composer: "Britten",
        date: "1964",
        Librettist: "William Plomer",
        "Based on": "Sumidagawa",
        Premiere: "13 June 1964"
    },
    {
        title: "Cyrano de Bergerac",
        composer: "Alfano",
        date: "1936",
        Librettist: "Henri Ca\xefn",
        language: "French",
        "Based on": "Edmond Rostand",
        Premiere: "22 January 1936"
    },
    {
        title: "Dafne",
        composer: "Peri",
        date: "1597",
        Librettist: "Ottavio Rinuccini",
        language: "Italian",
        "Based on": "Daphne",
        Premiere: "1598"
    },
    {
        title: "Dalibor",
        composer: "Smetana",
        date: "1868",
        Librettist: "Josef Wenzig",
        language: "Czech",
        Premiere: "16 May 1868"
    },
    {
        title: "La damnation de Faust",
        composer: "Berlioz",
        date: "1893",
        Translation: "The Damnation of Faust",
        language: "French",
        "Based on": "Goethe's ",
        "Scoring": "four soloists children's chorus seven-part choir orchestra"
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
        language: "German",
        "Based on": "Danton's Death",
        Premiere: "6 August 1947"
    },
    {
        title: "Daphne",
        composer: "Strauss, Richard",
        date: "1938",
        Librettist: "Joseph Gregor",
        language: "German",
        Premiere: "2 October 1938"
    },
    {
        title: "Dardanus",
        composer: "Rameau",
        date: "1739",
        Librettist: "Charles-Antoine Leclerc de La Bru\xe8re",
        language: "French",
        "Based on": "Greek myth of Dardanus",
        Premiere: "19 November 1739"
    },
    {
        title: "Dardanus",
        composer: "Sacchini",
        date: "1784",
        Librettist: "Nicolas-Fran\xe7ois Guillard",
        language: "French",
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
        language: "English",
        "Based on": "Tod in Venedig",
        Premiere: "16 June 1973"
    },
    {
        title: "The Death of Klinghoffer",
        composer: "Adams, John",
        date: "1991",
        Librettist: "Alice Goodman",
        language: "English",
        Premiere: "19 March 1991"
    },
    {
        title: "Destiny",
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1934",
        "Native title": "Osud",
        Librettist: "\n",
        language: "Czech",
        Premiere: "1958"
    },
    {
        title: "The Devil and Kate",
        composer: "Dvo\u0159\xe1k",
        date: "1899",
        Librettist: "Adolf Wenig",
        language: "Czech",
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
        language: "French",
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
        language: "German",
        Premiere: "May 28, 1993"
    },
    {
        title: "Djamileh",
        composer: "Bizet",
        date: "1872",
        Librettist: "Louis Gallet",
        language: "French",
        "Based on": "Namouna",
        Premiere: "22 May 1872"
    },
    {
        title: "Doctor Atomic",
        composer: "Adams, John",
        date: "2005",
        Librettist: "Peter Sellars",
        language: "English",
        Premiere: "1 October 2005"
    },
    {
        title: "Dolores Claiborne",
        composer: "Picker",
        date: "2013",
        Librettist: "J. D. McClatchy",
        language: "English",
        "Based on": "Dolores Claiborne",
        Premiere: "September 18, 2013"
    },
    {
        title: "Don Carlos",
        composer: "Verdi, Giuseppe",
        date: "1867",
        Librettist: "\n",
        language: "French",
        "Based on": "Don Carlos",
        Premiere: "11 March 1867"
    },
    {
        title: "Don Giovanni",
        composer: "Mozart",
        date: "1787",
        "Other title": "Il dissoluto punito, ossia il Don Giovanni",
        Librettist: "Lorenzo Da Ponte",
        language: "Italian",
        "Based on": "Don Juan",
        Premiere: "29 October 1787"
    },
    {
        title: "Don Pasquale",
        composer: "Donizetti, Gaetano",
        date: "1843",
        Librettist: "\n",
        language: "Italian",
        Premiere: "3 January 1843"
    },
    {
        title: "Don Rodrigo",
        composer: "Ginastera",
        date: "1964",
        Librettist: "Alejandro Casona",
        language: "Spanish",
        Premiere: "24 July 1964"
    },
    {
        title: "Don Sanche",
        composer: "Liszt",
        date: "1825",
        Librettist: "\n",
        language: "French",
        "Based on": "Jean-Pierre Claris de Florian",
        Premiere: "17 October 1825"
    },
    {
        title: "La donna del lago",
        composer: "Rossini, Gioachino",
        date: "1819",
        Translation: "The Lady of the Lake",
        Librettist: "Andrea Leone Tottola",
        language: "Italian",
        "Based on": "The Lady of the Lake",
        Premiere: "24 September 1819"
    },
    {
        title: "Le donne curiose",
        composer: "Wolf-Ferrari",
        date: "1903",
        Translation: "The Inquisitive Women",
        Librettist: "Luigi Sugana",
        language: "Italian",
        "Based on": "Le donne curiose",
        Premiere: "27 November 1903"
    },
    {
        title: "Donnerstag aus Licht",
        composer: "Stockhausen",
        date: "1981",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "March 15, 1981"
    },
    {
        title: "Dr. Sun Yat-sen",
        composer: "Ruo, Huang",
        date: "2014"
    },
    {
        title: "I due Foscari",
        composer: "Verdi, Giuseppe",
        date: "1844",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Lord Byron",
        Premiere: "3 November 1844"
    },
    {
        title: "Edgar",
        composer: "Puccini",
        date: "1899",
        Librettist: "Ferdinando Fontana",
        language: "Italian",
        "Based on": "Alfred de Musset",
        Premiere: "21 April 1889"
    },
    {
        title: "The Eighth Wonder",
        composer: "John",
        date: "1995",
        Librettist: "Dennis Watkins",
        language: "English",
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
        composer: "Strauss, Richard",
        date: "1909",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        "Based on": "Sophocles",
        Premiere: "25 January 1909"
    },
    {
        title: "L'elisir d'amore",
        composer: "Donizetti, Gaetano",
        date: "1832",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Eug\xe8ne Scribe",
        Premiere: "12 May 1832"
    },
    {
        title: "Emmeline",
        composer: "Picker",
        date: "1996",
        Librettist: "J. D. McClatchy",
        language: "English",
        "Based on": "Judith Rossner",
        Premiere: "1996"
    },
    {
        title: "L'enfant et les sortil\xe8ges",
        composer: "Ravel",
        date: "1925",
        Librettist: "Colette",
        language: "French",
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
        language: "German",
        "Based on": "Christoph Friedrich Bretzner",
        Premiere: "16 July 1782"
    },
    {
        title: "Ernani",
        composer: "Verdi, Giuseppe",
        date: "1844",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Hernani",
        Premiere: "9 March 1844"
    },
    {
        title: "Esclarmonde",
        composer: "Massenet",
        date: "1888",
        Librettist: "\n",
        language: "French",
        "Based on": "Parth\xe9nop\xe9us de Blois",
        Premiere: "15 May 1889"
    },
    {
        title: "L'\xe9toile",
        composer: "Chabrier",
        date: "1877",
        Librettist: "\n",
        language: "French",
        Premiere: "28 November 1877"
    },
    {
        title: "Eugene Onegin",
        composer: "Tchaikovsky",
        date: "1879",
        "Native title": "Russian",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Eugene Onegin",
        Premiere: "29 March 1879"
    },
    {
        title: "Euridice",
        composer: "Peri",
        date: "1600",
        Librettist: "Ottavio Rinuccini",
        language: "Italian",
        "Based on": "Ovid",
        Premiere: "6 October 1600"
    },
    {
        title: "Euryanthe",
        composer: "Weber",
        date: "1823",
        Librettist: "Helmina von Ch\xe9zy",
        language: "German",
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
        language: "English",
        Premiere: "January 30, 2015"
    },
    {
        title: "The Excursions of Mr. Brou\u010Dek",
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1920",
        "Native title": "V\xfdlety p\xe1n\u011B Brou\u010Dkovy",
        "Other title": "The Excursions of Mr. Brou\u010Dek to the Moon and to the 15th Century",
        language: "Czech",
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
        composer: "Mussorgsky, Modest",
        date: "1913",
        "Native title": "Russian",
        Librettist: "Mussorgsky",
        language: "Russian",
        "Based on": "The Fair at Sorochyntsi",
        Premiere: "13 October 1917"
    },
    {
        title: "Falstaff",
        composer: "Verdi, Giuseppe",
        date: "1893",
        Librettist: "Arrigo Boito",
        language: "Italian",
        "Based on": "The Merry Wives of Windsor",
        Premiere: "9 February 1893"
    },
    {
        title: "La fanciulla del West",
        composer: "Puccini",
        date: "1910",
        Translation: "The Girl of the West",
        Librettist: "\n",
        language: "Italian",
        "Based on": "David Belasco",
        Premiere: "10 December 1910"
    },
    {
        title: "Fantastic Mr. Fox",
        composer: "Picker",
        date: "1998",
        Librettist: "Donald Sturrock",
        language: "English",
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
        language: "French",
        "Based on": "Faust et Marguerite",
        Premiere: "19 March 1859"
    },
    {
        title: "La favorite",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "\n",
        language: "French",
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
        language: "Italian",
        "Based on": "F\xe9dora",
        Premiere: "17 November 1898"
    },
    {
        title: "Die Feen",
        composer: "Wagner",
        date: "1833",
        Translation: "The Fairies",
        Librettist: "Richard Wagner (1833)",
        language: "German",
        "Based on": "Carlo Gozzi",
        Premiere: "29 June 1888"
    },
    {
        title: "Feuersnot",
        composer: "Strauss, Richard",
        date: "1901",
        Librettist: "Ernst von Wolzogen",
        language: "German",
        "Based on": 'J. Ketel\'s "Das erloschene Feuer zu Audenaerde"',
        Premiere: "21 November 1901"
    },
    {
        title: "Fidelio",
        composer: "Beethoven",
        date: "1805",
        Librettist: "Joseph Sonnleithner",
        language: "German",
        Premiere: "Original premiere 20 November 1805"
    },
    {
        title: "The Fiery Angel",
        composer: "Prokofiev",
        date: "1955",
        "Native title": "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0430\u043D\u0433\u0435\u043B",
        Librettist: "Prokofiev",
        language: "Russian",
        "Based on": "The Fiery Angel",
        Premiere: "25 November 1955"
    },
    {
        title: "La fille du r\xe9giment",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "\n",
        language: "French",
        Premiere: "11 February 1840"
    },
    {
        title: "The Finnish Prisoner",
        composer: "Gough, Orlando",
        date: "2007",
        Librettist: "Stephen Plaice",
        language: "English",
        Premiere: "11 July 2007"
    },
    {
        title: "Fire Shut Up in My Bones",
        composer: "Blanchard, Terence",
        date: "2019",
        Librettist: "Kasi Lemmons",
        language: "English",
        "Based on": "Charles M. Blow",
        Premiere: "June 15, 2019"
    },
    {
        title: "Die Fledermaus",
        composer: "Strauss, Johann",
        date: "1874",
        language: "German"
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
        language: "German",
        "Based on": "Der fliegende Holl\xe4nder",
        Premiere: "2 January 1843"
    },
    {
        title: "Florencia en el Amazonas",
        composer: "Cat\xe1n",
        date: "1996",
        Librettist: "Marcela Fuentes-Berain",
        language: "Spanish",
        "Based on": "Love in the Time of Cholera",
        Premiere: "25 October 1996"
    },
    {
        title: "La forza del destino",
        composer: "Verdi, Giuseppe",
        date: "1862",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
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
        language: "Italian",
        "Based on": "Francesca da Rimini",
        Premiere: "19 February 1914"
    },
    {
        title: "Francesca da Rimini",
        composer: "Rachmaninoff",
        date: "1906",
        "Native title": "Russian",
        Librettist: "Modest Ilyich Tchaikovsky",
        language: "Russian",
        "Based on": "Francesca da Rimini",
        Premiere: "24 January 1906"
    },
    {
        title: "Der Freisch\xfctz",
        composer: "Weber",
        date: "1821",
        Translation: "The Marksman",
        Librettist: "Friedrich Kind",
        language: "German",
        Premiere: "18 June 1821"
    },
    {
        title: "Freitag aus Licht",
        composer: "Stockhausen",
        date: "1996",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "12 September 1996"
    },
    {
        title: "From the House of the Dead",
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1930",
        "Native title": "Z mrtv\xe9ho domu",
        Librettist: "Leo\u0161 Jan\xe1\u010Dek",
        language: "Czech",
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
        language: "Russian",
        "Based on": "The Gambler",
        Premiere: "1929"
    },
    {
        title: "La gazza ladra",
        composer: "Rossini, Gioachino",
        date: "1817",
        Translation: "The Thieving Magpie",
        Librettist: "Giovanni Gherardini",
        language: "Italian",
        "Based on": "La pie voleuse",
        Premiere: "31 May 1817"
    },
    {
        title: "Genevi\xe8ve de Brabant",
        composer: "Offenbach",
        date: "1859",
        Librettist: "\n",
        language: "French",
        "Based on": "Genevieve of Brabant",
        Premiere: "19 November 1859"
    },
    {
        title: "Genoveva",
        composer: "Schumann",
        date: "1850",
        Librettist: "\n",
        language: "German",
        "Based on": "Genevieve of Brabant",
        Premiere: "25 June 1850"
    },
    {
        title: "Das Gesicht im Spiegel",
        composer: "Widmann",
        date: "2003",
        Translation: "The Face in the Mirror",
        Librettist: "Roland Schimmelpfennig",
        language: "German",
        Premiere: "17 July 2003"
    },
    {
        title: "The Ghosts of Versailles",
        composer: "Corigliano",
        date: "1991",
        Librettist: "William M. Hoffman",
        language: "English",
        "Based on": "La M\xe8re coupable",
        Premiere: "19 December 1991"
    },
    {
        title: "Gianni Schicchi",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giovacchino Forzano",
        language: "Italian",
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
        language: "Italian",
        "Based on": "Angelo, Tyrant of Padua",
        Premiere: "8 April 1876"
    },
    {
        title: "Un giorno di regno",
        composer: "Verdi, Giuseppe",
        date: "1840",
        "Other title": "Il finto Stanislao",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Alexandre-Vincent Pineux Duval",
        Premiere: "5 September 1840"
    },
    {
        title: "Giovanna d'Arco",
        composer: "Verdi, Giuseppe",
        date: "1845",
        Librettist: "Temistocle Solera",
        language: "Italian",
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
        language: "English",
        "Based on": "Elizabeth and Essex: A Tragic History",
        Premiere: "8 June 1953"
    },
    {
        title: "The Golden Cockerel",
        composer: "Rimsky-Korsakov",
        date: "1907",
        Librettist: "Vladimir Belsky",
        language: "Russian",
        "Based on": "Pushkin",
        Premiere: "7 October 1909"
    },
    {
        title: "Le coq d'or",
        composer: "Rimsky-Korsakov",
        date: "1907",
        Librettist: "Vladimir Belsky",
        language: "French",
        "Based on": "Pushkin",
        Premiere: "7 October 1909"
    },
    {
        title: "G\xf6tterd\xe4mmerung",
        composer: "Wagner",
        date: "1876",
        Translation: "Twilight of the Gods",
        Librettist: "Richard Wagner",
        language: "German",
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
        language: "German",
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
        language: "English",
        "Based on": "The Greek Passion",
        Premiere: "19 June 1961"
    },
    {
        title: "Il Guarany",
        composer: "Gomes, Carlos",
        date: "Carlos Gomes",
        Librettist: "\n",
        language: "Italian",
        "Based on": "O Guarani",
        Premiere: "19 March 1870"
    },
    {
        title: "Guillaume TellWilliam Tell",
        composer: "Rossini, Gioachino",
        date: "1829",
        Librettist: "\n",
        language: "French",
        "Based on": "Wilhelm Tell",
        Premiere: "3 August 1829"
    },
    {
        title: "Hagith",
        composer: "Szymanowski, Karol",
        date: "1922",
        Librettist: "Felix D\xf6rmann",
        language: "German",
        Premiere: "13 May 1922"
    },
    {
        title: "Halka",
        composer: "Moniuszko",
        date: "1854",
        Librettist: "W\u0142odzimierz Wolski",
        language: "Polish",
        Premiere: "28 February 1854"
    },
    {
        title: "The Handmaid's Tale",
        composer: "Ruders, Poul",
        date: "2000"
    },
    {
        title: "H\xe4nsel und Gretel",
        composer: "Humperdinck",
        date: "1893",
        Librettist: "Adelheid Wette",
        language: "German",
        Premiere: "23 December 1893"
    },
    {
        title: "H\xe1ry J\xe1nos",
        composer: "Kod\xe1ly",
        date: "1926",
        Librettist: "\n",
        language: "Hungarian",
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
        language: "Polish",
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
        language: "French",
        "Based on": "Franc-Nohain's play",
        Premiere: "19 May 1911"
    },
    {
        title: "Die Hochzeit",
        composer: "Wagner",
        date: "Wagner",
        Librettist: "Richard Wagner",
        language: "German"
    },
    {
        title: "Hugh the Drover",
        composer: "Williams, Vaughan",
        date: "1958",
        Librettist: "Harold Child",
        language: "English",
        Premiere: "14 July 1924"
    },
    {
        title: "Les Huguenots",
        composer: "Meyerbeer, Giacomo",
        date: "1836",
        Librettist: "\n",
        language: "French",
        Premiere: "29 February 1836"
    },
    {
        title: "The Ice Break",
        composer: "Tippett, Michael",
        date: "1977",
        Librettist: "Michael Tippett",
        language: "English",
        Premiere: "7 July 1977"
    },
    {
        title: "Idomeneo",
        composer: "Mozart",
        date: "1781",
        Librettist: "Giambattista Varesco",
        language: "Italian",
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
        language: "French",
        Premiere: "23 August 1735"
    },
    {
        title: "Iolanta",
        composer: "Tchaikovsky",
        date: "1892",
        "Native title": "Russian: ",
        Librettist: "Modest Tchaikovsky",
        language: "Russian",
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
        composer: "Mascagni, Pietro",
        date: "1899",
        Librettist: "Luigi Illica",
        language: "Italian",
        Premiere: "22 November 1898"
    },
    {
        title: "L'\xeele de Tulipatan",
        composer: "Offenbach",
        date: "1868",
        Librettist: "\n",
        language: "French",
        Premiere: "30 September 1868"
    },
    {
        title: "L'italiana in Algeri",
        composer: "Rossini, Gioachino",
        date: "1813",
        Translation: "The Italian Girl in Algiers",
        Librettist: "Angelo Anelli",
        language: "Italian",
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
        language: "Czech",
        Premiere: "12 February 1889"
    },
    {
        title: "Jen\u016Ffa",
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1904",
        "Native title": "Jej\xed pastorky\u0148a ",
        Librettist: "Jan\xe1\u010Dek",
        language: "Czech",
        "Based on": "Jej\xed pastorky\u0148a",
        Premiere: "21 January 1904"
    },
    {
        title: "J\xe9rusalem",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "\n",
        language: "French",
        "Based on": "I Lombardi alla prima crociata",
        Premiere: "26 November 1847"
    },
    {
        title: "I gioielli della Madonna",
        composer: "Wolf-Ferrari",
        date: "1911",
        Translation: "The Jewels of the Madonna",
        Librettist: "\n",
        language: "Italian",
        Premiere: "23 December 1911"
    },
    {
        title: "Judith",
        composer: "Serov",
        date: "1863",
        "Native title": "Russian",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Book of Judith",
        Premiere: "16 May 1863"
    },
    {
        title: "Juha",
        composer: "Merikanto, Aarre",
        date: "Aarre Merikanto"
    },
    {
        title: "La Juive",
        composer: "Hal\xe9vy",
        date: "1835",
        Translation: "The Jewess",
        Librettist: "Eug\xe8ne Scribe",
        language: "French",
        Premiere: "23 February 1835"
    },
    {
        title: "Julie",
        composer: "Boesmans",
        date: "2005",
        Librettist: "\n",
        language: "German",
        "Based on": "August Strindberg",
        Premiere: "2005"
    },
    {
        title: "Der Kaiser von Atlantis",
        composer: "Ullmann",
        date: "1975",
        Translation: "The Emperor of Atlantis",
        Librettist: "Peter Kien",
        language: "German",
        Premiere: "16 December 1975"
    },
    {
        title: "Kaiserin Josephine",
        composer: "K\xe1lm\xe1n",
        date: "1936"
    },
    {
        title: "Die Kalewainen in Pochjola",
        composer: "M\xfcller-Berghaus, K.",
        date: "2017",
        Translation: "The men of Kaleva in the Northland",
        "Other title": "Kalevalaiset Pohjolassa",
        Librettist: "Fritz W. O. Spengler",
        language: "German",
        "Based on": "Kalevala",
        Premiere: "28 February 2017",
        "Website": "http://www.kalewainen.fi/"
    },
    {
        title: "K\xe1\u0165a Kabanov\xe1",
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1921",
        Librettist: "Vincenc \u010Cervinka",
        language: "Czech",
        "Based on": "The Storm",
        Premiere: "23 November 1921"
    },
    {
        title: "Khovanshchina",
        composer: "Mussorgsky, Modest",
        date: "1886",
        "Native title": "\u0425\u043E\u0432\u0430\u043D\u0449\u0438\u043D\u0430",
        language: "Russian",
        Premiere: "9 February 1886"
    },
    {
        title: "King RogerKr\xf3l Roger",
        composer: "Szymanowski, Karol",
        date: "1926",
        Librettist: "Karol Szymanowski",
        language: "Polish",
        Premiere: "19 June 1926"
    },
    {
        title: "King Priam",
        composer: "Tippett, Michael",
        date: "Michael Tippett",
        Librettist: "Tippett",
        language: "English",
        "Based on": "Iliad",
        Premiere: "29 May 1962"
    },
    {
        title: "Koanga",
        composer: "Delius, Frederick",
        date: "Frederick Delius",
        Librettist: "Charles F. Keary",
        language: "English",
        "Based on": "The Grandissimes: A Story of Creole Life",
        Premiere: "13 June 1904"
    },
    {
        title: "The Knot Garden",
        composer: "Tippett, Michael",
        date: "1970",
        Librettist: "Tippett",
        language: "English",
        Premiere: "2 December 1970"
    },
    {
        title: "Kr\xfat\u0148ava",
        composer: "Sucho\u0148, Eugen",
        date: "1949"
    },
    {
        title: "Lady Macbeth of Mtsensk",
        composer: "Shostakovich",
        date: "1934",
        "Native title": "Russian: ",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Lady Macbeth of the Mtsensk District",
        Premiere: "22 January 1934"
    },
    {
        title: "Lakm\xe9",
        composer: "Delibes",
        date: "1883",
        Librettist: "\n",
        language: "French",
        "Based on": 'Th\xe9odore Pavie\'s story "Les babouches du Brahamane"',
        Premiere: "14 April 1883"
    },
    {
        title: "Das Land des L\xe4chelnsThe Land of Smiles",
        composer: "Leh\xe1r",
        date: "1929",
        Librettist: "\n",
        language: "German",
        Premiere: "10 October 1929"
    },
    {
        title: "The Legend of the Invisible City of Kitezh and the Maiden Fevroniya",
        composer: "Rimsky-Korsakov",
        date: "1912",
        "Native title": "Russian",
        Librettist: "Vladimir Belsky",
        language: "Russian",
        "Based on": "Russian legends",
        Premiere: "20. February 1907"
    },
    {
        title: "Leo, the Royal Cadet",
        composer: "Telgmann, Oscar Ferdinand",
        date: "1889",
        Librettist: "George Frederick Cameron"
    },
    {
        title: "The Letter",
        composer: "Moravec, Paul",
        date: "2009"
    },
    {
        title: "La liberazione di Ruggiero dall'isola d'Alcina",
        composer: "Caccini",
        date: "1625",
        Librettist: "Ferdinando Saracinelli",
        language: "Italian",
        "Based on": "Orlando Furioso",
        Premiere: "3 February 1625"
    },
    {
        title: "Das Liebesverbot",
        composer: "Wagner",
        date: "1836",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Shakespeare's",
        Premiere: "29 March 1836"
    },
    {
        title: "Life is a Dream",
        composer: "Spratlan, Lewis",
        date: "2010"
    },
    {
        title: "The Little Prince",
        composer: "Portman",
        date: "2003",
        Librettist: "Nicholas Wright",
        language: "English",
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
        composer: "Adamo, Mark",
        date: "1999",
        Librettist: "Mark Adamo",
        language: "English",
        "Based on": "Little Women",
        Premiere: "March 13, 1998"
    },
    {
        title: "Lohengrin",
        composer: "Wagner",
        date: "1850",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Medieval German Romance",
        Premiere: "28 August 1850"
    },
    {
        title: "I Lombardi",
        composer: "Verdi, Giuseppe",
        date: "1843",
        Librettist: "Temistocle Solera",
        language: "Italian",
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
        composer: "Charpentier, Gustave",
        date: "1900",
        Librettist: "Gustave Charpentier",
        language: "French",
        Premiere: "2 February 1900 (1900-02-02)"
    },
    {
        title: "The Love for Three Oranges",
        composer: "Prokofiev",
        date: "1921",
        "Native title": "\u041B\u044E\u0431\u043E\u0432\u044C \u043A \u0442\u0440\u0451\u043C \u0430\u043F\u0435\u043B\u044C\u0441\u0438\u043D\u0430\u043C, (Lyubov' k tryom apel'sinam)",
        Librettist: "Prokofiev",
        language: "Russian",
        "Based on": "L'amore delle tre melarance",
        Premiere: "30 December 1921"
    },
    {
        title: "L'amour des trois oranges",
        composer: "Prokofiev",
        date: "1921",
        Librettist: "Prokofiev",
        language: "French",
        "Based on": "L'amore delle tre melarance",
        Premiere: "30 December 1921"
    },
    {
        title: "Lucia di Lammermoor",
        composer: "Donizetti, Gaetano",
        date: "1835",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "The Bride of Lammermoor",
        Premiere: "26 September 1835"
    },
    {
        title: "Lucio Silla",
        composer: "Mozart",
        date: "1772",
        Librettist: "Giovanni de Gamerra",
        language: "Italian",
        Premiere: "26 December 1772"
    },
    {
        title: "Lucrezia Borgia",
        composer: "Donizetti, Gaetano",
        date: "1834",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Lucrezia Borgia",
        Premiere: "26 December 1833"
    },
    {
        title: "Luisa Miller",
        composer: "Verdi, Giuseppe",
        date: "1849",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "Kabale und Liebe",
        Premiere: "8 December 1849"
    },
    {
        title: "Lulu",
        composer: "Berg",
        date: "1937",
        Librettist: "Berg",
        language: "German",
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
        language: "German",
        "Based on": "The Merry Wives of Windsor",
        Premiere: "9 March 1849"
    },
    {
        title: "Macbeth",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Macbeth",
        Premiere: "14 March 1847 (1847-03-14) (Italian)\n21 April 1865 (1865-04-21) (French)"
    },
    {
        title: "Madama Butterfly",
        composer: "Puccini",
        date: "1904",
        Librettist: "\n",
        language: "Italian",
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
        language: "Russian",
        "Based on": "Joan of Arc",
        Premiere: "25 February 1881"
    },
    {
        title: "The Makropulos Affair",
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1926",
        "Native title": "V\u011Bc Makropulos",
        "Other title": "The Makropoulos Case",
        Librettist: "Jan\xe1\u010Dek",
        language: "Czech",
        "Based on": "V\u011Bc Makropulos",
        Premiere: "18 December 1926"
    },
    {
        title: "Les Mamelles de Tir\xe9sias",
        composer: "Poulenc",
        date: "1947",
        Translation: "The Breasts of Tiresias",
        Librettist: "Poulenc",
        language: "French",
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
        date: "1986"
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
        language: "French",
        "Based on": "Manon Lescaut",
        Premiere: "19 January 1884"
    },
    {
        title: "Manon Lescaut",
        composer: "Puccini",
        date: "1893",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Abb\xe9 Pr\xe9vost",
        Premiere: "1 February 1893"
    },
    {
        title: "Mare nostro",
        composer: "Ferrero, Lorenzo",
        date: "1985",
        Librettist: "Marco Ravasini",
        language: "Italian",
        "Based on": "Vittorio Alfieri",
        Premiere: "11 September 1985"
    },
    {
        title: "Margaret Garner",
        composer: "Danielpour",
        date: "2005",
        Librettist: "Toni Morrison",
        language: "English",
        Premiere: "7 May 2005"
    },
    {
        title: "Mar\xeda de Buenos Aires",
        composer: "Piazzolla",
        date: "1968",
        Librettist: "Horacio Ferrer",
        language: "Spanish",
        Premiere: "8 May 1968"
    },
    {
        title: "Maria Golovin",
        composer: "Menotti",
        date: "1958",
        Librettist: "Menotti",
        language: "English",
        Premiere: "August 20, 1958"
    },
    {
        title: "Maria Stuarda",
        composer: "Donizetti, Gaetano",
        date: "1835",
        Librettist: "Giuseppe Bardari",
        language: "Italian",
        "Based on": "Maria Stuart",
        Premiere: "30 December 1835"
    },
    {
        title: "Marilyn",
        composer: "Ferrero, Lorenzo",
        date: "1980",
        Librettist: "\n",
        language: "English",
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
        language: "German",
        "Based on": "Jules-Henri Vernoy de Saint-Georges",
        Premiere: "25 November 1847"
    },
    {
        title: "Les martyrs",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "Eug\xe8ne Scribe",
        language: "French",
        "Based on": "Polyeucte",
        Premiere: "10 April 1840"
    },
    {
        title: "The Mask of Orpheus",
        composer: "Birtwistle",
        date: "1968",
        Librettist: "Peter Zinovieff",
        language: "English",
        "Based on": "Orpheus",
        Premiere: "21 May 1986"
    },
    {
        title: "I masnadieri",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "Andrea Maffei",
        language: "Italian",
        "Based on": "Friedrich von Schiller",
        Premiere: "22 July 1847"
    },
    {
        title: "Maskarade",
        composer: "Nielsen",
        date: "1906",
        Librettist: "Vilhelm Andersen",
        language: "Danish",
        Premiere: "11 November 1906"
    },
    {
        title: "Mateo Falcone",
        composer: "Cui",
        date: "1907"
    },
    {
        title: "Mathis der Maler",
        composer: "Hindemith, Paul",
        date: "1938",
        Translation: "Matthias the Painter",
        Librettist: "Hindemith",
        language: "German",
        "Based on": "Matthias Gr\xfcnewald",
        Premiere: "28 May 1938"
    },
    {
        title: "Il matrimonio segreto",
        composer: "Cimarosa",
        date: "1792",
        Translation: "The Secret Marriage",
        Librettist: "Giovanni Bertati",
        language: "Italian",
        "Based on": "The Clandestine Marriage",
        Premiere: "7 February 1792"
    },
    {
        title: "Mavra",
        composer: "Stravinsky",
        date: "1922",
        Librettist: "Boris Kochno",
        language: "Russian",
        "Based on": "The Little House in Kolomna",
        Premiere: "18 May 1922"
    },
    {
        title: "May Night",
        composer: "Rimsky-Korsakov",
        date: "1880",
        "Native title": "Russian",
        language: "Russian",
        "Based on": "May Night, or the Drowned Maiden",
        Premiere: "1892"
    },
    {
        title: "Mazeppa",
        composer: "Tchaikovsky",
        date: "1884",
        "Native title": "Russian: ",
        Librettist: "Victor Burenin",
        language: "Russian",
        "Based on": "Poltava",
        Premiere: "15 February 1884"
    },
    {
        title: "M\xe9d\xe9e",
        composer: "Cherubini",
        date: "1797",
        Librettist: "Fran\xe7ois-Beno\xeet Hoffmann",
        language: "French",
        "Based on": "Medea",
        Premiere: "13 March 1797"
    },
    {
        title: "M\xe9d\xe9e",
        composer: "Charpentier, Marc-Antoine",
        date: "1693"
    },
    {
        title: "The Medium",
        composer: "Menotti",
        date: "1946",
        Librettist: "Menotti",
        language: "English",
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
        language: "German",
        Premiere: "21 June 1868"
    },
    {
        title: "The Merchant Kalashnikov",
        composer: "Rubinstein, Anton",
        date: "1880"
    },
    {
        title: "La Merope",
        composer: "Giacomelli",
        date: "1734"
    },
    {
        title: "The Midsummer Marriage",
        composer: "Tippett, Michael",
        date: "Michael Tippett",
        Librettist: "Tippett",
        language: "English",
        "Based on": "The Magic Flute",
        Premiere: "27 January 1955"
    },
    {
        title: "A Midsummer Night's Dream",
        composer: "Britten",
        date: "1960",
        Librettist: "\n",
        language: "English",
        "Based on": "A Midsummer Night's Dream",
        Premiere: "11 June 1960"
    },
    {
        title: "Mignon",
        composer: "Thomas",
        date: "1866",
        Librettist: "\n",
        language: "French",
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
        language: "Russian",
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
        language: "German",
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
        language: "Russian",
        Premiere: "1892"
    },
    {
        title: "Montag aus Licht",
        composer: "Stockhausen",
        date: "1988",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "May 7, 1988"
    },
    {
        title: "Moses und Aron",
        composer: "Schoenberg",
        date: "1957",
        Translation: "Moses and Aaron",
        Librettist: "Schoenberg",
        language: "German",
        "Based on": "Book of Exodus",
        Premiere: "6 June 1957"
    },
    {
        title: "The Most Important Man",
        composer: "Menotti",
        date: "1971",
        Librettist: "Gian Carlo Menotti",
        language: "English",
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
        language: "Russian",
        "Based on": "Mozart and Salieri",
        Premiere: "1898"
    },
    {
        title: "Nabucco",
        composer: "Verdi, Giuseppe",
        date: "1842",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Play",
        Premiere: "9 March 1842"
    },
    {
        title: "Eine Nacht in Venedig",
        composer: "Strauss, Johann",
        date: "1883"
    },
    {
        title: "N\u0119dza uszcz\u0119\u015Bliwiona",
        composer: "Kamie\u0144ski, Maciej",
        date: "1778"
    },
    {
        title: "The New Moon",
        composer: "Romberg",
        date: "1928"
    },
    {
        title: "The Nightingale",
        composer: "Stravinsky",
        date: "1914",
        "Native title": "\u0421\u043E\u043B\u043E\u0432\u0435\u0439",
        "Other title": "Le rossignol",
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
        composer: "Adams, John",
        date: "2000"
    },
    {
        title: "Nixon in China",
        composer: "Adams, John",
        date: "1987",
        Librettist: "Alice Goodman",
        language: "English",
        Premiere: "October 22, 1987",
        "Website": "www.earbox.com/nixon-in-china/"
    },
    {
        title: "Norma",
        composer: "Bellini, Vincenzo",
        date: "1831",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Alexandre Soumet",
        Premiere: "26 December 1831"
    },
    {
        title: "The Nose",
        composer: "Shostakovich",
        date: "1930",
        "Native title": "Russian: ",
        Librettist: "\n",
        language: "Russian",
        "Based on": "The Nose",
        Premiere: "18 January 1930"
    },
    {
        title: "The Marriage of Figaro",
        composer: "Mozart",
        date: "1786",
        "Native title": "Le nozze di Figaro",
        Librettist: "Lorenzo Da Ponte",
        language: "Italian",
        "Based on": "La folle journ\xe9e, ou le Mariage de Figaro",
        Premiere: "1 May 1786"
    },
    {
        title: "Oberto Conte di San Bonifacio",
        composer: "Verdi, Giuseppe",
        date: "1839",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Antonio Piazza",
        Premiere: "17 November 1839"
    },
    {
        title: "L'oca del Cairo",
        composer: "Mozart",
        date: "1783",
        Translation: "The Goose of Cairo",
        Librettist: "Giovanni Battista Varesco",
        language: "Italian"
    },
    {
        title: "\u0152dipe",
        composer: "Enescu, George",
        date: "1936",
        Librettist: "Edmond Fleg",
        language: "French",
        "Based on": "The Theban plays",
        Premiere: "13 March 1936"
    },
    {
        title: "Oedipus rex",
        composer: "Stravinsky, Igor",
        date: "1927",
        Librettist: "Jean Cocteau",
        "Based on": "Oedipus Rex",
        Premiere: "30 May 1927"
    },
    {
        title: "The Old Maid and the Thief",
        composer: "Menotti",
        date: "1939",
        Librettist: "Menotti",
        language: "English",
        Premiere: "April 22, 1939"
    },
    {
        title: "Operation Orfeo",
        composer: "Holten, Bo",
        date: "Bo Holten"
    },
    {
        title: "Das Opfer",
        composer: "Zillig, Winfried",
        date: "Winfried Zillig",
        Translation: "The Sacrifice",
        Librettist: "Reinhard Goering",
        language: "German",
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
        language: "Italian",
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
        composer: "Verdi, Giuseppe",
        date: "1887",
        Librettist: "Arrigo Boito",
        language: "Italian",
        "Based on": "Othello",
        Premiere: "5 February 1887"
    },
    {
        title: "Otello",
        composer: "Rossini, Gioachino",
        date: "1816",
        Librettist: "Francesco Maria Berio di Salsa",
        language: "Italian",
        Premiere: "4 December 1816"
    },
    {
        title: "Owen Wingrave",
        composer: "Britten",
        date: "1971",
        Librettist: "Myfanwy Piper",
        language: "English",
        "Based on": "Henry James",
        Premiere: "16 May 1971"
    },
    {
        title: "Pagliacci",
        composer: "Leoncavallo",
        date: "1892",
        Librettist: "Ruggero Leoncavallo",
        language: "Italian",
        Premiere: "21 May 1892"
    },
    {
        title: "Paradise Lost",
        composer: "Penderecki",
        date: "1978",
        Librettist: "Christopher Fry",
        language: "English",
        "Based on": '"Paradise Lost" by John Milton',
        Premiere: "29 November 1978"
    },
    {
        title: "Parsifal",
        composer: "Wagner",
        date: "1882",
        Librettist: "Richard Wagner",
        language: "German",
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
        language: "French",
        Premiere: "30 September 1863"
    },
    {
        title: "Pell\xe9as et M\xe9lisande",
        composer: "Debussy",
        date: "1902",
        language: "French",
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
        composer: "Ferrero, Lorenzo",
        date: "2007",
        Librettist: "Giuseppe Di Leva",
        language: "Italian",
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
        language: "English",
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
        composer: "Ad\xe8s, Thomas",
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
        language: "Russian",
        "Based on": "Live Not as You Would Like To",
        Premiere: "14 April 1871"
    },
    {
        title: "Prince Igor",
        composer: "Borodin",
        date: "1890",
        "Native title": "Russian",
        Librettist: "Borodin",
        language: "Russian",
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
        composer: "Bellini, Vincenzo",
        date: "1835",
        Librettist: "Carlo Pepoli",
        language: "Italian",
        "Based on": "T\xeates Rondes et Cavalieres",
        Premiere: "24 January 1835"
    },
    {
        title: "Puss in Boots",
        composer: "Cui",
        date: "1915"
    },
    {
        title: "The Queen of Spades",
        composer: "Tchaikovsky",
        date: "1890",
        "Native title": "\u041F\u0438\u043A\u043E\u0432\u0430\u044F \u0434\u0430\u043C\u0430",
        Librettist: "Modest Tchaikovsky",
        language: "Russian",
        "Based on": "The Queen of Spades",
        Premiere: "29 March 1890"
    },
    {
        title: "A Quiet Place",
        composer: "Bernstein",
        date: "1983",
        Librettist: "Stephen Wadsworth",
        language: "English",
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
        language: "English",
        "Based on": "Le Viol de Lucr\xe8ce",
        Premiere: "12 July 1946"
    },
    {
        title: "Il re pastore",
        composer: "Mozart",
        date: "1775",
        Librettist: "Metastasio",
        language: "Italian",
        "Based on": "Aminta",
        Premiere: "23 April 1775"
    },
    {
        title: "El retablo de maese Pedro",
        composer: "Falla, de",
        date: "1923",
        Translation: "Master Peter's Puppet Show",
        language: "Spanish",
        "Based on": "Don Quixote",
        Premiere: "25 June 1923"
    },
    {
        title: "Das Rheingold",
        composer: "Wagner",
        date: "1869",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "22 September 1869"
    },
    {
        title: "Rienzi",
        composer: "Wagner",
        date: "1842",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "20 October 1842"
    },
    {
        title: "Rigoletto",
        composer: "Verdi, Giuseppe",
        date: "1851",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
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
        language: "German",
        Premiere: "\nIndividually:\n22 September 1869 (22 September 1869) Das Rheingold\n26 June 1870 (26 June 1870) Die Walk\xfcre\nAs a cycle:\n13 August 1876 (1876-08-13) Das Rheingold\n14 August 1876 Die Walk\xfcre\n16 August 1876 Siegfried\n17 August 1876 G\xf6tterd\xe4mmerung\n"
    },
    {
        title: "R\xedo de Sangre",
        composer: "Davis, Don",
        date: "2010",
        Librettist: "Kate Gale",
        language: "Spanish",
        Premiere: "22 October 2010"
    },
    {
        title: "Risorgimento!",
        composer: "Ferrero, Lorenzo",
        date: "2011",
        Librettist: "Dario Oliveri",
        language: "Italian",
        Premiere: "26 March 2011"
    },
    {
        title: "Il ritorno d'Ulisse in patria",
        composer: "Monteverdi",
        date: "1640",
        Librettist: "Giacomo Badoaro",
        language: "Italian",
        "Based on": "Homer",
        Premiere: "1639\u20131640 "
    },
    {
        title: "Roberto Devereux",
        composer: "Donizetti, Gaetano",
        date: "1837",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
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
        language: "Russian",
        "Based on": "Mikhail Zagoskin",
        Premiere: "27 October 1865"
    },
    {
        title: "Le roi de Lahore",
        composer: "Massenet",
        date: "1877",
        Librettist: "Louis Gallet",
        language: "French",
        Premiere: "27 April 1877"
    },
    {
        title: "Rom\xe9o et Juliette",
        composer: "Gounod",
        date: "1867",
        Librettist: "\n",
        language: "French",
        "Based on": "Romeo and Juliet",
        Premiere: "27 April 1867"
    },
    {
        title: "La rondine",
        composer: "Puccini",
        date: "1917",
        Librettist: "Giuseppe Adami",
        language: "Italian",
        Premiere: "27 March 1917"
    },
    {
        title: "Der Rosenkavalier",
        composer: "Strauss, Richard",
        date: "1911",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        Premiere: "26 January 1911"
    },
    {
        title: "The Rose of Castille",
        composer: "Balfe, Michael",
        date: "1857",
        Librettist: "\n",
        language: "English",
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
        language: "Czech",
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
        language: "Russian",
        Premiere: "7 January 1898"
    },
    {
        title: "Saint Fran\xe7ois d'Assise",
        composer: "Messiaen",
        date: "1983",
        Librettist: "Messiaen",
        language: "French",
        "Based on": "Francis of Assisi",
        Premiere: "28 November 1983"
    },
    {
        title: "The Saint of Bleecker Street",
        composer: "Menotti",
        date: "1954",
        Librettist: "Menotti",
        language: "English",
        Premiere: "December 27, 1954"
    },
    {
        title: "Salammb\xf4",
        composer: "Reyer",
        date: "1890",
        Librettist: "Camille du Locle",
        language: "French",
        "Based on": "Gustave Flaubert",
        Premiere: "10 February 1890"
    },
    {
        title: "Salome",
        composer: "Strauss, Richard",
        date: "1905",
        Librettist: "Oscar Wilde",
        language: "German",
        Premiere: "9 December 1905"
    },
    {
        title: "Salvatore Giuliano",
        composer: "Ferrero, Lorenzo",
        date: "1986",
        Librettist: "Giuseppe Di Leva",
        language: "Italian",
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
        language: "German",
        Premiere: "May 25, 1984"
    },
    {
        title: "Samson et Dalila",
        composer: "Saint-Sa\xebns",
        date: "1877",
        Librettist: "Ferdinand Lemaire",
        language: "French",
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
        composer: "Jan\xe1\u010Dek, Leo\u0161",
        date: "1925",
        Librettist: "Julius Zeyer",
        language: "Czech",
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
        language: "German",
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
        language: "German",
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
        composer: "Rossini, Gioachino",
        date: "1823",
        Librettist: "Gaetano Rossi",
        language: "Italian",
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
        composer: "Lens, Nicholas",
        date: "2014",
        Librettist: "\n",
        language: "English",
        Premiere: "24 October 2014"
    },
    {
        title: "Le si\xe8ge de Corinthe",
        composer: "Rossini, Gioachino",
        date: "1826",
        Translation: "The Siege of Corinth",
        Librettist: "\n",
        language: "French",
        "Based on": "Third Siege of Missolonghi",
        Premiere: "9 October 1826"
    },
    {
        title: "Shining Brow",
        composer: "Hagen",
        date: "1992",
        Librettist: "Paul Muldoon",
        language: "English",
        Premiere: "April 21, 1993"
    },
    {
        title: "Siegfried",
        composer: "Wagner",
        date: "1876",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "16 August 1876"
    },
    {
        title: "Simon Boccanegra",
        composer: "Verdi, Giuseppe",
        date: "1857",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Antonio Garc\xeda Guti\xe9rrez",
        Premiere: "\n12 March 1857 (1857-03-12) (first version)\n24 March 1881 (1881-03-24) (second version)\n"
    },
    {
        title: "Simplicius",
        composer: "Strauss, Johann",
        date: "1887"
    },
    {
        title: "The Skating Rink",
        composer: "Sawer",
        date: "2018"
    },
    {
        title: "Slow Man",
        composer: "Lens, Nicholas",
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
        language: "Russian",
        "Based on": "The Snow Maiden",
        Premiere: "29 January 1882"
    },
    {
        title: "Il sogno di Scipione",
        composer: "Mozart",
        date: "1772",
        Librettist: "Pietro Metastasio",
        language: "Italian",
        "Based on": "Somnium Scipionis",
        Premiere: "1 May 1772"
    },
    {
        title: "La sonnambula",
        composer: "Bellini, Vincenzo",
        date: "1831",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "La somnambule, ou L'arriv\xe9e d'un nouveau seigneur",
        Premiere: "6 March 1831"
    },
    {
        title: "Sonntag aus Licht",
        composer: "Stockhausen",
        date: "2011",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "April 9, 2011"
    },
    {
        title: "Lo sposo deluso",
        composer: "Mozart",
        date: "1783",
        Translation: "The Deluded Bridegroom",
        Librettist: "unknown poet",
        language: "Italian",
        "Based on": "Cimarosa"
    },
    {
        title: "Stiffelio",
        composer: "Verdi, Giuseppe",
        date: "Giuseppe Verdi",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
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
        language: "English",
        "Based on": "Street Scene",
        Premiere: "9 January 1947"
    },
    {
        title: "Suor Angelica",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giovacchino Forzano",
        language: "Italian",
        Premiere: "14 December 1918"
    },
    {
        title: "Susannah",
        composer: "Floyd",
        date: "1955",
        Librettist: "Floyd",
        language: "English",
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
        language: "Italian",
        "Based on": "La houppelande",
        Premiere: "14 December 1918"
    },
    {
        title: "The Tale of Tsar Saltan",
        composer: "Rimsky-Korsakov",
        date: "1900",
        Librettist: "Vladimir Belsky",
        language: "Russian",
        "Based on": "The Tale of Tsar Saltan",
        Premiere: "3 November 1900"
    },
    {
        title: "Tancredi",
        composer: "Rossini, Gioachino",
        date: "1813",
        Librettist: "Gaetano Rossi",
        language: "Italian",
        "Based on": "Tancr\xe8de",
        Premiere: "6 February 1813"
    },
    {
        title: "Tannh\xe4user",
        composer: "Wagner",
        date: "1845",
        "Native title": "Tannh\xe4user und der S\xe4ngerkrieg auf Wartburg",
        Librettist: "Richard Wagner",
        language: "German",
        Premiere: "19 October 1845"
    },
    {
        title: "Tartuffe",
        composer: "Mechem",
        date: "1980"
    },
    {
        title: "Tea: A Mirror of Soul",
        composer: "Dun, Tan",
        date: "2007"
    },
    {
        title: "The Tempest",
        composer: "Ad\xe8s, Thomas",
        date: "2004"
    },
    {
        title: "The Tender Land",
        composer: "Copland",
        date: "1954",
        Librettist: "Horace Everett",
        language: "English",
        Premiere: "April 1, 1954"
    },
    {
        title: "Th\xe9r\xe8se Raquin",
        composer: "Picker",
        date: "2001",
        Librettist: "Gene Scheer",
        language: "English",
        "Based on": "Th\xe9r\xe8se Raquin",
        Premiere: "November 30, 2001"
    },
    {
        title: "The Three Feathers",
        composer: "Laitman",
        date: "2014",
        "Other title": "Die drei Federn"
    },
    {
        title: "Tha\xefs",
        composer: "Massenet",
        date: "1894",
        Librettist: "Louis Gallet",
        language: "French",
        "Based on": "Tha\xefs",
        Premiere: "16 March 1894"
    },
    {
        title: "Die Dreigroschenoper",
        Translation: "The Threepenny Opera",
        composer: "Weill, Kurt",
        date: "1928"
    },
    {
        title: "Three Tales",
        composer: "Reich",
        date: "2002",
        language: "English",
        Premiere: "May 12, 2002"
    },
    {
        title: "Tiefland",
        composer: "d'Albert, Eugen",
        date: "1911",
        Translation: "The Lowlands",
        Librettist: "Rudolf Lothar",
        language: "German",
        "Based on": "Terra baixa",
        Premiere: "15 November 1903"
    },
    {
        title: "Tosca",
        composer: "Puccini",
        date: "1900",
        Librettist: "\n",
        language: "Italian",
        "Based on": "La Tosca",
        Premiere: "14 January 1900"
    },
    {
        title: "La traviata",
        composer: "Verdi, Giuseppe",
        date: "1853",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
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
        language: "German",
        "Based on": "Tristan and Iseult",
        Premiere: "10 June 1865"
    },
    {
        title: "Trouble in Tahiti",
        composer: "Bernstein",
        date: "1952",
        Librettist: "Leonard Bernstein",
        language: "English",
        Premiere: "12 June 1952"
    },
    {
        title: "Il trovatore",
        composer: "Verdi, Giuseppe",
        date: "1853",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "Antonio Garc\xeda Guti\xe9rrez",
        Premiere: "19 January 1853"
    },
    {
        title: "Troy",
        composer: "Hoinic, Bujor",
        date: "2018",
        Librettist: "Artun Hoinic",
        language: "Turkish",
        "Based on": "Iliad",
        Premiere: "9 November 2018"
    },
    {
        title: "Les Troyens",
        composer: "Berlioz",
        date: "1863",
        Librettist: "Berlioz",
        language: "French",
        "Based on": "Aeneid",
        Premiere: "4 November 1863"
    },
    {
        title: "The Tsar's Bride",
        composer: "Rimsky-Korsakov",
        date: "1899",
        "Native title": "Russian",
        Librettist: "Ilia Tyumenev",
        language: "Russian",
        "Based on": "The Tsar's Bride",
        Premiere: "1899"
    },
    {
        title: "Turandot",
        composer: "Puccini",
        date: "1926",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Carlo Gozzi",
        Premiere: "25 April 1926"
    },
    {
        title: "Il turco in Italia",
        composer: "Rossini, Gioachino",
        date: "1814",
        Translation: "The Turk in Italy",
        Librettist: "Felice Romani",
        language: "Italian",
        Premiere: "14 August 1814"
    },
    {
        title: "The Turn of the Screw",
        composer: "Britten",
        date: "1954",
        Librettist: "Myfanwy Piper",
        language: "English",
        "Based on": "The Turn of the Screw",
        Premiere: "14 September 1954"
    },
    {
        title: "Vanessa",
        composer: "Barber",
        date: "1958",
        Librettist: "Gian Carlo Menotti",
        language: "English",
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
        language: "Polish",
        Premiere: "1 January 1861"
    },
    {
        title: "La vestale",
        composer: "Spontini",
        date: "1807",
        Librettist: "\xc9tienne de Jouy",
        language: "French",
        Premiere: "15 December 1807"
    },
    {
        title: "Il viaggio a Reims",
        composer: "Rossini, Gioachino",
        date: "1825",
        Librettist: "Luigi Balocchi",
        language: "Italian",
        "Based on": "Corinne ou l'Italie",
        Premiere: "19 June 1825"
    },
    {
        title: "La vida breve",
        composer: "Falla, de",
        date: "1913",
        Translation: "The Brief Life",
        Librettist: "Carlos Fern\xe1ndez-Shaw",
        language: "Spanish",
        Premiere: "1 April 1913"
    },
    {
        title: "Le Villi",
        composer: "Puccini",
        date: "1884",
        Librettist: "Ferdinando Fontana",
        language: "Italian",
        "Based on": "Jean-Baptiste Alphonse Karr",
        Premiere: "31 May 1884"
    },
    {
        title: "Violanta",
        composer: "Korngold",
        date: "1916",
        Librettist: "Hans M\xfcller-Einigen",
        language: "German",
        Premiere: "28 March 1916"
    },
    {
        title: "Violet",
        composer: "Scruton, Roger",
        date: "2005"
    },
    {
        title: "Volo di notte",
        composer: "Dallapiccola",
        date: "1940",
        Translation: "Night Flight",
        Librettist: "Dallapiccola",
        language: "Italian",
        "Based on": "Vol de nuit",
        Premiere: "May 10, 1940"
    },
    {
        title: "Les v\xeapres siciliennes",
        composer: "Verdi, Giuseppe",
        date: "1855",
        Librettist: "\n",
        language: "French",
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
        language: "English",
        Premiere: "June 25, 2003"
    },
    {
        title: "Die Walk\xfcre",
        composer: "Wagner",
        date: "1870",
        Translation: "The Valkyrie",
        Librettist: "Richard Wagner",
        language: "German",
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
        language: "Russian",
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
        "Other title": "Weisse Rose",
        composer: "Zimmermann, Udo",
        date: "Udo Zimmermann",
        Librettist: "Ingo Zimmermann",
        language: "German",
        "Based on": "Die Wei\xdfe Rose",
        Premiere: "17 June 1967"
    },
    {
        title: "Werther",
        composer: "Massenet",
        date: "1892",
        Librettist: "\n",
        language: "French",
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
        composer: "Benjamin, George",
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
        language: "German",
        "Based on": "Woyzeck",
        Premiere: "14 December 1925"
    },
    {
        title: "Wuthering Heights",
        composer: "Floyd",
        date: "1958",
        Librettist: "Floyd",
        language: "English",
        "Based on": "Wuthering Heights",
        Premiere: "July 16, 1958"
    },
    {
        title: "Wuthering Heights",
        composer: "Herrmann",
        date: "1982",
        Librettist: "Lucille Fletcher",
        language: "English",
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
        language: "German"
    },
    {
        title: "The Magic Flute",
        composer: "Mozart",
        date: "1791",
        "Native title": "Die Zauberfl\xf6te",
        Librettist: "Emanuel Schikaneder",
        language: "German",
        Premiere: "30 September 1791"
    }
];
let $40f8308ce56fc3a5$var$usableOperas = $40f8308ce56fc3a5$var$rawOperas.filter($40f8308ce56fc3a5$var$isUsable);
function $40f8308ce56fc3a5$var$isUsable(opera) {
    return "language" in opera && "title" in opera && "composer" in opera && "date" in opera;
}
var $40f8308ce56fc3a5$export$2e2bcd8739ae039 = $40f8308ce56fc3a5$var$usableOperas.map((opera)=>({
        ...opera,
        normalized: $40f8308ce56fc3a5$export$a3295358bff77e(opera.title)
    }));
function $40f8308ce56fc3a5$export$a3295358bff77e(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, " ").replace(/[^\w\s]/g, "_").trim();
}


const $43b21f688c1a3c52$var$composers = [
    ...new Set((0, $40f8308ce56fc3a5$export$2e2bcd8739ae039).map((o)=>o.composer))
].sort();
const $43b21f688c1a3c52$var$languages = [
    ...new Set((0, $40f8308ce56fc3a5$export$2e2bcd8739ae039).map((o)=>o.language))
].sort();
const $43b21f688c1a3c52$var$dates = [
    ...new Set((0, $40f8308ce56fc3a5$export$2e2bcd8739ae039).map((o)=>Number(o.date)))
].sort((a, z)=>a - z);
const $43b21f688c1a3c52$var$dateRange = $43b21f688c1a3c52$var$dates[$43b21f688c1a3c52$var$dates.length - 1] - $43b21f688c1a3c52$var$dates[0];
const $43b21f688c1a3c52$var$locations = {
    Croatian: {
        capital: "Zagreb",
        loc: [
            45.815399,
            15.966568
        ]
    },
    Czech: {
        capital: "Prague",
        loc: [
            50.073658,
            14.418540
        ]
    },
    Danish: {
        capital: "Copenhagen",
        loc: [
            55.6760968,
            12.5683371
        ]
    },
    English: {
        capital: "London",
        loc: [
            51.5073509,
            -0.1277583
        ]
    },
    French: {
        capital: "Paris",
        loc: [
            48.856614,
            2.3522219
        ]
    },
    German: {
        capital: "Berlin",
        loc: [
            52.5200066,
            13.404954
        ]
    },
    Hungarian: {
        capital: "Budapest",
        loc: [
            47.162494,
            19.503304
        ]
    },
    Italian: {
        capital: "Rome",
        loc: [
            41.9027835,
            12.4963655
        ]
    },
    Latin: {
        capital: "Rome",
        loc: [
            41.9027835,
            12.4963655
        ]
    },
    Polish: {
        capital: "Warsaw",
        loc: [
            52.2296756,
            21.0122287
        ]
    },
    Russian: {
        capital: "Moscow",
        loc: [
            55.755826,
            37.6173
        ]
    },
    Spanish: {
        capital: "Madrid",
        loc: [
            40.416775,
            -3.70379
        ]
    },
    Swedish: {
        capital: "Stockholm",
        loc: [
            59.3293235,
            18.0685808
        ]
    },
    Turkish: {
        capital: "Istanbul",
        loc: [
            41.0344,
            28.9653
        ]
    }
};
const $43b21f688c1a3c52$var$fuse = new (0, $e6f0901d5580ff51$export$2e2bcd8739ae039)((0, $40f8308ce56fc3a5$export$2e2bcd8739ae039), {
    keys: [
        "normalized",
        "Translation",
        "alternate",
        "Native title",
        "Other title"
    ],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.2
});
const $43b21f688c1a3c52$var$targetOpera = (0, $40f8308ce56fc3a5$export$2e2bcd8739ae039)[Math.floor(Math.random() * (0, $40f8308ce56fc3a5$export$2e2bcd8739ae039).length)];
const $43b21f688c1a3c52$var$inputEl = document.getElementById("opera-input");
const $43b21f688c1a3c52$var$guessButton = document.getElementById("guess-button");
const $43b21f688c1a3c52$var$selectedOperaEl = $43b21f688c1a3c52$var$guessButton; // document.getElementById("selected-opera")!;
const $43b21f688c1a3c52$var$scoreTemplate = document.getElementById("score-template");
const $43b21f688c1a3c52$var$gaugeOptions = {
    startAngle: 120,
    ticksAngle: 120,
    valueBox: false,
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 4,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 250,
    animationRule: "linear"
};
function $43b21f688c1a3c52$var$doGuess() {
    if (!("refIndex" in $43b21f688c1a3c52$var$selectedOperaEl.dataset)) return;
    const guessedOpera = (0, $40f8308ce56fc3a5$export$2e2bcd8739ae039)[parseInt($43b21f688c1a3c52$var$selectedOperaEl.dataset.refIndex)];
    const scoreRow = $43b21f688c1a3c52$var$scoreTemplate.content.cloneNode(true);
    scoreRow.querySelector(".composer-score h3").textContent = $43b21f688c1a3c52$var$lastFirst(guessedOpera.composer);
    scoreRow.querySelector(".language-score h3").textContent = guessedOpera.language;
    scoreRow.querySelector(".date-score h3").textContent = `Premiered in ${guessedOpera.date}`;
    const id = `score-row-${document.body.childElementCount}`;
    scoreRow.id = id;
    scoreRow.querySelector("h2").textContent = $43b21f688c1a3c52$var$selectedOperaEl.textContent;
    document.body.appendChild(scoreRow);
    document.body.lastElementChild.id = id;
    const guessedIndex = $43b21f688c1a3c52$var$composers.indexOf(guessedOpera.composer);
    let ordinal = (guessedIndex + 1).toString();
    if (ordinal.endsWith("1")) ordinal += "st";
    if (ordinal.endsWith("2")) ordinal += "nd";
    if (ordinal.endsWith("3")) ordinal += "rd";
    if (/\d$/.test(ordinal)) ordinal += "th";
    const composerDist = guessedIndex - $43b21f688c1a3c52$var$composers.indexOf($43b21f688c1a3c52$var$targetOpera.composer);
    const composerCanvas = document.getElementById(id).querySelector(".composer-score canvas");
    composerCanvas.setAttribute("title", composerDist ? `Your guess was written by ${$43b21f688c1a3c52$var$lastFirst(guessedOpera.composer)}, who appears ${ordinal} on an alphabetical list of opera composers, but you are looking for an opera by a composer who appears ${Math.abs(composerDist)} positions ${composerDist > 0 ? "later" : "earlier"} on the list.` : `Your guess was written by ${$43b21f688c1a3c52$var$lastFirst(guessedOpera.composer)}, who is the composer you are looking for.`);
    new (0, $b8ebf9cc3dfaa67d$exports.RadialGauge)({
        renderTo: composerCanvas,
        units: "(alpha)",
        minValue: -$43b21f688c1a3c52$var$composers.length,
        value: composerDist,
        maxValue: $43b21f688c1a3c52$var$composers.length,
        majorTicks: [
            -$43b21f688c1a3c52$var$composers.length.toString(),
            "0",
            $43b21f688c1a3c52$var$composers.length.toString(), 
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                from: -25,
                to: 25,
                color: "rgba(124, 252, 0, .75)"
            }, 
        ],
        ...$43b21f688c1a3c52$var$gaugeOptions
    }).draw();
    const dateDist = Number($43b21f688c1a3c52$var$targetOpera.date) - Number(guessedOpera.date);
    let units = "";
    switch(true){
        case Math.abs(dateDist) > 250:
            units = "several centuries";
            break;
        case Math.abs(dateDist) > 100:
            units = "a few centuries";
            break;
        case Math.abs(dateDist) > 50:
            units = "many decades";
            break;
        case Math.abs(dateDist) > 30:
            units = "several decades";
            break;
        case Math.abs(dateDist) > 10:
            units = "a few decades";
            break;
        case Math.abs(dateDist) > 5:
            units = "several years";
            break;
        case Math.abs(dateDist) > 1:
            units = "a few years";
            break;
    }
    const dateCanvas = document.getElementById(id).querySelector(".date-score canvas");
    dateCanvas === null || dateCanvas === void 0 ? void 0 : dateCanvas.setAttribute("title", dateDist ? `Your guess premiered in ${guessedOpera.date}, but you are looking for an opera that premiered ${units} ${dateDist > 0 ? "later" : "earlier"}.` : `Your guess premiered in ${guessedOpera.date}, which is the year you are looking for.`);
    new (0, $b8ebf9cc3dfaa67d$exports.RadialGauge)({
        renderTo: dateCanvas,
        units: "years",
        minValue: -250,
        value: dateDist,
        maxValue: 250,
        majorTicks: [
            "-250",
            "0",
            "250", 
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                from: -25,
                to: 25,
                color: "rgba(124, 252, 0, .75)"
            }, 
        ],
        ...$43b21f688c1a3c52$var$gaugeOptions
    }).draw();
    const guessLoc = $43b21f688c1a3c52$var$locations[guessedOpera.language];
    const targetLoc = $43b21f688c1a3c52$var$locations[$43b21f688c1a3c52$var$targetOpera.language];
    const languageDist = $43b21f688c1a3c52$var$calcCrow(...guessLoc.loc, ...targetLoc.loc);
    const languageCanvas = document.getElementById(id).querySelector(".language-score canvas");
    languageCanvas === null || languageCanvas === void 0 ? void 0 : languageCanvas.setAttribute("title", languageDist ? `Your guess is sung in ${guessedOpera.language}, which is spoken in ${guessLoc.capital}, which is ${languageDist.toFixed(0)}km away from the capital of the country where they speak the language you seek.` : `Your guess is sung in ${guessedOpera.language}, which is the language you are lookigng for.`);
    new (0, $b8ebf9cc3dfaa67d$exports.RadialGauge)({
        renderTo: languageCanvas,
        units: "km",
        minValue: 0,
        value: languageDist,
        maxValue: 1000,
        majorTicks: [
            "0",
            "250",
            "500",
            "750",
            "1000", 
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                from: 0,
                to: 100,
                color: "rgba(124, 252, 0, .75)"
            }, 
        ],
        ...$43b21f688c1a3c52$var$gaugeOptions
    }).draw();
    let maxHeight = [
        composerCanvas,
        languageCanvas,
        dateCanvas
    ].reduce((acc, cur)=>Math.max(acc, cur.clientHeight), 0);
    // for (const canvas of [composerCanvas, languageCanvas, dateCanvas]) {
    //   canvas.style.height = `${maxHeight}px`;
    // }
    $43b21f688c1a3c52$var$inputEl.value = "";
    $43b21f688c1a3c52$var$fuse.removeAt(Number($43b21f688c1a3c52$var$selectedOperaEl.dataset.refIndex));
    $43b21f688c1a3c52$var$disableGuessBtn();
}
$43b21f688c1a3c52$var$guessButton.onclick = $43b21f688c1a3c52$var$doGuess;
$43b21f688c1a3c52$var$inputEl.oninput = ()=>{
    $43b21f688c1a3c52$var$selectedOperaEl.textContent = "";
    const input = $43b21f688c1a3c52$var$inputEl.value;
    const [suggestion] = $43b21f688c1a3c52$var$fuse.search((0, $40f8308ce56fc3a5$export$a3295358bff77e)(input), {
        limit: 1
    });
    if (suggestion) {
        $43b21f688c1a3c52$var$guessButton.removeAttribute("disabled");
        const [{ indices: [indices] , key: key , value: value  }] = suggestion.matches;
        $43b21f688c1a3c52$var$selectedOperaEl.dataset.refIndex = suggestion.refIndex.toString();
        if (key === "normalized") {
            const [before, match, after] = $43b21f688c1a3c52$var$split(suggestion.item.title || "", indices);
            $43b21f688c1a3c52$var$selectedOperaEl.appendChild(document.createTextNode(before));
            const strong = document.createElement("strong");
            strong.textContent = match;
            $43b21f688c1a3c52$var$selectedOperaEl.appendChild(strong);
            $43b21f688c1a3c52$var$selectedOperaEl.appendChild(document.createTextNode(after));
        } else $43b21f688c1a3c52$var$selectedOperaEl.textContent = suggestion.item.title;
    } else $43b21f688c1a3c52$var$disableGuessBtn();
};
function $43b21f688c1a3c52$var$disableGuessBtn() {
    $43b21f688c1a3c52$var$selectedOperaEl.textContent = "Unknown opera";
    delete $43b21f688c1a3c52$var$selectedOperaEl.dataset.refIndex;
    $43b21f688c1a3c52$var$guessButton.setAttribute("disabled", "disabled");
}
$43b21f688c1a3c52$var$inputEl.onkeydown = (e)=>{
    if (e.key === "Enter") $43b21f688c1a3c52$var$doGuess();
};
function $43b21f688c1a3c52$var$split(title, indices) {
    let curr = 0;
    const result = [];
    for (const index of indices){
        result.push(title.substring(curr, index + 1));
        curr = index + 1;
    }
    result.push(title.substring(curr));
    return result;
}
// This function takes in latitude and longitude of two location and
// returns the distance between them as the crow flies (in km)
function $43b21f688c1a3c52$var$calcCrow(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = $43b21f688c1a3c52$var$toRad(lat2 - lat1);
    const dLon = $43b21f688c1a3c52$var$toRad(lon2 - lon1);
    var lat1 = $43b21f688c1a3c52$var$toRad(lat1);
    var lat2 = $43b21f688c1a3c52$var$toRad(lat2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
// Converts numeric degrees to radians
function $43b21f688c1a3c52$var$toRad(Value) {
    return Value * Math.PI / 180;
}
function $43b21f688c1a3c52$var$lastFirst(name) {
    return name.split(", ").reverse().join(" ");
}

})();
//# sourceMappingURL=index.9bd31b01.js.map
