const numberToStringConverter = function (str) {
  switch (str) {
    case 1:
      return "één";
    case 2:
      return "twee";
    case 3:
      return "drie";
    case 4:
      return "vier";
    case 5:
      return "vijf";
    case 6:
      return "zes";
    case 7:
      return "zeven";
    case 8:
      return "acht";
    case 9:
      return "negen";
    case 10:
      return "tien";
    case 11:
      return "elf";
    case 12:
      return "twaalf";
    case 13:
      return "dertien";
    case 14:
      return "veertien";
    case 15:
      return "vijftien";
    case 16:
      return "zestien";
    case 17:
      return "zeventien";
    case 18:
      return "achtien";
    case 19:
      return "negentien";
    case 20:
      return "twintig";
    case 30:
      return "dertig";
    case 40:
      return "veertig";
    case 50:
      return "vijftig";
    case 60:
      return "zestig";
    case 70:
      return "zeventig";
    case 80:
      return "tachtig";
    case 90:
      return "negentig";
    case 100:
      return "honderd";
    case 1000:
      return "duizend";
    case 10000:
      return "tien duizend";
    case 100000:
      return "honderd duizend";
    case 1000000:
      return "een miljoen";
    default:
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

export {numberToStringConverter};
