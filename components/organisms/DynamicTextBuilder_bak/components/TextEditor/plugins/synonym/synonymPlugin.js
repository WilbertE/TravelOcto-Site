class SynonymPlugin {
  static get isInline() {
    return true;
  }

  constructor(props) {
    this.dialog = document.getElementById("synonymDialog");
    document.synonymPlugin = {};
    document.synonymPlugin.editGroup = null;
    this.bindToSynonymGroup = (synonymGroup) => {
      synonymGroup.addEventListener("click", (e) => {
        e.preventDefault();
        document.synonymPlugin.editGroup = e.target;
        this.openDialog(e.target.innerText);
      });
    };
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="retweet" class="svg-inline--fa fa-retweet fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M634.828 363.799l-98.343 98.343c-4.686 4.686-12.284 4.686-16.971 0l-98.343-98.343c-4.686-4.686-4.686-12.284 0-16.971l5.656-5.656c4.686-4.686 12.284-4.686 16.971 0l68.202 68.2V128H260.024a11.996 11.996 0 0 1-8.485-3.515l-8-8c-7.56-7.56-2.206-20.485 8.485-20.485H520c13.255 0 24 10.745 24 24v289.372l68.201-68.201c4.686-4.686 12.284-4.686 16.971 0l5.656 5.656c4.686 4.687 4.686 12.285 0 16.972zm-246.367 23.716a12.002 12.002 0 0 0-8.485-3.515H128V102.628l68.201 68.2c4.686 4.686 12.284 4.686 16.97 0l5.657-5.657c4.686-4.686 4.687-12.284 0-16.971l-98.343-98.343c-4.686-4.686-12.284-4.686-16.971 0L5.172 148.201c-4.686 4.686-4.686 12.285 0 16.971l5.657 5.657c4.686 4.686 12.284 4.686 16.97 0L96 102.628V392c0 13.255 10.745 24 24 24h267.976c10.691 0 16.045-12.926 8.485-20.485l-8-8z"></path></svg>`;
    this.button.classList = "ce-inline-tool";
    return this.button;
  }

  surround(range) {
    document.synonymPlugin.range = range;
    document.synonymPlugin.editGroup = null;
    var values = new XMLSerializer().serializeToString(range.extractContents());
    document.synonymPlugin.value = values;
    this.openDialog(values);
  }

  handleCancel = () => {
    if (document.synonymPlugin.editGroup == null) {
      const range = document.synonymPlugin.range;
      console.log(document.synonymPlugin.value, range);
      range.insertNode(document.createTextNode(document.synonymPlugin.value));
    }
    this.closeDialog();
  };

  checkState() {
    return false;
  }

  updateEditor = (e) => {
    e.preventDefault();
    const synonyms = this.getSynonymsFromDialog();

    if (document.synonymPlugin.editGroup != null) {
      if (synonyms.length == 0) {
        document.synonymPlugin.editGroup.remove();
      } else if (synonyms.length == 1) {
        document.synonymPlugin.editGroup.replaceWith(document.createTextNode(synonyms.join("")));
      } else {
        document.synonymPlugin.editGroup.innerHTML = "[" + synonyms.join("|") + "]";
      }
    } else {
      if (synonyms.length == 0) {
        document.synonymPlugin.range.deleteContents();
      } else if (synonyms.length == 1) {
        var newRange = document.synonymPlugin.range.cloneRange();
        document.synonymPlugin.range.deleteContents();
        newRange.insertNode(document.createTextNode(synonyms.join("")));
      } else {
        var newRange = document.synonymPlugin.range.cloneRange();
        const synonymGroup = document.createElement("span");
        synonymGroup.contentEditable = false;
        synonymGroup.classList.add("synonym");
        synonymGroup.draggable = false;
        synonymGroup.innerHTML = "[" + synonyms.join("|") + "]";
        this.bindToSynonymGroup(synonymGroup);
        document.synonymPlugin.range.deleteContents();
        newRange.insertNode(synonymGroup);
      }
    }

    this.closeDialog();
  };

  //MODAL STUFF //
  initDialog() {
    if (!this.dialog.dataset.initialized) {
      this.dialog.dataset.initialized = true;
      this.dialog.querySelector("#synonym-form").addEventListener("submit", this.addSynonym);
      this.dialog.querySelector("#save-synonym").addEventListener("click", this.updateEditor);
      this.dialog.querySelector(".close-button").addEventListener("click", this.handleCancel);
    }
  }

  getSynonymsFromDialog() {
    var synonyms = [];
    Array.from(document.querySelectorAll("#synonymDialog #table-body .table-row")).forEach((row) => {
      const synonym = row.querySelector(".content").innerText;
      if (synonym != "") synonyms.push(synonym);
    });
    return synonyms;
  }

  addSynonym = (e) => {
    if (e != null) e.preventDefault();
    const input = document.querySelector("#synonym-form input");
    const valueArr = input.value.split("|");
    valueArr.forEach((value) => this.createSynonymRow(value));
    input.value = "";
  };

  createSynonymRow(synonym) {
    const tableBody = this.dialog.querySelector("#table-body");
    const template = this.dialog.querySelector("#template");

    //Check if synonym is duplicate
    let duplicateRow = null;
    Array.from(tableBody.querySelectorAll(".table-row")).forEach((row) => {
      if (row.querySelector(".content").innerText == synonym) duplicateRow = row;
    });

    //highlight duplicate row
    if (duplicateRow != null) {
      duplicateRow.classList.add("highlight");
      setTimeout(() => {
        duplicateRow.classList.remove("highlight");
      }, 3000);
      return;
    }

    //Check if synonym is empty
    if (synonym == "") return;
    let row = template.cloneNode(true);
    row.removeAttribute("id");
    row.querySelector(".content").innerHTML = synonym;
    row.querySelector(".deleteButton").addEventListener("click", function () {
      this.closest(".table-row").remove();
    });
    tableBody.appendChild(row);
  }

  openDialog(values) {
    const tableBody = this.dialog.querySelector("#table-body");
    const template = this.dialog.querySelector("#template");
    tableBody.innerHTML = "";
    tableBody.appendChild(template.cloneNode(true));
    const synonymsArr = values.replace("[", "").replace("]", "").split("|");
    synonymsArr.forEach((value) => this.createSynonymRow(value));
    this.dialog.classList.add("open");
    this.initDialog();
  }

  closeDialog() {
    if (this.dialog == null) this.dialog = document.getElementById("synonymDialog");
    document.querySelector(".ce-inline-toolbar").classList.remove("ce-inline-toolbar--showed");
    this.dialog.classList.remove("open");
  }
}

export default SynonymPlugin;
