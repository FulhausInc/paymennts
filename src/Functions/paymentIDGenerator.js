const paymentIDGenerator = (length) => {
  let prefixAlphabets = "";
  let suffixAlphabets = "";
  let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var alphabetsLength = alphabets.length;
  for (let i = 0; i < 2; i++) {
    prefixAlphabets += alphabets.charAt(
      Math.floor(Math.random() * alphabetsLength)
    );
  }

  for (let i = 0; i < 2; i++) {
    suffixAlphabets += alphabets.charAt(
      Math.floor(Math.random() * alphabetsLength)
    );
  }

  let numbersGenerated = "";
  let numbers = "0123456789";
  var numbersLength = numbers.length;
  for (let i = 0; i < length - 2; i++) {
    numbersGenerated += numbers.charAt(
      Math.floor(Math.random() * numbersLength)
    );
  }

  return prefixAlphabets + numbersGenerated + suffixAlphabets;
};

export default paymentIDGenerator;
