const butterflyArray = [
    "Swallowtail",
    "Dingy Skipper",
    "Grizzled Skipper",
    "Chequered Skipper",
    "Essex Skipper",
    "Small Skipper",
    "Lulworth Skipper",
    "Silver-spotted Skipper",
    "Large Skipper", "Wood White",
    "Orange-tip",
    "Black-veined White",
    "Large White",
    "Small White",
    "Green-veined White",
    "Clouded Yellow",
    "Brimstone",
    "Wall",
    "Speckled Wood",
    "Large Heath"
];

const buildButterflyList = () => {
    let name;
    let butterflies;
    do {
        name = prompt("What's your name");
    } while (name == null || name.trim() == "")
    do {
        butterflies = prompt("How many butterflies you want to display?");
    } while (butterflies == null || butterflies.trim() == "" || isNaN(butterflies)
        || butterflies <= 0 || butterflies > 20)

    document.getElementById("intro").innerHTML = name
    document.querySelector(".numbersOfButterflies").innerHTML = butterflies
     
    const butterflyList = butterflyArray.slice(0, butterflies)
    .map((item, index) => `${index + 1}. ${item}`)
    .join("<br>");

    document.getElementById("butterflyList").innerHTML = butterflyList;
} 