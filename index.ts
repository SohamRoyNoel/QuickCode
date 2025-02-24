function checkNumberPadding(strings: string[]): number {
    if (strings.length === 0) {
        return 0;
    }
    
    let paddingLengths = new Set<number>();
    let minNonPaddedLength = Infinity;
    let hasPadding = false;
    
    for (const str of strings) {
      if (!/^[0-9]+$/.test(str)) {
        return -1;
      }
      
      const match = str.match(/^(0*)([1-9][0-9]*|0)$/);
      if (!match) {
        return -1
      };
      
      const leadingZeros = match[1].length;
      const numberPart = match[2];
      
      if (leadingZeros > 0) {
        hasPadding = true;
        paddingLengths.add(str.length);
      }
      
      minNonPaddedLength = Math.min(minNonPaddedLength, numberPart.length);
    }
    
    if (paddingLengths.size > 1) {
        return -1
    };
    
    if (hasPadding) {
        return paddingLengths.values().next().value ?? -1
    };
    
    return minNonPaddedLength === Infinity ? 0 : -minNonPaddedLength;
  }
  
  // Test cases
  console.log(checkNumberPadding(["001", "002"])); 
  console.log(checkNumberPadding(["001", "002", "9999"]));
  console.log(checkNumberPadding(["1", "2", "999"]));
  console.log(checkNumberPadding(["999", "9999"]));
  console.log(checkNumberPadding(["99", "999", "9999"]));
  console.log(checkNumberPadding(["01", "002"]));
  console.log(checkNumberPadding([]));
  