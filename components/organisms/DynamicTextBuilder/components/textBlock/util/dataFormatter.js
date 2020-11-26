const dataFormatter = function (value) {
  const el = document.createElement("span");
  el.innerHTML = value;
  value = el.innerText;
  value = value.replace(/\*\*(.+?(?=\\*\*))\*\*/gi, "<b>$1</b>");
  value = value.replace(/__(.+?(?=__))__/gi, "<i>$1</i>");
  value = value.replace(/{#((?!}).*?)}/gi, '<span class="numeric-tag">$1</span>');
  value = value.replace(/{((?!}).*?)}/gi, '<span class="tag">$1</span>');
  value = value.replace(/(\[a\ target='((?!').*?)' href='((?!').*?)'\]((?!\[\/a\]).*?)\[\/a\])/, "<a href='$3' target='$2'>$4</a>");

  value = value.replace(/\[((?!\]).*?)]/gi, (synonymGroup) => {
    synonymGroup = synonymGroup.replace("[", "").replace("]", "");
    synonymGroup = synonymGroup.split("|");
    synonymGroup = synonymGroup.sort((a, b) => b.length - a.length);
    let firstItem = synonymGroup.shift();
    let synonyms = synonymGroup.map((synonym) => {
      return "<span class='synonym'>" + synonym + "</span>";
    });

    return "<span class='synonymGroup'>" + firstItem + "<div class='synonymDropdown'>" + synonyms.join("") + "</div></span>";
  });
  return value;
};

export {dataFormatter};
